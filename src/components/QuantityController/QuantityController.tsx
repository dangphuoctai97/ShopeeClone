import classNames from 'classnames'
import InputNumber, { InputNumberProps } from '../InputNumber'
import { useState } from 'react'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  onFocusOut?: (value: number) => void
  classNameWrapper?: string
}

export default function QuantityController({
  max,
  onIncrease,
  onDecrease,
  onType,
  onFocusOut,
  value,
  classNameWrapper = 'ml-10',
  ...rest
}: Props) {
  const [localValue, setLocalValue] = useState<number>(Number(value || 1))
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    if (onType) onType(_value)
    setLocalValue(_value)
  }

  const increase = () => {
    let _value = Number(value || localValue) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    if (onIncrease) onIncrease(_value)
    setLocalValue(_value)
  }

  const decrease = () => {
    let _value = Number(value || localValue) - 1
    if (_value < 1) {
      _value = 1
    }
    if (onDecrease) onDecrease(_value)
    setLocalValue(_value)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (onFocusOut) onFocusOut(Number(e.target.value))
  }
  return (
    <div className={`flex items-center ${classNameWrapper}`}>
      <button
        className={classNames(
          'bg-white h-8 w-8 text-black border border-gray-300 rounded-tl-sm rounded-bl-sm flex items-center justify-center p-2',
          {
            'cursor-not-allowed text-gray-600': value === 1
          }
        )}
        onClick={decrease}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
        </svg>
      </button>
      <InputNumber
        value={value || localValue}
        max={max}
        onBlur={handleBlur}
        onChange={handleChange}
        className=''
        classNameError='hidden'
        classNameInput='h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none'
        {...rest}
      />
      <button
        className={classNames(
          'bg-white h-8 w-8 text-black border border-gray-300 rounded-tl-sm rounded-bl-sm flex items-center justify-center p-2',
          {
            'cursor-not-allowed text-gray-600': value === max
          }
        )}
        onClick={increase}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}
