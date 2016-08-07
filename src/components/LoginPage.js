import React, {Component} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  StyleSheet,
  Linking
} from 'react-native';
import { auth } from '../lib/firebaseInit';
import { saveUsername, generateRandomUsername } from '../lib/userUtil';
import { ThirdColor, FourthColor } from '../config/ThemeColors';

import Button from 'react-native-button';
import dismissKeyboard from 'dismissKeyboard';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isSigningIn: false,
      emailErrorMsg: '',
      anonymousErrorMsg: '',
    }

    this.signInAnonymously = this.signInAnonymously.bind(this);
    this.signInWithEmail = this.signInWithEmail.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  signInAnonymously() {
    this.setState({isSigningIn: true, anonymousErrorMsg: ''});
    auth.signInAnonymously()
    .then(() => {
      saveUsername(generateRandomUsername());
    })
    .catch((error) => {
      console.log(error);
      this.setState({anonymousErrorMsg: 'Anonymous sign in is disabled at the moment.', isSigningIn: false});
    });
  }

  signInWithEmail() {
    this.setState({isSigningIn: true, emailErrorMsg: ''})
    auth.signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
     console.log(error);
     this.setState({emailErrorMsg: error.message, isSigningIn: false});
    });
  }

  signUp() {
    this.props.navigator.showModal({
      title: "Sign Up",
      screen: "example.SignUpScreen",
    });
  }

  render() {
    let emailErrorMsg = this.state.emailErrorMsg ? 
                    <Text style={styles.errorMsgStyle}>
                     {this.state.emailErrorMsg}
                    </Text> :
                    null;

    let anonymousErrorMsg = this.state.anonymousErrorMsg ? 
                    <Text style={styles.errorMsgStyle}>
                     {this.state.anonymousErrorMsg}
                    </Text> :
                    null;

    let signInForm =
      <View style={styles.formContainer}>
        <TextInput
          style={styles.formInput}
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.email}
          placeholder={'Email'}
          keyboardType={'email-address'}
        />
        <TextInput
          style={styles.formInput}
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
          placeholder={'Password'}
          secureTextEntry={true}
        />
      </View>

    let signInAnonymouslyButton = 
      <Button
          containerStyle={[styles.buttonContainerStyle, {backgroundColor: FourthColor}]}
          style={styles.buttonStyle}
          disabled={this.state.isSigningIn}
          onPress={this.signInAnonymously}>
        Sign In Anonymously
      </Button>;

    let signInWithEmailButton = 
      <Button
          containerStyle={[styles.buttonContainerStyle, {backgroundColor: ThirdColor}]}
          style={styles.buttonStyle}
          disabled={this.state.isSigningIn}
          onPress={this.signInWithEmail}>
        Sign In
      </Button>;

    let signUp = 
      <TouchableOpacity onPress={() => this.signUp()} style={{margin: 15}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.secondaryText}>
            New user?&nbsp;
          </Text>
          <Text style={[styles.secondaryText, {fontWeight: 'bold'}]}>
            Sign up here.
          </Text>
        </View>
      </TouchableOpacity>

    let terms = 
      <TouchableOpacity onPress={() => Linking.openURL('https://raw.githubusercontent.com/longsangstan/riochat/master/eula.txt')} style={{marginTop: 5}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: 250}}>
          <Text style={styles.secondaryText}>
            By clicking sign in, you agree to our&nbsp;
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
          <View style={{margin: 20}}/>
          {signInForm}
          {signInWithEmailButton}
          {emailErrorMsg}
          <Text style={[styles.secondaryText, {fontWeight: 'bold', margin: 5}]}>or</Text>
          {signInAnonymouslyButton}
          {anonymousErrorMsg}
          {terms}
          {signUp}
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