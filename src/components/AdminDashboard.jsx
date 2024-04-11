import { useEffect, useState } from "react";
import { getData, changeStatus, userStatus } from "../graphql/fetcher";
import defaultUser from "../assets/defaultUser.svg";
import Image from "next/image";
import { CgUnblock } from "react-icons/cg";
import { CgBlock } from "react-icons/cg";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getData();
      setUsers(data.getAllUsers);
    };
    fetchUsers();
  }, []);

  const changeStatusOfUser = async (userId, currentStatus) => {
    try {
      const newStatus =
        currentStatus === "ACTIVE" ? userStatus.INACTIVE : userStatus.ACTIVE;
      const response = await changeStatus(userId, newStatus);
      if (response) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.userId === response.changeAcStatusById.userId
              ? {
                  ...user,
                  userStatus: newStatus,
                }
              : user
          )
        );
      }
    } catch (error) {
      console.error("Error changing user status:", error);
    }
  };

  const getStatusLabel = (userStatus) => {
    return userStatus === "ACTIVE" ? "Active" : "Inactive";
  };

  return (
    <div className="flex flex-wrap mx-auto justify-center items-center gap-5 pt-20">
      {users &&
        users.map((user, key) => (
          <div
            key={key}
            className="flex flex-col items-center justify-self-start min-w-[200px] bg-white rounded-xl shadow-md overflow-hidden p-3 gap-5"
          >
            {user.profilePicture ? (
              <div>
                <Image
                  alt="user image"
                  priority={true}
                  src={user.profilePicture}
                  width={100}
                  height={100}
                  className="object-contain rounded-full"
                />
              </div>
            ) : (
              <div>
                <Image
                  alt="user image"
                  priority={true}
                  src={defaultUser}
                  width={100}
                  height={100}
                  className="object-contain rounded-full"
                />
              </div>
            )}
            <div className="">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {user.username}
                {user.userId}
              </div>
              <div
                className={`${
                  user.userStatus === "ACTIVE"
                    ? "flex justify-center text-green-500 mt-1"
                    : "flex justify-center text-red-500 mt-1"
                }`}
              >
                {getStatusLabel(user.userStatus)}
              </div>
            </div>

            <div>
              <button
                onClick={() => changeStatusOfUser(user.userId, user.userStatus)}
                className={`${
                  user.userStatus === "ACTIVE"
                    ? "flex items-center gap-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                    : "flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                }`}
              >
                <i>
                  {user.userStatus === "ACTIVE" ? (
                    <CgBlock size={20} />
                  ) : (
                    <CgUnblock size={20} />
                  )}
                </i>
                {user.userStatus === "ACTIVE" ? "Block User" : "Unblock User"}
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AdminDashboard;
