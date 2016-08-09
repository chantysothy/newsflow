import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import { AdMobBanner, AdMobInterstitial } from 'react-native-admob'

export default class CommentsPage extends Component {
  static propTypes = {
    articleData: React.PropTypes.object,
    articleKey: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //this.prepareAd();
  }

  prepareAd() {
    AdMobInterstitial.setAdUnitID('ca-app-pub-4870542892593937/8016550008');
    AdMobInterstitial.setTestDeviceID('EMULATOR');
    AdMobInterstitial.requestAd((error) => error && console.log(error));
    AdMobInterstitial.addEventListener('interstitialDidLoad',
      () => AdMobInterstitial.showAd((error) => error && console.log(error)));
  }

  render() {
    return (
      <Text>ITEM PAGE</Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    paddingTop: 65,
    paddingBottom: 50,
  }
});