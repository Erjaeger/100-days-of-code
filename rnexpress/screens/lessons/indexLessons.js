import { createStackNavigator } from "react-navigation";
import Home from './home'
import Opacity from './opacity'
import Translate from './translate'
import Scale from './scale'
import WHValue from './whvalue'
import Absolute from './absolute'

export default createStackNavigator({
    Home,
    Translate,
    Opacity,
    Scale,
    WHValue,
    Absolute
},
{
  initialRouteName: "Home"
});
