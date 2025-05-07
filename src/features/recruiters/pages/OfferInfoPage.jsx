import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router";
import { SectionOffers } from "../components/sectionOffers";
import { FiExternalLink } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { getInitials } from "../../../utils/utils";
import { OfferInfo } from "../components/OfferInfo";
import { getOffersById } from "../../../services/offersServices";


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
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    fetchOffer();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <p>Error al cargar las ofertas: {error}</p>;
  return (
    <SectionOffers classProps={"lg:flex-row flex-col-reverse gap-5 lg:items-start"}>
    <OfferInfo offer={offer}/>
      <aside className='lg:w-[30%] card bg-base-200 shadow-xl border border-base-100 flex-col text-sm md:text-lg w-full'>
        <div className='card-body flex-row lg:flex-col  gap-4 items-center'>
          <div className='avatar'>
            {offer.owner?.role?.recruiter?.logo ? (
              <div className='avatar'>
              <div className='size-18 sm:size-24 rounded-full'>
                <img src={offer.owner.role.recruiter.logo} alt="Logo" />
              </div>
              </div>
            ) : (
              <div className="avatar avatar-placeholder">
              <div className="bg-neutral text-neutral-content rounded-full size-18 sm:size-24">
                <span className="text-4xl font-bold">{getInitials(offer.owner?.name)}</span>
              </div>
              </div>
              
            )}
          </div>
          <div>
            {offer.owner.role.recruiter.companyName ? (
              <>
                <p className='font-bold text-md md:text-xl'>{offer.owner.name}</p>
                <p>{offer.owner.role.recruiter.companyName}</p>
              </>
            ) : (
              <p>{offer.owner.name}</p>
            )}
            {offer.owner.role.recruiter.website &&(<a
              href='goole.com'
              className='flex items-center gap-2'
            >
              <FiExternalLink />
              {offer.owner.role.recruiter.website}
            </a>)}
            {offer.owner?.role?.recruiter?.contact[0]?.email &&(<a
              href='goole.com'
              className='flex items-center gap-2'
            >
              <MdOutlineMailOutline />
              {offer.owner.role.recruiter.contact[0].email}
            </a>)}
            <button className="btn w-full btn-sm lg:btn-md mt-2 lg:mt-6">Contact</button>
          </div>
        </div>
      </aside>
    </SectionOffers>
  );
};
