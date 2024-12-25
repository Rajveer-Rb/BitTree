"use client"
import React, { useState } from 'react'
import Link from 'next/link'

const page = () => {

    const [handle, setHandle] = useState("")

    return (

        <section className='bg-stone-200'>

            <Link href="/"><img src="/logo2.svg" alt="" className='absolute left-8 top-8 h-6' /></Link>
            <div className='min-h-screen md:mx-auto lg:max-w-lg flex flex-col gap-5 items-center bg-cover bg-no-repeat bg-center' style={{ backgroundImage: "url('/profile2.jpg')" }}>

                <div className='flex flex-col items-center lg:mt-16 mt-48'>
                    <h1 className='text-5xl font-bold'>Find Yourself</h1>
                    <h3 className='text-white'>Enter your created handle below</h3>
                </div>


                <div className='flex flex-col gap-2 lg:my-0 w-[75%]'>
                    <input value={handle || ""} onChange={(e) => { setHandle(e.target.value) }} className='px-3 py-4 rounded-md' type="text" placeholder='Enter your handle' />
                    <Link href={handle}>
                        <button
                            disabled={handle === ""}
                            className={`px-3 py-4 rounded-full bg-black text-white w-full shadow-md min-w-[20vw] border border-gray-200 transition-transform ${handle === "" ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
                                }`}
                        >
                            Search
                        </button>
                    </Link>
                </div>

            </div>
        </section>
    )
}

export default page
