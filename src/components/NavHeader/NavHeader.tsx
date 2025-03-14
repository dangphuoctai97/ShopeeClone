import { useContext } from 'react'
import Popover from '../Popover'
import { AppContext } from 'src/contexts/app.context'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { purchasesStatus } from 'src/constants/purchase'
import { getAvatarUrl } from 'src/utils/utils'

export default function NavHeader() {
  const queryClient = useQueryClient()
  const { isAuthenticated, setIsAuthenticated, profile } = useContext(AppContext)

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      queryClient.removeQueries({
        queryKey: ['purchases', { status: purchasesStatus.inCart }]
      })
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className='flex justify-end text-white text-sm'>
      <Popover
        className='flex items-center py-1 hover:text-gray-300 cursor-pointer mr-4'
        renderPopover={
          <div className='bg-white relative shadow-md rounded-sm border border-gray-200 '>
            <div className='flex flex-col'>
              <button className='py-2 pr-28 pl-2 hover:text-primaryColor hover:bg-slate-100'>Tiếng Việt</button>
              <button className='py-2 pr-28 pl-2 hover:text-primaryColor hover:bg-slate-100'>English</button>
            </div>
          </div>
        }
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
          />
        </svg>
        <span className='mx-1'>Tiếng Việt</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
        </svg>
      </Popover>

      {isAuthenticated && (
        <Popover
          className='flex items-center py-1 hover:text-gray-300 cursor-pointer'
          renderPopover={
            <div className='bg-white relative shadow-md rounded-sm border border-gray-200 '>
              <div className='flex flex-col'>
                <Link
                  to={path.profile}
                  className='block py-2 pl-2 pr-20 w-full text-left bg-white hover:text-cyan-400 hover:bg-slate-100'
                >
                  Tài khoản của tôi
                </Link>
                <Link
                  to={path.home}
                  className='block py-2 pl-2 pr-20 w-full text-left bg-white hover:text-cyan-400 hover:bg-slate-100'
                >
                  Đơn mua
                </Link>
                <button
                  onClick={handleLogout}
                  className='block py-2 pl-2 pr-20 w-full text-left bg-white hover:text-cyan-400 hover:bg-slate-100'
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          }
        >
          <div className='w-6 h-6 mr-2 flex-shrink-0'>
            <img src={getAvatarUrl(profile?.avatar)} alt='avatar' className='w-full h-full object-cover rounded-full' />
          </div>
          <span>{profile?.email}</span>
        </Popover>
      )}
      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link className='mx-3 capitalize hover:text-white/70' to={path.register}>
            Đăng ký
          </Link>
          <span className='border-r-[1px] border-r-white/40 h-4' />
          <Link className='mx-3 capitalize hover:text-white/70' to={path.login}>
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  )
}
