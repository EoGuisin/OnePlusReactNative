//#region React
import React from 'react';
import {
  Modal,
  Pressable,
  Keyboard,
  TouchableOpacity,
  Platform,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
//#endregion

//#region Styled
import * as Styled from './styles';
import * as Modals from '../../Modals'
//#endregion

//#region Icons
import {ArrowBack, MagnifyingGlass} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
//#endregion

export const FilterEnterprises = (props: any) => {
  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
    <Pressable android_disableSound={true} onPress={Keyboard.dismiss}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <Styled.Container>
        <Styled.ContainerHeader>
            <TouchableOpacity activeOpacity={0.9} onPress={props.onPressClose}>
              <SvgCss xml={ArrowBack} />
            </TouchableOpacity>
            <Styled.TextHeader style={{marginLeft: '10%'}}>Empreendimentos</Styled.TextHeader>
          </Styled.ContainerHeader>
          <Styled.InputSearchContainer>
            <Styled.InputSearch onChangeText={props.onChangeText} placeholder='Buscar' placeholderTextColor={'#FFFFFF'} textAlign={'center'} />
            <SvgCss xml={MagnifyingGlass} style={{marginLeft: '90%', position: 'absolute'}} />
          </Styled.InputSearchContainer>
          <View style={{height: '77%'}}>
            {props.loading === true &&
              <Modals.ModalLoading
                visible={props.visible2}
                transparent={true}
              />
            }
            <Styled.Flatlist
              showsVerticalScrollIndicator={false}
              data={props.data}
              renderItem={props.renderItem}
              refreshing={true}
            />
          </View>
        </Styled.Container>
      </LinearGradient>
      </Pressable>
    </Modal>
  );
};

FilterEnterprises.propTypes = {
  data: PropTypes.array,
  renderItem: PropTypes.func,
  visible: PropTypes.bool,
  visible2: PropTypes.bool,
  onPressClose: PropTypes.func,
  onPress: PropTypes.func,
  onChangeText: PropTypes.func,
  loading: PropTypes.bool,
};
