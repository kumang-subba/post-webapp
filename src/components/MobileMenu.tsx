import { motion, useCycle } from "framer-motion";
import { useRef } from "react";
import { useDimensions } from "../lib/useDimensions";
import { MobileMenuToggle } from "./MobileMenuToggle";
import { MobileSideBar } from "./MobileSidebar";
const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(20px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};
const MobileMenu = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav
      className="fixed top-0 bottom-0 left-0 w-[300px] md:hidden -z-10"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div
        className="absolute inset-0 w-[300px] bg-gray-200 dark:bg-slate-600"
        variants={sidebar}
      />
      <MobileSideBar />
      <MobileMenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};

export default MobileMenu;
