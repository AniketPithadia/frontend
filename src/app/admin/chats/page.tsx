"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/SideBar/Sidebar";
import { Message } from "../../../components/Message/Message";
import { useSession } from "next-auth/react";
import { useSelectedUser } from "../../../store/userStore";
function Page() {
  const session = useSession();
  const currentUser = session?.data?.user;
  const selectedUser = useSelectedUser((state) => state.selectedUser);
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex">
        <Sidebar user={currentUser} />
        <Message
          username={session?.data?.user?.name}
          room={selectedUser?.roomId}
          senderId={session?.data?.details?.userId}
        />
      </div>
    </div>
  );
}

export default Page;
