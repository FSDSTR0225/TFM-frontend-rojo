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
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll smooth/suave al top
  };

  return (
    <div className="w-full px-2 sm:px-4">
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {currentOffers.map((offer) => {
          const daysAgo = offer?.createdAt ? getDaysSince(offer?.createdAt) : 0;

          const myApp = offer.applicants.find(a =>
            a.user?._id?.toString() === currentUser?._id?.toString()
          );

          const status = myApp?.status || "pending";
          const badgeText = status.charAt(0).toUpperCase() + status.slice(1);
          
          return (
            <li
              key={offer._id}
              onClick={() => handleViewOffer(offer._id)}
              className="card border bg-neutral-80 border-neutral-70 cursor-pointer shadow-xl hover:bg-neutral-90"
            >
              <div className='card-body p-4 sm:p-6 justify-between space-y-3 sm:space-y-4'>
                {/* Header con usuario y badge */}
                <div className='flex justify-center items-start gap-2'>
                  <div className="flex items-center gap-2 flex-1 min-w-0" onClick={(e) => handleOwnerClick(e, offer.owner._id)}>
                    <AvatarImage user={offer.owner} width={8} />
                    <div className="min-w-0 flex-1">
                      <NameUsers user={offer.owner} classProps={"text-xs sm:text-sm truncate"}/>
                    </div>
                  </div>
                  <span className="bg-gradient-to-r from-secondary-90 to-primary-90 rounded-md px-2 py-0.5 w-fit h-fit inline-block text-xs">
                    {badgeText || ''}
                  </span>
                </div>

                {/* Título y empresa */}
                <div className='space-y-1'>
                  <h3 className='text-lg sm:text-xl font-bold line-clamp-2'>{offer?.position || offer?.title}</h3>
                  <p className='text-neutral-10 text-sm sm:text-base'>{offer?.role || offer?.company}</p>
                </div>

                {/* Ubicación y tipo de contrato */}
                <div className='flex flex-col sm:flex-row gap-2 sm:gap-4'>
                  <div className='flex items-center gap-2 text-sm'>
                    <PiMapPinArea className='size-4 flex-shrink-0' />
                    <span className="truncate">{offer.location}</span>
                  </div>
                  <div className='badge text-neutral-0 bg-neutral-60 text-xs w-fit'>{offer?.contractType}</div>
                </div>

                {/* Descripción */}
                <div>
                  <p className='line-clamp-2 sm:line-clamp-3 text-sm sm:text-base'>{offer?.description}</p>
                </div>

                {/* Footer con tiempo y aplicantes */}
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-neutral-20 text-xs border-t border-neutral-70 pt-3'>
                  <p className='flex items-center gap-2'>
                    <MdOutlineAccessTime className="flex-shrink-0" />
                    <span>Posted {daysAgo} day{daysAgo !== 1 ? "s" : ""} ago</span>
                  </p>
                  <span className="text-right sm:text-left">{offer?.applicants ? `${offer?.applicants.length} Applicants` : "0 Applicants"}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 sm:mt-8">
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          filteredProjects={offers} 
        />
      </div>
    </div>
  );
}

export default MyOffersCard;