import { IconType } from 'react-icons';
import { FaSearch, FaMicrophone, FaRegClock } from 'react-icons/fa';
import { LiaTimesSolid } from 'react-icons/lia';

export type IconName = keyof typeof mapTypeToIcon;

export interface IconWrapperProps {
  type: IconName;
  isDisabled?: boolean;
  text?: string;
  onClick?: () => void;
  color?: string;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  size?: 'small' | 'medium' | 'large';
}

export const mapTypeToIcon: Record<string, IconType> = {
  search: FaSearch,
  cancel: LiaTimesSolid,
  mic: FaMicrophone,
  clock: FaRegClock,
};
