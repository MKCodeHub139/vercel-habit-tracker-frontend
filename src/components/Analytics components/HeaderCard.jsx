import React from 'react'
import { IoAnalytics } from 'react-icons/io5'

const HeaderCard = ({
    title,
    value,
    subtitle,
    progress,
    icon,
    diff
}) => {
  return (
     <div className="overallCompletion-card border-2  shadow-xl cursor-pointer  border-[#FF5722] hover:border-[#FFC107] p-3 rounded-2xl my-5 min-w-1/5  grow min-h-[150px]">
                    <div className="head flex justify-between items-center h-[30px] mb-5">
                      <div className="title ">
                     <p className="">{title}</p>
                      </div>
                    <div className={`icon  ${(diff !== undefined && diff <0) &&('rotate-45')}`}>{icon}</div>
                    </div>
                    <h2 className="font-extrabold text-2xl">{value}</h2>
                    <p className="text-[14px] opacity-75">{subtitle}</p>
                    {progress !==undefined && (
                    <div className="progress-line bg-gray-300 h-3 flex items-center rounded mt-3">
                    <input type="range" name="" id=""  className="appearance-none w-[100%]" min={0} max={100} value={progress} readOnly/>
                    </div>
                    )}
     </div>
  )
}

export default HeaderCard