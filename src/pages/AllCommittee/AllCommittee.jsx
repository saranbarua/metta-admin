import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import useAllCommittee from "../../hooks/useAllCommittee";
import Create from "./Create";
import DeleteModal from "../../components/modal/DeleteModal";
import apiurl from "../../apiurl/apiurl";
import UpdateCommittee from "./UpdateCommittee";
import Loader from "../../components/Loader/Loader";
import { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function AllCommittee() {
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const {
    data,
    isLoading,
    handleCommitteeCreate,
    handleCommitteeUpdate,
    handleDelete,
  } = useAllCommittee(searchQuery, itemsPerPage);

  const groupedData = data?.reduce((acc, member) => {
    const yearName = member.year.name;
    if (!acc[yearName]) {
      acc[yearName] = [];
    }
    acc[yearName].push(member);
    return acc;
  }, {});

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
  };

  return (
    <div className="mx-3">
      <div className="border border-t-2 mt-3 border-t-[#1D267D] mx-auto mb-7 p-4 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-blue-500" />
            <p className="font-medium text-gray-800 text-lg">
              Committee Year Members
            </p>
          </div>
          <div>
            <Create handleCommitteeCreate={handleCommitteeCreate} />
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
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search members..."
              className="border outline-none p-2 pl-8 rounded focus:ring focus:ring-blue-200"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-2 top-3 text-gray-500"
            />
          </div>
        </div>
        <hr className="my-4" />

        {isLoading ? (
          <div className="text-center py-6">
            <Loader />
          </div>
        ) : (
          Object.keys(groupedData).map((year, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-xl font-semibold text-blue-600 mb-4">
                {year}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {groupedData[year].map((member) => (
                  <div
                    key={member._id}
                    className="p-4 border rounded-lg bg-gray-50 shadow hover:shadow-md transition duration-200"
                  >
                    {member && (
                      <img
                        src={`${apiurl.imgUrl}${member?.image}`}
                        alt={member.name || "Member Image"}
                        className="w-full h-40 object-contain rounded-md mb-3"
                        crossOrigin="anonymous"
                        loading="lazy"
                        onError={(e) => (e.target.src = "/fallback-image.jpg")}
                      />
                    )}

                    <h3 className="text-lg font-bold text-gray-800">
                      {member.name}
                    </h3>
                    <p className="text-gray-600">{member.position}</p>
                    <div className="flex justify-center">
                      <DeleteModal
                        Id={member?._id}
                        handleReject={handleDelete}
                      />
                      <UpdateCommittee
                        handleCommitteeUpdate={handleCommitteeUpdate}
                        Id={member?._id}
                        member={member}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
