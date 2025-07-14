import React, { useEffect, useState } from "react";
import Card from "./Card";

const ApiData = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("harry potter");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setBooks(data.docs.slice(0, 20)); // Get first 12 results
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch books");
        setLoading(false);
      });
  }, [query]);

  return (
    <div className='mx-4 md:mx-20 py-4'>
      <h2 className='text-2xl font-bold mb-4'>Book Finder</h2>

      <input
        type='text'
        placeholder='Search books...'
        onChange={(e) => setQuery(e.target.value)}
        className='border p-2 mb-4 w-full rounded'
      />

      {loading && <p>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {books.map((book, index) => (
          <Card key={index}>
            <h3 className='font-bold text-lg mb-1'>
              {book.title ? book.title : "No Title"}
            </h3>
            <p className='text-sm text-gray-600 mb-1'>
              Author: {book.author_name ? book.author_name.join(", ") : "N/A"}
            </p>
            <p className='text-sm text-gray-500'>
              First published: {book.first_publish_year || "Unknown"}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApiData;
