/* eslint-disable react/prop-types */
import {
  faTrash,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function DeleteModal({ Name, Id, handleReject }) {
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
        <FontAwesomeIcon icon={faTrash} className="text-xl text-red-500 mx-2" />
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
                      Do you want to Change{" "}
                      <span className="font-bold">{Name}</span>? Changed data
                      may not be retrieved.
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2 justify-center">
                    <button
                      type="button"
                      className=" bg-red-700 py-1 px-3 text-white rounded"
                      onClick={() => handleReject(Id)}
                    >
                      Delete
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
