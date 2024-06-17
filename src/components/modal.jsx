import { useState } from "react";

const Modal = ({showModal, toggleModal}) => {
    const [selectedOption, setSelectedOption] = useState(null)    

    const handleOptionClicked = (index) => {
        setSelectedOption(index)
    }

    return (
        <>
           

      {showModal && (
        <div
          id="default-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center h-full bg-gray-900 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow">
              {/* Modal header */}
              <div className="flex items-center justify-between p-2 md:p-3 rounded-t dark:border-gray-600">
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div>
                <div className={`p-5 border-b ${selectedOption === 0 ? "bg-customBlue2 text-white" : "" } cursor-pointer hover:bg-gray-200 hover:text-black`} onClick={() => handleOptionClicked(0)}>
                    <p className="font-bold text-md">Harga - Termurah</p>
                </div>
                <div className={`p-5 border-b ${selectedOption === 1 ? "bg-customBlue2 text-white" : "" } cursor-pointer hover:bg-gray-200 hover:text-black`} onClick={() => handleOptionClicked(1)}>
                    <p className="font-bold text-md">Durasi - Terpendek</p>
                </div>
                <div className={`p-5 border-b ${selectedOption === 2 ? "bg-customBlue2 text-white" : "" } cursor-pointer hover:bg-gray-200 hover:text-black`} onClick={() => handleOptionClicked(2)}>
                    <p className="font-bold text-md">Keberangkatan - Paling Awal</p>
                </div>
                <div className={`p-5 border-b ${selectedOption === 3 ? "bg-customBlue2 text-white" : "" } cursor-pointer hover:bg-gray-200 hover:text-black`} onClick={() => handleOptionClicked(3)}>
                    <p className="font-bold text-md">Keberangkatan - Paling Akhir</p>
                </div>
                <div className={`p-5 border-b ${selectedOption === 4? "bg-customBlue2 text-white" : "" } cursor-pointer hover:bg-gray-200 hover:text-black`} onClick={() => handleOptionClicked(4)}>
                    <p className="font-bold text-md">Harga - Termurah</p>
                </div>
                <div className={`p-5 border-b ${selectedOption === 5 ? "bg-customBlue2 text-white" : "" } cursor-pointer hover:bg-gray-200 hover:text-black`} onClick={() => handleOptionClicked(5)}>
                    <p className="font-bold text-md">Kedatangan - Paling Awal</p>
                </div>
                <div className={`p-5 border-b ${selectedOption === 6 ? "bg-customBlue2 text-white" : "" } cursor-pointer hover:bg-gray-200 hover:text-black`} onClick={() => handleOptionClicked(6)}>
                    <p className="font-bold text-md">Kedatangan - Paling Akhir</p>
                </div>
              </div>
              <div className="flex justify-end p-7">
                <button type="button" className="font-bold bg-customBlue2 rounded-2xl p-3 w-32 text-white">Pilih</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
    )
}
export default Modal;