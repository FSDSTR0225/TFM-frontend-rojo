import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { PiDotsThreeBold } from "react-icons/pi";

const DotsComponent = ({ onEdit, onDelete }) => {
  return (
    <details className='dropdown self-center'>
      <summary className='btn h-4 rounded-full btn-square btn-md bg-neutral-70 text-primary-40 hover:bg-transparent hover:text-neutral-0 hover:border-neutral-0'>
        <PiDotsThreeBold className="text-3xl font-black p-0" />
      </summary>
      <ul className='menu p-0 dropdown-content rounded-box z-1 w-25 shadow-xl text-sm bg-primary-40 text-neutral-90 left-[-200%]'>
        <li
          onClick={onEdit}
          className='hover:bg-neutral-60 hover:text-neutral-0'
        >
          <button>
            <CiEdit />
            Edit
          </button>
        </li>
        <li
          onClick={onDelete}
          className='rounded-b-box hover:bg-red-600 hover:text-neutral-0'
        >
          <div>
            <MdOutlineDeleteSweep />
            Remove
          </div>
        </li>
      </ul>
    </details>
  );
};

export default DotsComponent;
