import axios from "axios";
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {  useNavigate } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';
import cat from "../assets/cat.png"
import bin from "../assets/logo (1).png"
import { FaLongArrowAltLeft } from "react-icons/fa";
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
    setData({...data,[e.target.name]:e.target.value})
      }
      const handleSubmit = (e) => {
        e.preventDefault();
        let errors = {};
    
        // Check if all fields are filled
        if (!data.Username && !data.email && !data.password) {
          toast.error("Please fill in all fields.");
        } else {
          if (!data.Username) {
            toast.error("Please fill in the username.");
          }
          if (!data.email) {
            toast.error("Please fill in the email.");
          }
          if (!data.password) {
            toast.error("Please fill in the password.");
          }
        }
    
        // Set errors to state if any
        setFormError(errors);
    
        if (Object.keys(errors).length === 0) {
          axios.post("http://localhost:8000/api/auth/signup", data)
            .then((res) => {
              toast.success("Signup successful");
              navigate('/login');
            })
            .catch((err) => {
              console.log(err);
              toast.error("Someting went wrong. try agin later");
            });
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

    {/* Header Section */}
    <div className="bg-gray-200 flex justify-between items-center p-4 ">
    <Link to={"/"} className="flex items-center justify-between font-bold  text-sm bg-white px-5 py-1 hover:text-blue-700 ml-24">
      <FaLongArrowAltLeft className="text-sm mr-3 font-thin"/>
    <img src={bin} className="h-5 " /> 
    <p className="block text-black hover:text-blue-700">Back to JS Bin</p>
  </Link>
      <div className="flex space-x-6 mr-40">
        <a href="#" className="font-semibold hover:text-blue-700">Account</a>
        <a href="#" className="font-semibold hover:text-blue-700">Blog</a>
        <a href="#" className="font-semibold hover:text-blue-700">Help</a>
      </div>
    </div>

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

    {/* Footer Section */}
    <div className="bg-gray-200 flex justify-between items-center p-4 mt-5">
      <div className="flex space-x-6 ml-24 text-[#00000080]">
        <a href="#" className="font-semibold">About</a>
        <a href="#" className="font-semibold">Twitter</a>
        <a href="#" className="font-semibold">GitHub</a>
        <a href="#" className="font-semibold">YouTube</a>
        <a href="#" className="font-semibold">Donate</a>
      </div>
      <div className="flex mr-40">
        <a href="#" className="text-sm gap-1 text-[#00000080]">Hack. Learn.Fix.Teach.</a>
      </div>
    </div>
   </>
  )
}
