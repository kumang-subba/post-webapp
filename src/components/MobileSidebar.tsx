import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};
const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};
export const MobileSideBar = ({
  isOpen,
  toggleOpen,
}: {
  isOpen: boolean;
  toggleOpen: () => void;
}) => {
  return (
    <motion.ul
      variants={variants}
      className={cn(
        "p-20  top-[100px] w-[230px] pointer-events-auto",
        isOpen ? "absolute" : "hidden"
      )}
    >
      <motion.li
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="mb-6"
        onClick={() => toggleOpen()}
      >
        <Link
          to="/?category=technology"
          className="hover:text-green-600 transition-colors hover:duration-300 relative group text-3xl"
        >
          Technology
          <span className="absolute bottom-0 -left-1 -right-1 h-[2px] origin-left scale-x-0 rounded-full bg-green-600 transition-transform duration-300 ease-out scale-0 group-hover:scale-100" />
        </Link>
      </motion.li>
      <motion.li
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="mb-6"
        onClick={() => toggleOpen()}
      >
        <Link
          to="/?category=gaming"
          className="hover:text-green-600 transition-colors hover:duration-300 relative group text-3xl"
        >
          Gaming
          <span className="absolute bottom-0 -left-1 -right-1 h-[2px] origin-left scale-x-0 rounded-full bg-green-600 transition-transform duration-300 ease-out scale-0 group-hover:scale-100" />
        </Link>
      </motion.li>
      <motion.li
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="mb-6"
        onClick={() => toggleOpen()}
      >
        <Link
          to="/?category=food"
          className="hover:text-green-600 transition-colors hover:duration-300 relative group text-3xl"
        >
          Food
          <span className="absolute bottom-0 -left-1 -right-1 h-[2px] origin-left scale-x-0 rounded-full bg-green-600 transition-transform duration-300 ease-out scale-0 group-hover:scale-100" />
        </Link>
      </motion.li>
      <motion.li
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="mb-6"
        onClick={() => toggleOpen()}
      >
        <Link
          to="/?category=science"
          className="hover:text-green-600 transition-colors hover:duration-300 relative group text-3xl"
        >
          Science
          <span className="absolute bottom-0 -left-1 -right-1 h-[2px] origin-left scale-x-0 rounded-full bg-green-600 transition-transform duration-300 ease-out scale-0 group-hover:scale-100" />
        </Link>
      </motion.li>
      <motion.li
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => toggleOpen()}
      >
        <Link
          to="/?category=fitness"
          className="hover:text-green-600 transition-colors hover:duration-300 relative group text-3xl"
        >
          Fitness
          <span className="absolute bottom-0 -left-1 -right-1 h-[2px] origin-left scale-x-0 rounded-full bg-green-600 transition-transform duration-300 ease-out scale-0 group-hover:scale-100" />
        </Link>
      </motion.li>
    </motion.ul>
  );
};
