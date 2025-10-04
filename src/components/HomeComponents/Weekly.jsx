import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
const Daily = ({habit,today,handleDelete,handleComplete}) => {
  
  return (
         <div className="habit-card md:w-1/3 bg-[#FFFFFF] border-2 border-[#E0E0E0] text-[#212121] min-h-[10rem] rounded-xl shadow-xl p-3 grow">
                  <div className="title flex justify-between items-center w-[70%]">
                    <h5 className="text-[1.2rem] font-bold text-[#333333]">{habit.title}</h5>
                    <div className="achive-check flex flex-col items-center">
                      <label htmlFor="">Acheive</label>
                      <input
                        type="checkbox"
                        className={`w-4 h-4 accent-fuchsia-500`}
                        onChange={(e) => handleComplete(e, habit)}
                        disabled={habit?.completedDates?.some(
                          (date) =>
                            new Date(date).toISOString().split("T")[0] === today
                        )}
                        checked={habit?.completedDates?.some(
                          (date) =>
                            new Date(date).toISOString().split("T")[0] === today
                        )}
                      />
                    </div>
                  </div>
                  <p className="text-[18px]">category - {habit.category}</p>
                  <div className="frequency">
                    <p>Frequency : {habit.frequency}</p>
                  </div>
                  <div className="streak">
                    <p>Streak 🔥 : {habit.streak}</p>
                  </div>
                  <div className="longest-streak">
                    <p>longest Streak 🔥 : {habit.longestStreak} </p>
                  </div>
                  <div className="action-btns flex gap-9 items-center mt-4 ">
                    <Link
                      to={`/habit?habitId=${habit.id}`}
                      className="bg-[#FF5722] text-[#FFFFFF] hover:bg-[#E64A19] border-2 border-[#FFB74D] px-5 cursor-pointer rounded"
                    >
                      View
                    </Link>
                    <button
                      className="px-5 cursor-pointer rounded flex items-center bg-red-500 text-base-100 hover:bg-red-400"
                      onClick={(e) => handleDelete(e, habit.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
   
  )
}

export default Daily