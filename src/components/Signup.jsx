import React, { useState } from "react";
import {CreateUser} from '../graphql/mutations';
import { useMutation } from "@apollo/client/react";
import { Link } from "react-router-dom";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Create_User] =useMutation(CreateUser)
  const handleCreateUser =async(e)=>{
    e.preventDefault()
    const response =await Create_User({variables:{
     input:{ 
      name,
      email,
      password}
    }})
  }
  return (
    <div className="w-full flex justify-center container mx-auto py-9">
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
          className="px-2 border-1 rounded"
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
