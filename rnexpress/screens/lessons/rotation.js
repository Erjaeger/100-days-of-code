import React from 'react';
import { Animated, TouchableWithoutFeedback, StyleSheet, View } from 'react-native';

export default class Rotation extends React.Component {
  static navigationOptions ={
    title: "Rotation Lesson"
  }

  constructor(props){
    super(props);
    this.state = {
        animation: new Animated.Value(0)
    }
  }

  startAnimation = () => {
    Animated.timing(this.state.animation, {
        toValue: 360,
        duration: 5000,
        useNativeDriver: true
    }).start()
  }

  render(){
    const rotateInterpolate = this.state.animation.interpolate({
        inputRange: [0, 360],
        outputRange: ["0deg", "360deg"]
    })

    const animatedStyles = {
        transform : [
            {
                rotate: rotateInterpolate
            }
        ]
    }

    return(
      <View style={styles.container}>
        <TouchableWithoutFeedback  onPress={this.startAnimation}>
            <Animated.View style={[styles.box, animatedStyles]}>
                <Animated.Text style={[{color:"#FFFFFF"}]}>
                    Hello Rotate !
                </Animated.Text>
            </Animated.View>
        </TouchableWithoutFeedback>
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#061E3E",
    
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "#851E3E"
  }
})
