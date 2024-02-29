import GridPost from "../components/GridPost";
import { usePostsContext } from "../providers/PostsContext";

const Home = () => {
  const { posts } = usePostsContext();
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
