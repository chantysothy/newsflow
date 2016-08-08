import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import SignUpPage from '../components/SignUpPage';

import { FirstColor } from '../config/ThemeColors';

// this is a traditional React component connected to the redux store
class SignUpScreen extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        icon: require('../../img/cancel.png'),
        title: 'close', // for a textual button, provide the button title (label)
        id: 'close', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
      },
    ]
  };

  static navigatorStyle = {
    navBarTextColor: FirstColor,
    navBarBackgroundColor: '#ffffff',
    navBarButtonColor: FirstColor,
    navBarTranslucent: true
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'close') { // this is the same id field from the static navigatorButtons definition
        console.log('close pressed!');
        this.props.navigator.dismissModal();
      }
    }
  }

  render() {
    return (
      <SignUpPage navigator={this.props.navigator}/>
    );
  }

}

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    
  };
}

export default connect(mapStateToProps)(SignUpScreen);
