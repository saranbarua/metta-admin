/* eslint-disable react/prop-types */
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

export default function Update({ Id, handleStatusUpdate, item }) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(item?.status);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleStatusUpdate(Id, status);
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>
        <FontAwesomeIcon icon={faEdit} className="text-xl text-gray-500 mx-2" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
                <Dialog.Panel className="lg:w-[50%] w-full mx-auto transform overflow-hidden rounded-md bg-white p-2 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex items-center py-3 px-7 justify-between"
                  >
                    <p className="text-lg font-medium">Update Status</p>
                    <FontAwesomeIcon
                      icon={faMultiply}
                      onClick={closeModal}
                      className="cursor-pointer p-2"
                    />
                  </Dialog.Title>
                  <hr />

                  <form
                    encType="multipart/form-data"
                    method="POST"
                    onSubmit={handleSubmit}
                  >
                    <div className="mt-5  px-7 mb-5">
                      <div>
                        <p className="font-medium">Status</p>
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="w-full outline-none my-2 p-2 border border-gray-300 rounded focus-within:border-blue-500"
                        >
                          <option value="" disabled>
                            Select Status
                          </option>
                          <option value="paid">Paid</option>
                          <option value="unpaid">Unpaid</option>
                        </select>
                      </div>

                      {/* Modal Footer */}
                      <div className="my-3 flex gap-2 justify-between">
                        <button
                          type="button"
                          className="cancel-btn"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="approve-btn">
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
