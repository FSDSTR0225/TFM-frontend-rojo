import { Link } from "react-router";
import { getDaysSince } from "../../../utils/utils";
import { TfiLocationPin } from "react-icons/tfi";
import { MdOutlineAccessTime } from "react-icons/md";

export const OfferCard = ({ classProps, offer, onClick}) => {
  const daysAgo = offer.createdAt ? getDaysSince(offer.createdAt) : 0;
  return (
    <Link to={`/offers/${offer._id}`}>
      <li
        key={offer._id}
        className={`${
          classProps && classProps
        } card bg-base-300 border border-base-100 cursor-pointer max-h-60 shadow-xl`}
        onClick={onClick}
      >
        <div className='card-body'>
        <div className='flex justify-between items-center'>
              <h3 className='text-xl font-bold'>{offer.position}</h3>
              <div className="badge badge-soft badge-info">{offer.contractType}</div>
              </div>
              
                  <div className='flex items-center gap-3'><TfiLocationPin />{offer.location}</div>
                  <p className='line-clamp-3'>{offer.description}</p>
                  <div className=' flex mt-5 items-center text-gray-400 text-xs'>
                    <p className='flex items-center gap-3 '><MdOutlineAccessTime />Posted {daysAgo} day{daysAgo !== 1 ? "s" : ""} ago</p>
                    <span>{offer.applicants ? `${offer.applicants.length} Aplicants` : "0 Aplicants"}</span>
                  </div>
        </div>
      </li>
    </Link>
  );
};
