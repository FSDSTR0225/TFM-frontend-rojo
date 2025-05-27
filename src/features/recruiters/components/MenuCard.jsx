import { CiEdit } from "react-icons/ci";

import { MdOutlineDeleteSweep } from "react-icons/md";
import { PiDotsThreeBold } from "react-icons/pi";

export const MenuCard = ({ onClick, openModal, handleOnModalEdit }) => {

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
          onClick={handleOnModalEdit}
          className=' hover:bg-neutral-60 hover:text-neutral-0'
        >
          <button >
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
