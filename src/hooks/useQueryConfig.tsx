import { ProductListConfig } from 'src/types/product.type'
import { omitBy, isUndefined } from 'lodash'
import useQueryParams from './useQueryParams'

export type queryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function useQueryConfig() {
  const queryParams: queryConfig = useQueryParams()
  const queryConfig: queryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || 15,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      sort_by: queryParams.sort_by,
      category: queryParams.category
    },
    isUndefined
  )
  return queryConfig
}
