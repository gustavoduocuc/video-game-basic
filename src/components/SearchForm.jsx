import { useState } from "react";

export function SearchForm({ onSearch, onSubmitted }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value.trim() === "") onSearch("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(inputValue.trim().toLowerCase());
    onSubmitted?.();
  };

  return (
    <form id="navbar-search-form" className="d-flex mx-auto" role="search" onSubmit={handleSubmit}>
      <label htmlFor="navbar-search-input" className="visually-hidden">
        Buscar productos
      </label>
      <input
        type="search"
        id="navbar-search-input"
        name="q"
        className="form-control"
        placeholder="Buscar productos…"
        aria-label="Buscar productos"
        value={inputValue}
        onChange={handleChange}
      />
      <button className="btn btn-outline-primary ms-2" type="submit">
        Buscar
      </button>
    </form>
  );
}
