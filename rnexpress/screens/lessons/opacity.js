import React from 'react';
import { Animated, TouchableWithoutFeedback, StyleSheet, View } from 'react-native';

export default class OpacityClass extends React.Component {
  static navigationOptions ={
    title: "Opacity Lesson"
  }

  constructor(props){
    super(props);
    this.state = {
      animation: new Animated.Value(1)
    }
  }

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 350
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 350
      }).start()
    });
  }

  render(){
    const animatedStyles = {
      opacity: this.state.animation
    }

    return(
      <View style={styles.container}>
        <TouchableWithoutFeedback  onPress={this.startAnimation}>
          <Animated.View style={[styles.box, animatedStyles]}/>
        </TouchableWithoutFeedback>
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "center",
    alignItems: "center"
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "tomato"
  }
})
