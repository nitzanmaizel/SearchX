import React, { useEffect, useRef, useState, ChangeEvent, KeyboardEvent } from 'react';
import { useSearch } from '@/hooks/useSearch';
import AutocompleteList from '@/components/AutocompleteList';
import VoiceSearch from '@/components/VoiceSearch';
import IconWrapper from '@/components/IconWrapper';
import useDebounce from '@/hooks/useDebounce';

const SearchBar: React.FC = () => {
  const { searchText, setSearchText, autocompleteItems, updateAutocomplete, searchItems } =
    useSearch();

  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const isSearchingRef = useRef<boolean>(false);

  const debouncedSearchText = useDebounce(searchText, 500);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (debouncedSearchText && !isSearchingRef.current) {
      updateAutocomplete(debouncedSearchText);
      setShowAutocomplete(true);
    } else {
      setShowAutocomplete(false);
      setActiveIndex(-1);
    }
  }, [debouncedSearchText, updateAutocomplete]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    isSearchingRef.current = false;
    setSearchText(value);
    setActiveIndex(-1);
  };

  const handleSearch = (value: string) => {
    if (!value) return;
    isSearchingRef.current = true;
    searchItems(value);
    setShowAutocomplete(false);
    setActiveIndex(-1);
  };

  const handleSelect = (selectedTitle: string) => {
    handleSearch(selectedTitle);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowAutocomplete(false);
      setActiveIndex(-1);
    }, 100);
  };

  const handleFocus = () => {
    if (autocompleteItems.length > 0) {
      setShowAutocomplete(true);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (autocompleteItems.length > 0) {
        setActiveIndex((prev) => (prev + 1) % autocompleteItems.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (autocompleteItems.length > 0) {
        setActiveIndex((prev) => (prev - 1 < 0 ? autocompleteItems.length - 1 : prev - 1));
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < autocompleteItems.length) {
        const selected = autocompleteItems[activeIndex].title;
        handleSearch(selected);
      } else {
        handleSearch(searchText);
      }
    }
  };

  const handleCancel = () => {
    setSearchText('');
    updateAutocomplete('');
    setActiveIndex(-1);
    setShowAutocomplete(false);
  };

  const handleVoiceResult = (text: string) => {
    if (!text) return;
    isSearchingRef.current = false;
    setSearchText(text);
    setShowAutocomplete(true);
    setActiveIndex(-1);
  };

  const isActiveSearch = autocompleteItems.length > 0 && showAutocomplete;

  return (
    <div style={{ position: 'relative' }}>
      <div className={`searchX-box ${isActiveSearch ? 'active' : ''}`} role='search'>
        <IconWrapper type='search' isDisabled />
        <input
          ref={inputRef}
          type='text'
          value={searchText}
          placeholder='Search...'
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {searchText && <IconWrapper type='cancel' onClick={handleCancel} />}
        <VoiceSearch onResult={handleVoiceResult} />
      </div>

      {isActiveSearch && (
        <AutocompleteList
          items={autocompleteItems}
          onSelect={handleSelect}
          activeIndex={activeIndex}
        />
      )}
    </div>
  );
};

export default SearchBar;
