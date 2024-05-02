import React from "react";

const Header = () => (
  <div className="bg-black text-white py-4 px-6 flex justify-between items-center">
    {/* Left Section */}
    <div className="flex space-x-4 items-center w-3/4">
      {/* Currency Selector */}
      <select className="bg-gray-200 text-gray-700 p-2 rounded w-1/4">
        <option value="usd">USD</option>
        <option value="adu">ADU</option>
        {/* Add more options */}
      </select>
      {/* Language Selector */}
      <select className="bg-gray-200 text-gray-700 p-2 rounded w-1/4">
        <option value="en">English</option>
        <option value="ar">Arabic</option>
        {/* Add more options */}
      </select>
      {/* Phone number */}
      <div className="hidden md:flex space-x-4 items-center w-1/4">
        <span className="mr-2">Phone number:</span>
        <a href="tel:+4400111044833" className="text-white hover:text-gray-300">
          +440 (0)111 044 833
        </a>
      </div>
      {/* Free international shipping */}
      <div className="hidden md:flex space-x-4 items-center w-1/4">
        <span className="mx-4">
          Free international shipping for orders above $100 USD
        </span>
      </div>
    </div>
    {/* Right Section */}
    <div className="flex space-x-4 items-center w-1/4">
      {/* <img
        src="https://static-00.iconduck.com/assets.00/facebook-icon-2048x2048-3ss3dgti.png"
        alt="Facebook"
        className="h-6 w-6"
      /> */}
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/instagram-icon.svg" alt="Instagram" className="h-6 w-6" />
      </a>
    </div>
  </div>
);

export default Header;
