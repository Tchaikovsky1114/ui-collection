import React, { useEffect, useRef, useState } from 'react';
import { FoodType } from './App';


interface DetailItemProps {
  foodInfo:FoodType

}

const DetailItem = ({foodInfo}:DetailItemProps) => {

  const detailsRef = useRef<HTMLDetailsElement>(null)

  const detailsCloseHandler = () => {
    detailsRef.current?.removeAttribute("open")
  }
  useEffect(() => {
    window.addEventListener('click', () => {
      detailsRef.current?.removeAttribute("open")
    })
    return () => {
      window.removeEventListener('click', () => {
        detailsRef.current?.removeAttribute("open")
      })
    }
  },[])

  return (
    <details ref={detailsRef} className='cursor-pointer relative hover:text-yellow-700' open={false}>
    <summary>{foodInfo.DESC_KOR} {foodInfo.ANIMAL_PLANT} </summary>
    <ul className='absolute top-8 left-40 bg-yellow-400 min-w-[312px] flex flex-col gap-4 p-4 text-black rounded-lg z-10'>
      <li className='border-b-2 pb-2'><h3 className='font-bold'>{foodInfo.DESC_KOR} {foodInfo.ANIMAL_PLANT}</h3></li>
      <li>1회 섭취량 기준 : {foodInfo.SERVING_WT}g</li>
      <li>칼로리: {foodInfo.NUTR_CONT1}kcal</li>
      <li>탄수화물: {foodInfo.NUTR_CONT2}g (당류:{foodInfo.NUTR_CONT5}g)</li>
      <li>단백질: {foodInfo.NUTR_CONT3}g</li>
      <li>지방: {foodInfo.NUTR_CONT4}g (트랜스지방:{foodInfo.NUTR_CONT9}g)</li>
      <li><button onClick={detailsCloseHandler}>닫기</button></li>
    </ul>
    
  </details>
  );
};

export default DetailItem;