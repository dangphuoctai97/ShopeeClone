import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { userSchema, UserSchema } from 'src/utils/rules'
import DateSelect from '../../components/DateSelect'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import { setProfileToLS } from 'src/utils/auth'
import { getAvatarUrl, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import InputFile from 'src/components/InputFile'

type FormData = Pick<UserSchema, 'name' | 'phone' | 'address' | 'date_of_birth' | 'avatar'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}

const profileScheme = userSchema.pick(['name', 'address', 'avatar', 'phone', 'date_of_birth'])

export default function Profile() {
  const [file, setFile] = useState<File>()

  const { setProfile } = useContext(AppContext)
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })

  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileScheme)
  })

  const avatar = watch('avatar')
  const profile = profileData?.data.data
  const avatarPreview = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file])

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  })

  const uploadAvatarMutation = useMutation({
    mutationFn: userApi.uploadAvatar
  })

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatarMutation.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      setProfile(res.data.data)
      setProfileToLS(res.data.data)
      refetch()
      toast.success(res.data.message, { autoClose: 1000 })
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
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
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <div className='border-b border-b-gray-300' />
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:pr-12 md:mt-0'>
          <div className='flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Email</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>
          <div className='flex flex-wrap flex-col sm:flex-row mt-2'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Tên</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm focus:bg-blue-100 rounded-sm'
                register={register}
                name='name'
                placeholder='Tên'
                errorMessage={errors.name?.message}
              />
            </div>
          </div>
          <div className='flex flex-wrap flex-col sm:flex-row mt-2'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Số điện thoại</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <InputNumber
                    classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm focus:bg-blue-100 rounded-sm'
                    placeholder='Số điện thoại'
                    errorMessage={errors.phone?.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className='flex flex-wrap flex-col sm:flex-row mt-2'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Địa chỉ</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm focus:bg-blue-100 rounded-sm'
                register={register}
                name='address'
                placeholder='Địa chỉ'
                errorMessage={errors.address?.message}
              />
            </div>
          </div>
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DateSelect errorMessage={errors.date_of_birth?.message} value={field.value} onChange={field.onChange} />
            )}
          />

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
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img src={avatarPreview || getAvatarUrl(avatar)} alt='' className='size-full rounded-full object-cover' />
            </div>
            <InputFile onChange={handleChangeFile} />
            <div className='mt-3 text-gray-400'>
              <div>Dung lượng file tối đa 1 MB</div>
              <div>Định dạng: .JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
