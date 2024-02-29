import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Post as PostType } from "../types/postType";
import { PostsContext } from "./PostsContext";
import { useLocationContext } from "./LocationContext";

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { backgroundLocation } = useLocationContext();
  const [posts, setPosts] = useState<PostType[]>([]);
  const postId = location.pathname.split("/")[2];
  const category = useLocation().search;
  const [currentPost, setCurrentPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchSinglePost = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/${postId}`
      );
      setCurrentPost(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllPosts = async (category: string) => {
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
  useEffect(() => {
    if (!postId) {
      fetchAllPosts(category);
    }
  }, [category, postId]);
  useEffect(() => {
    if (!backgroundLocation && postId && !currentPost) {
      fetchSinglePost();
    }
  }, []);
  return (
    <PostsContext.Provider
      value={{
        posts,
        currentPost,
        fetchAllPosts,
        fetchSinglePost,
        loading,
        setLoading,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}
