import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../../calendar.css";
import useAllHabits from "../../../hooks/analytics/headerCards/useAllHabits";
const CalenderView = () => {
  const [value, onChange] = useState(new Date());
  const { habits } = useAllHabits();
  const completedDates = habits?.getHabits?.map((habit) => {
              const completeHabit=habit?.completedDates?.map((d) => d.split("T")[0]) || [];
              return {...habit,completeHabit}
            });
            console.log(completedDates)
  return (
    <div className="main bg-[#FFFFFF] shadow-xl p-5 rounded-2xl min-h-screen">
      <div className="head">
        <div className="head pb-5">
          <h2 className="text-2xl">Habit Completion Calendar</h2>
          <p>Days when you completed your habits </p>
        </div>
      </div>
      <div className="calender w-full flex justify-center h-screen items-center">
        <Calendar h-screen items-center
          onChange={onChange}
          value={value}
          className="rounded-xl"
          selectRange={false}
          tileClassName={({ date }) => {
          
            // console.log(completedDates);
            const dateStr = date.toLocaleDateString("en-CA"); // local YYYY-MM-DD
            const isCompleted =completedDates?.some((habit)=>{
            return  habit?.completeHabit?.includes(dateStr)
            })
            if (isCompleted) {
              return "text-white rounded-full react-calender";
            }
            return null;
          }}
        />
      </div>
    </div>
  );
};

export default CalenderView;
