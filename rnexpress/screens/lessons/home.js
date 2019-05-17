import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { createDrawerNavigator, createAppContainer } from "react-navigation";

export default class IndexLessonsScreen extends React.Component {
  static navigationOptions = {
    title : "Lessons List"
  }
  render(){
    return(
      <ScrollView style={{flex:1}}>
        <View style={{marginTop:10}}>
          <Button title={"Opacity"} color="#651E3E" onPress={()=>{this.props.navigation.navigate('Opacity')}}/>
        </View>
        <View style={{marginTop:10}}>
          <Button title={"Translate"} color="#651E3E" onPress={()=>{this.props.navigation.navigate('Translate')}}/>
        </View>
        <View style={{marginTop:10}}>
          <Button title={"Scale"} color="#651E3E" onPress={()=>{this.props.navigation.navigate('Scale')}}/>
        </View>
        <View style={{marginTop:10}}>
          <Button title={"WHValue"} color="#651E3E" onPress={()=>{this.props.navigation.navigate('WHValue')}}/>
        </View>
        <View style={{marginTop:10}}>
          <Button title={"Absolute"} color="#651E3E" onPress={()=>{this.props.navigation.navigate('Absolute')}}/>
        </View>
        <View style={{marginTop:10}}>
          <Button title={"Interpolation"} color="#651E3E" onPress={()=>{this.props.navigation.navigate('Interpolation')}}/>
        </View>
        <View style={{marginTop:10}}>
          <Button title={"Rotation"} color="#651E3E" onPress={()=>{this.props.navigation.navigate('Rotation')}}/>
        </View>
        <View style={{marginTop:10}}>
          <Button title={"WHPercentage"} color="#651E3E" onPress={()=>{this.props.navigation.navigate('WHPercentage')}}/>
        </View>
      </ScrollView>);
  }
}
