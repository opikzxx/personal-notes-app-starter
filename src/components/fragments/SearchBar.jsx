import React from "react";
import PropTypes from "prop-types";
import { useCombined } from "../../contexts/CombinedContext";

export default function SearchBar({ value, onChange}) {

  const {locale } = useCombined();

  const handleChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <section className="search-bar">
      <input
        type="text"
        placeholder={locale === "id" ? "Cari berdasarkan judul ..." : "Search by title ..."}
        value={value}
        onChange={handleChange}
      />
    </section>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
