import React from 'react';
import { Animated, Easing, TouchableWithoutFeedback, PanResponder, StyleSheet, StatusBar, View, Text, Dimensions } from 'react-native';
import EasingClass from '../lessons/easing';

const { width, height } = Dimensions.get('window');



const BLOCK_SIZE = 50;
const LIMIT_WIDTH_MIN = -(width/2)+BLOCK_SIZE/2;
const LIMIT_WIDTH_MAX = width/2-BLOCK_SIZE/2;
const LIMIT_HEIGHT_MIN = -height+BLOCK_SIZE+50;
const LIMIT_HEIGHT_MAX = BLOCK_SIZE/2;

export default class DragCardGameClass extends React.Component {
  static navigationOptions ={
    title: "DragCardGame Lesson"
  };

  constructor(props){
    super(props);
    this.state = {
        animation: new Animated.ValueXY(),
        animationScale: new Animated.Value(1),
        score: 0,
        lastScore:"300"
    };


    let triggeredLimitX = false;
    let triggeredLimitY = false;
    
    this.tempValue={x: 0, y:0};
    this.scoreAdded = false;


    this.state.animation.addListener((value) => {
      this.tempValue = value;


      if((value.x > LIMIT_WIDTH_MAX || value.x < LIMIT_WIDTH_MIN )&& !this.triggeredLimitX ){
        
        this.triggeredLimitX = true;
        this.state.animation.stopAnimation(()=>{
          this.state.animation.setValue({x:value.x > 0 ? LIMIT_WIDTH_MAX : LIMIT_WIDTH_MIN, y:value.y});
          this.triggeredLimitX = false
        });
      }

      if((value.y > LIMIT_HEIGHT_MAX || value.y < LIMIT_HEIGHT_MIN )&& !this.triggeredLimitY){
        
        this.triggeredLimitY = true;
        this.state.animation.stopAnimation(()=>{
          this.state.animation.setValue({x: value.x, y:value.y > 0 ? LIMIT_HEIGHT_MAX : LIMIT_HEIGHT_MIN});
          this.triggeredLimitY = false
        });
      }


      if(value.y > LIMIT_HEIGHT_MIN && value.y < LIMIT_HEIGHT_MIN + BLOCK_SIZE && !this.scoreAdded){
        this.scoreAdded = true;
        if(value.x > LIMIT_WIDTH_MIN && value.x < LIMIT_WIDTH_MIN + ((40*width)/100) || value.x < LIMIT_WIDTH_MAX && value.x > LIMIT_WIDTH_MAX - ((40*width)/100)){
          this.setState({score: this.state.score + 100}, () => {
            this.resetBlock();
          });
        } else {
          this.setState({score: this.state.score + 300}, ()=>{
            this.resetBlock();
          });
        }
      }
    });

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant : ()=>{
        this.scoreAdded = false;
        this.state.animation.setOffset(this.tempValue);
        this.state.animation.setValue({x:0, y:0});
      },
      onPanResponderMove: Animated.event([
        null, {
          dx: this.state.animation.x,
          dy: this.state.animation.y
        }]),
      onPanResponderRelease: (evt, gestureState)=>{
        this.state.animation.flattenOffset();  
        Animated.decay(this.state.animation, {
          velocity: {x:gestureState.vx, y:gestureState.vy},
          deceleration: 0.997,
          useNativeDriver: true
        }).start(()=>{
          
        })
      }
    })
  }

  componentDidMount = () => {
    
  };

  resetBlock= () => {
    Animated.timing(this.state.animationScale, {
      toValue: 0,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true
    }).start(()=>{
      this.state.animation.setValue({x:0, y:0});
      Animated.timing(this.state.animationScale, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true
      }).start()
    });
  };

  render(){
    const animatedBoxStyle={
      transform: [
        {
          scale: this.state.animationScale,
        },
        {
          translateX: this.state.animation.x
        },
        {
          translateY: this.state.animation.y
        }
      ]
    };

    return(
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.pointLine}>
          <View style={styles.pointBox}>
            <Text>100</Text>
          </View>
          <View style={[styles.pointBox, styles.littleBox]}>
            <Text>300</Text>
          </View>
          <View style={styles.pointBox}>
            <Text>100</Text>
          </View>
        </View>
        <View style={styles.content}>

        </View>
        <View>
          <Animated.View style={[styles.box, animatedBoxStyle]} {...this._panResponder.panHandlers}/>
        </View>
        <View style={styles.scoreLine}>
          <Text style={styles.textScore}>
            Score : {this.state.score}
          </Text>
        </View>
      </View>);
  }
}

const styles = StyleSheet.create({
  pointLine:{
    height:50,
    width,
    backgroundColor: "#f4f4f8",
    alignSelf:'flex-start',
    flexDirection:'row'
  },
  pointBox: {
    borderWidth: 1,
    backgroundColor: "#f4f4f8",
    borderColor: "#e6e6ea",
    width:'40%',
    alignItems:'center',
    justifyContent:'center'
  },
  littleBox:{
    width:'20%'
  },
  container: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f8",
    height,
    width
  },
  content: {
    flex:1,
    backgroundColor:'tomato'
  },
  box: {
    height: BLOCK_SIZE,
    width: BLOCK_SIZE,
    backgroundColor: "#2ab7ca",
    position:'relative',
    borderRadius: BLOCK_SIZE/2
  },
  textScore: {
    marginLeft:10
  },
  scoreLine: {
    backgroundColor: "#FFFFFF",
    height:50,
    width:width,
    alignItems:'flex-start',
    justifyContent:'center'
  }
});
