import axios from "axios";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Post as RecommendedPostType } from "../types/postType";
import EditorOutput from "./EditorOutput";
import RecommendedPost from "./RecommendedPost";

type PostType = {
  img: string;
  title: string;
  content: string;
  author: string;
  authorImg?: string;
  created: string;
  updated: string;
  categories: string[];
};
const Post = ({
  img,
  title,
  content,
  author,
  authorImg,
  created,
  updated,
  categories,
}: PostType) => {
  const [recommendedPosts, setRecommendedPosts] = useState<
    RecommendedPostType[]
  >([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
        setRecommendedPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <>
      <div className="basis-full lg:basis-2/3 flex flex-col lg:overflow-y-auto scrollbar rounded-tl-md rounded-tr-md md:rounded-tr-none gap-2 ml-0 mt-0 lg:ml-[1.25rem] lg:mt-[1.25rem]">
        <picture className="h-2/3 w-full md:basis-1/2">
          <img
            src={img}
            className="h-full w-full object-cover rounded-tl-md rounded-tr-md md:rounded-tr-none"
          />
        </picture>
        <div className="flex flex-col gap-2 basis-3/4 px-2 lg:px-0">
          <h1 className="text-base md:text-3xl lg:text-6xl font-bold tracking-wide">
            {title}
          </h1>
          <div className="flex">
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
          </div>
          <div className="flex gap-2 items-center">
            <picture>
              {authorImg ? (
                <img
                  className="w-16 h-16 object-cover rounded-full object-top"
                  src={authorImg}
                />
              ) : (
                <User className="w-16 h-16 object-cover rounded-full object-top" />
              )}
            </picture>
            <div className="flex flex-col justify-center">
              <p className="font-medium text-lg">{author}</p>
              <p className="text-sm opacity-75 italic">
                {created}
                {updated > created ? ` - (updated) ${updated}` : ""}
              </p>
            </div>
          </div>
          <EditorOutput content={content} />

          <div className="flex gap-2 mt-5"></div>
        </div>
      </div>
      <div className="lg:flex-1 bg-gray-300 p-5 dark:bg-slate-800 lg:rounded-r-lg flex flex-col">
        <h2 className="text-3xl">You may also enjoy</h2>
        <div className="py-2 gap-2 flex flex-col overflow-clip">
          {recommendedPosts.map(({ id, title, coverImage }) => (
            <RecommendedPost key={id} title={title} img={coverImage} id={id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Post;
