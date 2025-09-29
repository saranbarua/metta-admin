import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import DeleteModal from "../../components/modal/DeleteModal";
import useGallery from "../../hooks/useGallery";
import CreateImage from "./CreateImage";
import apiurl from "../../apiurl/apiurl";
import Loader from "../../components/Loader/Loader";

export default function Gallery() {
  const { data, isLoading, handleImageCreate, handleDelete } = useGallery();

  const TABLE_HEAD = ["Index", "Image", "Creation Time", "Action"];
  return (
    <div className="mx-3">
      <div className="border border-t-2 mt-3 border-t-[#1D267D] mx-auto mb-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center p-2">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            <p className="font-medium text-gray-800">Images List</p>
          </div>
          <div>
            <CreateImage handleImageCreate={handleImageCreate} />
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
                    className="border align-middle text-center font-bold leading-none opacity-70 border-blue-gray-100 bg-blue-gray-50 p-2"
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
              <tbody className="align-text-top">
                {data.length > 0 ? (
                  <>
                    {data.map((data, i) => (
                      <tr key={i}>
                        <td className="p-2 align-middle text-center border-b border-blue-gray-50 border-l-2 text-[14px]">
                          {i + 1}
                        </td>
                        <td className="p-2 align-middle text-center border-b border-blue-gray-50 border-l-2 text-[14px]">
                          {data && (
                            <img
                              src={`${apiurl.imgUrl}${data?.image}`}
                              alt={data?.name || "Gallery Image"}
                              className="w-full h-60 object-contain"
                              crossOrigin="anonymous"
                              loading="lazy"
                              onError={(e) =>
                                (e.target.src = "/fallback-image.jpg")
                              }
                            />
                          )}
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
                        <td className="align-middle p-2 border-b border-blue-gray-50 border-l-2 text-[14px]">
                          <DeleteModal
                            Id={data?._id}
                            handleReject={handleDelete}
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
      </div>
    </div>
  );
}
