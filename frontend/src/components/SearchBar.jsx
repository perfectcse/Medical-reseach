import { useState } from "react";

function SearchBar({ onSearch }) {
  const [disease, setDisease] = useState("");
  const [query, setQuery] = useState("");

  return (
    <div className="search-box">
      <input
        placeholder="Disease (e.g. lung cancer)"
        value={disease}
        onChange={(e) => setDisease(e.target.value)}
      />

      <input
        placeholder="Query (e.g. treatment)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={() => onSearch(disease, query)}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;