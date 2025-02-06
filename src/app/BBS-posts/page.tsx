"use client";

import React, { useCallback, useEffect, useState } from "react";
import BBSCardList from "../components/BBSCardList";
import PostForm from "../components/PostForm";
import { BBSData } from "../types/types";
import BottomSearchBar from "../components/SearchBar";
import { useSearchParams } from "next/navigation";

const Posts = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("content") || "";
  const [posts, setPosts] = useState<BBSData[]>([]);
  const [loading, setLoading] = useState(false);

  const getPosts = useCallback(async () => {
    setLoading(true);
    try {
      const url = searchQuery
        ? `http://localhost:3000/api/BBS-posts?content=${encodeURIComponent(searchQuery)}`
        : "http://localhost:3000/api/BBS-posts";
      const response = await fetch(url, {
        cache: "no-store",
      });

      const data: BBSData[] = await response.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <main>
      <BottomSearchBar />
      <PostForm onPostCreated={getPosts} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.length !== 0 ? 
        <BBSCardList posts={posts} onPostDelete={getPosts} /> : <p>結果がありません</p>
      )}
    </main>
  );
};

export default Posts;
