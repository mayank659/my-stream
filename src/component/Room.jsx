import React, { useEffect, useState, useRef } from "react";
import { data, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Nav from "./room/Nav";
import Chat from "./room/Chat";
export default function Room({ socket }) {
  const [name, setname] = useState([]);
  const [host, sethost] = useState("");
  const [roomid, setroomid] = useState("");
  const [ytid, setytid] = useState("");
  const [side, setside] = useState(false);
  const [url, seturl] = useState("");
  const username = localStorage.getItem("username");
  const { roomId } = useParams();
  const player = useRef(null);
  const syncing = useRef(false);

  useEffect(() => {
    const join = () => {
      socket.emit("join_room", {
        username: username,
        room_id: roomId,
      });
    };

    if (socket.connected) {
      join();
    } else {
      socket.on("connect", join);
    }

    socket.on("userupdate", (data) => {
      sethost(data.host.host_name);
      setname(data.users);
    });

   const interval = setInterval(() => {
      if (!player.current) return;

      socket.emit("time_update", {
        room_id: roomId,
        current_time: player.current.getCurrentTime(),
      });
    }, 5000);

    const handleVideoChange = (data) => {
      if(!player.current) return;
      syncing.current = true;
      if (data.video.play) {
        player.current.playVideo();
      } else {
        player.current.pauseVideo();
      }
      console.log(data);
      setTimeout(() => {
        syncing.current = false;
      }, 100);
    };

    const videoTimeUpdate = (data) => {
      if (!player.current) return;
      const currentTime = player.current.getCurrentTime();
      const server = data.video.current;
      if (Math.abs(currentTime - server) > 1.5) {
        player.current.seekTo(server, true);
        setTimeout(() => {
          syncing.current = false;
        }, 200);
      }
    }

    const handleVideoSeeked = (data) => {
      if(!player.current) return;
      syncing.current = true;
        player.current.seekTo(data.video.current, true);
        setTimeout(() => {
          syncing.current = false;
        }, 200);
    };

    const handleChangeVideo = (data) => {
      setytid(data.video.id);
      setTimeout(() => {
        if(!player.current) return;
        player.current.seekTo(data.video.current, true);
        if (data.video.play) {
          player.current.playVideo();
        } else {
          player.current.pauseVideo();
        }
      }, 600);
    }

    const syncVideo = (data) => {
      setytid(data.video.id);
      console.log("syncing video", data);
      setTimeout(() => {
        if(!player.current) return;
      player.current.seekTo(data.video.current, true);
      if(data.video.play) {
        player.current.playVideo();
      }else{
        player.current.pauseVideo();
      }
      }, 500);
      
    }

    socket.on("video_state_changed", handleVideoChange);
    socket.on("video_seeked", handleVideoSeeked);
    socket.on("video_changed", handleChangeVideo);
    socket.on("video_time_updated", videoTimeUpdate);
    socket.on("sync_video", syncVideo);

    return () => {
      socket.off("connect", join);
      socket.off("userupdate");
      socket.off("video_state_changed", handleVideoChange);
      socket.off("video_seeked", handleVideoSeeked);
      socket.off("video_changed", handleChangeVideo);
      socket.off("video_time_updated", videoTimeUpdate);
      socket.off("sync_video", syncVideo);
      clearInterval(interval)
    };
  }, [socket, roomId, username]);

  /* useEffect(() => {
    
     const 
    
  },[socket]); */

  const navside = () => {
    setside(!side);
  };
  const search = () => {
    try {
      const parsed = new URL(url);
      let id = "";
      if (parsed.hostname === "youtu.be") {
        id = parsed.pathname.slice(1);
      } else {
        id = parsed.searchParams.get("v");
      }

      socket.emit("change_video", {
        video_id: id,
        room_id: roomId,
      });
    } catch {
      alert("please enter valid url");
    }
  };
  const onReady = (event) => {
    console.log("Player is ready");
    player.current = event.target;
  };
  const StateChange = (event) => {
    if (syncing.current) return;
    if (event.data !== 1 && event.data !== 2) return;
      socket.emit("video_state_change", {
        state: event.data,
        room_id: roomId,
        current_time: player.current.getCurrentTime(),
      });
    
  };
  return (
    <div className="flex overflow-hidden h-dvh w-full  items-center text-white text-1xl md:text-2xl">
      {/*  Users List */} {/* First div */}
      <Nav user={name} host={host} side={side} name={name} />
      {/* second div */}
      <div className="md:w-[80%] w-full flex  flex-col items-center md:justify-center justify-between self-baseline  md:p-3">
        {/* roomId */}

        <div className="border-b-gray-950 border-2 border-t-0 border-l-0 border-r-0 px-2 w-full flex items-center md:justify-center justify-between">
          <div
            className="text-2xl md:hidden bg-gray-950 h-5 p-4 w-5 rounded-[50%] flex items-center justify-center"
            onClick={navside}
          >
            ≡
          </div>
          <p className="text-[15px]">Room Id : {roomId}</p>
        </div>

        {/* youtube player */}
        <div className="flex justify-center  w-full h-60 aspect-video">
          <YouTube
            videoId={ytid}
            opts={{
              height: "100%",
              width: "100%",
            }}
            className="h-full w-full"
            onReady={onReady}
            onStateChange={StateChange}
          />
        </div>

        {/* url search */}
        <div className="text-[15px] flex gap-1 justify-center items-center">
          <input
            type="text"
            placeholder="input url"
            className="border outline-0 border-gray-950 m-2 p-2 rounded-2xl pl-3"
            value={url}
            onChange={(e) => {
              seturl(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                search();
              }
            }}
          />
          <button
            className="bg-gray-950 h-10 p-2 cursor-pointer rounded-sm"
            onClick={search}
          >
            Play
          </button>
        </div>
        
       {/*  chat section */}

            <Chat username={username} socket={socket}/>
        

      </div>
    </div>
  );
}
