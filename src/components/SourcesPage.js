import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import SettingsList from 'react-native-settings-list';

import { FirstColor } from '../config/ThemeColors';
import { Sources } from '../config/Sources';

export default class SourcesPage extends Component {
  static propTypes = {
    selected: React.PropTypes.object,
    setSelection: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

  }

  onValueChange(sourceId, value) {
    console.log('id ' + sourceId + ' val ' + value);
    this.props.setSelection(sourceId, value);
  }

  render() {
    return (
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            <SettingsList.Header headerStyle={{marginTop:0}}/>

            {Sources.map((source) => {
              return (
                <SettingsList.Item
                  hasSwitch={true}
                  switchState={this.props.selected[source.id]}
                  switchOnValueChange={(value) => this.onValueChange(source.id, value)}
                  hasNavArrow={false}
                  title={source.name}
                  key={source.id}
                />
              );
            })}

          </SettingsList>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  titleInfoStyle:{
    fontSize:16,
    color: '#8e8e93'
  }
});
