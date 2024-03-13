import { useState } from "react";
import { Post as PostType } from "../types/postType";
import { PostsContext } from "./PostsContext";

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <PostsContext.Provider
      value={{
        posts,
        loading,
        setLoading,
        setPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}
