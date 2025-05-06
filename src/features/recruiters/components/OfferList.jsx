import { useState, useEffect } from "react";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { HiOutlineViewList } from "react-icons/hi";

export const OffertList = ({ children, view = false }) => {
  const [viewList, setViewList] = useState(view);

  // Actualiza el estado interno si la prop view cambia desde afuera
  useEffect(() => {
    setViewList(view);
  }, [view]);

  const handleChange = () => setViewList(prev => !prev);

  return (
    <div className='flex flex-col'>
      <div className='flex justify-end'>
        <button onClick={handleChange} className='border border-gray-300 p-2 rounded-md'>
          {viewList ? <BsGrid3X3GapFill /> : <HiOutlineViewList />}
        </button>
      </div>

      {viewList ? (
        <ul className='grid grid-cols-1 gap-5 mt-5'>
          {children}
        </ul>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5'>
          {children}
        </div>
      )}
    </div>
  );
};