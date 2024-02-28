import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

type RecommendedPostProps = {
  img: string;
  title: string;
  id: number;
};

const RecommendedPost = ({ img, title, id }: RecommendedPostProps) => {
  const navigate = useNavigate();
  const handleNavigation = (id: number) => {
    document.body.style.overflow = "hidden";
    navigate(`/post/${id}`);
  };
  return (
    <motion.div
      className="w-full relative cursor-pointer"
      whileHover={{ scale: 1.05 }}
      onClick={() => handleNavigation(id)}
    >
      <img src={img} className="h-24 w-full object-cover" />
      <h2 className="absolute left-5 top-2 bg-white/40 dark:bg-slate-700/40 backdrop-blur-lg px-1 text-2xl font-bold max-w-[50%] line-clamp-2">
        {title}
      </h2>
    </motion.div>
  );
};

export default RecommendedPost;
