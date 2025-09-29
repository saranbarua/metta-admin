/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import { SubMenuDropdown } from "./SubMenuDropdown";

const variants = {
  open: { opacity: 1, height: "auto" },
  closed: { opacity: 0, height: 0 },
};

const transition = {
  duration: 0.3,
  ease: "easeInOut",
};

export const FrammerComponent = ({ isOpen, items, setIsActive, isActive }) => {
  return (
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
              <SubMenuDropdown
                name={item?.name}
                key={i}
                icon={item?.icon}
                items={item?.submenu}
                setIsActive={setIsActive}
                isActive={isActive}
              />
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};
