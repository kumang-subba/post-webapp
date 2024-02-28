import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { useLocationContext } from "../providers/LocationContext";
import EditorOutput from "./EditorOutput";
import { User } from "lucide-react";
type GridPostProps = {
  id: number;
  title: string;
  content: string;
  coverImage: string;
  extraClasses: string;
  categories: string[];
  author: string;
  authorImg?: string;
};

const GridPost = ({
  id,
  title,
  content,
  coverImage,
  extraClasses,
  categories,
  author,
  authorImg,
}: GridPostProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { backgroundLocation, setBackgroundLocation } = useLocationContext();
  const handleNavigation = (id: number) => {
    document.body.style.overflow = "hidden";
    if (!backgroundLocation) {
      setBackgroundLocation(location);
    }
    navigate(`/post/${id}`);
  };

  return (
    <motion.div
      layoutId={id.toString()}
      className={cn(
        "flex flex-col gap-2  bg-gray-200  dark:bg-slate-600 dark:shadow-slate-900 shadow-lg shadow-gray-400 rounded-lg cursor-pointer group max-h-96 overflow-clip",
        extraClasses
      )}
      onClick={() => handleNavigation(id)}
      transition={{ type: "spring", duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <img
        src={coverImage}
        className="w-full h-60 object-cover scale-100 group-hover:scale-110 transition-all duration-300"
      />

      <div className="p-5">
        <h1 className="text-3xl font-bold tracking-wide line-clamp-1">
          {title}
        </h1>
        {categories.map((c, index) => (
          <Link
            key={index}
            to={`/?category=${c}`}
            onClick={(e) => e.stopPropagation()}
            className="underline mr-0.5"
          >
            #{c}
          </Link>
        ))}
        <div className="flex items-center gap-2 py-1">
          <picture>
            {authorImg ? (
              <img
                className="w-10 h-10 object-cover rounded-full object-top"
                src={authorImg}
              />
            ) : (
              <User className="w-10 h-10" />
            )}
          </picture>
          <span className="capitalize text-lg font-medium">{author}</span>
        </div>
        <EditorOutput content={content} />
      </div>
    </motion.div>
  );
};

export default GridPost;
