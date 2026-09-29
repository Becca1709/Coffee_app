// Autocomplete.js
import React, { useState, useEffect } from 'react';
import '../src/app.css'

export function Autocomplete  ({ suggestions, placeholder, onSelect })  {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);

    // Filter suggestions based on input value
    const filteredSuggestions = suggestions.filter(suggestion =>
      suggestion.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredSuggestions(filteredSuggestions);
  };

  const handleSelect = (value) => {
    setInputValue(value.name);
    setFilteredSuggestions([]);
    onSelect(value);
  };
  return (
    <div className="autocomplete-container">
      <input
        className="autocomplete-input"
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
      />
       {inputValue.trim() !== '' && filteredSuggestions.length > 0 && (
      <ul className="autocomplete-suggestions">
        {filteredSuggestions.map((suggestion, index) => (
          <li key={suggestion.id} className="autocomplete-suggestion" onClick={() => handleSelect(suggestion)}>
            {suggestion.name}
          </li>
        ))}
      </ul>)}
    </div>
  );
};
