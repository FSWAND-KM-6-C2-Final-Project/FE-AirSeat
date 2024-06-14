import React, { useState } from "react";
import ArrowLeftIcon from "../icons/arrow-left.svg";
import FilterIcon from "../icons/filter.svg";
import SearchIcon from "../icons/search.svg";
import Datepicker from "tailwind-datepicker-react";
import imgSuccessPayment from "../icons/success_payment.svg";

const options = {
  title: "Pilih waktu",
  autoHide: false,
  todayBtn: false,
  clearBtn: true,
  clearBtnText: "Clear",
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-white w-50",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "bg-slate-500 text-white",
    input: "",
    inputIcon: "",
    selected: "bg-customBlue2",
  },
  icons: {
    prev: () => <span>Previous</span>,
    next: () => <span>Next</span>,
  },
  datepickerClassNames: "top-56 right-80",
  defaultDate: new Date("2022-01-01"),
  language: "en",
  disabledDates: [],
  weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: "Select Date",
  inputDateFormatProp: {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
};

const OrderHistoryEmpty = () => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (selectedDate) => {
    setSelectedDate(selectedDate);
    // console.log(selectedDate);
  };

  const handleClose = (state) => {
    setShow(state);
  };
  const toggleShow = () => {
    setShow((prevShow) => !prevShow);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {/* Navigasi Beranda dan Filter */}
      <div className="container mx-auto  mt-11 shadow-md pb-1">
        <h1 className="font-bold text-lg mb-5">Riwayat Pemesanan</h1>
        <div class="grid grid-cols-12 items-center py-2">
          <div class="col-span-9 p-2">
            <div className="w-full bg-customBlue2 h-12 rounded-lg flex items-center">
              <img src={ArrowLeftIcon} className="p-3" alt="" />
              <span className="text-white font-semibold">Beranda</span>
            </div>
          </div>
          <div class="col-span-3 p-2 flex">
            <div>
              <Datepicker
                options={options}
                onChange={handleChange}
                show={show}
                setShow={handleClose}
              >
                <div className="relative">
                  <div
                    onClick={toggleShow}
                    className="border w-[86px] cursor-pointer rounded-2xl border-slate-700 h-8 flex items-center p-1"
                  >
                    <img src={FilterIcon} className="me-2" alt="" />
                    <span className="font-normal">Filter</span>
                  </div>
                </div>
              </Datepicker>
            </div>

            {/* <!-- Modal toggle --> */}
            <button
              data-modal-target="default-modal"
              data-modal-toggle="default-modal"
              class="block"
              type="button"
              onClick={() => setIsModalOpen(true)}
            >
              <img src={SearchIcon} className="my-1 ms-4" alt="" />
            </button>
          </div>
        </div>
      </div>
      {/* End Navigasi Beranda dan Filter */}

      {/* Konten */}

      {/* Konten */}
      <div className="flex flex-col items-center justify-center mt-20 bg-white text-center">
        <style>
          {`
          .bg-light-blue {
            background-color: #DEF2FD;
          }

          .text-blue {
            color: #447C9D;
          }
        `}
        </style>
        <img src={imgSuccessPayment} alt="icon sukses" className="w-36 mb-5" />
        <h2 className="text-blue text-2xl mb-2 font-normal">
          Oops! Riwayat pesanan kosong!
        </h2>
        <p className="text-black text-lg mb-8 font-normal">
          Anda belum melakukan pemesanan penerbangan
        </p>
        <div className="flex flex-col gap-4">
          <button className="bg-customBlue2 hover:bg-customBlue1 text-white font-semibold py-2 px-4 rounded">
            Cari Penerbangan Lain
          </button>
        </div>
      </div>
      {/* End Konten */}
      {/* End Konten */}
      {/* Modal */}
      {isModalOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 left-[18.5rem] -top-3 w-[450px] max-w-2xl h-80">
            {/* Modal content */}
            <div className="relative pb-28 bg-white rounded-xl shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-stretch p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  <form class="w-80 mx-auto">
                    <label
                      for="default-search"
                      class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Search
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          class="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="search"
                        id="default-search"
                        class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Masukkan Nomor Penerbangan"
                        required
                      />
                    </div>
                  </form>
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-4 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setIsModalOpen(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5 space-y-4 text-sm">
                <div className="flex justify-between mb-6">
                  <span className="text-base font-semibold leading-relaxed text-black-500 dark:text-black-400">
                    Pencarian terkini
                  </span>
                  <span className="text-red-600 font-semibold">Hapus</span>
                </div>
                <div className="grid grid-cols-12 justify-between">
                  <div className="col-span-6">1234ABC</div>
                  <div className="col-span-6 flex justify-end items-center">
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </div>
                  <hr className="col-span-12 border my-2" />
                  <div className="col-span-6">7UY71912</div>
                  <div className="col-span-6 flex justify-end items-center">
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </div>
                  <hr className="col-span-12 border my-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderHistoryEmpty;
