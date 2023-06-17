import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
// import items from '../homePage/items.js'
const Carousel = ({ items, visibleItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalItems = items.length;
  const lastIndex = totalItems - visibleItems;
  const prevIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
  const nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;

  const handlePrevClick = () => setCurrentIndex(prevIndex);
  const handleNextClick = () => setCurrentIndex(nextIndex);

  return (
    <div className="relative">
      <div className="flex overflow-x-auto pl-8 xs:mt-8 ">
        {items.slice(currentIndex, currentIndex + visibleItems).map((item, index) => (
          <div key={index} className="px-2 w-[7rem] pr-7 ">
            <a href={item.href} className='flex flex-col items-center justify-center hover:text-[#014e56] hover:opacity-80  '>
              <img src={item.image} alt={item.alt} className=' mb-3 min-h-[3rem] min-w-[3rem] h-9  hover:cursor-pointer ' />
              <div className="text-center font-semibold text-sm hover:cursor-pointer ">{item.title}</div>
            </a>
          </div>
        ))}
      </div>

      <div className="absolute top-[45%] left-0 transform -translate-y-[70%]">
        <button onClick={handlePrevClick} className="hover:bg-gray-200 hover:p-3 hover:rounded-full ">
          <ChevronLeftIcon className="h-6 w-6 fill-[#014e56] " />
        </button>
      </div>

      <div className="absolute top-[45%] right-0 transform -translate-y-[70%]">
        <button onClick={handleNextClick} className="hover:bg-gray-200 hover:p-3 hover:rounded-full ">
          <ChevronRightIcon className="h-6 w-6 fill-[#014e56] " />
        </button>
      </div>
      
    </div>
  );
};

export default Carousel;
