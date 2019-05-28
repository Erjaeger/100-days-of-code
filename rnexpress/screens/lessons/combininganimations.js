import React from 'react';
import { Animated, TouchableWithoutFeedback, StyleSheet, Text, View } from 'react-native';

export default class CombiningAnimationsClass extends React.Component {
  static navigationOptions ={
    title: "Combining Animations Lesson"
  }

  constructor(props){
    super(props);
    this.state = {
        colorAnimationPara: new Animated.Value(0),
        scaleAnimationPara: new Animated.Value(1),

        colorAnimationSeq: new Animated.Value(0),
        scaleAnimationSeq: new Animated.Value(1),

        colorAnimationStag: new Animated.Value(0),
        scaleAnimationStag: new Animated.Value(1),

        colorAnimationDelay: new Animated.Value(0),
        scaleAnimationDelay: new Animated.Value(1),
    }
  }

  handlePressPara = () => {
    Animated.parallel([
        Animated.timing(
            this.state.colorAnimationPara,{
                toValue:1,
                duration: 500,
            }
        ),
        Animated.timing(this.state.scaleAnimationPara, {
            toValue:0.5,
            duration: 300,
        })
    ]).start();
  }

  handlePressSeq = () => {
    Animated.sequence([
        Animated.timing(
            this.state.colorAnimationSeq,{
                toValue:1,
                duration: 500,
            }
        ),
        Animated.timing(this.state.scaleAnimationSeq, {
            toValue:0.5,
            duration: 300,
        })
    ]).start();
  }

  handlePressStag = () => {
    Animated.stagger(1500,[
        Animated.timing(
            this.state.colorAnimationStag,{
                toValue:1,
                duration: 500,
            }
        ),
        Animated.timing(this.state.scaleAnimationStag, {
            toValue:0.5,
            duration: 300,
        })
    ]).start();
  }

  handlePressDelay = () => {
    Animated.sequence([
        Animated.timing(
            this.state.colorAnimationDelay,{
                toValue:1,
                duration: 500,
            }
        ),
        Animated.delay(1500),
        Animated.timing(this.state.scaleAnimationDelay, {
            toValue:0.5,
            duration: 300,
        })
    ]).start();
  }


  render(){
    const backgroundColorInterpolatePara = this.state.colorAnimationPara.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgb(248, 177, 149)", "rgb(108, 91, 123)"]
    })

    const boxStylePara= {
        transform: [
            {
                scale: this.state.scaleAnimationPara
            }
        ],
        backgroundColor: backgroundColorInterpolatePara
    }

    const backgroundColorInterpolateSeq = this.state.colorAnimationSeq.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgb(248, 177, 149)", "rgb(108, 91, 123)"]
    })

    const boxStyleSeq= {
        transform: [
            {
                scale: this.state.scaleAnimationSeq
            }
        ],
        backgroundColor: backgroundColorInterpolateSeq
    }

    const backgroundColorInterpolateStag = this.state.colorAnimationStag.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgb(248, 177, 149)", "rgb(108, 91, 123)"]
    })

    const boxStyleStag= {
        transform: [
            {
                scale: this.state.scaleAnimationStag
            }
        ],
        backgroundColor: backgroundColorInterpolateStag
    }

    const backgroundColorInterpolateDelay = this.state.colorAnimationDelay.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgb(248, 177, 149)", "rgb(108, 91, 123)"]
    })

    const boxStyleDelay= {
        transform: [
            {
                scale: this.state.scaleAnimationDelay
            }
        ],
        backgroundColor: backgroundColorInterpolateDelay
    }


    return(
      <View style={styles.container}>
        <TouchableWithoutFeedback  onPress={this.handlePressPara}>
            <Animated.View style={[styles.box, boxStylePara]}>
                <Text style={styles.text}>Parallel</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.handlePressSeq}>
            <Animated.View style={[styles.box, boxStyleSeq]}>
                <Text style={styles.text}>Sequence</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.handlePressStag}>
            <Animated.View style={[styles.box, boxStyleStag]}>
                <Text style={styles.text}>Stagger</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.handlePressDelay}>
            <Animated.View style={[styles.box, boxStyleDelay]}>
                <Text style={styles.text}>Delay</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#355C7D"
  },
  box: {
    height: 80,
    width: 150,
    marginTop: 40,
    justifyContent:'center',
    alignItems:'center'
  },
  text: {
      color: "white",
      fontWeight: "bold"
  }
})
