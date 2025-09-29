import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import fetchData from "../utils/fetchData";
import toast from "react-hot-toast";
import apiurl from "../apiurl/apiurl";
import patchData from "../utils/patchData";

const useUser = (searchQuery = "", limit = 3, page = 1, status = "") => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [nameUpdateSuccess, setNameUpdateSuccess] = useState(false);
  const [statusUpdateSuccess, setstatusUpdateSuccess] = useState(false);
  const [userUpdateSuccess, setUserUpdateSuccess] = useState(false);
  const [userBlockSuccess, setUserBlockSuccess] = useState(false);

  // Fetching data
  useEffect(() => {
    const fetchDataFromApi = async () => {
      setNameUpdateSuccess(false);
      setstatusUpdateSuccess(false);
      setUserBlockSuccess(false);
      setUserUpdateSuccess(false);
      setIsLoading(true);
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = `${apiurl.mainUrl}/member?search=${searchQuery}&limit=${limit}&page=${page}&status=${status}`;
      try {
        const result = await fetchData(url, config);
        if (result?.success) {
          setData(result?.data || []);
          setPagination(result?.pagination);
        } else {
          toast.error(result?.message || "Failed to fetch data");
        }
      } catch (error) {
        toast.error(error?.message || "An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataFromApi();
  }, [
    nameUpdateSuccess,
    userBlockSuccess,
    userUpdateSuccess,
    statusUpdateSuccess,
    searchQuery,
    limit,
    page,
    status,
  ]);

  // Update data
  const handleUserUpdate = async (FormData, id) => {
    setIsLoading(true);
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${apiurl.mainUrl}/member/update/${id}`;
    try {
      const result = await patchData(url, FormData, config);
      if (result?.success) {
        setUserUpdateSuccess(true);
        toast.success("User updated successfully");
      } else {
        toast.error(result?.message || "Failed to update Committee");
      }
    } catch (error) {
      toast.error(error?.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (id) => {
    setIsLoading(true);
    setstatusUpdateSuccess(false);
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `${apiurl.mainUrl}/member/approve/${id}`;
      const payload = { id };
      const result = await patchData(url, payload, config);
      if (result?.success === true) {
        setstatusUpdateSuccess(true);
        toast.success(result?.message);
      }
      if (result?.success === false) {
        toast.error(result?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleBlock = async (id) => {
    setIsLoading(true);
    setUserBlockSuccess(false);
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `${apiurl.mainUrl}/member/status/${id}`;
      const payload = { id };
      const result = await patchData(url, payload, config);
      if (result?.success === true) {
        setUserUpdateSuccess(true);
        toast.success(result?.message);
      }
      if (result?.success === false) {
        toast.error(result?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };
  // Update data
  const handleResetPass = async (id) => {
    setIsLoading(true);
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${apiurl.mainUrl}/member/reset-pass`;
    const payload = { id: id };

    try {
      const result = await patchData(url, payload, config);
      if (result?.success) {
        setNameUpdateSuccess(true);
        toast.success("Password Reset successfully");
      } else {
        toast.error(result?.message || "Failed to Reset password");
      }
    } catch (error) {
      toast.error(error?.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    handleStatusUpdate,
    handleUserUpdate,
    handleBlock,
    pagination,
    handleResetPass,
  };
};

export default useUser;
