import React from 'react'
import Head from './Head'
import {useNavigate} from "react-router-dom"
import { useState ,useEffect } from 'react'
export default function Create({socket}) {
  const [crname,setcrname] = useState("")
  const [loading,setloading] = useState(false)

   const navigate = useNavigate()

     useEffect(()=>{
       console.log("Room mounted, socket id:", socket.id);
   
       socket.on("room_created",(data)=>{
               console.log("out event",data)
               localStorage.setItem("username",crname)
                 navigate(`/room/${data.room_id}`)
         })
   
       return ()=>{
         socket.off("room_created")
       }
     },[socket])
   
   const handlecreate = ()=>{
      if (crname.trim() === ""){
        return;
      }
      else{
        setloading(true)
        socket.emit("create_room",crname)
      }
   }

  return (
    <div className="flex flex-col gap-7  items-center justify-center">
      <Head/>
            <input type="text" className="border border-gray-950 bg-white outline-0  ps-3 pe-3 w-70 py-2" placeholder="Enter name" value={crname} onChange={(e)=>{
                setcrname(e.target.value)
            }}/>
            <button className="bg-gray-950 text-white text-2xl w-70 py-3 cursor-pointer" onClick={handlecreate}>Create</button>
             
             {/* rotate wheel */}
            
            {loading && (
              <div className="fixed h-dvh w-full bg-gray-900 flex items-center flex-col gap-4 justify-center">
                <div className="wheel p-3 bg-transparent border-5 border-t-amber-50 rounded-full animate-spin border-transparent"></div>
                <p className='text-white'>Please wait</p>
              </div>
            )}

          </div>
  )
}
