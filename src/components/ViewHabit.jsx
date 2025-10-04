import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { GetHabit } from "../graphql/queries";
import { useMutation, useQuery } from "@apollo/client/react";
import { DeleteHabit } from "../graphql/mutations";
import Calendar from "react-calendar";
import "../calendar.css";
import "react-calendar/dist/Calendar.css";
import { UpdateCompleteDates } from "../graphql/mutations";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { FaCalendarDays } from "react-icons/fa6";
import useGetUser from "../hooks/analytics/headerCards/useGetUser";
const ViewHabit = () => {
  const { user, loading: userLoading} = useGetUser();
  const navigate = useNavigate();
  const [value, onChange] = useState(new Date());
  const [serachParam] = useSearchParams();
  const id = serachParam.get("habitId");
  const [Delete_Habit] = useMutation(DeleteHabit);
  const today = new Date().toISOString().split("T")[0];
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = todayDate.getMonth();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const { data, error, loading } = useQuery(GetHabit, {
    variables: { id },
  });
  const completedDates = data?.getHabit?.completedDates.length || 0;
  const [Update_Complete_Dates] = useMutation(UpdateCompleteDates);
  const handleComplete = async (e) => {
    if (e.target.checked) {
      const updateComplete = await Update_Complete_Dates({
        variables: {
          input: {
            id: id,
            completedDates: today,
          },
        },
      });
    }
  };
  const handleDelete = async () => {
    let confirmed = confirm("Are you sure you want to delete this habit");
    if (confirmed) {
      Delete_Habit({ variables: { id } });
      navigate('/')
    }
  };
  useEffect(() => {
    if (!user && userLoading === false) {
      navigate("/login");
    }
  }, [user, navigate, userLoading]);
  if (loading) return <h2>Loading...</h2>;
  return (
    <div className="min-h-screen py-[4rem]">
      <div className="container mx-auto">
        <h2 className="text-3xl text-[#333333]">Habit Page</h2>
        <hr className="mt-5 text-white" />
        <div className="view-card min-h-[70vh] min-w-[90vw] bg-[#FFF3E0 border-2 text-[#333333] border-[#E0E0E0] shadow-xl mt-9 rounded p-5">
          <div className="habit-head flex justify-between items-center">
            <h2 className="text-2xl text-[#333333]">{data?.getHabit?.title}</h2>
            <div className="actions flex gap-5 items-center">
              <div className="complete flex flex-col items-center">
                <label htmlFor="">Achieve</label>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={handleComplete}
                  disabled={data?.getHabit?.completedDates?.some(
                    (date) =>
                      new Date(date).toISOString().split("T")[0] === today
                  )}
                  checked={data?.getHabit?.completedDates?.some(
                    (date) =>
                      new Date(date).toISOString().split("T")[0] === today
                  )}
                  className="w-4 h-4"
                />
              </div>
              <Link
                to={`/edit-habit?habitId=${data?.getHabit?.id}`}
                className="bg-[#FF5722] text-[#FFFFFF] hover:bg-[#E64A19] cursor-pointer px-5 rounded  flex items-center h-7 gap-2"
              >
                <FaEdit /> Edit
              </Link>
              <button
                className="bg-red-400 hover:bg-red-500 text-[#FFFFFF] cursor-pointer px-5 rounded  h-7 flex items-center gap-2"
                onClick={handleDelete}
              >
                <MdDelete /> Delete
              </button>
            </div>
          </div>
          <div className="details flex mt-5 flex-col gap-3">
            <p className="flex">
              <span className="font-[600] flex items-center gap-2">
                <BiCategory />
                Category :{" "}
              </span>
              <span className="bg-[#FFC107] px-3 rounded-2xl py-[2px] text-black mx-3">
                {data?.getHabit?.category}
              </span>
            </p>
            <p>
              <span className="font-[600]">Frequency :</span>{" "}
              <span className="bg-[#FFC107] px-3 rounded-2xl py-[2px] mx-3">
                {data?.getHabit?.frequency}
              </span>
            </p>
            <p className="flex">
              <span className="font-[600] flex items-center gap-2">
                <FaCalendarDays />
                Selected Days :
              </span>{" "}
              <span className="bg-[#FFC107] px-3 rounded-2xl py-[2px] mx-3">
                {data?.getHabit?.selectedDays?.join(" , ")}
              </span>
            </p>
            <p>
              <span className="font-[600]">Current Streak 🔥 : </span>{" "}
              <span className="bg-[#FFC107] px-3 rounded-2xl py-[2px] mx-3">
                {data?.getHabit?.streak} days
              </span>{" "}
            </p>
            <p>
              <span className="font-[600]">Longest Streak 🔥 : </span>{" "}
              <span className="bg-[#FFC107] px-3 rounded-2xl py-[2px] mx-3">
                {data?.getHabit?.longestStreak} days
              </span>{" "}
            </p>
          </div>
          <div className="progres-bar mt-5 flex items-center gap-3 h-[5rem]">
            <label htmlFor=""> Progress Bar</label>
            <input
              type="range"
              name=""
              id=""
              className="w-1/2  appearance-none background-transparent cursor-pointer bg-[#8BC34A] rounded-2xl "
              min={0}
              max={30}
              value={completedDates}
            />
            <label htmlFor="">
              {completedDates}/{lastDate}
            </label>
          </div>
          <div>
            <Calendar
              onChange={onChange}
              value={value}
              className="rounded-xl"
              selectRange={false}
              tileClassName={({ date }) => {
                const completedDates =
                  data?.getHabit?.completedDates?.map((d) => d.split("T")[0]) ||
                  [];
                const dateStr = date.toLocaleDateString("en-CA");
                if (completedDates.includes(dateStr)) {
                  return "text-white rounded-full react-calender";
                }
                return null;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewHabit;
