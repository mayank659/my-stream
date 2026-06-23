import React from 'react'
import {Link} from "react-router-dom"
import Head from './Head'

export default function Home() {
  return (
    <div className="flex  flex-col gap-10  items-center justify-center">
      <div className="flex">
      <Head/>
      </div>
      <div className="flex flex-col md:flex-row gap-10">  
        <Link to="/create"><button className="bg-gray-950  text-white text-2xl w-70 py-3 cursor-pointer">Create Room</button></Link>
         <Link to="/join"><button className="bg-gray-950 text-white text-2xl w-70 py-3 cursor-pointer">Join Room</button></Link>
         </div>
    </div>
  )
}
