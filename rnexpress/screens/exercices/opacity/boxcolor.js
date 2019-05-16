import React from 'react';
import { Animated, StyleSheet, Text, View, Button } from 'react-native';
import { getRandomIntInclusive } from '../../../utils'

export default class BoxColor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      animation: new Animated.Value(1)
    }
  }

  componentDidMount(){
    this.hideTheBoxes();
  }

  hideTheBoxes(){
    this.animatedBoxesTo(0, ()=>{this.showTheBoxes(1)});
  }

  showTheBoxes(){
    this.animatedBoxesTo(1, ()=>{this.hideTheBoxes(1)});
  }

  animatedBoxesTo(_toValue, cb){
    Animated.timing(this.state.animation, {
      toValue: _toValue,
      duration: 350,
      useNativeDriver: true,
      delay: getRandomIntInclusive(100, 1500)
    }).start(cb);
  }

  render(){
    const animatedStyles = {
      opacity: this.state.animation
    }

    return(
      <Animated.View style={[{height:this.props.height, width: this.props.width, backgroundColor:this.props.backgroundColor}, animatedStyles]}>

      </Animated.View>);
  }
}
