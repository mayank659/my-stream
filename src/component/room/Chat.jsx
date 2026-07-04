import React from 'react'
import arrow from "../../assets/arrow.png";
import { useState , useEffect , useRef } from 'react';
import { useParams } from 'react-router-dom';
export default function Chat({username,socket}){
    const [msg, setMsg] = useState([]);
    const [text, setText] = useState("");
    const [disconnect,setdisconnect] = useState([])
    const chatBoxRef = useRef(null)
    const {roomId} = useParams()
    useEffect(() => {
    chatBoxRef.current?.scrollIntoView({ behavior: 'smooth' })

  }, [msg]);
  useEffect(() => { 
    const recieveMessage = (data) => {
      setMsg((prev) => [...prev, data]);
    }
    
      socket.on("receive_message", recieveMessage)
      
        return () => {
            socket.off("receive_message",recieveMessage);
            
        }
    },[socket]);
    
    const sendMessage = () => {
    if (text.trim() === "") return;
    console.log(username)
    socket.emit("send_message", {
        "username": username,
        "text": text,
        "room_id": roomId
    });
    setText("");
    };

  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center">
                  {/* chat screen */}
        <div className="w-full border border-gray-950 md:h-93 h-65 rounded-2xl overflow-x-auto scrollbar-none">
                    {msg.map((message, index) => (
                        <div key={index} className={"flex justify-start p-2"}>
                            <div className="rounded-lg p-2 bg-gray-950 text-white">
                                <p className="text-[14px] md:text-[16px] font-bold">{message.username}</p>
                                <p className="text-[14px] md:text-[16px]">{message.text}</p>
                            </div>
                        </div>
                    ))}
                    <div className="bottom" ref={chatBoxRef}></div>
        </div>
    
                {/* Input box */}
        <div className="w-full flex p-2 justify-center gap-3">
        <input type="text" className="border border-white rounded-4xl w-full text-[15px] md:text-[18px] p-2 px-5  outline-0" value={text} onChange={(e) => setText(e.target.value)}
        onKeyDown={(e)=>{
            if(e.key === "Enter"){
                sendMessage();
            }
        }}></input>
        <img src={arrow} className="h-10 w-10 cursor-pointer bg-white rounded-[50%]" onClick={sendMessage}></img>
        </div>
    
    </div>
  )
}
