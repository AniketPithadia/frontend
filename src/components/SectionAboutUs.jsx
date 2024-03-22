"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AboutUsImg from "../assets/aboutusimg.svg";
import { Merriweather } from "next/font/google";
import { FaComments } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { FaKey } from "react-icons/fa";
import Link from "next/link";

const merriweather = Merriweather({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

function SectionAboutUs() {
  const { data: session } = useSession();
  const [userDataSent, setUserDataSent] = useState(false);
  const [loading, setLoading] = useState(false);
  let isAdmin = session?.details?.role === "ADMIN" ? true : false;
  console.log("isAdmin: ", isAdmin);
  useEffect(() => {
    if (session && session.user && !userDataSent && !loading) {
      // console.log("session token: ", session);
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
      <div className=" grid grid-cols-1 sm:grid-cols-2 bg-gradient-to-r from-bgAquaColor to-bgPurpleColor ">
        <div className="grid grid-rows-4 pl-4 pr-4 sm:pl-5 sm:pr-5 md:pl-10 md:pr-10">
          <div className="h-auto"></div>
          <div className="flex align-top">
            <p
              className={
                "text-3xl sm:text-5xl md:text-6xl align-middle text-white ${merriweather.className}"
              }
            >
              Seamless Chat Support
            </p>
          </div>
          <div className="flex items-center gap-4 ">
            {session && session.user ? (
              <>
                {isAdmin ? (
                  <Link href="/admin">
                    <button className="bg-white z-100 flex items-center gap-3  text-primaryColor font-bold  text-2xl px-12 py-6 rounded-full max-w-max">
                      Admin Dashboard
                    </button>
                  </Link>
                ) : (
                  <button className="bg-white z-100 flex items-center gap-3  text-primaryColor font-bold  text-2xl px-12 py-6 rounded-full max-w-max">
                    <FaComments size={30} />
                    Chat with our Specialist
                  </button>
                )}
              </>
            ) : (
              <div className="flex justify-center flex-col :flex-row gap-2">
                <div
                  type="button"
                  className="pt-1"
                  onClick={() => {
                    signIn("google");
                  }}
                >
                  <div className=" bg-white text-primaryColor bg-opacity-50 flex gap-5 pt-3 pb-3 pl-10 pr-10 text-xl justify-center items-center rounded-full hover:cursor-pointer">
                    <FcGoogle size={22} />
                    Sign In With Google
                  </div>
                </div>

                <div
                  type="button"
                  className="pt-1"
                  onClick={() => {
                    signIn("keycloak");
                  }}
                >
                  <div className=" bg-white text-primaryColor bg-opacity-50 flex gap-5 pt-3 pb-3 px-10 text-xl justify-center items-center rounded-full hover:cursor-pointer">
                    <FaKey size={22} />
                    Sign In With KeyCloak
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="h-auto"></div>
        </div>

        <div className="flex justify-end">
          <Image
            alt="about us graphic"
            priority={true}
            src={AboutUsImg}
            className="hidden sm:block col-start-2 col-end-3 h-full w-auto"
          />
        </div>
      </div>
    </section>
  );
}

export default SectionAboutUs;
