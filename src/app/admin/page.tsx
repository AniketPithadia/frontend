"use client";

import { signIn, useSession } from "next-auth/react";
import AdminDashboard from "../../components/AdminDashboard";
import { FaKey } from "react-icons/fa";
const AdminPage = () => {
  const { data: session } = useSession();
  let isAdmin = session?.details?.role === "ADMIN" ? true : false;
  return (
    <div className="flex flex-wrap mx-auto justify-center items-center gap-5 pt-20">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Admin Portal</h1>
        {session && isAdmin ? (
          <AdminDashboard />
        ) : (
          <button
            className="mt-4 flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded"
            onClick={() => {
              signIn("keycloak");
            }}
          >
            <FaKey size={22} />
            Sign In To Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
