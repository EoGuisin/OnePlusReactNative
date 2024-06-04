//#region React
import React from 'react';
import PropTypes from 'prop-types';
import {View, Platform} from 'react-native';
//#endregion

//#region SVGs
import {PersonPlus, Person} from '../../Assets';
import { SvgCss } from 'react-native-svg';
//#endregion


//#region Animation
import Lottie from 'lottie-react-native';
import {Loading} from '../../Animation';
//#endregion

//#region Styled
import * as StyledComponents from './styles';
import * as Modals from '../../Pages/Modals';
//#endregion

export function Button(props: any) {
  return (
    <StyledComponents.Touchable
      onPress={props.onPress}
      activeOpacity={0.9}
      style={{ margin:props.margin, width: props.width, marginTop: props.marginTop, alignSelf: props.alignSelf, alignItems: props.alignItems, justifyContent: props.justifyContent, marginLeft:props.marginLeft}}>
        <View style={{flexDirection:'row', marginTop: '4%'}}>
        {props.svgPerson === true && (
          <SvgCss xml={Person} height={20} style={{marginLeft:'2%', marginTop: Platform.OS === 'ios' ? '-2%' : '-2%'}}/>
        )}
        {props.svgPersonPlus === true && (
          <SvgCss xml={PersonPlus} height={20} style={{marginLeft:'5%', marginTop: Platform.OS === 'ios' ? '-0.5%' : 0}}/>
        )}
        <StyledComponents.TextButton
          style={{
            fontSize: props.fontSize,
            alignItems: props.alignItems,
            alignSelf: props.alignSelf,
            justifyContent: props.justifyContent,
            marginTop: props.marginTopText,
            top: Platform.OS === 'ios' ? '-1%' : 0,
          }}>
          {props.textButton}
        </StyledComponents.TextButton>
      </View>
      {props.loading === true &&
        <Modals.ModalLoading
          visible={props.loading}
          transparent={true}  
        />
      }
    </StyledComponents.Touchable>
  );
}

Button.propTypes = {
  textMarginTop: PropTypes.string,
  textButton: PropTypes.string,
  width: PropTypes.number,
  onPress: PropTypes.func,
  fontSize: PropTypes.number,
  marginTop: PropTypes.number,
  loading: PropTypes.bool,
  svgPerson: PropTypes.bool,
  svgPersonPlus: PropTypes.bool,
  justifyContent:PropTypes.string,
  alignSelf:PropTypes.string,
  alignItems:PropTypes.string,
  marginLeft: PropTypes.string,
  margin: PropTypes.number,
  marginTopText: PropTypes.string,
};
