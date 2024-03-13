import { motion } from "framer-motion";
// @ts-expect-error i don't know the prop types for path
const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

export const MobileMenuToggle = ({ toggle }: { toggle: () => void }) => (
  <button
    onClick={toggle}
    className="absolute top-[18px] left-[29px] w-[50px] h-[50px] rounded-full"
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
        className="dark:stroke-white"
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
        className="dark:stroke-white"
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
        className="dark:stroke-white"
      />
    </svg>
  </button>
);
