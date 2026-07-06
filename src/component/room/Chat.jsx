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
    const [isTyping, setIsTyping] = useState(false);
    const [typingdata, settypingdata] = useState("");
    useEffect(() => {
    chatBoxRef.current?.scrollIntoView({ behavior: 'smooth' })

  }, [msg]);
  useEffect(() => { 
    const recieveMessage = (data) => {
      setMsg((prev) => [...prev, data]);
    }
    
    const typing = (data) => {
        console.log(data.username + " is typing...")
        setIsTyping(true)
        settypingdata(data.username)
        setTimeout(() => {
            setIsTyping(false)
        }, 5000)
    }

      socket.on("receive_message", recieveMessage)
      socket.on("user_is_typing", typing)

        return () => {
            socket.off("receive_message",recieveMessage);
            socket.off("user_is_typing", typing)
            
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

    const istyping = () => {
        socket.emit("typing", {
            "username": username,
            "room_id": roomId
        });
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
                    {isTyping && (
                        <p className='text-center text-[15px]'>{typingdata} is typing ...</p>
                    )}
                    <div className="bottom" ref={chatBoxRef}></div>
        </div>
    
                {/* Input box */}
        <div className="w-full flex p-2 justify-center gap-3">
        <input type="text" className="border border-white rounded-4xl w-full text-[15px] md:text-[18px] p-2 px-5  outline-0" value={text} onChange={(e) => {setText(e.target.value); istyping();}}
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
