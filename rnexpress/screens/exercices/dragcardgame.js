import React from 'react';
import { Animated, TouchableWithoutFeedback, PanResponder, StyleSheet, StatusBar, View, Text, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const BLOCK_SIZE = 50;
const LIMIT_WIDTH_MIN = -(width/2)+BLOCK_SIZE/2;
const LIMIT_WIDTH_MAX = width/2-BLOCK_SIZE/2;
const LIMIT_HEIGHT_MIN = -(width/2)+BLOCK_SIZE/2;
const LIMIT_HEIGHT_MAX = width/2-BLOCK_SIZE/2;

export default class DragCardGameClass extends React.Component {
  static navigationOptions ={
    title: "DragCardGame Lesson"
  }

  constructor(props){
    super(props);
    this.state = {
        animation: new Animated.ValueXY()
    }

    this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState)=>true,
        onPanResponderGrant: () => {
          this.state.animation.extractOffset();
        },
        onPanResponderMove: Animated.event([null, {
          dx: this.state.animation.x,
          dy: this.state.animation.y
        }]),
        onPanResponderRelease: (evt, gestureState)=>{
          Animated.decay(this.state.animation, {
              velocity: {x:gestureState.vx, y:gestureState.vy},
              deceleration: 0.997,
              useNativeDriver: true
          }).start();
        }
    })
  }

  componentDidMount = () => {
    this.state.animation.addListener((value) => {
      if(value.x >= LIMIT_WIDTH_MAX || value.x <= LIMIT_WIDTH_MIN ){
        Animated.decay(this.state.animation).stop();
      }
    })
  }



  render(){
    

    const transformXInterpolated = this.state.animation.x.interpolate({
      inputRange: [ LIMIT_WIDTH_MIN, LIMIT_WIDTH_MAX ],
      outputRange: [ LIMIT_HEIGHT_MIN, LIMIT_HEIGHT_MAX ],
      extrapolate: 'clamp'
    })

    const transformYInterpolated = this.state.animation.y.interpolate({
      inputRange: [-(height/2)+BLOCK_SIZE/2, height/2-BLOCK_SIZE/2],
      outputRange: [-(height/2)+BLOCK_SIZE/2, height/2-BLOCK_SIZE/2],
      extrapolate: 'clamp'
    })

    const animatedBoxStyle={
        transform: [
          {
            translateX: transformXInterpolated,
          },
          {
            translateY: transformYInterpolated
          }
        ]
    }

    return(
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Animated.View style={[styles.box, animatedBoxStyle]} {...this._panResponder.panHandlers}/>
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#061E3E",
    height,
    width
  },
  box: {
    height: 50,
    width: 50,
    backgroundColor: "#851E3E"
  }
})
