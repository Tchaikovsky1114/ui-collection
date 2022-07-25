import React from 'react';

interface NavigateProps {
  moveToTargetPage: (index: number) => () => void
  viewIndex: number;
  pages: number[]
}

const Navigate = ({moveToTargetPage,viewIndex,pages}:NavigateProps) => {
  return (
    <nav className='fixed left-0 right-0 top-0 p-0 m-0 bg-blue-300 overflow-hidden'>
      <ul className='h-16 w-full flex flex-row justify-center items-center p-1'>
      {pages.map((page,index) => <li className={`relative flex-1 text-center py-2 rounded-lg
      ${viewIndex === index ? "bg-white text-rose-500 font-bold text-xl" : ""}
      `}><button className='w-full h-full' onClick={moveToTargetPage(index)}>{page}</button></li> )}
      </ul>
    </nav>
  );
};

export default Navigate;