import { SuccessResponse } from 'src/types/utils.type'
import http from '../utils/http'
import { Purchase, PurchaseListStatus } from 'src/types/purchases.type'

const URL = 'purchases'
const purchasesApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<SuccessResponse<Purchase[]>>(URL, {
      params: {
        status: params.status
      }
    })
  },
  updatePurchase(body: { product_id: string; buy_count: number }) {
    return http.put<SuccessResponse<Purchase>>(`${URL}/update-purchase`, body)
  },
  deletePurchases(purchaseIds: string[]) {
    return http.delete<SuccessResponse<{ deleted_count: number }>>(URL, {
      data: purchaseIds
    })
  },
  buyProducts(body: { product_id: string; buy_count: number }[]) {
    return http.post<SuccessResponse<Purchase>[]>(`${URL}/buy-products`, body)
  }
}

export default purchasesApi
