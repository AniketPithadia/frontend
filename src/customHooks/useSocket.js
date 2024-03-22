import { useCallback, useEffect, useState } from "react";
import * as io from "socket.io-client";
import { SOCKET_BASE_URL } from "../constants/apiConstants";
import { useSession } from "next-auth/react";

export const useSocket = (room, username) => {
  const [socket, setSocket] = useState();
  const [socketResponse, setSocketResponse] = useState({
    room: "",
    content: "",
    username: "",
    messageType: "",
    createdDateTime: "",
  });
  const [isConnected, setConnected] = useState(false);

  const { data: session } = useSession();
  const fetchedUsername = session?.user?.name;

  const sendData = useCallback(
    (payload) => {
      if (!socket) return;
      socket.emit("send_message", {
        room: room,
        content: payload.content,
        username: fetchedUsername,
        messageType: "CLIENT",
      });
    },
    [socket, room, fetchedUsername]
  );

  useEffect(() => {
    console.log("inside socket", room, fetchedUsername);

    const s = io(SOCKET_BASE_URL, {
      reconnection: false,
      query: `username=${fetchedUsername}&room=${room}`,
    });
    setSocket(s);
    s.on("connect", () => setConnected(true));
    s.on("read_message", (res) => {
      console.log(res);
      setSocketResponse({
        room: res.room,
        content: res.content,
        username: res.username,
        messageType: res.messageType,
        createdDateTime: res.createdDateTime,
      });
    });
    return () => {
      s.disconnect();
    };
  }, [room, fetchedUsername]);

  return { socketResponse, isConnected, sendData };
};
