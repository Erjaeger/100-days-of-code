import React from 'react';
import { Animated, TouchableWithoutFeedback, StyleSheet, View } from 'react-native';

export default class WHPercentageClass extends React.Component {
  static navigationOptions ={
    title: "WHPercentage Lesson"
  };

  constructor(props){
    super(props);
    this.state = {
        animation: new Animated.Value(0)
    }
  }

  startAnimation = () => {
      Animated.timing(this.state.animation, {
          toValue: 1,
          duration:1500
      }).start(()=>{
          Animated.timing(this.state.animation, {
              toValue: 0,
              duration: 1500
          }).start()
      });
  };

  render(){
      const boxInterpolation = this.state.animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["40%", "90%"]
      });

      const boxAnimatedStyle = {
        width: boxInterpolation,
        height: boxInterpolation
      };

    return(
      <Animated.View>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
            <Animated.View style={[styles.box, boxAnimatedStyle]}>
            </Animated.View>
        </TouchableWithoutFeedback>
      </Animated.View>);
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
    height: "40%",
    width: "40%",
    backgroundColor:"#851E3E"
  }
});
