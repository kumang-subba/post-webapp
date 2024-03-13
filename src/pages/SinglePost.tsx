import { format } from "date-fns";
import Post from "../components/Post";
import { usePostsContext } from "../providers/PostsContext";
import { Post as PostType } from "../types/postType";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SinglePost = () => {
  const location = useLocation();
  const [currentPost, setCurrentPost] = useState<PostType>();
  const categories = currentPost?.categories.split(",");
  const postId = location.pathname.split("/")[2];
  const { setLoading } = usePostsContext();
  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/posts/${postId}`
        );
        setCurrentPost(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSinglePost();
  }, [postId]);
  return (
    currentPost && (
      <main className="px-8 md:px-16 lg:px-32 pt-24 py-5 flex items-center justify-center">
        <div
          className="flex w-full gap-5 bg-gray-200 dark:bg-slate-600 dark:shadow-slate-900 shadow-lg shadow-gray-400 rounded-lg h-[83.3333vh]"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          <Post
            img={currentPost?.coverImage}
            title={currentPost?.title}
            content={JSON.parse(currentPost?.content)}
            author={currentPost?.author}
            authorImg={currentPost?.authorImg}
            created={format(new Date(currentPost?.created_at), "MMMM dd, yyyy")}
            updated={format(new Date(currentPost?.updated_at), "MMMM dd, yyyy")}
            categories={categories!}
          />
        </div>
      </main>
    )
  );
};

export default SinglePost;
