import { createStackNavigator } from "react-navigation";
import Home from './home'
import Opacity from './opacity'

export default createStackNavigator({
    Home,
    Opacity
},
{
  initialRouteName: "Home",
  defaultNavigationOptions: {
    header: null
  }
});
