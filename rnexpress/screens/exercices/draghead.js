import React from 'react';
import { Animated, TouchableWithoutFeedback, Image, PanResponder, StyleSheet, View } from 'react-native';

export default class DragHeadClass extends React.Component {
  static navigationOptions ={
    title: "Drag head"
  };

  constructor(props){
    super(props);
    this.state = {
        nbrOfHeads:2,
        firstHead: new Animated.ValueXY(0),
        secondHead: new Animated.ValueXY(0)
    }

    this.state.firstHead.addListener((value)=>{
        console.log(value)
        Animated.sequence([
            Animated.delay(30),
            Animated.parallel([
                Animated.timing(this.state.secondHead.x, {
                    toValue: value.x,
                    duration: 0,
                    useNativeDriver: true
                }),
                Animated.timing(this.state.secondHead.y, {
                    toValue: value.y,
                    duration: 0,
                    useNativeDriver: true
                })
            ])
        ]).start();
    });

  this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
          this.state.firstHead.extractOffset();
      },
      onPanResponderMove: Animated.event([null, {
          dx: this.state.firstHead.x,
          dy: this.state.firstHead.y
      }])
  })
  }

  generateHeads = () => {
      let dom = []

      const transformSecondAnimatedStyle = {
          transform: [
              {
                  translateX: this.state.secondHead.x
              },
              {
                  translateY: this.state.secondHead.y
              }
          ]
      }

      dom.push(<Animated.View style={[styles.head, transformSecondAnimatedStyle]} key={1}>
          <Image source={require('../../assets/imgs/cat1.jpeg')} style={styles.imageHead} />
      </Animated.View>)

        const transformAnimatedStyle = {
            transform: [
                {
                    translateX: this.state.firstHead.x
                },
                {
                    translateY: this.state.firstHead.y
                }
            ]
        }

        dom.push(<Animated.View style={[styles.head, transformAnimatedStyle]} key={2} {...this._panResponder.panHandlers}>
                <Image source={require('../../assets/imgs/cat1.jpeg')} style={styles.imageHead} />
                </Animated.View>)

      return dom;
  }

  render(){
    return(
      <View style={styles.container}>
          {this.generateHeads()}
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
  head: {
    width:50,
    height:50,
    borderRadius: 25,
    position:'absolute'
  },
  imageHead: {
    width: null,
    height: null,
    borderRadius: 25,
    flex:1
  }
});
