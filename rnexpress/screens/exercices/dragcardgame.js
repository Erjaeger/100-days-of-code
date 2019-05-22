import React from 'react';
import { Animated, TouchableWithoutFeedback, PanResponder, StyleSheet, StatusBar, View, Text, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');



const BLOCK_SIZE = 50;
const LIMIT_WIDTH_MIN = -(width/2)+BLOCK_SIZE/2;
const LIMIT_WIDTH_MAX = width/2-BLOCK_SIZE/2;
const LIMIT_HEIGHT_MIN = -(height/2)+BLOCK_SIZE/2;
const LIMIT_HEIGHT_MAX = height/2-BLOCK_SIZE/2;


console.log(width, height);
console.log(LIMIT_WIDTH_MIN, LIMIT_WIDTH_MAX, LIMIT_HEIGHT_MIN, LIMIT_HEIGHT_MAX)


export default class DragCardGameClass extends React.Component {
  static navigationOptions ={
    title: "DragCardGame Lesson"
  }

  constructor(props){
    super(props);
    this.state = {
        animation: new Animated.ValueXY()
    }


    let triggeredLimitX = false
    let triggeredLimitY = false

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
        }]),
        onPanResponderRelease: (evt, gestureState)=>{
          this.state.animation.flattenOffset()
          Animated.decay(this.state.animation, {
            velocity: {x:gestureState.vx, y:gestureState.vy},
            deceleration: 0.997,
            useNativeDriver: true
          }).start()
      }
    })
  }

  componentDidMount = () => {
    this.state.animation.addListener((value) => {
      if((value.x > LIMIT_WIDTH_MAX || value.x < LIMIT_WIDTH_MIN )&& !this.triggeredLimitX ){
        
        this.triggeredLimitX = true;
        this.state.animation.stopAnimation(()=>{
          this.state.animation.setValue({x:value.x > 0 ? LIMIT_WIDTH_MAX : LIMIT_WIDTH_MIN, y:value.y});
          this.triggeredLimitX = false
        });
      }

      if((value.y > LIMIT_HEIGHT_MAX || value.y < LIMIT_HEIGHT_MIN )&& !this.triggeredLimitY){
        
        this.triggeredLimitY = true;
        this.state.animation.stopAnimation(()=>{
          this.state.animation.setValue({x: value.x, y:value.y > 0 ? LIMIT_HEIGHT_MAX : LIMIT_HEIGHT_MIN});
          this.triggeredLimitY = false
        });
      }
    })
  }



  render(){
    

    // const transformXInterpolated = this.state.animation.x.interpolate({
    //   inputRange: [ LIMIT_WIDTH_MIN, LIMIT_WIDTH_MAX ],
    //   outputRange: [ LIMIT_HEIGHT_MIN, LIMIT_HEIGHT_MAX ],
    //   extrapolate: 'clamp'
    // })

    // const transformYInterpolated = this.state.animation.y.interpolate({
    //   inputRange: [ LIMIT_WIDTH_MIN, LIMIT_WIDTH_MAX ],
    //   outputRange: [ LIMIT_HEIGHT_MIN, LIMIT_HEIGHT_MAX ],
    //   extrapolate: 'clamp'
    // })

    const animatedBoxStyle={
        transform: this.state.animation.getTranslateTransform()
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
