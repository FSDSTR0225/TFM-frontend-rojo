import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router";
import { SectionOffers } from "../components/sectionOffers";
import { OfferInfo } from "../components/OfferInfo";
import { getOffersById } from "../../../services/offersServices";
import { RecContactCard } from "../components/RecContactCard";


export const OfferInfoPage = () => {
  const [offer, setOffer] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
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
    fetchOffer();
  }, []);

  //if (isLoading) return <div>Loading...</div>;
  if (error) return <p>Error al cargar las ofertas: {error}</p>;
  return (
    <SectionOffers classProps={"lg:flex-row flex-col-reverse gap-4 lg:items-start"}>
    <OfferInfo isLoading={isLoading} offer={offer} />
    <RecContactCard isLoading={isLoading} owner={offer.owner} />
    </SectionOffers>
  );
};
