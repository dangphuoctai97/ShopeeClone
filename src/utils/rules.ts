import * as yup from 'yup'

// type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
//   email: {
//     required: {
//       value: true,
//       message: 'Bạn chưa nhập email'
//     },
//     pattern: {
//       value: /^\S+@\S+\.\S+$/,
//       message: 'Email không chính xác'
//     },
//     minLength: {
//       value: 5,
//       message: 'Email phải có từ 5-160 kí tự'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Email phải có từ 5-160 kí tự'
//     }
//   },
//   password: {
//     required: {
//       value: true,
//       message: 'Bạn chưa nhập mật khẩu'
//     },
//     minLength: {
//       value: 6,
//       message: 'Mật khẩu phải có từ 6-160 kí tự'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Mật khẩu phải có từ 6-160 kí tự'
//     }
//   },
//   confirm_password: {
//     required: {
//       value: true,
//       message: 'Bạn chưa nhập xác nhận mật khẩu'
//     },
//     minLength: {
//       value: 6,
//       message: 'Xác nhận mật khẩu phải có từ 6-160 kí tự'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Xác nhận mật khẩu phải có từ 6-160 kí tự'
//     },
//     validate:
//       typeof getValues === 'function'
//         ? (value) => value === getValues('password') || 'Xác nhận mật khẩu không chính xác'
//         : undefined
//   }
// })

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
  confirm_password: yup
    .string()
    .required('Bạn chưa nhập mật khẩu')
    .min(6, 'Mật khẩu phải có từ 6-160 kí tự')
    .max(160, 'Mật khẩu phải có từ 6-160 kí tự')
    .oneOf([yup.ref('password')], 'Xác nhận mật khẩu không chính xác')
})

export type Schema = yup.InferType<typeof schema>
