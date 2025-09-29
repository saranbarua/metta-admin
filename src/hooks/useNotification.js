import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import fetchData from "../utils/fetchData";
import postData from "../utils/postData";
import toast from "react-hot-toast";
import apiurl from "../apiurl/apiurl";

const useNotification = () => {
  const [data, setData] = useState([]);
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
      const url = `${apiurl.mainUrl}/notification`;

      try {
        const result = await fetchData(url, config);
        if (result?.success) {
          setData(result?.data || []);
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
  }, [nameCreateSuccess, nameUpdateSuccess]);

  // Create data
  const handleNotiCreate = async (title, body) => {
    setIsLoading(true);
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${apiurl.mainUrl}/notification/push`;
    const payload = { title, body };

    try {
      const result = await postData(url, payload, config);
      if (result?.success) {
        setNameCreateSuccess(true);
        toast.success("Notification Sent successfully");
      } else {
        toast.error(result?.message || "Failed to sent Notification");
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
    handleNotiCreate,
  };
};

export default useNotification;
