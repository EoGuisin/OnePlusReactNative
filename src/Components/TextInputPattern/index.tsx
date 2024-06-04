//#region Native
import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
//#endregion

//#region Component
import * as Styled from './styles';
//#endregion

export const TextInputPattern = (props: any) => {
  return (
    <View>
      <Styled.Input
        style={{marginTop: props.marginTop, textAlign: props.textAlign}}
        placeholderTextColor={props.placeholderTextColor}
        keyboardType={props.keyboardType}
        placeholder={props.placeholder}
        value={props.value}
        autoCapitalize={props.autoCapitalize}
        onChangeText={props.onChangeText}></Styled.Input>
    </View>
  );
};

TextInputPattern.propTypes = {
  placeholderTextColor: PropTypes.string,
  keyboardType: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  marginTop: PropTypes.string,
  textAlign: PropTypes.string,
  autoCapitalize: PropTypes.string,
};
