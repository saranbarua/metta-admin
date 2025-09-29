/* eslint-disable react/prop-types */
import { faMultiply, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import InputForm from "../../components/InputForm/InputForm";

export default function CreateFee({ handleFeeCreate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [memberID, setMemberID] = useState("");
  const [depositeDate, setDepositeDate] = useState("");
  const [depositeMonths, setDepositeMonths] = useState([]);
  const [depositeYear, setDepositeYear] = useState("");
  const [monthlyFee, setMonthlyFee] = useState("");
  const [status, setStatus] = useState("paid");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleMonthsChange = (e) => {
    const selectedMonths = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setDepositeMonths(selectedMonths);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const feeData = {
      memberID,
      depositeDate,
      depositeMonths,
      depositeYear,
      monthlyFee: parseFloat(monthlyFee),
      status,
    };
    handleFeeCreate(feeData);
    setIsOpen(false);
    // Reset form fields
    setMemberID("");
    setDepositeDate("");
    setDepositeMonths([]);
    setDepositeYear("");
    setMonthlyFee("");
    setStatus("paid");
  };

  return (
    <>
      <button
        onClick={openModal}
        className="flex items-center bg-[#1D267D] p-1 mx-2 text-white rounded"
      >
        <FontAwesomeIcon icon={faPlusSquare} className="mr-2" />
        <p className="font-medium">Create</p>
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
              >
                <Dialog.Panel className="lg:w-[50%] w-full mx-auto transform overflow-hidden rounded-md bg-white p-2 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex items-center py-3 px-7 justify-between"
                  >
                    <p className="text-lg font-medium">Create Fee</p>
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
                      {/* Member ID */}
                      <InputForm
                        label={"Member ID"}
                        placeholder={"e.g. BCSS-000001"}
                        onInput={(e) => setMemberID(e.target.value)}
                        value={memberID}
                      />

                      {/* Deposite Date */}
                      <InputForm
                        label={"Deposite Date"}
                        placeholder={"e.g. 2024-12-29"}
                        onInput={(e) => setDepositeDate(e.target.value)}
                        value={depositeDate}
                        type="date"
                      />

                      {/* Deposite Months */}
                      <div className="mb-3">
                        <label className="block text-sm font-medium mb-2">
                          Deposite Months
                        </label>
                        <select
                          multiple
                          className="border border-gray-300 rounded w-full p-2"
                          onChange={handleMonthsChange}
                        >
                          {[
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "June",
                            "July",
                            "August",
                            "September",
                            "October",
                            "November",
                            "December",
                          ].map((month) => (
                            <option key={month} value={month}>
                              {month}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Deposite Year */}
                      <InputForm
                        label={"Deposite Year"}
                        placeholder={"e.g. 2024"}
                        onInput={(e) => setDepositeYear(e.target.value)}
                        value={depositeYear}
                      />

                      {/* Monthly Fee */}
                      <InputForm
                        label={"Monthly Fee"}
                        placeholder={"e.g. 80"}
                        onInput={(e) => setMonthlyFee(e.target.value)}
                        value={monthlyFee}
                        type="number"
                      />

                      {/* Status */}
                      <div className="mb-3">
                        <label className="block text-sm font-medium mb-2">
                          Status
                        </label>
                        <select
                          className="border border-gray-300 rounded w-full p-2"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
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
