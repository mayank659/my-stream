import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Room({ socket }) {
  const location = useLocation()
  const name = location.state?.username
  return (
    <div className="flex h-dvh w-full items-center text-white text-3xl flex-col justify-center">
      <p>Username :{name}</p>
      <p>Room Id :</p>
    </div>
  );
}
