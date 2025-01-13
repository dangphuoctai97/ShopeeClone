import React from 'react'
import { Link } from 'react-router-dom'
import path from '../../../constants/path'
import Input from '../../../components/Input'
import Button from '../../../components/Button'

export default function AsideFilter() {
  return (
    <div className='py-4'>
      <Link to={path.home} className='flex items-center font-bold'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-4 mr-3 fill-current'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
          />
        </svg>
        Tất cả danh mục
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <ul>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2 text-primaryColor font-bold'>
            <svg viewBox='0 0 4 7' className='fill-primaryColor size-2 absolute top-1 left-[-10px]'>
              <polygon points='4 3.5 0 0 0 7' />
            </svg>
            Thời trang nam
          </Link>
        </li>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2'>
            Áo khoác
          </Link>
        </li>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2'>
            Quần Jeans
          </Link>
        </li>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2'>
            Điện thoại
          </Link>
        </li>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2'>
            Áo sơ mi
          </Link>
        </li>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2'>
            ốp lưng Iphone
          </Link>
        </li>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2'>
            Giày thể thao
          </Link>
        </li>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2'>
            Quần thun baggy
          </Link>
        </li>
      </ul>
      <Link to={path.home} className='flex items-center font-bold mt-4 uppercase'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-4 mr-3'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z'
          />
        </svg>
        Bộ lọc tìm kiếm
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='my-5'>
        <div>Khoảng giá</div>
        <form action='' className='mt-2'>
          <div className='flex items-start'>
            <Input
              type='text'
              className='grow'
              name='from'
              placeholder='₫ Từ'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm focus:bg-blue-100 rounded-sm'
            />
            <div className='mx-2 mt-2 shrink-0'>-</div>
            <Input
              type='text'
              className='grow'
              name='from'
              placeholder='₫ Đến'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm focus:bg-blue-100 rounded-sm'
            />
          </div>
          <Button
            type='submit'
            className='w-full text-center p-2 uppercase bg-primaryColor text-white text-sm hover:bg-primaryColor/80 rounded-sm flex justify-center items-center gap-2'
          >
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='my-5'>
        <div>Đánh giá</div>
        <ul className='my-3'>
          <li className='py-1 pl-2'>
            <Link to='' className='flex items-center text-sm'>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <svg
                    key={index}
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='fill-yellow-400'
                    className='size-4 mr-1 fill-yellow-400'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
                    />
                  </svg>
                ))}
              <span>Trở lên</span>
            </Link>
          </li>
          <li className='py-1 pl-2'>
            <Link to='' className='flex items-center text-sm'>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <svg
                    key={index}
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-4 mr-1'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
                    />
                  </svg>
                ))}
              <span>Trở lên</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className='bg-gray-300 h-[1px] my-4' />
      <Button
        type='submit'
        className='w-full text-center p-2 uppercase bg-primaryColor text-white text-sm hover:bg-primaryColor/80 rounded-sm flex justify-center items-center gap-2'
      >
        Xóa tất cả
      </Button>
    </div>
  )
}
