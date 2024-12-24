"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

const Navbar = () => {

  const pathname = usePathname();
  const showNav = ["/"].includes(pathname);

  const { data: session } = useSession();

  return (
    <>
      {showNav && <nav className='bg-white w-[90vw] mx-auto top-12 right-[4vw] rounded-full p-4 fixed flex justify-between'>
        <div className="logo flex gap-16 items-center">
          <img className='h-6' src="/logo2.svg" alt="logo" />

          <ul className='flex gap-7'>
            <Link href="/templates"><li className='cursor-pointer'>Templates</li></Link>
            <Link href="/marketplaces"><li className='cursor-pointer'>Marketplace</li></Link>
            <Link href="/discover"><li className='cursor-pointer'>Discover</li></Link>
            {session && <Link href="/profile"><li className='cursor-pointer'>Profile</li></Link> || ""}
            <Link href="/learn"><li className='cursor-pointer'>Learn</li></Link>
          </ul>
        </div>

        <div className='flex gap-2'>
          {!session && <>
          <Link href="/login"><button className="login bg-gray-300 p-4 rounded-lg">Log in</button></Link>
          <Link href="/signup"><button className="signup bg-black text-white p-4 rounded-full">Sign up free</button></Link>
          </>}

          {session && <> <button onClick={() => {signOut()}} className="login bg-gray-300 p-4 rounded-lg">Logout</button> <Link href="/generate"><button className="signup bg-black text-white p-4 rounded-full">Generate</button></Link></>}
        </div>
      </nav>}
    </>
  )
}

export default Navbar
