"use client";

import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function BottomSearchBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    router.push(`/BBS-posts?content=${encodeURIComponent(searchQuery)}`);

    setSearchQuery("");
  };

  const handleClear = () => {
    setSearchQuery("");
    router.push("/BBS-posts");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 shadow-lg">
      <form
        onSubmit={handleSubmit}
        className="flex items-center max-w-md mx-auto"
      >
        {isSearching && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={handleClear}
          >
            <ArrowLeft className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="sr-only">戻る</span>
          </Button>
        )}
        <div className="relative flex-grow">
          <Input
            type="search"
            placeholder="検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700 pr-10"
          />
        </div>
        <Button
          type="submit"
          variant="outline"
          size="icon"
          className="ml-2 bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">検索</span>
        </Button>
      </form>
    </div>
  );
}
