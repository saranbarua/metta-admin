/* eslint-disable react/prop-types */
import { useState } from "react";
import { faMultiply, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import InputForm from "../../components/InputForm/InputForm";
import useCommittee from "../../hooks/useCommittee";
import Loader from "../../components/Loader/Loader";

export default function Create({ handleCommitteeCreate }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useCommittee("");
  // State for each field
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState(null);

  const closeModal = () => {
    setIsOpen(false);
    resetFields();
  };

  const openModal = () => {
    setIsOpen(true);
    resetFields();
  };

  const resetFields = () => {
    setName("");
    setPosition("");
    setImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Creating form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("position", position);
    formData.append("year", year);
    formData.append("image", image);
    handleCommitteeCreate(formData); // Submit the data
    closeModal(); // Close modal
  };

  return (
    <>
      {/* Button to open modal */}
      <button
        onClick={openModal}
        className="flex items-center bg-[#1D267D] p-1 mx-2 text-white rounded"
      >
        <FontAwesomeIcon icon={faPlusSquare} className="mr-2" />
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
                <Dialog.Panel className="lg:w-[60%]  w-full mx-auto transform overflow-hidden rounded-md bg-white p-2 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex items-center py-3 px-7 justify-between"
                  >
                    <p className="text-lg font-medium">Create Committee</p>
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
                    <div className="mt-5 px-7 mb-5">
                      {/* Title */}
                      <InputForm
                        label={"Name"}
                        type={"text"}
                        value={name}
                        onInput={(e) => setName(e.target.value)}
                        required={"*"}
                      />
                      <InputForm
                        label={"Position"}
                        type={"text"}
                        value={position}
                        onInput={(e) => setPosition(e.target.value)}
                        required={"*"}
                      />
                      {isLoading ? (
                        <div className="text-center py-6">
                          <Loader />
                        </div>
                      ) : (
                        <select
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          className="w-full outline-none my-2 p-2 border border-gray-300 rounded focus-within:border-blue-500"
                        >
                          {data?.map((item, i) => (
                            <option key={i} value={item?._id}>
                              {item?.name}
                            </option>
                          ))}
                        </select>
                      )}
                      {/* Image */}
                      <label className="block font-medium my-3">
                        Image<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="input-field"
                        required
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
