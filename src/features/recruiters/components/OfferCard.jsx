import { useLocation, useNavigate } from "react-router";
import { getDaysSince, summarizerText } from "../../../utils/utils";
import { MdOutlineAccessTime } from "react-icons/md";

import { MainRecButton } from "../../../components/MainRecButton";
import { MenuCard } from "./MenuCard";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { PiMapPinArea } from "react-icons/pi";
import Badge from "./Badge";
import { AvatarImage } from "../../../components/AvatarImage";
import { NameUsers } from "../../../components/NameUsers";
import { ChatContext } from "../../../layout/chat/context/ChatContext";
import { useState } from "react";
import { useEffect } from "react";
import { useSummarizer } from "../../../context/SummarizerContext";

export const OfferCard = ({
  classProps,
  offer,
  id,
  setIsOpenModalDelete,
  isOpenModalDelete,
  setIsOpenApplyModal,
  setSelectedOfferId,
  isOpenModalEdit,
  setIsOpenModalEdit,
}) => {

  const { isSummarizerReady } = useSummarizer();

  const [displayDescription, setDisplayDescription] = useState(offer?.description);

  // Efecto para resumir cuando isSummarizerReady cambia a true O la oferta cambia
  useEffect(() => {
    const processDescription = async () => {
      if (offer?.description && isSummarizerReady) {
        const result = await summarizerText(offer.description);
        if (result.success) {
          setDisplayDescription(result.text);
        } else {
          // Si falla por alguna razón (incluso estando isSummarizerReady),
          // vuelve a mostrar la descripción completa
          setDisplayDescription(offer.description);
        }
      } else {
        // Si el summarizer no está listo, muestra la descripción completa
        setDisplayDescription(offer.description);
      }
    };

    processDescription();
  }, [offer?.description, isSummarizerReady]); // Depende de la oferta y del estado global

  const navigate = useNavigate();
  const { profile, token } = useContext(AuthContext);

  const isOwner = profile?._id === offer?.owner?._id;

  const isRecruiter = profile?.role.type === "recruiter";

  const { openChat } = useContext(ChatContext);

  //Determinando en donde este redirije a un lado o al otro dependiendo de la ruta actual
  const location = useLocation();

  const handleApplyModal = (e) => {
    e.stopPropagation();
    if (!token) {
      console.log("por aqui no pasaras");
      navigate("/login", { state: { from: "/offers" } });
    }

    setIsOpenApplyModal(true);
    setSelectedOfferId(offer?._id);
  };

  // const handleApply = async (e) => {
  //   e.stopPropagation();
  //   if (!token) {
  //     console.log("por aqui no pasaras");
  //     navigate("/login");
  //   }

  //   try {
  //     const response = await applyToOffer(offer._id, token);
  //     console.log(response.msg || "se envio");
  //     onApplySuccess?.(response.offer);
  //   } catch (error) {
  //     console.log(error.message || "Error al aplicar a la oferta");
  //   }
  // };
  const hasApplied =
    Array.isArray(offer.applicants) &&
    profile?._id &&
    offer.applicants.some((applicant) => applicant?.user?._id === profile._id);
  const handleOnModal = (e) => {
    e.stopPropagation();

    setIsOpenModalDelete(true);
    setSelectedOfferId(offer?._id);
    console.log("🚀 ~ handleOnModal ~ isOpenModalDelete:", isOpenModalDelete);
  };

  const handleOnModalEdit = (e) => {
    e.stopPropagation();
    setSelectedOfferId(offer?._id);
    setIsOpenModalEdit(true);
    console.log("🚀 ~ handleOnModal ~ isOpenModalEdit:", isOpenModalEdit);
  };

  const handleOnClick = (e) => {
    e.stopPropagation();
  };

  const handleContactClick = (e) => {
    e.stopPropagation();
    openChat(offer.owner);
  };
  const handleCardClick = () => {
    if (location.pathname.startsWith("/private-rec/offers")) {
      navigate(`/private-rec/dashboard/${offer._id}`);
    } else {
      navigate(`/offers/${offer._id}`);
    }
  };

  const handleOwnerClick = (e) => {
    e.stopPropagation();
    navigate(`../../recruiter/${offer.owner._id}`);
  };

  const daysAgo = offer?.createdAt ? getDaysSince(offer?.createdAt) : 0;
  return (
    <li
      key={id}
      onClick={handleCardClick}
      className={`${
        classProps && classProps
      } card border bg-neutral-80 border-neutral-70 cursor-pointer max-h-80 shadow-xl hover:bg-neutral-90 transition-transform transform hover:scale-105 `}
    >
      <div className="card-body p-4 sm:p-6  justify-between">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 " onClick={handleOwnerClick}>
            <AvatarImage user={offer.owner} width={8} />
            <NameUsers user={offer.owner} classProps={"text-xs"} />
          </div>
          {isOwner && isRecruiter && (
            <MenuCard
              handleOnModalEdit={handleOnModalEdit}
              isOpen={isOpenModalDelete}
              openModal={handleOnModal}
              onClick={handleOnClick}
              id={offer._id}
            />
          )}
          {hasApplied && <Badge text={"Applied"} />}
        </div>

        <div className="flex flex-col justify-between">
          <h3 className="text-xl font-bold">{offer?.position}</h3>
          <p className="text-neutral-10">{offer?.role}</p>
        </div>
        <div className="flex gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <PiMapPinArea className="size-4" />
            {offer.location}
          </div>
          <div className="badge bg-neutral-60">
            {offer?.contractType}
          </div>
        </div>
        <div>
          <p className="line-clamp-3">{displayDescription}</p>
        </div>

        {!isOwner && !isRecruiter && (
          <div className="flex items-center justify-end gap-4 m-2">
            <MainRecButton
              onClick={handleApplyModal}
              classProps="rounded-full w-18"
              disabled={hasApplied}
            >
              {hasApplied ? "Applied" : "Apply"}
            </MainRecButton>
            <MainRecButton
              onClick={handleContactClick}
              classProps="rounded-full w-18 hover:border-neutral-0 hover:text-neutral-0 text-secondary-40 hover:bg-transparent bg-transparent"
            >
              Contact
            </MainRecButton>
          </div>
        )}

        <div className=" flex  items-center text-neutral-20 text-xs">
          <p className="flex items-center gap-2 ">
            <MdOutlineAccessTime />
            Posted {daysAgo} day{daysAgo !== 1 ? "s" : ""} ago
          </p>
          <span>
            {offer?.applicants
              ? `${offer?.applicants.length} Aplicants`
              : "0 Aplicants"}
          </span>
        </div>
      </div>
    </li>
  );
};
