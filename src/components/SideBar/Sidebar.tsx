"use client";
import React, { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import ChatList from "./ChatList";
import { useAllUsers, useUser } from "../../store/userStore";
import { fetchUsers } from "../../lib/fetchers";
import { IoArrowBack } from "react-icons/io5";

import { stat } from "fs";
import { useRouter } from "next/navigation";

function Sidebar({ user }: { user: any }) {
  const { myUser, setUser } = useUser(
    (state) => ({ myUser: user, setUser: state.setUser }),
    shallow
  );
  const router = useRouter();
  useEffect(() => {
    fetchUsers(myUser, setUser);
  }, []);

  return (
    <div className="w-1/4 md:!block sidebar z-10 border-r-2 border-slate-400  p-1 bg-white h-screen">
      <button
        className="flex gap-2 ms-4 text-primaryColor"
        onClick={() => router.back()}
      >
        <IoArrowBack size={24} /> Back
      </button>
      {myUser && <ChatList mySelf={myUser} />}
    </div>
  );
}

export default Sidebar;
