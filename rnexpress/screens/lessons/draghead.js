import React from 'react';
import { Animated, TouchableWithoutFeedback, Image, PanResponder, StyleSheet, View } from 'react-native';

import Cat from '../../assets/imgs/cat1.jpeg';

export default class DragHeadClass extends React.Component {
    static navigationOptions = {
        title: "Drag head"
    };

    constructor(props) {
        super(props);
        this.state = {
            heads: [
                {
                    image: Cat,
                    animation: new Animated.ValueXY(),
                    text: "Drag Me",
                },
                {
                    image: Cat,
                    animation: new Animated.ValueXY(),
                    text: "Drag Me",
                },
                {
                    image: Cat,
                    animation: new Animated.ValueXY(),
                    text: "Drag Me",
                },
                {
                    image: Cat,
                    animation: new Animated.ValueXY(),
                    text: "Drag Me",
                },
                {
                    image: Cat,
                    animation: new Animated.ValueXY(),
                    text: "Drag Me",
                }
            ]
        }
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (e, gestureState) => {
                this.state.heads.map(({ animation }) => {
                    animation.extractOffset();
                    animation.setValue({ x: 0, y: 0 });
                })
            },
            onPanResponderMove: (e, { dx, dy }) => {
                this.state.heads[0].animation.setValue({
                    x: dx,
                    y: dy
                });

                const animations = this.state.heads.slice(1).map(({animation}, index) => {
                    Animated.sequence([
                        Animated.delay(index*10),
                        Animated.spring(animation, {
                            toValue: {x: dx, y: dy},
                            useNativeDriver: true
                        })
                    ]).start();
                })

               

            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.heads.slice(0).reverse().map((
                        item, index, items) => {
                            const pan = index === items.length - 1 ? this._panResponder.panHandlers : {};

                            return (
                                <Animated.Image {...pan} key={index} 
                                source={item.image} 
                                style={[styles.head, 
                                    { transform: item.animation.getTranslateTransform() }
                                ]} />
                            )
                        }
                    )
                }
            </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#061E3E"
    },
    head: {
        width: 80,
        height: 80,
        borderRadius: 40,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
