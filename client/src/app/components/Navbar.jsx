import React from 'react'
import logo from "../../Assest/images/logo.png"

const Navbar = () => {
  return (
    <div>
        <img src={logo}></img>
        <div className="flex">
      {/* 25% width, black background */}
      <div className="w-1/4 bg-black">Usama </div>
      {/* 50% width, red background */}
      <div className="w-1/2 bg-red-500">Black</div>
      {/* 25% width, white background */}
      <div className="w-1/4 bg-white"> blue</div>
    </div>
    </div>
  )
}

export default Navbar