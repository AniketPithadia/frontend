"use client";
import { fetchUsers } from "../../lib/fetchers";
import { useAllUsers } from "../../store/userStore";
import { userProps } from "../../lib/types";
import React, { useEffect } from "react";
import { shallow } from "zustand/shallow";
import ChatItem from "./ChatItem";
// import {io} from "socket.io-client"

function ChatList({ mySelf }: { mySelf: userProps }) {
  const { users, setUsers } = useAllUsers(
    (state: any) => ({ users: state.users, setUsers: state.setUsers }),
    shallow
  );

  useEffect(() => {
    fetchUsers(mySelf, setUsers);
  }, []);

  const sortedUsers = users?.sort((a, b) => {
    if (a.connectionStatus === "ONLINE" && b.connectionStatus !== "ONLINE") {
      return -1; // a comes first if a is online and b is not
<<<<<<< HEAD
    } else if (
      a.connectionStatus !== "ONLINE" &&
      b.connectionStatus === "ONLINE"
    ) {
=======
    } else if (a.connectionStatus !== "ONLINE" && b.connectionStatus === "ONLINE") {
>>>>>>> 1a7a0e6678aa663a2fa1aaf298ff7ee2d7198bbf
      return 1; // b comes first if b is online and a is not
    } else {
      return 0; // maintain existing order for other cases
    }
  });

  return (
<<<<<<< HEAD
    <ul className="my-2 flex flex-col ">
      {sortedUsers ? (
        sortedUsers.map((user, key) => (
          <ChatItem key={user.userId} user={user} />
=======
    <ul className="my-5 flex flex-col">
      {sortedUsers ? (
        sortedUsers.map((user, key) => (
          <ChatItem key={user.userId} user={user}/>
>>>>>>> 1a7a0e6678aa663a2fa1aaf298ff7ee2d7198bbf
        ))
      ) : (
        <span className="loading loading-ring w-16"></span>
      )}
    </ul>
  );
}

export default ChatList;
