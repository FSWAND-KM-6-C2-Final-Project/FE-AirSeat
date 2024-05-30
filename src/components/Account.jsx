import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiEdit3, FiSettings, FiLogOut } from "react-icons/fi";

const Account = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleProfileClick = () => {
    setActiveSection("profile");
  };

  const handleSettingsClick = () => {
    setActiveSection("settings");
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleSave = (event) => {
    event.preventDefault();
    localStorage.setItem("name", name);
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("email", email);
    setActiveSection("settings");
  };

  const handleEditProfile = () => {
    setActiveSection("profile");
  };

  return (
    <>
      <div className="p-10 shadow-md h-44">
        <h2 className="font-bold text-xl text-center md:text-left md:ml-24 lg:ml-32 xl:ml-44">
          Akun
        </h2>
        <div className="flex justify-center md:justify-start">
          <Link
            to={"/"}
            className="flex items-center bg-customBlue2 text-white px-4 py-3 rounded-xl w-full md:w-9/12 ml-2 md:ml-28 lg:ml-36 xl:ml-48 mt-8 hover:bg-customBlue1"
          >
            <FiArrowLeft size={24} className="mr-2" />
            Back to Homepage
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
            <span>Accouunt Settings</span>
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
            <form className="flex flex-col space-y-4" onSubmit={handleSave}>
              <div>
                <p className="bg-customBlue2 text-white w-full h-10 rounded-t-lg p-2 mb-3">
                  Data Diri
                </p>
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
                  placeholder="Harry"
                  className="border-b w-11/12 ml-5 focus:outline-none rounded-md"
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
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+62 897823232"
                  className="border-b w-11/12 ml-5 focus:outline-none rounded-md"
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
                  placeholder="Johndoe@gmail.com"
                  required
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

        {/* account setting card */}
        {activeSection === "settings" && (
          <div className="p-6 pt-10 bg-white border border-gray-200 rounded-lg mt-12 shadow w-full  md:w-1/2 lg:w-1/3 md:ml-6">
            <h2 className="font-bold text-xl mb-4">Pengaturan Akun</h2>
            <div className="flex flex-col space-y-4">
              <p className="bg-customBlue2 text-white w-full h-10 rounded-t-lg p-2 mb-3">
                Data Diri
              </p>
              <div>
                <label className="block font-bold text-customBlue1 ml-5">
                  Nama Lengkap
                </label>
                <p className="border-b w-11/12 ml-5 focus:outline-none rounded-md">
                  {name}
                </p>
              </div>
              <div>
                <label className="block font-bold text-customBlue1 ml-5">
                  Nomor Telepon
                </label>
                <p className="border-b w-11/12 ml-5 focus:outline-none rounded-md">
                  {phoneNumber}
                </p>
              </div>
              <div>
                <label className="block font-bold text-customBlue1 ml-5">
                  Email
                </label>
                <p className="border-b w-11/12 ml-5 focus:outline-none rounded-md mb-4">
                  {email}
                </p>
              </div>
              <button
                type="button"
                onClick={handleEditProfile}
                className="bg-customBlue2 text-white px-10 py-3 rounded-xl self-center hover:bg-customBlue1"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Account;
