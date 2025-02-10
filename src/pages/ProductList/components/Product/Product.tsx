import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import path from 'src/constants/path'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurency, formatNumberToSocialStyle, generateNameId } from 'src/utils/utils'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  return (
    <Link to={`${path.home}${generateNameId({ name: product.name, id: product._id })}`}>
      <div className='bg-white shadow rounded-sm hover:translate-y-[-0.0625rem] hover:shadow-md hover:border-2 transition-all hover:border-primaryColor duration-100 overflow-hidden'>
        <div className='w-full pt-[100%] relative'>
          <img
            src={product.image}
            alt={product.name}
            className='top-0 left-0 w-full h-full pointer-events-none object-cover absolute'
          />
          <div className='absolute bottom-0 left-0 z-[1] w-full h-full'>
            <img
              src='https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m466c75w5ybr2d'
              alt=''
              className='w-full'
            />
          </div>
        </div>
        <div className='p-2 overflow-hidden '>
          <div className='min-h-[2rem] line-clamp-2 text-xs'>{product.name}</div>
          <div className='flex items-center mt-3'>
            <div className='line-through max-w-[50%] text-gray-500 text-xs truncate'>
              <span>₫</span>
              {formatCurency(product.price_before_discount)}
            </div>
            <div className='text-primaryColor text-sm ml-1'>
              <span>₫</span>
              {formatCurency(product.price)}
            </div>
          </div>
          <div className='flex items-center justify-end mt-3'>
            <ProductRating rating={product.rating} />
            <div className='ml-1 text-xs text-black'>
              <span>Đã bán</span>
              <span className='ml-1 lowercase'>{formatNumberToSocialStyle(product.sold)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
