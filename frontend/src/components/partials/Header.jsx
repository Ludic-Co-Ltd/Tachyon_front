import React, { useState, useEffect } from "react";
import '../../assets/scss/auth/login.scss';
import Logo from './../../assets/images/tachyon_logo.jpg';
import LogoutIcon from '@mui/icons-material/Logout';
import auth from "../../utils/auth";

export default () => {
  const logout=()=>{
    auth.logout();
    window.location.href='/login';
  }
  return (
    <header className="fixed w-full z-50 left-0">
			<nav className="bg-white border-gray-200 px-4 lg:px-6 py-5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <img src={Logo} className="mr-3 h-12 sm:h-15" alt="Flowbite Logo" />
            <span className="self-center text-3xl font-semibold whitespace-nowrap text-primary">Tachyon</span>
          </a>
          <div className="flex items-center lg:order-2">
						{/* <BellIcon className="w-10 text-primary me-3"/> */}
						<LogoutIcon className="w-10 text-primary cursor-pointer" fontSize="large" onClick={logout}/>
          </div>
        </div>
      </nav>
		</header>
  )
}