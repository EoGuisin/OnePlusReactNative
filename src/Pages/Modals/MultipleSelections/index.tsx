//#region React
import React from 'react';
import {Modal, TouchableOpacity, Platform, View} from 'react-native';
import PropTypes from 'prop-types';
//#endregion

//#region Icons
import {ArrowBack, MagnifyingGlass} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Styled
import * as Styled from './styles';
import * as Modals from '../../Modals';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
//#endregion

export const MultipleSelections = (props: any) => {
  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <Styled.Container>
          <Styled.ContainerHeader
            style={{marginTop: Platform.OS === 'ios' ? '15%' : '5%'}}>
            <TouchableOpacity activeOpacity={0.9} onPress={props.onPressClose}>
              <SvgCss xml={ArrowBack} />
            </TouchableOpacity>
            <Styled.TextHeader style={{position: 'absolute', textAlign: 'center', marginLeft: props.marginLeft}}>
              {props.title}
            </Styled.TextHeader>
          </Styled.ContainerHeader>
          {props.search === true && (
            <Styled.InputSquareContainer>
              <Styled.InputSquare
                onChangeText={props.onChangeText}
                placeholder="Buscar"
                placeholderTextColor={'#FFFFFF'}
                textAlign={'center'}
              />
              <SvgCss
                xml={MagnifyingGlass}
                style={{marginLeft: '90%', position: 'absolute'}}
              />
            </Styled.InputSquareContainer>
          )}
          <Styled.Flatlist data={props.data} renderItem={props.renderItem} />
          {props.loading === true && (
            <Modals.ModalLoading visible={props.visible2} transparent={true} />
          )}
        </Styled.Container>
      </LinearGradient>
    </Modal>
  );
};

MultipleSelections.propTypes = {
  visible2: PropTypes.bool,
  loading: PropTypes.bool,
  search: PropTypes.bool,
  marginLeft: PropTypes.string,
  title: PropTypes.string,
  visible: PropTypes.bool,
  onPressClose: PropTypes.func,
  data: PropTypes.array,
  renderItem: PropTypes.func,
  onChangeText: PropTypes.func,
};
