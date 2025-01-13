import { InputHTMLAttributes } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  className?: string
  classNameInput?: string
  classNameError?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function Input({
  className,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm focus:bg-blue-100 rounded-sm',
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
  errorMessage,
  placeholder,
  autoComplete,
  register,
  rules
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input className={classNameInput} {...registerResult} placeholder={placeholder} autoComplete={autoComplete} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
