import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import LoginPage from '../components/LoginPage';
import AccountPage from '../components/AccountPage';

import { FirstColor } from '../config/ThemeColors';

// this is a traditional React component connected to the redux store
class AccountsScreen extends Component {
  static navigatorStyle = {
    navBarTextColor: FirstColor,
    navBarBackgroundColor: '#ffffff',
    navBarTranslucent: true
  };

  constructor(props) {
    super(props);
  }

  render() {
    let accountPage = this.props.userInfo.uid ? <AccountPage userInfo={this.props.userInfo}/> : <LoginPage navigator={this.props.navigator}/>;

    return (
      accountPage
    );
  }

}

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    userInfo: state.app.userInfo
  };
}

export default connect(mapStateToProps)(AccountsScreen);
