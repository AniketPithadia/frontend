"use client";
import Image from "next/image";
import LiveAssist360Logo from "../assets/LiveAssist360Logo.svg";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";

function Navbar() {
  const { data: session } = useSession();
  const isAdmin = session?.details?.role === "ADMIN" ? true : false;
  const [username, setUsername] = useState("");

  function capitalizeName(name) {
    let nameParts = name.split(" ");
    for (let i = 0; i < nameParts.length; i++) {
      nameParts[i] =
        nameParts[i].charAt(0).toUpperCase() + nameParts[i].slice(1);
    }
    return nameParts.join(" ");
  }

  useEffect(() => {
    if (session?.user) {
      setUsername(capitalizeName(session.user.name));
    } else {
      setUsername("");
    }
  }, [session]);

  const handleSignOut = async () => {
    try {
      const userId = session.details?.userId; // Assuming user ID is accessible from session
  
      await fetch("http://localhost:8080/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }), // Send userId in the request body as JSON
      });  
    } catch (error) {
      console.error("Error updating user status:", error);
    }
    signOut(); // Sign out the user after updating status
  };
  

  return (
    <nav className="bg-slate shadow-xl bg-white">
      <div className="flex justify-between h-full w-full items-center p-4 ">
        <Link href="/">
          <Image
            src={LiveAssist360Logo}
            alt="LiveAssist360 Logo"
            width="300"
            height="auto"
            className="hover:cursor-pointer"
            priority={true}
          />
        </Link>
        <div>
          <ul className="text-primaryColor font-light flex gap-5">
            {/* Your navigation links */}
            {session && session.user && (
              <>
                <li className="hover:font-normal hover:cursor-pointer">
                  {username}
                </li>
                {isAdmin && (
                  <>
                    <Link
                      href="/admin"
                      className="hover:font-normal hover:cursor-pointer"
                    >
                      Admin Dashboard
                    </Link>
                    <Link
                      href="/admin/chats"
                      className="hover:font-normal hover:cursor-pointer"
                    >
                      Inbox
                    </Link>
                  </>
                )}
                <li
                  className="hover:font-normal hover:cursor-pointer"
                  onClick={handleSignOut}
                >
                  Sign Out
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
