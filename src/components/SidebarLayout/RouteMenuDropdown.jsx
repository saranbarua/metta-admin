/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

const variants = {
  open: { opacity: 1, height: "auto" },
  closed: { opacity: 0, height: 0 },
};

const transition = {
  duration: 0.3,
  ease: "easeInOut",
};

export const RouteMenuDropdown = ({ name, icon, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();
  const routeName = location.pathname;

  function findMatchingPath(data, pathname) {
    for (const item of data) {
      if (item.path === pathname) {
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
      <div className="ms-4 my-2">
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial="closed"
              animate="open"
              exit="closed"
              variants={variants}
              transition={transition}
            >
              {items.map((item, i) => (
                <Link
                  key={i}
                  to={item?.path}
                  className={`text-gray-200 font-semibold w-full ${
                    routeName === item?.path ? `bg-[#1D267D]` : ""
                  }  block py-1`}
                >
                  <FontAwesomeIcon icon={item?.icon} className="mx-3" />
                  {item?.name}
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
