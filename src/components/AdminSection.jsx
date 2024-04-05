"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AboutUsImg from "../assets/aboutusimg.svg";
import { Merriweather } from "next/font/google";
import { signIn, useSession } from "next-auth/react";
import { FaKey } from "react-icons/fa";
import Link from "next/link";

const merriweather = Merriweather({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

function AdminSection() {
  const { data: session } = useSession();
  const [userDataSent, setUserDataSent] = useState(false);
  const [loading, setLoading] = useState(false);
  let isAdmin = session?.details?.role === "ADMIN" ? true : false;
  console.log("isAdmin: ", isAdmin);
  useEffect(() => {
    if (session && session.user && !userDataSent && !loading) {
      sendUserDataToBackend(session.user);
    }
  }, [session, userDataSent, loading]);

  const sendUserDataToBackend = async (user) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.name,
          email: user.email,
          profilePicture: user.image,
          providerId: user.providerId,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Data is going to backend", responseData);

        setUserDataSent(true);
      } else {
        console.error("Failed to send user data to backend");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <section id="aboutus h-screen">
      <div className=" grid grid-cols-1 sm:grid-cols-2 bg-gradient-to-r from-cyan-600 to-bgPurpleColor ">
        <div className="grid grid-rows-4 pl-4 pr-4 sm:pl-5 sm:pr-5 md:pl-10 md:pr-10">
          <div className="h-auto"></div>
          <div className="flex align-bottom md:ps-20">
            <p
              className={
                "text-3xl md:text-5xl align-middle text-white ${merriweather.className}"
              }
            >
              {!isAdmin ? "Admin Login" : "Welcome Admin"}
            </p>
          </div>
          <div className="flex items-center md:ps-20">
            <div>
              {!isAdmin ? (
                <button
                  className="flex items-center gap-2 bg-blue-800 text-white  text-lg md:text-xl font-bold py-5 px-8 rounded-full"
                  onClick={() => {
                    signIn("keycloak");
                  }}
                >
                  <FaKey size={22} />
                  Sign In To Continue
                </button>
              ) : (
                <Link
                  href={"/admin/dashboard"}
                  className="flex items-center gap-2 bg-blue-800 text-white  text-lg lg:text-xl font-bold py-5 px-8 rounded-full"
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="h-auto"></div>
        </div>

        <div className="grid justify-end">
          <Image
            alt="about us graphic"
            loading="eager"
            priority={true}
            src={AboutUsImg}
            className="hidden sm:block object-cover sm:transition-opacity sm:opacity-0 sm:duration-[0.5s] "
            onLoadingComplete={(image) =>
              image.classList.remove("sm:opacity-0")
            }
          />
        </div>
      </div>
    </section>
  );
}

export default AdminSection;
