import { useState } from "react";
import { useEffect } from "react";
import { getOffersbyOwner, getRecruitersStats} from "../../../services/offersServices";
import { OfferCard } from "../components/OfferCard";
import { OfferList } from "../components/OfferList";
import { Pagination } from "../../../components/Pagination";
import { ModalDelete } from "../components/ModalDelete";
import { OfferModal } from "../components/OfferModal";
import { AuthContext } from "../../../context/authContext";
import { useContext } from "react";
import { StatsAside } from "../components/StatsAside";
import { FilterOffers } from "../components/FilterOffers";


export const RecOffers = () => {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
  const [stats, setStats] = useState(null)
  const {profile} = useContext(AuthContext)

  const [operacion, setOperacion] = useState('crear');
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);

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
  const currentOffers = filteredOffers.slice(startIndex, startIndex + 6);
  const token = localStorage.getItem('token');
  const handlePageChange = (pageNum) => {
    if (pageNum === currentPage) return;
    setCurrentPage(pageNum); // Primero actualizamos la página

  };

  const fetchOffers = async () => {
    try {
      const offerData = await getOffersbyOwner(profile._id)
      setOffers(offerData)
      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  const fetchStats = async () =>{
    try {
      const statsData = await getRecruitersStats(profile._id)
      setStats(statsData)
    } catch (error) {
      console.error("Stats Error:", error);
    }
  }

  useEffect(() => {
    if (!profile?._id) return;
    fetchOffers()
    fetchStats()
  }, [profile])

  if (loading) {
    
    return (
      <>
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
      </>
    );
  }
  if (error) return <p>Error al cargar las ofertas: {error}</p>;

  return (
    <>
      <h2 className='text-3xl font-bold text-neutral-0'>My Offers</h2>
      {/* Stats */}
      <StatsAside stats={stats} loading={loading} />

      <FilterOffers         offers={offers}
              filtersOpen={filtersOpen}
              setFiltersOpen={setFiltersOpen}
              contractTypeFilter={contractTypeFilter}
              setContractTypeFilter={setContractTypeFilter}
              skillsFilter={skillsFilter}
              setSkillsFilter={setSkillsFilter}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              resetFilters={resetFilters}/>
      <OfferList view={true}>
        {currentOffers?.map((offer) => {

          return (

            <OfferCard offer={offer}
              owner={offer.owner}
              setIsOpenModalDelete={setIsOpenModalDelete}
              isOpenModalDelete={isOpenModalDelete}
              setSelectedOfferId={setSelectedOfferId}
              isOpenModalEdit={isOpenModalEdit}
              setIsOpenModalEdit={setIsOpenModalEdit}
              key={offer._id} />

          )
        })}


      </OfferList>
      {isOpenModalDelete && <ModalDelete isOpen={isOpenModalDelete} setIsOpen={setIsOpenModalDelete} reloadPage={fetchOffers} idOffer={selectedOfferId} />}
      {isOpenModalEdit && <OfferModal
        idOffer={selectedOfferId}
        isOpen={isOpenModalEdit}
        setIsOpen={setIsOpenModalEdit}
        token={token}
        reloadPage={fetchOffers} />
      }
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        filteredProjects={offers}
      />
    </>
  )
}