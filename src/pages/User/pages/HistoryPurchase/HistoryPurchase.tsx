import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import React from 'react'
import { createSearchParams, Link } from 'react-router-dom'
import purchasesApi from 'src/apis/purchases.api'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import useQueryParams from 'src/hooks/useQueryParams'
import { PurchaseListStatus } from 'src/types/purchases.type'
import { formatCurency, generateNameId } from 'src/utils/utils'

const purchaseTabs = [
  {
    status: purchasesStatus.all,
    name: 'Tất cả'
  },
  {
    status: purchasesStatus.waitForConfirmation,
    name: 'Chờ xác nhận'
  },
  {
    status: purchasesStatus.waitForGetting,
    name: 'Chờ lấy hàng'
  },
  {
    status: purchasesStatus.inProgress,
    name: 'Đang vận chuyển'
  },
  {
    status: purchasesStatus.delivered,
    name: 'Đã giao'
  },
  {
    status: purchasesStatus.cancelled,
    name: 'Đã hủy'
  }
]

export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || purchasesStatus.all

  const { data: purchaseIncartData } = useQuery({
    queryKey: ['purchase', { status: status }],
    queryFn: () => purchasesApi.getPurchases({ status: status as PurchaseListStatus })
  })

  const purchaseInCart = purchaseIncartData?.data.data

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames('flex flex-1 items-center justify-center border-b-2 py-3 bg-white text-center', {
        'border-b-primaryColor text-primaryColor': status === tab.status,
        'border-b-black/10 text-gray-900': status !== tab.status
      })}
    >
      {tab.name}
    </Link>
  ))
  return (
    <div>
      <div className='overflow-x-auto-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{purchaseTabsLink}</div>
          <div>
            {purchaseInCart?.map((purchase) => (
              <div key={purchase._id} className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'>
                <Link
                  to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase._id })}`}
                  className='flex'
                >
                  <div className='flex-shrink-0'>
                    <img src={purchase.product.image} alt={purchase.product.name} className='size-20 object-cover' />
                  </div>
                  <div className='ml-3 flex-grow overflow-hidden'>
                    <div className='truncate'>{purchase.product.name}</div>
                    <div className='mt-3'>{purchase.buy_count}</div>
                  </div>
                  <div className='ml-3 flex-shrink-0'>
                    <span className='truncate text-gray-500 line-through'>
                      ₫{formatCurency(purchase.price_before_discount)}
                    </span>
                    <span className=' text-primaryColor truncate ml-2'>₫{formatCurency(purchase.price)}</span>
                  </div>
                </Link>
                <div className='flex justify-end'>
                  <div>
                    <span>Tổng giá tiền:</span>
                    <span className='ml-4 text-xl text-primaryColor'>
                      ₫{formatCurency(purchase.price * purchase.buy_count)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
