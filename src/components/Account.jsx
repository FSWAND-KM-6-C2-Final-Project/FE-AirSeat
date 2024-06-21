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

      const response = await fetch(
        "https://plucky-agent-424606-s3.et.r.appspot.com/api/v1/profile",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            full_name: name,
            phone_number: phoneNumber,
            email,
          }),
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(
          responseData.message ||
            `Failed to update profile data: ${response.status} ${response.statusText}`
        );
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Save profile error:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <div className="p-10 shadow-md h-44">
        <h2 className="font-bold text-xl text-left md:ml-24 lg:ml-32 xl:ml-44">
          Akun
        </h2>
        <div className="flex justify-center md:justify-start">
          <Link
            to={"/"}
            className="flex items-center bg-customBlue2 text-white px-4 py-3 rounded-xl w-full md:w-9/12 ml-2 md:ml-28 lg:ml-36 xl:ml-48 mt-8 hover:bg-customBlue1"
          >
            <FiArrowLeft size={24} className="mr-2" />
            Beranda
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center">
        <div className="flex flex-col items-center space-y-4 p-5 mt-6 w-full md:w-1/3 lg:items-center lg:w-1/4">
          <button
            onClick={handleProfileClick}
            className="flex items-center space-x-2 py-2 text-left w-10/12 border-b border-gray-300"
          >
            <FiEdit3 className="text-customBlue1" size={24} />
            <span>Edit Profile</span>
          </button>
          <button
            onClick={handleSettingsClick}
            className="flex items-center space-x-2 py-2 text-left w-10/12 border-b border-gray-300"
          >
            <FiSettings className="text-customBlue1" size={24} />
            <span>Account Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 py-2 text-left w-10/12 border-b border-gray-300"
          >
            <FiLogOut className="text-customBlue1" size={24} />
            <span>Keluar</span>
          </button>
          <h3 className="text-gray-500">Version 1.1.0</h3>
        </div>

        {/* edit profile card */}
        {activeSection === "profile" && (
          <div className="p-6 pt-10 bg-white border border-gray-200 rounded-lg mt-12 shadow w-full md:w-1/2 xl:w-1/3 md:ml-2">
            <h2 className="font-bold text-xl mb-4">Ubah Data Profil</h2>
            <form className="flex flex-col" onSubmit={handleSave}>
              <p className="bg-customBlue2 text-white w-full h-10 rounded-t-lg p-2 mb-3">
                Data Diri
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
                  className="border-b w-11/12 ml-5 focus:outline-none rounded-md mb-2"
                />
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block font-bold text-customBlue1 ml-5"
                >
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                  className="border-b w-11/12 ml-5 focus:outline-none rounded-md mb-2"
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
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="border-b w-11/12 ml-5 focus:outline-none rounded-md mb-4"
                />
              </div>
              <button
                type="submit"
                className="bg-customBlue2 text-white px-10 py-3 rounded-xl self-center hover:bg-customBlue1"
              >
                Simpan
              </button>
            </form>
          </div>
        )}

        {/* account setting card */}
        {activeSection === "settings" && (
          <div className="p-6 pt-10 bg-white border border-gray-200 rounded-lg mt-12 shadow w-full  md:w-1/2 lg:w-1/3 md:ml-6">
            <h2 className="font-bold text-xl mb-4">Pengaturan Akun</h2>
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
    </>
  );
};

export default Account;
