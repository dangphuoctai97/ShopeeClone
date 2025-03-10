import range from 'lodash/range'
import { useEffect, useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function DateSelect({ onChange, value, errorMessage }: Props) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])

  const dateNow = new Date()
  const year = dateNow.getFullYear()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelect, name } = e.target
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueFromSelect)
    }
    setDate(newDate)
    if (onChange) onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className='flex flex-wrap flex-col sm:flex-row mt-2'>
      <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Ngày sinh</div>
      <div className='sm:w-[80%] sm:pl-5'>
        <div className='flex justify-between'>
          <select
            onChange={handleChange}
            name='date'
            value={value?.getDate() || date.date}
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3 hover:border-primaryColor cursor-pointer'
          >
            <option disabled>Ngày</option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            name='month'
            value={value?.getMonth() || date.month}
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3 hover:border-primaryColor cursor-pointer'
          >
            <option disabled>Tháng</option>
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            name='year'
            value={value?.getFullYear() || date.year}
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3 hover:border-primaryColor cursor-pointer'
          >
            <option disabled>Năm</option>
            {range(1990, year + 1).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
      </div>
    </div>
  )
}
