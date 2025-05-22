import { Link, useNavigate } from "react-router";
import { capitalize, getDaysSince, getInitials } from "../../../utils/utils";
import { TfiLocationPin } from "react-icons/tfi";
import { MdOutlineAccessTime } from "react-icons/md";

import { MainRecButton } from "../../../components/MainRecButton";
import { MenuCard } from "./MenuCard";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { PiMapPinArea } from "react-icons/pi";
import { applyToOffer } from "../../../services/offersServices";


export const OfferCard = ({ classProps, offer, id, setIsOpenModalDelete, isOpenModalDelete, setSelectedOfferId, isOpenModalEdit, setIsOpenModalEdit }) => {
  const navigate = useNavigate();
  const { profile, token } = useContext(AuthContext);

  const isOwner = profile?._id === offer?.owner?._id;

  
  const isRecruiter = profile?.role.type === 'recruiter';

  
  const name = capitalize(offer.owner?.name || "");
  const surname = capitalize(offer.owner?.surname || "");
  const completeName = `${name} ${surname}`.trim() || "Unknown Recruiter";

  const handleApply = async (e) => {
    e.stopPropagation()
    if(!token) {
      console.log('por aqui no pasaras')
    }

  try {
    const response = await applyToOffer(offer._id, token)
    console.log(response.msg || 'se envio')
  } catch (error) {
    console.log(error.message || 'Error al aplicar a la oferta');
  }
  }

  const handleOnModal = (e) => {
    e.stopPropagation();
    setIsOpenModalDelete(true);
    setSelectedOfferId(offer._id);
    console.log("🚀 ~ handleOnModal ~ isOpenModalDelete:", isOpenModalDelete)
  };

  const handleOnModalEdit = (e) => {
    e.stopPropagation();
    setIsOpenModalEdit(true);
    setSelectedOfferId(offer._id);
    console.log("🚀 ~ handleOnModal ~ isOpenModalEdit:", isOpenModalEdit)
  };


  const handleOnClick = (e) => {
    e.stopPropagation();
  };
  const handleCardClick = () => {
    navigate(`/offers/${offer._id}`);
  };

  //  const handleOwnerClick = (e) => {
  //   e.stopPropagation();
  //   navigate(`profile/recruiter/${offer.owner._id}`)
  //  }

  const daysAgo = offer?.createdAt ? getDaysSince(offer?.createdAt) : 0;
  return (
    <li
      key={id}
      onClick={handleCardClick}
      className={`${classProps && classProps
        } card border bg-neutral-80 border-neutral-70 cursor-pointer max-h-80 shadow-xl hover:bg-neutral-90 transition-transform transform hover:scale-105 `}
    >
      <div className='card-body justify-between'>
        <div className='flex justify-between items-center'>
          <Link to={`../recruiter/${offer.owner._id}`} className='avatar gap-2 items-center' onClick={handleOnClick}>
            {offer.owner?.role?.recruiter?.logo ? (
              <div className='avatar'>
                <div className='size-8 sm:size-8 rounded-full'>
                  <img
                    src={offer.owner.role.recruiter.logo}
                    alt='Logo'
                  />
                </div>
              </div>
            ) : (
              <div className='avatar avatar-placeholder'>
                <div className='bg-neutral text-neutral-content rounded-full size-8 sm:size-'>
                  <span className=' font-bold'>{getInitials(completeName)}</span>
                </div>
              </div>
            )}
            <p>{completeName}</p>
          </Link>
          {isOwner && isRecruiter && (
            <MenuCard
              isOpen={isOpenModalDelete}
              openModal={handleOnModal}
              openModalEdit={handleOnModalEdit}
              onClick={handleOnClick}
              id={offer._id}
            />
          )}
        </div>

        <div className='flex flex-col justify-between'>
          <h3 className='text-xl font-bold'>{offer?.position}</h3>
          <p className='text-neutral-10'>{offer?.role}</p>
        </div>
        <div className='flex gap-4'>
          <div className='flex items-center gap-2'>
            <PiMapPinArea className="size-4" />
            {offer.location}
          </div>
          <div className='badge text-neutral-0 bg-neutral-60'>{offer?.contractType}</div>
        </div>
        <div>
          <p className='line-clamp-3'>{offer.description}</p>
        </div>
        

        {(!isOwner && !isRecruiter) && (<div className='flex items-center justify-end gap-4 m-2'>
          <MainRecButton
            onClick={handleApply}
            classProps='rounded-full w-18'
          >
            Apply
          </MainRecButton>
          <MainRecButton
            onClick={handleOnClick}
            classProps='rounded-full w-18 hover:border-neutral-0 hover:text-neutral-0 text-secondary-40 hover:bg-transparent bg-transparent'
          >
            Contact
          </MainRecButton>
        </div>)}

        <div className=' flex  items-center text-neutral-20 text-xs'>
          <p className='flex items-center gap-2 '>
            <MdOutlineAccessTime />
            Posted {daysAgo} day{daysAgo !== 1 ? "s" : ""} ago
          </p>
          <span>{offer.applicants ? `${offer.applicants.length} Aplicants` : "0 Aplicants"}</span>
        </div>
      </div>
    </li>
  );
};
