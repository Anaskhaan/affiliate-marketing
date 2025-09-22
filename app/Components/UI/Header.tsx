"use client";

import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const Header: FC = () => {
  return (
    <header className='sticky top-0 z-50 bg-[#0b3557] text-white w-full shadow-md'>
      {/* Top Row */}
      <nav className='px-6 py-2 grid grid-cols-3 items-center text-sm font-medium border-b border-white/20'>
        {/* Left: Navigation */}
        <div className='col-span-2 flex items-center justify-start gap-6'>
          <button className='hover:text-[#00b1e1] transition'>SHOPPING</button>
          <button className='hover:text-[#00b1e1] transition'>FLIGHT</button>
          <button className='hover:text-[#00b1e1] transition'>MAGAZINE</button>
        </div>

        {/* Right: Tagline */}
        <div className='flex justify-end w-full'>
          <span className='flex items-center gap-1 font-medium text-sm text-white/90'>
            Sustainability at Nexsol 🌱
          </span>
        </div>
      </nav>

      {/* Middle Row */}
      <div className='flex items-center justify-between px-6 py-4 lg:px-12'>
        {/* Left: Logo & Hamburger */}
        <div className='flex items-center gap-4'>
          <button className='md:hidden'>
            <FontAwesomeIcon icon={faBars} size='lg' />
          </button>

          <div className='flex items-center font-bold text-2xl tracking-wide'>
            <span className='ml-1'>Nexsol</span>
          </div>
        </div>

        {/* Search (desktop only) */}
        <div className='hidden md:flex flex-1 max-w-2xl mx-6 border rounded-full bg-white shadow-sm overflow-hidden'>
          <input
            type='text'
            placeholder="I'm looking for..."
            className='w-full px-4 py-2 text-black text-sm focus:outline-none'
          />
          <button className='px-4 flex items-center justify-center bg-[#00b1e1] text-white hover:bg-[#0093c1] transition'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>

        {/* Right: Actions */}
        <div className='flex items-center gap-4 text-sm'>
          <button className='hidden md:flex items-center gap-1 hover:text-[#00b1e1] transition'>
            <FontAwesomeIcon icon={faHeart} /> <span>Notepad</span>
          </button>
          <button className='hidden md:flex items-center gap-1 hover:text-[#00b1e1] transition'>
            <FontAwesomeIcon icon={faBell} /> <span>Alerts</span>
          </button>
          <button className='hidden md:flex items-center gap-1 hover:text-[#00b1e1] transition'>
            <FontAwesomeIcon icon={faUser} /> <span>Register</span>
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className='px-4 pb-3 md:hidden'>
        <div className='flex'>
          <input
            type='text'
            placeholder="I'm looking for..."
            className='w-full px-4 py-2 rounded-l-md text-black text-sm focus:outline-none'
          />
          <button className='bg-[#00b1e1] px-4 flex items-center justify-center rounded-r-md text-white hover:bg-[#0093c1] transition'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>
    </header>
  );
};
