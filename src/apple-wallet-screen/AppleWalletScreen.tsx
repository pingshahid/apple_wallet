/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet} from 'react-native';
import {theme} from './assets/theme';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import Card from './components/Card';
import GestureHandler from './components/GestureHandler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  TOP_BAR_HEIGHT,
  CARDS,
  CARD_HEIGHT_CLOSED,
  CARD_MARGIN,
} from './assets/config';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const AppleWalletScreen = () => {
  const insets = useSafeAreaInsets();
  const selectedCard = useSharedValue(-1);
  const swipeY = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(e => {
    scrollY.value = e.contentOffset.y;
  });
  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <GestureHandler {...{selectedCard, swipeY}}>
        <Animated.ScrollView
          style={styles.container}
          contentContainerStyle={{
            paddingTop: TOP_BAR_HEIGHT + insets.top + 16,
            paddingBottom:
              CARD_HEIGHT_CLOSED +
              CARD_MARGIN * (CARDS.length - 1) +
              insets.bottom,
          }}
          showsVerticalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          scrollEnabled={selectedCard.value === -1}
          decelerationRate="fast">
          <Animated.View>
            {CARDS.map((e, i) => (
              <Card
                key={i}
                item={e}
                index={i}
                {...{selectedCard, scrollY}}
              />
            ))}
          </Animated.View>
        </Animated.ScrollView>
      </GestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
  },
  rootContainer: {
    flex: 1,
  },
});

export default AppleWalletScreen;
