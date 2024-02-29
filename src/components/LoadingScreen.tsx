import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};
const textPathVariants = {
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
const logoVariants = {
  hidden: {
    rotate: -360,
  },
  visible: {
    rotate: 0,
    transition: {
      duration: 3,
      staggerChildren: 0.5,
      repeat: Infinity,
    },
  },
};
const miniLogoVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};
const LoadingScreen = () => {
  return (
    <motion.div
      className="h-screen w-screen bg-slate-700 text-white flex justify-center items-center fixed z-[1000]"
      role="dialog"
      aria-modal="true"
      exit={{ y: 100, opacity: 0 }}
    >
      <motion.svg
        width={"100"}
        height={"200"}
        viewBox="-100 -100 200 200"
        variants={logoVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.circle
          cx="0"
          cy="0"
          r={40}
          className="fill-white"
          variants={miniLogoVariants}
        />
        <motion.g variants={miniLogoVariants}>
          <circle
            cx="0"
            cy="-70"
            r={15}
            className="stroke-gray-100 fill-white"
          />
          <rect
            x="-7"
            y="-60"
            width="15"
            height="10"
            rx={1}
            ry={1}
            className="stroke-gray-100 fill-white"
          />
        </motion.g>
        <motion.g variants={miniLogoVariants} transform="rotate(72)">
          <circle
            cx="0"
            cy="-70"
            r={15}
            className="stroke-gray-100 fill-white"
          />
          <rect
            x="-7"
            y="-60"
            width="15"
            height="10"
            rx={1}
            ry={1}
            className="stroke-gray-100 fill-white"
          />
        </motion.g>
        <motion.g variants={miniLogoVariants} transform="rotate(-72)">
          <circle
            cx="0"
            cy="-70"
            r={15}
            className="stroke-gray-100 fill-white"
          />
          <rect
            x="-7"
            y="-60"
            width="15"
            height="10"
            rx={1}
            ry={1}
            className="stroke-gray-100 fill-white"
          />
        </motion.g>
        <motion.g variants={miniLogoVariants} transform="rotate(-144)">
          <circle
            cx="0"
            cy="-70"
            r={15}
            className="stroke-gray-100 fill-white"
          />
          <rect
            x="-7"
            y="-60"
            width="15"
            height="10"
            rx={1}
            ry={1}
            className="stroke-gray-100 fill-white"
          />
        </motion.g>
        <motion.g variants={miniLogoVariants} transform="rotate(144)">
          <circle
            cx="0"
            cy="-70"
            r={15}
            className="stroke-gray-100 fill-white"
          />
          <rect
            x="-7"
            y="-60"
            width="15"
            height="10"
            rx={1}
            ry={1}
            className="stroke-gray-100 fill-white"
          />
        </motion.g>
      </motion.svg>
      <motion.svg
        width={"200"}
        height={"200"}
        viewBox="-100 -100 200 200"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
      >
        <motion.path
          d="
      M -80 30
      L -80 -30
      C -80 -50 -30 -30 -75 0
      "
          strokeWidth={"5px"}
          variants={textPathVariants}
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
          variants={textPathVariants}
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
          variants={textPathVariants}
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
          variants={textPathVariants}
          fill={"none"}
          className="stroke-green-600"
        />
      </motion.svg>
    </motion.div>
  );
};

export default LoadingScreen;
