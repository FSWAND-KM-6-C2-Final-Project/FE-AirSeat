import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { IoNotificationsCircleSharp } from "react-icons/io5";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 10;
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsFetching(true);
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `https://plucky-agent-424606-s3.et.r.appspot.com/api/v1/notification?limit=${notificationsPerPage}&page=${currentPage}&searchType=${selectedCategory}&searchTitle=${searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data = await response.json();
        setNotifications(data.data.notification);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
      setIsFetching(false);
    };
    fetchNotifications();
  }, [currentPage, searchQuery, selectedCategory]);

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

  const filteredNotifications = notifications.filter((notification) => {
    return (
      (selectedCategory === "" ||
        notification.notification_type.toLowerCase() ===
          selectedCategory.toLowerCase()) &&
      (searchQuery === "" ||
        notification.notification_title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        notification.notification_description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()))
    );
  });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setFilterDropdownVisible(false);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    setCurrentPage(1);
    setSearchQuery(e.target.value);
  };

  const handleDropdownVisible = () => {
    setSearchVisible(false);
    setFilterDropdownVisible(!filterDropdownVisible);
  };

  const handleSearchVisible = () => {
    setFilterDropdownVisible(false);
    setSearchVisible(!searchVisible);
  };

  return (
    <>
      <div className="p-10 shadow-md h-44 mx-auto mb-10">
        <h2
          className={`font-bold text-xl text-left ml-2 sm:ml-4 md:ml-12 lg:ml-16 xl:ml-32 2xl:ml-40 ${
            searchVisible
              ? "transform sm:translate-x-[-35px] md:translate-x-[-60px] lg:translate-x-[-80px] xl:translate-x-[-135px] transition-transform duration-300"
              : "transition-transform duration-300"
          }`}
        >
          Notification
        </h2>
        <div
          className={`flex justify-center md:justify-start ${
            searchVisible
              ? "transform sm:translate-x-[-65px] lg:translate-x-[-80px] xl:translate-x-[-125px] transition-transform duration-300"
              : "transition-transform duration-300"
          }`}
        >
          <Link
            to="/"
            className="flex items-center bg-customBlue2 text-white px-4 py-3 rounded-xl w-2/3 sm:w-1/2 mt-8 md:w-6/12 lg:w-8/12 md:ml-20 lg:ml-20 xl:ml-36 2xl:ml-44 hover:bg-customBlue1"
          >
            <FiArrowLeft size={24} className="mr-2" />
            Homepage
          </Link>
          <div className="relative inline-block text-left ml-6 mt-10">
            <button
              className="flex items-center outline outline-customBlue2 px-4 py-1 rounded-full"
              style={{ height: "fit-content" }}
              onClick={handleDropdownVisible}
            >
              <BiFilterAlt className="text-gray-500" size={24} />
              <span className="ml-2">Filter</span>
            </button>
            {filterDropdownVisible && (
              <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    onClick={() => handleCategoryChange("")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    All
                  </button>
                  <button
                    onClick={() => handleCategoryChange("notification")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Notification
                  </button>
                  <button
                    onClick={() => handleCategoryChange("promotion")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Promotion
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="relative ml-4 mt-10">
            <AiOutlineSearch
              className="flex items-center text-customBlue2 cursor-pointer"
              size={32}
              onClick={handleSearchVisible}
            />
            {searchVisible && (
              <>
                {window.innerWidth < 640 ? (
                  <div className="absolute mt-4 right-1 sm:top-0 sm:left-10 bg-white border border-customBlue2 rounded-md shadow-md p-2">
                    <div className="absolute top-[-5px] right-6 w-4 h-4 bg-white border-l border-t border-customBlue2 rotate-45 transform origin-bottom-right"></div>
                    <input
                      type="text"
                      className="w-60 px-4 py-1 mt-2 border-customBlue2 rounded-md"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e)}
                    />
                  </div>
                ) : (
                  <input
                    type="text"
                    className="absolute top-0 left-10 border border-customBlue2 rounded-md px-4 py-1 w-32 md:w-36 xl:w-44 2xl:w-60"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e)}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {filteredNotifications.map((notification, index) => (
        <div key={notification.id || index}>
          <div
            className="flex justify-between mt-2 mb-2 mx-auto w-10/12 md:w-8/12 pb-4 rounded-sm hover:bg-gray-50"
            style={{ cursor: "default" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
              <IoNotificationsCircleSharp
                className="text-customBlue2/50 mr-3 shrink-0 mt-1"
                size={32}
              />
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">
                  {notification.notification_type}
                </p>
                <p className="text-lg">{notification.notification_title}</p>
                <p className="text-gray-400 text-xs sm:text-sm">
                  {notification.notification_description}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-start sm:items-center">
              <p className="text-xs sm:text-sm">
                {formatDate(notification.created_at)}
              </p>
            </div>
          </div>
          {index !== filteredNotifications.length - 1 && (
            <hr className="w-10/12 md:w-8/12 mx-auto border-t border-gray-300" />
          )}
        </div>
      ))}
      <div className="w-full">
        <div className="flex justify-center mt-2 pb-4">
          <nav>
            <ul className="flex flex-wrap list-none justify-center">
              {[...Array(totalPages).keys()].map((number) => (
                <li key={number + 1} className="mx-1 mb-2">
                  <button
                    onClick={() => paginate(number + 1)}
                    className={`px-3 py-1 rounded-full ${
                      currentPage === number + 1
                        ? "bg-customBlue2 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                    style={{ minWidth: "30px" }}
                  >
                    {number + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Notification;
