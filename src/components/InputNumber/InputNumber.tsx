import { forwardRef, InputHTMLAttributes, useState } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  className?: string
  classNameInput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    className,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm focus:bg-blue-100 rounded-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    errorMessage,
    onChange,
    value = '',
    ...rest
  },
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value as string)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (/^\d+$/.test(value) || value === '') {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onChange && onChange(e)
      setLocalValue(value)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} {...rest} onChange={handleChange} ref={ref} value={value || localValue} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
