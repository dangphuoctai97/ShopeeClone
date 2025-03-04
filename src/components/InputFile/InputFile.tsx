import { useRef } from 'react'
import { toast } from 'react-toastify'
import config from 'src/constants/config'

interface Props {
  onChange?: (file?: File) => void
}

export default function InputFile({ onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = e.target.files?.[0]
    if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
      toast.error('Dung lượng file tối đa 1 MB (Định dạng: .JPEG, .PNG)')
    } else {
      if (onChange) onChange(fileFromLocal)
    }
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <input
        type='file'
        hidden
        accept='.jpg,.jpeg,.png'
        ref={fileInputRef}
        onChange={onFileChange}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={(e) => ((e.target as any).value = null)}
      />
      <button
        type='button'
        onClick={handleUpload}
        className='flex justify-end items-center rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm p-1 '
      >
        Chọn ảnh
      </button>
    </>
  )
}
