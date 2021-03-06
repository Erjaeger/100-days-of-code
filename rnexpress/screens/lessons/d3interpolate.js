import Svg, { Path } from "react-native-svg";
import { interpolatePath } from "d3-interpolate-path";


const startPath = `M45,50a5,5 0 1,0 10,0a5,5 0 1,0 -10,0`
const endPath = `M20,50a30,30 0 1,0 60,0a30,30 0 1,0 -60,0`

export default class animations extends Component {
  state = {
    animation: new Animated.Value(0),
  };

  componentWillMount(){
      const pathInterpolate = interpolatePath(startPath, endPath);
      this.state.animation.addListener(({value}) => {
          const path = pathInterpolate(value);
          this._path.setNativeProps({
              d: path
          })
      })
  }

  handlePress = () => {
    Animated.sequence([
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 500,
      }),
      Animated.delay(1500),
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 500
      })
    ]).start();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <Svg width={150} height={150}>
            <Path d={startPath} stroke="black" ref={path => this._path = path} />
          </Svg>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}