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
import { ToastMessage } from '../../../../Components';
import * as Modals from '../../';
import * as Styled from './styles';
//#endregion

import {ResponsiveWidth} from '../../../../Functions';


//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
//#endregion

export interface Props {
  visible: boolean;
  onPressClose(): void;
  item: Object_.Lead;
  getSaleFunnel: Array<Object_.Funil>;
  setVisibleNewEmail: (value: boolean) => void;
}


export const NewEmail = (props: Props) => {
  //#region useState
  const [getLoading, setLoading] = useState<boolean>(false);
  const [getFor, setFor] = useState<string>("");
  const [getCc, setCc] = useState<string>("");
  const [getTopic, setTopic] = useState<string>("");
  const [getEmail, setEmail] = useState<string>("");
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

  async function SendEmail() {
    // setLoading(true);
    const today = new Date();
    let body = {
      numero: props.item.emailsEnviados!?.length + 1,
      dataDoEmail: today.toISOString(),
      remetente: DataLogin?.pessoa,
      para: getFor.length === 0 ? props.item.emails![0]?.descricao : getFor,
      cc: getCc,
      assunto: getTopic,
      descricao: getEmail,
      funil: props.getSaleFunnel[0],
      posicaoDoFunil: props.item.historicoDoFunil![0].posicaoDoFunil,
    } as Object_.EmailEnviado
    let arrBody = [body]    
    let Response = await Controllers.Lead.NovosEmailsEnviados(DataLogin?.token, SelectedCompany.id, props.item.historicoDoFunil![0].salaDeVenda.id, props.item.historicoDoFunil![0].area.id, props.item.id, arrBody);
    if (Math.floor(Response.status / 100) === 2) {
      setMessage1("Sucesso!"); setMessage2("Email realizada com sucesso!"); setShowToast(true)
      props.setVisibleNewEmail(false)
      setLoading(false);
    } else {
      setMessage1("Erro!"); setMessage2("Não foi possível criar o email, entre em contato com a equipe de desenvolvimento!"); setShowToast(true)

      setLoading(false);
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
        <Styled.Container>
          {getLoading &&
          <Modals.ModalLoading
            transparent={true}
            visible={getLoading}
          />}
          <View style={{top: Platform.OS === "ios" ? 40 : undefined}}>
            <ToastMessage
              showToast={getShowToast}
              hideToast={setShowToast}
              function={Toast}
              message1={getMessage1}
              message2={getMessage2}
            />
          </View>
          <Styled.ContainerHeader style={{marginTop: Platform.OS === 'ios' ? '15%' : '5%', opacity: getShowToast ? 0 : 1}}>
            <TouchableOpacity activeOpacity={0.9} onPress={props.onPressClose}>
              <SvgCss xml={ArrowBack} />
            </TouchableOpacity>
            <Styled.TextHeader>Criando Email</Styled.TextHeader>
          </Styled.ContainerHeader>
          <Styled.SubContainer style={{marginTop: '7%'}}>
            <Styled.InputContainer>
              <View style={{flexDirection: 'row'}}>
                <Styled.TextInput>Para:</Styled.TextInput>
                <Styled.Input keyboardType='email-address' style={{width: ResponsiveWidth('65%'), top: Platform.OS === 'ios' ? 5 : -7 }} onChangeText={async (value: string) => {
                  setFor(value)
                }}>{props.item?.emails![0]?.descricao}</Styled.Input>
              </View>
            </Styled.InputContainer> 
            <Styled.InputContainer>
              <View style={{flexDirection: 'row'}}>
                <Styled.TextInput>Cc:</Styled.TextInput>
                <Styled.Input keyboardType='email-address' style={{width: ResponsiveWidth('65%'), top: Platform.OS === 'ios' ? 5 : -7 }} onChangeText={async (value: string) => {
                  setCc(value)
                }}></Styled.Input>
              </View>
            </Styled.InputContainer> 
            <Styled.InputContainer>
              <View style={{flexDirection: 'row'}}>
                <Styled.TextInput>Assunto:</Styled.TextInput>
                <Styled.Input keyboardType='default' style={{width: ResponsiveWidth('65%'), top: Platform.OS === 'ios' ? 5 : -7 }} onChangeText={async (value: string) => {
                  setTopic(value)
                }}></Styled.Input>
              </View>
            </Styled.InputContainer> 
          </Styled.SubContainer>
          <Styled.SubContainerTask>
            <Styled.SubContainerInput
              multiline={true}
              placeholderTextColor='#FFFFFF' 
              placeholder='Escreva o Email...'
              keyboardType='default'
              onChangeText={(value: string) => {setEmail(value)}}
            />
          </Styled.SubContainerTask>
          <Styled.ContainerSubmit>
            <Styled.Submit onPress={() => {SendEmail()}} activeOpacity={0.8}>
              <Styled.TextSubmit>Enviar Email</Styled.TextSubmit>
            </Styled.Submit>
          </Styled.ContainerSubmit>
        </Styled.Container>
      </LinearGradient>
    </Modal>
  );
};