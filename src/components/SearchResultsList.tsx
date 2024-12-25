import React from 'react';
import { useSearch } from '@/hooks/useSearch';

const SearchResultsList: React.FC = () => {
  const { searchResults, searchMetadata } = useSearch();

  return (
    <div className='searchX-results-container'>
      {searchResults.length > 0 && searchMetadata && (
        <div className='metadata'>
          <p>
            Found {searchMetadata.count} results in {searchMetadata.time} ms
          </p>
        </div>
      )}
      {searchResults.length === 0 && (
        <div className='no-results'>
          <p>No results found</p>
        </div>
      )}
      <ul>
        {searchResults.length > 0 &&
          searchResults.map((result) => (
            <li key={result.id} className='searchX-result-item'>
              <h3>
                <a href={result.url} target='_blank' rel='noopener noreferrer'>
                  {result.title}
                </a>
              </h3>
              <span>{result.description}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SearchResultsList;
