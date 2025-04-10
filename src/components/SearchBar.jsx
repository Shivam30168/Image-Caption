import React, { useState } from "react";
import { toast } from "react-toastify";

const SearchBar = ({ setImages }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    if (!query || query === "") {
      return toast.error("Please enter text to search image");
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=8`,
        {
          headers: {
            Authorization:
              "4wmXgEDq1wwZzBsVSrZEMhGK0tjnbrwdgPYdmZn3VrdTgJmnXB6gWLWQ",
          },
        }
      );
      const data = await res.json();
      setImages(data.photos);
      setQuery("");
    } catch (err) {
      toast.error("Error fetching images");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 mb-4 justify-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for images..."
        className="border px-4 py-2 rounded-3xl w-64"
      />
      <button
        onClick={fetchImages}
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-3xl cursor-pointer"
        disabled={loading}
      >
        {loading ? "Searching" : "Search"}
      </button>
    </div>
  );
};

export default SearchBar;
