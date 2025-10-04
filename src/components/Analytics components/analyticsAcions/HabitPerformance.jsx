import React from 'react'
import useOverallCompletion from '../../../hooks/analytics/headerCards/useOverallCompletion'
import useAllHabits from '../../../hooks/analytics/headerCards/useAllHabits'

const HabitPerformance = () => {
  const {habits} =useAllHabits()
  const {setThisMonthsHabit} =useOverallCompletion(habits)
  const thisMonthLastDate =new Date(new Date().getFullYear(),new Date().getMonth()+1,0).getDate()
  // thisMonthLastDate.setDate(thisMonthLastDate.getMonth()-1,0)
setThisMonthsHabit?.forEach((habit)=>{
    console.log(habit?.thisMonthCompleted)
})
  return (
    <div className='main bg-[#F5F5F5] shadow-xl min-h-screen p-5 rounded-2xl'>
 <div className="head">
        <div className="head pb-5">
          <h2 className="text-2xl">Individual Habit Performance</h2>
          <p>Detailed breakdown of each habit this month </p>
        </div>
      </div>
      <div className="habits flex flex-col gap-3">
    {setThisMonthsHabit?.map((habit)=>{
      return(
        <div className="habit-card w-full bg-[#FFFFFF] shadow-xl p-3 rounded-2xl">
          <div className="habit-title flex justify-between mb-2">
            <h2 className='text-xl text-[#212121]'>{habit?.title}</h2>
            <p className='bg-black text-base-100 px-2 rounded-xl'>{Math.round((habit?.thisMonthCompleted?.length/thisMonthLastDate)*100)}%</p>
          </div>
          <div className="habit-cmplition">
            <p className='text-gray-500 text-[14px]'>{`${habit?.thisMonthCompleted?.length}/${thisMonthLastDate} days completed`}</p>
          </div>
          <div className="habit-progress w-full  flex items-center  mt-2">
            <input type="range" name="" id=""  className='w-[100%] appearance-none bg-[#7c7777] h-2 rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:border-2 'min={0} max={thisMonthLastDate} value={habit?.thisMonthCompleted?.length} />
          </div>
        </div>
      )
    })}
      </div>
    </div>
  )
}

export default HabitPerformance