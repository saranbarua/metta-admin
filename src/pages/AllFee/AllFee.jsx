import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Loader from "../../components/Loader/Loader";
import CreateFee from "./CreateFee";
import useFee from "../../hooks/useFee";
import DeleteModal from "../../components/modal/DeleteModal";
import Update from "./Update";
import { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
export default function AllFee() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("");

  const {
    data,
    isLoading,
    handleFeeCreate,
    handleDelete,
    handleStatusUpdate,
    pagination,
  } = useFee(searchQuery, itemsPerPage, currentPage, statusFilter);

  const TABLE_HEAD = [
    "Index",
    "Member Name",
    "Member ID",
    "Deposit Month",
    "Deposit Year",
    "Monthly Fee",
    "Updated By",
    "Status",
    "Depostit Date",
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
        <div className="flex items-center justify-between">
          <div className="flex items-center p-2">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            <p className="font-medium text-gray-800">Fee Details</p>
          </div>
          <div>
            <CreateFee handleFeeCreate={handleFeeCreate} />
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
                {data && data.length > 0 ? (
                  data.map((item, i) => (
                    <tr key={item._id}>
                      <td className="p-2 align-middle text-center border-b border-blue-gray-50 border-l-2 text-[14px]">
                        {i + 1}
                      </td>
                      <td className="p-2 align-middle text-center border-b border-blue-gray-50 border-l-2 text-[14px]">
                        {item?.member?.fullName || "N/A"}
                      </td>
                      <td className="p-2 align-middle text-center border-b border-blue-gray-50 border-l-2 text-[14px]">
                        {item?.member?.memberID || "N/A"}
                      </td>
                      <td className="p-2 align-middle text-center border-b border-blue-gray-50 border-l-2 text-[14px]">
                        {item?.depositeMonth}
                      </td>
                      <td className="p-2 align-middle text-center border-b border-blue-gray-50 border-l-2 text-[14px]">
                        {item?.depositeYear}
                      </td>
                      <td className="p-2 align-middle text-center border-b border-blue-gray-50 border-l-2 text-[14px]">
                        ${item?.monthlyFee}
                      </td>
                      <td className="p-2 align-middle text-center border-b border-blue-gray-50 border-l-2 text-[14px]">
                        {item?.updatedBy?.username || "N/A"}
                      </td>
                      <td className="p-2 align-middle text-center border-b border-blue-gray-50 border-l-2 text-[14px]">
                        <div
                          className={`text-center font-medium ${
                            item?.status === "paid"
                              ? "bg-green-100 p-1 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {item?.status === "paid" ? "Paid" : "Unpaid"}
                        </div>
                      </td>
                      <td className="p-2 border-b border-blue-gray-50 align-middle text-center border-l-2 text-[14px]">
                        {new Date(item?.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                      <td className="align-middle p-2 border-b border-blue-gray-50 border-l-2 text-[14px]">
                        <div className="flex justify-center">
                          <DeleteModal
                            Id={item?._id}
                            handleReject={handleDelete}
                          />
                          <Update
                            handleStatusUpdate={handleStatusUpdate}
                            Id={item?._id}
                            item={item}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={TABLE_HEAD.length}
                      className="text-center text-sm py-4"
                    >
                      No fee data available.
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
