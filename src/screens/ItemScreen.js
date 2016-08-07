import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import ItemPage from '../components/ItemPage';

import { FirstColor } from '../config/ThemeColors';

// this is a traditional React component connected to the redux store
class ItemScreen extends Component {
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
    itemData: React.PropTypes.object,
    itemKey: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ItemPage itemData={this.props.itemData} itemKey={this.props.itemKey}/>
    );
  }

}

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(ItemScreen);
