import React from 'react';
import { Animated, TouchableWithoutFeedback, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class AnimatedFunctionsClass extends React.Component {
  static navigationOptions ={
    title: "AnimatedFunctions Lesson"
  };

  constructor(props){
    super(props);
    this.state = {
      animation: new Animated.Value(1),
      animationBackground : new Animated.Value(0)
    }
  }

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 300,
      duration: 1500,
      useNativeDriver: true
    }).start(()=>{
        this.state.animation.setValue(0)
    });
  };

  startAnimationSpring = (friction, tension) => {
      Animated.spring(this.state.animation, {
          toValue: 300,
          duration: 1500,
          useNativeDriver: true,
          friction,
          tension
      }).start(()=>{this.state.animation.setValue(0)})
  };

  startAnimationLoop = () => {
      Animated.loop(Animated.timing(this.state.animation, {
        toValue: 300,
        duration: 1500,
        useNativeDriver: true
      })).start()
  };
  

  render(){
    const animatedStyle = {
      transform : [
        {
          translateX: this.state.animation
        }
      ]
    };

    const animatedInterpolate = this.state.animation.interpolate({
        inputRange: [0, 150, 300],
        outputRange: [0, 300, 0]
    });

    const animatedStyleInterpolate = {
        transform: [
            {
                translateX: animatedInterpolate
            }
        ]
    };

    const backgroundInterpolate = this.state.animationBackground.interpolate({
        inputRange: [0, 3000],
        outputRange: ["rgb(255,99,71)", "rgb(99, 71, 255)"]
    });

    const backgroundStyle = {
        backgroundColor: backgroundInterpolate
    };

    return(
      <View style={styles.container}>
          <ScrollView style={{width:'100%'}} scrollEventThrottle={16}
          onScroll={Animated.event([
              {
                  nativeEvent: {
                      contentOffset : {
                          y : this.state.animationBackground
                      }
                  }
              }
          ])}>
            <Animated.View style={[styles.content, backgroundStyle]}>
                <TouchableWithoutFeedback  onPress={this.startAnimation}>
                    <Animated.View style={[styles.box, animatedStyle]}>
                        <Text style={{color:"white"}}>Timing</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>{this.startAnimationSpring(2, 140)}}>
                    <Animated.View style={[styles.box, animatedStyle]}>
                        <Text style={{color:"white"}}>Loose Spring</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>{this.startAnimationSpring(15, 140)}}>
                    <Animated.View style={[styles.box, animatedStyle]}>
                        <Text style={{color:"white"}}>Hard Spring</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.startAnimationLoop}>
                    <Animated.View style={[styles.box, animatedStyleInterpolate]}>
                        <Text style={{color:"white"}}>Loop</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Animated.View>  
        </ScrollView>
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#061E3E",
  },
  content: {
    height: 3000,
    paddingTop: 30
  },
  box: {
    height: 50,
    width: 50,
    marginBottom:10,
    backgroundColor: "#851E3E"
  }
});
