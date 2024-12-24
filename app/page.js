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
    <ToastContainer/>
    <main>
      <section className='bg-[#254f1a] min-h-[130vh] grid grid-cols-2'>

        <div className="flex flex-col gap-2 justify-center ml-[6vw]">

          <p className="text-yellow-300 font-bold text-6xl">Everyhing you are.</p>
          <p className="text-yellow-300 font-bold text-6xl">In one, simple link in </p>
          <p className="text-yellow-300 font-bold text-6xl">bio.</p>

          <p className="text-yellow-300 text-xl my-4">Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>

          <div className="btns flex gap-2 my-2">
            {session && <>
              <input className="p-5 max-w-[16vw] rounded-md" type="text" placeholder="Enter your handle" value={text} onChange={e => setText(e.target.value)} />
              <button disabled={text == ""} onClick={() => createTree()} className="p-5 rounded-full bg-purple-200 disabled:bg-slate-300">Claim your Linktree</button></>}
            {!session && <Link href="/login"><button className="p-5 rounded-full bg-purple-200">Get Started</button></Link>}
          </div>

        </div>

        <div className="flex flex-col items-center justify-center mr-[6vw]">
          <img src="/sec1.png" alt="" />
        </div>
      </section>

      {/* ----- second section ----- */}
      <section className='bg-[#E9C0E9] min-h-[100vh] grid grid-cols-2'>

        <div className="flex flex-col items-center justify-center ml-[6vw]">
          <img className="mt-20" src="/sec2.png" alt="" />
        </div>

        <div className="flex flex-col gap-4 my-4 justify-center mr-[6vw]">

          <p className="text-purple-900 font-bold text-6xl">Create and customize</p>
          <p className="text-purple-900 font-bold text-6xl">your Linktree in</p>
          <p className="text-purple-900 font-bold text-6xl">minutes</p>

          <p className="text-purple-900 text-lg">Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link in bio landing page designed to convert.</p>

          <div className="btns flex gap-2">
            {session && <Link href="/generate"><button className="p-5 rounded-full bg-purple-900 text-white font-bold">Get started for free</button></Link>}
            {!session && <Link href="/login"><button className="p-5 rounded-full bg-purple-900 text-white font-bold">Get started for free</button></Link>}
          </div>

        </div>

      </section>

      <section className='bg-[#780016] min-h-[100vh] grid grid-cols-2'>

        <div className="flex flex-col gap-4 my-4 justify-center ml-[6vw]">

          <p className="text-purple-200 font-bold text-6xl">Share your Linktree</p>
          <p className="text-purple-200 font-bold text-6xl">from your Instagram</p>
          <p className="text-purple-200 font-bold text-6xl">Tiktok, Twitter and</p>
          <p className="text-purple-200 font-bold text-6xl">other bios</p>

          <p className="text-purple-200 text-xl">Add your unique Linktree URL to all the platforms and places you find your audience. Then use your QR code to drive your offline traffic online.</p>

          <div className="btns flex gap-2">
            {session && <Link href="/generate"> <button className="p-5 rounded-full bg-purple-300 text-gray-600 w-[15vw] font-bold">Get started for free</button></Link>}
            {!session && <Link href="/login"> <button className="p-5 rounded-full bg-purple-300 text-gray-600 w-[15vw] font-bold">Get started for free</button></Link>}
          </div>

        </div>

        <div className="flex flex-col items-center justify-center mr-[6vw]">
          <img className="mt-20" src="/sec3.png" alt="" />
        </div>

      </section>

    </main>
    </>
  );
}
