import React, { FC } from "react";
import { Dimensions } from "react-native";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

interface IListItem {
  item: {
    imageUrl: string;
    id: number;
  };
  scrollY: SharedValue<number>;
  index: number;
}

const ITEM_HEIGHT = 300;
const ITEM_MARGIN = 16;
const ITEM_SIZE = ITEM_HEIGHT + ITEM_MARGIN;

export const ListItemScrollY: FC<IListItem> = ({ item, scrollY, index }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];
    const outputScaleRange = [1, 1, 1, 0];

    const outputTranslateXRange = [0, 0, 0, -ITEM_SIZE * 2];
    const outputTranslateYRange = [0, 0, 0, ITEM_SIZE * 2];

    return {
      transform: [
        {
          scale: interpolate(scrollY.value, inputRange, outputScaleRange),
        },
        {
          translateX: interpolate(
            scrollY.value,
            inputRange,
            outputTranslateXRange
          ),
        },
        {
          translateY: interpolate(
            scrollY.value,
            inputRange,
            outputTranslateYRange
          ),
        },
        {
          rotateZ: `${interpolate(
            scrollY.value,
            inputRange,
            [0, 0, 0, -45]
          )}deg`,
        },
      ],
      opacity: interpolate(scrollY.value, inputRange, outputScaleRange),
    };
  });

  return (
    <Animated.Image
      source={{ uri: item.imageUrl }}
      style={[animatedStyle, { width, height: 300 }]}
    />
  );
};
