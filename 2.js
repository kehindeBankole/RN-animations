import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
export default function App() {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: withSpring(isPressed.value ? 2 : 1) },
      ],
      backgroundColor: isPressed.value ? "yellow" : "blue",
    };
  });

  const start = useSharedValue({ x: 0, y: 0 });
  const gesture = Gesture.Pan()
    .onBegin((e) => {
      isPressed.value = true;
      console.log(e);
    })
    .onUpdate((e, context) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
      console.log(context);
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    })
    .onFinalize(() => {
      isPressed.value = false;
    });
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <View style={styles.container}> */}
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.ball, animatedStyles]} />
      </GestureDetector>
      {/* </View> */}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  ball: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: "blue",
    alignSelf: "center",
  },
});
