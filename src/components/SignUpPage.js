import React, {Component} from 'react';
import {
  View,
  Text,
  Linking,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import Button from 'react-native-button';
import { ThirdColor } from '../config/ThemeColors';

import { auth, rootRef } from '../lib/firebaseInit';
import { checkUsernameAvailability, checkUsernameValidity, saveUsername } from '../lib/userUtil';

export default class SignUpPage extends Component {
  static propTypes = { 
    navigator: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      emailErrorMsg: '',
      passwordErrorMsg: '',
      usernameNotValidMsg: '',
      usernameNotAvailableMsg: '',
      isSigningUp: false,
    }

    this.signUp = this.signUp.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  createUser() {
    auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      saveUsername(this.state.username);
      this.props.navigator.dismissModal();
    })
    .catch((error) => {
      if(error.code === 'auth/email-already-in-use' || error.code === 'auth/invalid-email') {
        this.setState({emailErrorMsg: error.message, isSigningUp: false});
      }
      if(error.code === 'auth/weak-password') {
        this.setState({passwordErrorMsg: error.message, emailErrorMsg: '', isSigningUp: false});
      }
    });    
  }

  async signUp() {
    this.setState({
      isSigningUp: true,
      // reset error msg
      emailErrorMsg: '',
      passwordErrorMsg: '',
      usernameNotValidMsg: '',
      usernameNotAvailableMsg: '',
    });

    let username = this.state.username;

    if(checkUsernameValidity(username)){
      // username is valid
      let isUsernameAvailable = await checkUsernameAvailability(username);
      if(isUsernameAvailable) {
        // username availale
        this.createUser();
      } else {
        // not available
        this.setState({
          usernameNotAvailableMsg: 'Username taken.',
          isSigningUp: false,
        });
      }
    } else {
      // username is not valid
      this.setState({
        usernameNotValidMsg: 'Username can only contain alphanumeric characters or underscores, and the length should be between 4 to 15 characters.',
        isSigningUp: false,
      });
    }
  }

  render() {
    let emailErrorMsg = this.state.emailErrorMsg ? 
                        <Text style={styles.errorMsgStyle}>
                         {this.state.emailErrorMsg}
                        </Text> :
                        null;

    let passwordErrorMsg = this.state.passwordErrorMsg ? 
                        <Text style={styles.errorMsgStyle}>
                         {this.state.passwordErrorMsg}
                        </Text> :
                        null;

    let usernameNotValidMsg = this.state.usernameNotValidMsg ? 
                        <Text style={styles.errorMsgStyle}>
                         {this.state.usernameNotValidMsg}
                        </Text> :
                        null;

    let usernameNotAvailableMsg = this.state.usernameNotAvailableMsg ? 
                        <Text style={styles.errorMsgStyle}>
                         {this.state.usernameNotAvailableMsg}
                        </Text> :
                        null;

    let signUpform = 
      <View style={styles.formContainer}>
        <TextInput
          style={styles.formInput}
          onChangeText={(text) => this.setState({username: text})}
          value={this.state.username}
          placeholder={'Username'}
        />
        {usernameNotValidMsg}
        {usernameNotAvailableMsg}
        <TextInput
          style={styles.formInput}
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.email}
          placeholder={'Email'}
          keyboardType={'email-address'}
        />
        {emailErrorMsg}
        <TextInput
          style={styles.formInput}
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
          placeholder={'Password'}
          secureTextEntry={true}
        />
        {passwordErrorMsg}
      </View>

    let signUpButton = 
      <Button
          containerStyle={[styles.buttonContainerStyle, {backgroundColor: ThirdColor}]}
          style={styles.buttonStyle}
          disabled={this.state.isSigningUp}
          onPress={this.signUp}>
        {this.state.isSigningUp ? 'Signing Up...' : 'Sign Up'}
      </Button>;

    let terms = 
      <TouchableOpacity onPress={() => Linking.openURL('https://raw.githubusercontent.com/longsangstan/riochat/master/eula.txt')} style={{marginTop: 5}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: 250}}>
          <Text style={styles.secondaryText}>
            By clicking sign up, you agree to our&nbsp;
          </Text>
          <Text style={[styles.secondaryText, {fontWeight: 'bold'}]}>
            Terms & Conditions.
          </Text>
        </View>
      </TouchableOpacity>

    return (    
      <TouchableWithoutFeedback 
        onPress={dismissKeyboard}> 
        <Image source={require('../../img/background.jpg')} style={styles.container}>
            {signUpform}
            {signUpButton}
            {terms}
        </Image>
      </TouchableWithoutFeedback>
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
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  formInput: {
    height: 36,
    padding: 10,
    marginBottom: 5,
    marginTop: 5,
    width: 250,
    fontSize: 14,
    borderWidth: 2,
    borderColor: ThirdColor,
    borderRadius: 8,
    color: "#555555",
    backgroundColor: 'rgba(0,0,0,0)',
  },
  buttonStyle: {
    fontSize: 15, 
    color: 'white'
  },
  buttonContainerStyle: {
    padding: 9, 
    height:36, 
    width: 250,
    margin: 5,
    overflow:'hidden', 
    borderRadius:8,
    backgroundColor: 'blue',
  },
  errorMsgStyle: {
    color: 'red', 
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center',
    fontWeight: 'bold', 
    width: 250
  },
  secondaryText: {
    color: 'gray', 
    backgroundColor: 'rgba(0,0,0,0)'
  }
});