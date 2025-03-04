import { Link } from 'react-router-dom'
import path from 'src/constants/path'

export default function NotFound() {
  return (
    <div className='bg-white '>
      <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
        <div className='mx-auto max-w-screen-sm text-center'>
          <h1 className='mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primaryColor'>404</h1>
          <p className='mb-4 text-3xl tracking-tight font-bold text-primaryColor md:text-4xl '>Có gì đó sai sai.</p>
          <p className='mb-4 text-lg font-light text-black'>
            Xin lỗi, chúng tôi không tìm thấy trang. Bạn sẽ tìm thấy nhiều điều để khám phá trên trang chủ.{'{'}' '{'}'}
          </p>
          <Link
            to={path.home}
            className='inline-flex text-white bg-primaryColor hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4'
          >
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  )
}
