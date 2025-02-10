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
  }
  // updatePurchases(body: { product_id: string; buy_count: number }) {
  //   return http.post<SuccessResponse<Purchase>>(`${URL}/update-purchase`, {
  //     body
  //   })
  // },
  // deletePurchases(product_id: string) {
  //   return http.delete(URL, {
  //     product_id
  //   })
  // }
}

export default purchasesApi
