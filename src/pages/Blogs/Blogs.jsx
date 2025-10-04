import { useState } from "react";
import ReactPaginate from "react-paginate";
import useBlogs from "../../hooks/useBlogs";
import CreateBlog from "./CreateBlog";
import UpdateBlog from "./UpdateBlog";
import DeleteBlog from "./DeleteBlog";

export default function Blogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [publishedFilter, setPublishedFilter] = useState(""); // "", "true", "false"

  const {
    data,
    isLoading,
    pagination,
    handleBlogCreate,
    handleBlogUpdate,
    handleBlogDelete,
    refresh,
  } = useBlogs(searchQuery, itemsPerPage, currentPage, publishedFilter);

  const handlePageClick = (selectedPage) =>
    setCurrentPage(selectedPage.selected + 1);
  const pageCount = Math.max(1, pagination?.totalPages || 1);

  return (
    <div className="mx-3">
      <div className="border border-t-2 mt-3 border-t-[#1D267D] mx-auto mb-7">
        <div className="flex p-2 items-center justify-between">
          <div className="p-2 font-medium text-gray-800">Blogs</div>
          <CreateBlog onCreate={handleBlogCreate} onRefresh={refresh} />
        </div>

        <div className="md:grid md:grid-flow-col gap-3 grid justify-between items-center my-1 p-2">
          <div>
            <label className="mr-2">Show:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(parseInt(e.target.value, 10));
                setCurrentPage(1);
              }}
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
              placeholder="Search blog title/author/tags..."
              className="border outline-none p-2 pl-3 rounded focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mr-2">Filter:</label>
            <select
              value={publishedFilter}
              onChange={(e) => {
                setPublishedFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border p-2 rounded"
            >
              <option value="">All</option>
              <option value="true">Published</option>
              <option value="false">Unpublished</option>
            </select>
          </div>
        </div>

        <hr />

        <div className="overflow-x-auto custom-scroll mx-2">
          <table className="w-full min-w-max table-auto text-left border">
            <thead>
              <tr>
                {[
                  "#",
                  "Title",
                  "Author",
                  "Tags",
                  "Published",
                  "Created",
                  "Action",
                ].map((h, i) => (
                  <th
                    key={i}
                    className="border text-center font-bold opacity-70 bg-blue-gray-50 p-2"
                  >
                    {h}
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
                </tr>
              </tbody>
            ) : (
              <tbody>
                {data.length > 0 ? (
                  data.map((row, i) => (
                    <tr key={row._id || i} className="hover:bg-gray-50">
                      <td className="p-2 text-center border-b border-l-2 text-[14px]">
                        {(currentPage - 1) * itemsPerPage + i + 1}
                      </td>
                      <td className="p-2 text-center border-b border-l-2 text-[14px]">
                        <div className="max-w-[320px] mx-auto">
                          <p className="font-medium line-clamp-2">
                            {row.title}
                          </p>
                          {row.subHeading && (
                            <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                              {row.subHeading}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="p-2 text-center border-b border-l-2 text-[14px]">
                        {row.author || "-"}
                      </td>
                      <td className="p-2 text-center border-b border-l-2 text-[14px]">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {(row.tags || []).map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-gray-100 rounded text-xs"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-2 text-center border-b border-l-2 text-[14px]">
                        <span
                          className={`px-2 py-0.5 rounded text-xs ${
                            row.isPublished
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {row.isPublished ? "Published" : "Unpublished"}
                        </span>
                      </td>
                      <td className="p-2 text-center border-b border-l-2 text-[14px]">
                        {new Date(row?.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        {new Date(row?.createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="p-2 text-center border-b border-l-2 text-[14px]">
                        <div className="flex items-center justify-center gap-2">
                          <UpdateBlog
                            row={row}
                            onUpdate={handleBlogUpdate}
                            onRefresh={refresh}
                          />
                          <DeleteBlog
                            id={row?._id}
                            title={row?.title}
                            onDelete={handleBlogDelete}
                            onRefresh={refresh}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center text-sm py-4">
                      No blogs found.
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
