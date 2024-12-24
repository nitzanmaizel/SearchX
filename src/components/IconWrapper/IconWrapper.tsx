import React from 'react';
import { mapTypeToIcon, IconWrapperProps } from './mapTypeToIcon';

const IconWrapper: React.FC<IconWrapperProps> = (props) => {
  const { type, isDisabled, text, onClick, color, style, size = 'small' } = props;

  const IconComponent = mapTypeToIcon[type];
  if (!IconComponent) {
    return <div>Icon type doesn't exist</div>;
  }

  const sizeMap: Record<'small' | 'medium' | 'large', number> = {
    small: 16,
    medium: 24,
    large: 32,
  };

  const fontSize = sizeMap[size];
  const iconColor = color || (isDisabled ? '#999' : '#000');

  const iconStyle: React.CSSProperties = {
    color: iconColor,
    cursor: isDisabled ? 'not-allowed' : onClick ? 'pointer' : 'default',
    fontSize,
    margin: '0 10px ',
    ...style,
  };

  if (typeof onClick === 'function' && !isDisabled) {
    return (
      <button
        onClick={onClick}
        style={{
          minWidth: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          padding: 0,
        }}
      >
        <IconComponent style={iconStyle} />
        {text && <div style={{ marginLeft: '4px' }}>{text}</div>}
      </button>
    );
  }

  return (
    <div
      style={{
        minWidth: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <IconComponent style={iconStyle} />
      {text && <div style={{ marginLeft: '4px' }}>{text}</div>}
    </div>
  );
};

export default IconWrapper;
