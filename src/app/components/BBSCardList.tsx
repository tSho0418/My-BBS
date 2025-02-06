import React from "react";
import BBSCard from "./BBSCard";
import { BBSData } from "../types/types";

const BBSCardList = ({
  posts,
  onPostDelete,
}: {
  posts: BBSData[];
  onPostDelete: () => Promise<void>;
}) => {
  const sortedPosts = [...posts].reverse();
  return (
    <div className="grid lg:grid-cols-1 px-4 py-4 gap-4">
      {sortedPosts.map((post: BBSData) => (
        <BBSCard key={post.id} post={post} onPostDelete={onPostDelete} />
      ))}
    </div>
  );
};
export default BBSCardList;
