import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import GridPost from "../components/GridPost";
import { usePostsContext } from "../providers/PostsContext";

const Home = () => {
  const { posts, setPosts } = usePostsContext();
  const category = useLocation().search;
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/posts${category}`
        );
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [category, setPosts]);
  return (
    <main className="px-16 md:px-32 pt-24 pb-12">
      <div className="grid grid-cols-12 gap-10">
        {posts.map((post, index) => {
          const categories = post.categories.split(",");
          return (
            <GridPost
              key={post.id}
              id={post.id}
              title={post.title}
              content={JSON.parse(post.content)}
              coverImage={post.coverImage}
              categories={categories}
              author={post.author}
              authorImg={post.authorImg}
              extraClasses={
                index % 4 === 0 || (index + 1) % 4 === 0
                  ? "col-span-8"
                  : "col-span-4"
              }
            />
          );
        })}
      </div>
    </main>
  );
};

export default Home;
