import * as React from "react";
import {
  StyleSheet,
  FlatList,
  Image,
  Animated,
  Dimensions,
  Text,
  View,
} from "react-native";

const { width, height } = Dimensions.get("screen");
const imageW = width * 0.7;
const imageH = imageW * 1.54;

const data = [
  require("./src/assets/images/image_1.jpg"),
  require("./src/assets/images/image_2.jpg"),
  require("./src/assets/images/image_3.jpg"),
  require("./src/assets/images/image_4.jpg"),
  require("./src/assets/images/image_5.jpg"),
  require("./src/assets/images/image_6.jpg"),
  require("./src/assets/images/image_7.jpg"),
  require("./src/assets/images/image_8.jpg"),
];

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFillObject}>
        {data.map((image, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });

          return (
            <Animated.Image
              key={`image-${index}`}
              source={image}
              blurRadius={5}
              style={[StyleSheet.absoluteFillObject, { opacity }]}
            />
          );
        })}
      </View>
      <Animated.FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        horizontal
        pagingEnabled
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#ff0000",
                shadowOpacity: 0.5,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 20,
                elevation: 10,
              }}
            >
              <Image
                source={item}
                style={{
                  borderRadius: 16,
                  width: imageW,
                  height: imageH,
                  resizeMode: "cover",
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
