import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import ModalLogin from "./components/ModalLogin";
import ModalRegister from "./components/ModalRegister";
import SinglePostModal from "./components/SinglePostModal";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import { useLocationContext } from "./providers/LocationContext";
import PrivateRoutes from "./components/PrivateRoutes";
import Profile from "./pages/Profile";

function App() {
  const location = useLocation();
  const { backgroundLocation: background } = useLocationContext();
  return (
    <div className="bg-gray-100 flex flex-col min-h-screen text-gray-900 dark:bg-slate-700 dark:text-white transition-[background-color] antialiased">
      <Routes
        location={background || location}
        key={background?.pathname || location.pathname}
      >
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/create" element={<CreatePost />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
      <AnimatePresence mode="wait">
        {background && (
          <Routes location={location} key={background.pathname}>
            <Route path="/login" element={<ModalLogin />} />
            <Route path="/register" element={<ModalRegister />} />
            <Route path="/post/:id" element={<SinglePostModal />} />
          </Routes>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
