import { Link } from "react-router";

export const OfferCard = ({ classProps, children, onClick, id, link }) => {
  return (
    <Link to={`/offers/${link}`}>
      <li
        key={id}
        className={`${
          classProps && classProps
        } card bg-base-300 border border-base-100 cursor-pointer max-h-60 shadow-xl`}
        onClick={onClick}
      >
        <div className='card-body'>{children}</div>
      </li>
    </Link>
  );
};
