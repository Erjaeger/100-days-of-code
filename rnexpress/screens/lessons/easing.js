import React from 'react';
import { Animated, TouchableWithoutFeedback, StyleSheet, View, Easing } from 'react-native';

export default class EasingClass extends React.Component {
  static navigationOptions ={
    title: "Easing Lesson"
  };

  constructor(props){
    super(props);
    this.state = {
        animation: new Animated.Value(0),
    }
  }

  startAnimation = () => {
      Animated.timing(this.state.animation, {
          toValue: 300,
          duration: 500,
          useNativeDriver: true,
      }).start()
  };


  render(){
    const animatedStyle = {
        transform: [
            {
                translateX: this.state.animation
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
    alignItems: "flex-start",
    backgroundColor: "#061E3E"
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "#851E3E"
  }
});
