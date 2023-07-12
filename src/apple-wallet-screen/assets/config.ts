import {deviceconfig} from './deviceconfig';
import {CardContentProps} from './types';

export const CARD_HEIGHT_CLOSED = 200;
export const CARD_HEIGHT_OPEN = 300;
export const CARD_IMAGE_HEIGTH = 200;
export const CARD_HEADER_HEIGHT = 59;
export const CARD_MARGIN = 70;
export const TOP_BAR_HEIGHT = 40;
export const CLOSE_THRESHOLD = deviceconfig.screenHeight * 0.11;

export const ANIMATION_PARAMETER = {
  OPEN: {
    mass: 0.8,
    stiffness: 80,
  },
  CLOSE: {
    mass: 0.8,
    damping: 11,
    stiffness: 87,
  },
  SWIPE: {
    mass: 0.7,
    stiffness: 80,
  },
};

export const CARDS: CardContentProps[] = [
  {
    entries: [
      {
        id: '1',
        label: 'StackBucks',
        value: '$130',
      },
      {
        id: '2',
        label: 'Zomato',
        value: '$77',
      },
    ],
    image: require('./images/card1.png'),
  },
  {
    entries: [
      {
        id: '1',
        label: 'Ola',
        value: '$9',
      },
      {
        id: '2',
        label: 'Swiggy',
        value: '$8',
      },
    ],
    image: require('./images/card2.png'),
  },
  {
    entries: [
      {
        id: '1',
        label: 'Amazon',
        value: '$99',
      },
      {
        id: '2',
        label: 'Croma',
        value: '$1000',
      },
    ],
    image: require('./images/card3.png'),
  },
  {
    entries: [
      {
        id: '1',
        label: 'Barista',
        value: '$87',
      },
      {
        id: '2',
        label: 'CCD',
        value: '$11',
      },
    ],
    image: require('./images/card4.png'),
  },
];
