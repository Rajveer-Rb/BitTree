"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {

  const [text, setText] = useState("")
  const router = useRouter();
  const { data: session } = useSession();

  const createTree = () => {
    router.push(`/generate?handle=${text}`)
  }

  return (
    <>
      <ToastContainer />
      <main>
        <section className='bg-[#254f1a] flex flex-col justify-center items-center gap-20 min-h-screen md:gap-10 md:justify-start md:min-h-[130vh] lg:grid lg:grid-cols-2 pr-7'>

          <div className="flex flex-col gap-2 justify-center md:items-start ml-[6vw] mt-52 md:mt-64 lg:mt-0">

            <p className="text-yellow-300 font-bold text-4xl md:text-6xl">Everyhing you are.</p>
            <p className="text-yellow-300 font-bold text-4xl md:text-6xl">In one, simple link in </p>
            <p className="text-yellow-300 font-bold text-4xl md:text-6xl">bio.</p>

            <p className="text-yellow-300 text-xl my-4">Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>

            <div className="btns flex flex-col items-center md:flex-row gap-2 my-2">
              {session && <>
                <input className="p-5 w-full md:max-w-[16vw] rounded-md" type="text" placeholder="Enter your handle" value={text} onChange={e => setText(e.target.value)} />
                <button disabled={text == ""} onClick={() => createTree()} className="p-5 rounded-full bg-purple-200 disabled:bg-slate-300 w-full lg:w-[15vw]">Claim your Linktree</button></>}
              {!session && <Link href="/login"><button className="p-5 rounded-full bg-purple-200 w-[80vw] lg:w-[15vw]">Get Started</button></Link>}
            </div>

          </div>

          <div className="md:flex flex-col items-center justify-center mr-[6vw]">
            <img className="h-full md:h-[50%]" src="/sec1.png" alt="" />
          </div>
        </section>

        {/* ----- second section ----- */}
        <section className='bg-[#E9C0E9] flex flex-col justify-center items-center gap-10 min-h-screen md:gap-10 md:min-h-[130vh] lg:grid lg:grid-cols-2 px-10'>

          <div className="flex flex-col items-center justify-center ml-[6vw]">
            <img className="lg:mt-20" src="/sec2.png" alt="" />
          </div>

          <div className="flex flex-col gap-2 justify-center ml-[6vw] lg:mt-0">

            <p className="text-purple-900 font-bold text-3xl md:text-6xl">Create and customize</p>
            <p className="text-purple-900 font-bold text-3xl md:text-6xl">your Linktree in</p>
            <p className="text-purple-900 font-bold text-3xl md:text-6xl">minutes</p>

            <p className="text-purple-900 text-xl my-4">Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link in bio landing page designed to convert.</p>

            <div className="btns flex gap-2">
              {session && <Link href="/generate"><button className="p-5 rounded-full w-full bg-purple-900 text-white font-bold">Get started for free</button></Link>}
              {!session && <Link href="/login"><button className="p-5 rounded-full w-full bg-purple-900 text-white font-bold">Get started for free</button></Link>}
            </div>

          </div>

        </section>

        <section className='bg-[#780016] flex flex-col justify-center items-center gap-10 min-h-screen md:gap-10 md:min-h-[130vh] lg:grid lg:grid-cols-2 px-10'>

          <div className="flex flex-col gap-2 justify-center ml-[6vw] mt-28 md:mt-64 lg:mt-0">

            <p className="text-purple-200 font-bold text-3xl md:text-6xl">Share your Linktree</p>
            <p className="text-purple-200 font-bold text-3xl md:text-6xl">from your Instagram</p>
            <p className="text-purple-200 font-bold text-3xl md:text-6xl">Tiktok, Twitter and</p>
            <p className="text-purple-200 font-bold text-3xl md:text-6xl">other bios</p>

            <p className="text-purple-200 text-xl my-4">Add your unique Linktree URL to all the platforms and places you find your audience. Then use your QR code to drive your offline traffic online.</p>

            <div className="btns flex gap-2">
              {session && <Link href="/generate"> <button className="p-5 rounded-full bg-purple-300 text-gray-600 w-full lg:w-[15vw] font-bold">Get started for free</button></Link>}
              {!session && <Link href="/login"> <button className="p-5 rounded-full bg-purple-300 text-gray-600 w-full lg:w-[15vw] font-bold">Get started for free</button></Link>}
            </div>

          </div>

          <div className="flex flex-col items-center justify-center mr-[6vw]">
            <img className="md:h-full md:mt-0" src="/sec3.png" alt="" />
          </div>

        </section>

      </main>
    </>
  );
}
