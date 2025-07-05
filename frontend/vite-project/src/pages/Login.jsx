import axios from "axios";
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast';
import ErrorMessage from "../components/ErrorMessage";
import { useDispatch } from "react-redux";
import { loginRedux } from "../redux/slice/userSlice"
import GlobalHeader from "../constant/GlobalHeader";
import GlobalFooter from "../constant/GlobalFooter";
import cat from "../assets/cat.png"
import { loginGit } from "../redux/slice/gitSlice";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import {app} from "../config/firebase.config"

export default function Login() {
  const navigate= useNavigate()
  const dispatch = useDispatch()

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
  });
 
  const handleOnChange = (e) => {
    const { name, value } = e.target;
  
    // Update the input data state
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    // Remove the error for the specific field if the user starts typing
    setFormError((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      if (updatedErrors[name]) {
        delete updatedErrors[name]; // Remove the error for the field
      }
      return updatedErrors;
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setFormError({});

  try {
    const response = await axios.post("https://online-code-editor-backend-j1f4.onrender.com/api/auth/login", data);
   const resData = response.data;
    localStorage.setItem("user", JSON.stringify(resData));
    dispatch(loginRedux(resData));
    toast.success("Login successful");
    navigate("/");
    
  } catch (err) {
    const responseData = err?.response?.data;

    if (responseData?.errors && Array.isArray(responseData.errors)) {
      const dynamicErrors = {};
      responseData.errors.forEach((error) => {
        dynamicErrors[error.field] = error.msg;
      });
      setFormError(dynamicErrors);
    } else {
      toast.error(responseData?.msg || "Something went wrong. Try again later.");
    }
  }
};

  const signInWithGithub = async () => {
    const provider = new GithubAuthProvider();
    provider.addScope('user');
    const auth = getAuth(app);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch(loginGit(user));
      localStorage.setItem("git", JSON.stringify(user));
      console.log(result);
      navigate('/')
    } catch (error) {
      console.error("GitHub sign-in error:", error);
    }
  };
    
 
  
  return (
   <>
      <Toaster />
         <GlobalHeader/>
    
    {/* Login Form Section */}
<div className="flex flex-col justify-center items-center min-h-screen mt-5">
      <div className=" p-8 shadow-md border border-black">
        <p className="text-sm  text-center font-semibold  text-[#00000080]">Existing users</p>
        <h1 className="text-xl  mb-4 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              className="border border-black w-full py-1 px-2 focus:outline-none focus:border-black"
            />
          </div>
          {formError.email && <span className="text-red-500 
          text-sm mt-1 ">{formError.email}</span>} 

          <div className="mb-4">
            <label className="block  text-sm  mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleOnChange}
              className="border border-black w-full py-1 px-2 focus:outline-none focus:border-black"
            />
          </div>
          {formError.password && <span className="text-red-500 text-sm">{formError.password}</span>} 

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="text-black border font-semibold border-black 
              shadow-sm bg-[#EDEDED] py-0 px-8 mt-4 focus:outline-none
               focus:shadow-outline"
            >
              Log in
            </button>
            
          </div>
          <p className="text-[#00000080] underline mt-6 font-semibold">
            Don’t have an Account?
            <Link to={"/Register"} className="text-[#00000080] underline">
              Create account
            </Link>
          </p>
        </form>
      </div>

      {/* GitHub Login/Register Button */}
      <div className='flex justify-center items-center mt-12'>
          <Link to={""} className="flex items-center justify-between gap-2 border
           border-black shadow-md py-2 px-6 bg-gray-100"
           onClick={signInWithGithub}
           >
    <img src={cat} className="h-7 " />
    <a className="block text-black" href="#">
      Login or Register via Github
    </a>
  </Link>
      </div>
    </div>

<GlobalFooter/>
    
   </>
  )
}
