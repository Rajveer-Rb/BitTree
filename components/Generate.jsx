"use client";

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Generate = ({ initialHandle }) => {
  const { data: session } = useSession();

  const [links, setLinks] = useState([{ link: "", linktext: "" }]);
  const [handle, setHandle] = useState(initialHandle); // Use the initial handle from props
  const [pic, setPic] = useState("");
  const [desc, setDesc] = useState("");
  const [email, setEmail] = useState(session?.user?.email || ""); // Use session email

  const handleChange = (idx, link, linktext) => {
    setLinks((prevLinks) =>
      prevLinks.map((item, i) => (i === idx ? { link, linktext } : item))
    );
  };

  const addLink = () => {
    setLinks((prevLinks) => [...prevLinks, { link: "", linktext: "" }]);
  };

  const submitLinks = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ links, handle, pic, desc, email }),
    };

    try {
      const response = await fetch("/api/generate", requestOptions);
      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        setLinks([{ link: "", linktext: "" }]);
        setHandle("");
        setPic("");
        setDesc("");
        setEmail(session?.user?.email || ""); // Reset to session email
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen md:min-h-[110vh] md:grid md:grid-cols-2">
        <div className="col1 hidden md:flex items-center justify-center flex-col bg-white">
          <h1 className="text-5xl font-bold">Create your Bitree</h1>

          <div className="flex flex-col gap-5 my-12">
            <div className="item">
              <h3>Step 1: Claim your Handle</h3>
              <div className="flex gap-2 mx-4">
                <input
                  value={handle || ""}
                  onChange={(e) => setHandle(e.target.value)}
                  className="rounded-md px-4 py-3 bg-gray-200"
                  type="text"
                  placeholder="Choose a Handle"
                />
                <input
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-md px-4 py-3 bg-gray-200"
                  type="text"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="item">
              <h3>Step 2: Add your Links</h3>
              {links.map((item, idx) => (
                <div key={idx} className="mx-4 flex gap-2">
                  <input
                    value={item.linktext || ""}
                    onChange={(e) => handleChange(idx, item.link, e.target.value)}
                    className="rounded-md px-4 py-3 bg-gray-200 my-2"
                    type="text"
                    placeholder="Enter link text"
                  />
                  <input
                    value={item.link || ""}
                    onChange={(e) => handleChange(idx, e.target.value, item.linktext)}
                    className="rounded-md px-4 py-3 bg-gray-200 my-2"
                    type="text"
                    placeholder="Enter link"
                  />
                </div>
              ))}
              <button
                className="px-4 py-3 rounded-full bg-black text-white font-bold"
                onClick={addLink}
              >
                + Add
              </button>
            </div>

            <div className="item">
              <h3>Step 3: Finish up by adding Profile & Description</h3>
              <div className="mx-4 flex gap-2">
                <input
                  value={pic || ""}
                  onChange={(e) => setPic(e.target.value)}
                  className="rounded-md px-4 py-3 bg-gray-200 my-2"
                  type="text"
                  placeholder="Enter profile link"
                />
                <input
                  value={desc || ""}
                  onChange={(e) => setDesc(e.target.value)}
                  className="rounded-md px-4 py-3 bg-gray-200 my-2"
                  type="text"
                  placeholder="Short description"
                />
              </div>
              <button
                disabled={!pic || !handle || !links[0].linktext}
                onClick={submitLinks}
                className="px-4 py-3 rounded-full bg-blue-700 disabled:bg-slate-300 text-white font-bold"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Generate;
