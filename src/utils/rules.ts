import * as yup from 'yup'

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

const handleConFirmPasswordYup = (refString: string, message: string) => {
  return yup
    .string()
    .required('Bạn chưa nhập mật khẩu')
    .min(6, 'Mật khẩu phải có từ 6-160 kí tự')
    .max(160, 'Mật khẩu phải có từ 6-160 kí tự')
    .oneOf([yup.ref(refString)], message)
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Bạn chưa nhập email')
    .email('Email không chính xác')
    .min(5, 'Email phải có từ 5-160 kí tự')
    .max(160, 'Email phải có từ 5-160 kí tự'),
  password: yup
    .string()
    .required('Bạn chưa nhập mật khẩu')
    .min(6, 'Mật khẩu phải có từ 6-160 kí tự')
    .max(160, 'Mật khẩu phải có từ 6-160 kí tự'),
  confirm_password: handleConFirmPasswordYup('password', 'Nhập lại mật khẩu không chính xác'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  name: yup.string().trim().required()
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa 160 kí tự'),
  phone: yup.string().max(20, 'Độ dài tối đa 20 kí tự'),
  address: yup.string().max(160, 'Độ dài tối đa 160 kí tự'),
  date_of_birth: yup.date().max(new Date(), 'Ngày sinh không phù hợp'),
  avatar: yup.string().max(1000, 'Độ dài tối đa 1000 kí tự'),
  password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  confirm_password: handleConFirmPasswordYup(
    'new_password',
    'Nhập lại mật khẩu mới không chính xác'
  ) as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>
})

export type Schema = yup.InferType<typeof schema>
export type UserSchema = yup.InferType<typeof userSchema>
