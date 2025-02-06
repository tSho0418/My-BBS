"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BBSData } from "../types/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const BBSCard = ({
  post,
  onPostDelete,
}: {
  post: BBSData;
  onPostDelete: () => Promise<void>;
}) => {
  const router = useRouter();
  const handleDelete = async (id: number) => {
    const response = await fetch("/api/BBS-posts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      router.push("/BBS-posts");
      onPostDelete();
    } else {
      console.error("Failed to fetch");
    }
  };
  return (
    <div>
      <Card>
        <CardContent>
          {post.content}
          <div className="flex justify-end">
            <Button
              onClick={() => handleDelete(post.id)}
              className="text-white "
            >
              削除
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BBSCard;
