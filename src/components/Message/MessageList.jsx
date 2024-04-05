"use client";
import React, { useEffect, useRef } from "react";
import "./Message.css";
import { MessageItem } from "./MessageItem";

export const MessageList = ({ messageList, username }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messageList]);

  return (
    <div className="message_list mb-2">
      {messageList.map((x, idx) => (
        <MessageItem key={idx} message={x} username={username} />
      ))}
      <div ref={messagesEndRef} className="mb-20" />
    </div>
  );
};
