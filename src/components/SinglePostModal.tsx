import axios from "axios";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocationContext } from "../providers/LocationContext";
import { Post as PostType } from "../types/postType.ts";
import Post from "./Post";

const SinglePostModal = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { backgroundLocation, setBackgroundLocation } = useLocationContext();
  const handleOutsideClick = () => {
    document.body.style.overflow = "auto";
    if (backgroundLocation) {
      setBackgroundLocation(null);
      navigate(backgroundLocation);
    }
  };

  const [currentPost, setCurrentPost] = useState<
    PostType & {
      created_at: string;
      updated_at: string;
    }
  >();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/posts/${params.id}`
        );
        setCurrentPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [params.id]);
  const categories = currentPost?.categories.split(",");

  return (
    <AnimatePresence>
      {currentPost && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center px-16 md:px-32"
          onClick={handleOutsideClick}
        >
          <motion.div
            className="flex w-full h-5/6 gap-5 bg-gray-200 dark:bg-slate-600 dark:shadow-slate-900 shadow-lg shadow-gray-400 rounded-lg relative"
            layoutId={params.id}
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              e.stopPropagation()
            }
            transition={{ duration: 5, type: "spring", ease: "easeOut" }}
          >
            <Post
              img={currentPost?.coverImage}
              title={currentPost?.title}
              content={JSON.parse(currentPost?.content)}
              author={currentPost?.author}
              authorImg={currentPost?.authorImg}
              created={format(
                new Date(currentPost?.created_at),
                "MMMM dd, yyyy"
              )}
              updated={format(
                new Date(currentPost?.updated_at),
                "MMMM dd, yyyy"
              )}
              categories={categories!}
            />
            <button
              className="absolute right-3 top-3 rounded-full bg-gray-300 p-1.5 hover:bg-gray-400 transition-all dark:bg-slate-700 dark:hover:bg-slate-800"
              onClick={handleOutsideClick}
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SinglePostModal;
