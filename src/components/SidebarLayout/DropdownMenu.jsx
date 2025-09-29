/* eslint-disable react/prop-types */
import { useState } from "react";
import { FrammerComponent } from "./FrammerComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

export const DropdownMenu = ({ name, icon, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();
  const routeName = location.pathname;

  function findMatchingPath(data, pathname) {
    for (const item of data) {
      if (item.submenu) {
        const matchingSubmenu = findMatchingPath(item.submenu, pathname);
        if (matchingSubmenu) {
          return matchingSubmenu;
        }
      } else if (item.path === pathname) {
        return item.path;
      }
    }
    return null;
  }

  const matchingItem = findMatchingPath(items, routeName);

  return (
    <div className="my-2">
      <button
        type="button"
        onClick={toggleMenu}
        className={`text-gray-200 font-semibold flex justify-between items-center w-full ${
          matchingItem === routeName ? "bg-[#1D267D]" : ""
        } py-1`}
      >
        <div>
          <FontAwesomeIcon icon={icon} className="mx-3" />
          {name}
        </div>
        <FontAwesomeIcon
          icon={isOpen ? faChevronDown : faChevronLeft}
          className="text-[12px] me-3"
        />
      </button>
      <FrammerComponent isOpen={isOpen} items={items} />
    </div>
  );
};
