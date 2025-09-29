/* eslint-disable react/prop-types */
import {
  faClose,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Button from "../Button/Button";

export default function ApproveRejectModal({
  agencyName,
  loginEmail,
  handleApproval,
  handleRejection,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Button
        type={"button"}
        className={"approve-btn"}
        onClick={openModal}
        name={"Action"}
      />

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                  <div className="flex justify-end cursor-pointer">
                    <FontAwesomeIcon
                      icon={faClose}
                      className="text-3xl text-gray-700"
                      onClick={closeModal}
                    />
                  </div>

                  <Dialog.Title
                    as="h3"
                    className="flex items-center justify-center"
                  >
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      className=" text-5xl text-yellow-500"
                    />
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-lg text-center">
                      Do you want to Approve {agencyName}?
                    </p>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      className="approve-btn mx-3"
                      onClick={() => handleApproval(loginEmail)}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejection(loginEmail)}
                      type="button"
                      className="cancel-btn"
                    >
                      Reject
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
