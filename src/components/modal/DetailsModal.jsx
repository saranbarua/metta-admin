import { faEye, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function DetailsModal({ Details }) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <FontAwesomeIcon
        icon={faEye}
        onClick={openModal}
        className="cursor-pointer text-lg mx-2 text-green-600"
      />

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
                    className="flex items-center justify-between mb-3 font-semibold text-2xl"
                  >
                    {Details?.title}
                    <FontAwesomeIcon
                      icon={faTimes}
                      onClick={closeModal}
                      className="cursor-pointer text-lg text-gray-600"
                    />
                  </Dialog.Title>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 border rounded-md">
                      <h3 className="text-md font-semibold">
                        Subheading:
                        <span className="font-normal ml-2">
                          {Details?.subHeading}
                        </span>
                      </h3>
                    </div>
                    <div className="p-2 border rounded-md">
                      <h3 className="text-md font-semibold">
                        Desciption:
                        <span className="font-normal ml-2">
                          {Details?.description}
                        </span>
                      </h3>
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
