import React from 'react'

export default function SortProductList() {
  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-2'>
          <div>Sắp xếp theo</div>
          <button className='text-center h-8 py-2 px-4 uppercase bg-primaryColor text-white text-sm hover:bg-primaryColor/80 rounded-sm flex justify-center items-center gap-2'>
            Phổ biến
          </button>
          <button className='text-center h-8 py-2 px-4 uppercase bg-white text-black text-sm hover:bg-slate-100 rounded-sm flex justify-center items-center gap-2'>
            Mới nhất
          </button>
          <button className='text-center h-8 py-2 px-4 uppercase bg-white text-black text-sm hover:bg-slate-100 rounded-sm flex justify-center items-center gap-2'>
            Bán chạy
          </button>
          <select
            value=''
            className='h-8 py-2 px-4 uppercase bg-white text-black outline-[0px] border-[0px] cursor-pointer text-sm hover:bg-slate-100 rounded-sm flex items-center'
          >
            <option value='' disabled>
              Giá
            </option>
            <option value='price:asc'>Giá: Thấp đến cao</option>
            <option value='price:desc'>Giá: Cao đến thấp</option>
          </select>
        </div>
        <div className='flex items-center gap-4'>
          <div>
            <span className='text-primaryColor'>1</span>
            <span>/2</span>
          </div>
          <div className='flex items-center'>
            <div>
              <button className='px-3 h-8 rounded-tl-sm rounded-bl-sm shadow bg-white/60 text-slate-400 hover:bg-slate-100 cursor-not-allowed'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                </svg>
              </button>
            </div>
            <div className='h-8 bg-slate-100 border border-l-[1px]' />
            <div>
              <button className='px-3 h-8 rounded-tl-sm rounded-bl-sm shadow bg-white/60 text-black hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
