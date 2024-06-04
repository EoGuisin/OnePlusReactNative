//#region React 
import React,{useState, useEffect} from 'react';
import {FlatList, TouchableOpacity, View, Animated, Pressable, Keyboard, Platform,KeyboardAvoidingView} from 'react-native';
//#endregion

//#region Styled
import * as Styled from './styles'
import * as Modal from '../../../../Modals'
import { ToastMessage } from '../../../../../Components';
import { LoadingInformations } from '../../../../../Animation';
//#endregion

//#region Services
import * as Controllers from '../../../../../Services/Controllers';
import { Object_ } from '../../../../../Services/Objects';
//#endregion

//#region ViewModel
import ViewModel from '../../ViewModel'
//#endregion

//#region Functions
import { ResponsiveHeight } from '../../../../../Functions';
//#endregion

//#region Images
import {ArrowBack, MagnifyingGlass, ReservaWhite, ReservaGreen, EstoqueWhite, EstoqueGreen, EspelhoDigitalGreen, EspelhoDigitalWhite, Proposal, Reservation, EyeMore, Sell, Cancel, Profile, FilterEnterprise, _Filter, MapGreen, MapWhite} from '../../../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Reduxs
import {useSelector} from 'react-redux';
//#endregion

//#region Externals Directorys
import * as turf from '@turf/turf';
import LinearGradient from 'react-native-linear-gradient';
import {MotiTransitionProp, MotiView} from 'moti';
import {Easing} from 'react-native-reanimated';
import Lottie from 'lottie-react-native';
import moment from 'moment';
import 'moment/locale/pt-br'
let Socket: WebSocket
//#endregion

