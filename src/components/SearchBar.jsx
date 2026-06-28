import React from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({ value = "", onChange }) {
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="search-wrapper">
      <Search className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder="Search users by name or email..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          type="button"
          className="search-clear"
          onClick={handleClear}
          title="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
