//#region React
import React from 'react';
import {Modal} from 'react-native';
//#endregion

//#region Styled
import * as Styled from './styles';
//#endregion

//#region Externals Directorys
import Lottie from 'lottie-react-native';
import {Loading} from '../../../Animation';
//#endregion

interface Props {
  transparent: boolean,
  visible: boolean,
}

export const ModalLoading = (props: Props) => {
  return (
    <Modal animationType="slide" transparent={props.transparent} visible={props.visible}>
      <Styled.Container>
        <Styled.Loading>
          <Lottie source={Loading} resizeMode={'contain'} autoPlay loop />
        </Styled.Loading>
      </Styled.Container>
    </Modal>
  );
};