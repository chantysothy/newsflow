import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import DiscoverPage from '../components/DiscoverPage';

import { FirstColor } from '../config/ThemeColors';
import { rootRef } from '../lib/firebaseInit.js';

import Chance from 'chance';
const chance = new Chance();

// this is a traditional React component connected to the redux store
class DiscoverScreen extends Component {
  static navigatorStyle = {
    navBarTextColor: FirstColor,
    navBarBackgroundColor: '#ffffff',
    navBarButtonColor: FirstColor,
    navBarTranslucent: true
  };

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Filter', // for a textual button, provide the button title (label)
        id: 'filter', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
      }
    ]
  };

  constructor(props) {
    super(props);

    this._itemsRef = rootRef.child('exampleItems');

    this.showFilter = this.showFilter.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'filter') {
        this.showFilter();
      }
    }
  }

  showFilter() {
    this.props.navigator.showModal({
      screen: "example.FilterScreen", // unique ID registered with Navigation.registerScreen
      title: "Filter",
      passProps: {}, // simple serializable object that will pass as props to the lightbox (optional)
    });
  }

  render() {
    return (
      <DiscoverPage navigator={this.props.navigator} selected={this.props.selected}/>
    );
  }

}

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    selected: state.filter.selected,
  };
}

export default connect(mapStateToProps)(DiscoverScreen);
