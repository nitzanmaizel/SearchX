import React, { MouseEvent } from 'react';
import IconWrapper from '@/components/IconWrapper';
import { useSearch } from '@/hooks/useSearch';
import { DBItem } from '@/types/searchTypes';

interface AutocompleteListProps {
  items: DBItem[];
  onSelect: (title: string) => void;
  activeIndex?: number;
}

const AutocompleteList: React.FC<AutocompleteListProps> = ({
  items,
  onSelect,
  activeIndex = -1,
}) => {
  const { removeFromHistory, searchHistory } = useSearch();

  const handleRemove = (e: MouseEvent<HTMLButtonElement>, title: string) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromHistory(title);
  };

  return (
    <ul className='searchX-autocomplete-list'>
      {items.map((item, index) => {
        const isInHistory = searchHistory.some((historyItem) => historyItem.title === item.title);
        const isActive = index === activeIndex;

        return (
          <li
            key={item.id}
            className='searchX-autocomplete-item'
            style={{
              backgroundColor: isActive ? '#eee' : '#fff',
              color: isInHistory ? '#52188c' : '#000',
            }}
            onMouseDown={() => onSelect(item.title)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconWrapper type={isInHistory ? 'clock' : 'search'} isDisabled />
              <span>{item.title}</span>
            </div>
            {isInHistory && (
              <button
                style={{
                  all: 'unset',
                  display: isActive ? 'block' : 'none',
                  position: 'relative',
                  right: '10px',
                }}
                onMouseDown={(e) => handleRemove(e, item.title)}
              >
                <span style={{ color: '#52188c' }}>Delete</span>
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default AutocompleteList;
