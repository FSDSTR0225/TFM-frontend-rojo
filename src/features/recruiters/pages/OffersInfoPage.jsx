import React from 'react'
import { useState } from 'react'
import { getOffers } from '../../../services/offersServices'
import { useEffect } from 'react'
import { TfiLocationPin } from "react-icons/tfi";


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
  return (
    <section>
         <ul>
            {offers.map((offer)=> (
              <li key={offer._id} className='card'>
                <div className='card-body'>
                  <h2>{offer.position}</h2>
                  <div className='flex items-center gap-3'><TfiLocationPin />{offer.location}</div>
                  <p>{offer.description}</p> 
                    
                </div>
              </li>
            ))}
         </ul>
    </section>
  )
}
