import React from 'react';
import { Animated, TouchableWithoutFeedback, StyleSheet, View, Text } from 'react-native';

export default class ValueFunctClass extends React.Component {
  static navigationOptions ={
    title: "ValueFunct Lesson"
  };

  constructor(props){
    super(props);
    this.state = {
        animationTransform: new Animated.ValueXY(0),
        animationPosition: new Animated.ValueXY(0),
        textTransform: "Value X : 0"
    }
  }

  componentDidMount = () => {
      this.state.animationTransform.addListener((value) => {
        this.setState({textTransform : `Value X : ${value.x}`})
      })
  };

  componentWillUnmount = () => {
      this.state.animationTransform.removeListener();
  };

  startAnimationTransform = () => {
      Animated.timing(this.state.animationTransform, {
          toValue: 300,
          duration: 1500,
          useNativeDriver: true,
      }).start()
  };

  startAnimationPosition = () => {
    Animated.timing(this.state.animationPosition, {
        toValue: 100,
        duration: 500,
    }).start()
  };

  render(){
    const animatedStyleTransform = {
        transform: this.state.animationTransform.getTranslateTransform()
    };

    const animatedStylePosition = this.state.animationPosition.getLayout();

    return(
      <View style={styles.container}>
        <TouchableWithoutFeedback  onPress={this.startAnimationTransform}>
            <Animated.View style={[styles.box, animatedStyleTransform]}>
                <Text style={{color:'white'}}>{this.state.textTransform}</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.startAnimationPosition}>
            <Animated.View style={[styles.box, animatedStylePosition]}>
                <Text style={{color:'white'}}>Absolute</Text>
            </Animated.View>
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
