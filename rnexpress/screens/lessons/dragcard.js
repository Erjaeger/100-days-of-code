import React from 'react';
import { Animated, TouchableWithoutFeedback, PanResponder, StyleSheet, View } from 'react-native';

export default class DragCardClass extends React.Component {
  static navigationOptions ={
    title: "Drag Card Lesson"
  };

  constructor(props){
    super(props);
    this.state = {
      animation: new Animated.ValueXY(0)
    }
  }

  componentWillMount(){
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant : ()=>{
        this.state.animation.extractOffset();
      },
      onPanResponderMove: Animated.event([
        null, {
          dx: this.state.animation.x,
          dy: this.state.animation.y
        }
      ]),
      onPanResponderRelease: (e, {vx, vy}) => {
        Animated.decay(this.state.animation, {
          velocity: { x:vx, y:vy },
          deceleration: 0.997,
          useNativeDriver: true
        }).start()
      }
    })
  }


  render(){
    const animatedStyle = {
      transform: this.state.animation.getTranslateTransform()
    };

    return(
      <View style={styles.container}>
          <Animated.View style={[styles.box, animatedStyle]} {...this._panResponder.panHandlers} />
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
    height: 50,
    width: 50,
    backgroundColor: "#851E3E"
  }
});
