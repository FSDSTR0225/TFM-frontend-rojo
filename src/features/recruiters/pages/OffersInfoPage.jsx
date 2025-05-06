import React from 'react'
import { useState } from 'react'
import { getOffers } from '../../../services/offersServices'
import { useEffect } from 'react'
import { TfiLocationPin } from "react-icons/tfi";
import { OfferCard } from '../components/OfferCard';
import { MdOutlineAccessTime } from 'react-icons/md';


export const OffersInfoPage = () => {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    const fetchOffers = async () => {
      try {
        const offerData = await getOffers()
        setOffers(offerData)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }
    fetchOffers()
  },[])

  if(loading) return <span className="loading loading-bars loading-md"></span>
  if (error) return <p>Error al cargar las ofertas: {error}</p>;

  const getDaysSince = (dateString) => {
    const createdAt = new Date(dateString);
    const today = new Date();
    const diffMs = today - createdAt;
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  };

  return (
    <section className='flex justify-center w-[95vw] md:w-[80vw] lg:w-[60vw] bg-base-400 p-10 items-center mx-auto'>
         <ul className='grid grid-cols-1 gap-5' >
            {offers.map((offer)=>{ 
              const daysAgo = offer.createdAt ? getDaysSince(offer.createdAt) : 0;
              return (

              <OfferCard key={offer._id} link={offer._id}>
              <h2 className='text-xl font-bold'>{offer.position}</h2>
                  <div className='flex items-center gap-3'><TfiLocationPin />{offer.location}</div>
                  <p>{offer.description}</p>
                  <div className=' flex mt-5 items-center text-gray-400 text-xs'>
                    <p className='flex items-center gap-3 '><MdOutlineAccessTime />Posted {daysAgo} day{daysAgo !== 1 ? "s" : ""} ago</p>
                    <span>{offer.applicants ? `${offer.applicants.length} Aplicants` : "0 Aplicants"}</span>
                  </div>
              </OfferCard>
            )})}
         </ul>
    </section>
  )
}
