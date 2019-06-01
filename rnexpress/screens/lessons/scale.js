import React from 'react';
import { Animated, TouchableWithoutFeedback, StyleSheet, View } from 'react-native';

export default class ScaleClass extends React.Component {
  static navigationOptions ={
    title: "Scale Lesson"
  };

  constructor(props){
    super(props);
    this.state = {
      animation: new Animated.Value(1)
    }
  }

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 2,
      duration: 1500,
      useNativeDriver: true
    }).start(()=>{
      this.state.animation.setValue(1)
    });
  };

  render(){
    const animatedStyle = {
      transform : [
        {
          scale : this.state.animation
        }
      ]
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
    backgroundColor: "#851E3E"
  }
});
