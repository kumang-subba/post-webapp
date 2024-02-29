import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocationContext } from "../providers/LocationContext";
import { usePostsContext } from "../providers/PostsContext.ts";
import Post from "./Post";

const SinglePostModal = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { backgroundLocation, setBackgroundLocation } = useLocationContext();
  const { posts } = usePostsContext();
  const handleOutsideClick = () => {
    document.body.style.overflow = "auto";
    if (backgroundLocation) {
      setBackgroundLocation(null);
      navigate(backgroundLocation);
    }
  };
  const currentPost = posts.find((post) => post.id === Number(params.id));
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
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              e.stopPropagation()
            }
            layoutId={params.id}
            transition={{ duration: 0.3, type: "spring", ease: "easeOut" }}
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
