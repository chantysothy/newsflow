import React, {Component} from 'react';
import {
  Text,
  TextInput,
  Image,
  StyleSheet
} from 'react-native';
import Button from 'react-native-button';

import { auth } from '../lib/firebaseInit';
import { FourthColor } from '../config/ThemeColors';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    auth.signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
    });
  }

  render() {
    let signOutButton = 
      <Button
          containerStyle={{
            padding: 9, 
            height:36, 
            width: 250,
            overflow:'hidden', 
            borderRadius:8, 
            backgroundColor: FourthColor
          }}
          style={{
            fontSize: 15, 
            color: 'white'
          }}
          onPress={this.signOut}>
        Sign Out
      </Button>;

    let welcome = 
      <Text style={[styles.secondaryText, {margin: 10, fontWeight: 'bold'}]}>
        Welcome, @{this.props.userInfo.username}
      </Text>

    return (
      <Image source={require('../../img/background.jpg')} style={styles.container}>
        {welcome}
        {signOutButton}
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
  },
  secondaryText: {
    color: 'gray', 
    backgroundColor: 'rgba(0,0,0,0)'
  }
});
