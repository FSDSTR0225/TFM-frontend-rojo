import { CiEdit } from "react-icons/ci";

import { MdOutlineDeleteSweep } from "react-icons/md";
import { PiDotsThreeBold } from "react-icons/pi";

export const MenuCard = ({ onClick, openModal, handleOnModalEdit }) => {

  return (
    <details
      onClick={onClick}
      className='dropdown self-center'
    >
      <summary className='btn h-4 rounded-full btn-square btn-md bg-neutral-70 text-secondary-40  hover:bg-transparent hover:text-neutral-0 hover:border-neutral-0 '>
        <PiDotsThreeBold className="text-3xl font-black p-0 " />
      </summary>
      <ul className='menu p-0 dropdown-content rounded-box z-1 w-25 top-6 shadow-xl text-sm bg-neutral-60 left-[-150%]'>
        
        <li
          onClick={handleOnModalEdit}
        >
          <div className=' hover:bg-secondary-60 rounded-b-none'>
            <CiEdit />
            Edit
          </div>
        </li>
        <li
          onClick={openModal}
          className=' rounded-b-box hover:bg-red-600'
        ><div><MdOutlineDeleteSweep />
            Delete</div>
        </li>
      </ul>
    </details>
  );
};
