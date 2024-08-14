import React, { useState } from 'react'
import logo from "../assets/logo (1).png";
import { IoCloseSharp } from "react-icons/io5";
import { RiArrowRightDoubleFill } from "react-icons/ri";
let setIsBannerVisibleGlobal;

export const handleClose = () => {
    setIsBannerVisibleGlobal(false);
  };
  
  export const handleOpen = () => {
    setIsBannerVisibleGlobal(true);
  };

export default function TopHeader() {
    const [isBannerVisible, setIsBannerVisible] = useState(false); 

setIsBannerVisibleGlobal = setIsBannerVisible;

  return (
    <>
    {isBannerVisible && (
      <div className="bg-[#ECF2FA] relative text-blue-600  py-4 px-6 flex justify-between items-center">
        <div className="absolute top-4 left-6">
          <IoCloseSharp
            className="text-blue-200 text-2xl hover:bg-gray-300 
          cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <div className="flex items-center flex-col  ">
          <img src={logo} className="h-28" alt="Logo" />
          <button className="border border-blue-700 hover:bg-gray-300 text-blue py-1 px-12 mt-4 text-sm">
            New bin
          </button>
        </div>

        {/* JS Bin Features */}
        <div className="flex flex-col text-center mb-10 ">
          <div className="flex items-center justify-center ml-2">
      <h2 className="text-sm font-bold  hover:bg-gray-300">  JS Bin Features</h2>
      <RiArrowRightDoubleFill className="text-sm items-center mt-1" />
    </div>

          <div className="flex flex-col text-sm gap-1 mt-2 ml-2">
            <span className="hover:bg-gray-300 mr-6">Getting Started</span>
            <span className="hover:bg-gray-300 mt-1">Keyboard Structure</span>
            <span className="hover:bg-gray-300 ml-7">
              Exporting/importing gist
            </span>
          </div>
        </div>

        {/* Pro Features */}
        <div className="flex flex-col text-center">
          <div className="flex items-center justify-center">
      <h2 className="text-sm font-bold  hover:bg-gray-300">Pro Features</h2>
      <RiArrowRightDoubleFill className="text-sm items-center mt-1" />
    </div>
          <div className="flex flex-col text-sm">
            <span className="hover:bg-gray-300 mt-1 mr-7">Private bins</span>
            <span className="hover:bg-gray-300 mt-1 mr-7">Vanity URLs</span>
          </div>
          <button  className="bg-[#4caf50] hover:bg-green-600 text-white py-2 px-16 ml-16 mt-8 rounded text-base">
            Upgrade to Pro Now
          </button>
        </div>

        {/* Blogs */}
        <div className="text-center mb-4">
          <div>
           <div className="flex items-center justify-center mr-14">
      <h2 className="text-sm font-bold  hover:bg-gray-300 ">Blog</h2>
      <RiArrowRightDoubleFill className="text-sm items-center mt-1" />
    </div>
            <span className="text-sm hover:bg-gray-300 ml-6">
              The Return and The Refactor
            </span>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-center mr-14">
      <h2 className="text-sm font-bold  hover:bg-gray-300">Help </h2>
      <RiArrowRightDoubleFill className="text-sm items-center mt-1" />
    </div>
            <div className="">
              <span className="text-sm hover:bg-gray-300">
                SSL opt-in support
              </span>
              <br />
              <span className="text-sm mr-16 hover:bg-gray-300">
                Stickers
              </span>
            </div>
          </div>
        </div>

        {/* Donate to JSBin */}
        <div className="text-center mb-8 ml-16">
            <div className="flex items-center justify-center">
      <h2 className="text-sm font-bold  hover:bg-gray-300 "> Donate to JSBin💙</h2>
      <RiArrowRightDoubleFill className="text-sm items-center mt-1" />
    </div>
          <p className="text-sm mb-2 hover:bg-gray-300 mt-2">
            Support JSBin to keep the project open source & MIT for all
          </p>
          <p className="text-sm mb-2 hover:bg-gray-300">
            Follow @_jsbin on Twitter
          </p>
          <p className="text-sm mb-2 hover:bg-gray-300">
            By using JS Bin you agree to our legal terms
          </p>
        </div>
      </div>
    )}

    </>
  )

}
