import { useMutation, useQuery } from "@apollo/client/react";
import React, { useEffect, useRef, useState } from "react";
import { IoIosToday } from "react-icons/io";
import {
  UpdateCompleteDates,
  UpdateStreak,
  DeleteHabit,
} from "../graphql/mutations";
import { Link, useNavigate } from "react-router-dom";
import useAllHabits from "../hooks/analytics/headerCards/useAllHabits";
import Daily from "./HomeComponents/Daily";
import Weekly from "./HomeComponents/Weekly";
import useGetUser from "../hooks/analytics/headerCards/useGetUser";
import { MdOutlineAnalytics } from "react-icons/md";
import { FaCalendarWeek } from "react-icons/fa";

// 1. Calm & Minimal Palette (Focus & Simplicity) Background: #F5F5F5 (light grey) Primary: #4CAF50 (green, success / completion) Secondary: #FFC107 (amber, highlights / progress) Text: #212121 (dark grey) Accent: #03A9F4 (light blue, subtle notifications)


const Home = () => {
  const { user, loading, error } = useGetUser();
  const todayDay = new Date()
    .toLocaleString("en-US", { weekday: "long" })
    .toLocaleLowerCase();
  const { habits, isError, isLoading } = useAllHabits();
  const [activeHabit, setActiveHabit] = useState("Daily");
  const [Update_Complete_Dates] = useMutation(UpdateCompleteDates);
  const [Update_Streak] = useMutation(UpdateStreak);
  const [Delete_Habit] = useMutation(DeleteHabit);
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  // streak logic

  useEffect(() => {
    if (!habits?.getHabits) return;
    habits.getHabits.forEach((habit) => {
      if (!habit?.completedDates?.length) return;

      const sortedDates = habit.completedDates
        .map((d) => new Date(d.split("T")[0]))
        .sort((a, b) => a - b);

      let streak = 1;
      let longestStreak = 1;

      for (let i = 1; i < sortedDates.length; i++) {
        const diff = sortedDates[i] - sortedDates[i - 1];

        if (diff === 86400000) {
          streak += 1;
        } else if (diff > 86400000) {
          streak = 1;
        } else {
          continue;
        }

        if (streak > longestStreak) {
          longestStreak = streak;
        }
      }

      Update_Streak({
        variables: {
          input: {
            id: habit.id,
            streak,
            longestStreak,
          },
        },
      });
    });
  }, [habits, today]);

  const handleComplete = async (e, habit) => {
    if (e.target.checked) {
      const updateComplete = await Update_Complete_Dates({
        variables: {
          input: {
            id: habit.id,
            completedDates: today,
          },
        },
      });
    }
  };
  // delete Habit
  const handleDelete = async (e, id) => {
    e.preventDefault();
    let confirmed = confirm("are you sure yo want to delete this habit.");
    if (confirmed) {
      const deleteHabit = await Delete_Habit({
        variables: {
          id,
        },
      });
      window.location.reload();
      return deleteHabit;
    }
  };
  // filter all today's habit
  const dailyHabits = habits?.getHabits?.filter(
    (habit) =>
      habit?.selectedDays?.includes(todayDay) && activeHabit === "Daily"
  );
  // filter all weekly habits which is not includes today
  const weeklyHabits = habits?.getHabits?.filter(
    (habit) =>
      !habit?.selectedDays?.includes(todayDay) && activeHabit === "Weekly"
  );
  useEffect(() => {
    if (!user && loading === false) {
      navigate("/login");
    }
  }, [user, navigate, loading]);
  useEffect(() => {
    if (habits?.getHabits?.length === 0)
      return (
        <div className="w-full h-screen p-5 text-xl text-white text-center ">
          No habits found!
        </div>
      );
  }, [habits]);
  if (isLoading) return <h1>Loading</h1>;
  return (
    <div className="min-h-screen py-[4rem]">
      <div className="container mx-auto ">
        <div className="frequency-div flex gap-[3rem] flex-wrap">
          <button
            className={`cursor-pointer ${activeHabit==="Daily" ?'bg-[#4CAF50] hover:bg-[#439b46]':'bg-[#03A9F4] hover:bg-[#0288D1]'} text-[#FFFFFF]  py-1 px-5 rounded flex items-center gap-2`}
            onClick={() => setActiveHabit("Daily")}
          >
            <IoIosToday />
            Today
          </button>
          <button
            className={`cursor-pointer ${activeHabit==="Weekly" ?'bg-[#4CAF50] hover:bg-[#439b46]':'bg-[#03A9F4] hover:bg-[#0288D1]'} text-[#FFFFFF]  py-1 px-5 rounded flex items-center gap-2`}
            onClick={() => setActiveHabit("Weekly")}
          >
            <FaCalendarWeek />
            Weekly
          </button>
          <Link
            to="/analytics"
            className="cursor-pointer bg-[#03A9F4] text-[#FFFFFF] hover:bg-[#0288D1] py-1 px-5 rounded flex items-center gap-2"
          >
            <MdOutlineAnalytics /> OverAll
          </Link>
        </div>
        <div className="habits flex flex-wrap gap-5 my-11">
          {activeHabit === "Daily" ? (
            dailyHabits?.length > 0 ? (
              dailyHabits?.map((habit) => (
                <Daily
                  key={habit.id}
                  habit={habit}
                  today={today}
                  handleComplete={handleComplete}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <div className="text-xl text-[#212121] text-center">
                No Daily habits
              </div>
            )
          ) : null}
          {activeHabit === "Weekly" ? (
            weeklyHabits?.length > 0 ? (
              weeklyHabits?.map((habit) => (
                <Weekly
                  key={habit.id}
                  habit={habit}
                  today={today}
                  handleComplete={handleComplete}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <div className="text-xl text-[#212121] text-center">
                No weekly habits
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
