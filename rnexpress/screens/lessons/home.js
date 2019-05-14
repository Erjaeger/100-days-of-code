import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { createDrawerNavigator, createAppContainer } from "react-navigation";

export default class IndexLessonsScreen extends React.Component {
  render(){
    return(
      <ScrollView style={{flex:1}}>
        <Text>Index Lessons Screen</Text>
        <Button title={"Opacity"} onPress={()=>{this.props.navigation.navigate('Opacity')}}/>
      </ScrollView>);
  }
}
