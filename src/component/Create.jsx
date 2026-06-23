import React from 'react'
import Head from './Head'
import {Link} from "react-router-dom"
import { useState } from 'react'
export default function Create({socket}) {
  const [crname,setcrname] = useState("")
  return (
    <div className="flex flex-col gap-7  items-center justify-center">
      <Head/>
            <input type="text" className="border border-gray-950 bg-white outline-0  ps-3 pe-3 w-70 py-2" placeholder="Enter name" value={crname} onChange={(e)=>{
                setcrname(e.target.value)
            }}/>
            <Link to="/room" state={{username : crname}}><button className="bg-gray-950 text-white text-2xl w-70 py-3 cursor-pointer" onClick={()=>{socket.emit("message",crname)}}>Create</button></Link>
          </div>
  )
}
