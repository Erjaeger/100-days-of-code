import React from 'react';
import { Dimensions, StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { createDrawerNavigator, createAppContainer } from "react-navigation";
import { getRandomIntInclusive } from '../../../utils'
import BoxColor from './boxcolor'

const {height, width} = Dimensions.get('window');


export default class Opacity extends React.Component {
  static navigationOptions ={
    title: "Opacity Exercice"
  };

  renderBoxes(){

    const sizeBox = width/3;
    const nbrHeight = height/sizeBox;
    const colors = ["#ff0b55", "#D65A31","#393E46", "#222831"];
    const boxes = [];
    for(let i = 0; i < 10*nbrHeight; i++){
      boxes.push(<BoxColor key={i} height={sizeBox} width={sizeBox} backgroundColor={colors[getRandomIntInclusive(0, 4)]} />);
    }
    return boxes
  }

  render(){
    return(
      <View style={{flex:1, flexDirection:'row', flexWrap:"wrap"}}>
      <StatusBar hidden={true} />
        {this.renderBoxes()}
      </View>);
  }
}
