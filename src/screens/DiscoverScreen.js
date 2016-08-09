import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import DiscoverPage from '../components/DiscoverPage';

import { FirstColor } from '../config/ThemeColors';

// this is a traditional React component connected to the redux store
class DiscoverScreen extends Component {
  static navigatorStyle = {
    navBarTextColor: FirstColor,
    navBarBackgroundColor: '#ffffff',
    navBarButtonColor: FirstColor,
    navBarTranslucent: true
  };

  static navigatorButtons = {
    leftButtons: [
      {
        icon: require('../../img/navicon_menu.png'),
        title: 'Sources', // for a textual button, provide the button title (label)
        id: 'sources', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
      }
    ]
  };

  constructor(props) {
    super(props);

    this.showSources = this.showSources.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'sources') {
        this.showSources();
      }
    }
  }

  showSources() {
    this.props.navigator.showModal({
      screen: "example.SourcesScreen", // unique ID registered with Navigation.registerScreen
      title: "Sources",
      passProps: {}, // simple serializable object that will pass as props to the lightbox (optional)
    });
  }

  render() {
    return (
      <DiscoverPage navigator={this.props.navigator} sourcesSelected={this.props.sourcesSelected}/>
    );
  }

}

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    sourcesSelected: state.sources.selected,
  };
}

export default connect(mapStateToProps)(DiscoverScreen);
