"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/SideBar/Sidebar";
import { Message } from "../../../components/Message/Message";
import { useSession } from "next-auth/react";
import AdminMessage from "../../../components/Message/AdminMessage";
function Page() {
  const { data: session } = useSession();
  const username = session?.user?.name;
  const userId = session?.details?.userId;
  const [sessionFetched, setSessionFetched] = useState(false);
  const [roomId, setRoomId] = useState(null);

  useEffect(() => {
    if (!sessionFetched && session) {
      setSessionFetched(true);
      fetchRoomId();
    }
  }, [session, sessionFetched]);

  const fetchRoomId = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/generateOrFetch");
      if (response.ok) {
        const data = await response.json();
        setRoomId(data.roomId);
        console.log("Room id", data.roomId);
      } else {
        console.error("Failed to fetch or create room ID");
      }
    } catch (error) {
      console.error("Error fetching or creating room ID:", error);
    }
  };

  return (
    <div className="h-full">
      <div className="flex">
        <Sidebar />
        <div className="w-2/3">
          <AdminMessage username={username} room={roomId} senderId={userId} />
        </div>
      </div>
    </div>
  );
}

export default Page;
