import { Link } from "react-router";
import { getDaysSince } from "../../../utils/utils";
import { TfiLocationPin } from "react-icons/tfi";
import { MdOutlineAccessTime } from "react-icons/md";
import { useState } from "react";
import { TiThMenuOutline } from "react-icons/ti";
import { MainRecButton } from "../../../components/MainRecButton";
import { MenuCard } from "./MenuCard";

export const OfferCard = ({ classProps, offer}) => {
  const [openMenu, setOpenMenu] = useState(false)

const handleOnClick = (e) => {
  e.preventDefault();
};



  const daysAgo = offer?.createdAt ? getDaysSince(offer?.createdAt) : 0;
  return (
    <Link to={`/offers/${offer?._id}`}>
      <li
        key={offer?._id}
        className={`${
          classProps && classProps
        } card border bg-neutral-80 border-neutral-70 cursor-pointer max-h-80 shadow-xl hover:bg-secondary-100`}
      >
        <div className='card-body'>
        <MenuCard onClick={handleOnClick} />
        
        <div className='flex flex-col justify-between'>
              <h3 className='text-xl font-bold'>{offer?.position}</h3>
              <p className="text-neutral-10">{offer?.role}</p>
              </div>
                  <div className="flex gap-4">
                  <div className='flex items-center gap-2'><TfiLocationPin />{offer.location}</div>
                  <div className="badge text-neutral-0 bg-neutral-60">{offer?.contractType}</div>
                  </div>
                  <p className='line-clamp-3'>{offer.description}</p>
                  <div className="flex items-center justify-end gap-4 m-2">
                    <MainRecButton classProps='rounded-full w-18'>Apply</MainRecButton>
                    <MainRecButton classProps='rounded-full w-18 text-secondary-40 bg-transparent'>Contact</MainRecButton>
                  </div>
                  
                  <div className=' flex  items-center text-neutral-20 text-xs'>
                    <p className='flex items-center gap-2 '><MdOutlineAccessTime />Posted {daysAgo} day{daysAgo !== 1 ? "s" : ""} ago</p>
                    <span>{offer.applicants ? `${offer.applicants.length} Aplicants` : "0 Aplicants"}</span>
                  </div>
        </div>
      </li>
    </Link>
  );
};
