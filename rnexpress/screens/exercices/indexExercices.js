import { createStackNavigator } from "react-navigation";
import Home from './home'
import Opacity from './opacity/opacity'
import DragHead from './draghead'

export default createStackNavigator({
    Home,
    Opacity,
    DragHead
},
{
  initialRouteName: "Home",
  defaultNavigationOptions: {
    header: null
  }
});
