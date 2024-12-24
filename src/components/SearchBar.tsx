import React, { useEffect, useRef, useState, ChangeEvent, KeyboardEvent } from 'react';
import { useSearch } from '@/hooks/useSearch';
import AutocompleteList from '@/components/AutocompleteList';
import VoiceSearch from '@/components/VoiceSearch';
import IconWrapper from '@/components/IconWrapper';

const SearchBar: React.FC = () => {
  const { searchText, setSearchText, autocompleteItems, updateAutocomplete, searchItems } =
    useSearch();

  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    updateAutocomplete(value);
    setShowAutocomplete(!!value);
    setActiveIndex(-1);
  };

  const handleSearch = (value: string) => {
    if (!value) return;
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
        setActiveIndex((prev) => {
          const next = prev + 1;
          return next >= autocompleteItems.length ? 0 : next;
        });
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (autocompleteItems.length > 0) {
        setActiveIndex((prev) => {
          const next = prev - 1;
          return next < 0 ? autocompleteItems.length - 1 : next;
        });
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
    setSearchText(text);
    updateAutocomplete(text);
    setShowAutocomplete(true);
    setActiveIndex(-1);
  };

  const isActiveSearch = autocompleteItems.length > 0 && showAutocomplete;

  return (
    <div style={{ position: 'relative' }}>
      <div className={`searchX-box ${isActiveSearch ? 'active' : ''}`}>
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
