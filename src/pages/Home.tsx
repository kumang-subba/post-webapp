import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import GridPost from "../components/GridPost";
import { usePostsContext } from "../providers/PostsContext";

const Home = () => {
  const { setLoading, posts, setPosts } = usePostsContext();
  const category = useLocation().search;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/posts${category}`
        );
        setPosts(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [category]);
  return (
    <main className="px-8 md:px-16 lg:px-32 pt-24 pb-12">
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
                  ? "col-span-12 lg:col-span-8"
                  : "col-span-12 lg:col-span-4"
              }
            />
          );
        })}
      </div>
    </main>
  );
};

export default Home;
