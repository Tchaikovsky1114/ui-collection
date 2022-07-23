import React, { useEffect, useState } from 'react';
import { FoodType } from './App';
import DetailItem from './DetailItem';
import uuid from 'react-uuid';
import Pagination from './Pagination';
interface DetailsProps {
  food: FoodType[];
  totalCount:number
  inputValue: string;
  setFood: React.Dispatch<React.SetStateAction<FoodType[]>>
}

const Details = ({ food,totalCount,inputValue,setFood }: DetailsProps) => {
 

  return (
    <>
    <ul className='flex flex-col justify-center items-center gap-4 min-h-[412px] '>
      {food.map((foodItem,i) => (
        <li key={uuid()}>
          <DetailItem foodInfo={foodItem} />
        </li>
      ))}
      
    </ul>
    <div className='py-4'>
    <Pagination totalCount={totalCount} inputValue={inputValue} setFood={setFood} />
    </div>
    </>
  );
};

export default Details;
