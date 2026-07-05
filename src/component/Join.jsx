import React from 'react'
import Head from './Head'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
export default function Join() {
  const [joinname,setjoinname] = useState("")
  const [joinid,setjoinid] = useState("")
  const navigate = useNavigate()
  const joinhandle = () => {
    if(joinname.trim() === "") return;
    localStorage.setItem("username",joinname)
    navigate(`/room/${joinid}`)
  }
  return (
   <div className="flex flex-col gap-7 items-center justify-center">
            <Head/>
            <input type="text" className="border border-gray-950 bg-white outline-0  ps-3 pe-3 w-70 py-2" placeholder="Enter name" value={joinname} onChange={(e)=>{setjoinname(e.target.value)}}/>
            <input type="text" className="border border-gray-950 bg-white outline-0  ps-3 pe-3 w-70 py-2" placeholder="Enter Room Id" value={joinid} onChange={(e)=>{setjoinid(e.target.value)}}/>
            <button className="bg-gray-950 text-white text-2xl w-70 py-3 cursor-pointer" onClick={joinhandle}>Join</button>
          </div>
  )
}
