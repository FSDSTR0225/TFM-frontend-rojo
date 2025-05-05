import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getOffersById } from '../../../services/offersServices'

export const OfferInfoPage = () => {
    const [offer, setOffer] = useState()
     
    useEffect(()=>{
        const fetchOffer = async () => {
            const offerData = await getOffersById() =>{
                
            }
        }
    })

  return (
    <div>OfferInfoPage</div>
  )
}
