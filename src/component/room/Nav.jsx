import React from 'react'

export default function Nav({user,host,side,name}) {
  return (
    <div className={`fixed md:static md:bg-transparent bg-gray-950 md:mt-0 mt-10  border border-amber-100 duration-75 transform-gpu md:translate-x-0 ${side?"translate-x-0":"-translate-x-full"} overflow-x-auto scrollbar-none md:flex-col gap-10 border-2 border-gray-950 h-[95%] md:h-dvh w-[50%] md:w-[20%]  items-center`}>

        <p className="mt-13 text-yellow-400 md:ml-3 ml-2">Host : {host}</p>

        <div className="flex flex-col gap-4 w-full p-4 items-center">
          <p className="self-start mb-3">Users:</p>
          {name.map((user) => (
        <p key={user.user_sid} className="md:text-2xl">{user.user_name}</p>
      ))}
      </div>   
        </div>
  )
}
