import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router";
import { SectionContainer } from "../../../components/SectionContainer";
import { OfferInfo } from "../components/OfferInfo";
import { getOffersById } from "../../../services/offersServices";
import { RecContactCard } from "../components/RecContactCard";
import { OfferModal } from "../components/OfferModal";


export const OfferInfoPage = () => {
  const [offer, setOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  
const { id } = useParams();

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
    token={localStorage.getItem('token')} />
    <RecContactCard  owner={offer?.owner}  />
    {isOpenModalEdit && <OfferModal
            idOffer={id}
            isOpen={isOpenModalEdit}
            setIsOpen={setIsOpenModalEdit}
            token={localStorage.getItem('token')}
             reloadPage={fetchOffer}
             />
          }
    </SectionContainer>
  );
};
