import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import useEvents from "../../hooks/useEvents";
import DeleteModal from "../../components/modal/DeleteModal";
import CreateNews from "./CreateNews";
import apiurl from "../../apiurl/apiurl";
import DetailsModal from "../../components/modal/DetailsModal";
import Loader from "../../components/Loader/Loader";

export default function News() {
  const { data, isLoading, handleDelete, handleEventsCreate } = useEvents();

  const TABLE_HEAD = [
    "Index",
    "Events Title",
    "Date",
    "Time",
    "Location",
    "Image",
    "Action",
  ];

  return (
    <div className="mx-3">
      <div className="border border-t-2 mt-3 border-t-[#1D267D] mx-auto mb-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center p-2">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            <p className="font-medium text-gray-800">Events List</p>
          </div>
          <div>
            <CreateNews handleNewsCreate={handleEventsCreate} />
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
                    className="border font-bold leading-none opacity-70 border-blue-gray-100 bg-blue-gray-50 p-2"
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
                          <td className="p-2 w-[200px] align-middle border-b border-blue-gray-50 border-l-2 text-[14px]">
                            {data?.title}
                          </td>
                          <td className="p-2 border-b align-middle border-blue-gray-50 border-l-2 text-[14px]">
                            {data?.date}
                          </td>
                          <td className="p-2 border-b align-middle  border-blue-gray-50 border-l-2 text-[14px]">
                            {data?.time}
                          </td>
                          <td className="p-2 border-b align-middle border-blue-gray-50 border-l-2 text-[14px]">
                            {data?.location}
                          </td>
                          <td className="p-2 border-b border-blue-gray-50 border-l-2 text-[14px]">
                            {data && (
                              <img
                                src={`${apiurl.imgUrl}${data?.image}`}
                                alt={data.name || "Galllery Image"}
                                className="w-[200px] "
                                crossOrigin="anonymous"
                                loading="lazy"
                                onError={(e) =>
                                  (e.target.src = "/fallback-image.jpg")
                                }
                              />
                            )}
                          </td>

                          <td className="align-middle p-2 border-b border-blue-gray-50 border-l-2 text-[14px]">
                            <DeleteModal
                              Id={data?._id}
                              handleReject={handleDelete}
                            />
                            <DetailsModal Details={data} />
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
      </div>
    </div>
  );
}
