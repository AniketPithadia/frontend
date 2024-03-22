"use client";
import React, { useEffect } from "react";
import { shallow } from "zustand/shallow";
// import SearchBar from "./SearchBar";
import ChatList from "./ChatList";
import { useUser } from "../../store/userStore";

import { fetchUsers } from "../../lib/fetchers";

function Sidebar() {
  const { myUser, setUser } = useUser(
    (state) => ({ myUser: state.myUser, setUser: state.setUser }),
    shallow
  );
  useEffect(() => {
    fetchUsers(myUser, setUser);
  }, []);
  return (
    <div className="w-full md:!block sidebar z-10 border-r-2 border-slate-400  md:w-1/2 lg:w-1/3 p-3 bg-white h-screen">
      {/* SEARCHBAR */}
      {/* <SearchBar user={myUser} /> */}
      {/* CHATLIST */}
      {myUser && <ChatList mySelf={myUser} />}
    </div>
  );
}

export default Sidebar;
