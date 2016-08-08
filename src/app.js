import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import thunk from 'redux-thunk';
import * as reducers from './reducers';
import * as appActions from './reducers/app/actions';
import * as sourcesActions from './reducers/sources/actions';

import { FirstColor } from './config/ThemeColors';

// redux related book keeping
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

// screen related book keeping
import { registerScreens } from './screens';
registerScreens(store, Provider);

// icons
let settingsIcon;
let settingsOutlineIcon;
let searchIcon;
let searchOutlineIcon;

// notice that this is just a simple class, it's not a React component
export default class App {
  constructor() {
    this.populateIcons().then(() => {
      // Start app only if all icons are loaded
      this.startApp();

      // Get sources selection from Aysnc Storage and store it in Redux Store
      AsyncStorage.getItem('sourcesSelected', (err, result) => {
        if(result) store.dispatch(sourcesActions.storeSelection(JSON.parse(result)));
      });

      // Monitor Firebase login state
      store.dispatch(appActions.monitorAuthState());
    }).catch((error) => {
      console.error(error);
    });
  }

  // reference: https://github.com/wix/react-native-navigation/issues/43#issuecomment-223907515
  populateIcons() {
    return new Promise(function (resolve, reject) {
      Promise.all(
        [
          Icon.getImageSource('ios-settings', 30),
          Icon.getImageSource('ios-settings-outline', 30),
          Icon.getImageSource('ios-search', 30),
          Icon.getImageSource('ios-search-outline', 30)
        ]
      ).then((values) => {
        settingsIcon = values[0];
        settingsOutlineIcon = values[1];
        searchIcon = values[2];
        searchOutlineIcon = values[3];
        resolve(true);
      }).catch((error) => {
        console.log(error);
        reject(error);
      }).done();
    });
  };

  startApp() {
    Navigation.startTabBasedApp({
          tabs: [           
            {
              label: 'Discover',
              screen: 'example.DiscoverScreen',
              icon: searchOutlineIcon,
              selectedIcon: searchIcon,
              title: 'Discover',
              navigatorStyle: {},
            },
            {
              label: 'Account',
              screen: 'example.AccountScreen',
              icon: settingsOutlineIcon,
              selectedIcon: settingsIcon,
              title: 'Account',
              navigatorStyle: {},
            }
          ],
          tabsStyle: { // optional, add this if you want to style the tab bar beyond the defaults
            tabBarButtonColor: FirstColor, // optional, change the color of the tab icons and text (also unselected)
            tabBarSelectedButtonColor: FirstColor, // optional, change the color of the selected tab icon and text (only selected)
            tabBarBackgroundColor: '#ffffff' // optional, change the background color of the tab bar
          },
          animationType: 'slide-down',
          title: 'Newsflow'
        });
  }
}
