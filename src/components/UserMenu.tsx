import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { LogOutIcon, SettingsIcon, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../providers/AuthContext";

const UserMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { currentUser, setCurrentUser } = useAuthContext();
  const handleLogout = async () => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/logout`,
      {},
      {
        headers: {
          Cookie: "",
        },
      }
    );
    setCurrentUser(null);
  };
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative px-4 py-1 text-lg font-medium transition-colors duration-[400ms] hover:text-green-600 mr-4 flex gap-1 cursor-pointer"
    >
      <span className="flex gap-2">
        {currentUser?.image ? (
          <img
            src={currentUser?.image}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <User />
        )}
        {currentUser?.username}
      </span>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-0 top-10 bg-white dark:bg-slate-400 text-black z-10 rounded-md"
          >
            <div className="w-full shadow-xl px-2 py-2">
              <Link
                to="/profile"
                className="px-4 py-1 text-lg font-medium transition-colors duration-[400ms] hover:text-indigo-600 flex gap-2"
              >
                <SettingsIcon />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-1 text-lg font-medium transition-colors duration-[400ms] hover:text-rose-600 flex gap-2"
              >
                <LogOutIcon />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
