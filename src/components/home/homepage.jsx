import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { getOffers } from '../../services/offersServices';
import { getDaysSince } from "../../utils/utils";
import { MdOutlineAccessTime } from "react-icons/md";
import { PiMapPinArea } from 'react-icons/pi';
import Badge from "../../components/Badge";
import { AvatarImage } from "../../components/AvatarImage";
import { NameUsers } from "../../components/NameUsers";

export const Home = () => {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await getOffers();
        setOffers(data.offers);
      } catch (error) {
        console.error("Error al obtener las ofertas aplicadas:", error);
      }
    };
  },);

  const handleViewOffer = (offerId) => {
    navigate(`/offers/${offerId}`);
  };

  return (
    <div className="w-full px-2 sm:px-4">
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {currentOffers.map((offer) => {
          const daysAgo = offer?.createdAt ? getDaysSince(offer?.createdAt) : 0;
          
          return (
            <li
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
                  <Badge text={"Applied"} />
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
    </div>
  );
};