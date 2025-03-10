import { createSearchParams, useNavigate } from 'react-router-dom'
import { schema, Schema } from 'src/utils/rules'
import useQueryConfig from './useQueryConfig'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import path from 'src/constants/path'
import omit from 'lodash/omit'

type FormData = Pick<Schema, 'name'>

const nameSchema = schema.pick(['name'])
export default function useSearchProducts() {
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })
  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : omit({
          ...queryConfig,
          name: data.name
        })
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })
  return {
    onSubmitSearch,
    register
  }
}
