import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faSearch,
  faArrowUpRightFromSquare,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";

import useYouTubeVideos from "../../hooks/useYouTubeVideos";
import CreateVideo from "./CreateVideo";
import UpdateVideo from "./UpdateVideo";
import DeleteVideo from "./DeleteVideo";

export default function AllYouTube() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const {
    data,
    isLoading,
    pagination,
    handleVideoCreate,
    handleVideoUpdate,
    handleVideoDelete,
    refresh, // ✅ use hook's refresh
  } = useYouTubeVideos(searchQuery, itemsPerPage, currentPage);

  const handlePageClick = (selectedPage) =>
    setCurrentPage(selectedPage.selected + 1);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const TABLE_HEAD = ["Index", "Thumbnail", "Title", "Creation Time", "Action"];

  const pageCount = Math.max(1, pagination?.totalPages || 1);

  return (
    <div className="mx-3">
      <div className="border border-t-2 mt-3 border-t-[#1D267D] mx-auto mb-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center p-2">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            <p className="font-medium text-gray-800">YouTube Videos</p>
          </div>
          <div>
            <CreateVideo onCreated={handleVideoCreate} onRefresh={refresh} />{" "}
            {/* ✅ */}
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

          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search videos..."
              className="border outline-none p-2 pl-8 rounded focus:ring focus:ring-blue-200"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-2 top-3 text-gray-500"
            />
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
                  <td colSpan={8} className="text-center py-6">
                    <div className="flex justify-center items-center">
                      <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="ml-3 text-blue-600 font-medium">
                        Loading...
                      </span>
                    </div>
                  </td>
                  {/* <td colSpan={8} className="text-center py-6">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.4s]"></div>
                    </div>
                    <p className="mt-2 text-gray-600">Loading...</p>
                  </td> */}
                </tr>
              </tbody>
            ) : (
              <tbody className="align-text-top">
                {data.length > 0 ? (
                  data.map((row, i) => (
                    <tr
                      key={row._id || row.videoId || i}
                      className="hover:bg-gray-50"
                    >
                      <td className="p-2 text-center border-b border-l-2 text-[14px]">
                        {(currentPage - 1) * itemsPerPage + i + 1}{" "}
                        {/* ✅ global index */}
                      </td>
                      <td className="p-2 text-center border-b border-l-2 text-[14px]">
                        {row.thumbnail ? (
                          <img
                            src={row.thumbnail}
                            alt={row.title}
                            className="w-28 h-16 object-cover rounded ring-1 ring-gray-200 mx-auto"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-gray-400">No thumbnail</span>
                        )}
                      </td>
                      <td className="p-2 text-center border-b border-l-2 text-[14px]">
                        <div className="max-w-[280px] mx-auto">
                          <p className="font-medium line-clamp-2">
                            {row.title}
                          </p>
                          {row.description ? (
                            <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                              {row.description}
                            </p>
                          ) : null}
                        </div>
                      </td>
                      <td className="p-2 text-center border-b border-l-2 text-[14px]">
                        {new Date(row?.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        {new Date(row?.createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </td>
                      <td className="p-2 text-center border-b border-l-2 text-[14px]">
                        <div className="flex items-center justify-center gap-2">
                          <UpdateVideo
                            row={row}
                            onUpdated={handleVideoUpdate}
                            onRefresh={refresh}
                          />{" "}
                          <DeleteVideo
                            id={row?._id}
                            title={row?.title}
                            onDelete={handleVideoDelete}
                            onRefresh={refresh}
                          />{" "}
                          {/* ✅ */}
                        </div>
                      </td>
                    </tr>
                  ))
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
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="flex justify-center my-4"
          pageClassName="px-3 py-1 border rounded mx-1"
          activeClassName="bg-blue-500 text-white"
          forcePage={currentPage - 1}
        />
      </div>
    </div>
  );
}
