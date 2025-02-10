import classNames from 'classnames'
import { omit } from 'lodash'
import { sortBy, order as orderConstant } from 'src/constants/product'
import { ProductListConfig } from 'src/types/product.type'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { queryConfig } from '../../ProductList'

interface Props {
  queryConfig: queryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const page = Number(queryConfig.page)

  const navigate = useNavigate()

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-2'>
          <div>Sắp xếp theo</div>
          <button
            onClick={() => handleSort(sortBy.view)}
            className={classNames(
              'text-center h-8 py-2 px-4 uppercase text-sm rounded-sm flex justify-center items-center gap-2',
              {
                'bg-primaryColor text-white hover:bg-primaryColor/80': isActiveSortBy(sortBy.view),
                'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.view)
              }
            )}
          >
            Phổ biến
          </button>
          <button
            onClick={() => handleSort(sortBy.createdAt)}
            className={classNames(
              'text-center h-8 py-2 px-4 uppercase text-sm rounded-sm flex justify-center items-center gap-2',
              {
                'bg-primaryColor text-white hover:bg-primaryColor/80': isActiveSortBy(sortBy.createdAt),
                'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.createdAt)
              }
            )}
          >
            Mới nhất
          </button>
          <button
            onClick={() => handleSort(sortBy.sold)}
            className={classNames(
              'text-center h-8 py-2 px-4 uppercase text-sm rounded-sm flex justify-center items-center gap-2',
              {
                'bg-primaryColor text-white hover:bg-primaryColor/80': isActiveSortBy(sortBy.sold),
                'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.sold)
              }
            )}
          >
            Bán chạy
          </button>
          <select
            className={classNames(
              'h-8 py-2 px-4 capitalize outline-none cursor-pointer text-sm rounded-sm flex items-center',
              {
                'bg-primaryColor text-white hover:bg-primaryColor/80': isActiveSortBy(sortBy.price),
                'bg-white text-black': !isActiveSortBy(sortBy.price)
              }
            )}
            value={order || ''}
            onChange={(e) => {
              handlePriceOrder(e.target.value as Exclude<ProductListConfig['order'], undefined>)
            }}
          >
            <option value='' disabled>
              Giá
            </option>
            <option className='bg-white text-black' value={orderConstant.asc}>
              Giá: Thấp đến cao
            </option>
            <option className='bg-white text-black' value={orderConstant.desc}>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
        <div className='flex items-center gap-4'>
          <div>
            <span className='text-primaryColor'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='flex items-center'>
            {page === 1 ? (
              <span className='h-8 rounded-tl-sm rounded-bl-sm bg-white/60 text-slate-400 px-3 shadow hover:bg-slate-100 cursor-not-allowed flex items-center justify-center'>
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
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='h-8 rounded-tl-sm rounded-bl-sm bg-white px-3 shadow hover:bg-slate-100 cursor-pointer flex items-center justify-center'
              >
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
              </Link>
            )}
            <div className='h-8 bg-slate-100 border border-l-[1px]' />
            {page === pageSize ? (
              <span className='h-8 rounded-tr-sm rounded-br-sm bg-white/60 text-slate-400 px-3 shadow hover:bg-slate-100 cursor-not-allowed flex items-center justify-center'>
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
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='h-8 rounded-tr-sm rounded-br-sm bg-white px-3 shadow hover:bg-slate-100 cursor-pointer flex items-center justify-center'
              >
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
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
