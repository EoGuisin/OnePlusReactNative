import React from 'react';
import { KeyboardTypeOptions, ColorValue, Text } from 'react-native';
import * as Styles from './styles';

interface Props {
  nameInput?: string | undefined | number | (string | undefined)[];
  titleInput?: string;
  onChangeText?(text: string): void;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  placeholderTextColor?: ColorValue;
  colorOptionalInput?: ColorValue | undefined;
  colorWithNothing?: ColorValue | undefined;
  value?: string | undefined;
  editable?: boolean;
  porcentage?: boolean;
}


function InputComponent(props: Props) {
  return (
    <Styles.Container>
      <Styles.ContainerTexts>
        <Styles.NameInput style={{color: props.colorOptionalInput ? props.colorOptionalInput : 'white'}}>{props.titleInput}: </Styles.NameInput>
        <Styles.Input editable={props.editable ? props.editable : true} value={props.value} style={{color: props.colorWithNothing ? props.colorWithNothing : 'white'}} placeholder={props.placeholder} placeholderTextColor={props.placeholderTextColor} autoCapitalize='none' keyboardType={props.keyboardType} onChangeText={props.onChangeText}>{props.nameInput}</Styles.Input>
        {props.porcentage ? <Styles.TextPorcentage>%</Styles.TextPorcentage> : undefined}
      </Styles.ContainerTexts>
      <Styles.Margin />
    </Styles.Container>
  );
}

export const Input = InputComponent;