import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { FaKey } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RiSendPlaneLine } from "react-icons/ri";
import { Message } from "./Message/Message";

function ChatPopUp(props) {
  const { data: session } = useSession();
  
  return (
    <div id="chat-container" className="fixed bottom-5 w-80">
      <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
        <div className="p-4 border-b bg-blue-400 text-white rounded-t-lg flex justify-between items-center">
          <p className="text-lg font-semibold">
            {session && session.user ? session.user.name : "LiveAssist360"}
          </p>
         <button
            id="close-chat"
            className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
            onClick={props.toggleDisplay}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div id="chatbox" className="p-4 h-80 overflow-y-auto">
          {session && session.user ? (
            <Message room={session?.details.roomId} username={session.user.name} senderId={session?.details.userId}/>
          ) : (
            <div className="flex flex-col md:flex-row gap-2">
              <div
                type="button"
                className="pt-1"
                onClick={() => {
                  signIn("google");
                }}
              >
                <button className="bg-white text-primaryColor bg-opacity-50 flex gap-3 py-3 px-6 text-lg justify-center items-center rounded-full hover:cursor-pointer focus:outline-none">
                  <FcGoogle size={24} />
                  <span>Sign In With Google</span>
                </button>
              </div>
              <div
                type="button"
                className="pt-1"
                onClick={() => {
                  signIn("keycloak");
                }}
              >
                <button className="bg-white text-primaryColor bg-opacity-50 flex gap-3 py-3 px-6 text-lg justify-center items-center rounded-full hover:cursor-pointer focus:outline-none">
                  <FaKey size={24} />
                  <span>Sign In With Email</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPopUp;
