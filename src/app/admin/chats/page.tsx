"use client";
import React from "react";
import Sidebar from "../../../components/SideBar/Sidebar";
import { Message } from "../../../components/Message/Message";
import { useSession } from "next-auth/react";

function Page() {
  const { data: session } = useSession();
  const username = session?.user?.name;
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex">
        <Sidebar />
        <Message username={username} room={"roomId"} />
      </div>
    </div>
  );
}

export default Page;
