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
        title: 'Add', // for a textual button, provide the button title (label)
        id: 'add', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
      }
    ]
  };

  constructor(props) {
    super(props);

    this._itemsRef = rootRef.child('exampleItems');

    this.addItem = this.addItem.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'add') {
        this.addItem();
      }
    }
  }

  addItem() {
    this._itemsRef.push({
      title: chance.word(),
      description: chance.paragraph({sentences: 2}),
      urlToImage: chance.avatar({protocol: 'https'})
    });
  }

  render() {
    return (
      <DiscoverPage navigator={this.props.navigator}/>
    );
  }

}

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(DiscoverScreen);
