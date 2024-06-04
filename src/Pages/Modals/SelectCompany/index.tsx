//#region React
import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Pressable,
  Keyboard,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
//#endregion

//#region Icons
import {ArrowBack, MagnifyingGlass} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Styled
import { ResponsiveHeight } from '../../../Functions';
import { LoadingInformations } from '../../../Animation';
import * as Styled from './styles';
//#endregion

//#region Externals Directorys
import Lottie from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
//#endregion

export const SelectCompany = (props: any) => {
  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
    <Pressable android_disableSound={true} onPress={Keyboard.dismiss}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <Styled.Container>
          <Styled.ContainerHeader style={{marginTop: Platform.OS === "ios" ? '15%' : '5%'}}>
            <TouchableOpacity activeOpacity={0.9} onPress={props.onPressClose}>
              <SvgCss xml={ArrowBack} />
            </TouchableOpacity>
            <Styled.TextHeader>Empresas</Styled.TextHeader>
          </Styled.ContainerHeader>
          <Styled.InputSquareContainer>
            <Styled.InputSquare onChangeText={props.onChangeText} placeholder='Buscar' placeholderTextColor={'#FFFFFF'} textAlign={'center'} />
            <SvgCss xml={MagnifyingGlass} style={{marginLeft: '90%', position: 'absolute'}} />
          </Styled.InputSquareContainer>
          {props?.data?.length >= 1 &&
            <Styled.Flatlist
              contentContainerStyle={{marginTop: 8}}
              showsVerticalScrollIndicator={false}
              data={props.data}
              renderItem={props.renderItem}
              refreshing={true}
            /> }
          {props?.data?.length === 0 && props.getErrorGroupCompany === "No Error" && (
            <Styled.ContainerLoading>
              <Styled.TextLoading>{`Aguarde. \nestamos trazendo as empresa...`}</Styled.TextLoading>
              <Styled.Loading style={{height: ResponsiveHeight('6.5%')}}>
                <Lottie source={LoadingInformations} resizeMode={'contain'} autoPlay loop />
              </Styled.Loading>
            </Styled.ContainerLoading>)}
            {props.getErrorGroupCompany === "Error" && props?.data?.length === 0 && (
              <Styled.ContainerNoPossible>
                <Styled.NoPossibleText>Não foi possível trazer empresas.</Styled.NoPossibleText>
              </Styled.ContainerNoPossible>
            )}
        </Styled.Container>
      </LinearGradient>
      </Pressable>
    </Modal>
  );
};

SelectCompany.propTypes = {
  data: PropTypes.array,
  renderItem: PropTypes.func,
  visible: PropTypes.bool,
  onPressClose: PropTypes.func,
  onChangeText: PropTypes.func,
  getErrorGroupCompany: PropTypes.string,
};
