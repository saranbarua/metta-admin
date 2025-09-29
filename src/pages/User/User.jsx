import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import apiurl from "../../apiurl/apiurl";
import useUser from "../../hooks/useUser";
import UsersDetails from "./UsersDetails";
import WarningModal from "../../components/modal/WarningModal";
import UserUpdate from "./UserUpdate";
import Loader from "../../components/Loader/Loader";
import DeleteModal from "../../components/modal/DeleteModal";
import { Link } from "react-router-dom";
import { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import ResetPassword from "../../components/modal/ResetPassword";

export default function User() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("");

  const {
    pagination,
    data,
    isLoading,
    handleStatusUpdate,
    handleUserUpdate,
    handleBlock,
    handleResetPass,
  } = useUser(searchQuery, itemsPerPage, currentPage, statusFilter);

  const TABLE_HEAD = [
    "Index",
    "Member ID",
    "Full Name",
    "See Donation",
    "Message",
    "Image",
    "National ID",
    "Approval Status",
    "Member Status",
    "Action",
  ];

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };
  return (
    <div className="mx-3">
      <div className="border border-t-2 mt-3 border-t-[#1D267D] mx-auto mb-7">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center p-2">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            <p className="font-medium text-gray-800">Members List</p>
          </div>
          <div className="relative ">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search members..."
              className="border outline-none p-2 pl-8 rounded focus:ring focus:ring-blue-200"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-2 top-3 text-gray-500"
            />
          </div>
        </div>
        <div className="flex justify-between items-center my-1 p-2">
          <div>
            <label className="mr-2">Show:</label>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border p-2 rounded"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>
          <div>
            <label className="mr-2">Filter by Status:</label>
            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="border p-2 rounded"
            >
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <hr />

        <div className="overflow-x-auto custom-scroll mx-2">
          <table className="w-full min-w-max table-auto text-left border">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, i) => (
                  <th
                    key={i}
                    className="border text-center font-bold leading-none opacity-70 border-blue-gray-100 bg-blue-gray-50 p-2"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                <tr>
                  <td colSpan={TABLE_HEAD.length} className="text-center">
                    <Loader />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="align-text-top">
                {data.length > 0 ? (
                  <>
                    {data.map((data, i) => {
                      return (
                        <tr key={i}>
                          <td className="p-2 align-middle border-b border-blue-gray-50 border-l-2 text-[14px]">
                            {i + 1}
                          </td>
                          <td className="p-2 border-b align-middle border-blue-gray-50 border-l-2 text-[14px]">
                            {data?.memberID || "N/A"}
                          </td>
                          <td className="p-2 w-[150px] align-middle border-b border-blue-gray-50 border-l-2 text-[14px]">
                            {data?.fullName}
                          </td>
                          <td className="p-2 w-[150px] text-center align-middle border-b border-blue-gray-50 border-l-2 text-[14px]">
                            <Link
                              to={`/donations/${data?.memberID}`}
                              className="bg-emerald-500 p-2 text-white"
                            >
                              Donations
                            </Link>
                          </td>
                          <td className="p-2 w-[150px] text-center align-middle border-b border-blue-gray-50 border-l-2 text-[14px]">
                            <Link
                              to={`/message/${data?._id}?memberID=${data?.memberID}`}
                              className="bg-yellow-400 p-2 text-black"
                            >
                              Message
                            </Link>
                          </td>
                          <td className="p-2 border-b border-blue-gray-50 border-l-2">
                            <img
                              src={
                                data?.profileImg
                                  ? `${apiurl.imgUrl}${data.profileImg}`
                                  : "/fallback-image.jpg"
                              }
                              alt={data?.fullName || "Default Profile"}
                              className="w-[100px] h-[100px] object-cover rounded-full"
                              crossOrigin="anonymous"
                              loading="lazy"
                              onError={(e) =>
                                (e.target.src = "/fallback-image.jpg")
                              }
                            />
                          </td>
                          <td className="p-2 border-b align-middle border-blue-gray-50 border-l-2 text-[14px]">
                            {data?.nationalIDNo || "N/A"}
                          </td>
                          <td className="p-2 border-b align-middle border-blue-gray-50 border-l-2 text-[14px]">
                            <div
                              className={`text-center font-medium ${
                                data?.isApproved === true
                                  ? "bg-green-100 p-1 text-green-600"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              <h2>
                                {data?.isApproved === true
                                  ? "Approved"
                                  : "Not Approved"}
                              </h2>
                            </div>
                          </td>
                          <td className="p-2 border-b align-middle border-blue-gray-50 border-l-2 text-[14px]">
                            <div
                              className={`text-center font-medium ${
                                data?.status === "active"
                                  ? "bg-green-100 p-1 text-green-600"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              <h2>
                                {data?.status === "active"
                                  ? "Active"
                                  : "Inactive"}
                              </h2>
                            </div>
                          </td>
                          <td className="align-middle p-2  border-b border-blue-gray-50 border-l-2 text-[14px]">
                            <div className="flex  items-center">
                              <WarningModal
                                Id={data?._id}
                                handleStatus={handleStatusUpdate}
                                btnName={"Approval"}
                                memberName={data?.fullName}
                              />
                              <UsersDetails Details={data} />
                              <UserUpdate
                                data={data}
                                handleUserUpdate={handleUserUpdate}
                                Id={data?._id}
                              />
                              <DeleteModal
                                Id={data?.memberID}
                                handleReject={handleBlock}
                              />
                              <ResetPassword
                                Id={data?._id}
                                handleResetPass={handleResetPass}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <tr>
                    <td
                      colSpan={TABLE_HEAD.length}
                      className="text-center text-sm py-4"
                    >
                      There is no entry available.
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageCount={pagination.totalPages}
          onPageChange={handlePageClick}
          containerClassName="flex justify-center my-4"
          pageClassName="px-3 py-1 border rounded mx-1"
          activeClassName="bg-blue-500 text-white"
        />
      </div>
    </div>
  );
}
