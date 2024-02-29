import { createContext, useContext } from "react";
import { Post } from "../types/postType";

type PostsContextType = {
  posts: Post[];
  currentPost: Post | null;
  fetchAllPosts: (category: string) => void;
  fetchSinglePost: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};
export const PostsContext = createContext({} as PostsContextType);

export const usePostsContext = () => {
  return useContext(PostsContext);
};
