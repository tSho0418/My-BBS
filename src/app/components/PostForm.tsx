"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function PostForm({
  onPostCreated,
}: {
  onPostCreated: () => Promise<void>;
}) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/BBS-posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: content }),
    });
    if (response.ok) {
      onPostCreated();
    } else {
      console.error("Failed to fetch");
    }

    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto mt-8">
      <div>
        <Textarea
          placeholder="いまどうしてる？"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={4}
        />
      </div>
      <Button type="submit">投稿する</Button>
    </form>
  );
}
