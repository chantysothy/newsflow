import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import CommentsPage from '../components/CommentsPage';

import { FirstColor } from '../config/ThemeColors';

// this is a traditional React component connected to the redux store
class CommentsScreen extends Component {
  static navigatorStyle = {
    navBarTextColor: FirstColor,
    navBarBackgroundColor: '#ffffff',
    navBarButtonColor: FirstColor,
    drawUnderNavBar: false,
    drawUnderTabBar: false,
    navBarTranslucent: true,
    tabBarHidden: true,
  };

  static propTypes = {
    articleData: React.PropTypes.object,
    articleKey: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CommentsPage articleData={this.props.articleData} articleKey={this.props.articleKey}/>
    );
  }

}

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(CommentsScreen);
