import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Details from './Details';
import axios from 'axios'
export const API_KEY = 'https://apis.data.go.kr/1471000/FoodNtrIrdntInfoService1/getFoodNtrItdntList1?serviceKey=MyXj6g1gpARPPgQt0O5yc8MpM%2FArBXMg6GONzjmVoZoIfS4dXMP3ydfWn6IASEBNUXHxiVj9KpOidOwoSWFpBw%3D%3D'



export interface FoodType {
  ANIMAL_PLANT: string
BGN_YEAR: string;
DESC_KOR: string;
NUTR_CONT1: string;
NUTR_CONT2: string;
NUTR_CONT3: string;
NUTR_CONT4: string;
NUTR_CONT5: string;
NUTR_CONT6: string;
NUTR_CONT7: string;
NUTR_CONT8: string;
NUTR_CONT9: string;
SERVING_WT: string;
}

const App = () => {
  const [food,setFood] = useState<FoodType[]>([])
  const [inputValue,setInputValue] = useState('')
  const [totalCount,setTotalCount] = useState(0)



const changeHandler = (e:ChangeEvent<HTMLInputElement>) => {
  setInputValue(e.currentTarget.value)
}

const submitHandler = async(e:FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  //&desc_kor=%EB%B0%94%EB%82%98%EB%82%98%EC%B9%A9&pageNo=1&numOfRows=3&bgn_year=2017&type=json
  const responseData = await axios.get(`${API_KEY}&desc_kor=${inputValue}&pageNo=1&numOfRows=10&bgn_year=2017&type=json`)
  setTotalCount(responseData.data.body.totalCount)
  setFood(responseData.data.body.items);
}


window

  return (
    <div>
    <div className='p-4 flex flex-col justify-center items-center'>
      <h1 className="font-bold text-xl py-4">칼로리가 궁금한 음식을 검색해주세요!</h1>
      <h2 className='text-xs'>(상표명이 나오지 않는 제품은 표준 제품의 성분표입니다!)</h2>
      <form className='py-4 pb-4' onSubmit={submitHandler}>
        <input className='p-4 w-64 focus:outline-dashed focus:outline-2 focus:outline-rose-400' type="text" onChange={changeHandler} />
      </form>
      </div>  
     <Details food={food} totalCount={totalCount} inputValue={inputValue} setFood={setFood} />
     
    
    </div>
  );
};

export default App;