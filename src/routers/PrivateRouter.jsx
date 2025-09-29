import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SidebarLayout from "../components/SidebarLayout/SidebarLayout";

export default function PrivateRouter() {
  const { isLoggedIn } = useSelector((state) => state.login);
  return isLoggedIn ? <SidebarLayout /> : <Navigate to="/login" />;
}