export function ScreenDisponibilidade(ViewModel: ViewModel)  {
  //#region useState
  const [getVisiblePolygons, setVisiblePolygons] = useState<Object_.Lotes[]>([]);
  const [getMapList, setMapList] = useState<Object_.Lotes[]>([]);
  const [getOriginal, setOriginal] = useState<Object_.Map>({} as Object_.Map);;
  const [getMapOriginalList, setMapOriginalList] = useState<Object_.Map | undefined>(undefined);
  const [getPositionCenter, setPositionCenter] = useState<number[]>([]);
  const [getVisibleModalEnterprises, setVisibleModalEnterprises] = useState<boolean>(false);
  const [getVisibleModalFilterAllotments, setVisibleModalFilterAllotments] = useState<boolean>(false);
  const [getVisibleReserva, setVisibleReserva] = useState<boolean>(false);
  const [getVisibleEstoque, setVisibleEstoque] = useState<boolean>(false);
  const [getVisibleMap, setVisibleMap] = useState<boolean>(false);
  const [getVisibleLoadingMap, setVisibleLoadingMap] = useState<boolean>(false);
  const [getViewMore, setViewMore] = useState<number>();
  const [getVisibleEspelhoDigital, setVisibleEspelhoDigital] = useState<boolean>(false);
  const [getCentroDeCusto, setCentroDeCusto] = useState<Array<Object_.CentroDeCusto>>();
  const [getOriginalCentroDeCusto, setOriginalCentroDeCusto] = useState<Array<Object_.CentroDeCusto>>();
  const [getSelectedCentroDeCusto, setSelectedCentroDeCusto] = useState<Object_.CentroDeCusto>();
  const [getIdentificador, setIdentificador] = useState<Array<Object_.Identificador> | undefined>(undefined);
  const [getOriginalIdentificador, setOriginalIdentificador] = useState<Array<Object_.Identificador>>();
  const [getIdentificadorReservation, setIdentificadorReservation] = useState<Array<Object_.Identificador>>();
  const [getLoading, setLoading] = useState<boolean>(false);
  const [getFilterAvailable, setFilterAvailable] = useState<Array<Object_.Identificador>>();
  const [getFilterSold, setFilterSold] = useState<Array<Object_.Identificador>>();
  const [getFilterReserved, setFilterReserved] = useState<Array<Object_.Identificador>>();
  const [getResultAllotments, setResultAllotments] = useState<Array<AllotmentsCollection>>();
  const [getOriginalResultAllotments, setOriginalResultAllotments] = useState<Array<AllotmentsCollection>>();
  const [getResultQuota, setResultQuota] = useState<Array<QuotaCollection>>();
  const [getOriginalResultQuota, setOriginalResultQuota] = useState<Array<QuotaCollection>>();
  const [getModalLoading, setModalLoading] = useState<boolean>(false);
  const [getMessage, setMessage] = useState<Message>({} as Message);
  const [getStatus, setStatus] = useState<Array<string>>(["0","2"]);
  const [getReserved, setReserved] = useState<boolean>(false);
  const [getDelete, setDelete] = useState<boolean>(false);
  const [getFirstTime, setFirstTime] = useState<boolean>(false);
  const [getShowToast, setShowToast] = useState<boolean>(false);
  const [getMessage1, setMessage1] = useState<string>("");
  const [getMessage2, setMessage2] = useState<string>("");
  //#endregion

  //#region Variables
  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);
  const transition: MotiTransitionProp = {
    type: 'timing',
    duration: 200,
    easing: Easing.out(Easing.ease),
  };
  //#endregion

  //#region Interface
  interface Informations {
    quadra: string,
    lote: string,
    frente: number,
    confrontoFrente: string,
    fundo: number,
    confrontoFundo: string,
    esquerda: number,
    confrontoEsquerdo: string,
    direita: number,
    confrontoDireito: string,
    chanfro: number,
    matricula: string,
    dataMatricula: string,
  }
  interface LatLong {
    latitude: number,
    longitude: number
  }
  interface ArrayMap {
    lote: string,
    center: {
      latitude: number,
      longitude: number,
    },
    dadosUau: {
      status: number,
      area: number,
      valorAVista: number,
      descricao: string,
      FRACAO_IDEAL: null,
      Categoria_de_preco: string,
      statusDaInadimplencia: string,
      valorInadimplente: number,
      valorAdimplente: number,
      qtDeParcelasInadimplente: number,
      statusDaVistoria: string,
      colorInadimplencia: string,
    },
    informations: Informations,
    coordinates: LatLong[],
  }
  interface Message {
    title: string,
    status: number,
  }
  interface FiltersQuota {
    towers: Array<string>,
    paviments: Array<string>,
    apartments: Array<string>,
    quotas: Array<string>,
    privateAreas: Array<string>,
    commonAreas: Array<string>,
    garages: Array<string>,
    bedrooms: Array<string>,
    weeks: Array<string>,
    views: Array<string>,
    digitalMirror: Array<DigitalMirror>,
  };
  interface FiltersAllotments {
    batchs: Array<string>,
    blocks: Array<string>,
    fronts: Array<number>,
    confrontationFronts: Array<string>,
    backgrounds: Array<number>,
    confrontationBackgrounds: Array<string>,
    lefts: Array<number>,
    confrontationLefts: Array<string>,
    rights: Array<number>,
    confrontationRights: Array<string>,
    bevels: Array<number>,
    registrations: Array<string>,
    enrollmentDates: Array<string>,
    digitalMirror: Array<DigitalMirrorAllotments>,
  };
  interface DigitalMirrorAllotments {
    batchs: string,
    blocks: string,
    status: number,
  }
  interface AllotmentsCollection {
    blocks: string,
    group: Array<DigitalMirrorAllotments> | undefined,
  }
  interface DigitalMirror {
    apartment: string,
    status: number,
    paviment: string,
  }
  interface QuotaCollection {
    tower: string,
    group: Array<DigitalMirror> | undefined,
  }
  //#endregion

  //#region Filter
    //#region Quota
    let reducedQuota: FiltersQuota | undefined = getIdentificador?.reduce((GroupedList: FiltersQuota, Unity: Object_.Identificador) => { 
      if (!GroupedList.towers.find((Item) => Item == Unity.informacoesGerais?.torre)) GroupedList.towers?.push(Unity?.informacoesGerais?.torre);
      if (!GroupedList.paviments.find((Item) => Item == Unity.informacoesGerais?.pavimento)) GroupedList.paviments?.push(Unity?.informacoesGerais?.pavimento);
      if (!GroupedList.apartments.find((Item) => Item == Unity.informacoesGerais?.apartamento)) GroupedList.apartments?.push(Unity?.informacoesGerais?.apartamento);
      if (!GroupedList.quotas.find((Item) => Item == Unity.informacoesGerais?.cota)) GroupedList.quotas?.push(Unity?.informacoesGerais?.cota);
      if (!GroupedList.privateAreas.find((Item) => Item == Unity.informacoesGerais?.areaPrivativa)) GroupedList.privateAreas?.push(Unity?.informacoesGerais?.areaPrivativa);
      if (!GroupedList.commonAreas.find((Item) => Item == Unity.informacoesGerais?.areaComum)) GroupedList.commonAreas?.push(Unity?.informacoesGerais?.areaComum)
      if (!GroupedList.garages.find((Item) => Item == Unity.informacoesGerais?.garagem)) GroupedList.garages?.push(Unity?.informacoesGerais?.garagem);
      if (!GroupedList.bedrooms.find((Item) => Item == Unity.informacoesGerais?.qtdeQuartos)) GroupedList.bedrooms?.push(Unity?.informacoesGerais?.qtdeQuartos);
      if (!GroupedList.weeks.find((Item) => Item == Unity.informacoesGerais?.qtdeSemanas)) GroupedList.weeks?.push(Unity?.informacoesGerais?.qtdeSemanas);
      if (!GroupedList.views.find((Item) => Item == Unity.informacoesGerais?.vista)) GroupedList.views?.push(Unity?.informacoesGerais?.vista);
      if (!GroupedList.digitalMirror.find((Item) =>  Item.paviment == `${Unity.informacoesGerais?.torre} - ${Unity.informacoesGerais?.pavimento}` && Item.apartment == Unity.informacoesGerais?.apartamento && Unity.informacoesGerais?.cota)) {
        GroupedList.digitalMirror?.push({
          paviment: `Torre:${Unity.informacoesGerais?.torre} - Pavimento: ${Unity.informacoesGerais?.pavimento}`,
          apartment: `${Unity?.informacoesGerais?.apartamento}/${Unity.informacoesGerais?.cota}`,
          status: Unity?.status,
        });
      }
      return GroupedList;
    }, {towers: [], paviments: [], apartments: [], quotas: [], privateAreas: [], commonAreas: [], garages: [], bedrooms: [], weeks: [], views: [], digitalMirror: []} as FiltersQuota);
    //#endregion

    //#region Allotments
    let reducedAllotments: FiltersAllotments | undefined = getIdentificador?.reduce((GroupedList: FiltersAllotments, Unity: Object_.Identificador) => { 
      if (!GroupedList.batchs.find((Item) => Item == Unity.informacoesGerais?.lote)) GroupedList.batchs?.push(Unity?.informacoesGerais?.lote);
      if (!GroupedList.blocks.find((Item) => Item == Unity.informacoesGerais?.quadra)) GroupedList.blocks?.push(Unity?.informacoesGerais?.quadra);
      if (!GroupedList.fronts.find((Item) => Item == Unity.informacoesGerais?.frente)) GroupedList.fronts?.push(Unity?.informacoesGerais?.frente);
      if (!GroupedList.confrontationFronts.find((Item) => Item == Unity.informacoesGerais?.confrontoFrente)) GroupedList.confrontationFronts?.push(Unity?.informacoesGerais?.confrontoFrente);
      if (!GroupedList.backgrounds.find((Item) => Item == Unity.informacoesGerais?.fundo)) GroupedList.backgrounds?.push(Unity?.informacoesGerais?.fundo);
      if (!GroupedList.confrontationBackgrounds.find((Item) => Item == Unity.informacoesGerais?.confrontoFundo)) GroupedList.confrontationBackgrounds?.push(Unity?.informacoesGerais?.confrontoFundo)
      if (!GroupedList.lefts.find((Item) => Item == Unity.informacoesGerais?.esquerda)) GroupedList.lefts?.push(Unity?.informacoesGerais?.esquerda);
      if (!GroupedList.confrontationLefts.find((Item) => Item == Unity.informacoesGerais?.confrontoEsquerdo)) GroupedList.confrontationLefts?.push(Unity?.informacoesGerais?.confrontoEsquerdo);
      if (!GroupedList.rights.find((Item) => Item == Unity.informacoesGerais?.direita)) GroupedList.rights?.push(Unity?.informacoesGerais?.direita);
      if (!GroupedList.confrontationRights.find((Item) => Item == Unity.informacoesGerais?.confrontoDireito)) GroupedList.confrontationRights?.push(Unity?.informacoesGerais?.confrontoDireito);
      if (!GroupedList.bevels.find((Item) => Item == Unity.informacoesGerais?.chanfro)) GroupedList.bevels?.push(Unity?.informacoesGerais?.chanfro);
      if (!GroupedList.registrations.find((Item) => Item == Unity.informacoesGerais?.matricula)) GroupedList.registrations?.push(Unity?.informacoesGerais?.matricula);
      if (!GroupedList.enrollmentDates.find((Item) => Item == Unity.informacoesGerais?.dataMatricula)) GroupedList.enrollmentDates?.push(Unity?.informacoesGerais?.dataMatricula);
      if (!GroupedList.digitalMirror.find((Item) => Item.blocks == Unity.informacoesGerais?.quadra && Item.batchs == Unity.informacoesGerais?.lote)) {
        GroupedList.digitalMirror?.push({
          batchs: Unity?.informacoesGerais?.lote,
          blocks: Unity?.informacoesGerais?.quadra,
          status: Unity?.status,
        });
      }
      return GroupedList;
    }, {batchs: [], blocks: [], fronts: [], confrontationFronts: [], backgrounds: [], confrontationBackgrounds: [], lefts: [], confrontationLefts: [], rights: [], confrontationRights: [], bevels: [], registrations: [], enrollmentDates:[], digitalMirror: []} as FiltersAllotments);
    //#endregion
  //#endregion

  //#region Function
  function AllotmentDigitalMirror() {
    let result = [...new Set(reducedAllotments?.digitalMirror.map(item => item.blocks))].map( block => {
      return {
        blocks: block,
        group: reducedAllotments?.digitalMirror.filter(item => item.blocks === block),
      }
    })
    setResultAllotments(result)
    setOriginalResultAllotments(result)
  }
  
  function QuotaDigitalMirror() {
    let result: any = [...new Set(reducedQuota?.digitalMirror.map(item => item.paviment))].map(paviment => {
      return {
        tower: paviment,
        group: reducedQuota?.digitalMirror.filter(item => item.paviment === paviment)
      }
    })
    setResultQuota(result)
    setOriginalResultQuota(result)
  }

  function Filter() {
    setFilterAvailable(getIdentificador?.filter(item => item.status === 0))
    setFilterSold(getIdentificador?.filter(item => item.status === 1))
    setFilterReserved(getIdentificador?.filter(item => item.status === 2))
  }

  function FilterBlockDigitalMirror(search: string) {
    let arr = JSON.parse(JSON.stringify(getOriginalResultAllotments))
    setResultAllotments(arr.filter((item: AllotmentsCollection) => item.blocks?.includes(search)))
  }

  function FilterTowerAndPavimentDigitalMirror(search: string) {
    let arr = JSON.parse(JSON.stringify(getOriginalResultQuota))
    setResultQuota(arr.filter((item: QuotaCollection) => item.tower?.includes(search)))
  }

  function UseEffectViewMore(item: number) {
    if(getViewMore === item) {
      setViewMore(getViewMore);
    }
  }

  function SearchAllotments(search: string) {
    let Filtered =  JSON.parse(JSON.stringify(getOriginalIdentificador));
    setIdentificador(Filtered.filter((data: any) => data.subLocal.descricao.includes(search.toUpperCase())));
  }
  
  function SearchEnterprises(search: string) {
    let Filtered =  JSON.parse(JSON.stringify(getOriginalCentroDeCusto));
    setCentroDeCusto(Filtered.filter((data: Object_.CentroDeCusto) => data.descricao.includes(search.toUpperCase())));
  }

  async function CentroDeCusto() {
    let Response = await Controllers.CentroDeCusto.Get(DataLogin?.token, SelectedCompany?.id, undefined, undefined)
    if (Math.floor(Response.status / 100) === 2) {
      setCentroDeCusto(Response.data)
      setOriginalCentroDeCusto(Response.data)
    } else {
      setMessage1("Erro!"); setMessage2("Não foi possível trazer o Centro de Custo!"); setShowToast(true)
    }
  }
  
  async function Identificador(item: Object_.CentroDeCusto | undefined) {
    setLoading(true);
    let Response = await Controllers.Identificador.Get(DataLogin?.token, SelectedCompany?.id, getStatus.join(","), undefined, item?.empresa.id, item?.sigla, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)
    if (Math.floor(Response.status / 100) === 2) {
      try {Socket?.close()} catch (err) {
        console.log('Socket close', err)
      }
      Socket = Controllers.Identificador.Socket(DataLogin?.token)
      Socket.onerror = (e) => {
        // console.log('onError', e);
      };
      Socket.onmessage = (event) => {
        const Response = JSON.parse(event.data) as Object_.Socket;
        setMessage1("Status da unidade alterado!"); setMessage2(`${Response.Mensagem}`); setShowToast(true)
      }
      console.log(Response.data);
      console.log(DataLogin?.token, SelectedCompany?.id, getStatus.join(","), undefined, item?.empresa.id, item?.sigla,);
      setIdentificador(Response.data);
      setOriginalIdentificador(Response.data);
      console.log(Response.data.map(item => item.status === 2))
      setIdentificadorReservation(Response.data.filter(item => item.status === 2));
      setLoading(false);
    } else {
      console.log(Response)
      setMessage1("Erro!"); setMessage2('Entre em contato com a equipe de desenvolvimento!'); setShowToast(true)
      setLoading(false);
    }
  }

  async function ReservarUnidade(item: Object_.Identificador) {
    let filterReservado = getIdentificador?.filter(item => item.status === 2);
    if (filterReservado && filterReservado.length < 3) {
      setModalLoading(true)
      let ArrayList = [item];
      let Response = await Controllers.Identificador.ReservarUnidades(DataLogin?.token, SelectedCompany?.id, undefined, undefined, ArrayList)
      if (Math.floor(Response.status / 100) === 2) {
        setMessage1("Sucesso!"); setMessage2("Reserva Realizada!"); setShowToast(true)
      } else {
        setMessage1("Erro!"); setMessage2("Não foi possível trazer o Centro de Custo!"); setShowToast(true)
      }
      let Message: Message = getMessage
      Message.status = Response.status
      Message.title = "Reserved"
      setMessage(getMessage)
      setReserved(true)
    } else {
      setMessage1("Limite de reservas"); setMessage2('Para reservar a 4º unidade você precisa abrir mão de uma das 3 reservas já feitas!'); setShowToast(true)
    }
  }

  async function DeletarReserva(item: Array<Object_.Identificador>) {
    setModalLoading(true)
    let Response = await Controllers.Identificador.DeletarReservas(DataLogin?.token, SelectedCompany?.id, item)
    let Message: Message = getMessage
    Message.status = Response.status
    Message.title = "Canceled"
    setMessage(getMessage)
    setDelete(true)
  }

  async function MapGet() {
    // if(DataLogin?.token === "NzAyNjEyMzExNDYkYzI5ekpHNWxkRE15") {
    //   let response = await Controllers.Map.ListaDeEmpreendimentos(DataLogin?.token, 0, "Rio")
    //   if (Math.floor(response.status / 100) === 2) {
    //     const item = response.data.empreendimentos[3]
    //     let responseMap = await Controllers.Map.GeoMap(DataLogin?.token, 0, item.empresa, item.sigla)
    //     if (Math.floor(responseMap.status / 100) === 2) {
    //       responseMap.data.center.reverse();
    //       let Response: Object_.Map = responseMap.data
    //       setMapOriginalList(Response);
    //       setOriginal(Response);
    //       let filterResponseDisponivelReservado = Response?.lista?.map(quadra => quadra.lotes.filter(item => item.dadosUau.status === 0 || item.dadosUau.status === 2));
    //       let arraySemVazios = filterResponseDisponivelReservado.filter(function (i) {return i.length > 0});
    //       let objectsLotes = arraySemVazios.reduce((Acumulado, Atual) => {
    //         Atual.forEach(item => {
    //           Acumulado.push(item);
    //         });
    //         return Acumulado;
    //       }, []);
    //       setPositionCenter(Response.center)
    //       setMapList(objectsLotes);
    //       setVisibleMap(true);
    //     }
    //   } else {
    //     setMessage1("Erro!"); setMessage2('Não foi possível trazer as informações do mapa!'); setShowToast(true)
    //     console.log('ERRO', response)
    //   }
    // } else {
      let response = await Controllers.Map.ListaDeEmpreendimentos(DataLogin?.token, SelectedCompany?.id, SelectedCompany?.descricao)
      if (Math.floor(response.status / 100) === 2) {
        const item = response.data.empreendimentos!?.filter(Item => Item!?.sigla == getSelectedCentroDeCusto!?.sigla)
        let responseMap = await Controllers.Map.GeoMap(DataLogin?.token, 0, item[0]!?.empresa, item[0]!?.sigla)
        if (Math.floor(responseMap.status / 100) === 2) {
          responseMap.data.center.reverse();
          let Response: Object_.Map = responseMap.data
          setMapOriginalList(Response)
          setOriginal(Response);
          let filterResponseDisponivelReservado = Response?.lista?.map(quadra => quadra?.lotes);
          let arraySemVazios = filterResponseDisponivelReservado;
          let objectsLotes = arraySemVazios?.reduce((Acumulado, Atual) => {
            Atual.forEach(item => {
              Acumulado.push(item);
            });
            return Acumulado;
          }, [])
          setMapList(objectsLotes);
          setVisiblePolygons(objectsLotes)
          setPositionCenter(Response.center)
          setVisibleMap(true);
        }
      // }
    }
  };

  // function handleRegionDidChange(visible: number[][]) {
  //   let visiblePolygons: Object_.Lotes[] = []
  //   let bbox: [number, number, number, number] = [visible[0][0], visible[0][1], visible[1][0], visible[1][1]]
  //   var visibleArea = turf.bboxPolygon(bbox)
  //   const rectangle = turf.polygon(visibleArea.geometry.coordinates)
  //   let isInside: boolean
  //   getMapList.map(item => item.coordinates.map(arrCoord => {
  //     const point = turf.point([arrCoord.latitude, arrCoord.longitude]);
  //     isInside = turf.booleanPointInPolygon(point, rectangle);
  //     if(isInside) visiblePolygons?.push(item)
  //   }))
  //   setVisiblePolygons(visiblePolygons)
  // };

  function Firstime() {
    setFirstTime(getFirstTime);
    if(getFirstTime == false) {
      CentroDeCusto();
      setVisibleModalEnterprises(true);
      setFirstTime(true);
    } else {
      setVisibleModalEnterprises(false);
      setFirstTime(true);
    }
  }
  
  function Toast() {
    setShowToast(false)
  }
  //#endregion


  //#region UseEffect
  useEffect(() => {
    setModalLoading(false);
    Firstime();
    if (getReserved === true && Math.floor(getMessage.status / 100) === 2 && getMessage.title === "Reserved") {
      setMessage1("Reserva!"); setMessage2('Reserva Realizada!'); setShowToast(true)
      setReserved(false)
    } else if (getReserved === true && Math.floor(getMessage.status / 100) !== 2 && getMessage.title === "Reserved") {
      setMessage1("Reserva!"); setMessage2('Reserva não Realizada!'); setShowToast(true)
      setReserved(false)
    }
    if (getDelete === true && Math.floor(getMessage.status / 100) === 2 && getMessage.title === "Canceled") {
      setMessage1("Reserva!"); setMessage2('Cancelamento Realizada!'); setShowToast(true)
      setDelete(false)
    } else if (getDelete === true && Math.floor(getMessage.status / 100) !== 2 && getMessage.title === "Canceled") {
      setMessage1("Reserva!"); setMessage2('Cancelamento não Realizada!'); setShowToast(true)
      setDelete(false)
    }
    if(getVisibleModalEnterprises === false) {
      getSelectedCentroDeCusto
    };
    if(getVisibleModalFilterAllotments === true) {
      getIdentificador
    }
  }, [getIdentificador]);
  //#endregion

  return (
    <KeyboardAvoidingView>
    <LinearGradient colors={['#26A77C', '#105B74']} style={{height:'100%'}}>
      <Styled.Container style={{marginTop: '15%'}}>
      <View style={{top: -10}}>
        <ToastMessage
          showToast={getShowToast}
          hideToast={setShowToast}
          function={Toast}
          message1={getMessage1}
          message2={getMessage2}
        />
      </View>
      <Pressable android_disableSound={true} onPress={Keyboard.dismiss}>
        <Styled.ContainerHeader style={{opacity: getShowToast ? 0 : 1}}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => {ViewModel.navigation.navigate('Menu')}}>
            <SvgCss xml={ArrowBack} />
          </TouchableOpacity>
          <Styled.TextHeader>Disponibilidade</Styled.TextHeader>
          <TouchableOpacity activeOpacity={0.9} onPress={() => {CentroDeCusto(); setVisibleModalEnterprises(true)}}>
            <SvgCss xml={FilterEnterprise} />
          </TouchableOpacity>
        </Styled.ContainerHeader>
        <Styled.CardContainer>
          <Styled.Card
            style={{height: Platform.OS === 'ios' ? '94%' : ResponsiveHeight('11%')}}
            activeOpacity={0.9} 
            onPress={() => {
              setVisibleEstoque(false); setVisibleReserva(true); setVisibleEspelhoDigital(false); setVisibleMap(false)
            }}>
            <Styled.TextDisponibility style={{color: getVisibleReserva ? '#86D66D' : '#FFFFFF', }}>Gestão de Reserva</Styled.TextDisponibility>
            <SvgCss xml={getVisibleReserva ? ReservaGreen : ReservaWhite } style={{alignSelf:'center', marginTop:'15%'}} />
          </Styled.Card>
          <Styled.Card 
            style={{height: Platform.OS === 'ios' ? '94%' : ResponsiveHeight('11%')}}
            activeOpacity={0.9}
            onPress={() => {
              setVisibleEstoque(true); setVisibleReserva(false); setVisibleEspelhoDigital(false); setVisibleMap(false)
            }}>
            <Styled.TextDisponibility style={{color: getVisibleEstoque ? '#86D66D' : '#FFFFFF' }}>Estoque</Styled.TextDisponibility>
            <SvgCss xml={getVisibleEstoque ? EstoqueGreen : EstoqueWhite} style={{alignSelf:'center', marginTop:'15%'}} />
          </Styled.Card>
          <Styled.Card 
            style={{height: Platform.OS === 'ios' ? '94%' : ResponsiveHeight('11%')}}
            activeOpacity={0.9}
            onPress={() => {
              if(getIdentificador?.find(i => i.informacoesGerais?.cota != null)) {
                QuotaDigitalMirror(); Filter(); setVisibleEstoque(false); setVisibleReserva(false); setVisibleEspelhoDigital(true); setVisibleMap(false)
              } else {
                AllotmentDigitalMirror(); Filter(); setVisibleEstoque(false); setVisibleReserva(false); setVisibleEspelhoDigital(true); setVisibleMap(false)
              }}}>
            <Styled.TextDisponibility style={{color: getVisibleEspelhoDigital ? '#86D66D' : '#FFFFFF' }}>Espelho     Digital</Styled.TextDisponibility>
            <SvgCss xml={getVisibleEspelhoDigital ? EspelhoDigitalGreen : EspelhoDigitalWhite} style={{alignSelf:'center', marginTop:'5%'}} />
          </Styled.Card>
          <Styled.Card 
            style={{height: Platform.OS === 'ios' ? '94%' : ResponsiveHeight('11%')}}
            activeOpacity={0.9} 
            onPress={async () => {
              setVisibleEstoque(false); setVisibleReserva(false); setVisibleEspelhoDigital(false); setVisibleLoadingMap(true); await MapGet();
            }}>
            <Styled.TextDisponibility style={{color: getVisibleMap ? '#86D66D' : '#FFFFFF' }}>Mapa</Styled.TextDisponibility>
            <SvgCss xml={getVisibleMap ? MapGreen : MapWhite} style={{alignSelf:'center', marginTop:'10%'}} width={50} height={50} />
          </Styled.Card>
          {getVisibleMap &&
          <Modal.Map
            MapGet={MapGet}
            getVisiblePolygons={getVisiblePolygons}
            // handleRegionDidChange={handleRegionDidChange}
            onPressClose={() => {setVisibleLoadingMap(false); setVisibleMap(false); setMapList([]); setPositionCenter([]); setMapOriginalList({} as Object_.Map); setVisibleEstoque(true)}}
            visible={getVisibleMap}
            getOriginal={getOriginal}
            getMapList={getMapList}
            setMapList={setMapList}
            getVisibleMap={getVisibleMap}
            getPositionCenter={getPositionCenter}
            setPositionCenter={setPositionCenter}
            getMapOriginalList={getMapOriginalList}
            getSelectedCentroDeCusto={getSelectedCentroDeCusto}
            setViewMore={setViewMore}
            getStatus={getStatus}
            setStatus={setStatus}
            getIdentificador={getIdentificador}
            setIdentificador={setIdentificador}
            getOriginalIdentificador={getOriginalIdentificador}
            reducedTower={reducedQuota?.towers}
            reducedPavement={reducedQuota?.paviments}
            reducedApartment={reducedQuota?.apartments}
            reducedQuota={reducedQuota?.quotas}
            reducedPrivateArea={reducedQuota?.privateAreas}
            reducedCommonArea={reducedQuota?.commonAreas}
            reducedGarage={reducedQuota?.garages}
            reducedBedroom={reducedQuota?.bedrooms}
            reducedWeek={reducedQuota?.weeks}
            reducedView={reducedQuota?.views}
            reducedBatch={reducedAllotments?.batchs}
            reducedBlock={reducedAllotments?.blocks}
            reducedFront={reducedAllotments?.fronts}
            reducedConfrontationFront={reducedAllotments?.confrontationFronts}
            reducedBackground={reducedAllotments?.backgrounds}
            reducedConfrontationBackground={reducedAllotments?.confrontationBackgrounds}
            reducedLeft={reducedAllotments?.lefts}
            reducedConfrontationLeft={reducedAllotments?.confrontationLefts}
            reducedRight={reducedAllotments?.rights}
            reducedConfrontationRight={reducedAllotments?.confrontationRights}
            reducedBevel={reducedAllotments?.bevels}
            reducedRegistration={reducedAllotments?.registrations}
            reducedEnrollmentDate={reducedAllotments?.enrollmentDates}
          />}
        </Styled.CardContainer>
          <Modal.FilterEnterprises
            loading={getLoading}
            visible={getVisibleModalEnterprises}
            visible2={getLoading}
            data={getCentroDeCusto}
            onChangeText={(event) => SearchEnterprises(event)}
            onPressClose={async () => {
              if (getIdentificador === undefined) {
                await setVisibleModalEnterprises(false);
                ViewModel.navigation.navigate('Menu');
              } else {
                setVisibleModalEnterprises(false);
              }}
            }
            renderItem={(item) =>
              <View>
                <Styled.EnterprisesFiltered 
                  activeOpacity={0.5} 
                  onPress={ async () => {setSelectedCentroDeCusto(item.item), await Identificador(item.item); setVisibleModalEnterprises(false); setVisibleEstoque(true)}}>
                    <Styled.TextEnterprises>{item.item.descricao}</Styled.TextEnterprises>
                </Styled.EnterprisesFiltered>
              </View>
            }
          />
        </Pressable>
        {getVisibleEstoque === true &&
          <Styled.ContainerEstoque>
            <Styled.TextTitle>Filtro</Styled.TextTitle>  
              <View style={{flexDirection:'row'}}>
                <Styled.FilterEstoque>
                  <Styled.InputSquare placeholder='Buscar Itens' placeholderTextColor={'#FFFFFF'} onChangeText={(event) => {SearchAllotments(event)}} />
                  <SvgCss xml={MagnifyingGlass} style={{marginLeft: '85%', position: 'absolute'}} />
                </Styled.FilterEstoque>
                <Styled.FilterAllotments activeOpacity={0.9} onPress={() => {setVisibleModalFilterAllotments(true)}}>
                  <SvgCss xml={_Filter} style={{marginTop: '15%'}} />
                </Styled.FilterAllotments>
              </View>
              <Modal.FilterAllotments
                getVisibleMap={getVisibleMap}
                getSelectedCentroDeCusto={getSelectedCentroDeCusto}
                setViewMore={setViewMore}
                setVisibleModalFilterAllotments={setVisibleModalFilterAllotments}
                getStatus={getStatus}
                setStatus={setStatus}
                visible={getVisibleModalFilterAllotments}
                onPressClose={() => {setVisibleModalFilterAllotments(false)}}
                getIdentificador={getIdentificador}
                setIdentificador={setIdentificador}
                getOriginalIdentificador={getOriginalIdentificador}
                reducedTower={reducedQuota?.towers}
                reducedPavement={reducedQuota?.paviments}
                reducedApartment={reducedQuota?.apartments}
                reducedQuota={reducedQuota?.quotas}
                reducedPrivateArea={reducedQuota?.privateAreas}
                reducedCommonArea={reducedQuota?.commonAreas}
                reducedGarage={reducedQuota?.garages}
                reducedBedroom={reducedQuota?.bedrooms}
                reducedWeek={reducedQuota?.weeks}
                reducedView={reducedQuota?.views}
                reducedBatch={reducedAllotments?.batchs}
                reducedBlock={reducedAllotments?.blocks}
                reducedFront={reducedAllotments?.fronts}
                reducedConfrontationFront={reducedAllotments?.confrontationFronts}
                reducedBackground={reducedAllotments?.backgrounds}
                reducedConfrontationBackground={reducedAllotments?.confrontationBackgrounds}
                reducedLeft={reducedAllotments?.lefts}
                reducedConfrontationLeft={reducedAllotments?.confrontationLefts}
                reducedRight={reducedAllotments?.rights}
                reducedConfrontationRight={reducedAllotments?.confrontationRights}
                reducedBevel={reducedAllotments?.bevels}
                reducedRegistration={reducedAllotments?.registrations}
                reducedEnrollmentDate={reducedAllotments?.enrollmentDates}
                key={1}
              />
            <Styled.TextTitle>Loteamentos</Styled.TextTitle>
            <Styled.AllotmentsContainer style={{marginBottom: 80}}>
              <FlatList
                refreshing={true}
                initialNumToRender={3}
                data={getIdentificador}
                extraData={setIdentificador}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) =>
                  <MotiView
                    transition={transition}
                    from={{height: getViewMore === item.subLocal?.id ? ResponsiveHeight('52%') : ResponsiveHeight('18%')}}
                    style={{
                      marginHorizontal: '3.5%',
                      borderRadius: 5,
                      borderWidth: 0.5,
                      borderColor: '#FFFFFF',
                      marginTop:'2%',
                    }}>
                    <LinearGradient colors={
                        item.status === 0 ? ["rgba(16, 91, 116, 0.6)", "rgba(126, 255, 86, 0.4126)"]
                      : item.status === 1 ? ["rgba(16, 91, 116, 0.6)", "rgba(255, 2, 0, 0.4126)"]
                      : item.status === 2 ? ["rgba(16, 91, 116, 0.6)", "rgba(253, 242, 48, 0.5)"]
                      : ["rgba(16, 91, 116, 0.6)", "#26A77C"]}
                      style={{height:'100%', borderRadius: 5}}>
                    <View style={{paddingTop:'2%'}}>
                      <View style={{flexDirection:'row', justifyContent: 'space-between', marginRight:'3%'}}>
                        <Styled.TextUnity style={{width:'90%'}}>Unidade: {item.subLocal?.descricao}</Styled.TextUnity>
                        <TouchableOpacity
                          style={{opacity: getViewMore === item.subLocal.id ? 0.4 : 1}}
                          onPress={() => {
                            if (getViewMore === item.subLocal.id) {
                              setViewMore(0);
                            } else {
                              setViewMore(item.subLocal.id);
                              UseEffectViewMore(item.subLocal?.id);
                            }
                          }}>
                          <SvgCss xml={EyeMore} />
                        </TouchableOpacity>
                      </View>
                      <Styled.TextUnity>M²: {item.area}</Styled.TextUnity>
                      <Styled.TextUnity style={{width:'100%'}}>Valor: {(item.valorAVista.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))}</Styled.TextUnity>
                      <Styled.TextUnity style={{width:'100%'}}>Status: {item.status === 0 ? 'Disponível' : item.status === 1 ? 'Vendido' : item.status === 2 ? 'Reservado': item.status === 3 ? 'Proposta' : item.status === 4 ? 'Quitado' : item.status === 5 ? 'Escriturado' : item.status === 6 ? 'Em venda' : item.status === 7 ? 'Suspenso' : item.status === 8 ? 'Fora de venda' : item.status === 9 ? 'Em acerto' : item.status === 10 ? 'Dação' : ""}</Styled.TextUnity>
                    </View>
                    <View>
                      { item.status === 0 ?
                      <Styled.WrapperButtons>
                      <Styled.ReservationButton
                          activeOpacity={0.9}
                          onPress={async () => {await ReservarUnidade(item); await Identificador(getSelectedCentroDeCusto)}}
                        >
                          <Modal.ModalLoading
                            transparent={true}
                            visible={getModalLoading}
                          />
                          <View style={{flexDirection:'row', alignSelf:'center'}}>
                            <SvgCss xml={Reservation} style={{marginRight:'8%'}} />
                            <Styled.TextTouchable>Reservar</Styled.TextTouchable>
                          </View>
                        </Styled.ReservationButton>
                        <Styled.Proposal 
                          activeOpacity={0.9} 
                          onPress={() =>{ViewModel.navigation.navigate("ScreenVendaDireta")}}
                        >
                          <View style={{flexDirection:'row', alignSelf:'center'}}>
                            <SvgCss xml={Proposal} style={{marginRight:'8%'}} />
                            <Styled.TextTouchable>Proposta</Styled.TextTouchable>
                          </View>
                      </Styled.Proposal>
                      </Styled.WrapperButtons>
                      : item.status === 2 ?
                      <Styled.WrapperButtons>
                        <Styled.Reservated
                          activeOpacity={0.9} 
                          onPress={async () => {let ArrayList = [item]; await DeletarReserva(ArrayList); await Identificador(getSelectedCentroDeCusto)}}>
                            <View style={{flexDirection:'row', alignSelf:'center'}}>
                              <SvgCss xml={Reservation} style={{marginRight:'8%'}} />
                              <Styled.TextTouchable style={{marginTop: '1%'}}>Cancelar Reserva</Styled.TextTouchable>
                            </View>
                        </Styled.Reservated>
                        <Styled.Proposal 
                          activeOpacity={0.9} 
                          onPress={() =>{
                          //   notify('info', {
                          //     params: {
                          //       description: 'Função em desenvolvimento.',
                          //       title:'INFORMAÇÃO!',
                          //     }
                          // })
                        }}
                        >
                          <View style={{flexDirection:'row', alignSelf:'center'}}>
                            <SvgCss xml={Proposal} style={{marginRight:'8%'}} />
                            <Styled.TextTouchable>Proposta</Styled.TextTouchable>
                          </View>
                        </Styled.Proposal>
                      </Styled.WrapperButtons>
                      : <View></View>
                      }
                    </View>
                    {getIdentificador?.find(i => i.informacoesGerais?.cota != null) ?
                      getViewMore === item.subLocal?.id ?
                      <Animated.View style={{marginTop:'5%'}}>
                        {item.informacoesGerais?.torre !== null && <Styled.TextUnity>Torre: {item.informacoesGerais.torre}</Styled.TextUnity>}
                        {item.informacoesGerais?.pavimento !== null && <Styled.TextUnity>Pavimento: {item.informacoesGerais.pavimento}</Styled.TextUnity>}
                        {item.informacoesGerais?.apartamento !== null && <Styled.TextUnity>Apartamento: {item.informacoesGerais.apartamento}</Styled.TextUnity>}
                        {item.informacoesGerais?.cota !== null && <Styled.TextUnity>Cota: {item.informacoesGerais.cota}</Styled.TextUnity>}
                        {item.informacoesGerais?.areaPrivativa !== null && <Styled.TextUnity>Área Privativa: {item.informacoesGerais.areaPrivativa}</Styled.TextUnity>}
                        {item.informacoesGerais?.garagem !== null && <Styled.TextUnity>Garagem: {item.informacoesGerais.garagem}</Styled.TextUnity>}
                        {item.informacoesGerais?.qtdeQuartos !== null && <Styled.TextUnity>Quantidade de Quartos: {item.informacoesGerais.qtdeQuartos}</Styled.TextUnity>}
                        {item.informacoesGerais?.qtdeSemanas !== null && <Styled.TextUnity>Quantidade de Semanas: {item.informacoesGerais.qtdeSemanas}</Styled.TextUnity>}
                        {item.informacoesGerais?.observacao !== null && <Styled.TextUnity>Observações: {item.informacoesGerais.observacao}</Styled.TextUnity>}
                        {item.informacoesGerais?.vista !== null && <Styled.TextUnity>Vista: {item.informacoesGerais.vista}</Styled.TextUnity>}
                      </Animated.View> :
                      <View></View> :
                      getViewMore === item.subLocal?.id ?
                      <Animated.View style={{marginTop:'5%'}}>
                        <Styled.TextUnity>Quadra: {item?.informacoesGerais?.quadra}</Styled.TextUnity>
                        {item.informacoesGerais?.lote !== null && <Styled.TextUnity>Lote: {item?.informacoesGerais?.lote}</Styled.TextUnity>}
                        {item.informacoesGerais?.esquerda !== null && <Styled.TextUnity>Esquerda: {item?.informacoesGerais?.esquerda}</Styled.TextUnity>}
                        {item.informacoesGerais?.confrontoEsquerdo !== null && <Styled.TextUnity>Confronto Esquerdo: {item?.informacoesGerais?.confrontoEsquerdo}</Styled.TextUnity>}
                        {item.informacoesGerais?.direita !== null && <Styled.TextUnity>Direita: {item?.informacoesGerais?.direita}</Styled.TextUnity>}
                        {item.informacoesGerais?.confrontoDireito !== null && <Styled.TextUnity>Confronto Direito: {item?.informacoesGerais?.confrontoDireito}</Styled.TextUnity>}
                        {item.informacoesGerais?.frente !== null && <Styled.TextUnity>Frente: {item?.informacoesGerais?.frente}</Styled.TextUnity>}
                        {item.informacoesGerais?.confrontoFrente !== null && <Styled.TextUnity>Confronto Fente: {item?.informacoesGerais?.confrontoFrente}</Styled.TextUnity>}
                        {item.informacoesGerais?.fundo !== null && <Styled.TextUnity>Fundo: {item?.informacoesGerais?.fundo}</Styled.TextUnity>}
                        {item.informacoesGerais?.confrontoFundo !== null && <Styled.TextUnity>Confronto Fundo: {item?.informacoesGerais?.confrontoFundo}</Styled.TextUnity>}
                        {item.informacoesGerais?.chanfro !== null && <Styled.TextUnity>Chanfro: {item?.informacoesGerais?.chanfro}</Styled.TextUnity>}
                        {item.informacoesGerais?.matricula !== null && <Styled.TextUnity>Matrícula: {item?.informacoesGerais?.matricula}</Styled.TextUnity>}
                        {item.informacoesGerais?.dataMatricula !== null && <Styled.TextUnity>Data Matrícula: {item?.informacoesGerais?.dataMatricula}</Styled.TextUnity>}
                      </Animated.View> : <View></View>
                    }
                    </LinearGradient>
                  </MotiView>
                }
              />
            </Styled.AllotmentsContainer>
          </Styled.ContainerEstoque>
        }
          <View>
            {getIdentificadorReservation && getVisibleReserva === true &&
            <Styled.ContainerReserva>
              <Styled.TextTitle>Reserva do Corretor</Styled.TextTitle>
              <FlatList
                refreshing={true}
                showsVerticalScrollIndicator={false}
                initialNumToRender={3}
                data={getIdentificadorReservation}
                extraData={setIdentificador}
                renderItem={({item}) => item.status === 2 ?
                  <Styled.RealtorReservation style={{height: Platform.OS === 'ios' ? ResponsiveHeight('18%') : ResponsiveHeight('20%') }}>
                    <LinearGradient colors={["rgba(16, 91, 116, 0.6)", "rgba(253, 242, 48, 0.5)"]} style={{height:'100%', borderRadius: 5}}>
                      <Styled.Profile>
                        <SvgCss xml={Profile} style={{top:10}} />
                      </Styled.Profile>
                      <Styled.TextUnity style={{marginTop:'-12%'}}>{item.subLocal?.descricao}</Styled.TextUnity>
                      <Styled.TextUnity style={{width:'100%'}}>Valor da Unidade: {(item.valorAVista.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))}</Styled.TextUnity>
                      <Styled.TextUnity>Expira dia {moment(item.dataDeExpiracao).format("DD/MM/YYYY")} às {moment(item.dataDeExpiracao).format("LT")}</Styled.TextUnity>
                      <Styled.TextUnity>Reservado dia {moment(item.dataDeCadastro).format("DD/MM/YYYY")}</Styled.TextUnity>
                      <Styled.WrapperButtons>
                        <Styled.Reservated
                          activeOpacity={0.9} 
                          onPress={async () => {let ArrayList = [item]; await DeletarReserva(ArrayList); await Identificador(getSelectedCentroDeCusto)}}>
                            <View style={{flexDirection:'row', alignSelf:'center'}}>
                              <SvgCss xml={Reservation} style={{marginRight: 5}} />
                              <Styled.TextTouchable>Cancelar Reserva</Styled.TextTouchable>
                            </View>
                        </Styled.Reservated>
                        <Styled.Proposal 
                          activeOpacity={0.9} 
                          onPress={() =>{
                            // notify('info', {
                            //   params: {
                            //     description: 'Função em desenvolvimento.',
                            //     title:'INFORMAÇÃO!',
                            //   }
                          // })
                        }}
                        >
                          <View style={{flexDirection:'row', alignSelf:'center'}}>
                            <SvgCss xml={Proposal} style={{marginRight:'8%'}} />
                            <Styled.TextTouchable>Proposta</Styled.TextTouchable>
                          </View>
                        </Styled.Proposal>
                      </Styled.WrapperButtons>
                    </LinearGradient>
                  </Styled.RealtorReservation>
                  : <View></View>
                } 
              />
            </Styled.ContainerReserva>
            }
          </View>
          {getVisibleEspelhoDigital === true &&
          <Styled.ContainerEspelhoDigital>
            <Styled.TextTitle>Espelho Digital</Styled.TextTitle>
            <Styled.LabelContainer>
            <View style={{flexDirection: 'row', height: '50%', width: '28%', alignItems:'center', paddingLeft: '2%'}}>
              <Styled.Label style={{backgroundColor: '#86D66D'}} />
              <Styled.TextLabel>Disponível {getFilterAvailable?.length}</Styled.TextLabel>
            </View>
            <View style={{flexDirection: 'row', height: '50%', width:'17%', alignItems:'center'}}>
              <Styled.Label style={{backgroundColor:'#D46060'}} />
              <Styled.TextLabel>Vendido {getFilterSold?.length}</Styled.TextLabel>
            </View>
            <View style={{flexDirection: 'row', height: '50%', width: '20%', alignItems:'center', marginRight: '4.5%'}}>
              <Styled.Label style={{backgroundColor: '#D6CD3A'}} />
              <Styled.TextLabel>Reservado {getFilterReserved?.length}</Styled.TextLabel>
            </View>
          </Styled.LabelContainer>
          <Styled.InputSquareContainer>
            <Styled.InputSquare placeholder={getIdentificador?.find(i => i.informacoesGerais?.cota != null) ? 'Buscar Pavimento ou Torre' : 'Buscar Quadra'} placeholderTextColor={'#FFFFFF'} onChangeText={search => getIdentificador?.find(i => i.informacoesGerais?.cota != null) ? FilterTowerAndPavimentDigitalMirror(search) : FilterBlockDigitalMirror(search)}/>
            <SvgCss xml={MagnifyingGlass} style={{marginLeft: '90%'}} />
          </Styled.InputSquareContainer>
                {getIdentificador?.find(i => i.informacoesGerais?.cota != null) ?
              <Styled.ContainerBlock>
                <FlatList
                  data={getResultQuota}
                  showsVerticalScrollIndicator={false}
                  initialNumToRender={2}
                  renderItem={({item}) =>
                    <Styled.Block>
                      <View style={{justifyContent:'space-between'}}>
                        <Styled.TextBlock>{item.tower}</Styled.TextBlock>
                        <Styled.ContainerSquare>
                          {item.group?.map(i =>
                            <Styled.Square style={{borderColor:
                              i.status === 0 ? '#86D66D'
                              : i.status === 1 ? '#D46060'
                              : i.status === 2 ? '#D6CD3A'
                              : undefined
                            }}>
                              <Styled.TextSquare>{i.apartment}</Styled.TextSquare>
                            </Styled.Square>
                          )}
                          </Styled.ContainerSquare>
                      </View>
                    </Styled.Block>
                  }
                /> 
                </Styled.ContainerBlock>:
              <Styled.ContainerBlock>
                <FlatList
                  data={getResultAllotments}
                  showsVerticalScrollIndicator={false}
                  initialNumToRender={2}
                  renderItem={({item}) =>
                  <Styled.Block>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                      <Styled.TextBlock>Quadra {item.blocks}</Styled.TextBlock>
                    </View>
                    <Styled.ContainerSquare>
                      {item.group?.map((i: DigitalMirrorAllotments) =>
                        <Styled.Square style={{borderColor:
                          i.status === 0 ? '#86D66D'
                          : i.status === 1 ? '#D46060'
                          : i.status === 2 ? '#D6CD3A'
                          : undefined
                        }}>
                          <Styled.TextSquare>{i.batchs}</Styled.TextSquare>
                        </Styled.Square>
                      )}
                    </Styled.ContainerSquare>
                  </Styled.Block>
                  }
                />
              </Styled.ContainerBlock>}
          </Styled.ContainerEspelhoDigital>
          }
        {getVisibleLoadingMap === true &&
          <View>
            <Styled.SubContainerText style={{textAlign: 'center', marginTop: '20%'}}>{`Aguarde, \nestamos trazendo \nas informações do mapa...`}</Styled.SubContainerText>
            <Styled.Loading style={{height: ResponsiveHeight('10%')}}>
              <Lottie source={LoadingInformations} resizeMode={'contain'} autoPlay loop />
            </Styled.Loading>
          </View>} 
      </Styled.Container>
    </LinearGradient>
    </KeyboardAvoidingView>
  );
}