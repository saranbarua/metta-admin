import { faEye, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import apiurl from "../../apiurl/apiurl";

export default function UsersDetails({ Details }) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button onClick={openModal}>
        <FontAwesomeIcon icon={faEye} className="text-2xl text-sky-500 mx-2" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[1000]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[80%] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex items-center text-blue-600 justify-between mb-3 font-semibold text-2xl"
                  >
                    {Details?.fullName}
                    <FontAwesomeIcon
                      icon={faTimes}
                      onClick={closeModal}
                      className="cursor-pointer text-lg text-gray-600"
                    />
                  </Dialog.Title>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 border rounded-md">
                      <h3 className="text-xl text-green-500 font-semibold ">
                        ADDRESS DETAILS
                      </h3>
                      <p className="font-normal">
                        <span className="font-medium">
                          Bangladesh Mobile Number:
                        </span>{" "}
                        {Details?.mobileNumberBD}
                      </p>
                      <p className="font-normal">
                        <span className="font-medium">
                          Soudi Mobile Number:
                        </span>{" "}
                        {Details?.mobileNumberSA}
                      </p>
                      <p className="font-normal">
                        <span className="font-medium">Present Address:</span>{" "}
                        {Details?.presentAddress}
                      </p>
                      <p className="font-normal">
                        <span className="font-medium">Permanent Address:</span>{" "}
                        {Details?.permanentAddress}
                      </p>
                      <p className="font-normal">
                        <span className="font-medium">Work Address:</span>{" "}
                        {Details?.workAddress}
                      </p>
                    </div>
                    <div className="p-2 border rounded-md">
                      <h3 className="text-xl text-green-500 font-semibold ">
                        PERSONAL DETAILS
                      </h3>
                      <p className="font-normal">
                        <span className="font-medium">Religion:</span>{" "}
                        {Details?.religion}
                      </p>
                      <p className="font-normal">
                        <span className="font-medium">Marital Status:</span>{" "}
                        {Details?.maritalStatus || "N/A"}
                      </p>
                      <p className="font-normal">
                        <span className="font-medium">Date Of Birth:</span>{" "}
                        {Details?.dateOfBirth || "N/A"}
                      </p>
                      <p className="font-normal">
                        <span className="font-medium">Blood Group:</span>{" "}
                        {Details?.bloodGroup || "N/A"}
                      </p>
                      <p className="font-normal">
                        <span className="font-medium">Refer Name:</span>{" "}
                        {Details?.refererName || "N/A"}
                      </p>
                    </div>
                    <div className="p-2 border rounded-md">
                      <h3 className="text-xl text-green-500 font-semibold ">
                        FAMILY DETAILS
                      </h3>
                      <p className="font-normal">
                        <span className="font-medium">Fathers Name:</span>{" "}
                        {Details?.fathersName}
                      </p>
                      <p className="font-normal">
                        <span className="font-medium">Mothers Name:</span>{" "}
                        {Details?.mothersName || "N/A"}
                      </p>
                      <p className="font-normal">
                        <span className="font-medium">Husband Name:</span>{" "}
                        {Details?.husbandsName || "N/A"}
                      </p>
                      <p className="font-normal">
                        <span className="font-medium">Donation Status:</span>{" "}
                        <span
                          className={` font-medium ${
                            Details?.chadaStart === true
                              ? " text-green-600"
                              : " text-red-600"
                          }`}
                        >
                          <span>
                            {Details?.chadaStart === true
                              ? "Started"
                              : "Not Started Yet"}
                          </span>
                        </span>
                      </p>
                    </div>
                    <div className="p-2 border rounded-md">
                      <h3 className="text-xl text-green-500 font-semibold ">
                        MEMBERSHIP CARD
                      </h3>
                      <img
                        src={`${apiurl.imgUrl}${Details?.memberCard}`}
                        alt={Details.name || "Galllery Image"}
                        className="w-[100px] "
                        crossOrigin="anonymous"
                        loading="lazy"
                        onError={(e) => (e.target.src = "/fallback-image.jpg")}
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
