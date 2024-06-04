//#region Native
import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
//#endregion

//#region Component
import * as Styled from './styles';
//#endregion

import {SvgCss} from 'react-native-svg';
import {Triangle} from '../../Assets';

export const Picker = (props: any) => {
  return (
      <Styled.Select activeOpacity={0.9} onPress={props.onPress}>
        <View style={{flexDirection:'row', marginTop:'5%'}}>
          <Styled.TextSelect>
            {props.itemDescricao ? props.itemDescricao : props.placeholder}
          </Styled.TextSelect>
          {props.svgTriangle === true && <SvgCss xml={Triangle} style={{marginLeft: '5%', alignSelf:'center'}}/>}
        </View>
      </Styled.Select>
  );
};

Picker.propTypes = {
  itemDescricao: PropTypes.string,
  onPress: PropTypes.func,
  placeholder: PropTypes.string,
  svgTriangle: PropTypes.bool,
};
