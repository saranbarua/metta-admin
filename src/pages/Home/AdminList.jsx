import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Loader from "../../components/Loader/Loader";
import useAdmin from "../../hooks/useAdmin";
import DeleteModal from "../../components/modal/DeleteModal";

export default function AdminList() {
  const { adminData, isAdminLoading, handleStatusChange } = useAdmin();

  const TABLE_HEAD = ["Index", "User Name", "Status", "Account Type", "Action"];
  return (
    <div className="mx-3">
      <div className="border border-t-2 mt-3 border-t-[#1D267D] mx-auto mb-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center p-2">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            <p className="font-medium text-gray-800">Admin and Moderators</p>
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
            {isAdminLoading ? (
              <tbody>
                <tr>
                  <td colSpan={8} className="text-center">
                    <Loader />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="align-text-top ">
                {adminData?.length > 0 ? (
                  <>
                    {adminData?.map((data, i) => (
                      <tr key={i}>
                        <td className="p-2 align-middle text-center border-b border-blue-gray-50 border-l-2 text-[14px]">
                          {i + 1}
                        </td>
                        <td className="p-2 align-middle text-center border-b border-blue-gray-50 border-l-2 text-[14px]">
                          {data?.username}
                        </td>
                        <td className="p-2 align-middle text-center border-b border-blue-gray-50 border-l-2 text-[14px]">
                          <div
                            className={`text-center font-medium ${
                              data?.status === "active"
                                ? " p-1 text-green-600"
                                : " text-red-600"
                            }`}
                          >
                            <h2>
                              {data?.status === "active"
                                ? "Active"
                                : "Inactive"}
                            </h2>
                          </div>
                        </td>
                        <td className="p-2 align-middle text-center border-b border-blue-gray-50 border-l-2 text-[14px]">
                          <div
                            className={`text-center font-bold ${
                              data?.accountType === "admin"
                                ? " text-sky-600"
                                : " text-orange-600"
                            }`}
                          >
                            <h2>
                              {data?.accountType === "admin"
                                ? "Admin"
                                : "Moderator"}
                            </h2>
                          </div>
                        </td>

                        <td className="align-middle  p-2 border-b border-blue-gray-50 border-l-2 text-[14px]">
                          <DeleteModal
                            Id={data?._id}
                            handleReject={handleStatusChange}
                            memberName={data?.username}
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
