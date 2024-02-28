import { motion } from "framer-motion";
const svgVariants = {
  hidden: {
    rotate: -360,
  },
  visible: {
    rotate: 0,
    transition: { duration: 3, staggerChildren: 0.5 },
  },
};
const shapeVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};
function Logo() {
  return (
    <motion.svg
      width={"50"}
      height={"100"}
      viewBox="-100 -100 200 200"
      variants={svgVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.circle
        cx="0"
        cy="0"
        r={40}
        className="fill-black dark:fill-white"
        variants={shapeVariants}
      />
      <motion.g variants={shapeVariants}>
        <circle
          cx="0"
          cy="-70"
          r={15}
          className="stroke-gray-900 dark:stroke-gray-100 dark:fill-white"
        />
        <rect
          x="-7"
          y="-60"
          width="15"
          height="10"
          rx={1}
          ry={1}
          className="stroke-gray-900 dark:stroke-gray-100 dark:fill-white"
        />
      </motion.g>
      <motion.g variants={shapeVariants} transform="rotate(72)">
        <circle
          cx="0"
          cy="-70"
          r={15}
          className="stroke-gray-900 dark:stroke-gray-100 dark:fill-white"
        />
        <rect
          x="-7"
          y="-60"
          width="15"
          height="10"
          rx={1}
          ry={1}
          className="stroke-gray-900 dark:stroke-gray-100 dark:fill-white"
        />
      </motion.g>
      <motion.g variants={shapeVariants} transform="rotate(-72)">
        <circle
          cx="0"
          cy="-70"
          r={15}
          className="stroke-gray-900 dark:stroke-gray-100 dark:fill-white"
        />
        <rect
          x="-7"
          y="-60"
          width="15"
          height="10"
          rx={1}
          ry={1}
          className="stroke-gray-900 dark:stroke-gray-100 dark:fill-white"
        />
      </motion.g>
      <motion.g variants={shapeVariants} transform="rotate(-144)">
        <circle
          cx="0"
          cy="-70"
          r={15}
          className="stroke-gray-900 dark:stroke-gray-100 dark:fill-white"
        />
        <rect
          x="-7"
          y="-60"
          width="15"
          height="10"
          rx={1}
          ry={1}
          className="stroke-gray-900 dark:stroke-gray-100 dark:fill-white"
        />
      </motion.g>
      <motion.g variants={shapeVariants} transform="rotate(144)">
        <circle
          cx="0"
          cy="-70"
          r={15}
          className="stroke-gray-900 dark:stroke-gray-100 dark:fill-white"
        />
        <rect
          x="-7"
          y="-60"
          width="15"
          height="10"
          rx={1}
          ry={1}
          className="stroke-gray-900 dark:stroke-gray-100 dark:fill-white"
        />
      </motion.g>
    </motion.svg>
  );
}

export default Logo;
