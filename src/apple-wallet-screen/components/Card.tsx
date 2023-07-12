/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  FlatList,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useAnimatedReaction,
} from 'react-native-reanimated';
import {
  CARD_HEADER_HEIGHT,
  CARD_HEIGHT_CLOSED,
  CARD_HEIGHT_OPEN,
  CARD_IMAGE_HEIGTH,
  CARD_MARGIN,
  ANIMATION_PARAMETER,
} from '../assets/config';
import {theme} from '../assets/theme';
import {CardProps} from '../assets/types';
import {deviceconfig} from '../assets/deviceconfig';
import {useCallback} from 'react';

const TransactionComponentItem = props => {
  const {item} = props;

  return (
    <View style={styles.transactionStyle}>
      <Text style={styles.fieldLabel}>{item.label}</Text>
      <Text style={styles.fieldValue}>{item.value}</Text>
    </View>
  );
};

const TransactionComponentList = props => {
  const {itemList} = props;

  return (
    <View style={styles.cardSubContainer}>
      <View>
        <View style={styles.spacer}>
          <Text style={styles.fieldLabel}>Last Transaction</Text>
        </View>

        <View style={[styles.stContainer]}>
          <TransactionComponent itemList={itemList} />
        </View>
      </View>
    </View>
  );
};

const TransactionComponent = props => {
  const {itemList} = props;

  return (
    <View>
      <FlatList
        scrollEnabled={false}
        keyExtractor={item => item.id}
        data={itemList}
        renderItem={({index}) => (
          <TransactionComponentItem item={itemList[index]} />
        )}
      />
    </View>
  );
};

const Card = ({item, index, selectedCard, scrollY}: CardProps) => {
  const animatedHeight = useSharedValue(CARD_HEIGHT_CLOSED);
  const transY = useSharedValue(0);
  const marginTop = index * CARD_MARGIN;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
      transform: [{translateY: transY.value}],
    };
  });

  useAnimatedReaction(
    () => selectedCard.value,
    currentSelection => {
      if (selectedCard.value !== -1) {
        const slideUp = currentSelection >= index;
        const animateToValue = slideUp
          ? scrollY.value - marginTop
          : scrollY.value + deviceconfig.screenHeight - marginTop;

        transY.value = withSpring(animateToValue, ANIMATION_PARAMETER.OPEN);
        animatedHeight.value = withTiming(CARD_HEIGHT_OPEN);
      } else {
        transY.value = withSpring(0, ANIMATION_PARAMETER.CLOSE);
        animatedHeight.value = withTiming(CARD_HEIGHT_CLOSED);
      }
    },
  );

  const handleCardPress = useCallback(() => {
    if (selectedCard.value === -1) {
      selectedCard.value = index;
    }
  }, [selectedCard, index]);

  return (
    <TouchableWithoutFeedback onPress={handleCardPress} disabled={false}>
      <Animated.View
        style={[
          styles.cardContainer,
          {
            marginTop,
            backgroundColor: '#000',
          },
          animatedStyle,
        ]}>
        <Image resizeMode="stretch" source={item.image} style={styles.image} />
        <TransactionComponentList itemList={item.entries} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 12,
    position: 'absolute',
    width: '100%',
    overflow: 'hidden',
  },
  cardSubContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    height: CARD_HEIGHT_OPEN - CARD_HEADER_HEIGHT - CARD_IMAGE_HEIGTH,
  },
  spacer: {marginTop: 32},
  stContainer: {marginTop: 10, justifyContent: 'space-between'},
  fieldLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.white,
    textTransform: 'uppercase',
  },
  fieldValue: {
    fontSize: 11,
    color: theme.colors.white,
  },
  image: {
    height: CARD_IMAGE_HEIGTH,
    width: '100%',
  },
  transactionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Card;
