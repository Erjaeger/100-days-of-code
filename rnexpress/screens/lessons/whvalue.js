import React from 'react';
import { Animated, TouchableWithoutFeedback, StyleSheet, View, Text } from 'react-native';

export default class WHValueClass extends React.Component {
  static navigationOptions ={
    title: "WHValue Lesson"
  }

  constructor(props){
    super(props);
    this.state = {
      animation: new Animated.Value(200)
    }
  }

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 100,
      duration: 1500
    }).start();
  }

  render(){
    const animatedStyle = {
      width: this.state.animation,
      height: this.state.animation
    }

    return(
      <View style={styles.container}>
        <TouchableWithoutFeedback  onPress={this.startAnimation}>
        <Animated.View style={[styles.box, animatedStyle]}>
          <Text>I'm a text ! I'm a text ! I'm a text ! I'm a text !</Text>
          <Text>I'm a text !</Text>
          <Text>I'm a text !</Text>
          <Text>I'm a text !</Text>
        </Animated.View>
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
    // height: 150,
    // width: 150,
    backgroundColor: "#851E3E",
     overflow: "hidden"
  }
})
