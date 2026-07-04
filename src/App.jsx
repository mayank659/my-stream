import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import Join from "./component/Join";
import Home from "./component/Home";
import Create from "./component/Create";
import Room from "./component/Room";
import {BrowserRouter , Routes ,Route } from "react-router-dom"
import "./App.css";
const socket = io("http://127.0.0.1:5000");

function App() {
  const [message, setmessage] = useState("");
  const [text, settext] = useState("");
  const [out, setout] = useState([]);

  /* useEffect(() => {
    socket.emit("maya", "hello server");
    socket.on("reply", (msg) => {
      setmessage(msg);
    });
    return () => {
      socket.off("reply");
    };
  }, []); */


  return (
    <>
      <div className="flex  items-center justify-center">{message && <h1 className="text-red-500 m-4 rounded-2xl border border-amber-500 p-5">{message}</h1>}</div>
       <div className="main flex-col h-dvh w-full flex items-center gap-12 justify-center bg-gray-900">
          
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/join" element={ <Join/>}/>
            <Route path="/create" element={ <Create socket={socket}/>}/>
            <Route path="/room/:roomId" element={ <Room socket={socket}/>}/>
          </Routes>
          </BrowserRouter>
      </div>
    </>
  );
}

export default App;
