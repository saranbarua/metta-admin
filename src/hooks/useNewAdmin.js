import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import apiurl from "../apiurl/apiurl";

const useAddNewAdmin = () => {
  const [Message, setMessage] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [accountType, setAccountType] = useState("");

  const handleOptionChange = (event) => {
    setAccountType(event.target.value);
  };
  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    if (password === cPassword) {
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${apiurl.mainUrl}/admin/create`,
          {
            username: username.toLocaleLowerCase(),
            password,
            cPassword,
            accountType: accountType,
          },
          config
        );
        setMessage(response.data.message);
        e.target.reset();
        setIsLoading(false);
      } catch (error) {
        alert("Server error");
        setIsLoading(false);
      }
    } else {
      setMessage("Password doesn't match");
    }
  };

  return {
    setUsername,
    password,
    setPassword,
    cPassword,
    setCPassword,
    handleAddNewAdmin,
    Message,
    IsLoading,
    accountType,
    handleOptionChange,
  };
};

export default useAddNewAdmin;
