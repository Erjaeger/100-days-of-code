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
        <Button title={"Opacity"} style={{margin:10}} onPress={()=>{this.props.navigation.navigate('Opacity')}}/>
      </ScrollView>);
  }
}
