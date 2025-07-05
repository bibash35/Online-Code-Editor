import React from 'react'

const GlobalFooter = () => {
  return (
    <>
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

export default GlobalFooter