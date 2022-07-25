import React, { ChangeEvent, FormEvent, HTMLProps, MutableRefObject, useEffect, useRef, useState } from 'react';
import Content from './Content';
import Navigate from './Navigate';




const pages = Array.from({length:8}).map((_,i) => i + 1);

const App = () => {
  const [viewIndex,setViewIndex] = useState(0)
  const pageRef = useRef<HTMLDivElement[] | null>([])

  const moveToTargetPage = (index:number) => () => {
    if(pageRef.current){
      pageRef.current[index].scrollIntoView({
        block:'start',
        behavior:"smooth",
        inline:'center'
      })
    }
  }
 

  const options:IntersectionObserverInit = {
    root: null,
    threshold:0.5
  }
  const callback:IntersectionObserverCallback = (entries:IntersectionObserverEntry[],observer) => {
   entries.forEach((entry) => {
    const {isIntersecting,boundingClientRect} = entry;
    // pageYOffset 문서가 수직으로 얼마나 스크롤 됐는지 픽셀 단위로 반환한다.
    const scrollTop = window.pageYOffset;
    // 이벤트가 발생된 target의 height
    const {height} = boundingClientRect;
    
    if(isIntersecting) {
      const index = Math.round(scrollTop / height);
      setViewIndex(index);
    }
   })
  }
  const io = new IntersectionObserver(callback,options);

  useEffect(() => {
    pageRef.current!.forEach((item) => io.observe(item))
    return () => {
      pageRef.current!.forEach((item) => io.unobserve(item))
    }
  },[])
  
  return (<div>
    <Navigate pages={pages} viewIndex={viewIndex} moveToTargetPage={moveToTargetPage} />
    {pages.map((page,index) => <Content key={index} page={page} ref={(r) =>{ if(r && pageRef.current) return pageRef.current[index] = r}} />)}
  </div>)
};

export default App;