import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import fetchData from "../utils/fetchData";
import postData from "../utils/postData";
import toast from "react-hot-toast";
import apiurl from "../apiurl/apiurl";
import deleteData from "../utils/deleteData";
import patchData from "../utils/patchData";

const useFee = (searchQuery = "", limit = 3, page = 1, status = "") => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [feeCreateSuccess, setFeeCreateSuccess] = useState(false);
  const [feeUpdateSuccess, setFeeUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // Fetching data
  useEffect(() => {
    const fetchDataFromApi = async () => {
      setFeeCreateSuccess(false);
      setFeeUpdateSuccess(false);
      setDeleteSuccess(false);
      setIsLoading(true);
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // const url = `${apiurl.mainUrl}/subscription`;
      const url = `${apiurl.mainUrl}/subscription?search=${searchQuery}&limit=${limit}&page=${page}&status=${status}`;

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
    feeCreateSuccess,
    feeUpdateSuccess,
    deleteSuccess,
    searchQuery,
    limit,
    page,
    status,
  ]);

  // Create data
  const handleFeeCreate = async (data) => {
    setIsLoading(true);
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${apiurl.mainUrl}/subscription`;

    try {
      const result = await postData(url, data, config);
      if (result?.success) {
        setFeeCreateSuccess(true);
        toast.success("Fee created successfully");
      } else {
        toast.error(result?.message || "Failed to create year");
      }
    } catch (error) {
      toast.error(error?.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Update data
  const handleStatusUpdate = async (id, status) => {
    setIsLoading(true);
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${apiurl.mainUrl}/subscription/update/${id}`;
    const payload = { id, status };
    try {
      const result = await patchData(url, payload, config);
      if (result?.success) {
        setFeeUpdateSuccess(true);
        toast.success("Status updated successfully");
      } else {
        toast.error(result?.message || "Failed to update year");
      }
    } catch (error) {
      toast.error(error?.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    setDeleteSuccess(false);
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const url = `${apiurl.mainUrl}/subscription/delete/${id}`;
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
      setIsLoading(false);
    }
  };
  return {
    data,
    isLoading,
    handleFeeCreate,
    pagination,
    handleDelete,
    handleStatusUpdate,
  };
};

export default useFee;
