import React from 'react';
import { Animated, Dimensions, TouchableWithoutFeedback, PanResponder, StyleSheet, Text, View } from 'react-native';

import Cat1 from "../../assets/imgs/cat1.jpeg";
import Cat2 from "../../assets/imgs/cat2.jpeg";
import Cat3 from "../../assets/imgs/cat3.jpeg";
import Cat4 from "../../assets/imgs/cat4.jpeg";

const SWIPE_THRESHOLD = 120;
const { height } = Dimensions.get('window');

export default class AnimatedFunctionsClass extends React.Component {
  static navigationOptions ={
    title: "AnimatedFunctions Lesson"
  };

  constructor(props){
    super(props);
    this.state = {
      items: [
        {
          image: Cat1,
          id: 1,
          text: "Sweet Cat"
        },
        {
          image: Cat2,
          id: 2,
          text: "Sweeter Cat"
        },
        {
          image: Cat3,
          id: 3,
          text: "Sweetest Cat"
        },
        {
          image: Cat4,
          id: 4,
          text: "Aww"
        },
      ],
      animation: new Animated.ValueXY(),
      opacity: new Animated.Value(1)
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState)=>true,
      onMoveShouldSetPanResponder: (e, gestureState)=>true,
      onPanResponderMove: (e, gestureState) => Animated.event([null,
        {
          dx: this.state.animation.x,
          dy: this.state.animation.y
        }]),
      onPanResponderRelease: (e, gestureState) => {}
    })
  }

  render(){

    return(
        <View style={styles.container}>
          <View style={styles.top}>
          </View>
          {
            this.state.items.slice(0,2).reverse().map((
                {image, id, text}, index, items
            )=>{
              return (
                  <Animated.View key={id} style={[styles.card]}>
                    <Animated.Image
                        source={image}
                        resizeMode="cover"
                        style={[styles.image]}/>
                    <View style={styles.lowerText}>
                      <Text>{text}</Text>
                    </View>
                  </Animated.View>
              )
            })
          }
          <View style={styles.buttonBar}>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  top:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  card: {
    width: 300,
    height: 300,
    position: 'absolute',
    borderRadius: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {x: 0, y:0}
  }
});
