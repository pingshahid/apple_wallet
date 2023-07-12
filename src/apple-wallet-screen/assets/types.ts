import {SharedValue} from 'react-native-reanimated';

export type Field = {
  id: string;
  label: string;
  value: string;
};

export type CardContentProps = {
  entries: Array<Field>;
  image: any;
};

export type CardProps = {
  item: CardContentProps;
  index: number;
  selectedCard: SharedValue<number>;
  scrollY: SharedValue<number>;
};

export type GestureHandlerProps = {
  children: React.ReactNode;
  selectedCard: SharedValue<number>;
  swipeY: SharedValue<number>;
};
