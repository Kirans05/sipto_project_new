import React, { useState } from "react";

const AssestsModal = ({ closeModal, assestsData, investHandler }) => {
  const [qty, setQty] = useState(0);
  return (
    <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
      {/* <!-- Background overlay, show/hide based on modal state. --> */}
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      {/* <!-- Modal panel, show/hide based on modal state. --> */}
      <div className="relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        {/* <!-- Header --> */}

        {/* <!-- Body --> */}
        <div className="px-4 py-8 w-full flex flex-col gap-y-5">
          <p className="text-center text-xl">
            Please Select The Number Of Quantity
          </p>
          <input
            type="number"
            placeholder={"Enter the Quantity"}
            className="border-2 border-gray-400 h-10 pl-4"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          />
          <div className="flex justify-around">
            <button
              className="bg-green-500 text-white p-2 rounded-lg"
              onClick={() => investHandler(qty * assestsData.price, qty)}
            >
              Purchase
            </button>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white p-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* <!-- Footer --> */}
        {/* <div className="bg-gray-50 px-4 py-3 sm:px-6">
          <div className="text-right">
            <button
              className="text-sm font-medium leading-5 bg-white border border-gray-300 rounded-md px-4 py-2 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition duration-150 ease-in-out"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AssestsModal;
