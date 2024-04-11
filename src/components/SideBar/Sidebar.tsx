"use client";
import React, { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import ChatList from "./ChatList";
import { useAllUsers, useUser } from "../../store/userStore";
import { fetchUsers } from "../../lib/fetchers";
<<<<<<< HEAD
import { IoArrowBack } from "react-icons/io5";

import { stat } from "fs";
import { useRouter } from "next/navigation";

=======
import { stat } from "fs";

>>>>>>> 1a7a0e6678aa663a2fa1aaf298ff7ee2d7198bbf
function Sidebar({ user }: { user: any }) {
  const { myUser, setUser } = useUser(
    (state) => ({ myUser: user, setUser: state.setUser }),
    shallow
  );
<<<<<<< HEAD
  const router = useRouter();
=======
>>>>>>> 1a7a0e6678aa663a2fa1aaf298ff7ee2d7198bbf
  useEffect(() => {
    fetchUsers(myUser, setUser);
  }, []);

  return (
<<<<<<< HEAD
    <div className="w-1/4 md:!block sidebar z-10 border-r-2 border-slate-400  p-1 bg-white h-screen">
      <button
        className="flex gap-2 ms-4 text-primaryColor"
        onClick={() => router.back()}
      >
        <IoArrowBack size={24} /> Back
      </button>
=======
    <div className="w-1/4 md:!block sidebar z-10 border-r-2 border-slate-400  p-3 bg-white h-screen">
>>>>>>> 1a7a0e6678aa663a2fa1aaf298ff7ee2d7198bbf
      {myUser && <ChatList mySelf={myUser} />}
    </div>
  );
}

export default Sidebar;
