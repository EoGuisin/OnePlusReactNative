//#region React
import React, {useState, useEffect} from 'react';
import {Modal, TouchableOpacity, Platform, View} from 'react-native';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import moment from 'moment';
import 'moment/locale/pt-br'
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
import DatePicker from 'react-native-date-picker';
//#endregion

export interface Props {
  visible: boolean;
  onPressClose(): void;
  item: Object_.Lead;
  setVisibleNewScheduledVisits:(value: boolean) => void;
  getSaleFunnel: Array<Object_.Funil>;
  getLeadScheduledVisits: Array<Object_.AgendamentoDeVisita> | undefined;
  setLeadScheduledVisits:(value: Array<Object_.AgendamentoDeVisita>) => void;
}


export const NewScheduledVisits = (props: Props) => {
  //#region useState
  const [getScheduledVisits, setScheduledVisits] = useState<Object_.Anotacao>({} as Object_.Anotacao);
  const [getLoading, setLoading] = useState<boolean>(false);
  const [getVisibleSaleRooms, setVisibleSaleRooms] = useState<boolean>(false);
  const [getVisibleDate, setVisibleDate] = useState<boolean>(false);
  const [getSelectedSaleRoom, setSelectedSaleRoom] = useState<Object_.SalaDeVenda>({} as Object_.SalaDeVenda);
  const [getDate] = useState<Date>(new Date());
  const [getScheduleDate, setScheduleDate] = useState<string>("");
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

  async function CreateNewVisitation() {
    setLoading(true)
    let body = {
      salaDeVenda: getSelectedSaleRoom,
      dataDaVisita: getScheduleDate,
      visitaRealizada: false,
    } as Object_.AgendamentoDeVisita
    let Response = await Controllers.Lead.NovoAgendamentoDeVisita(DataLogin?.token, SelectedCompany?.id, props.item.id, body)
    if(Math.floor(Response.status / 100) === 2) {
      let listScheduledVisits = [...props.getLeadScheduledVisits || []]
      listScheduledVisits.push(Response.data)
      props.setLeadScheduledVisits(listScheduledVisits)
      setLoading(false)
      props.setVisibleNewScheduledVisits(false)
    } else {
      console.log('ERROR', Response)
      setLoading(false)
      setMessage1("Erro!"); setMessage2("Não foi possível criar o agendamento, entre em contato com a equipe de desenvolvimento!"); setShowToast(true)
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
          <ToastMessage
            showToast={getShowToast}
            hideToast={setShowToast}
            function={Toast}
            message1={getMessage1}
            message2={getMessage2}
          />
          <Styled.ContainerHeader style={{marginTop: Platform.OS === 'ios' ? '15%' : '5%', opacity: getShowToast ? 0 : 1}}>
            <TouchableOpacity activeOpacity={0.9} onPress={props.onPressClose}>
              <SvgCss xml={ArrowBack} />
            </TouchableOpacity>
            <Styled.TextHeader>Agendando Visita</Styled.TextHeader>
          </Styled.ContainerHeader>
          <Styled.SubContainer>
            <Styled.TouchableContainer activeOpacity={0.9} onPress={() => {setVisibleSaleRooms(true)}}>
              <View style={{flexDirection: 'row'}}>
                <Styled.TextInput>Sala De Venda:</Styled.TextInput>
                <Styled.TextInput style={{marginLeft: '2%', width: "50%"}}>{getSelectedSaleRoom?.descricao}</Styled.TextInput>
              </View>
              {getVisibleSaleRooms &&
              <Modals.MultipleSelections
                marginLeft="10%"
                title="Sala De Venda"
                search={true}
                visible={getVisibleSaleRooms}
                onPressClose={() => {setVisibleSaleRooms(false)}}
                // onChangeText={(event) => {SearchUnity(event)}}
                data={props.getSaleFunnel[0].hierarquiaDoFunil}
                renderItem={({item}) =>
                  <Styled.ItemContainer onPress={() => {
                    setSelectedSaleRoom(item?.salaDeVenda)
                    setVisibleSaleRooms(false)
                  }}>
                    <Styled.Item>
                      <Styled.TextItem>{item?.salaDeVenda.descricao}</Styled.TextItem>
                    </Styled.Item>
                  </Styled.ItemContainer>}
              />}
            </Styled.TouchableContainer>
            <Styled.TouchableContainer style={{marginTop: '2%'}} activeOpacity={0.9} onPress={() => {setVisibleDate(true)}}>
              <View style={{flexDirection: 'row'}}>
                <Styled.TextInput>Data e Hora:</Styled.TextInput>
                <Styled.TextInput style={{marginLeft: '2%', width: "60%"}}>{getScheduleDate === "" ? "" : moment(getScheduleDate).format('L')} {getScheduleDate === "" ? "" : moment(getScheduleDate).format('LT')}</Styled.TextInput>
              </View>
            </Styled.TouchableContainer>
            {getVisibleDate && 
            <DatePicker
              modal
              mode='datetime'
              is24hourSource="locale"
              open={getVisibleDate}
              date={getDate}
              onConfirm={(date) => {
                if(Platform.OS === 'ios') {
                  setScheduleDate(date.toISOString())
                  setVisibleDate(false)
                } else {
                  setScheduleDate(date.toISOString())
                  setVisibleDate(false)
                }
              }}
              onCancel={() => {
                setVisibleDate(false)
              }}
            />}
          </Styled.SubContainer>
          <Styled.ContainerSubmit>
            <Styled.Submit onPress={() => {CreateNewVisitation()}} activeOpacity={0.8}>
              <Styled.TextSubmit>Agendar Visita</Styled.TextSubmit>
            </Styled.Submit>
          </Styled.ContainerSubmit>
        </Styled.Container>
      </LinearGradient>
    </Modal>
  );
};