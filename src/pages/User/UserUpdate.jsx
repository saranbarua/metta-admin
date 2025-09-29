import { useState, useEffect } from "react";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import InputForm from "../../components/InputForm/InputForm";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

export default function UserUpdate({ Id, data, handleUserUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState(data?.fullName || "");
  const [fathersName, setFathersName] = useState(data?.fathersName || "");
  const [husbandsName, setHusbaneName] = useState(data?.husbandsName || "");
  const [mothersName, setMothersName] = useState(data?.mothersName || "");
  const [dateOfBirth, setDateOfBirth] = useState(data?.dateOfBirth || "");
  const [bloodGroup, setBloodGroup] = useState(data?.bloodGroup || "");
  const [mobileNumberBD, setMobileNumberBD] = useState(
    data?.mobileNumberBD || ""
  );
  const [mobileNumberSA, setMobileNumberSA] = useState(
    data?.mobileNumberSA || ""
  );
  const [permanentAddress, setParmanentAddress] = useState(
    data?.permanentAddress || ""
  );
  const [presentAddress, setPresentAddress] = useState(
    data?.presentAddress || ""
  );
  const [workAddress, setWorkAddress] = useState(data?.workAddress || "");
  const [religion, setReligion] = useState(data?.religion || "");
  const [maritalStatus, setMaritalStatus] = useState(data?.maritalStatus || "");
  const [nationalIDNo, setNationalID] = useState(data?.nationalIDNo || "");
  const [refererName, setRefererName] = useState(data?.refererName || "");
  const [memberID, setmeberId] = useState(data?.memberID || "");
  //image url added
  const urlImg = `https://chattogram-somiti.makeupcoders.com${data?.profileImg}`;
  const [profileImg, setprofileImg] = useState(urlImg || null);

  // Update states when member prop changes
  useEffect(() => {
    if (data) {
      setFullName(data?.fullName || "");
      setFathersName(data?.fathersName || "");
      setHusbaneName(data?.husbandsName || "");
      setMothersName(data?.mothersName || "");
      setDateOfBirth(data?.dateOfBirth || "");
      setBloodGroup(data?.bloodGroup || "");
      setMobileNumberBD(data?.mobileNumberBD || "");
      setMobileNumberSA(data?.mobileNumberSA || "");
      setParmanentAddress(data?.permanentAddress || "");
      setPresentAddress(data?.presentAddress || "");
      setWorkAddress(data?.workAddress || "");
      setReligion(data?.religion || "");
      setMaritalStatus(data?.maritalStatus || "");
      setNationalID(data?.nationalIDNo || "");
      setRefererName(data?.refererName || "");
      setmeberId(data?.memberID || "");
      setprofileImg(urlImg || null);
    }
  }, [data, urlImg]);

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
    formData.append("fullName", fullName);
    formData.append("fathersName", fathersName);
    formData.append("husbandsName", husbandsName);
    formData.append("mothersName", mothersName);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("bloodGroup", bloodGroup);
    formData.append("mobileNumberBD", mobileNumberBD);
    formData.append("mobileNumberSA", mobileNumberSA);
    formData.append("permanentAddress", permanentAddress);
    formData.append("presentAddress", presentAddress);
    formData.append("workAddress", workAddress);
    formData.append("religion", religion);
    formData.append("maritalStatus", maritalStatus);
    formData.append("nationalIDNo", nationalIDNo);
    formData.append("refererName", refererName);
    formData.append("memberID", memberID);
    if (profileImg instanceof File) {
      formData.append("profileImg", profileImg);
    }

    handleUserUpdate(formData, Id);
    closeModal();
  };

  return (
    <>
      {/* Button to open modal */}

      <button onClick={openModal}>
        <FontAwesomeIcon
          icon={faEdit}
          className="text-2xl text-gray-500 mx-2"
        />
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
                <Dialog.Panel className="lg:w-[70%] w-full mx-auto transform overflow-hidden rounded-md bg-white p-2 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex items-center py-3 px-7 justify-between"
                  >
                    <p className="text-lg font-medium">Update User details</p>
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
                      <div className="grid md:grid-cols-3 items-center gap-3 w-full">
                        <InputForm
                          label={"Name"}
                          type={"text"}
                          value={fullName}
                          onInput={(e) => setFullName(e.target.value)}
                          required={"*"}
                        />
                        <InputForm
                          label={"Fathers Name"}
                          type={"text"}
                          value={fathersName}
                          onInput={(e) => setFathersName(e.target.value)}
                        />
                        <InputForm
                          label={"Husband Name"}
                          type={"text"}
                          value={husbandsName}
                          onInput={(e) => setHusbaneName(e.target.value)}
                        />
                      </div>
                      <div className="grid md:grid-cols-3 items-center gap-3 w-full">
                        <InputForm
                          label={"Mothers Name"}
                          type={"text"}
                          value={mothersName}
                          onInput={(e) => setMothersName(e.target.value)}
                          required={"*"}
                        />
                        <InputForm
                          label={"Blood Group"}
                          type={"text"}
                          value={bloodGroup}
                          onInput={(e) => setBloodGroup(e.target.value)}
                        />
                        <InputForm
                          label={"Date of Birth"}
                          type={"text"}
                          value={dateOfBirth}
                          onInput={(e) => setDateOfBirth(e.target.value)}
                        />
                      </div>{" "}
                      <div className="grid md:grid-cols-3 items-center gap-3 w-full">
                        <InputForm
                          label={"Bangladeshi Mobile No"}
                          type={"text"}
                          value={mobileNumberBD}
                          onInput={(e) => setMobileNumberBD(e.target.value)}
                        />
                        <InputForm
                          label={"Soudi Mobile No"}
                          type={"text"}
                          value={mobileNumberSA}
                          onInput={(e) => setMobileNumberSA(e.target.value)}
                        />
                        <InputForm
                          label={"Religion"}
                          type={"text"}
                          value={religion}
                          onInput={(e) => setReligion(e.target.value)}
                        />
                      </div>
                      <div className="grid md:grid-cols-3 items-center gap-3 w-full">
                        <InputForm
                          label={"Permanent Address"}
                          type={"text"}
                          value={permanentAddress}
                          onInput={(e) => setParmanentAddress(e.target.value)}
                        />
                        <InputForm
                          label={"Present Address"}
                          type={"text"}
                          value={presentAddress}
                          onInput={(e) => setPresentAddress(e.target.value)}
                        />
                        <InputForm
                          label={"Work Address"}
                          type={"text"}
                          value={workAddress}
                          onInput={(e) => setWorkAddress(e.target.value)}
                        />
                      </div>
                      <div className="grid md:grid-cols-3 items-center gap-3 w-full">
                        <div>
                          <p className="font-medium">Marrital Status</p>
                          <select
                            value={maritalStatus}
                            onChange={(e) => setMaritalStatus(e.target.value)}
                            className="w-full outline-none my-2 p-2 border border-gray-300 rounded focus-within:border-blue-500"
                          >
                            <option value="" disabled>
                              Select Category
                            </option>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                          </select>
                        </div>
                        <InputForm
                          label={"National ID Number"}
                          type={"text"}
                          value={nationalIDNo}
                          onInput={(e) => setNationalID(e.target.value)}
                        />
                        <InputForm
                          label={"Member ID"}
                          type={"text"}
                          value={memberID}
                          onInput={(e) => setmeberId(e.target.value)}
                        />
                      </div>
                      <div>
                        {/* Image */}
                        <label className="block font-medium my-3">
                          Image<span className="text-red-600">*</span>
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setprofileImg(e.target.files[0])}
                          className="input-field"
                        />
                        {profileImg && (
                          <div className="mt-3">
                            <p className="text-sm text-gray-500">
                              Selected Image:
                            </p>
                            <img
                              src={
                                profileImg instanceof File
                                  ? URL.createObjectURL(profileImg)
                                  : profileImg
                              }
                              crossOrigin="anonymous"
                              alt="Selected"
                              className="w-24 h-24 object-cover rounded-md"
                            />
                          </div>
                        )}
                      </div>
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
