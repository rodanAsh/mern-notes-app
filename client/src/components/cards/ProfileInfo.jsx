import React from 'react'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({userInfo, onLogout}) => {
  return (
    <div className='flex flex-col sm:flex-row items-center sm:gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
          {getInitials(userInfo?.fullName)}
        </div>

        <div className='flex flex-col'>
            <p className='hidden sm:inline text-sm font-medium'>{userInfo?.fullName}</p>
            <button 
              className='text-sm text-slate-700 underline' 
              onClick={onLogout}
            >
                Logout
            </button>
        </div>
    </div>
  )
}

export default ProfileInfo