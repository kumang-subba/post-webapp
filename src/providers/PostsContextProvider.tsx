import { useState } from "react";
import { PostsContext } from "./PostsContext";
import { Post } from "../types/postType";

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  console.log(posts);
  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
}
