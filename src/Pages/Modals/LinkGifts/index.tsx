//#region React
import React, {useState} from 'react';
import {Modal, TouchableOpacity, Platform, View, Alert, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/pt-br'
import {useSelector} from 'react-redux';
//#endregion

//#region Icons
import {ArrowBack, Plus, Delete, Send, Print} from '../../../Assets';
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
  setLeadLinkGifts:(value: Array<Object_.ItemDoAlmoxarifadoDeBrinde>) => void;
  getLeadLinkGifts: Array<Object_.ItemDoAlmoxarifadoDeBrinde> | undefined;
  getSelectedSaleFunnel: Object_.Funil | undefined;
}


export const LinkGifts = (props: Props) => {
  //#region useState
  const [getVisibleDeleteGift, setVisibleDeleteGift] = useState<boolean>(false);
  const [getVisibleNewLinkGifts, setVisibleNewLinkGifts] = useState<boolean>(false);
  const [getWarehouse, setWarehouse] = useState<Object_.ItemDoAlmoxarifadoDeBrinde[]>([]);
  const [getReasonCancellation, setReasonCancellation] = useState<Object_.CancelamentoBrinde[]>([]);
  const [getSelectedReasonCancellation, setSelectedReasonCancellation] = useState<Object_.CancelamentoBrinde | undefined>(undefined);

  //#endregion

  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);

  //#region Functions
  function alert(Item: Object_.ItemDoAlmoxarifadoDeBrinde, Index: number) {
    Alert.alert('Cancelamento de brinde', `Deseja realmente cancelar o brinde? \nMotivo do Cancelamento${getSelectedReasonCancellation}`, [
      { text: 'Não', style: 'cancel', onPress: () => setSelectedReasonCancellation(undefined)},
      { text: 'Sim', onPress: () => DeleteLinkGifts(Item, Index) },
    ]);
  }

  async function DeleteLinkGifts(item: Object_.ItemDoAlmoxarifadoDeBrinde, index: number) {
    item.motivoDeCancelamentoDoBrinde = {
      descricao: getSelectedReasonCancellation?.descricao,
      id: getSelectedReasonCancellation?.id,
    }
    let Response = await Controllers.Lead.CancelarBrinde(DataLogin?.token, SelectedCompany?.id, props.item.id, item, false)
    if(Math.floor(Response.status / 100) === 2) {
      let ListLinkGifts = [...props.getLeadLinkGifts || []];
      ListLinkGifts[index].status = {
        id: 3,
        descricao: "Cancelado"
      };
      props.setLeadLinkGifts(ListLinkGifts);
    } else {
      console.log('algo deu errado')
    }
  }
  
  async function Warehouse() {
    let Response = await Controllers.Brinde.Almoxarifado(DataLogin?.token, SelectedCompany?.id)
    if(Math.floor(Response.status / 100) === 2) {
      setWarehouse(Response.data)
      setVisibleNewLinkGifts(true)
    } else {
      console.log('algo deu errado')
    }
  }

  async function ReasonCancellation() {
    let Response = await Controllers.Brinde.MotivosDeCancelamento(DataLogin?.token, SelectedCompany?.id)
    if(Math.floor(Response.status / 100) === 2) {
      setReasonCancellation(Response.data)
      setVisibleDeleteGift(true)
    } else {
      console.log('algo deu errado')
    }
  }
  //#endregion

  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <Styled.Container>
          <Styled.ContainerHeader style={{marginTop: Platform.OS === 'ios' ? '15%' : '5%'}}>
            <TouchableOpacity activeOpacity={0.9} onPress={props.onPressClose}>
              <SvgCss xml={ArrowBack} />
            </TouchableOpacity>
            <Styled.TextHeader>Brindes</Styled.TextHeader>
          </Styled.ContainerHeader>
          <Styled.SubContainer>
            {props?.getLeadLinkGifts!?.length > 0 ?
            <ScrollView>
            {props.getLeadLinkGifts?.map((Item, Index)=>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style={{marginRight: '2%'}} onPress={() => {ReasonCancellation()}}>
                  <SvgCss xml={Delete} />
                  {getVisibleDeleteGift &&
                  <Modals.MultipleSelections
                    marginLeft="10%"
                    title="Selecione o Motivo"
                    search={true}
                    visible={getVisibleDeleteGift}
                    onPressClose={() => {setVisibleDeleteGift(false)}}
                    data={getReasonCancellation}
                    renderItem={({item}) =>
                      <Styled.ItemContainer onPress={() => {
                        setSelectedReasonCancellation(item)
                        alert(Item, Index)
                      }}>
                        <Styled.Item>
                          <Styled.TextItem>{item?.descricao}</Styled.TextItem>
                        </Styled.Item>
                      </Styled.ItemContainer>
                    }
                  />}
                </TouchableOpacity>
                <Styled.ContainerLinkGifts>
                  <Styled.LinkGiftsTextHeader>Brinde: {Item.brinde.descricao}</Styled.LinkGiftsTextHeader>
                  <Styled.LinkGiftsText>Tipo: {Item.tipo.descricao}</Styled.LinkGiftsText>
                  <Styled.LinkGiftsText>Valor: {Item.valorUnitario}</Styled.LinkGiftsText>
                  <Styled.LinkGiftsText>Fornecedor: {Item.fornecedor.nomeRazaoSocial}</Styled.LinkGiftsText>
                  <Styled.LinkGiftsText>Data de Geração: {moment(Item.dataCadastro).format("L")}</Styled.LinkGiftsText>
                  <Styled.LinkGiftsText>Data de Expiração: {moment(Item.validadeFinal).format("L")}</Styled.LinkGiftsText>
                  <Styled.LinkGiftsText>Status: {Item.status?.descricao}</Styled.LinkGiftsText>
                  {Item.status?.id === 3 &&
                    <Styled.LinkGiftsText>Motivo do Cancelalmento: {Item.motivoDeCancelamentoDoBrinde?.descricao}</Styled.LinkGiftsText>
                  }
                </Styled.ContainerLinkGifts>
                <TouchableOpacity style={{marginLeft: '2%'}} onPress={() => {}}>
                  <SvgCss xml={Print} />
                </TouchableOpacity>
              </View>
              )}
            </ScrollView> :
            <Styled.ContainerNoLinkGifts>
              <Styled.NoLinkGiftsText>Não há brindes vinculados no momento.</Styled.NoLinkGiftsText>
            </Styled.ContainerNoLinkGifts>
            }
          </Styled.SubContainer>
          <Styled.ContainerSubmit>
            <Styled.Submit onPress={() => {Warehouse()}} activeOpacity={0.8}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <SvgCss xml={Plus} style={{marginLeft: '5%'}}/>
                <Styled.TextSubmit>Vincular Brinde</Styled.TextSubmit>
              </View>
              {getVisibleNewLinkGifts &&
              <Modals.NewLinkGifts 
                onPressClose={() => {setVisibleNewLinkGifts(false)}}
                visible={getVisibleNewLinkGifts}
                item={props.item}
                getSaleFunnel={props.getSaleFunnel}
                setLeadLinkGifts={props.setLeadLinkGifts}
                getLeadLinkGifts={props.getLeadLinkGifts}
                getWarehouse={getWarehouse}
              />}
            </Styled.Submit>
          </Styled.ContainerSubmit>
        </Styled.Container>
      </LinearGradient>
    </Modal>
  );
};

LinkGifts.propTypes = {
  visible: PropTypes.bool,
  onPressClose: PropTypes.func,
  getLeadFunction: PropTypes.func,
  item: PropTypes.object,
  getSaleFunnel: PropTypes.object,
  setLeadLinkGifts: PropTypes.func,
  getLeadLinkGifts: PropTypes.array,
};
