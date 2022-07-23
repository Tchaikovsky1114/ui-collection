import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import uuid from 'react-uuid'
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
  const [pageNumber,setPageNumber] = useState(1);
  const [totalCount,setTotalCount] = useState(0)
  const [isLoading,setIsLoading] = useState(false);
  const [isSearched,setIsSearched] = useState(false)
  const [lastData,setLastData] = useState('')
  const [preventChangeWord,setPreventChangeWord] = useState('')

  const observeTargetRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDetailsElement>(null)


const changeHandler = (e:ChangeEvent<HTMLInputElement>) => {
  setInputValue(e.currentTarget.value)
}

const fetchData = async(pageNumber:number) => {
  setIsLoading(true)

  try{
    
    const responseData = await axios.get(`
    https://apis.data.go.kr/1471000/FoodNtrIrdntInfoService1/getFoodNtrItdntList1?serviceKey=MyXj6g1gpARPPgQt0O5yc8MpM%2FArBXMg6GONzjmVoZoIfS4dXMP3ydfWn6IASEBNUXHxiVj9KpOidOwoSWFpBw%3D%3D&desc_kor=${preventChangeWord}&pageNo=${pageNumber}&numOfRows=10&bgn_year=2017&type=json`)
    
    if(!responseData.data.body.items){
      setLastData('마지막 페이지입니다.')
      throw Error('더 이상 찾는 정보가 없습니다!')
    }else{
      setLastData('')
      setFood(prev => [...prev,...responseData.data.body.items])
    }
  }catch(err){
    console.error(err)
  }
  setIsLoading(false)

}

const submitHandler = async(e:FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setIsLoading(true)
  setPreventChangeWord(inputValue)
  setPageNumber(1);
  //&desc_kor=%EB%B0%94%EB%82%98%EB%82%98%EC%B9%A9&pageNo=1&numOfRows=3&bgn_year=2017&type=json
  try{
    
    const responseData = await axios.get(`${API_KEY}&desc_kor=${inputValue}&pageNo=1&numOfRows=10&bgn_year=2017&type=json`)
    if(!responseData.data.body.items){
      setFood([])
      setTotalCount(0)
      setLastData('찾으시는 정보가 없습니다.')
      throw Error('찾으시는 정보가 없습니다.')
    }else{
      
      setLastData('')
      setTotalCount(responseData.data.body.totalCount)
      setFood(responseData.data.body.items);
    }
    
  }catch(err){
    console.error(err)
  }finally{
    setIsLoading(false)
    setIsSearched(true);
  }  
}

useEffect(() => {
  const option = {
    threshold: 0
  }
  const callback: IntersectionObserverCallback = (entry:IntersectionObserverEntry[],observer:IntersectionObserver) => {
    if(entry[0].isIntersecting && food){
      setPageNumber(prev => prev + 1);
      const schadulingNumber = pageNumber + 1
      fetchData(schadulingNumber);
    }
    if(observeTargetRef.current){
      observer.unobserve(entry[0].target);
      observer.observe(observeTargetRef.current);
    }
  }
  const io = new IntersectionObserver(callback,option)
  
  if(observeTargetRef.current){
    io.observe(observeTargetRef.current)
  }
  return () => {
    io && io.disconnect();
  }
},[pageNumber,food])
  
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
    <div className='relative m-8 pl-8'>
      <div className='py-4 text-center'>
      <h1 className='text-2xl font-bold'>Infinite Scroll</h1>
      <h2 className='text-lg'>::How many carlories on my food?::</h2>
      
    <form className='flex flex-col justify-center items-center' onSubmit={submitHandler}>
      <input className='py-1 px-4 my-2 mt-4 rounded-md shadow-md border border-teal400 focus:outline-2 focus:outline-dashed focus:outline-rose-400' type="text" onChange={changeHandler} />
    </form>
    <h3 className='font-bold text-sm px-2'>검색 결과 총:{' '} {totalCount} 건 있습니다.</h3>
    </div>
    <ul className='mt-12 flex flex-col gap-12'>
    {food.map((foodInfo) => 
      <details ref={detailsRef} className='cursor-pointer relative hover:text-yellow-700' open={false}>
      <summary className='border p-4 hover:border-yellow-400'>{foodInfo.DESC_KOR} {foodInfo.ANIMAL_PLANT} </summary>
      <ul className='absolute top-8 left-40 bg-yellow-400 min-w-[312px] flex flex-col gap-4 p-4 text-black rounded-lg z-10 text-left'>
        <li className='border-b-2 pb-2'><h3 className='font-bold'>{foodInfo.DESC_KOR} {foodInfo.ANIMAL_PLANT}</h3></li>
        <li>1회 섭취량 기준 : {foodInfo.SERVING_WT}g</li>
        <li>칼로리: {foodInfo.NUTR_CONT1}kcal</li>
        <li>탄수화물: {foodInfo.NUTR_CONT2}g (당류:{foodInfo.NUTR_CONT5}g)</li>
        <li>단백질: {foodInfo.NUTR_CONT3}g</li>
        <li>지방: {foodInfo.NUTR_CONT4}g (트랜스지방:{foodInfo.NUTR_CONT9}g)</li>
      </ul>
      
    </details>
    )}
    </ul>
      {lastData && isSearched && <div className='text-2xl text-bold text-rose-600 text-center py-4 mt-8'>{lastData}</div>}
     {!isLoading && isSearched ? <div className='absolute bottom-0 ' ref={observeTargetRef}></div> : null }
    </div>
  );
};

export default App;