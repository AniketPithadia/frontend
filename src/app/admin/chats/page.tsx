"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/SideBar/Sidebar";
import { Message } from "../../../components/Message/Message";
import { useSession } from "next-auth/react";

function Page() {  
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex">
        <Sidebar />        
      </div>
    </div>
  );
}

export default Page;