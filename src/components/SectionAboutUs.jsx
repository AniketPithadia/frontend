"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AboutUsImg from "../assets/hero.png";
import { Merriweather } from "next/font/google";
import { FaAngleDoubleDown, FaComments } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { FaKey } from "react-icons/fa";
import Link from "next/link";
import ChatWidget from "./ChatWidget";

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
      <div className=" grid grid-cols-1 sm:grid-cols-2 bg-gradient-to-r from-blue-400 to-indigo-500 ">
        <div className="grid py-20 md:p-20 md:py-24 lg:p-36 justify-center ">
          <div className="flex flex-col md:items-start justify-center items-center gap-14 align-top">
            <p
              className={
                "text-3xl  sm:text-4xl md:text-6xl align-middle text-center sm:text-left text-white ${merriweather.className}"
              }
            >
              Buy and Sell AutoMobiles At
              <span className="inline-block  border-2 px-1 m-2 ms-0  bg-white text-primaryColor rounded-lg border-white">
                Best Price
              </span>
            </p>
            <button className="flex items-center justify-center w-[70%] md:w-[75%] gap-2 bg-white text-primaryColor  text-md lg:text-lg font-bold py-3 px-5 md:py-4 md:px-6 rounded-full">
              <FaAngleDoubleDown size={20} />
              Check Out Vehicles
            </button>
          </div>
        </div>

        <div className="grid  justify-center items-center">
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

export default SectionAboutUs;
