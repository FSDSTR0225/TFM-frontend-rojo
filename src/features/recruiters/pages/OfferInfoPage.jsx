import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getOffersById } from '../../../services/offersServices'
import { useParams } from 'react-router'

export const OfferInfoPage = () => {
    const [offer, setOffer] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const {id} = useParams()

    useEffect(()=>{
        const fetchOffer = async () => {
           try {
            const offerData = await getOffersById(id)
            setOffer(offerData)
            setIsLoading(false)
           } catch (error) {
            setError(error.message)
            setIsLoading(false)
           }
        }
        fetchOffer()
    },[])

    if(isLoading) return <div>Loading</div>
    if (error) return <p>Error al cargar las ofertas: {error}</p>;
  return (
    <div></div>
  )
}
