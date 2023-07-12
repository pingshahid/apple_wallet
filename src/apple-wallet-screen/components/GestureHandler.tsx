/* eslint-disable react/react-in-jsx-scope */
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {CLOSE_THRESHOLD} from '../assets/config';
import {GestureHandlerProps} from '../assets/types';

const GestureHandler = ({children, selectedCard}: GestureHandlerProps) => {
  const gesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesDown((_, state) => {
      if (selectedCard.value !== -1) {
        state.activate();
      } else {
        state.fail();
      }
    })
    .onUpdate(e => {
      if (e.translationY > CLOSE_THRESHOLD) {
        selectedCard.value = -1;
      }
    });
  return <GestureDetector gesture={gesture}>{children}</GestureDetector>;
};

export default GestureHandler;
