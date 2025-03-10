import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import purchasesApi from 'src/apis/purchases.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { Purchase } from 'src/types/purchases.type'
import { formatCurency, generateNameId } from 'src/utils/utils'
import { produce } from 'immer'
import keyBy from 'lodash/keyBy'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import noProduct from 'src/assets/images/no-product.png'

export default function Cart() {
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)
  const location = useLocation()
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchasesApi.getPurchases({ status: purchasesStatus.inCart })
  })

  const choosenPurchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId
  const purchaseInCart = purchasesInCartData?.data.data
  const isAllChecked = useMemo(() => extendedPurchases.every((purchase) => purchase.checked), [extendedPurchases])
  const checkedPurchases = useMemo(() => extendedPurchases.filter((purchase) => purchase.checked), [extendedPurchases])
  const checkedPurchasesCount = checkedPurchases.length
  const totalChekedPurchasesPrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + current.product.price * current.buy_count
      }, 0),
    [checkedPurchases]
  )

  const totalChekedPurchasesSavingPrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + (current.product.price_before_discount - current.product.price) * current.buy_count
      }, 0),
    [checkedPurchases]
  )

  const updatePurchaseMutation = useMutation({
    mutationFn: purchasesApi.updatePurchase,
    onSuccess: () => refetch()
  })

  const deletePurchaseMutation = useMutation({
    mutationFn: purchasesApi.deletePurchases,
    onSuccess: () => refetch()
  })

  const buyProductsMutation = useMutation({
    mutationFn: purchasesApi.buyProducts,
    onSuccess: () => {
      refetch()
      toast.success('Mua hàng thành công', {
        autoClose: 1000
      })
    }
  })

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObect = keyBy(prev, '_id')
      return (
        purchaseInCart?.map((purchase) => {
          const isChoosenPurchaseIdFromLocation = purchase._id === choosenPurchaseIdFromLocation
          return {
            ...purchase,
            checked: isChoosenPurchaseIdFromLocation || Boolean(extendedPurchasesObect[purchase._id]?.checked),
            disabled: false
          }
        }) || []
      )
    })
  }, [purchaseInCart, choosenPurchaseIdFromLocation, setExtendedPurchases])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  const handleChecked = (purchaseIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draf) => {
        draf[purchaseIndex].checked = e.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  const handleDeletePurchase = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex]._id
    deletePurchaseMutation.mutate([purchaseId])
  }

  const handleDeletePurchases = () => {
    const purchasesIds = checkedPurchases.map((purchase) => purchase._id)
    deletePurchaseMutation.mutate(purchasesIds)
  }

  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchases[purchaseIndex]
      setExtendedPurchases(
        produce((draf) => {
          draf[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({
        product_id: purchase.product._id,
        buy_count: value
      })
    }
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draf) => {
        draf[purchaseIndex].buy_count = value
      })
    )
  }

  const handleBuyPurchases = () => {
    if (checkedPurchasesCount > 0) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductsMutation.mutate(body)
    }
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        {extendedPurchases.length > 0 ? (
          <>
            <div className='overflow-auto'>
              <div className='min-w-[1000px]'>
                <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow mb-6'>
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <div className='flex items-center flex-shrink-0 justify-center pr-3'>
                        <input
                          type='checkbox'
                          onChange={handleCheckAll}
                          checked={isAllChecked}
                          className='h-5 w-5 accent-primaryColor cursor-pointer'
                        />
                      </div>
                      <div className='flex-grow text-black'>Sản phẩm</div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 text-center'>
                      <div className='col-span-2'>Đơn giá</div>
                      <div className='col-span-1'>Số lượng</div>
                      <div className='col-span-1'>Số tiền</div>
                      <div className='col-span-1'>Thao tác</div>
                    </div>
                  </div>
                </div>

                {extendedPurchases.length > 0 && (
                  <div className='my-3 rounded-sm bg-white p-5 shadow'>
                    {extendedPurchases.map((purchase, index) => (
                      <div
                        key={purchase._id}
                        className='grid grid-cols-12 items-center text-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-sm text-gray-500 mb-5'
                      >
                        <div className='col-span-6'>
                          <div className='flex'>
                            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                              <input
                                type='checkbox'
                                className='h-5 w-5 accent-primaryColor cursor-pointer'
                                checked={purchase.checked}
                                onChange={handleChecked(index)}
                              />
                            </div>
                            <div className='flex-grow '>
                              <div className='flex'>
                                <Link
                                  to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                                  className='h-20 w-20 flex-shrink-0'
                                >
                                  <img src={purchase.product.image} alt={purchase.product.name} />
                                </Link>
                                <div className='flex-grow px-2 pt-1 pb-2'>
                                  <Link
                                    to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                                    className='line-clamp-2 text-left'
                                  >
                                    {purchase.product.name}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-span-6'>
                          <div className='grid grid-cols-5 items-center'>
                            <div className='col-span-2'>
                              <div className='flex justify-center items-center'>
                                <span className='text-gray-500 line-through'>
                                  ₫{formatCurency(purchase.product.price_before_discount)}
                                </span>
                                <span className='ml-3 text-base'>₫{formatCurency(purchase.product.price)}</span>
                              </div>
                            </div>
                            <div className='col-span-1'>
                              <QuantityController
                                max={purchase.product.quantity}
                                value={purchase.buy_count}
                                classNameWrapper='flex justify-center'
                                onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                                onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                                onType={handleTypeQuantity(index)}
                                onFocusOut={(value) =>
                                  handleQuantity(
                                    index,
                                    value,
                                    value <= purchase.product.quantity &&
                                      value >= 1 &&
                                      value !== (purchaseInCart as Purchase[])[index].buy_count
                                  )
                                }
                                disabled={purchase.disabled}
                              />
                            </div>
                            <div className='col-span-1'>
                              <span className='text-base text-primaryColor'>
                                ₫{formatCurency(purchase.product.price * purchase.buy_count)}
                              </span>
                            </div>
                            <div className='col-span-1'>
                              <button
                                className='bg-none text-black transition-colors hover:text-primaryColor'
                                onClick={handleDeletePurchase(index)}
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='flex items-center justify-center flex-col gap-6 py-10'>
              <img src={noProduct} alt='no_product' className='w-32 h-32' />
              <span className='font-bold text-gray-500 mt-5'>Giỏ hàng của bạn còn trống</span>
              <Link
                to={path.home}
                className='bg-primaryColor px-14 py-3 text-white mt-5 uppercase rounded-sm hover:opacity-80 transition-opacity'
              >
                Mua ngay
              </Link>
            </div>
          </>
        )}

        <div className='sticky bottom-0 z-10 flex sm:flex-row flex-col sm:items-center rounded-sm bg-white p-5 shadow border border-gray-300'>
          <div className='flex items-center'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input
                type='checkbox'
                onChange={handleCheckAll}
                checked={isAllChecked}
                className='h-5 w-5 accent-primaryColor cursor-pointer'
              />
            </div>
            <button className='mx-3 border-none bg-none'>{`Chọn tất cả (${extendedPurchases.length} sản phẩm)`}</button>
            <button
              className='mx-3 border-none bg-none transition-colors hover:text-primaryColor'
              onClick={handleDeletePurchases}
            >
              Xóa
            </button>
          </div>

          <div className='sm:ml-auto flex flex-col sm:flex-row sm:items-center mt-5 sm:mt-0'>
            <div>
              <div className='flex items-center sm:justify-end'>
                <div>{`Tổng thanh toán (${checkedPurchasesCount} sản phẩm)`}</div>
                <div className='ml-2 text-2xl text-primaryColor'>₫{formatCurency(totalChekedPurchasesPrice)}</div>
              </div>
              <div className='flex items-center text-sm sm:justify-end'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='text-primaryColor ml-6'>₫{formatCurency(totalChekedPurchasesSavingPrice)}</div>
              </div>
            </div>
          </div>
          <Button
            className='bg-primaryColor mt-5 sm:mt-0 flex justify-center sm:justify-end uppercase items-center text-white text-sm px-20 py-3 rounded-sm sm:ml-4 transition-all hover:opacity-80 shadow'
            onClick={handleBuyPurchases}
            disabled={buyProductsMutation.isPending}
          >
            Mua hàng
          </Button>
        </div>
      </div>
    </div>
  )
}
