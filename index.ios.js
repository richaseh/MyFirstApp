import React, { Component } from 'react';
import Sketch from 'react-native-sketch';
import {
  AppRegistry,
  Button,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class DigitalTouch extends Component {
  state = {
    color: '#FFFFFF',
    path: null,
    showModal: true
  };

  onColorChange = (color) => {
    this.setState({ color });
  };

  onChange = () => {
    console.log('onChange event'); // eslint-disable-line no-console
  };

  clear = () => {
    this.sketch.clear();
  };

  save = () => {
    this.sketch.save().then((pathObj) => {
      this.setState({
        path: pathObj.path,
        showModal: true
      });
    });
  };

  renderColorButton = (color) => {
    const active = color === this.state.color;

    return (
      <TouchableOpacity
        onPress={() => this.onColorChange(color)}
        style={[
          styles.colorButton,
          {
            backgroundColor: active ? '#000' : color,
            borderColor: 'black',
          },
        ]}
      />
    );
  };

  render() {
    return (
      
      <View style={styles.container}>
        <StatusBar barStyle={this.state.path ? 'default' : 'light-content'} />
        <View style={styles.colorsBar}>
          {this.renderColorButton('#20BBFC')}
          {this.renderColorButton('#2DFD2F')}
          {this.renderColorButton('#FD28F9')}
          {this.renderColorButton('#EA212E')}
          {this.renderColorButton('#FD7E24')}
          {this.renderColorButton('#00ffffff')}
          {this.renderColorButton('#FFFFFF')}
          {this.renderColorButton('pink')}
        </View>
        <View style={styles.colorsBar}>
          {this.renderColorButton('#20BBFC')}
          {this.renderColorButton('#2DFD2F')}
          {this.renderColorButton('#FD28F9')}
          {this.renderColorButton('#EA212E')}
          {this.renderColorButton('#FD7E24')}
          {this.renderColorButton('#FFFA38')}
          {this.renderColorButton('#FFFFFF')}
          {this.renderColorButton('#00ffffff')}
        </View>
        
        <Sketch
          imageType="png"
          onChange={this.onChange}
          ref={(sketch) => {
            this.sketch = sketch;
          }}
          strokeColor={this.state.color}
          strokeThickness={17} 
          style={styles.sketch}>
          <Image source={require('./b.png')} style={styles.img} resizeMode='cover' />
          </Sketch>
        <View style={styles.actionsBar}>
          <Button color="#EA212E" onPress={this.clear} title="❌ Clear" />
          <Button color="#1DBD21" onPress={this.save} title="Save  ✅" />
        </View>
        <Modal animationType="slide" visible={!!this.state.path && this.state.showModal}>
          <View style={styles.modal}>
            <Text style={styles.title}>Here is the image you created.</Text>
            <Image
              resizeMode="contain"
              source={{ uri: `file://${this.state.path}` }}
              style={styles.image}
            />
            <Button title='ok' onPress={() => this.setState({showModal: false})} />
          </View>
        </Modal>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  img: {
    flex: 1,
    height: null,
    width: null,
    borderRadius: 20,
    margin: 2,
    alignItems: 'stretch',
    //cover: 'stretch'
  },
  container: {
  //  backgroundColor: '#191919',
    flex: 1,
    paddingTop: 20,
  },
  colorsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    paddingTop: 1,
  },
  colorButton: {
    borderRadius: 50,
    borderWidth: 1,
    width: 25,
    height: 25,
  },
  sketch: {
    borderRadius: 20,
    margin: 5,
    alignItems: 'stretch',
  },
  actionsBar: {
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 2,
    paddingHorizontal: 2,
  },
  modal: {
    //backgroundColor: '#F5FCFF',
    paddingTop: 20,
    flex: 1,
  },
  title: {
    color: '#333333',
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    flex: 1,
    margin: 20,
    alignItems: 'stretch',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => DigitalTouch);