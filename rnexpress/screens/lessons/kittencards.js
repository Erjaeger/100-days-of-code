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
      animation: new Animated.ValueXY(0),
      opacity: new Animated.Value(1),
      next: new Animated.Value(0.9)
    }

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState)=>true,
      onMoveShouldSetPanResponder: (e, gestureState)=>true,
      onPanResponderMove: Animated.event([null,
        {
          dx: this.state.animation.x,
          dy: this.state.animation.y
        }]),
      onPanResponderRelease: (e, {dx, vx, vy}) => {
        
      }
    })
  }

  render(){

    const { animation } = this.state;
    const rotate = animation.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ["-30deg", "0deg", "30deg"],
      extrapolate: "clamp"
    })

    const opacity = animation.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [0.5, 1, 0.5],
      extrapolate: "clamp"
    })

    const animatedCardStyles = {
      opacity: this.state.opacity,
      transform: [
        {
          rotate
        },
        ...animation.getTranslateTransform()

      ]
    }

    const animatedImageStyles = {
      opacity
    }

    return(
        <View style={styles.container}>
          <View style={styles.top}>
          </View>
          {
            this.state.items.slice(0,2).reverse().map((
                {image, id, text}, index, items
            )=>{
              const isLastItem = index === items.length - 1;
              const isSecondToLast = index === items.length -2;

              const panHandlers = isLastItem ? this._panResponder.panHandlers : {};
              const cardStyle = isLastItem ? animatedCardStyles : undefined;
              const imageStyle = isLastItem ? animatedImageStyles : undefined;

              const nextStyle = isSecondToLast ? {transform: [{scale:this.state.next}]} : undefined
            
              return (
                  <Animated.View key={id} style={[styles.card, cardStyle, nextStyle]} {...this._panResponder.panHandlers}>
                    <Animated.Image
                        source={image}
                        resizeMode="cover"
                        style={[styles.image, imageStyle]}/>
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
    justifyContent:'center',
    alignItems:'center'
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
    shadowOffset: {x: 0, y:0},
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "#FFF",
    elevation: 2
  },
  image: {
    width: null,
    height: null,
    flex: 3,
    borderRadius: 2
  },
  lowerText: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 5
  }
});
