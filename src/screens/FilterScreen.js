import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import * as filterActions from '../reducers/filter/actions';

import FilterPage from '../components/FilterPage';

import { FirstColor } from '../config/ThemeColors';

// this is a traditional React component connected to the redux store
class FilterScreen extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        title: 'close', // for a textual button, provide the button title (label)
        id: 'close', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
      },
    ]
  };

  static navigatorStyle = {
    navBarTextColor: FirstColor,
    navBarBackgroundColor: '#ffffff',
    navBarButtonColor: FirstColor,
    drawUnderNavBar: false,
    drawUnderTabBar: false,
    navBarTranslucent: true,
    tabBarHidden: true,
  };

  constructor(props) {
    super(props);

    this.setSelection = this.setSelection.bind(this);
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

  setSelection(sourceId, value) {
    this.props.dispatch(filterActions.setSelection(sourceId, value));
  }

  render() {
    return (
        <FilterPage selected={this.props.selected} setSelection={this.setSelection}/>
    );
  }

}

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    selected: state.filter.selected,
  };
}

export default connect(mapStateToProps)(FilterScreen);
