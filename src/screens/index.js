import {Navigation} from 'react-native-navigation';

import AccountScreen from './AccountScreen';
import DiscoverScreen from './DiscoverScreen';
import SourcesScreen from './SourcesScreen';
import CommentsScreen from './CommentsScreen';
import SignUpScreen from './SignUpScreen';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('example.AccountScreen', () => AccountScreen, store, Provider);
  Navigation.registerComponent('example.DiscoverScreen', () => DiscoverScreen, store, Provider);
  Navigation.registerComponent('example.SourcesScreen', () => SourcesScreen, store, Provider);
  Navigation.registerComponent('example.CommentsScreen', () => CommentsScreen, store, Provider);
  Navigation.registerComponent('example.SignUpScreen', () => SignUpScreen, store, Provider);
}
