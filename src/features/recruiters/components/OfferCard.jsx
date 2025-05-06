import { Link } from "react-router";

export const OfferCard = ({ classProps, children, onClick, key, link }) => {
  return (
    <Link to={`/offers/${link}`}>
      <li
        key={key}
        className={`${
          classProps && classProps
        } card bg-base-300 border border-base-100 cursor-pointer`}
        onClick={onClick}
      >
        <div className='card-body'>{children}</div>
      </li>
    </Link>
  );
};
