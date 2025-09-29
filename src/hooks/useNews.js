import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import fetchData from "../utils/fetchData";
import toast from "react-hot-toast";
import apiurl from "../apiurl/apiurl";
import postData from "../utils/postData";
import deleteData from "../utils/deleteData";

const useNews = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newsCreateSuccess, setNewsCreateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // fetching data
  useEffect(() => {
    const url = `${apiurl.mainUrl}/news-event/news`;
    const fetchDataFromApi = async () => {
      setIsLoading(true);
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const result = await fetchData(url, config);
        if (result?.success === true) {
          setData(result?.data);
        }
        if (result?.success === false) {
          toast.error(result?.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataFromApi();
  }, [newsCreateSuccess, deleteSuccess]);

  const handleNewsCreate = async (formData) => {
    setIsLoading(true);
    setNewsCreateSuccess(false);
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${apiurl.mainUrl}/news-event`;

    try {
      const result = await postData(url, formData, config);
      if (result?.success) {
        setNewsCreateSuccess(true);
        toast.success("Created Successfully");
      } else {
        toast.error(result?.message || "An error occurred");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to create image");
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
      const url = `${apiurl.mainUrl}/news-event/delete/${id}`;
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
    handleNewsCreate,
    handleDelete,
  };
};

export default useNews;
