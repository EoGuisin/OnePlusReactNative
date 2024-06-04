import React, {memo} from 'react';
import { GestureResponderEvent, ColorValue } from 'react-native';
import * as Styles from './styles';

interface Props {
  selectedInput: string | undefined | (string | undefined)[];
  titleInput: string;
  onPress(click: GestureResponderEvent): void;
  colorWithNothingSelected?: ColorValue;
  colorOptionalInput?: ColorValue | undefined;
}

function TouchInputComponent(props: Props) {
  return (
    <Styles.Container>
      <Styles.ContainerTexts activeOpacity={0.7} onPress={props.onPress}>
        <Styles.NameInput style={{color: props.colorOptionalInput ? props.colorOptionalInput : 'white'}}>{props.titleInput}: </Styles.NameInput>
        <Styles.NameInput style={{color: props.colorWithNothingSelected ? props.colorWithNothingSelected : 'white'}}>{props.selectedInput}</Styles.NameInput>
        <Styles.View />
      </Styles.ContainerTexts>
      <Styles.Margin />
    </Styles.Container>
  );
}

export const TouchInput = memo(TouchInputComponent);