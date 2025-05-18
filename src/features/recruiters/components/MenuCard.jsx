import React from "react";
import { CiEdit } from "react-icons/ci";
import { GrFormView } from "react-icons/gr";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { TiThMenuOutline } from "react-icons/ti";
import { Link } from "react-router";
import { ModalDelete } from "./ModalDelete";
import { PiDotsThree, PiDotsThreeBold } from "react-icons/pi";

export const MenuCard = ({ onClick, id, openModal }) => {
  return (
    <details
      onClick={onClick}
      className='dropdown self-center'
    >
      <summary className='btn h-4 btn-outline rounded-full btn-square btn-sm bg-neutral-70 text-secondary-40  hover:bg-transparent hover:text-neutral-0 hover:border-neutral-0 '>
        <PiDotsThreeBold className="text-3xl font-black p-0 " />
      </summary>
      <ul className='menu p-0 dropdown-content rounded-box z-1 w-25 shadow-xl text-sm bg-secondary-40 text-neutral-90 left-[-200%]'>
        <li
          onClick={onClick}
          className=' rounded-t-box hover:bg-neutral-60 hover:text-neutral-0'
        >
          <Link to={`/offers/${id}`}>
            <GrFormView className='text-md' />
            View
          </Link>
        </li>
        <li
          onClick={onClick}
          className=' hover:bg-neutral-60 hover:text-neutral-0'
        >
          <button>
            <CiEdit />
            Edit
          </button>
        </li>
        <li
          onClick={openModal}
          className=' rounded-b-box hover:bg-red-600 hover:text-neutral-0 '
        ><div><MdOutlineDeleteSweep />
            Delete</div>
        </li>
      </ul>
    </details>
  );
};
