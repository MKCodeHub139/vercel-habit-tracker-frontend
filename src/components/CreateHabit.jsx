import React, { useEffect, useRef, useState } from "react";
import {useMutation} from '@apollo/client/react';
import { CreateHabit as createHabit } from "../graphql/mutations";
import useGetUser from "../hooks/analytics/headerCards/useGetUser";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const CreateHabit = () => {
  const {user,loading:userLoading} =useGetUser()
  const navigate=useNavigate()
  const [selectDayDropdown, setSelectDayDropdown] = useState(false);
  const [selectDay,setSelectDay] =useState([])
  const notify = (msg) => toast(msg);
  const [formData ,setFormaData] =useState({
    title:'',
    category:'',
    frequency:"Daily",
    selectDay:[]
  })
  const [Create_Habit]=useMutation(createHabit)
  const dropdown = useRef();
  const handleDropdown = (e) => {
    e.preventDefault();
    setSelectDayDropdown(!selectDayDropdown);
  };
  const handleDropdownCheck=(e)=>{
    let newSelect;
    if(e.target.checked){
     newSelect= [...selectDay,e.target.value]
    }
    else{
        newSelect=selectDay.filter((item)=>item !==e.target.value)
    }
    setSelectDay(newSelect)
    setFormaData((prev)=>({...prev,selectDay:newSelect}))
  }
const handleCreateHabit=async(e)=>{
    e.preventDefault()
    if(user){
      const response =await Create_Habit({variables:{
        input:{
          title:formData.title,
          category:formData.category,
          frequency:formData.frequency,
          selectedDays:formData.selectDay 
        }
      }})
      if(response){
        notify('habit created successfully')
        setFormaData({
    title:'',
    category:'',
    frequency:"Daily",
    selectDay:[]
  })
      }
    }else{
      alert('you are not logged in')
    }
}

useEffect(()=>{
  if (!user && userLoading===false) {
     navigate("/login"); 
   }
},[user,navigate,userLoading])

  return (
    <div className="container mx-auto py-[3rem]">
      <ToastContainer />
      <h2 className="text-2xl text-[#212121]">Make Your Habit</h2>
      <form
        action=""
        onSubmit={handleCreateHabit}
        className="flex flex-col gap-4 bg-[#F5F5F5] my-9 lg:w-1/2 p-9 shadow-2xl rounded-xl text-[#212121]"
      >
        <label htmlFor="" className="">
          Title
        </label>
        <input
          type="text"
          name=""
          id=""
          value={formData.title}
          onChange={(e)=>setFormaData((prev)=>({...prev,title:e.target.value}))}
          placeholder="enter title..."
          className="px-2 bg-transparent border-1 rounded py-1"
        />
        <label htmlFor="" className="">
          Category
        </label>
        <input
          type="text"
          name=""
          id=""
           value={formData.category}
          onChange={(e)=>setFormaData((prev)=>({...prev,category:e.target.value}))}
          placeholder="enter Category..."
          className="px-2 bg-transparent border-1 rounded py-1"
        />
        <div className="select-fields sm:flex flex-wrap justify-between items-center">
          <div className="frequency-select w-1/2 h-[2rem] flex items-center gap-3 ">
            <label htmlFor="" className="">
              Frequency
            </label>
            <select
              name=""
              id=""
              className="bg-[#FFFFFF] border-2 border-[#E0E0E0] px-2 rounded"
              value={formData.frequency}
              defaultValue={(e)=>setFormaData(prev)({...prev,frequency:"Daily"})}
              onChange={(e)=>setFormaData((prev)=>({...prev,frequency:e.target.value}))}
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
          <div className="select-day flex items-center sm:w-1/2 min-h-[2rem]  gap-3 sm:justify-end relative">
            <label htmlFor="" className="">
              Select Day
            </label>
            <button
              className="bg-[#FFFFFF] border-2 border-[#E0E0E0] px-2 rounded cursor-pointer dropdown" 
              onClick={handleDropdown}
              disabled={formData.frequency=="Daily"}
            >
              Select--
            </button>
            <div
              className={`dropown-content ${
                !selectDayDropdown && "invisible"
              } absolute  bg-base-100 right-0 top-[30px] md:w-[15vw] h-[30vh] overflow-auto`}
              ref={dropdown}
            >
              <ul onChange={handleDropdownCheck}>
                {['Sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map((day) => (
                <li className="flex gap-5 py-1 hover:bg-[#D5D5D5] px-3" key={day}>
                  <input type="checkbox" name="" id="" value={day} 
                  />
                  <label htmlFor="">{day}</label>
                </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <button className="bg-[#4CAF50] hover:bg-[#43A047] cursor-pointer py-1 text-base-100 rounded">
          Create Habit
        </button>
      </form>
    </div>
  );
};

export default CreateHabit;
