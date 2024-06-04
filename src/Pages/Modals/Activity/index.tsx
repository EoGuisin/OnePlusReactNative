//#region React
import React, {useState, useEffect} from 'react';
import {Modal, TouchableOpacity, Platform, View, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {useSelector} from 'react-redux';
//#endregion

//#region Icons
import {ArrowBack, Plus, Edition, Flag} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Services
import * as Controllers from '../../../Services/Controllers';
import { Object_ } from '../../../Services/Objects';
//#endregion

//#region Styled
import * as Modals from '../';
import * as Styled from './styles';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
//#endregion

export interface Props {
  visible: boolean;
  onPressClose(): void;
  item: Object_.Lead;
  getSaleFunnel: Array<Object_.Funil>;
}


export const Activity = (props: Props) => {
  //#region useState
  //#endregion

  //#region Variables
  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);
  //#endregion

  //#region UseEffect
  useEffect(() => {
  }, []);
  //#endregion

  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <Styled.Container>
          <Styled.ContainerHeader style={{marginTop: Platform.OS === 'ios' ? '15%' : '5%'}}>
            <TouchableOpacity activeOpacity={0.9} onPress={props.onPressClose}>
              <SvgCss xml={ArrowBack} />
            </TouchableOpacity>
            <Styled.TextHeader>Atividades</Styled.TextHeader>
          </Styled.ContainerHeader>
          <Styled.SubContainer>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <SvgCss xml={Flag} style={{marginRight: '2%'}}/>
              <Styled.ContainerActivity>
                <Styled.AnotationText1>Próximas ações</Styled.AnotationText1>
                <Styled.AnotationText2>Não há proximas ações no momento</Styled.AnotationText2>
              </Styled.ContainerActivity>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '10%'}}>
              <SvgCss xml={Flag} style={{marginRight: '2%'}}/>
              <Styled.ContainerActivity>
                <Styled.AnotationText1>Histórico</Styled.AnotationText1>
                <Styled.AnotationText2>Não há histórico no momento</Styled.AnotationText2>
              </Styled.ContainerActivity>
            </View>
          </Styled.SubContainer>
        </Styled.Container>
      </LinearGradient>
    </Modal>
  );
};