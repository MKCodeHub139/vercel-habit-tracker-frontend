import React, { useMemo, useState } from "react";
import HeaderCard from "./Analytics components/HeaderCard";
import useAllHabits from "../hooks/analytics/headerCards/useAllHabits";
import useOverallCompletion from "../hooks/analytics/headerCards/useOverallCompletion";
import { Link, useNavigate } from "react-router-dom";
import HabitPerformance from "./Analytics components/analyticsAcions/HabitPerformance";
import Overview from "./Analytics components/analyticsAcions/Overview";
import CalenderView from "./Analytics components/analyticsAcions/CalenderView";
import Insights from "./Analytics components/analyticsAcions/Insights";
import { IoAnalytics } from 'react-icons/io5'
import { FaFire } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import useGetUser from "../hooks/analytics/headerCards/useGetUser";
import { useEffect } from "react";

const Analytics = () => {
  const {user,loading:userLoading} =useGetUser()
  const navigate=useNavigate()
  const { habits, isLoading, isError } = useAllHabits();
  const {
    progress,
    diff
  } = useOverallCompletion(habits);
  const [activeAction,setActiveAction] =useState("overview")  
  const today = new Date().toISOString().slice(0, 10);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  const lastWeekHabits = habits?.getHabits?.map((habit) => {
    const completedThisWeek =habit.completedDates?.filter((date) => {
      const habitDate = new Date(date.split("T")[0]);
      return (
        habitDate >= sevenDaysAgo  && habitDate <= new Date()
      );
    })
      let status = "isCompletedThisWeek";
      if(completedThisWeek?.length > 0){
        status = "isCompletedThisWeek";
      }else if(completedThisWeek?.length === 0){
        status = "neverCompleted";
      }
      else{
          status ="comletedBeforOnly"
      }
      return {...habit, status,completedThisWeek}
    })
    const lastWeekPossibleCompletion = habits?.getHabits?.reduce((sum, habit) => {
      let daily = 0;
      let weekly = 0;
      
      if (habit.frequency === "Daily") {
    daily = 1;
  } else if (habit.frequency === "Weekly") {
    weekly = 1;
  }
  
  return sum + (daily * 7 + weekly * habit.selectedDays.length);
}, 0);

  const lastWeekCompletedHabits =lastWeekHabits?.reduce((sum,habit)=>{
    if(habit.status === "isCompletedThisWeek"){
      return sum + (habit.completedThisWeek?.length || 0)
    }
    return sum;
},0)

   const { currentStreak, longestStreak } = useMemo(() => {
    let currentStreak = 0;
    let longestStreak = 0;
    habits?.getHabits?.map((habit) => {
      longestStreak = Math.max(longestStreak, habit?.longestStreak || 0);
      currentStreak = Math.max(currentStreak, habit?.streak || 0);
    });
    return { currentStreak, longestStreak };
  }, [habits, today]);
  
  const activeHabit = useMemo(() => {
   return habits?.getHabits?.reduce((count, habit) => {
      const lastDate = habit.completedDates[habit.completedDates.length - 1];
      return !(lastDate && lastDate.includes(today)) ? count + 1 : count;  
    }, 0);
  }, [habits, today]);
  const newHabit = habits?.getHabits?.reduce((count, habit) => {
    return today.slice(0, 7) == habit?.createdAt.slice(0, 7)
    ? count + 1
      : count;
  }, 0);
useEffect(()=>{
  if (!user && userLoading===false) {
     navigate("/login"); 
   }
},[user,navigate,userLoading])
  return (
    <div className="min-h-screen py-[3rem]">
      <div className="container mx-auto ">
        <h2 className="text-3xl ">Analytics Page</h2>
        <hr className="mt-5 " />
        <div className="header">
          <div className="header-cards w-full flex flex-wrap gap-3">
            <HeaderCard
              title="Overall Completion" icon={<IoAnalytics />} diff={diff}
              value={`${progress}%`}
              subtitle={`${diff}% from last month`}
              progress={progress}
            />
            <HeaderCard
              title="Current Streak"icon={<FaFire/>}
              value={`${currentStreak} days`}
              subtitle={`Personal best: ${longestStreak} days`}
            />
            <HeaderCard
              title="Active Habits"icon={<GoGoal/>}
              value={activeHabit}
              subtitle={`${newHabit} new this month`}
            />
            <HeaderCard
              title="This Week"icon={<SlCalender/>}
              value={`${lastWeekCompletedHabits}/${lastWeekPossibleCompletion}`}
              subtitle={`${lastWeekPossibleCompletion >0 ?  Math.round((lastWeekCompletedHabits /lastWeekPossibleCompletion * 100)):0}% completion rate`}
            />
          </div>
        </div>
        <div className="habit-actions md:w-2/3 lg:w-2/5 sm:w-2/3 bg-[#EEEEEE] text-[#212121] h-8 rounded-full flex justify-around items-center  my-5  shadow-2xl">
          <button onClick={(e)=>setActiveAction('overview')} className={`${activeAction==="overview"?"bg-[#FF5722] hover:bg-[#E64A19] text-[#FFFFFF]":"hover:bg-[#FF7043] hover:text-[#FFFFFF]"} px-2 rounded-full  cursor-pointer `}>
            Overview
          </button>
          <button onClick={(e)=>setActiveAction('habit-performance')} className= {`${activeAction==="habit-performance"?"bg-[#FF5722] hover:bg-[#E64A19] text-[#FFFFFF]":"hover:hover:bg-[#FF7043] hover:text-[#FFFFFF]"}  px-2 rounded-full  cursor-pointer`}>
            Habit Performance
            </button>
          <button onClick={(e)=>setActiveAction('calender-view')} className= {`${activeAction==="calender-view"?"bg-[#FF5722] hover:bg-[#E64A19] text-[#FFFFFF]":"hover:bg-[#FF7043] hover:text-[#FFFFFF]"} px-2 rounded-full  cursor-pointer`}>
            Calender View
          </button>
          {/* <button onClick={(e)=>setActiveAction('insights')} className={`${activeAction==="insights"?"bg-fuchsia-600 hover:bg-fuchsia-500":"hover:bg-fuchsia-300"} px-2 rounded-full  cursor-pointer`}>
            Insights
          </button> */}
        </div>
        {/* habits analytics by charts and range */}
        {activeAction==="overview" &&(
          <Overview lastWeekHabits={lastWeekHabits} lastWeekPossibleCompletion={lastWeekPossibleCompletion} habits={habits}/>

        )}
        
        {activeAction==="habit-performance" &&(
          <HabitPerformance/>
        )}
        {activeAction==="calender-view" &&(
          <CalenderView/>
        )}
        {activeAction==="insights" &&(
          <Insights/>
        )}
      </div>
    </div>
  );
};

export default Analytics;
