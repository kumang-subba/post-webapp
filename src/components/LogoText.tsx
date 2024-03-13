import { motion } from "framer-motion";

const svgVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};
const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};
function LogoText() {
  return (
    <motion.svg
      width={"60"}
      height={"100"}
      viewBox="-70 -100 100 200"
      variants={svgVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.path
        d="
      M -80 30
      L -80 -30
      C -80 -50 -30 -30 -75 0
      "
        strokeWidth={"5px"}
        variants={pathVariants}
        strokeLinecap="round"
        fill={"none"}
        className="stroke-green-600"
      />
      <motion.path
        d="
      M -50 30
      C -70 30 -70 0 -50 -10
      C -10 -15 -40 30 -50 30
      "
        strokeWidth={"5px"}
        strokeLinecap="round"
        variants={pathVariants}
        fill={"none"}
        className="stroke-green-600"
      />
      <motion.path
        d="
      M 0 -10
      C -30 -10 -30 10 -10 10
      C 0 10 0 30 -30 30
      "
        strokeWidth={"5px"}
        strokeLinecap="round"
        variants={pathVariants}
        fill={"none"}
        className="stroke-green-600"
      />
      <motion.path
        d="
        M 5 -20
        C 5 -25 10 -40 10 -10
        L 0 -8
        L 20 -10
        L 10 -10
        C 5 30 10 40 15 20
      "
        strokeWidth={"5px"}
        strokeLinecap="round"
        variants={pathVariants}
        fill={"none"}
        className="stroke-green-600"
      />
    </motion.svg>
  );
}

export default LogoText;
