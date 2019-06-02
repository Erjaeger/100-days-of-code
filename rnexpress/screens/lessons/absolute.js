import React from 'react';
import { Animated, TouchableWithoutFeedback, StyleSheet, View } from 'react-native';

export default class AbsoluteClass extends React.Component {
  static navigationOptions ={
    title: "Absolute Lesson"
  };

  constructor(props){
    super(props);
    this.state = {
      animation: new Animated.Value(50)
    }
  }

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 200,
      duration: 1500,
    }).start();
  };

  render(){
    const animatedStyle = {
      top: this.state.animation,
      left: this.state.animation,
    };

    return(
      <View style={styles.container}>
        <TouchableWithoutFeedback  onPress={this.startAnimation}>
          <Animated.View style={[styles.box, animatedStyle]}/>
        </TouchableWithoutFeedback>
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#061E3E"
  },
  box: {
    height: 150,
    width: 150,
    position:'absolute',
    backgroundColor: "#851E3E"
  }
});
