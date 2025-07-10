import { useState, useEffect } from "react";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { HiOutlineViewList } from "react-icons/hi";

export const OfferList = ({ children, view = false, isListCard, isListCardApplied, isListCardByDev }) => {
  const [viewList, setViewList] = useState(view);

  const hiddenButton = !(isListCard || isListCardApplied || isListCardByDev);
  // Actualiza el estado interno si la prop view cambia desde afuera
  useEffect(() => {
    setViewList(view);
  }, [view]);

  const handleChange = () => setViewList(prev => !prev);

  return (
    <div className='flex flex-col'>
      <div className='flex justify-end'>
        <button onClick={handleChange} className={`border hidden xl:block border-gray-300 p-2 rounded-md ${hiddenButton && "xl:hidden"} `}>
          {viewList ? <BsGrid3X3GapFill /> : <HiOutlineViewList />}
        </button>
      </div>

      {viewList ? (
        <ul className={`grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 ${hiddenButton && "xl:mt-12"}`}>
          {children}
        </ul>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-4'>
          {children}
        </div>
      )}
    </div>
  );
};