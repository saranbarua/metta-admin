/* eslint-disable react/prop-types */
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function WarningModal({ memberName, Id, handleStatus }) {
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
        <FontAwesomeIcon
          icon={faCheckCircle}
          className="text-2xl text-blue-500 mx-2"
        />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex items-center justify-center"
                  >
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      className="text-center text-5xl text-yellow-600"
                    />
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-lg text-center">
                      Do you want to Approved{" "}
                      <span className="font-bold">{memberName}</span>?
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2 justify-center">
                    <button
                      type="button"
                      className=" bg-blue-300 py-1 px-3  rounded"
                      onClick={() => handleStatus(Id)}
                    >
                      Agree
                    </button>
                    <button
                      type="button"
                      className="bg-slate-200  py-1 px-3 rounded-md block"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
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
