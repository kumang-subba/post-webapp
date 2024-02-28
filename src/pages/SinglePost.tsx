import { useParams } from "react-router-dom";
import Post from "../components/Post";
import { useEffect, useState } from "react";
import { Post as PostType } from "../types/postType";
import axios from "axios";
import { format } from "date-fns";

const SinglePost = () => {
  const params = useParams();
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
    currentPost && (
      <main className="px-16 md:px-32 pt-24 py-5 flex items-center justify-center">
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
