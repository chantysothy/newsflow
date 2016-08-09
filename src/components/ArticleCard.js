import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  processColor
} from 'react-native';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import Browser from 'react-native-browser';
import { FirstColor, FourthColor } from '../config/ThemeColors';

// timestamp
import moment from 'moment';
import CustomRelativeTime from '../config/CustomRelativeTime';
moment.updateLocale('en', CustomRelativeTime);

export default class ArticleCard extends Component {
  static propTypes = {
    articleData: React.PropTypes.object,
    articleKey: React.PropTypes.string,
    navigator: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.onContentPress = this.onContentPress.bind(this);
  }

  onContentPress() {
    Browser.open(this.props.articleData.url, {
                    showUrlWhileLoading: true,
                    loadingBarTintColor: processColor(FirstColor),
                    navigationButtonsHidden: false,
                    showActionButton: true,
                    showDoneButton: true,
                    doneButtonTitle: 'Done',
                    showPageTitles: true,
                    disableContextualPopupMenu: false,
                    hideWebViewBoundaries: false,
                    buttonTintColor: processColor(FirstColor)
                  });
  }

  render() {
    let footer = 
      <View style={{marginTop: 3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <TouchableOpacity style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 18, color: FirstColor}}><FaIcon name="comment-o" size={23} />&nbsp;0</Text>
        </TouchableOpacity>
        <Image resizeMode={'contain'} style={{height: 30, width: 60}} source={{uri: this.props.articleData.urlToSourceLogo}}/>
      </View>;


    return (
      <View style={styles.cardContainer}>
        <Text style={{color: 'gray', fontWeight: 'bold'}}>
          {this.props.articleData.sourceName}
          &nbsp;&bull;&nbsp;
          {moment().from(this.props.articleData.timestamp, true)}
        </Text>

        <TouchableOpacity onPress={this.onContentPress}>
          <Image style={styles.image} source={{uri: this.props.articleData.urlToImage}} />

          <Text style={styles.title}>
            {this.props.articleData.title}
          </Text>   

          <Text style={styles.description}>
            {this.props.articleData.description}
          </Text>
        </TouchableOpacity>

        {footer}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 100,
  },
  title: {
    fontWeight: 'bold'
  },
  description: {
    color: 'gray'
  },
  cardContainer: {
    margin: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  }
});
