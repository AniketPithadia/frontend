"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSelectedUser } from "../../store/userStore";
import { useSession } from "next-auth/react";
import { Message } from "../Message/Message";
import { useSocket } from "../../customHooks/useSocket";
import { userProps } from "../../lib/types";

function ChatItem({ user }: { user: userProps }) {
  const { data: session } = useSession();
  const username = session?.user?.name;
  const userId = session?.details?.userId;
  const [showMessage, setShowMessage] = useState(false);
  const setSelectedUser = useSelectedUser((state) => state.setSelectedUser);
  
  // Initiate socket connection
  const { sendData } = useSocket();
  
  function handleClick() {
    setSelectedUser(user);
    sendData({ roomId: user.roomId, username, userId });
    setShowMessage(true);
  }

  return (
    <>
      <li
        onClick={handleClick}
        className="flex gap-3 cursor-pointer hover:bg-slate-300 p-5 rounded-lg"
      >
        <div className="avatar">
          <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <Image
              src={user?.profilePicture || ""}
              width={256}
              height={256}
              className="rounded-full"
              alt="avatar"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <h3 className="font-semibold text-black text-lg">{user?.username}</h3>
          <p className="text-[#707991]">{user?.connectionStatus}</p>
        </div>
      </li>
      <div className="divider my-0"></div>
      {showMessage && <Message username={username} room={user.roomId} senderId={userId} />}
    </>
  );
}

export default ChatItem;
