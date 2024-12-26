"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

const Navbar = () => {

  const pathname = usePathname();
  const showNav = ["/"].includes(pathname);
  const [showDropDown, setshowDropDown] = useState(false)

  const { data: session } = useSession();

  return (
    <>
    <img className='absolute top-8 left-8 h-4 md:hidden' src="/logo2.svg" alt="" />
      {showNav && <nav className='bg-white  md:w-[90vw] mx-auto top-12 right-[4vw] rounded-full p-1 lg:p-4 fixed flex justify-between'>

        {/* <img className='block md:hidden' src="/menu.svg" alt="" /> */}

        <button id="dropdownDefaultButton" onClick={() => setshowDropDown(!showDropDown)} onBlur={() => { setTimeout(() => { setshowDropDown(false) }, 300); }} data-dropdown-toggle="dropdownDelay" data-dropdown-delay="500" data-dropdown-trigger="hover" className="md:hidden text-white bg-white hover:bg-slate-400 font-medium rounded-lg text-sm px-1 py-1 text-center inline-flex items-center" type="button"><img className='h-3' src="/menu.svg" alt="" />
        </button>

          {/* <!-- Dropdown menu --> */}
          <div id="dropdown" className={`z-10 ${showDropDown ? "" : "hidden"} absolute right-4 top-[70px]  bg-gray-600 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
            <ul className="py-2 text-sm text-gray-200 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              {session && <li>
                <Link href="/generate" className="block px-4 py-2 hover:bg-gray-500 dark:hover:bg-gray-600 dark:hover:text-white">Generate</Link>
              </li>}

              {session && <li>
                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-500 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
              </li>}

              {session && <li>
                <Link href="#" onClick={() => { signOut() }} className="block px-4 py-2 hover:bg-gray-500 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
              </li>}

              {!session && <li>
                <Link href="/login" className="block px-4 py-2 hover:bg-gray-500 dark:hover:bg-gray-600 dark:hover:text-white">Login</Link>
              </li>}
            </ul>
          </div>

        


        <div className="logo hidden md:flex gap-16 items-center">
          <img className='h-6' src="/logo2.svg" alt="logo" />

          <ul className='flex gap-7'>
            <Link href="/templates"><li className='cursor-pointer'>Templates</li></Link>
            <Link href="/marketplaces"><li className='cursor-pointer'>Marketplace</li></Link>
            <Link href="/discover"><li className='cursor-pointer'>Discover</li></Link>
            {session && <Link href="/profile"><li className='cursor-pointer'>Profile</li></Link> || ""}
            <Link href="/learn"><li className='cursor-pointer'>Learn</li></Link>
          </ul>
        </div>

        <div className='hidden md:flex gap-2'>
          {!session && <>
            <Link href="/login"><button className="login bg-gray-300 p-4 rounded-lg">Log in</button></Link>
            <Link href="/signup"><button className="signup bg-black text-white p-4 rounded-full">Sign up free</button></Link>
          </>}

          {session && <> <button onClick={() => { signOut() }} className="login bg-gray-300 p-4 rounded-lg">Logout</button> <Link href="/generate"><button className="signup bg-black text-white p-4 rounded-full">Generate</button></Link></>}
        </div>
      </nav>}
    </>
  )
}

export default Navbar
