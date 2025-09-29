/* eslint-disable react/prop-types */
import { useState } from "react";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import InputForm from "../../components/InputForm/InputForm";

export default function CreateMessageModal({ onCreateMessage, memberID }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const closeModal = () => {
    setIsOpen(false);
    resetFields();
  };

  const openModal = () => {
    setIsOpen(true);
    resetFields();
  };

  const resetFields = () => {
    setTitle("");
    setDetails("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      memberId: memberID,
      title,
      details,
    };

    onCreateMessage(formData); // Submit the data
    closeModal(); // Close modal
  };

  return (
    <>
      {/* Button to open modal */}
      <button
        onClick={openModal}
        className="flex items-center bg-[#1D267D] p-1 mx-2 text-white rounded"
      >
        <p className="font-medium">Create</p>
      </button>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[1000]" onClose={() => {}}>
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
                <Dialog.Panel className="lg:w-[60%] w-full mx-auto transform overflow-hidden rounded-md bg-white p-2 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex items-center py-3 px-7 justify-between"
                  >
                    <p className="text-lg font-medium">Create Message</p>
                    <FontAwesomeIcon
                      icon={faMultiply}
                      onClick={closeModal}
                      className="cursor-pointer p-2"
                    />
                  </Dialog.Title>
                  <hr />
                  <form
                    encType="application/json"
                    method="POST"
                    onSubmit={handleSubmit}
                  >
                    <div className="mt-5 px-7 mb-5">
                      {/* Title */}
                      <InputForm
                        label={"Title"}
                        type={"text"}
                        value={title}
                        onInput={(e) => setTitle(e.target.value)}
                        required={"*"}
                      />

                      {/* Details */}
                      <InputForm
                        label={"Details"}
                        type={"text"}
                        value={details}
                        onInput={(e) => setDetails(e.target.value)}
                        required={"*"}
                      />

                      {/* Modal Footer */}
                      <div className="my-6 flex gap-2 justify-between">
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
