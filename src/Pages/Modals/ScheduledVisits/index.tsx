//#region React
import React, {useState} from 'react';
import {Modal, TouchableOpacity, Platform, View, ScrollView, Linking} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {useSelector} from 'react-redux';
//#endregion

//#region Icons
import {ArrowBack, Plus, Delete, Send} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Services
import * as Controllers from '../../../Services/Controllers';
import { Object_ } from '../../../Services/Objects';
//#endregion

//#region Styled
import * as Modals from '..';
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
  setLeadScheduledVisits:(value: Array<Object_.AgendamentoDeVisita>) => void;
  getLeadScheduledVisits: Array<Object_.AgendamentoDeVisita> | undefined;
  getSelectedSaleFunnel: Object_.Funil | undefined;
}


export const ScheduledVisits = (props: Props) => {
  //#region useState
  const [getVisibleNewScheduledVisits, setVisibleNewScheduledVisits] = useState<boolean>(false);
  const [getLoading, setLoading] = useState<boolean>(false);
  //#endregion

  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);

  async function DeleteScheduledVisits(item: Object_.AgendamentoDeVisita, index: number) {
    setLoading(true);
    let Response = await Controllers.Lead.DeletarAgendamentoDeVisita(DataLogin?.token, SelectedCompany?.id, props.item.id, item)
    if(Math.floor(Response.status / 100) === 2) {
      let ListScheduledVisits = [...props.getLeadScheduledVisits || []];
      ListScheduledVisits.splice(index, 1);
      props.setLeadScheduledVisits(ListScheduledVisits);
      setLoading(false);
    }
  }

  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <Styled.Container>
          <Modals.ModalLoading transparent={true} visible={getLoading}/>
          <Styled.ContainerHeader style={{marginTop: Platform.OS === 'ios' ? '15%' : '5%'}}>
            <TouchableOpacity activeOpacity={0.9} onPress={props.onPressClose}>
              <SvgCss xml={ArrowBack} />
            </TouchableOpacity>
            <Styled.TextHeader>Visitas Agendadas</Styled.TextHeader>
          </Styled.ContainerHeader>
          <Styled.SubContainer>
            {props?.getLeadScheduledVisits!?.length > 0 ?
            <ScrollView>
            {props.getLeadScheduledVisits?.map((item, index)=>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style={{marginRight: '2%'}} onPress={() => {DeleteScheduledVisits(item, index)}}>
                  <SvgCss xml={Delete} />
                </TouchableOpacity>
                <Styled.ContainerScheduledVisits>
                  <Styled.ScheduledVisitsText1>Sala de Venda: {`\n`}{item.salaDeVenda?.descricao}{`\n`}</Styled.ScheduledVisitsText1>
                  <Styled.ScheduledVisitsText1>
                    Data da Visita: {`\n`}
                    {moment(item.dataDaVisita).format("ddd, ")}
                    {moment(item.dataDaVisita).format("DD ")}de
                    {moment(item.dataDaVisita).format(" MMMM, ")}às
                    {moment(item.dataDaVisita).format(" LT")}{`\n`}
                  </Styled.ScheduledVisitsText1>
                  <Styled.ScheduledVisitsText1>Visita Realizada: {item.visitaRealizada == true ? "Sim" : "Não"}</Styled.ScheduledVisitsText1>
                </Styled.ContainerScheduledVisits>
                <TouchableOpacity style={{marginLeft: '2%'}} onPress={() => {
                  Linking.openURL(`https://wa.me/55${props.item?.telefones![0]?.ddd + props.item?.telefones![0]?.numero}?text=Visita agendada com o corretor ${DataLogin?.pessoa?.nome} ao empreendimento ${item.salaDeVenda?.descricao} para ${moment(item.dataDaVisita).format("LLLL")}. Aguardamos a sua visita!`)
                }}>
                  <SvgCss xml={Send} />
                </TouchableOpacity>
              </View>)}
            </ScrollView> :
            <Styled.ContainerNoScheduledVisits>
              <Styled.NoScheduledVisitsText>Não há visitas agendadas no momento.</Styled.NoScheduledVisitsText>
            </Styled.ContainerNoScheduledVisits>}
          </Styled.SubContainer>
          <Styled.ContainerSubmit>
            <Styled.Submit onPress={() => {setVisibleNewScheduledVisits(true)}} activeOpacity={0.8}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <SvgCss xml={Plus} style={{marginLeft: '5%'}}/>
                <Styled.TextSubmit>Agendar Visita</Styled.TextSubmit>
              </View>
              {getVisibleNewScheduledVisits &&
              <Modals.NewScheduledVisits 
                onPressClose={() => {setVisibleNewScheduledVisits(false)}}
                visible={getVisibleNewScheduledVisits}
                item={props.item}
                setVisibleNewScheduledVisits={setVisibleNewScheduledVisits}
                getSaleFunnel={props.getSaleFunnel}
                setLeadScheduledVisits={props.setLeadScheduledVisits}
                getLeadScheduledVisits={props.getLeadScheduledVisits}
              />}
            </Styled.Submit>
          </Styled.ContainerSubmit>
        </Styled.Container>
      </LinearGradient>
    </Modal>
  );
};