import React,{ComponentPropsWithRef, forwardRef} from 'react';

interface ContentProps extends ComponentPropsWithRef<'div'> {
  page:number
}


const Content = forwardRef<HTMLDivElement,ContentProps>(({page},ref) => {
  return (
    <div className='h-[100vh] leading-[100vh] text-center text-[15rem]' ref={ref}>
      {page}
    </div>
  );
});

export default Content;