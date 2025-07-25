import { StyleProp, TextStyle } from 'react-native';

export type IconNames =
  | 'plus'
  | 'alert-circle'
  | 'bell'
  | 'home'
  | 'user'
  | 'cat'
  | 'calendar'
  | 'plane'
  | 'map-pin'
  | 'loader'
  | 'arrow-up-down'
  | 'chevron-down'
  | 'briefcase'
  | 'arrow-left'
  | 'search'
  | 'x'
  | 'logout';

export interface IconProps {
  testID?: string;
  color?: string;
  name: IconNames;
  size?: number;
  style?: StyleProp<TextStyle>;
}
