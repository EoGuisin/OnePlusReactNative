//#region React
import React, {useEffect} from 'react';
import {Modal, TouchableOpacity, Platform, Image} from 'react-native';
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

export const ViewImage = (props: any) => {

  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <Styled.Container>
          <Styled.ContainerHeader style={{marginTop: Platform.OS === 'ios' ? '15%' : '5%'}}>
            <TouchableOpacity activeOpacity={0.9} onPress={props.onPressClose}>
              <SvgCss xml={ArrowBack} />
            </TouchableOpacity>
            <Styled.TextHeader style={{marginLeft: props.marginLeft}}>{props.title}</Styled.TextHeader>
          </Styled.ContainerHeader>
          <Styled.ImageContainer>
            <Image source={{uri: `data:image/jpg;base64,${props.image}`}} style={{height: '100%', width: '100%', borderRadius: 50}}/>
          </Styled.ImageContainer>
        </Styled.Container>
      </LinearGradient>
    </Modal>
  );
};

ViewImage.propTypes = {
  marginLeft: PropTypes.string,
  title: PropTypes.string,
  visible: PropTypes.bool,
  onPressClose: PropTypes.func,
  image: PropTypes.string,
};
