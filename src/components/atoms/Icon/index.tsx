import { useTheme } from '@contexts/theme-provider';
import { IconProps } from './icon.interfaces';
import {
  Plus,
  AlertCircle,
  Bell,
  Home,
  User,
  Cat,
  Calendar,
  Plane,
  MapPin,
  Loader,
  ArrowUpDown,
  ChevronDown,
  Briefcase,
  ArrowLeft,
  Search,
  X,
  LogOut,
} from '@tamagui/lucide-icons';

export const Icon = ({ color, name, size = 20, style, testID }: IconProps) => {
  const { colors } = useTheme();
  const props = { color: color ?? colors.fullColor, size, style, testID };
  switch (name) {
    case 'plus':
      return <Plus {...props} />;
    case 'alert-circle':
      return <AlertCircle {...props} />;
    case 'bell':
      return <Bell {...props} />;
    case 'home':
      return <Home {...props} />;
    case 'user':
      return <User {...props} />;
    case 'cat':
      return <Cat {...props} />;
    case 'calendar':
      return <Calendar {...props} />;
    case 'plane':
      return <Plane {...props} />;
    case 'map-pin':
      return <MapPin {...props} />;
    case 'loader':
      return <Loader {...props} />;
    case 'arrow-up-down':
      return <ArrowUpDown {...props} />;
    case 'chevron-down':
      return <ChevronDown {...props} />;
    case 'briefcase':
      return <Briefcase {...props} />;
    case 'arrow-left':
      return <ArrowLeft {...props} />;
    case 'search':
      return <Search {...props} />;
    case 'x':
      return <X {...props} />;
    case 'logout':
      return <LogOut {...props} />;
    default:
      return <AlertCircle {...props} />;
  }
};
