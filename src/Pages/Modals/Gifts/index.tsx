//#region React
import React, {useState, useEffect} from 'react';
import {Modal, TouchableOpacity, Platform, View, FlatList, Text} from 'react-native';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import moment from 'moment';
import 'moment/locale/pt-br'
//#endregion

//#region Icons
import {
  ArrowBack,
  _Filter,
  Camera,
  Calendar,
  ThreeArrows,
  FlagLine,
  Flag,
} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Services
import { Object_ } from '../../../Services/Objects';
//#endregion

//#region Styled
import * as Modals from '..';
import * as Styled from './styles';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
import {MotiTransitionProp, MotiView} from 'moti';
import {Easing} from 'react-native-reanimated';
//#endregion

interface Gifts {
  leadId: number,
  leadNome: string,
  codigoDeValidacao: string,
  itemDoAlmoxarifado: Object_.ItemDoAlmoxarifadoDeBrinde,
  numeroDaNF: number,
  nf: Object_.Anexo
}
export interface Props {
  visible: boolean;
  onPressClose(): void;
  OriginalProviderLogin: Gifts[];
}

interface Frequence {
  id: number;
  description: string;
}

export const Gifts = (props: Props) => {

  //#region useState
  const [getVisibleFilter, setVisibleFilter] = useState<boolean>(false);
  const [getSwipe, setSwipe] = useState<boolean>(false);
  const [getFirst, setFirst] = useState<boolean>(true);
  const [getVisibleQRCode, setVisibleQRCode] = useState<boolean>(false);
  const [getDateInitial, setDateInitial] = useState<string>("");
  const [getDateEnd, setDateEnd] = useState<string>("");
  const [getSelectedFrequence, setSelectedFrequence] = useState<Frequence>({} as Frequence);
  const [getId, setId] = useState<number>(0);
  const [getInsideId, setInsideId] = useState<number>(0);
  const [getInvoicing, setInvoicing] = useState<boolean>(false);
  const [getInvoicingList, setInvoicingList] = useState<Array<Gifts>>([]);
  //#endregion
  
  //#region Variables
  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);
  const ProviderLogin: Gifts[] = useSelector((state:any) => state.ProviderLogin);
  const [getGifts, setGifts] = useState<Gifts[][] | undefined>(undefined);
  const transition: MotiTransitionProp = {
    type: 'timing',
    duration: 300,
    easing: Easing.out(Easing.ease),
  };
  //#endregion

  //#region Functions
  function Id(index: number) {
    if (index !== getId) {
      setId(index)
      setSwipe(true)
    } else {
      getSwipe ? setSwipe(false) : setSwipe(true);
    }
  }

  function InvoicingPush(item: Gifts) {
    if(getInvoicingList.find(i => i === item)) {
      let List = [...getInvoicingList ?? []]
      List.splice(List.indexOf(item, 0), 1);
      setInvoicingList(List);
    } else {
      let List = [...getInvoicingList]
      List.push(item)
      setInvoicingList(List)
    }
  }

  function sum(item: Gifts[]) {
    let sum = 0
    for(var i = 0; i < item.length; i++) {
      sum += item[i].itemDoAlmoxarifado.valorUnitario;
    }
    return sum
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
          <Styled.ContainerHeader style={{marginTop: Platform.OS === 'ios' ? '15%' : '10%'}}>
              <TouchableOpacity activeOpacity={0.9} onPress={props.onPressClose}>
                <SvgCss xml={ArrowBack} />
              </TouchableOpacity>
            <Styled.TextHeader>Brindes</Styled.TextHeader>
          </Styled.ContainerHeader>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: '5%', marginTop: '5%', marginBottom: 5}}>
            <Styled.TextList>Lista</Styled.TextList>
            <TouchableOpacity onPress={() => {setVisibleFilter(true)}}>
              <SvgCss xml={_Filter} />
              <Modals.FilterGifts
                visible={getVisibleFilter}
                setVisibleFilter={setVisibleFilter}
                getDateInitial={getDateInitial}
                setDateInitial={setDateInitial}
                getDateEnd={getDateEnd}
                setDateEnd={setDateEnd}
                setGifts={setGifts}
                OriginalProviderLogin={props.OriginalProviderLogin}
                getSelectedFrequence={getSelectedFrequence}
                setSelectedFrequence={setSelectedFrequence}
              />
            </TouchableOpacity>
          </View>
          <Styled.SubContainer>
            <Styled.SubContainerText style={{ textAlign: 'center', fontSize: 13, fontFamily: 'AzeretMono-SemiBold'}}>Data definida: {getDateInitial === "" ? "00/00/0000" : moment(getDateInitial).format("DD/MM/YYYY")} - {getDateEnd === "" ? "00/00/0000" : moment(getDateEnd).format("DD/MM/YYYY")}</Styled.SubContainerText>
          </Styled.SubContainer>
          {getGifts != undefined ?
          <>
          <FlatList
            style={{marginBottom: 60, marginTop: '5%'}}
            refreshing={true}
            showsVerticalScrollIndicator={false}
            data={getGifts}
            renderItem={({item, index}) =>
            <TouchableOpacity activeOpacity={0.9} onPress={() => {
              Id(index)
            }}>
              <MotiView
                transition={transition}
                from={{paddingBottom: getSwipe && index === getId ? '10%' : '2%'}}
                style={{
                  backgroundColor: 'rgba(192, 227, 220, 0.3)',
                  borderRadius: 10,
                  marginTop: '5%',
                  width: '95%',
                  alignSelf: 'center',
                  padding: '2.5%',
                }}>
                  <View style={{flexDirection: 'row'}}>
                    <SvgCss xml={Calendar} />
                    <View style={{flexDirection: 'column', flex: 1}}> 
                    {getSwipe === true && index === getId ?
                    <Styled.SubContainerText style={{textTransform: 'capitalize', marginLeft: '5%', fontSize: getSwipe === true && index === getId ? 17 : 15, fontFamily: 'AzeretMono-Medium'}}>Frequência {getSelectedFrequence.id === 0 ? "Mensal" : getSelectedFrequence.id === 1 ? "Trimestral" : getSelectedFrequence.id === 2 ? "Semestral" : getSelectedFrequence.id === 3 ? "Anual" : ""}</Styled.SubContainerText> :
                    <>
                      <Styled.SubContainerText style={{textTransform: 'capitalize', marginLeft: '5%', fontSize: 15, fontFamily: 'AzeretMono-Medium'}}>{getSelectedFrequence.id === 0 ? moment(item[0]?.itemDoAlmoxarifado.dataCadastro).format("MMM") : getSelectedFrequence.id === 1 ? "Trimestral" : getSelectedFrequence.id === 2 ? "Semestral" : getSelectedFrequence.id === 3 ? "Anual" : ""} / {moment(item[0].itemDoAlmoxarifado.dataCadastro).format("YYYY")}</Styled.SubContainerText>
                      <Styled.SubContainerText style={{marginLeft: '5%', fontSize: 15, fontFamily: 'AzeretMono-Medium'}}>Total R$ {sum(item).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Styled.SubContainerText>
                    </>}
                    </View>
                  </View>
                    <MotiView
                      transition={transition}
                      from={{transform: getSwipe && index === getId ? [{rotate: '180deg'}] : [{rotate: '0deg'}]}}
                      style={{marginLeft: '95%', position: 'absolute'}}>
                      <SvgCss xml={ThreeArrows} />
                    </MotiView>
                    <View>
                      {getSwipe === true && index === getId && 
                      <>
                        <Styled.InsideTotal style={{marginTop: '5%'}}>-Total de clientes: {item.length}</Styled.InsideTotal>
                        <Styled.InsideTotal>-Total de brindes: {item.length}</Styled.InsideTotal>
                        <Styled.InsideTotal>-Total gerado: R$ {sum(item).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Styled.InsideTotal>
                        <View style={{flexDirection: 'row', marginTop: '7%', marginBottom: '3%'}}>
                          <SvgCss xml={Calendar} />
                          <Styled.SubContainerText style={{textTransform: 'capitalize', marginLeft: '5%', fontSize: 15, fontFamily: 'AzeretMono-Medium'}}>{getSelectedFrequence.id === 0 ? moment(item[0]?.itemDoAlmoxarifado.dataCadastro).format("MMMM") : ""} - {moment(item[0].itemDoAlmoxarifado.dataCadastro).format("YYYY")}</Styled.SubContainerText>
                        </View>
                        <Styled.InsideTotal>-Total de clientes: {item.length}</Styled.InsideTotal>
                        <Styled.InsideTotal style={{marginBottom: '3%'}}>-Total de brindes: {item.length}</Styled.InsideTotal>
                        <FlatList
                          refreshing={true}
                          showsVerticalScrollIndicator={false}
                          data={item}
                          renderItem={(Item) =>
                          <View>
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                              <SvgCss xml={getInvoicingList?.includes(Item.item) ? Flag : FlagLine} style={{marginRight: '2%', marginTop:'7%'}}/>
                              <Styled.ContainerClient onPress={() => {getInvoicing ? setInvoicing(false) : setInvoicing(true); setInsideId(Item.index); InvoicingPush(Item.item)}}>
                                <Styled.InsideClientText style={{marginTop: 0}}>Cliente: {Item.item.leadNome}</Styled.InsideClientText>
                                <Styled.InsideClientText>Brinde: {Item.item.itemDoAlmoxarifado.brinde.descricao}</Styled.InsideClientText>
                                <Styled.InsideClientText>Data: {moment(Item.item.itemDoAlmoxarifado.dataCadastro).format("DD/MM/YYYY")}</Styled.InsideClientText>
                                <Styled.InsideClientText>Horário: {moment(Item.item.itemDoAlmoxarifado.dataCadastro).format("HH:mm")}</Styled.InsideClientText>
                                <Styled.InsideClientText>Total: {Item.item.itemDoAlmoxarifado.valorUnitario.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Styled.InsideClientText>
                              </Styled.ContainerClient>
                            </View>
                          </View>}
                        />
                      </>}
                    </View>
                </MotiView>
                </TouchableOpacity>}
            /> 
            </> :
            <Styled.SubContainerText style={{textAlign: 'center', marginTop: '50%', fontFamily: 'AzeretMono-Medium'}}>Filtre os brindes!</Styled.SubContainerText>}
          <Styled.WrapperButtons>
            <Styled.QRCode activeOpacity={0.9} onPress={() => {setVisibleQRCode(true)}}>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <SvgCss xml={Camera} height={'50%'} />
                <Styled.TextButton>QR Code</Styled.TextButton>
              </View>
            </Styled.QRCode>
            <Styled.Invoicing activeOpacity={0.9}>
              <Styled.TextButton>Faturamento</Styled.TextButton>
            </Styled.Invoicing>
          </Styled.WrapperButtons>
        </Styled.Container>
      </LinearGradient>
    </Modal>
  );
};