import { motion } from "framer-motion";
import { PenToolIcon, UserRoundIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Location, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { useAuthContext } from "../providers/AuthContext";
import { useLocationContext } from "../providers/LocationContext";
import Logo from "./Logo";
import LogoText from "./LogoText";
import ThemeSwitcher from "./ThemeSwitcher";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

const navVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delay: 0.5,
    },
  },
};
const linkVariants = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};
const MotionLink = motion(Link);
const NavBar = () => {
  const location: Location = useLocation();
  const { setBackgroundLocation } = useLocationContext();
  const [isTop, setIsTop] = useState<boolean>(true);
  const { currentUser } = useAuthContext();
  const canOpenModal =
    location.pathname !== "/login" &&
    location.pathname !== "/register" &&
    location.pathname !== "/profile";
  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={cn(
        "flex items-center fixed w-full px-8 md:px-16 lg:px-32 z-50 transition-all bg-gradient-to-b from-gray-50/75 to-gray-100 dark:from-slate-800/75 dark:to-slate-700",
        isTop ? "h-20" : "h-16"
      )}
    >
      <MobileMenu />
      <Link to="/" className="ml-10 md:ml-0 flex cursor-pointer">
        <Logo />
        <LogoText />
      </Link>
      <div className="flex-1 lg:flex-grow-0" />
      <motion.nav
        className="gap-2 lg:gap-4 px-5 font-medium text-lg lg:text-xl lg:tracking-wider basis-full hidden md:flex"
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <MotionLink
          to="/?category=technology"
          variants={linkVariants}
          className="hover:text-green-600 transition-colors hover:duration-300 relative group"
        >
          Technology
          <span className="absolute bottom-0 -left-1 -right-1 h-[2px] origin-left scale-x-0 rounded-full bg-green-600 transition-transform duration-300 ease-out scale-0 group-hover:scale-100" />
        </MotionLink>
        <MotionLink
          to="/?category=gaming"
          variants={linkVariants}
          className="hover:text-green-600 transition-colors hover:duration-300 relative group"
        >
          Gaming
          <span className="absolute bottom-0 -left-1 -right-1 h-[2px] origin-left scale-x-0 rounded-full bg-green-600 transition-transform duration-300 ease-out scale-0 group-hover:scale-100" />
        </MotionLink>
        <MotionLink
          to="/?category=food"
          variants={linkVariants}
          className="hover:text-green-600 transition-colors hover:duration-300 relative group"
        >
          Food
          <span className="absolute bottom-0 -left-1 -right-1 h-[2px] origin-left scale-x-0 rounded-full bg-green-600 transition-transform duration-300 ease-out scale-0 group-hover:scale-100" />
        </MotionLink>
        <MotionLink
          to="/?category=science"
          variants={linkVariants}
          className="hover:text-green-600 transition-colors hover:duration-300 relative group"
        >
          Science
          <span className="absolute bottom-0 -left-1 -right-1 h-[2px] origin-left scale-x-0 rounded-full bg-green-600 transition-transform duration-300 ease-out scale-0 group-hover:scale-100" />
        </MotionLink>
        <MotionLink
          to="/?category=fitness"
          variants={linkVariants}
          className="hover:text-green-600 transition-colors hover:duration-300 relative group"
        >
          Fitness
          <span className="absolute bottom-0 -left-1 -right-1 h-[2px] origin-left scale-x-0 rounded-full bg-green-600 transition-transform duration-300 ease-out scale-0 group-hover:scale-100" />
        </MotionLink>
      </motion.nav>
      {currentUser && (
        <>
          <Link
            to="create"
            className="group relative bg-green-400 hover:bg-green-300 dark:bg-green-800 dark:hover:bg-green-900 px-4 py-1 text-lg font-medium transition-colors duration-[400ms] mr-2 flex gap-1"
          >
            <PenToolIcon />
            <span>Write</span>
          </Link>
        </>
      )}
      {currentUser ? (
        <UserMenu />
      ) : (
        canOpenModal && (
          <Link
            to="/login"
            onClick={() => setBackgroundLocation(location)}
            className="group relative lg:px-2 py-1 text-base lg:text-lg font-medium transition-colors duration-[400ms] hover:text-green-600 mr-2 flex gap-1 justify-center items-center"
          >
            <UserRoundIcon className="w-4 h-4 lg:w-6 lg:h-6" />
            <span>Login</span>
            <span className="absolute left-0 top-0 h-[2px] w-0 bg-green-600 transition-all duration-100 group-hover:w-full" />
            <span className="absolute right-0 top-0 h-0 w-[2px] bg-green-600 transition-all delay-100 duration-100 group-hover:h-full" />
            <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-green-600 transition-all delay-200 duration-100 group-hover:w-full" />
            <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-green-600 transition-all delay-300 duration-100 group-hover:h-full" />
          </Link>
        )
      )}

      <ThemeSwitcher />
    </header>
  );
};

export default NavBar;
