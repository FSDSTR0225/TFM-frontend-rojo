import { useState } from "react";
import { useEffect } from "react";
import { getOffersbyOwner} from "../../../services/offersServices";
import { OfferCard } from "../components/OfferCard";
import { SectionContainer } from "../../../components/SectionContainer";
import { OfferList } from "../components/OfferList";
import { Pagination } from "../../../components/Pagination";
import { ModalDelete } from "../components/ModalDelete";
import { OfferModal } from "../components/OfferModal";
import { AuthContext } from "../../../context/authContext";
import { useContext } from "react";


export const RecOffers = () => {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
  const {profile} = useContext(AuthContext)

  const [operacion, setOperacion] = useState('crear');
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);

  const totalPages = Math.ceil(offers.length / 6);
  const startIndex = (currentPage - 1) * 6;
  const currentOffers = offers.slice(startIndex, startIndex + 6);
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

  useEffect(() => {
    if (!profile?._id) return;
    fetchOffers()
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

const totalApplications = (Array.isArray(offers) ? offers : []).reduce(
  (total, offer) => total + (offer.applicants?.length ?? 0),
  0
);

const applicationsLast7Days = (Array.isArray(offers) ? offers : []).reduce(
  (total, offer) =>
    total +
    (offer.applicants
      ? offer.applicants.filter(
          (app) =>
            new Date(app.appliedDate) >=new Date(new Date().setDate(new Date().getDate() - 7))
        ).length
      : 0),
  0
);

const averageApplicationsLast7Days = applicationsLast7Days / 7;
console.log("🚀 ~ RecOffers ~ averageApplicationsLast7Days:", averageApplicationsLast7Days)
    console.log("🚀 ~ RecOffers ~ applicationsLast7Days:", applicationsLast7Days)



  return (
    <>
      <h2 className='text-3xl font-bold text-neutral-0'>My Offers</h2>
      {/* Stats */}
      <aside className="flex flex-col gap-4 justify-around m-4 items-center">
      <h3 className="text-xl font-bold">Stats</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        <article className="card bg-neutral-80 shadow-xl border border-neutral-70 flex-col items-center max-w-50">
          <div className="card-body">
            <h3 className="text-md font-bold text-neutral-0">Offers</h3>
            <p className="text-2xl">{offers.length}</p>
            <p className="text-sm text-neutral-20">Active Offers</p>
          </div>
        </article>
        <article className="card bg-neutral-80 shadow-xl border border-neutral-70 flex-col">
          <div className="card-body">
            <h3 className="text-md font-bold text-neutral-0">Applications</h3>
            <p className="text-2xl">{totalApplications}</p>
            <p className="text-sm text-neutral-20">{averageApplicationsLast7Days}% Last 7 days</p>
          </div>
        </article>
        <article className="card bg-neutral-80 shadow-xl border border-neutral-70 flex-col">
          <div className="card-body">
            <h3 className="text-md font-bold text-neutral-0">Average</h3>
            <p className="text-2xl">{(totalApplications / offers.length).toFixed(2)}</p>
            <p className="text-sm text-neutral-20">Applications per offer</p>
          </div>
        </article>
        <article className="card bg-neutral-80 shadow-xl border border-neutral-70 flex-col">
          <div className="card-body">
            <h3 className="text-md font-bold text-neutral-0">Recent</h3>
            <p className="text-2xl">{applicationsLast7Days}</p>
            <p className="text-sm text-neutral-20">Aplications last week</p>
          </div>
        </article>
      </div>
        
      </aside>
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