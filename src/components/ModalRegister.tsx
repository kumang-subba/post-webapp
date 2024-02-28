import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLocationContext } from "../providers/LocationContext";
import SignUp from "./SignUp";
const modalVariants = {
  hidden: {
    opacity: 0,
    x: "-50%",
    y: 0,
  },
  visible: {
    opacity: 1,
    y: "-50%",
  },
};
const ModalRegister = () => {
  const navigate = useNavigate();
  const { backgroundLocation, setBackgroundLocation } = useLocationContext();
  const handleOutsideClick = () => {
    if (backgroundLocation) {
      setBackgroundLocation(null);
      navigate(backgroundLocation);
    }
  };

  return (
    <>
      <div
        className="bg-slate-900/20 fixed inset-0 z-50 flex"
        onClick={handleOutsideClick}
      ></div>
      <motion.div
        variants={modalVariants}
        key={"modal"}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, y: 0, transition: { duration: 0.2 } }}
        className="fixed z-50 top-[50%] left-[50%]"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <SignUp />
      </motion.div>
    </>
  );
};

export default ModalRegister;
