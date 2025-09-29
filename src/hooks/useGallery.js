import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import fetchData from "../utils/fetchData";
import postData from "../utils/postData";
import deleteData from "../utils/deleteData";
import toast from "react-hot-toast";
import apiurl from "../apiurl/apiurl";

const useGallery = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageCreateSucces, setImageCreateSucces] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // fetching data
  useEffect(() => {
    const url = `${apiurl.mainUrl}/gallary`;
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
  }, [imageCreateSucces, deleteSuccess]);

  // create  data
  const handleImageCreate = async (FormData) => {
    setIsLoading(true);
    setImageCreateSucces(false);
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${apiurl.mainUrl}/gallary`;

    try {
      const result = await postData(url, FormData, config);
      if (result?.success === true) {
        setImageCreateSucces(true);
        toast.success("Image Created Succesfully");
      }
      if (result?.success === false) {
        toast.error(result?.message);
      }

      if (result.success === false) {
        toast.error(result?.message);
      }
    } catch (error) {
      toast.error(error?.message);
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
      const url = `${apiurl.mainUrl}/gallary/delete/${id}`;
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
    handleDelete,
    handleImageCreate,
  };
};

export default useGallery;
