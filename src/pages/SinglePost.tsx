import { format } from "date-fns";
import Post from "../components/Post";
import { usePostsContext } from "../providers/PostsContext";

const SinglePost = () => {
  const { currentPost } = usePostsContext();
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
