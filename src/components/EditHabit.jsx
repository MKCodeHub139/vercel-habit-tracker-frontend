import React, { useEffect, useRef, useState } from "react";
import { GetHabit } from "../graphql/queries";
import { useMutation, useQuery } from "@apollo/client/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { EditHabit as UpdateHabit } from "../graphql/mutations";
import useGetUser from "../hooks/analytics/headerCards/useGetUser";
import { ToastContainer, toast } from "react-toastify";
const EditHabit = () => {
  const { user, loading: userLoading } = useGetUser();
  const navigate = useNavigate();
  const notify = (msg) => toast(msg);
  const [serachParam] = useSearchParams();
  const editId = serachParam.get("habitId");
  const [Edit_Habit] = useMutation(UpdateHabit);
  const [selectDayDropdown, setSelectDayDropdown] = useState(false);
  const [selectDay, setSelectDay] = useState([]);

  const { data, error, loading } = useQuery(GetHabit, {
    variables: { id: editId },
  });

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    frequency: "Daily",
    selectDay: [],
  });

  useEffect(() => {
    if (data?.getHabit) {
      setFormData({
        title: data.getHabit.title || "",
        category: data.getHabit.category || "",
        frequency: data.getHabit.frequency || "Daily",
        selectDay: data.getHabit.selectedDays || [],
      });
    }
  }, [data]);
  const dropdown = useRef();
  const handleDropdown = (e) => {
    e.preventDefault();
    setSelectDayDropdown(!selectDayDropdown);
  };
  const handleCheckboxChange = (day) => {
    setFormData((prev) => {
      const selected = prev.selectDay.includes(day);
      const updatedDays = selected
        ? prev.selectDay.filter((d) => d !== day)
        : [...prev.selectDay, day];
      return { ...prev, selectDay: updatedDays };
    });
  };

  const handleCreateHabit = async (e) => {
    e.preventDefault();
    const response = await Edit_Habit({
      variables: {
        input: {
          id: editId,
          title: formData.title,
          category: formData.category,
          frequency: formData.frequency,
          selectedDays: formData.selectDay,
        },
      },
    });
  if(response){
    notify('Updated habit succesfully')
    setTimeout(()=>{
      navigate(`/habit?habitId=${editId}`)
    },3000)
  }
  };
  useEffect(() => {
    if (!user && userLoading === false) {
      navigate("/login");
    }
  }, [user, navigate, userLoading]);
  if (loading) return <h2>Loading...</h2>;
  return (
    <div className="container mx-auto py-[3rem]">
      <ToastContainer />
      <h2 className="text-2xl ">Update Your Habit</h2>
      <form
        action=""
        onSubmit={handleCreateHabit}
        className="flex flex-col gap-4 bg-[#F5F5F5] my-9 lg:w-1/2 p-9 shadow-2xl rounded-xl"
      >
        <label htmlFor="" className="">
          Title
        </label>
        <input
          type="text"
          name=""
          id=""
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
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
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value }))
          }
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
              defaultValue={(e) =>
                setFormData(prev)({ ...prev, frequency: "Daily" })
              }
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, frequency: e.target.value }))
              }
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
              className="bg-[#FFFFFF] border-2 border-[#E0E0E0] text-[#212121] px-2 rounded cursor-pointer dropdown"
              onClick={handleDropdown}
              disabled={formData.frequency == "Daily"}
            >
              Select--
            </button>
            <div
              className={`dropown-content ${
                !selectDayDropdown && "invisible"
              } absolute  bg-[#FFFFFF] right-0 top-[30px] md:w-[15vw] h-[30vh] overflow-auto`}
              ref={dropdown}
            >
              <ul>
                {[
                  "Sunday",
                  "monday",
                  "tuesday",
                  "wednesday",
                  "thursday",
                  "friday",
                  "saturday",
                ].map((day) => (
                  <li className="flex gap-5 py-1 hover:bg-[#D5D5D5] px-3">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      value={day}
                      checked={formData.selectDay.includes(day)}
                      onChange={() => handleCheckboxChange(day)}
                    />
                    <label htmlFor="">{day}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <button className="bg-[#4CAF50] hover:bg-[#43A047] cursor-pointer py-1 text-base-100 rounded">
          Update Habit
        </button>
      </form>
    </div>
  );
};

export default EditHabit;
