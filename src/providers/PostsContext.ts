import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { Post } from "../types/postType";

type PostsContextType = {
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[]>>;
};
export const PostsContext = createContext({} as PostsContextType);

export const usePostsContext = () => {
  return useContext(PostsContext);
};
