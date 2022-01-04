import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
} from "react-native-reanimated";
export default function App() {
  const mysharedvalue = useSharedValue(0);
  const mysharedvalueradius = useSharedValue(0);
  const myreactiveworklet = useAnimatedStyle(() => {
    return {
      transform: [{ scale: mysharedvalue.value }],
      borderRadius: mysharedvalueradius.value,
    };
  });
  useEffect(() => {
    mysharedvalue.value = withRepeat(
      withTiming(2, { duration: 1500 }),
      3,
      true
    );
    mysharedvalueradius.value = withRepeat(
      withTiming(200, { duration: 1500 }),
      3,
      true
    );
  }, []);
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, myreactiveworklet]} />
      {/* <Button
        title="toggle"
        onPress={() => {
          mysharedvalue.value = withTiming(200, { duration: 3000 });
        }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    // paddingTop: 100,
    // paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: "red",
  },
});

// being able to get to build web experiences in a fast paced challenging environement , which will surely make me grow in skill
