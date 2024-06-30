import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiEdit3, FiSettings, FiLogOut } from "react-icons/fi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Account = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No authorization token found");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "https://plucky-agent-424606-s3.et.r.appspot.com/api/v1/auth/me",
          config
        );
        const userData = response.data.data.user;

        setName(userData.full_name || "");
        setPhoneNumber(userData.phone_number || "");
        setEmail(userData.email || "");
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error("Failed to fetch profile data. Please try again.");
      }
    };

    fetchProfileData();
  }, []);

  const handleProfileClick = () => {
    setActiveSection("profile");
  };

  const handleSettingsClick = () => {
    setActiveSection("settings");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authorization token found");
      }

      const response = await axios.patch(
        "https://plucky-agent-424606-s3.et.r.appspot.com/api/v1/profile",
        {
          full_name: name,
          phone_number: phoneNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(
          `Failed to update profile data: ${response.status} ${response.statusText}`
        );
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Save profile error:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authorization token found");
      }

      const response = await axios.delete(
        "https://plucky-agent-424606-s3.et.r.appspot.com/api/v1/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Account deleted successfully!");
        closeModal();
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        throw new Error("Failed to delete account");
      }
    } catch (error) {
      console.error("Delete account error:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="p-10 shadow-md h-44">
        <h2 className="font-bold text-xl text-left md:ml-24 lg:ml-32 xl:ml-44">
          Account
        </h2>
        <div className="flex justify-center md:justify-start">
          <Link
            to={"/"}
            className="flex items-center bg-customBlue2 text-white px-4 py-3 rounded-xl w-full md:w-9/12 ml-0 md:ml-28 lg:ml-36 xl:ml-48 mt-8 hover:bg-customBlue1"
          >
            <FiArrowLeft size={24} className="mr-2" />
            Homepage
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center">
        <div className="flex flex-col items-center space-y-4 p-5 mt-6 w-full md:w-1/3 lg:items-center lg:w-1/4">
          <button
            onClick={handleProfileClick}
            className={`flex items-center space-x-2 py-2 text-left w-10/12 border-b border-gray-300 ${
              activeSection === "profile" ? "font-bold" : ""
            }`}
          >
            <FiEdit3 className="text-customBlue1" size={24} />
            <span>Edit Profile</span>
          </button>
          <button
            onClick={handleSettingsClick}
            className={`flex items-center space-x-2 py-2 text-left w-10/12 border-b border-gray-300 ${
              activeSection === "settings" ? "font-bold" : ""
            }`}
          >
            <FiSettings className="text-customBlue1" size={24} />
            <span>Account Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 py-2 text-left w-10/12 border-b border-gray-300"
          >
            <FiLogOut className="text-customBlue1" size={24} />
            <span>Sign Out</span>
          </button>
          <h3 className="text-gray-500">Version 1.1.0</h3>
        </div>

        {/* edit profile card */}
        {activeSection === "profile" && (
          <div className="p-6 pt-10 bg-white border border-gray-200 rounded-lg mt-12 shadow w-full md:w-1/2 xl:w-1/3 md:ml-2">
            <h2 className="font-bold text-xl mb-4">Edit Profile Data</h2>
            <form className="flex flex-col" onSubmit={handleSave}>
              <p className="bg-customBlue2 text-white w-full h-10 rounded-t-lg p-2 mb-3">
                Personal Data
              </p>
              <div>
                <label
                  htmlFor="name"
                  className="block font-bold text-customBlue1 ml-5"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="border-b w-11/12 ml-5 rounded-md mb-2"
                />
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block font-bold text-customBlue1 ml-5"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                  className="border-b w-11/12 ml-5 rounded-md mb-2"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-bold text-customBlue1 ml-5"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Email"
                  disabled
                  className="border-b w-11/12 ml-5 focus:outline-none rounded-md mb-4"
                />
              </div>
              <button
                type="submit"
                className="bg-customBlue2 text-white px-10 py-3 rounded-xl self-center hover:bg-customBlue1"
              >
                Save
              </button>
            </form>
          </div>
        )}

        {/* Account Settings Card */}
        {activeSection === "settings" && (
          <div className="p-6 pt-10 bg-white border border-gray-200 rounded-lg mt-12 shadow w-full md:w-1/2 lg:w-1/3 md:ml-6">
            <h2 className="font-bold text-xl mb-4">Delete Account</h2>
            <p className="text-gray-600 mb-4">
              This action cannot be undone. Please continue with caution
            </p>

            <button
              onClick={openModal}
              className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="colored"
        toastStyle={{
          width: "auto",
          textAlign: "center",
        }}
      />

      {/* Delete Account Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white px-6 py-10 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">Confirm Delete Account</h2>
            <p className="text-gray-600 text-left mb-6">
              Are you sure you want to delete your account? <br /> This action
              can not be cancelled.
            </p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="text-gray-500 mr-4 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
