import React from 'react';
import { Link } from 'react-router-dom';
import bin from "../assets/logo (1).png";
import { FaLongArrowAltLeft } from "react-icons/fa";

const GlobalHeader = () => {
  return (
    <>
      <div className="bg-gray-200 flex justify-between items-center p-4">
        <Link
          to="/"
          className="flex items-center justify-between font-bold text-sm bg-white px-5 py-1 hover:text-blue-700 ml-24"
        >
          <FaLongArrowAltLeft className="text-sm mr-3 font-thin" />
          <img src={bin} className="h-5" alt="JS Bin Logo" />
          <p className="block text-black hover:text-blue-700">Back to JS Bin</p>
        </Link>

        <div className="flex space-x-6 mr-40">
          <Link to="/login" className="font-semibold hover:text-blue-700">
            Account
          </Link>
          <Link to="/blog" className="font-semibold hover:text-blue-700">
            Blog
          </Link>
          <Link to="/help" className="font-semibold hover:text-blue-700">
            Help
          </Link>
        </div>
      </div>
    </>
  );
};

export default GlobalHeader;
