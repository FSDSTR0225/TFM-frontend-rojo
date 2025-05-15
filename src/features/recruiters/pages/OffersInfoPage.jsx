import React from 'react'
import { useState } from 'react'
import { getOffers } from '../../../services/offersServices'
import { useEffect } from 'react'
import { OfferCard } from '../components/OfferCard';
import { SectionContainer } from '../../../components/SectionContainer';
import {OfferList} from '../components/OfferList'
import { Pagination } from '../../../components/Pagination';
import { ModalDelete } from '../components/ModalDelete';







export const OffersInfoPage = () => {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
const [currentPage, setCurrentPage] = useState(1);
const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)

const [contractTypeFilter, setContractTypeFilter] = useState('')
const [skillsFilter, setSkillsFilter] =useState([])
const [sortOrder, setSortOrder] = useState('desc')

const getFilteredOffers = () => {
  let filtered = [...offers]

  if (contractTypeFilter) {
    filtered = filtered.filter((offer)=> offer.contractType === contractTypeFilter)
  }
  
  if (skillsFilter.length > 0) {
    filtered = filtered.filter((offer) =>
    skillsFilter.every((skill) => offer.skills.includes(skill))
  )
  }

  filtered.sort((a, b) => {
    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
  })
  return filtered
}

  const filteredOffers = getFilteredOffers()
  const totalPages = Math.ceil(offers.length / 6);
  const startIndex = (currentPage - 1) * 6;
  const currentOffers= filteredOffers.slice(startIndex, startIndex + 6);

  const handlePageChange = (pageNum) => {
    if (pageNum === currentPage) return;
    setCurrentPage(pageNum); // Primero actualizamos la página
 
  };


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

  useEffect(() => {
  setCurrentPage(1);
}, [contractTypeFilter, skillsFilter, sortOrder]);

  if (loading) {
    return (
      <SectionContainer classProps="flex flex-col space-y-6">
        {/* Título y descripción skeleton */}
        <div className="space-y-4 p-4">
          <div className="h-8 bg-base-200 rounded-lg skeleton"></div>
          <div className="h-4 bg-base-200 rounded-lg skeleton w-5/6"></div>
          <div className="h-4 bg-base-200 rounded-lg skeleton w-4/6"></div>
        </div>
        {/* Lista de tarjetas skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="p-4 border rounded-lg space-y-3 animate-pulse">
              <div className="h-4 bg-base-200 rounded-lg skeleton w-3/4"></div>
              <div className="h-3 bg-base-200 rounded-lg skeleton w-full"></div>
              <div className="h-3 bg-base-200 rounded-lg skeleton w-5/6"></div>
              <div className="h-8 bg-base-200 rounded-lg skeleton w-1/2"></div>
            </div>
          ))}
        </div>
      </SectionContainer>
          );
        }
      if (error) return <p>Error al cargar las ofertas: {error}</p>;

const contractsTypes = [...new Set(offers.flatMap(offer =>offer.contractType.map(type => type.trim())))]
console.log("🚀 ~ OffersInfoPage ~ contractsTypes:", contractsTypes)
const hardSkills = [
  ...new Set(
    offers.flatMap(offer =>
      offer.skills
        .flatMap(s => s.split(","))
        .map(s => s.trim())
        .filter(Boolean) // Elimina vacíos
    )
  )
];
console.log("🚀 ~ OffersInfoPage ~ hardSkills:", hardSkills)




  return (
    <SectionContainer>
        <h2 className='text-3xl font-bold text-neutral-0'>Your Next Tech Career Starts Here</h2>
        <p className='text-neutral-10 text-lg '>Discover job opportunities for developers, designers, and engineers in fast-growing tech fields.</p>

        {/* selectores del filtro */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <label>
        Type Contract:
        <select 
        value={contractTypeFilter}
        onChange={(e) => setContractTypeFilter(e.target.value)}
        >
        <option value="">All</option>
        {contractsTypes.map((contract, index) =>(<option key={index} value={contract}>{contract}</option>))}
        </select>
        </label>
        <fieldset>
          <legend>Skills:</legend>
          {hardSkills.map((skill)=>(
            <label key={skill}>
              <input type="checkbox"
             checked={skillsFilter.includes(skill)}
             onChange={(e) =>{
              const checked = e.target.checked
              setSkillsFilter((prev)=>
              checked ? [...prev, skill] : prev.filter((s)=> s !== skill))
             } } 
               />
               <span>{skill}</span>
            </label>
          ))}
        </fieldset>

          <label>
            Sort by date:
            <select
              value={sortOrder}
              onChange={(e)=>setSortOrder(e.target.value)}
            >
            <option value="desc">Latest</option>
            <option value="asc">Oldest</option>
            </select>
          </label>
        

        </div>

         <OfferList view={true}>
            {currentOffers?.map((offer)=>{ 
              
              return (

              <OfferCard offer={offer} owner={offer.owner} key={offer._id} setIsOpenModalDelete={setIsOpenModalDelete} isOpenModalDelete={isOpenModalDelete}   />

            )})}
            
            
         </OfferList>
         {isOpenModalDelete &&<ModalDelete isOpen={isOpenModalDelete} setIsOpen={setIsOpenModalDelete} />}
            <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                    filteredProjects={offers}
                  />
    </SectionContainer>
  )
}
