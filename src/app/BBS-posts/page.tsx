"use client";

import React, { useCallback, useEffect, useState } from "react";
import BBSCardList from "../components/BBSCardList";
import PostForm from "../components/PostForm";
import { BBSData } from "../types/types";
import BottomSearchBar from "../components/SearchBar";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingDots from "../components/loadings/Loading";

const Posts = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("content") || "";
  const router = useRouter();
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

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <div>
      {session ? (
      <main>
        <BottomSearchBar />
        <PostForm onPostCreated={getPosts} />
        {loading ? (
          <main className="flex min-h-screen flex-col items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4 ">
              <LoadingDots />
              <p className="mt-4 text-sm font-medium text-black">読み込み中...</p>
            </div>
          </main>
        ) : (
          posts.length !== 0 ? 
          <BBSCardList posts={posts} onPostDelete={getPosts} /> : <p className="flex min-h-screen flex-col items-center justify-center bg-white">投稿がありません</p>
        )}
      </main>
      ):(
        <main className="flex min-h-screen flex-col items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-4 ">
            <LoadingDots />
            <p className="mt-4 text-sm font-medium text-black">読み込み中...</p>
          </div>
        </main>
      )}
    </div>
    
  );
};

export default Posts;
