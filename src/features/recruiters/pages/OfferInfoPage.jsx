
import { useEffect } from "react";
import { useState } from "react";
import {useLocation, useNavigate, useParams } from "react-router";
import { SectionContainer } from "../../../components/SectionContainer";
import { OfferInfo } from "../components/OfferInfo";
import { getOffersById } from "../../../services/offersServices";
import { RecContactCard } from "../components/RecContactCard";
import { OfferModal } from "../components/OfferModal";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { ApplyModal } from "../components/ApplyModal";


export const OfferInfoPage = () => {
  const [offer, setOffer] = useState(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
const [isOpenApplyModal, setIsOpenApplyModal] = useState(false);
const { profile, token } = useContext(AuthContext);
const navigate = useNavigate();
const location = useLocation();

  
const { id } = useParams();

const isOwnerRecruiter = offer?.owner?._id === profile?._id && profile?.role.type === 'recruiter'; 

const hasApplied =
    Array.isArray(offer?.applicants) &&
    profile?._id &&
    offer?.applicants?.some((applicant) => applicant?.user === profile._id);



const fetchOffer = async () => {
      try {
      const offerData = await getOffersById(id);
        setOffer(offerData);
      } catch (error) {
        setError(error.message);
      } finally{
        setIsLoading(false)
      }
    };
  
  useEffect(() => {
    
    fetchOffer();
  }, [id]);

    const handleApplyModal = (e) => {
    e.stopPropagation();
    if (!token) {
      console.log("por aqui no pasaras");
      navigate("/login", {state: {from: location.pathname}});
    }

    setIsOpenApplyModal(true);
  };

  // const handleApply = async (e) => {
  //     e.stopPropagation();
  //     if (!token) {
        
  //       navigate("/login", {state: {from: location.pathname}});
  //     }
  
  //     try {
  //       const response = await applyToOffer(offer._id, token);
  //       console.log(response.msg || "se envio");
  //       // onApplySuccess?.(response.offer);
  //     } catch (error) {
  //       console.log(error.message || "Error al aplicar a la oferta");
  //     }
  //   };

    

  if (isLoading) {
    return (
      <SectionContainer classProps="lg:flex-row flex-col-reverse gap-4 lg:items-start">
        <div className="w-full p-4 space-y-6">
          <div className="h-8 bg-base-200 rounded-lg skeleton"></div>
          <div className="h-4 bg-base-200 rounded-lg skeleton w-3/4"></div>
          <div className="h-4 bg-base-200 rounded-lg skeleton w-2/3"></div>
        </div>
        <div className="w-full p-4 space-y-4 border rounded-lg">
          <div className="h-6 bg-base-200 rounded-full skeleton w-1/2"></div>
          <div className="h-4 bg-base-200 rounded-lg skeleton w-4/6"></div>
          <div className="h-4 bg-base-200 rounded-lg skeleton w-5/6"></div>
        </div>
      </SectionContainer>
    );
  }
  if (error) return <p>Error al cargar las ofertas: {error}</p>;
  return (
    <SectionContainer classProps={"lg:flex-row flex-col-reverse gap-4 lg:items-start"}>
    <OfferInfo offer={offer}
    isOpen={isOpenModalEdit}
    setIsOpen={setIsOpenModalEdit}
    token={token} 
    handleApply={handleApplyModal}
    hasApplied={hasApplied}
    />
   {isOwnerRecruiter && ( <aside className="min-w-90 card bg-neutral-80 shadow-xl border border-neutral-70">
    <ul className="card-body">
      <li className="list-row">hola</li>

    </ul>
    </aside>)}
    {!isOwnerRecruiter && <RecContactCard  owner={offer?.owner}  />}

    {isOpenModalEdit && <OfferModal
            idOffer={id}
            isOpen={isOpenModalEdit}
            setIsOpen={setIsOpenModalEdit}
            token={token}
             reloadPage={fetchOffer}
             />
          }
          {isOpenApplyModal && (
                  <ApplyModal
                    idOffer={id}
                    isOpen={isOpenApplyModal}
                    setIsOpen={setIsOpenApplyModal}
                    token={token}
                    handleApply={handleApplyModal}

                    />
                )}
    </SectionContainer>
  );
};
