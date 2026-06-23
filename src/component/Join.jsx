import React from 'react'
import Head from './Head'
export default function Join() {
  return (
   <div className="flex flex-col gap-7 items-center justify-center">
            <Head/>
            <input type="text" className="border border-gray-950 bg-white outline-0  ps-3 pe-3 w-70 py-2" placeholder="Enter name"/>
            <input type="text" className="border border-gray-950 bg-white outline-0  ps-3 pe-3 w-70 py-2" placeholder="Enter Room Id"/>
            <button className="bg-gray-950 text-white text-2xl w-70 py-3 cursor-pointer">Join</button>
          </div>
  )
}
