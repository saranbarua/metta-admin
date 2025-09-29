/* eslint-disable react/prop-types */
import { Link, Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faImage,
  faInfo,
  faMoneyBill,
  faPeopleCarry,
  faTimes,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../Header/Header";
import { useState } from "react";
import Button from "../Button/Button";
import logo from "../../assets/images/logo.png";
import useRouterData from "../../hooks/useRouterData";
import { SubMenuDropdown } from "./SubMenuDropdown";
import { useSelector } from "react-redux";
import {
  faBuilding,
  faNewspaper,
  faUser,
} from "@fortawesome/free-regular-svg-icons";

export default function SidebarLayout() {
  const [showSidebar, setShowSidebar] = useState(true);
  const location = useLocation();
  const routeName = location.pathname;
  const { List, Committee } = useRouterData();
  const { accountType } = useSelector((state) => state.login);
  return (
    <section className="w-full mx-auto">
      <div className="flex">
        <div
          className={`bg-[#4a5e6b] h-screen ${
            showSidebar
              ? "lg:w-[25%] w-[80%] lg:static z-20 fixed left-0"
              : "hidden lg:w-[25%] lg:block"
          }  overflow-y-auto custom-scroll`}
        >
          <div className="flex justify-between mx-3 py-3">
            <Link to={"/"} className="text-blue-400 font-bold text-3xl">
              <img src={logo} className="w-[120px] h-[100px]" />
            </Link>
            <Button
              onClick={() => setShowSidebar(!showSidebar)}
              className={"shadow rounded-md lg:hidden"}
              name={
                <FontAwesomeIcon
                  icon={faTimes}
                  className="p-3 text-[20px] text-white"
                />
              }
            />
          </div>
          <Link
            to="/"
            className={`text-gray-200 font-semibold  w-full ${
              routeName === "/" ? `bg-[#1D267D]` : ""
            }  block py-1`}
          >
            <FontAwesomeIcon icon={faBookmark} className="mx-3" />
            Dashboard
          </Link>
          <Link
            to="/users"
            className={`text-gray-200 font-semibold  w-full ${
              routeName === "/users" ? `bg-[#1D267D]` : ""
            }  block py-1`}
          >
            <FontAwesomeIcon icon={faUser} className="mx-3" />
            Members
          </Link>
          <Link
            to="/gallery"
            className={`text-gray-200 font-semibold  w-full ${
              routeName === "/gallery" ? `bg-[#1D267D]` : ""
            }  block py-1`}
          >
            <FontAwesomeIcon icon={faImage} className="mx-3" />
            Gallery
          </Link>
          <Link
            to="/notification"
            className={`text-gray-200 font-semibold  w-full ${
              routeName === "/notification" ? `bg-[#1D267D]` : ""
            }  block py-1`}
          >
            <FontAwesomeIcon icon={faInfo} className="mx-3" />
            Send Notification
          </Link>
          <Link
            to="/all-fee"
            className={`text-gray-200 font-semibold  w-full ${
              routeName === "/all-fee" ? `bg-[#1D267D]` : ""
            }  block py-1`}
          >
            <FontAwesomeIcon icon={faMoneyBill} className="mx-3" />
            All Subscription
          </Link>
          <SubMenuDropdown
            name={"News and events"}
            icon={faNewspaper}
            items={List}
          />
          <SubMenuDropdown
            name={"Committe"}
            icon={faBuilding}
            items={Committee}
          />

          {accountType === "admin" && (
            <Link
              to="/all-admin"
              className={`text-gray-200 font-semibold   w-full ${
                routeName === "/all-admin" ? `bg-[#1D267D]` : ""
              }  block py-1`}
            >
              <FontAwesomeIcon icon={faPeopleCarry} className="mx-3" />
              All Admin
            </Link>
          )}
          {accountType === "admin" && (
            <Link
              to="/addAdmin"
              className={`text-gray-200 font-semibold my-2 w-full ${
                routeName === "/addAdmin" ? `bg-[#1D267D]` : ""
              }  block py-1`}
            >
              <FontAwesomeIcon icon={faUserCheck} className="mx-3" />
              Add Admin
            </Link>
          )}
        </div>
        <div className="w-full h-screen overflow-y-auto custom-scroll">
          <Header setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
          <Outlet />
        </div>
      </div>
    </section>
  );
}
