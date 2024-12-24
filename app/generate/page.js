"use client"
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Generate = () => {

    const searchParams = useSearchParams();
    const { data: session } = useSession();

    const [links, setLinks] = useState([{ link: "", linktext: "" }]);
    // const [linktext, setLinkText] = useState("");
    const [handle, setHandle] = useState(searchParams.get('handle'));
    const [pic, setPic] = useState("");
    const [desc, setDesc] = useState("");
    const [email, setEmail] = useState("");


    // const notify = () => toast("Wow so easy!");

    const handleChange = (idx, link, linktext) => {
        setLinks((initialLinks) => {
            return initialLinks.map((item, i) => {
                if (i == idx) {
                    return {
                        link,
                        linktext
                    }
                }
                else {
                    return item
                }
            })
        })
    }

    const addLink = async () => {
        setLinks(links.concat([{ link: "", linktext: "" }]))
    }

    const submitLinks = async () => {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "links": links,
            "handle": handle,
            "pic": pic,
            "desc": desc,
            "email": email
        });
        // console.log(raw);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const r = await fetch("http://localhost:3000/api/generate", requestOptions)
        const result = await r.json()

        if(result.success) {
            toast.success(result.message)
            setLinks([])
            setPic("")
            setHandle("")
            setDesc("")
            setEmail("")
        }
        else {
            toast.error(result.message)
        }
    }

    return (
        <>
            <ToastContainer />
            <div className='min-h-[110vh] grid grid-cols-2'>

                <div className="col1 flex items-center justify-center flex-col bg-white">

                    {/* logo */}
                    <Link href="/"><img className='h-6 absolute top-8 left-8' src="/logo2.svg" alt="" />
                    </Link>
                    
                    <h1 className='text-5xl font-bold'>Create your Bitree</h1>
                    
                    <div className='flex flex-col gap-5 my-12'>

                        <div className='item'>
                            <h3>Step 1: Claim your Handle</h3>
                            <div className='flex gap-2 mx-4'>
                                <input value={handle || ""} onChange={e => { setHandle(e.target.value) }} className='rounded-md px-4 py-3 bg-gray-200' type="text" placeholder='Chose a Handle' />
                                <input value={session.user.email || ""} onChange={e => { setEmail(e.target.value) }} className='rounded-md px-4 py-3 bg-gray-200' type="text" placeholder='Enter your email' />
                            </div>
                        </div>

                        <div className='item'>
                            <h3>Step 2: Add your Links</h3>

                            {links && links.map((item, idx) => {
                                return <div key={idx} className='mx-4 flex gap-2'>
                                    <input value={item.linktext || ""} onChange={e => { handleChange(idx, item.link, e.target.value) }} className='rounded-md px-4 py-3 bg-gray-200 my-2' type="text" placeholder='Enter linktext' />
                                    <input value={item.link || ""} onChange={e => { handleChange(idx, e.target.value, item.linktext) }} className='rounded-md px-4 py-3 bg-gray-200 my-2' type="text" placeholder='Enter link' />
                                </div>
                            })}
                            <button className='px-4 py-3 rounded-full bg-black text-white font-bold' onClick={() => addLink()}>+ Add</button>
                        </div>

                        <div className='item'>
                            <h3>Step 3: Finish up by adding Profile & Description</h3>
                            <div className="mx-4 flex gap-2">
                                <input onChange={e => { setPic(e.target.value) }} value={pic || ""} className='rounded-md px-4 py-3 bg-gray-200 my-2' type="text" placeholder='Enter profile link' />
                                <input onChange={e => { setDesc(e.target.value) }} value={desc || ""} className='rounded-md px-4 py-3 bg-gray-200 my-2' type="text" placeholder='Short description' />
                            </div>
                        <button disabled={pic == "" || handle == "" || links[0].linktext == ""} onClick={() => { submitLinks() }} className='px-4 py-3 rounded-full bg-blue-700 disabled:bg-slate-300 text-white font-bold'>Generate</button>
                        </div>
                    </div>
                </div>

                <div style={{ backgroundImage: "url('/banner.png')" }} className="col2 w-full min-h-[110vh] bg-cover bg-center bg-no-repeat">
                    {/* <img className='h-full' src="/banner.png" alt="" /> */}
                </div>
            </div>
        </>
    )
}

export default Generate


