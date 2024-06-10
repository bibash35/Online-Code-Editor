import React from 'react'

export default function Footer() {
  return (
    <>
     <footer className="bg-gray-200 text-black py-1">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="bg-[#4CAF50] text-white text-sm rounded py-[2px] px-[6px] ">
              Ad
            </span>
            <div>
              <span className="font-semibold text-md text-[#00000099]">
                AI-powered ad network for devs.{" "}
              </span>
              <span className="text-sm text-[#00000099]">
                {" "}
                Get your message in front of the right developers with
                EthicalAds.
              </span>
            </div>
          </div>
          <div>
            <span className="text-sm text-[#00000080]">AdsbyEthicalAds</span>
          </div>
        </div>
      </footer>
    </>
  )
}
