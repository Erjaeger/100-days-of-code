import React from 'react';
import { Animated, TouchableWithoutFeedback, StyleSheet, View } from 'react-native';

export default class InterpolationClass extends React.Component {
  static navigationOptions ={
    title: "Interpolation Lesson"
  }

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
  }

  render(){
      const boxInterpolation = this.state.animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["hsla(341, 63%, 32%, 1)", "hsla(214, 82%, 13%, 1)"]
      })

      const colorViewInterpolation = this.state.animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["hsla(214, 82%, 13%, 1)", "hsla(341, 63%, 32%, 1)"]
      })

      const boxAnimatedStyle={
        backgroundColor: boxInterpolation
      }

      const colorAnimatedStyle = {
        backgroundColor: colorViewInterpolation
      }

    return(
      <Animated.View style={[styles.container, colorAnimatedStyle]}>
        <TouchableWithoutFeedback  onPress={this.startAnimation}>
            <Animated.View style={[styles.box, boxAnimatedStyle]}>
                <Animated.Text style={{color:'white'}}>
                    Hello Animation !
                </Animated.Text>
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
    height: 150,
    width: 150,
  }
})
