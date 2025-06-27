import { PiMapPinArea } from "react-icons/pi";
import { MdOutlineAccessTime } from "react-icons/md";
import { getDaysSince } from "../../utils/utils";
import { AvatarImage } from "../../components/AvatarImage";
import { NameUsers } from "../../components/NameUsers";

export const SearchOfferCard = ({ offer }) => {
  const handleClick = () => {
    window.location.href = `/offers/${offer._id}`;
  };

  const daysAgo = offer?.createdAt ? getDaysSince(offer?.createdAt) : 0;

  return (
    <li
      onClick={handleClick}
      className="card border bg-neutral-80 border-neutral-70 cursor-pointer shadow-xl hover:bg-neutral-90 transition-transform transform hover:scale-105"
    >
      <div className="card-body gap-2 p-4">
        {/* Header: avatar + name + badge */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <AvatarImage user={offer.owner} width={8} />
            <NameUsers user={offer.owner} classProps="text-xs" />
          </div>
          <div className="badge badge-soft badge-info text-[11px]">
            {offer.contractType}
          </div>
        </div>

        {/* Title + Role */}
        <div className="flex flex-col">
          <h3 className="text-lg font-bold truncate">{offer?.position}</h3>
          <p className="text-neutral-10 text-sm">{offer?.role}</p>
        </div>

        {/* Location and posting date on the same line */}
        <div className="flex justify-between items-center text-xs text-neutral-10">
          <div className="flex items-center gap-2">
            <PiMapPinArea className="size-4 text-primary-60" />
            <span>{offer?.location}</span>
          </div>

          <div className="flex items-center gap-1 text-neutral-20 text-xs">
            <MdOutlineAccessTime className="size-4" />
            <span>
              Posted {daysAgo} day{daysAgo !== 1 ? "s" : ""} ago
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};
