import React from 'react';
import { Animated, TouchableWithoutFeedback, StyleSheet, View } from 'react-native';

export default class InterpolationClass extends React.Component {
  static navigationOptions ={
    title: "Interpolation Lesson"
  };

  constructor(props){
    super(props);
    this.state = {
        animation: new Animated.Value(0),
        rotateAnim: new Animated.Value(0),
        animationExtra: new Animated.Value(1)
    }
  }

  startAnimation = () => {
    Animated.parallel([
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

  startAnimationExtra = () => {
    Animated.timing(this.state.animationExtra, {
      toValue: 3,
      duration: 1500
    }).start(()=>{
      Animated.timing(this.state.animationExtra, {
        toValue: 0,
        duration: 300
      }).start()
    })
  }

  render(){
      const boxInterpolation = this.state.animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["hsla(341, 63%, 32%, 1)", "hsla(214, 82%, 13%, 1)"]
      });

      const colorViewInterpolation = this.state.animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["hsla(214, 82%, 13%, 1)", "hsla(341, 63%, 32%, 1)"]
      });

      // const rotateInterpolate = this.state.rotateAnim.interpolate({
      //   inputRange: [0, 1],
      //   outputRange: ["0deg", "360deg"]
      // })

      const rotateInterpolateX = this.state.rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0rad", "6.28319rad"]
      })

      const rotateInterpolateY = this.state.rotateAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ["0deg", "0deg", "180deg"]
      })

      const boxAnimatedStyle={
        backgroundColor: boxInterpolation
      };

      const colorAnimatedStyle = {
        backgroundColor: colorViewInterpolation
      };

      const animationExtraInterpolate = this.state.animationExtra.interpolate({
        inputRange: [1, 2],
        outputRange: [1, 2],
        extrapolateLeft: "clamp"
      })

      const rotateStyle = {
        transform: [
          {
            rotateX: rotateInterpolateX,
          },
          {
            rotateY: rotateInterpolateY
          }
        ]
      }

      const extraStyle = {
        transform: [{ scale: animationExtraInterpolate }]
      }

    return(
      <Animated.View style={[styles.container, colorAnimatedStyle]}>
        <TouchableWithoutFeedback  onPress={this.startAnimation}>
            <Animated.View style={[styles.box, boxAnimatedStyle, rotateStyle]}>
                <Animated.Text style={{color:'white'}}>
                    Hello Animation !
                </Animated.Text>
            </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback  onPress={this.startAnimationExtra}>
            <Animated.View style={[styles.box, boxAnimatedStyle, extraStyle]}>
                <Animated.Text style={{color:'white'}}>
                    Hello Extrapolate !
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
    marginBottom:20
  }
});
