import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import fetchData from "../utils/fetchData";
import toast from "react-hot-toast";
import apiurl from "../apiurl/apiurl";
import patchData from "../utils/patchData";

const useAdmin = () => {
  const [adminData, setAdminData] = useState([]);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const [adminStatus, setAdminStatus] = useState(false);

  // fetching data
  useEffect(() => {
    const url = `${apiurl.mainUrl}/admin`;

    const fetchDataFromApi = async () => {
      setIsAdminLoading(true);
      setAdminStatus(false);
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const result = await fetchData(url, config);
        if (result?.success === true) {
          setAdminData(result?.data);
        }
        if (result?.success === false) {
          toast.error(result?.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsAdminLoading(false);
      }
    };
    fetchDataFromApi();
  }, [adminStatus]);

  const handleStatusChange = async (id) => {
    setIsAdminLoading(true);
    setAdminStatus(false);
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `${apiurl.mainUrl}/admin/status/${id}`;
      const payload = { id };
      const result = await patchData(url, payload, config);
      if (result?.success === true) {
        setAdminStatus(true);
        toast.success(result?.message);
      }
      if (result?.success === false) {
        toast.error(result?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsAdminLoading(false);
    }
  };
  return {
    adminData,
    isAdminLoading,
    handleStatusChange,
  };
};

export default useAdmin;
