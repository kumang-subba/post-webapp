import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CategoryMenuItem } from "../types/categoryTypes";

type CategoryMenuProps = {
  options: CategoryMenuItem[];
  onSelect: (value: CategoryMenuItem) => void;
  errors?: string;
};
const tickVariants = {
  rest: {
    pathLength: 0,
    transition: {
      delay: 1,
    },
  },
  hover: {
    pathLength: 1,
    transition: {
      delay: 1,
    },
  },
};
const CategoryMenu = ({ options, onSelect, errors }: CategoryMenuProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const checkedItems = options.filter((x) => x.checked);
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative px-4 bg-gray-300 dark:bg-slate-600 rounded-lg py-2"
    >
      <span className="flex items-center flex-1 min-w-48 cursor-default gap-2 relative">
        {checkedItems.length ? (
          checkedItems.map((option) => (
            <button
              key={option.label}
              className="px-2 py-1 border rounded-lg border-gray-400 capitalize"
              type="button"
              onClick={() => onSelect(option)}
            >
              &times; {option.label}
            </button>
          ))
        ) : (
          <>
            <span className="p-1 relative">
              Select categories
              {errors && (
                <div className="absolute -right-1/2 -top-5 translate-x-[110%] bg-slate-200 dark:bg-slate-400 z-10 rounded-md">
                  <div className="absolute left-0 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2  rotate-45 -z-10 bg-slate-200 dark:bg-slate-400" />
                  <div className="text-rose-600 dark:text-red-900 font-medium px-2 py-1">
                    {errors}
                  </div>
                </div>
              )}
            </span>
          </>
        )}
      </span>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-0 top-14 bg-white dark:bg-slate-400 text-black z-10 rounded-md"
          >
            <div className="w-52 shadow-xl">
              {options.map((option) => (
                <motion.div
                  key={option.label}
                  className="flex hover:bg-slate-500 px-2 py-1 cursor-pointer items-center"
                  initial={option.checked ? "hover" : "rest"}
                  animate={option.checked ? "hover" : "rest"}
                  onClick={() => onSelect(option)}
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="10 0 50 50"
                  >
                    <motion.path
                      strokeWidth={option.checked ? "5" : "0"}
                      fill={"none"}
                      className="stroke-green-500"
                      d="M14,26 L 22,33 L 35,16"
                      strokeDasharray="0 1"
                      variants={tickVariants}
                    />
                    <motion.path
                      fill="none"
                      strokeWidth="5"
                      className={"stroke-rose-600"}
                      d="M17,17 L33,33"
                      strokeDasharray="0 1"
                      variants={{
                        hover: {
                          pathLength: 0,
                          transition: {
                            delay: 0.5,
                          },
                        },
                        rest: {
                          pathLength: 1,
                          transition: {
                            delay: 0.5,
                          },
                        },
                      }}
                    />
                    <motion.path
                      fill="none"
                      strokeWidth="5"
                      className={"stroke-rose-600"}
                      d="M33,17 L17,33"
                      strokeDasharray="0 1"
                      variants={{
                        hover: {
                          pathLength: 0,
                        },
                        rest: {
                          pathLength: 1,
                        },
                      }}
                    />
                  </motion.svg>
                  <span className="font-medium dark:text-gray-50 capitalize">
                    {option.label}
                  </span>
                </motion.div>
              ))}
              <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 -z-10 bg-white dark:bg-slate-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryMenu;
