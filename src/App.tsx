import React from 'react';
import SearchBar from '@/components/SearchBar';
import SearchResultsList from '@/components/SearchResultsList';

const App: React.FC = () => {
  return (
    <div className='searchX-container'>
      <h1 className='searchX-title'>Search X</h1>
      <SearchBar />
      <SearchResultsList />
    </div>
  );
};

export default App;
