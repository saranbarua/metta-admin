import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import useCommittee from "../../hooks/useCommittee";
import CreateYear from "./CreateYear";
import UpdateYear from "./UpdateYear";
import Loader from "../../components/Loader/Loader";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function CommitteeYear() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("");

  const { data, isLoading, handleYearCreate, handleYearUpdate, pagination } =
    useCommittee(searchQuery, itemsPerPage, currentPage, statusFilter);

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

  const TABLE_HEAD = ["Index", "Name", "Status", "Creation Time", "Action"];
  return (
    <div className="mx-3">
      <div className="border border-t-2 mt-3 border-t-[#1D267D] mx-auto mb-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center p-2">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            <p className="font-medium text-gray-800">Committee Year List</p>
          </div>
          <div>
            <CreateYear handleYearCreate={handleYearCreate} />
          </div>
        </div>
        <div className="md:grid md:grid-flow-col gap-3 grid justify-between items-center my-1 p-2">
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
                  <td colSpan={8} className="text-center">
                    <Loader />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="align-text-top ">
                {data.length > 0 ? (
                  <>
                    {data.map((data, i) => (
                      <tr key={i}>
                        <td className="p-2 align-middle text-center border-b border-blue-gray-50 border-l-2 text-[14px]">
                          {i + 1}
                        </td>
                        <td className="p-2 align-middle text-center border-b border-blue-gray-50 border-l-2 text-[14px]">
                          {data?.name}
                        </td>
                        <td className="p-2 align-middle text-center border-b border-blue-gray-50 border-l-2 text-[14px]">
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
                        <td className="p-2 border-b border-blue-gray-50 align-middle text-center border-l-2 text-[14px]">
                          {new Date(data?.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}{" "}
                          {new Date(data?.createdAt).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            }
                          )}
                        </td>
                        <td className="align-middle  p-2 border-b border-blue-gray-50 border-l-2 text-[14px]">
                          <UpdateYear
                            handleYearUpdate={handleYearUpdate}
                            Id={data?._id}
                            data={data}
                          />
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center text-sm py-4">
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
