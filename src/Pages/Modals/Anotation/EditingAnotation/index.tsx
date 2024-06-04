//#region React
import React, {useState, useEffect} from 'react';
import {Modal, TouchableOpacity, Platform, View, FlatList, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {useSelector} from 'react-redux';
//#endregion

//#region Icons
import {ArrowBack, Plus, Edition, Flag} from '../../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Services
import * as Controllers from '../../../../Services/Controllers';
import { Object_ } from '../../../../Services/Objects';
//#endregion

//#region Styled
import * as Modals from '../..';
import * as Styled from './styles';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
//#endregion

export interface Props {
  visible: boolean;
  onPressClose(): void;
  item: Object_.Lead;
  setVisibleEditingAnotation:(value: boolean) => void;
  getSaleFunnel: Array<Object_.Funil>;
  getEdit: Object_.Anotacao;
  setLeadAnotation:(value: Array<Object_.Anotacao>) => void;
  getLeadAnotation: Array<Object_.Anotacao> | undefined;
  funilID: number;
  funilDescription: string;
  posicaoDoFunilID: number;
  posicaoDoFunilDescription: string;
}


export const EditingAnotation = (props: Props) => {
  //#region useState
  const [getEditedAnotation, setEditedAnotation] = useState<Object_.Anotacao>({} as Object_.Anotacao);
  const [getLoading, setLoading] = useState<boolean>(false);
  //#endregion

  //#region Variables
  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);
  //#endregion

  //#region Functions
  async function EditingAnotation() {
    setLoading(true)
    let Body = [getEditedAnotation]
    let Response = await Controllers.Lead.AlterarAnotacoes(DataLogin?.token, SelectedCompany?.id, props.item.id, Body)
    if(Math.floor(Response.status / 100) === 2) {
      let listAnotations = [...props.getLeadAnotation || []];
      let AnotacaoIndex = listAnotations.findIndex(item => item.numero == getEditedAnotation.numero);
      listAnotations[AnotacaoIndex] = getEditedAnotation;
      props.setLeadAnotation(listAnotations)
      setLoading(false)
      props.setVisibleEditingAnotation(false)
    } else {
      console.log('ERROR', Response)
      setLoading(false)
    }
  }
  //#endregion

  const today = new Date();

  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <Styled.Container>
          {getLoading &&
          <Modals.ModalLoading
            transparent={true}
            visible={getLoading}
          />}
          <Styled.ContainerHeader style={{marginTop: Platform.OS === 'ios' ? '15%' : '5%'}}>
            <TouchableOpacity activeOpacity={0.9} onPress={props.onPressClose}>
              <SvgCss xml={ArrowBack} />
            </TouchableOpacity>
            <Styled.TextHeader>Editando Anotação</Styled.TextHeader>
          </Styled.ContainerHeader>
          <Styled.SubContainer>
            <Styled.SubContainerInput
              multiline={true}
              placeholderTextColor='#FFFFFF' 
              placeholder='Comece a escrever a anotação...'
              onChangeText={(value: string) => {
                let Alteration = {...getEditedAnotation} as Object_.Anotacao;
                Alteration.dataDaAnotacao = today.toISOString(),
                Alteration.descricao = value,
                Alteration.funil = {
                  id: props.funilID,
                  descricao: props.funilDescription,
                },
                Alteration.numero = props.item?.anotacoes!?.length + 1,
                Alteration.posicaoDoFunil = {
                  id: props.posicaoDoFunilID,
                  descricao: props.posicaoDoFunilDescription,
                },
                setEditedAnotation(Alteration);
              }}
            >{props.getEdit.descricao}</Styled.SubContainerInput>
          </Styled.SubContainer>
          <Styled.ContainerSubmit>
            <Styled.Submit onPress={() => {EditingAnotation()}} activeOpacity={0.8}>
              <Styled.TextSubmit>Editar Anotação</Styled.TextSubmit>
            </Styled.Submit>
          </Styled.ContainerSubmit>
        </Styled.Container>
      </LinearGradient>
    </Modal>
  );
};
