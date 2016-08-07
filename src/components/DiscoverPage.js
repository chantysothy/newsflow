import React, {Component} from 'react';
import {
  ListView,
  ScrollView,
  RefreshControl,
  Image,
  StyleSheet,
} from 'react-native';
import ArticleCard from '../components/ArticleCard';
import SearchBar from 'react-native-search-bar';

import { rootRef } from '../lib/firebaseInit.js';

export default class DiscoverPage extends Component {
  static propTypes = {
    navigator: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };

    this._articlesRef = rootRef.child('articles');

    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    this.listenForItems(this._articlesRef);
  }

  listenForItems(articlesRef) {
    articlesRef.orderByChild('negativeTimestamp').limitToLast(100).on('value', (snap) => {

      // get children as an array
      let items = [];
      snap.forEach((child) => {
        items.push({
          data: child.val(),
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  renderRow(item) {
    return (
      <ArticleCard itemData={item.data} itemKey={item._key} navigator={this.props.navigator}/>
    );
  }

  render() {
    return (
      <Image source={require('../../img/background.jpg')} style={styles.container}>
         <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          keyboardDismissMode="on-drag"
          enableEmptySections={true}
        />
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null
  }
});
