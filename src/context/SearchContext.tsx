import React, { createContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { DBItem, ISearchContext, SearchMetadata } from '@/types/searchTypes';
import { localDB } from '@/data/localDB';

export const SearchContext = createContext<ISearchContext | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchText, setSearchText] = useState('');
  const [autocompleteItems, setAutocompleteItems] = useState<DBItem[]>([]);
  const [searchResults, setSearchResults] = useState<DBItem[]>([]);
  const [searchMetadata, setSearchMetadata] = useState<SearchMetadata>({ count: 0, time: 0 });
  const [searchHistory, setSearchHistory] = useState<DBItem[]>([]);

  const addToHistory = useCallback((item: DBItem) => {
    setSearchHistory((prev) => {
      if (!prev.some((h) => h.title === item.title)) {
        return [...prev, item];
      }
      return prev;
    });
  }, []);

  const removeFromHistory = useCallback((title: string) => {
    setSearchHistory((prev) => prev.filter((h) => h.title !== title));
  }, []);

  const updateAutocomplete = useCallback(
    (value: string) => {
      if (!value.trim()) {
        setAutocompleteItems([]);
        return;
      }
      let filtered = localDB
        .filter((item) => item.title.toLowerCase().startsWith(value.toLowerCase()))
        .slice(0, 10);

      filtered = filtered.sort((a, b) => {
        const aInHistory = searchHistory.some((h) => h.title === a.title);
        const bInHistory = searchHistory.some((h) => h.title === b.title);

        if (aInHistory && !bInHistory) return -1;
        if (!aInHistory && bInHistory) return 1;
        return 0;
      });
      setAutocompleteItems(filtered);
    },
    [searchHistory]
  );

  const searchItems = useCallback(
    (value: string) => {
      if (!value) return;

      setSearchText(value);

      const match = localDB.find((item) => item.title === value);
      if (match) addToHistory(match);

      const start = performance.now();
      const results = localDB.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      const end = performance.now();

      setSearchResults(results);
      setSearchMetadata({
        count: results.length,
        time: parseFloat((end - start).toFixed(2)),
      });
    },
    [addToHistory]
  );

  const contextValue = useMemo<ISearchContext>(
    () => ({
      searchText,
      setSearchText,
      autocompleteItems,
      updateAutocomplete,
      searchItems,
      searchResults,
      searchMetadata,
      searchHistory,
      removeFromHistory,
    }),
    [
      searchText,
      autocompleteItems,
      searchResults,
      searchMetadata,
      searchHistory,
      removeFromHistory,
      updateAutocomplete,
      searchItems,
    ]
  );

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
};
