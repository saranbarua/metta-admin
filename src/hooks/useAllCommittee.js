import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import fetchData from "../utils/fetchData";
import postData from "../utils/postData";
import toast from "react-hot-toast";
import apiurl from "../apiurl/apiurl";
import patchData from "../utils/patchData";
import deleteData from "../utils/deleteData";

const useAllCommittee = (searchQuery = "", limit = 3, page = 1) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [nameCreateSuccess, setNameCreateSuccess] = useState(false);
  const [nameUpdateSuccess, setNameUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // Fetching data
  useEffect(() => {
    const fetchDataFromApi = async () => {
      setNameCreateSuccess(false);
      setNameUpdateSuccess(false);
      setDeleteSuccess(false);
      setIsLoading(true);
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = `${apiurl.mainUrl}/committee?search=${searchQuery}&limit=${limit}&page=${page}`;

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
    nameCreateSuccess,
    nameUpdateSuccess,
    deleteSuccess,
    searchQuery,
    limit,
    page,
  ]);

  const handleCommitteeCreate = async (formData) => {
    setIsLoading(true);
    setNameCreateSuccess(false);
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${apiurl.mainUrl}/committee`;

    try {
      const result = await postData(url, formData, config);
      if (result?.success) {
        setNameCreateSuccess(true);
        toast.success("Committee Created Successfully");
      } else {
        toast.error(result?.message || "An error occurred");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to create Committee");
    } finally {
      setIsLoading(false);
    }
  };

  // Update data
  const handleCommitteeUpdate = async (FormData, id) => {
    setIsLoading(true);
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${apiurl.mainUrl}/committee/update/${id}`;

    try {
      const result = await patchData(url, FormData, config);
      if (result?.success) {
        setNameUpdateSuccess(true);
        toast.success("Committee updated successfully");
      } else {
        toast.error(result?.message || "Failed to update Committee");
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
      const url = `${apiurl.mainUrl}/committee/delete/${id}`;
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
    pagination,
    isLoading,
    handleCommitteeCreate,
    handleCommitteeUpdate,
    handleDelete,
  };
};

export default useAllCommittee;
