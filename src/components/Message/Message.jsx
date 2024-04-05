"use client";
import React, { useEffect, useState } from "react";
import { useSocket } from "../../customHooks/useSocket";
import { RiSendPlaneLine, RiSendPlaneFill } from "react-icons/ri";
import "./Message.css";
import { useSession } from "next-auth/react";
import { MessageList } from "./MessageList";
import { timeStampConverter } from "../../lib/timeUtils";
import { useFetch } from "../../customHooks/useFetch";
import { triggerSocket } from "../../store/userStore";

export const Message = ({ room, username, senderId }) => {
  const { data: session } = useSession();
  const { isConnected, socketResponse, sendData } = useSocket(
    room,
    username,
    senderId
  );
  const [messageInput, setMessageInput] = useState("");
  const [messageList, setMessageList] = useState([]);

  const { responseData, error, loading } = useFetch("/message/" + room);

  const addMessageToList = (val) => {
    if (val.room == "") return;
    setMessageList([...messageList, val]);
  };

  useEffect(() => {
    if (responseData != undefined) {
      setMessageList([...responseData, ...messageList]);
    }
  }, [responseData]);

  useEffect(() => {
    console.log("Socket Response: ", socketResponse);
    addMessageToList(socketResponse);
  }, [socketResponse]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (messageInput != "") {
      sendData({
        content: messageInput,
      });
      const time = ""; //timeStampConverter(Math.floor(Date.now() / 1000));
      addMessageToList({
        content: messageInput,
        username: username,
        createdDateTime: new Date(),
        messageType: "CLIENT",
        senderId: senderId,
      });
      setMessageInput("");
    }
  };

  return (
    <div className=" w-3/4 message_root_div">
      {/* <span className="room_name">Room: {room} </span> */}
      {session?.details?.role === "ADMIN" ? (
        <span className="user_name">Welcome: {room} </span>
      ) : (
        ""
      )}
      <div className="message_component">
        <MessageList username={username} messageList={messageList} />
        <form
          className="chat-input rounded-none"
          onSubmit={(e) => sendMessage(e)}
        >
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message"
          />
          <button type="submit" className="hidden">
            {messageInput == "" ? (
              <RiSendPlaneLine size={25} />
            ) : (
              <RiSendPlaneFill color="#2671ff" size={25} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
