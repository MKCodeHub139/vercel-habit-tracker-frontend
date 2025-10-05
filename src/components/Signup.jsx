import React, { useState } from "react";
import {CreateUser, LoginUser} from '../graphql/mutations';
import { useMutation } from "@apollo/client/react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Create_User] =useMutation(CreateUser)
    const [Login_User] =useMutation(LoginUser)
    const notify = (msg) => toast(msg);
  const navigate =useNavigate()
  const handleCreateUser =async(e)=>{
    e.preventDefault()
    const response =await Create_User({variables:{
     input:{ 
      name,
      email,
      password}
    }})
    if(response){
      notify('SignUp successfully')
      await Login_User({variables:{
     input:{ 
      email,
      password
    }
    }})
    setTimeout(()=>{
      navigate('/')
    },3000)
    }
  }
  return (
    <div className="w-full flex justify-center container mx-auto py-9">
      <ToastContainer />
      <form action="" onSubmit={handleCreateUser} className="flex flex-col md:w-1/3 sm:1/4 gap-4 shadow-2xl my-9 p-5">
        <h2 className="text-2xl font-[600]">SignUp</h2>
        <label htmlFor="">Name</label>
        <input
          type="text"
          name=""
          id=""
          placeholder="enter name"
          value={name} onChange={(e)=>setName(e.target.value)}
          className="px-2 border-1 rounded"
        />
        <label htmlFor="">email</label>
        <input
          type="email"
          name=""
          id=""
          placeholder="enter email"
          value={email} onChange={(e)=>setEmail(e.target.value)}
          className="px-2 border-1 rounded"
        />
        <label htmlFor="">password</label>
        <input
          type="password"
          name=""
          id=""
          placeholder="enter password"
          value={password} onChange={(e)=>setPassword(e.target.value)}
          className="px-2 border-1 rounded" minLength={8} maxLength={30}
        />
        <button
          type="submit"
          className="cursor-pointer bg-[#4CAF50] py-1 rounded hover:bg-[#43A047] text-[#FFFFFF]"
        >
          SignUp
        </button>
        <p>Already have an account <Link to="/login" className="text-[#FF5722] underline">Login</Link> </p>
      </form>
    </div>
  );
};

export default Signup;
