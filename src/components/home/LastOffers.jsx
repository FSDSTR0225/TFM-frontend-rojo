import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { getOffers } from '../../services/offersServices';
import { getDaysSince } from "../../utils/utils";
import { MdOutlineAccessTime } from "react-icons/md";
import { PiMapPinArea } from 'react-icons/pi';
import { AvatarImage } from "../../components/AvatarImage";
import { NameUsers } from "../../components/NameUsers";
import { PiCaretRight, PiBag } from 'react-icons/pi';
import { Link } from 'react-router';

export const LastOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
        setLoading(true);
        try {
            const response = await getOffers();

            const data = response.data ?? response;

            let arr = [];
            if (Array.isArray(data.offers)) {
            arr = data.offers;
            } else if (Array.isArray(data)) {
            arr = data;
            } else {
            console.log("Formato inesperado de la API:", data);
            }

            const sortedOffers = arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOffers(sortedOffers);

        } catch (error) {
            console.error("Error en fetchOffers:", error);
            setOffers([]);
        }
        setLoading(false);
    };

    fetchOffers();
  }, []);

  const handleViewOffer = (offerId) => {
    console.log("Navigating to offer:", offerId);
    navigate(`/offers/${offerId}`);
  };

  const handleOwnerClick = (e, ownerId) => {
    e.stopPropagation();
    console.log("Navigating to recruiter:", ownerId);
    navigate(`../../recruiter/${ownerId}`);
  };

  if (loading) {
    return <p>Cargando ofertas...</p>;
  }

  return (
        <div className="w-full px-2 sm:px-4">
            <div>
                {/* <PiBag className="text-xl" /> */}
                <h1 className="text-3xl font-bold mb-2 mt-10">Last Offers</h1>
                <div className='grid grid-cols-2'>
                    <span className='text-neutral-20'>Find your next professional challenge</span>
                    <Link to={`/offers`} className="justify-self-end bg-transparent text-secondary-50 rounded-md flex items-center gap-1 text-sm">
                        View all<PiCaretRight className="" />
                    </Link>
                </div>
            </div>
        {offers.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-2 gap-3 sm:gap-4 w-full">
            {offers.slice(0,4).map((offer) => {
                const daysAgo = offer.createdAt ? getDaysSince(offer.createdAt) : 0;

                return (
                <li
                    key={offer._id}
                    onClick={() => handleViewOffer(offer._id)}
                    className="card border bg-neutral-80 border-neutral-70 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-1 hover:border-secondary-90 hover:shadow-[0_0_30px_5px_rgba(0,127,247,0.2)] text-inherit no-underline"
                >              
                    <div className='card-body p-4 sm:p-6 justify-between space-y-3 sm:space-y-4 relative rounded-lg'>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary-50 to-primary-50 rounded-t-lg"></div>
                    <div className='flex justify-between items-start gap-2'>
                        <div
                        className="flex items-center gap-2"
                        onClick={(e) => handleOwnerClick(e, offer.owner._id)}
                        >
                        <AvatarImage user={offer.owner} width={8} />
                        <div className="min-w-0">
                            <NameUsers user={offer.owner} classProps="text-xs sm:text-sm truncate" />
                        </div>
                        </div>
                    </div>

                    <div className='space-y-1'>
                        <h3 className='text-lg sm:text-xl font-bold line-clamp-2'>{offer.position || offer.title}</h3>
                        <p className='text-neutral-10 text-sm sm:text-base'>{offer.role || offer.company}</p>
                    </div>

                    <div className='flex flex-col sm:flex-row gap-2 sm:gap-4'>
                        <div className='flex items-center gap-2 text-sm'>
                        <PiMapPinArea className='size-4 flex-shrink-0' />
                        <span className="truncate">{offer.location}</span>
                        </div>
                        <div className='badge text-neutral-0 bg-neutral-60 text-xs w-fit'>{offer.contractType}</div>
                    </div>

                    <div>
                        <p className='line-clamp-2 sm:line-clamp-3 text-sm sm:text-base'>{offer.description}</p>
                    </div>

                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-neutral-20 text-xs border-t border-neutral-70 pt-3'>
                        <p className='flex items-center gap-2'>
                        <MdOutlineAccessTime className="flex-shrink-0" />
                        <span>Posted {daysAgo} day{daysAgo !== 1 ? "s" : ""} ago</span>
                        </p>
                        <span className="text-right sm:text-left">
                        {offer.applicants?.length ?? 0} Applicants
                        </span>
                    </div>
                    <Link to={`/offers/${offer._id}`} className="justify-self-center btn bg-gradient-to-r from-secondary-50 to-primary-50 rounded-md flex items-center gap-1">
                        View Offer
                    </Link>
                    </div>
                </li>
                );
            })}
            </ul>
        ) : (
            <p>No hay ofertas disponibles</p>
        )}
        </div>
  );
};
