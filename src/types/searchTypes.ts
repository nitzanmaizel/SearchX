export interface DBItem {
  id: number;
  title: string;
  description: string;
  url: string;
}

export interface SearchMetadata {
  count: number;
  time: number;
}

export interface ISearchContext {
  searchText: string;
  setSearchText: (value: string) => void;

  autocompleteItems: DBItem[];
  updateAutocomplete: (value: string) => void;

  searchItems: (value: string) => void;
  searchResults: DBItem[];
  searchMetadata: SearchMetadata;

  searchHistory: DBItem[];
  removeFromHistory: (title: string) => void;
}
