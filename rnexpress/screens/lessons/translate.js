import React from 'react';
import { Animated, TouchableWithoutFeedback, StyleSheet, View } from 'react-native';

export default class TranslateClass extends React.Component {
  static navigationOptions ={
    title: "Translate Lesson"
  }

  constructor(props){
    super(props);
    this.state = {
      animation: new Animated.Value(0)
    }
  }

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 300,
      duration: 1500,
      useNativeDriver: true
    }).start(() => {
      this.state.animation.setValue(0)
    })
  }

  render(){
    const animatedStyle = {
        transform: [
          {
            translateY: this.state.animation
          }
        ]
    }

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
})
