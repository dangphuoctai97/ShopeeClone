import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import ProductRating from 'src/components/ProductRating'
import { discountPercent, formatCurency, formatNumberToSocialStyle, getIdFromNameId } from 'src/utils/utils'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Product as ProductType, ProductListConfig } from 'src/types/product.type'
import Product from '../ProductList/components/Product'
import QuantityController from 'src/components/QuantityController'
import purchasesApi from 'src/apis/purchases.api'
import { queryClient } from 'src/main'
import { purchasesStatus } from 'src/constants/purchase'
import { toast } from 'react-toastify'

export default function ProductDetail() {
  const [buyCount, setBuyCount] = useState(1)
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const imageRef = useRef<HTMLImageElement>(null)

  const productDetailData = data?.data.data
  const currentImages = useMemo(
    () => (productDetailData ? productDetailData?.images.slice(...currentIndexImages) : []),
    [currentIndexImages, productDetailData]
  )

  useEffect(() => {
    if (productDetailData && productDetailData.images.length > 0) {
      setActiveImage(productDetailData.images[0])
    }
  }, [productDetailData])

  const queryConfig: ProductListConfig = { page: 1, limit: 20, category: productDetailData?.category._id }
  const { data: productData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    },
    enabled: Boolean(productDetailData),
    staleTime: 3 * 60 * 1000
  })

  const addToCartMutation = useMutation({
    mutationFn: purchasesApi.addToCart
  })

  const chooseActive = (img: string) => {
    setActiveImage(img)
  }

  const handleBuyCount = (value: number) => setBuyCount(value)

  const handleZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image

    const offsetX = e.pageX - (rect.x + window.scrollX)
    const offsetY = e.pageY - (rect.y + window.scrollY)

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  const nextSlide = () => {
    if (currentIndexImages[1] < (productDetailData as ProductType).images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prevSlide = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const addToCart = () => {
    addToCartMutation.mutate(
      {
        product_id: productDetailData?._id as string,
        buy_count: buyCount
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
          toast.success(data.data.message, {
            autoClose: 1000
          })
        }
      }
    )
  }
  if (!productDetailData) return null

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow '>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full pt-[100%] shadow overflow-hidden'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={productDetailData.name}
                  className='top-0 left-0 w-full h-full object-cover absolute'
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2' onClick={prevSlide}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImages.map((img) => {
                  const isActive = img === activeImage
                  return (
                    <div
                      className='relative w-full pt-[100%] shadow cursor-pointer'
                      key={img}
                      onMouseEnter={() => chooseActive(img)}
                    >
                      <img src={img} alt={img} className=' top-0 left-0 w-full h-full object-cover absolute' />
                      {isActive && <div className='absolute inset-0 border-2 border-primaryColor' />}
                    </div>
                  )
                })}
                <button className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2' onClick={nextSlide}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{productDetailData.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b-2 border-primaryColor'>{productDetailData.rating}</span>
                  <ProductRating
                    rating={productDetailData.rating}
                    activeClassname='size-4 fill-primaryColor text-primaryColor'
                  />
                  <div className='mx-4 h-5 w-[2px] bg-gray-300' />
                  <span className='mr-1'>{formatNumberToSocialStyle(productDetailData.sold)}</span>
                  <span className='text-sm text-gray-500'>Đã bán</span>
                </div>
              </div>
              <div className='bg-gray-50 p-4 w-full flex items-center mt-8 gap-4'>
                <span className='text-3xl font-medium text-primaryColor'>{`₫${formatCurency(productDetailData.price)}`}</span>
                <span className='line-through text-gray-400'>{`₫${formatCurency(productDetailData.price_before_discount)}`}</span>
                <span className='bg-primaryColor rounded-sm px-1 py-[2px] text-xs font-semibold text-white'>{`-${discountPercent(productDetailData.price_before_discount, productDetailData.price)}`}</span>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <QuantityController
                  max={productDetailData.quantity}
                  value={buyCount}
                  onIncrease={handleBuyCount}
                  onDecrease={handleBuyCount}
                  onType={handleBuyCount}
                />
                <div className='ml-6 text-sm text-gray-500'>{productDetailData.quantity} sản phẩm có sẵn</div>
              </div>
              <div className='mt-8 flex items-center gap-4'>
                <button
                  className='flex items-center justify-center h-12 px-5 capitalize rounded-sm border border-primaryColor bg-primaryColor/10 text-primaryColor shadow-sm hover:bg-primaryColor/5 gap-2'
                  onClick={addToCart}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                    />
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button className='flex items-center justify-center h-12 px-14 min-w-[6rem] capitalize rounded-sm outline-none  bg-primaryColor text-white shadow-sm hover:bg-primaryColor/90'>
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <div className='bg-white p-4 shadow'>
            <div className='bg-gray-50 rounded text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
            <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(productDetailData.description)
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <div className='container'>
          <div className='uppercase text-gray-400'>Có thể bạn cũng thích</div>
          {productData && (
            <div className='mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
              {productData.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
