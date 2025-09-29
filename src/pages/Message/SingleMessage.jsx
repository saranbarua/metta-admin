import { useEffect, useState } from "react";
import apiurl from "../../apiurl/apiurl";
import fetchData from "../../utils/fetchData";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useLocation, useParams } from "react-router-dom";
import CreateMessageModal from "./CreateMessageModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "../../components/modal/DeleteModal";
import deleteData from "../../utils/deleteData";

export default function SingleMessage() {
  const { id } = useParams();
  const location = useLocation();
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  // Extract `memberID` from query parameters
  const queryParams = new URLSearchParams(location.search);
  const memberID = queryParams.get("memberID");

  const fetchMessages = async () => {
    const url = `${apiurl.mainUrl}/member-message/all-message/${id}`;
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const result = await fetchData(url, config);
      if (result?.success === true) {
        setMessage(result?.data);
      } else {
        toast.error(result?.message || "Failed to fetch data");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [id, deleteSuccess]);

  const handleCreateMessage = async (newMessageData) => {
    const url = `${apiurl.mainUrl}/member-message`;
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(newMessageData),
    };

    try {
      const response = await fetch(url, config);
      const result = await response.json();
      if (result?.success) {
        toast.success("Message created successfully");
        fetchMessages(); // Refresh messages
      } else {
        toast.error(result?.message || "Failed to create message");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-4">
        Loading message details...
      </div>
    );
  }

  const handleDelete = async (id) => {
    setLoading(true);
    setDeleteSuccess(false);
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const url = `${apiurl.mainUrl}/member-message/single-message/${id}`;
      const result = await deleteData(url, config);
      if (result?.success === true) {
        setDeleteSuccess(true);
        toast.success(result?.message);
      }
      if (result?.success === false) {
        toast.error(result?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-4 my-6">
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center p-2">
          <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
          <p className="font-medium text-gray-800">Message List</p>
        </div>
        <div>
          <div>
            <CreateMessageModal
              memberID={memberID}
              onCreateMessage={handleCreateMessage}
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-4 py-2">Index</th>
              <th className="border px-4 py-2">Member ID</th>
              <th className="border px-4 py-2">Full Name</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Details</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {!message || message.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  No message details available.
                </td>
              </tr>
            ) : (
              message.map((msg, index) => {
                const data = msg?.memberId?.memberID;
                return (
                  <tr key={msg._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border px-4 py-2">{data}</td>
                    <td className="border px-4 py-2">
                      {msg?.memberId?.fullName}
                    </td>
                    <td className="border px-4 py-2">{msg.title}</td>
                    <td className="border px-4 py-2">{msg.details}</td>
                    <td className="border px-4 py-2 flex items-center">
                      <DeleteModal Id={msg?._id} handleReject={handleDelete} />
                      {/* <CreateMessageModal
                        memberID={msg?.memberId.memberID}
                        onCreateMessage={handleCreateMessage}
                      /> */}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
