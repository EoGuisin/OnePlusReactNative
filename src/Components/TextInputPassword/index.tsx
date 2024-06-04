//#region Native
import React,{useState} from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity} from 'react-native';
//#endregion

//#region Component
import * as Styled from './styles';
//#endregion

//#region Images Icons
import { SvgCss } from 'react-native-svg';
import { EyePassword, ScratchedEyePassword } from '../../Assets';
//#endregion

export const TextInputPassword = (props: any) => {
    const [getHidden,setHidden] = useState(true)
  return (
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <Styled.Input
        placeholderTextColor={props.placeholderTextColor}
        keyboardType={props.keyboardType}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        secureTextEntry={getHidden}
      />
      <TouchableOpacity activeOpacity={0.9} style={{height: '50%', marginLeft:-25, marginTop:20}} onPress={() => setHidden(!getHidden)}>
        <SvgCss xml={getHidden === true ? EyePassword : ScratchedEyePassword} style={{marginTop: getHidden === true ? 0 : 4, marginLeft: getHidden === true ? 0 : -2}} />
      </TouchableOpacity>
    </View>
  );
};

TextInputPassword.propTypes = {
  placeholderTextColor: PropTypes.string,
  keyboardType: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
};
