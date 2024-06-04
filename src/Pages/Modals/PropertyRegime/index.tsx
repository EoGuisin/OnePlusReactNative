//#region React
import React from 'react';
import {Modal, TouchableOpacity, Platform, View} from 'react-native';
import PropTypes from 'prop-types';
//#endregion

//#region Icons
import {ArrowBack} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Styled
import * as Styled from './styles';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
//#endregion

export const PropertyRegime = (props: any) => {
  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <Styled.Container>
          <Styled.ContainerHeader
            style={{marginTop: Platform.OS === 'ios' ? '15%' : '5%'}}>
            <TouchableOpacity activeOpacity={0.9} onPress={props.onPressClose}>
              <SvgCss xml={ArrowBack} />
            </TouchableOpacity>
            <Styled.TextHeader>Regime de Bens</Styled.TextHeader>
          </Styled.ContainerHeader>
          <Styled.Flatlist
            data={props.data}
            renderItem={props.renderItem}
          />
        </Styled.Container>
      </LinearGradient>
    </Modal>
  );
};

PropertyRegime.propTypes = {
  visible: PropTypes.bool,
  onPressClose: PropTypes.func,
  data: PropTypes.array,
  renderItem: PropTypes.func,
};
