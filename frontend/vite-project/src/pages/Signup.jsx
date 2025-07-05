import axios from "axios";
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {  useNavigate } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';
import GlobalHeader from "../constant/GlobalHeader";
import GlobalFooter from "../constant/GlobalFooter";
import cat from "../assets/cat.png"
import { loginGit } from "../redux/slice/gitSlice";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import {app} from "../config/firebase.config"
import { useDispatch } from "react-redux";

export default function Signup() {
  const navigate= useNavigate()
  const dispatch = useDispatch()

  const [data, setData] = useState({
    Username: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
  });
  
  const handleOnChange = (e) => {
    const { name, value } = e.target;
  
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
  

      const handleSubmit = (e) => {
    e.preventDefault();
    setFormError({}); 
    axios.post("https://online-code-editor-backend-j1f4.onrender.com/api/auth/signup", data)
      .then((res) => {
        toast.success("Signup successful");
        navigate("/login");
      })
      .catch((err) => {
        const responseData = err?.response?.data;
        if (Array.isArray(responseData?.errors)) {
          const backendErrors = {};
          responseData.errors.forEach((error) => {
            backendErrors[error.field] = error.msg;
          });
          setFormError(backendErrors);
        } else {
          toast.error(responseData?.msg || "Signup failed");
        }
        console.error("Signup Error:", responseData);
      });
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

    
    {/* Registration Form Section */}
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className=" p-8 shadow-md border border-black">
      <p className="text-sm  text-center font-semibold  text-[#00000080]">New to JS Bin</p>
        <h1 className="text-xl  mb-4 text-center">Register</h1>    
            <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block  text-sm mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              name="Username"
              className="border border-black w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
              value={data.Username}
            onChange={handleOnChange}
            />
          </div>
          {formError.Username && <span className="text-red-500 text-sm">{formError.Username}</span>} {/* Display error message */}

          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="border border-black w-full py-1 px-2 focus:outline-none focus:border-black"
              value={data.email}
            onChange={handleOnChange}
            />
          </div>
          {formError.email && <span className="text-red-500 text-sm">{formError.email}</span>} {/* Display error message */}

          <div className="mb-4">
            <label className="block  text-sm  mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="border border-black w-full py-1 px-2 focus:outline-none focus:border-black"
              value={data.password}
            onChange={handleOnChange}
            />
          </div>
          {formError.password && <span className="text-red-500 text-sm">{formError.password}</span>} {/* Display error message */}

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="text-black border border-black bg-[#EDEDED] shadow-md py-0 px-8 mt-4 focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
           <p className="text-[#00000080] underline mt-6 font-semibold">
             Already have account?
            <Link to={"/login"} className="text-[#00000080] underline">
              Login
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

