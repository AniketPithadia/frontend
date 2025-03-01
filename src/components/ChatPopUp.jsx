import { signIn, useSession } from "next-auth/react";
<<<<<<< HEAD

import { FcGoogle } from "react-icons/fc";
import { PiSignOutBold } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";

import { Message } from "./Message/Message";
import BlockUser from "./BlockUser";
import { FaKey } from "react-icons/fa";
=======
import { FaKey } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RiSendPlaneLine } from "react-icons/ri";
import { Message } from "./Message/Message";
import BlockUser from "./BlockUser";
>>>>>>> 1a7a0e6678aa663a2fa1aaf298ff7ee2d7198bbf
function ChatPopUp(props) {
  const { data: session } = useSession();

  return (
    <div id="chat-container" className="fixed right-5 bottom-5 w-80">
      <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
        <div className="p-4 border-b bg-blue-900 text-white rounded-t-lg flex justify-between items-center">
<<<<<<< HEAD
          <p className="text-md font-semibold">
            {session && session.user ? session.user.name : "LiveAssist360"}
          </p>

          <button
            id="close-chat"
            className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400 hover:"
          >
            {session?.user ? (
              <PiSignOutBold
                onClick={props.handleSignOut}
                size={24}
                className="text-white"
              />
            ) : (
              <IoMdClose
                onClick={props.toggleDisplay}
                size={24}
                className="text-white"
              />
            )}
=======
          <p className="text-lg font-semibold">
            {session && session.user ? session.user.name : "LiveAssist360"}
          </p>
          <button
            id="close-chat"
            className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
            onClick={props.toggleDisplay}
          >
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
>>>>>>> 1a7a0e6678aa663a2fa1aaf298ff7ee2d7198bbf
          </button>
        </div>
        <div id="chatbox" className="pt-2 overflow-y-auto">
          {session && session.user ? (
            <BlockUser>
              <Message
                room={session?.details.roomId}
                username={session.user.name}
                senderId={session?.details.userId}
              />
            </BlockUser>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <div
                type="button"
                className="pt-1"
                onClick={() => {
                  signIn("google");
                }}
              >
                <button className="bg-white text-primaryColor bg-opacity-50 flex gap-3 py-3 px-6 text-lg justify-center items-center rounded-full border border-1 shadow-md hover:cursor-pointer focus:outline-none">
<<<<<<< HEAD
                  <FaKey size={24} />
                  <span>Login via SSO</span>
=======
                  <FcGoogle size={24} />
                  <span>Sign In With Google</span>
>>>>>>> 1a7a0e6678aa663a2fa1aaf298ff7ee2d7198bbf
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
