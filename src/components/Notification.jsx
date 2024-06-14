import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { IoNotificationsCircleSharp } from "react-icons/io5";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);
  const [notificationClicked, setNotificationClicked] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(
      "https://plucky-agent-424606-s3.et.r.appspot.com/api/v1/notification",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setNotifications(data.data.notification);

        if (data.data.notification.length > 0) {
          const fetchedUserId = data.data.notification[0].user_id;
          setUserId(fetchedUserId);

          const storedClickedStatus = JSON.parse(
            localStorage.getItem(`notificationClicked_${fetchedUserId}`)
          );
          if (storedClickedStatus) {
            setNotificationClicked(storedClickedStatus);
          }
        }
      })
      .catch((error) => console.error("Error fetching notifications:", error));
  }, []);

  useEffect(() => {
    if (userId !== null) {
      localStorage.setItem(
        `notificationClicked_${userId}`,
        JSON.stringify(notificationClicked)
      );
    }
  }, [notificationClicked, userId]);

  const handleClick = (index, notificationId) => {
    const updatedClickedStatus = [...notificationClicked];
    updatedClickedStatus[index] = true;
    setNotificationClicked(updatedClickedStatus);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${day} ${monthNames[monthIndex]}, ${hour}:${
      minute < 10 ? "0" : ""
    }${minute}`;
  };

  return (
    <>
      <div className="p-10 shadow-md h-44 mx-auto mb-10">
        <h2 className="font-bold text-xl text-left md:ml-16 lg:ml-16 xl:ml-40">
          Notifikasi
        </h2>
        <div className="flex justify-center md:justify-start">
          <Link
            to={"/"}
            className="flex items-center bg-customBlue2 text-white px-4 py-3 rounded-xl w-full mt-8 ml-4 md:w-8/12 md:ml-20 lg:ml-20 xl:ml-44 hover:bg-customBlue1"
          >
            <FiArrowLeft size={24} className="mr-2" />
            Beranda
          </Link>
          <button
            className="flex items-center outline outline-customBlue2 px-4 py-1 rounded-full ml-6 mt-10"
            style={{ height: "fit-content" }}
          >
            <BiFilterAlt className="text-gray-400" size={24} />
            <span className="ml-2">Filter</span>
          </button>
          <AiOutlineSearch
            className="flex items-center mt-10 ml-4 text-customBlue2 shrink-0"
            size={32}
          />
        </div>
      </div>

      {notifications.map((notification, index) => (
        <div key={index}>
          <div
            className="flex justify-between mt-2 mb-2 mx-auto w-10/12 md:w-8/12 pb-4 rounded-sm hover:bg-gray-50"
            onClick={() => handleClick(index, notification.id)}
            style={{ cursor: "pointer" }}
          >
            <div className="flex">
              <IoNotificationsCircleSharp
                className="text-customBlue2/50 mr-3 shrink-0 mt-1"
                size={32}
              />
              <div>
                <p className="text-gray-400">
                  {notification.notification_type}
                </p>
                <p className="text-lg">{notification.notification_title}</p>
                <p className="text-gray-400">
                  {notification.notification_description}
                </p>
              </div>
            </div>
            <div className="flex shrink-0">
              <p>{formatDate(notification.created_at)}</p>
              {notificationClicked[index] ? (
                <div className="w-4 h-4 bg-green-500 rounded-full ml-2 mt-1"></div>
              ) : (
                <div className="w-4 h-4 bg-red-500 rounded-full ml-2 mt-1"></div>
              )}
            </div>
          </div>
          {index !== notifications.length - 1 && (
            <hr className="w-10/12 md:w-8/12 mx-auto border-t border-gray-300" />
          )}
        </div>
      ))}
    </>
  );
};

export default Notification;
