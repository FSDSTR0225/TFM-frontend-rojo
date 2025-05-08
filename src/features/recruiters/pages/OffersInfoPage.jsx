import React from 'react'
import { useState } from 'react'
import { getOffers } from '../../../services/offersServices'
import { useEffect } from 'react'
import { TfiLocationPin } from "react-icons/tfi";
import { OfferCard } from '../components/OfferCard';
import { MdOutlineAccessTime } from 'react-icons/md';
import { SectionOffers } from '../components/sectionOffers';
import { getDaysSince } from '../../../utils/utils';
import {OfferList} from '../components/OfferList'



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

  // const getDaysSince = (dateString) => {
  //   const createdAt = new Date(dateString);
  //   const today = new Date();
  //   const diffMs = today - createdAt;
  //   return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  // };

  return (
    <SectionOffers>
        <h2 className='text-3xl font-bold'>Your Next Tech Career Starts Here</h2>
        <p className='text-gray-600 text-lg'>Discover job opportunities for developers, designers, and engineers in fast-growing tech fields.</p>
         <OfferList view={true}>
            {offers.map((offer)=>{ 
              
              return (

              <OfferCard offer={offer}  />

            )})}
         </OfferList>
    </SectionOffers>
  )
}
