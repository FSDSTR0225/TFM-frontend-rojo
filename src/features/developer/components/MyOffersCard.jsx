import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router";
import { getOffersAppliedByDev } from '../../../services/offersServices';
import { AuthContext } from '../../../context/authContext';
import { getDaysSince } from "../../../utils/utils";
import { MdOutlineAccessTime } from "react-icons/md";
import { PiMapPinArea } from 'react-icons/pi';
import { MainRecButton } from "../../../components/MainRecButton";
import Badge from "../../../components/Badge";
import { AvatarImage } from "../../../components/AvatarImage";
import { NameUsers } from "../../../components/NameUsers";
import { Pagination } from "../../../components/Pagination";

function MyOffersCard() {
  const { profile: currentUser, token } = useContext(AuthContext);
  const [offers, setOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [offersPerPage] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await getOffersAppliedByDev(currentUser._id, token);
        setOffers(data.offers);
      } catch (error) {
        console.error("Error al obtener las ofertas aplicadas:", error);
      }
    };

    if (currentUser && token) {
      fetchOffers();
    }
  }, [currentUser, token]);

  const handleRemoveApplication = async (offerId) => {
    // Meter lógica borrar la postulación
    console.log("Retirar postulación de:", offerId);
  };

  const handleViewOffer = (offerId) => {
    navigate(`/offers/${offerId}`);
  };

  const handleOwnerClick = (e, ownerId) => {
    e.stopPropagation();
    navigate(`../../recruiter/${ownerId}`);
  };

   // Cálculos para la paginación
  const totalPages = Math.ceil(offers.length / offersPerPage);
  const indexOfLastOffer = currentPage * offersPerPage;
  const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
  const currentOffers = offers.slice(indexOfFirstOffer, indexOfLastOffer);

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll suave al top
  };

  return (
    <div className="w-full">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentOffers.map((offer) => {
          const daysAgo = offer?.createdAt ? getDaysSince(offer?.createdAt) : 0;
          
          return (
            <li
              key={offer._id}
              onClick={() => handleViewOffer(offer._id)}
              className="card border bg-neutral-80 border-neutral-70 cursor-pointer max-h-80 shadow-xl hover:bg-neutral-90 transition-transform transform hover:scale-105"
            >
              <div className='card-body justify-between'>
                <div className='flex justify-between items-center'>
                  <div className="flex items-center gap-2" onClick={(e) => handleOwnerClick(e, offer.owner._id)}>
                    <AvatarImage user={offer.owner} width={8} />
                    <NameUsers user={offer.owner} classProps={"text-xs"}/>
                  </div>
                  <Badge text={"Applied"} />
                </div>

                <div className='flex flex-col justify-between'>
                  <h3 className='text-xl font-bold'>{offer?.position || offer?.title}</h3>
                  <p className='text-neutral-10'>{offer?.role || offer?.company}</p>
                </div>

                <div className='flex gap-4'>
                  <div className='flex items-center gap-2'>
                    <PiMapPinArea className='size-4' />
                    {offer.location}
                  </div>
                  <div className='badge text-neutral-0 bg-neutral-60'>{offer?.contractType}</div>
                </div>

                <div>
                  <p className='line-clamp-3'>{offer?.description}</p>
                </div>

                <div className='flex items-center justify-end gap-4 m-2'>
                  <MainRecButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveApplication(offer._id);
                    }}
                    classProps='rounded-full w-fit hover:border-red-500 hover:text-red-500 text-red-400 hover:bg-transparent bg-transparent'
                  >
                    Remove Apply
                  </MainRecButton>
                  <MainRecButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewOffer(offer._id);
                    }}
                    classProps='rounded-full w-fit hover:border-neutral-0 hover:text-neutral-0 text-secondary-40 hover:bg-transparent bg-transparent'
                  >
                    View Offer
                  </MainRecButton>
                </div>

                <div className='flex items-center text-neutral-20 text-xs'>
                  <p className='flex items-center gap-2'>
                    <MdOutlineAccessTime />
                    Posted {daysAgo} day{daysAgo !== 1 ? "s" : ""} ago
                  </p>
                  <span>{offer?.applicants ? `${offer?.applicants.length} Applicants` : "0 Applicants"}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        filteredProjects={offers} 
      />
    </div>
  );
}

export default MyOffersCard;