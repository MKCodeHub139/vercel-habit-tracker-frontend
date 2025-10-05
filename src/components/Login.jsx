import React, { useState } from "react";
import {LoginUser} from '../graphql/mutations';
import { useMutation } from "@apollo/client/react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate =useNavigate()
  const [Login_User] =useMutation(LoginUser)
  const notify = (msg) => toast(msg);

  const handleLoginUser =async(e)=>{
    e.preventDefault()
    const response =await Login_User({variables:{
     input:{ 
      email,
      password
    }
    }})
    if(response){
      notify('Loggedin successfully')
      setTimeout(()=>navigate('/') ,3000)
    }
  } 
  return (
    <div className="w-full flex justify-center container mx-auto py-9">
      <ToastContainer />
      <form action="" onSubmit={handleLoginUser} className="flex flex-col md:w-1/3 sm:1/4 w-full bg-[#F5F5F5] gap-4 shadow-2xl my-9 p-5">
        <h2 className="text-2xl font-[600]">Login</h2>
        <label htmlFor="">email</label>
        <p className="text-[#FF5722]">demo email : kaifansari@gmail.com</p>
        <input
          type="email"
          name=""
          id=""
          placeholder="enter email"
          value={email} onChange={(e)=>setEmail(e.target.value)}
          className="px-2 border-1 rounded"
        />
        <p className="text-[#FF5722]">demo password : 12345678</p>
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
          Login
        </button>
        <p>Create a new account <Link to="/signup" className="underline text-[#FF5722]">Signup</Link></p>
      </form>
    </div>
  );
};

export default Login;
