import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getOffersById } from '../../../services/offersServices'
import { useParams } from 'react-router'
import { SectionOffers } from '../components/sectionOffers'
import { TfiLocationPin } from 'react-icons/tfi'
import { EditButton } from '../../../components/EditButton'

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

    if(isLoading) return <div>Loading...</div>
    if (error) return <p>Error al cargar las ofertas: {error}</p>;
  return (
    <SectionOffers classProps={'lg:flex-row flex-col-reverse gap-5'}>
            <article className='lg:w-[70%] card bg-base-200 shadow-xl border border-base-100 flex flex-col  w-full '>
              <div className='card-body gap-5'>
              <EditButton classProps={'self-end'} />
              <h2 className='text-xl md:text-2xl  font-bold m'>{offer.position}</h2>
                <p>{offer.role}</p>
                <div className='flex items-center gap-3 m-4'><TfiLocationPin />{offer.location}<span className="badge badge-soft badge-info">{offer.contractType}</span></div>
                <p className=''>{offer.description}</p>
                <h3>Necessary Skills:</h3>
                <div className='flex justify-evenly flex-wrap'>  {(offer.skills).map((skill)=>{
                  return(<span className='badge badge-soft badge-accent"'>{skill}</span>)
                })}</div>
                {offer.language && (
  <>
    <p>Language: {offer.language}</p>
  </>
)}
{offer.salary && (
  <>
    <p>Salary: {offer.salary}</p>
  </>
)}
  <button className='btn btn-outline bg-green-600 hover:bg-green-700 text-base-300'>Apply Now</button>
              </div>
            </article>
            <aside className='lg:w-[30%]'>
              hola
            </aside>
    </SectionOffers>
  )
}
