import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import fetchData from "../utils/fetchData";
import postData from "../utils/postData";
import toast from "react-hot-toast";
import apiurl from "../apiurl/apiurl";
import patchData from "../utils/patchData";

const useCommittee = (searchQuery = "", limit = 3, page = 1, status = "") => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [nameCreateSuccess, setNameCreateSuccess] = useState(false);
  const [nameUpdateSuccess, setNameUpdateSuccess] = useState(false);

  // Fetching data
  useEffect(() => {
    const fetchDataFromApi = async () => {
      setNameCreateSuccess(false);
      setNameUpdateSuccess(false);
      setIsLoading(true);
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = `${apiurl.mainUrl}/committee-year?search=${searchQuery}&limit=${limit}&page=${page}&status=${status}`;

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
  }, [limit, nameCreateSuccess, nameUpdateSuccess, page, searchQuery, status]);

  // Create data
  const handleYearCreate = async (name) => {
    setIsLoading(true);
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${apiurl.mainUrl}/committee-year`;
    const payload = { name };

    try {
      const result = await postData(url, payload, config);
      if (result?.success) {
        setNameCreateSuccess(true);
        toast.success("Year created successfully");
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
  const handleYearUpdate = async (id, name, status) => {
    setIsLoading(true);
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${apiurl.mainUrl}/committee-year/update/${id}`;
    const payload = { id, name, status };

    try {
      const result = await patchData(url, payload, config);
      if (result?.success) {
        setNameUpdateSuccess(true);
        toast.success("Year updated successfully");
      } else {
        toast.error(result?.message || "Failed to update year");
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
    handleYearCreate,
    pagination,
    handleYearUpdate,
  };
};

export default useCommittee;
