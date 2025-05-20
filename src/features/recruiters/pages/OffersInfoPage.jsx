import React from 'react'
import { useState } from 'react'
import { getOffers } from '../../../services/offersServices'
import { useEffect } from 'react'
import { OfferCard } from '../components/OfferCard';
import { SectionContainer } from '../../../components/SectionContainer';
import {OfferList} from '../components/OfferList'
import { Pagination } from '../../../components/Pagination';
import { ModalDelete } from '../components/ModalDelete';
import { PiFunnel, PiFunnelX, PiSortAscending, PiSortDescending } from 'react-icons/pi';







export const OffersInfoPage = () => {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
const [currentPage, setCurrentPage] = useState(1);
const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)

const [filtersOpen, setFiltersOpen] = useState(false);
const [contractTypeFilter, setContractTypeFilter] = useState('')
const [skillsFilter, setSkillsFilter] =useState([])
const [sortOrder, setSortOrder] = useState('desc')

const resetFilters = () => {
  setContractTypeFilter('');
  setSkillsFilter([]);
};

const getFilteredOffers = () => {
  let filtered = [...offers]

  if (contractTypeFilter) {
    filtered = filtered.filter((offer)=> offer.contractType.includes(contractTypeFilter))
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
  const totalPages = Math.ceil(filteredOffers.length / 6);
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

      {/* change popover-1 and --anchor-1 names. Use unique names for each dropdown */}
      <div className='flex items-center gap-4 xl:-mb-8 mt-6'>
<div className='relative'>
<label className="btn btn-md swap swap-rotate w-25">
  <input
    type="checkbox"
    checked={filtersOpen}
    onChange={() => setFiltersOpen(prev => !prev)}
  />
  <div className="swap-on flex items-center gap-2">
    <PiFunnelX className="size-5" /> Filters
  </div>
  <div className="swap-off flex items-center gap-2">
    <PiFunnel className="size-5" /> Filters
  </div>
</label>

{/* selectores del filtro */}
{filtersOpen && (
  <ul className="absolute top-12  z-50 rounded-box bg-neutral-90 shadow-lg border-2 border-neutral-70 min-w-85">
    <li className="flex flex-col p-4 border-b-2 border-neutral-50">
      <label>
        Type Contract:
        
      </label>
      <select
      className='p-2 mt-2 bg-neutral-90 border-2 border-neutral-70'
          value={contractTypeFilter}
          onChange={(e) => setContractTypeFilter(e.target.value)}
        >
          <option value="" className='bg-neutral-90 p-2'>All</option>
          {contractsTypes.map((contract, index) => (
            <option className='bg-neutral-90 p-2' key={index} value={contract}>
              {contract}
            </option>
          ))}
        </select>
    </li>

    <li className="flex flex-col flex-wrap p-4 border-b-2 border-neutral-50">
      <fieldset className="flex items-center gap-2 flex-wrap">
        <legend className='mb-2'>Skills:</legend>
        {hardSkills.map((skill) => (
          <label className="flex items-center  cursor-pointer " key={skill}>
            <input
            className='btn btn-sm btn-outline btn-secondary-40 rounded-full'
            aria-label={skill}
              type="checkbox"
              checked={skillsFilter.includes(skill)}
              onChange={(e) => {
                const checked = e.target.checked;
                setSkillsFilter((prev) =>
                  checked ? [...prev, skill] : prev.filter((s) => s !== skill)
                );
              }}
            />
            {/* <span className="bg-neutral-70 border border-neutral-60 px-3 py-1 rounded-full shadow-xl ">{skill}</span> */}
          </label>
        ))}
      </fieldset>
    </li>

    <li className="p-4">
      <button
        onClick={resetFilters}
        className="btn btn-outline btn-error w-full"
      >
        Reset Filters
      </button>
    </li>
  </ul>
)}</div>


        

        
        

          <label className="btn btn-md swap swap-rotate w-25">
  <input  
    type="checkbox"
    checked={sortOrder === 'desc'} // ✅ Activa visualmente el swap
    onChange={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
  />
  <div className="swap-on flex inline-center gap-2"><PiSortAscending className='size-5' />Latest</div>
  <div className="swap-off flex inline-center gap-2"><PiSortDescending className='size-5'/>Oldest</div>
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
