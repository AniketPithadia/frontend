"use client";
import React, { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import ChatList from "./ChatList";
import { useAllUsers, useUser } from "../../store/userStore";
import { fetchUsers } from "../../lib/fetchers";
import { stat } from "fs";

function Sidebar({ user }: { user: any }) {
  const { myUser, setUser } = useUser(
    (state) => ({ myUser: user, setUser: state.setUser }),
    shallow
  );
  useEffect(() => {
    fetchUsers(myUser, setUser);
  }, []);

  return (
    <div className="w-1/4 md:!block sidebar z-10 border-r-2 border-slate-400  p-3 bg-white h-screen">
      {myUser && <ChatList mySelf={myUser} />}
    </div>
  );
}

export default Sidebar;
