//#region React
import React, {useState, useEffect} from 'react';
import {Modal, TouchableOpacity, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
//#endregion

//#region Icons
import {ArrowBack} from '../../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Services
import * as Controllers from '../../../../Services/Controllers';
import { Object_ } from '../../../../Services/Objects';
//#endregion

//#region Styled
import { ToastMessage } from '../../../../Components';
import * as Modals from '../..';
import * as Styled from './styles';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
import { Kanban } from '../../../Catalog/Menu/PagesMenu/FunisDeVenda/type';
//#endregion

export interface Props {
  visible: boolean;
  onPressClose(): void;
  item: Object_.Lead;
  setVisibleNewAnotation:(value: boolean) => void;
  getSaleFunnel: Array<Object_.Funil>;
  setLeadAnotation:(value: Array<Object_.Anotacao>) => void;
  getLeadAnotation: Array<Object_.Anotacao> | undefined;
  salaDeVendaID: number;
  areaID: number;
  funilID: number;
  funilDescription: string;
  posicaoDoFunilID: number;
  posicaoDoFunilDescription: string;
}


export const NewAnotation = (props: Props) => {
  //#region useState
  const [getNewAnotation, setNewAnotation] = useState<Object_.Anotacao>({} as Object_.Anotacao);
  const [getLoading, setLoading] = useState<boolean>(false);
  const [getShowToast, setShowToast] = useState<boolean>(false);
  const [getMessage1, setMessage1] = useState<string>("");
  const [getMessage2, setMessage2] = useState<string>("");
  //#endregion

  //#region Variables
  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);
  //#endregion

  //#region Functions
  function Toast() {
    setShowToast(false)
  }

  async function CreateNewAnotation() {
    setLoading(true)
    let Body = [getNewAnotation]
    let Response = await Controllers.Lead.NovasAnotacoes(DataLogin?.token, SelectedCompany?.id, props.salaDeVendaID, props.areaID, props.item.id, Body)
    if(Math.floor(Response.status / 100) === 2) {
      let listAnotations = [...props.getLeadAnotation || []]
      listAnotations.push(Response.data[0])
      props.setLeadAnotation(listAnotations)
      setLoading(false)
      props.setVisibleNewAnotation(false)
      setMessage1("Anotação"); setMessage2("Anotação realizada com sucesso!"); setShowToast(true)
    } else {
      console.log('ERROR', Response)
      setMessage1("Erro!"); setMessage2("Não foi possível realizar a criação da anotação, entre em contato com a equipe de desenvolvimento!"); setShowToast(true)
      setLoading(false)
    }
  }
  //#endregion

  //#region UseEffect
  useEffect(() => {
  }, []);
  //#endregion

  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <ToastMessage
          showToast={getShowToast}
          hideToast={setShowToast}
          function={Toast}
          message1={getMessage1}
          message2={getMessage2}
        />
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
            <Styled.TextHeader>Criando Anotação</Styled.TextHeader>
          </Styled.ContainerHeader>
          <Styled.SubContainer>
            <Styled.SubContainerInput
              multiline={true}
              placeholderTextColor='#FFFFFF' 
              placeholder='Comece a escrever a anotação...'
              onChangeText={(value: string) => {
                const today = new Date();
                let Alteration = {...getNewAnotation} as Object_.Anotacao;
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
                setNewAnotation(Alteration);
              }}
            />
          </Styled.SubContainer>
          <Styled.ContainerSubmit>
            <Styled.Submit onPress={() => {CreateNewAnotation()}} activeOpacity={0.8}>
              <Styled.TextSubmit>Salvar Anotação</Styled.TextSubmit>
            </Styled.Submit>
          </Styled.ContainerSubmit>
        </Styled.Container>
      </LinearGradient>
    </Modal>
  );
};
