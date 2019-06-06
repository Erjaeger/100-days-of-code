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
        dragValue: new Animated.ValueXY(0),
        animations: []
    }

    this.state.dragValue.addListener((value)=>{
        Animated.stagger(500, [
            this.state.animations.forEach((a)=>{
                return Animated.timing()
            })
        ]);
    });
  }

  

  componentDidMount = () => {
    let newAnimations= []
    for(let i = 0; i<this.state.nbrOfHeads; i++){
        newAnimations.push(new Animated.ValueXY(0));
    }

    this.setState({animations: newAnimations})

    this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            this.state.dragValue.extractOffset();
        },  
        onPanResponderMove: Animated.event([null, {
            dx: this.state.dragValue.x,
            dy: this.state.dragValue.y
        }])
    })
  }

  generateHeads = () => {
      let dom = []
      for(let i = 0; i<this.state.nbrOfHeads; i++){
        if(!this.state.animations[i]) return;
        const transformAnimatedStyle = {
            transform: [
                {
                    translateX: this.state.dragValue.x
                },
                {
                    translateY: this.state.dragValue.y
                }
            ]
        }

        const panhandlers = i === this.state.animations.length-1 ? this._panResponder.panHandlers : {};

        dom.push(<Animated.View style={[styles.head, transformAnimatedStyle]} key={i} {...panhandlers}>
                <Image source={require('../../assets/imgs/cat1.jpeg')} style={styles.imageHead} />
                </Animated.View>)
      }
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
