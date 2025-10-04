import React from 'react'
import logo from '../../assets/habitbridge-logo-white.svg'
import { CiHeart } from 'react-icons/ci'
const Footer = () => {
  return (
    <div className="main bg-[#212121] text-white px-15 py-[2rem]">
    <div className=' md:flex py-5'>
        <div className='md:w-1/2'>
        <div className="logo">
            <img src={logo} alt="" />
        </div>
        <div className="tagline-1 my-5 pr-[5rem] ">
        <p className=' text-[18px]'>Bridge the gap between where you are and where you want to be. Build lasting habits that create meaningful change in your life, one day at a time.</p>
        </div>
        <div className="tagline-2">
            <p className='text-[#f1b707] flex items-center gap-3'><CiHeart /> Building better lives through better habits</p>
        </div>
        </div>
        <div className='md:w-1/2 md:flex'>
        <div className='md:w-1/2'>
        <h5 className='text-[#43A047] text-[19px] font-[600]'>Quick Links</h5>
        <ul className='my-5 flex flex-col gap-3'>
            <li className='cursor-pointer hover:text-gray-200'>Dashboard</li>
            <li className='cursor-pointer hover:text-gray-200'>My Habits</li>
            <li className='cursor-pointer hover:text-gray-200'>Progress</li>
            <li className='cursor-pointer hover:text-gray-200'>Statistics</li>
            <li className='cursor-pointer hover:text-gray-200'>Goals</li>
        </ul>
        </div>
        <div className='w-1/2'>
        <h5 className='text-[#f1b707] text-[19px] font-[600]'>Support</h5>
         <ul className='my-5 flex flex-col gap-3'>
            <li className='cursor-pointer hover:text-gray-200'>Help Center</li>
            <li className='cursor-pointer hover:text-gray-200'>Getting Started</li>
            <li className='cursor-pointer hover:text-gray-200'>Tips & Tricks</li>
            <li className='cursor-pointer hover:text-gray-200'>Contact Us</li>
            <li className='cursor-pointer hover:text-gray-200'>Privacy Policy</li>
        </ul>
        </div>
        </div>
        
    </div>
    <div className="tagline-3 h-[10rem] flex flex-col gap-3 items-center justify-center border-t-1 border-b-1 border-gray-600 ">
        <p className='text-[20px] text-gray-300'><em>"We are what we repeatedly do. Excellence, then, is not an act, but a habit."</em> </p>
        <div className='author text-[#f1b707] text-[15px]'><em>-Mohd Kaif</em></div>
    </div>
    <div className="bottom-footer flex justify-center items-center min-h-[3rem]">
       <p className='flex items-center gap-3'>© 2025 HabitBridge. All rights reserved.Made with <CiHeart/> for habit builders</p>
    </div>
    </div>
  )
}

export default Footer