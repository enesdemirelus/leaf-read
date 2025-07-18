"use client";
import { Book } from "@/types/book";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [search, setSearch] = useState("");

  const handleFetch = async () => {
    const res = await fetch(`/api/books?title=${encodeURIComponent(search)}`);

    const data = await res.json();
    setBooks(data);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 m-2">
        <Input
          placeholder="Enter book name"
          className="min-w-64 max-w-100"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleFetch}>Fetch Book</Button>
      </div>

      {books?.map((book, i) => (
        <div key={i} className="m-2">
          <p>Title: {book.title}</p>
          <p>Authors: {book.authors.join(", ")}</p>
          <p>Pages: {book.pageCount}</p>
          <p>ISBN-13: {book.isbn13}</p>
          {book.coverImage && <img src={book.coverImage} alt={book.title} />}
          <Button
            className="mt-2"
            onClick={async () => {
              await fetch("/api/user/add-book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(book),
              });
              alert("Book added to your database!");
            }}
          >
            add this book to your database!
          </Button>
        </div>
      ))}
    </div>
  );
}
