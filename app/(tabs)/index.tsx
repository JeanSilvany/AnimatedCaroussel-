import { View, ListRenderItemInfo } from "react-native";

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { ListItemScrollY } from "@/components/ListItem";

const data = new Array(30)
  .fill("https://picsum.photos/1920/1080")
  .map((imageUrl, index) => ({
    imageUrl,
    id: index,
  }));

export default function HomeScreen() {
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const renderItem = ({
    item,
    index,
  }: ListRenderItemInfo<{ imageUrl: string; id: number }>) => (
    <ListItemScrollY item={item} index={index} scrollY={scrollY} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Animated.FlatList
          data={data}
          renderItem={renderItem}
          onScroll={onScroll}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      </View>
    </SafeAreaView>
  );
}
