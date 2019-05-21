import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { createDrawerNavigator, createAppContainer } from "react-navigation";

export default class IndexLessonsScreen extends React.Component {
  render(){
    return(
      <ScrollView style={{flex:1}}>
        <Text>Index Exercices Screen</Text>
        <View style={{marginTop:10}}>
          <Button title={"Opacity"} color="#651E3E" onPress={()=>{this.props.navigation.navigate('Opacity')}}/>
        </View>
        <View style={{marginTop:10}}>
          <Button title={"DragCardGame"} color="#651E3E" onPress={()=>{this.props.navigation.navigate('DragCardGame')}}/>
        </View>
      </ScrollView>);
  }
}
