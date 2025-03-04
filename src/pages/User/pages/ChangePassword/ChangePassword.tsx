import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { ErrorResponse } from 'src/types/utils.type'
import { userSchema, UserSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>

const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(passwordSchema)
  })

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']))
      reset()
      toast.success(res.data.message, { autoClose: 1000 })
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  return (
    <div className='bg-white rounded-sm pb-10 md:pb-20 md:px-7 px-2 shadow'>
      <div className='boder-b border-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Đổi mật khẩu</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <div className='border-b border-b-gray-300' />
      <form className='mt-8 mr-auto max-w-2xl' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:pr-12 md:mt-0'>
          <div className='flex flex-wrap flex-col sm:flex-row mt-2'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Mật khẩu cũ</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm focus:bg-blue-100 rounded-sm'
                register={register}
                type='password'
                name='password'
                placeholder='Mật khẩu cũ'
                errorMessage={errors.password?.message}
              />
            </div>
          </div>
          <div className='flex flex-wrap flex-col sm:flex-row mt-2'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Mật khẩu mới</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm focus:bg-blue-100 rounded-sm'
                register={register}
                type='password'
                name='new_password'
                placeholder='Mật khẩu mới'
                errorMessage={errors.new_password?.message}
              />
            </div>
          </div>
          <div className='flex flex-wrap flex-col sm:flex-row mt-2'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Nhập lại mật khẩu</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm focus:bg-blue-100 rounded-sm'
                register={register}
                type='password'
                name='confirm_password'
                placeholder='Nhập lại mật khẩu'
                errorMessage={errors.confirm_password?.message}
              />
            </div>
          </div>
          <div className='flex flex-wrap flex-col sm:flex-row mt-10'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                type='submit'
                className='flex items-center justify-center h-9 rounded-sm px-6 text-white text-sm bg-primaryColor hover:bg-primaryColor/80 transition-all'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
