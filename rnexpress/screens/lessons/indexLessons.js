import { createStackNavigator } from "react-navigation";
import Home from './home'
import Opacity from './opacity'
import Translate from './translate'
import Scale from './scale'
import WHValue from './whvalue'
import Absolute from './absolute'
import Interpolation from './interpolation'
import Rotation from './rotation'
import WHPercentage from './WHPercentage'
import Easing from './easing'
import ValueFunct from './valuefunct'
import AnimatedFunctions from './animatedfunctions'
import DragCard from './dragcard'
import CombiningAnimations from './combininganimations'
import PanResponder from './panresponder'
import KittenCards from './kittencards'
import DragHead from './draghead'
import D3Interpolate from './d3interpolate'

export default createStackNavigator({
    Home,
    Translate,
    Opacity,
    Scale,
    WHValue,
    Absolute,
    Interpolation,
    Rotation,
    WHPercentage,
    Easing,
    ValueFunct,
    AnimatedFunctions,
    DragCard,
    CombiningAnimations,
    PanResponder,
    KittenCards,
    DragHead,
    D3Interpolate
},
{
  initialRouteName: "Home"
});
