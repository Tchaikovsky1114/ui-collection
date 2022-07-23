import React, { useCallback, useState } from 'react';
import uuid from 'react-uuid'
import axios from 'axios'
import { API_KEY, FoodType } from './App';



interface PaginationProps {
  totalCount: number;
  inputValue:string;
  setFood: React.Dispatch<React.SetStateAction<FoodType[]>>
}

const Pagination = ({ totalCount,inputValue,setFood }: PaginationProps) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [page, setPage] = useState(1);

  const pageNumber = totalCount === 10 ? 1 : Math.ceil(totalCount / 10);
  
  
  const getData = async(pNumber:number) => {
    //&desc_kor=%EB%B0%94%EB%82%98%EB%82%98%EC%B9%A9&pageNo=1&numOfRows=3&bgn_year=2017&type=json
    const responseData = await axios.get(`${API_KEY}&desc_kor=${inputValue}&pageNo=${pNumber}&numOfRows=10&bgn_year=2017&type=json`)

    setFood(responseData.data.body.items);
  }
  const getDataOnPage =async (number: number) => {
      setCurrentPageNumber(number);
      await getData(number)
    }

  const increasePageNumber = () => {
    setCurrentPageNumber((prev) => prev + 1);
    const callScadulingNumber = currentPageNumber + 1
    getData(callScadulingNumber)
  }

  const decreasePageNumber = () => {
    setCurrentPageNumber((prev) => prev - 1);
    const callScadulingNumber = currentPageNumber - 1
    getData(callScadulingNumber)
  }

  return (
    <div
      className={` bg-secondary border w-fit border-slate-700 px-4 py-3 flex items-center justify-between rounded-md sm:px-6 absolute left-1/2 -translate-x-1/2 `}
    >
      <div className="m-auto flex justify-center sm:hidden ">
        <button
          className={`relative inline-flex items-center shrink px-2 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
          onClick={decreasePageNumber}
          // onClick={getNewsOnPage}
        >
          Previous
        </button>
        <button
          className="ml-3 relative inline-flex items-center px-5 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          onClick={increasePageNumber}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-primary pr-4">
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">10</span> of{' '}
            <span className="font-medium">{totalCount}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-slate-900 disabled:text-gray-400"
              onClick={decreasePageNumber}
              disabled={currentPageNumber <= 1}
            >
              <span className="sr-only">Previous</span>
              <div className="h-5 w-5 font-bold" aria-hidden="true">
                ←
              </div>
            </button>
            {/* create button */}
            {Array(pageNumber).fill(0)
              .map((_, i) => (
                <button
                  key={uuid()}
                  aria-current={currentPageNumber === i + 1 && "page"}
                  className="z-10 bg-primary border-slate-300 text-primary relative inline-flex items-center px-4 py-2 border text-sm font-medium curren"
                  onClick={() => getDataOnPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

            <button
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-slate-900 disabled:text-gray-400`}
              onClick={increasePageNumber}
              disabled={pageNumber === currentPageNumber}
            >
              <span className="sr-only">Next</span>
              <div className="h-5 w-5 font-bold" aria-hidden="true">
                →
              </div>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
