import { useState, useEffect } from "react";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import InputForm from "../../components/InputForm/InputForm";
import useCommittee from "../../hooks/useCommittee";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import Loader from "../../components/Loader/Loader";

export default function UpdateCommittee({ Id, member, handleCommitteeUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useCommittee(member?.year?.name);
  const [name, setName] = useState(member?.name || "");
  const [year, setYear] = useState(member?.year?._id || "");
  const [position, setPosition] = useState(member?.position || "");
  //image url added
  const urlImg = `http://backend.mettadhamma.com${member?.image}`;
  const [image, setImage] = useState(urlImg || null);

  // Update states when member prop changes
  useEffect(() => {
    if (member) {
      setName(member?.name || "");
      setYear(member?.year?._id || "");
      setPosition(member?.position || "");
      setImage(urlImg || null);
    }
  }, [member, urlImg]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("position", position);
    formData.append("year", year);
    if (image instanceof File) {
      formData.append("image", image);
    }

    handleCommitteeUpdate(formData, Id);
    closeModal();
  };

  return (
    <>
      {/* Button to open modal */}
      <button onClick={openModal} className="p-1 mx-2 text-white rounded">
        <FontAwesomeIcon icon={faEdit} className="text-xl text-gray-700 " />
      </button>

      {/* Modal */}
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
                <Dialog.Panel className="lg:w-[60%] w-full mx-auto transform overflow-hidden rounded-md bg-white p-2 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex items-center py-3 px-7 justify-between"
                  >
                    <p className="text-lg font-medium">Update Committee</p>
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
                      {/* Name */}
                      <InputForm
                        label={"Name"}
                        type={"text"}
                        value={name}
                        onInput={(e) => setName(e.target.value)}
                        required={"*"}
                      />

                      {/* Position */}
                      <InputForm
                        label={"Position"}
                        type={"text"}
                        value={position}
                        onInput={(e) => setPosition(e.target.value)}
                        required={"*"}
                      />

                      {/* Year */}
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
                            <option key={i} value={item._id}>
                              {item.name}
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
                      />
                      {image && (
                        <div className="mt-3">
                          <p className="text-sm text-gray-500">
                            Selected Image:
                          </p>
                          <img
                            src={
                              image instanceof File
                                ? URL.createObjectURL(image)
                                : image
                            }
                            crossOrigin="anonymous"
                            alt="Selected"
                            className="w-24 h-24 object-cover rounded-md"
                          />
                        </div>
                      )}

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
