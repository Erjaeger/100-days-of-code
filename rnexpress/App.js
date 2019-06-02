import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createDrawerNavigator, createAppContainer } from "react-navigation";
import IndexExercicesScreen from './screens/exercices/indexExercices';
import IndexLessonsScreen from './screens/lessons/indexLessons';
import KittenCards from './screens/lessons/kittencards';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render(){
    return(
      <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
      <Text>Home Screen</Text>
      </View>);
    }
  }

  const AppNavigator = createDrawerNavigator(
    {
      Home: HomeScreen,
      Lessons: IndexLessonsScreen,
      Exercices: IndexExercicesScreen,
      KittenCards
    },
    {
      //initialRouteName: "Home"
      initialRouteName: "KittenCards"
    }
  );

  const AppContainer = createAppContainer(AppNavigator);

  export default class App extends React.Component {
    render() {
      return (<AppContainer />);
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
