/* eslint-disable react/prop-types */
import { useState } from "react";
import { faMultiply, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import InputForm from "../../components/InputForm/InputForm";

export default function CreateNews({ handleNewsCreate }) {
  const [isOpen, setIsOpen] = useState(false);

  // State for each field
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [category, setCategory] = useState("");
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
    setTitle("");
    setDate("");
    setTime("");
    setLocation("");
    setDescription("");
    setSubHeading("");
    setCategory("");
    setImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Creating form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("subHeading", subHeading);
    formData.append("category", category);
    formData.append("image", image);
    handleNewsCreate(formData); // Submit the data
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
                    <p className="text-lg font-medium">Create News or Event</p>
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
                        label={"Title"}
                        type={"text"}
                        value={title}
                        onInput={(e) => setTitle(e.target.value)}
                        required={"*"}
                      />
                      <InputForm
                        label={"Date"}
                        type={"text"}
                        value={date}
                        onInput={(e) => setDate(e.target.value)}
                        required={"*"}
                        placeholder={"e.g 13th Sep - 15th Sep 2022"}
                      />
                      <InputForm
                        label={"Time"}
                        type={"text"}
                        value={time}
                        onInput={(e) => setTime(e.target.value)}
                        placeholder={"e.g 5:13 PM"}
                        required={"*"}
                      />
                      <InputForm
                        label={"Location"}
                        type={"text"}
                        value={location}
                        onInput={(e) => setLocation(e.target.value)}
                        required={"*"}
                      />

                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full outline-none my-2 p-2 border border-gray-300 rounded focus-within:border-blue-500"
                      >
                        <option value="" disabled>
                          Select Category
                        </option>
                        <option value="news">News</option>
                        <option value="event">Events</option>
                      </select>

                      {/* Time */}
                      <InputForm
                        label={"Description"}
                        type={"text"}
                        value={description}
                        onInput={(e) => setDescription(e.target.value)}
                        required={"*"}
                      />
                      <InputForm
                        label={"SubHeading"}
                        type={"text"}
                        value={subHeading}
                        onInput={(e) => setSubHeading(e.target.value)}
                        required={"*"}
                      />

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
