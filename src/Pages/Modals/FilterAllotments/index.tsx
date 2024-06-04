//#region React
import React, {memo, useState} from 'react';
import {Modal, TouchableOpacity, Platform, ScrollView, View} from 'react-native';
import PropTypes from 'prop-types';
//#endregion

//#region Styled
import * as Styled from './styles';
import * as List from '../../../Data/List';
import * as Modals from '../../Modals'
//#endregion

//#region Services
import api from '../../../Services/node';
import * as Controllers from '../../../Services/Controllers';
import { Object_ } from '../../../Services/Objects';
//#endregion

//#region Function
import { ResponsiveWidth } from '../../../Functions';
//#endregion

//#region Reduxs
import {useSelector} from 'react-redux';
//#endregion

//#region Icons
import {ArrowBack, _Filter} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
//#endregion

//#region Interfaces
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
interface Props {
  getSelectedCentroDeCusto: Object_.CentroDeCusto | undefined,
  setViewMore: (value: number) => void,
  setVisibleModalFilterAllotments: (value: boolean) => void,
  getStatus: string[],
  setStatus: (value: string[]) => void,
  visible: boolean,
  onPressClose(): void;
  getIdentificador: Object_.Identificador[] | undefined,
  setIdentificador: (value: Object_.Identificador[] | undefined) => void,
  getOriginalIdentificador: Object_.Identificador[] | undefined,
  reducedTower?: string[] | undefined;
  reducedPavement?: string[] | undefined;
  reducedApartment?: string[] | undefined;
  reducedQuota?: string[] | undefined;
  reducedPrivateArea?: string[] | undefined;
  reducedCommonArea?: string[] | undefined;
  reducedGarage?: string[] | undefined;
  reducedBedroom?: string[] | undefined;
  reducedWeek?: string[] | undefined;
  reducedView?: string[] | undefined;
  reducedBatch?: string[] | undefined;
  reducedBlock?: string[] | undefined;
  reducedFront?: number[] | undefined;
  reducedConfrontationFront?: string[] | undefined;
  reducedBackground?: number[] | undefined;
  reducedConfrontationBackground?: string[] | undefined;
  reducedLeft?: number[] | undefined;
  reducedConfrontationLeft?: string[] | undefined;
  reducedRight?: number[] | undefined;
  reducedConfrontationRight?: string[] | undefined;
  reducedBevel?: number[] | undefined;
  reducedRegistration?: string[] | undefined;
  reducedEnrollmentDate?: string[] | undefined;
  getVisibleMap: boolean | undefined,
  getMapList: Object_.Lotes[],
  setMapList: (value: Object_.Lotes[]) => void,
  getOriginal: Object_.Map,
  setVisibleLegend: (value: boolean) => void,
  handleRegionDidChange(value: number[][]): void;
  setChangeStatus:(value: boolean) => void;
  getChangeStatus: boolean;
  getRememberStatus: string[];
  setRememberStatus: (value: string[]) => void;
  getVisiblePolygons: Object_.Lotes[];
  getRegionVisible: number[][];
}
//#endregion

const FilterAllot = (props: Props) => {

  //#region useState
  const [getAllotments, setAllotments] = useState<Allotments>({} as Allotments);
  const [getQuota, setQuota] = useState<Quota>({} as Quota);
  const [getTowerPress, setTowerPress] = useState<Array<string>>();
  const [getPavementPress, setPavementPress] = useState<Array<string>>();
  const [getApartmentPress, setApartmentPress] = useState<Array<string>>();
  const [getQuotaPress, setQuotaPress] = useState<Array<string>>();
  const [getPrivateAreaPress, setPrivateAreaPress] = useState<Array<string>>();
  const [getCommonAreaPress, setCommonAreaPress] = useState<Array<string>>();
  const [getGaragePress, setGaragePress] = useState<Array<string>>();
  const [getBedroomPress, setBedroomPress] = useState<Array<string>>();
  const [getWeekPress, setWeekPress] = useState<Array<string>>();
  const [getViewPress, setViewPress] = useState<Array<string>>();
  const [getLoading, setLoading] = useState<boolean>(false);
  const [getBlockPress, setBlockPress] = useState<Array<string>>();
  const [getBatchPress, setBatchPress] = useState<Array<string>>();
  const [getFrontPress, setFrontPress] = useState<Array<number>>();
  const [getConfrontationFrontPress, setConfrontationFrontPress] = useState<Array<string>>();
  const [getBackgroundPress, setBackgroundPress] = useState<Array<number>>();
  const [getConfrontationBackgroundPress, setConfrontationBackgroundPress] = useState<Array<string>>();
  const [getLeftPress, setLeftPress] = useState<Array<number>>();
  const [getConfrontationLeftPress, setConfrontationLeftPress] = useState<Array<string>>();
  const [getRightPress, setRightPress] = useState<Array<number>>();
  const [getConfrontationRightPress, setConfrontationRightPress] = useState<Array<string>>();
  const [getBevelPress, setBevelPress] = useState<Array<number>>();
  const [getRegistrationPress, setRegistrationPress] = useState<Array<string>>();
  const [getEnrollmentDatePress, setEnrollmentDatePress] = useState<Array<string>>();
  

  //#endregion
  
  //#region Interface
  interface Allotments {
    status: Array<string>,
    batchs: Array<string> | undefined,
    blocks: Array<string> | undefined,
    fronts: Array<number> | undefined,
    confrontationFronts: Array<string> | undefined,
    backgrounds: Array<number> | undefined,
    confrontationBackgrounds: Array<string> | undefined,
    lefts: Array<number> | undefined,
    confrontationLefts: Array<string> | undefined,
    rights: Array<number> | undefined,
    confrontationRights: Array<string> | undefined,
    bevels: Array<number> | undefined,
    registrations: Array<string> | undefined,
    enrollmentDates: Array<string> | undefined,
  }
  interface Quota {
    status: Array<string> | undefined,
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
  }
  interface Status {
    id: string,
    status: string,
  }
  interface Company {
    cnaEs: null,
    cnpj: string,
    emails: null,
    endereco: null,
    enquadramentoTributario: null,
    id: number,
    ie: null,
    im: null,
    juntaComercial: null,
    nomeFantasia: string,
    razaoSocial: string,
    telefones: null
  }

  interface ReduxCompany {
    descricao: string,
    empresas: Array<Company>,
    id: number
  }
  //#endregion
  
  //#region Variables
  const StatusAllotments: Array<Status> = (List.Status);
  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: ReduxCompany = useSelector((state: any) => state.SelectedCompany);
  //#endregion

  //#region Function
  function CleanFilter() {
    props.setIdentificador(props.getOriginalIdentificador)
    setAllotments({} as Allotments);
    setQuota({} as Quota);
    props.setStatus([]);
    setTowerPress([]);
    setPavementPress([]);
    setApartmentPress([]);
    setQuotaPress([]);
    setPrivateAreaPress([]);
    setCommonAreaPress([]);
    setGaragePress([]);
    setBedroomPress([]);
    setWeekPress([]);
    setViewPress([]);
    setBlockPress([]);
    setBatchPress([]);
    setFrontPress([]);
    setConfrontationFrontPress([]);
    setBackgroundPress([]);
    setConfrontationBackgroundPress([]);
    setLeftPress([]);
    setConfrontationLeftPress([]);
    setRightPress([]);
    setConfrontationRightPress([]);
    setBevelPress([]);
    setRegistrationPress([]);
    setEnrollmentDatePress([]);
  }

  async function FilterAllotments(search: Allotments) {
    setLoading(true);
    props.setStatus(search.status)
    let Identificador: Object_.Identificador[] = [...props.getIdentificador || []];
    if(props.getVisibleMap === true) {
      if (DataLogin?.token === "NzAyNjEyMzExNDYkYzI5ekpHNWxkRE15") {
        let Response: Object_.Map = props.getOriginal
        let filterResponse = Response?.lista?.map(quadra => quadra.lotes.filter(item => props.getStatus?.includes(item.dadosUau.status.toString())));
        let arraySemVazios = filterResponse.filter(function (i) {return i.length > 0});
        let objectsLotes = arraySemVazios.reduce((Acumulado, Atual) => {
          Atual.forEach(item => {
            Acumulado.push(item);
          });
          return Acumulado;
        }, [])
        props.setMapList(objectsLotes);
        props.setVisibleLegend(true);
      } else {
        const Item = await api
          .get(`/Mapas/Empreendimentos?empresaMae=Rio`)
          .then(async response => await response.data.empreendimentos[3]);
        await api
        .get(`/allMaps?empresaMae=${Item.empresa}&obra=${Item.sigla}`)
        .then(async response => {
          response.data.center.reverse();
          let Response: Object_.Map = response.data
          let filterResponseDisponivelReservado = Response?.lista?.map(quadra => quadra.lotes.filter(item => props.getStatus?.includes(item.dadosUau.status.toString())));
          let arraySemVazios = filterResponseDisponivelReservado.filter(function (i) {return i.length > 0});
          let objectsLotes = arraySemVazios.reduce((Acumulado, Atual) => {
            Atual.forEach(item => {
              Acumulado.push(item);
            });
            return Acumulado;
          }, [])
            let ArrayMap = objectsLotes?.reduce((Accumulated: ArrayMap[], Current: Object_.Lotes) => {
              Identificador?.find(item => item?.subLocal?.descricao === Current?.dadosUau?.descricao ?
                Accumulated?.push({
                  lote: Current?.lote,
                  center: Current?.center,
                  dadosUau: Current?.dadosUau,
                  informations: item?.informacoesGerais,
                  coordinates: Current?.coordinates,
                }) : undefined)
              return Accumulated;
            }, [] as ArrayMap[]);
            if (search.blocks?.length) ArrayMap = ArrayMap?.filter((data: ArrayMap) => search?.blocks?.includes(data?.informations?.quadra));
            if (search.batchs?.length) ArrayMap = ArrayMap?.filter((data: ArrayMap) => search?.batchs?.includes(data?.informations?.lote));
            if (search.fronts?.length) ArrayMap = ArrayMap?.filter((data: ArrayMap) => search?.fronts?.includes(data?.informations?.frente));
            if (search.confrontationFronts?.length) ArrayMap = ArrayMap?.filter((data: ArrayMap) => search?.confrontationFronts?.includes(data?.informations?.confrontoFrente));
            if (search.backgrounds?.length) ArrayMap = ArrayMap?.filter((data: ArrayMap) => search?.backgrounds?.includes(data?.informations?.fundo));
            if (search.confrontationBackgrounds?.length) ArrayMap = ArrayMap?.filter((data: ArrayMap) => search?.confrontationBackgrounds?.includes(data?.informations?.confrontoFundo));
            if (search.lefts?.length) ArrayMap = ArrayMap?.filter((data: ArrayMap) => search?.lefts?.includes(data?.informations?.esquerda));
            if (search.confrontationLefts?.length) ArrayMap = ArrayMap?.filter((data: ArrayMap) => search?.confrontationLefts?.includes(data?.informations?.confrontoEsquerdo));
            if (search.rights?.length) ArrayMap = ArrayMap?.filter((data: ArrayMap) => search?.rights?.includes(data?.informations?.direita));
            if (search.confrontationRights?.length) ArrayMap = ArrayMap?.filter((data: ArrayMap) => search?.confrontationRights?.includes(data?.informations?.confrontoDireito));
            if (search.bevels?.length) ArrayMap = ArrayMap?.filter((data: ArrayMap) => search?.bevels?.includes(data?.informations?.chanfro));
            if (search.registrations?.length) ArrayMap = ArrayMap?.filter((data: ArrayMap) => search?.registrations?.includes(data?.informations?.matricula));
            if (search.enrollmentDates?.length) ArrayMap = ArrayMap?.filter((data: ArrayMap) => search?.enrollmentDates?.includes(data?.informations?.dataMatricula));
            props.setMapList(ArrayMap);
            props.setVisibleLegend(true);
            setLoading(false);
        });
      }
    } else {
      if(search.status?.length) {
        let Response = await Controllers.Identificador.Get(DataLogin?.token, SelectedCompany?.id, search.status.length > 1 ? search.status.join(",") : search.status.toString(), undefined, props.getSelectedCentroDeCusto?.empresa.id, props.getSelectedCentroDeCusto?.sigla, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,)
        if (Math.floor(Response.status / 100) === 2) {
          Identificador = Response.data;
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
      if (search.blocks?.length) Identificador = Identificador?.filter((data: Object_.Identificador) => search.blocks?.includes(data.informacoesGerais.quadra));
      if (search.batchs?.length) Identificador = Identificador?.filter((data: Object_.Identificador) => search.batchs?.includes(data.informacoesGerais.lote));
      if (search.fronts?.length) Identificador = Identificador?.filter((data: Object_.Identificador) => search.fronts?.includes(data.informacoesGerais.frente));
      if (search.confrontationFronts?.length) Identificador = Identificador?.filter((data: Object_.Identificador) => search.confrontationFronts?.includes(data.informacoesGerais.confrontoFrente));
      if (search.backgrounds?.length) Identificador = Identificador?.filter((data: Object_.Identificador) => search.backgrounds?.includes(data.informacoesGerais.fundo));
      if (search.confrontationBackgrounds?.length) Identificador = Identificador?.filter((data: Object_.Identificador) => search.confrontationBackgrounds?.includes(data.informacoesGerais.confrontoFundo));
      if (search.lefts?.length) Identificador = Identificador?.filter((data: Object_.Identificador) => search.lefts?.includes(data.informacoesGerais.esquerda));
      if (search.confrontationLefts?.length) Identificador = Identificador?.filter((data: Object_.Identificador) => search.confrontationLefts?.includes(data.informacoesGerais.confrontoEsquerdo));
      if (search.rights?.length) Identificador = Identificador?.filter((data: Object_.Identificador) => search.rights?.includes(data.informacoesGerais.direita));
      if (search.confrontationRights?.length) Identificador = Identificador?.filter((data: Object_.Identificador) => search.confrontationRights?.includes(data.informacoesGerais.confrontoDireito));
      if (search.bevels?.length) Identificador = Identificador?.filter((data: Object_.Identificador) => search.bevels?.includes(data.informacoesGerais.chanfro));
      if (search.registrations?.length) Identificador = Identificador?.filter((data: Object_.Identificador) => search.registrations?.includes(data.informacoesGerais.matricula));
      if (search.enrollmentDates?.length) Identificador = Identificador?.filter((data: Object_.Identificador) => search.enrollmentDates?.includes(data.informacoesGerais.dataMatricula));
      props.setIdentificador(Identificador);
    }
    setLoading(false);
    props.setVisibleModalFilterAllotments(false);
  }

  async function FilterQuota(search: Quota) {
    let Identificador = [...(props.getIdentificador || [])];
    if(search.status?.length) {
      setLoading(true);
      let Response = await Controllers.Identificador.Get(DataLogin?.token, SelectedCompany?.id, search.status.length > 1 ? search.status.join(",") : search.status.join(","), undefined, (props.getSelectedCentroDeCusto)?.empresa.id, props.getSelectedCentroDeCusto?.sigla, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,)
      if (Math.floor(Response.status / 100) === 2) {
        Identificador = Response.data;
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
    if (search.towers?.length) Identificador = Identificador.filter((data: Object_.Identificador) => search.towers?.includes(data.informacoesGerais.torre));
    if (search.paviments?.length) Identificador = Identificador.filter((data: Object_.Identificador) => search.paviments?.includes(data.informacoesGerais.pavimento));
    if (search.apartments?.length) Identificador = Identificador.filter((data: Object_.Identificador) => search.apartments?.includes(data.informacoesGerais.apartamento));
    if (search.quotas?.length) Identificador = Identificador.filter((data: Object_.Identificador) => search.quotas?.includes(data.informacoesGerais.cota));
    if (search.privateAreas?.length) Identificador = Identificador.filter((data: Object_.Identificador) => search.privateAreas?.includes(data.informacoesGerais.areaPrivativa));
    if (search.commonAreas?.length) Identificador = Identificador.filter((data: Object_.Identificador) => search.commonAreas?.includes(data.informacoesGerais.areaComum));
    if (search.garages?.length) Identificador = Identificador.filter((data: Object_.Identificador) => search.garages?.includes(data.informacoesGerais.garagem));
    if (search.bedrooms?.length) Identificador = Identificador.filter((data: Object_.Identificador) => search.bedrooms?.includes(data.informacoesGerais.qtdeQuartos));
    if (search.weeks?.length) Identificador = Identificador.filter((data: Object_.Identificador) => search.weeks?.includes(data.informacoesGerais.qtdeSemanas));
    if (search.views?.length) Identificador = Identificador.filter((data: Object_.Identificador) => search.views?.includes(data.informacoesGerais.vista));
    setLoading(false);
    props.setIdentificador(Identificador);
  }
  //#endregion

  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <Styled.Container>
        <Styled.ContainerHeader style={{marginTop: Platform.OS === "ios" ? '15%' : '5%'}}>
          <TouchableOpacity activeOpacity={0.7} onPress={props.onPressClose}>
            <SvgCss xml={ArrowBack} />
          </TouchableOpacity>
            <Styled.TextHeader>Filtro</Styled.TextHeader>
        </Styled.ContainerHeader>
        <Styled.CleanFilter style={{marginTop: Platform.OS === 'ios' ? '16.5%' : '6%'}} onPress={() => {CleanFilter()}} activeOpacity={0.9}>
          <Styled.TextClean>Limpar</Styled.TextClean>
        </Styled.CleanFilter>
        <Styled.Enterprise>
          <Styled.TextEnterprise>{props.getSelectedCentroDeCusto?.descricao}</Styled.TextEnterprise>
          <SvgCss xml={_Filter} style={{position: 'absolute', marginLeft:'85%'}} />
        </Styled.Enterprise>
          {props.getIdentificador?.find((item: Object_.Identificador) => item.informacoesGerais?.cota) ?
            <Styled.ContainerFilter>
              <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:'2%'}}>
              <View style={{marginLeft:'7%', marginRight:'1%'}}>
                  <Styled.TextInformationsFilter>Status</Styled.TextInformationsFilter>
                  <Styled.SquareContainer>
                    {StatusAllotments.map((info: Status) =>
                      <Styled.Square activeOpacity={0.7} onPress={() => {
                        let StatusPress = [...props.getStatus ?? []];
                        if (StatusPress?.includes(info.id)) {
                          StatusPress.splice(StatusPress.indexOf(info.id, 0), 1);
                          props.setStatus([...StatusPress ?? []]);
                          getQuota.status = ([...StatusPress ?? []])
                        }
                        else {
                          props.setStatus([...(props.getStatus ?? []), info.id]);
                          getQuota.status = ([...(props.getStatus ?? []), info.id])
                        }}} style={{borderColor: props.getStatus?.includes(info.id) ? '#86D66D' : '#FFFFFF', width: '30%', backgroundColor: props.getStatus?.includes(info.id) ? '#86D66D' : 'transparent'}}>
                        <Styled.TextSquare>{info.status}</Styled.TextSquare>
                      </Styled.Square>
                    )}
                  </Styled.SquareContainer>
                </View>
              {(props.reducedTower as Array<string>)?.filter((item) => item).length > 0 &&
                <View style={{marginLeft:'7%', marginRight:'1%'}}>
                  <Styled.TextInformationsFilter>Torre</Styled.TextInformationsFilter>
                  <Styled.SquareContainer>
                    {props.reducedTower?.map((info: string) =>
                    <Styled.Square activeOpacity={0.7} onPress={() => {
                      let TowerPress = [...getTowerPress ?? []];
                      if (TowerPress?.includes(info)) {
                        TowerPress.splice(TowerPress.indexOf(info, 0), 1);
                        setTowerPress([...TowerPress ?? []]);
                        getQuota.towers = ([...TowerPress ?? []]);
                      }
                      else {
                        setTowerPress([...(getTowerPress ?? []), info]);
                        getQuota.towers = ([...(getTowerPress ?? []), info]);
                      }}} style={{borderColor: getTowerPress?.includes(info) ? '#86D66D' : '#FFFFFF', width: ResponsiveWidth('19%'), backgroundColor: getTowerPress?.includes(info) ? '#86D66D' : 'transparent'}}>
                      <Styled.TextSquare>{info}</Styled.TextSquare>
                    </Styled.Square>
                    )}
                  </Styled.SquareContainer>
                </View>}
                {(props.reducedPavement as Array<string>)?.filter((item) => item).length > 0 &&
                <View style={{marginLeft:'7%', marginRight:'1%'}}>
                  <Styled.TextInformationsFilter>Pavimento</Styled.TextInformationsFilter>
                  <Styled.SquareContainer>
                    {props.reducedPavement?.map((info: string) =>
                    <Styled.Square activeOpacity={0.7} onPress={() => {
                      let PavementPress = [...getPavementPress ?? []];
                      if (PavementPress?.includes(info)) {
                        PavementPress.splice(PavementPress.indexOf(info, 0), 1);
                        setPavementPress([...PavementPress ?? []]);
                        getQuota.paviments = ([...PavementPress ?? []]);
                      }
                      else {
                        setPavementPress([...(getPavementPress ?? []), info]);
                        getQuota.paviments = ([...(getPavementPress ?? []), info]);
                      }}} style={{borderColor: getPavementPress?.includes(info) ? '#86D66D' : '#FFFFFF',width: ResponsiveWidth('11%'), backgroundColor: getPavementPress?.includes(info) ? '#86D66D' : 'transparent'}}>
                      <Styled.TextSquare>{info}</Styled.TextSquare>
                    </Styled.Square>
                    )}
                  </Styled.SquareContainer>
                </View>}
                {(props.reducedApartment as Array<string>)?.filter((item) => item).length > 0 &&
                <View style={{marginLeft:'7%', marginRight:'1%'}}>
                  <Styled.TextInformationsFilter>Apartamento</Styled.TextInformationsFilter>
                  <Styled.SquareContainer>
                    {props.reducedApartment?.map((info: string) =>
                    <Styled.Square activeOpacity={0.7} onPress={() => {
                      let ApartmentPress = [...getApartmentPress ?? []];
                      if (ApartmentPress?.includes(info)) {
                        ApartmentPress.splice(ApartmentPress.indexOf(info, 0), 1);
                        setApartmentPress([...ApartmentPress ?? []]);
                        getQuota.apartments = ([...ApartmentPress ?? []]);
                      }
                      else {
                        setApartmentPress([...(getApartmentPress ?? []), info]);
                        getQuota.apartments = ([...(getApartmentPress ?? []), info]);
                      }}} style={{borderColor: getApartmentPress?.includes(info) ? '#86D66D' : '#FFFFFF',width: ResponsiveWidth('11%'), backgroundColor: getApartmentPress?.includes(info) ? '#86D66D' : 'transparent'}}>
                      <Styled.TextSquare>{info}</Styled.TextSquare>
                    </Styled.Square>
                    )}
                  </Styled.SquareContainer>
                </View>}
                {(props.reducedQuota as Array<string>)?.filter((item) => item).length > 0 &&
                <View style={{marginLeft:'7%', marginRight:'1%'}}>
                  <Styled.TextInformationsFilter>Cota</Styled.TextInformationsFilter>
                  <Styled.SquareContainer>
                    {props.reducedQuota?.map((info: string) =>
                    <Styled.Square activeOpacity={0.7} onPress={() => {
                      let QuotaPress = [...getQuotaPress ?? []];
                      if (QuotaPress?.includes(info)) {
                        QuotaPress.splice(QuotaPress.indexOf(info, 0), 1);
                        setQuotaPress([...QuotaPress ?? []]);
                        getQuota.quotas = ([...QuotaPress ?? []]);
                      }
                      else {
                        setQuotaPress([...(getQuotaPress ?? []), info]);
                        getQuota.quotas = ([...(getQuotaPress ?? []), info]);
                      }}} style={{borderColor: getQuotaPress?.includes(info) ? '#86D66D' : '#FFFFFF',width: ResponsiveWidth('11%'), backgroundColor: getQuotaPress?.includes(info) ? '#86D66D' : 'transparent'}}>
                      <Styled.TextSquare>{info}</Styled.TextSquare>
                    </Styled.Square>
                    )}
                  </Styled.SquareContainer>
                </View>}
                {(props.reducedPrivateArea as Array<string>)?.filter((item) => item).length > 0 &&
                <View style={{marginLeft:'7%', marginRight:'1%'}}>
                  <Styled.TextInformationsFilter>Área Privativa</Styled.TextInformationsFilter>
                  <Styled.SquareContainer>
                    {props.reducedPrivateArea?.map((info: string) =>
                    <Styled.Square activeOpacity={0.7} onPress={() => {
                      let PrivateAreaPress = [...getPrivateAreaPress ?? []];
                      if (PrivateAreaPress?.includes(info)) {
                        PrivateAreaPress.splice(PrivateAreaPress.indexOf(info, 0), 1);
                        setPrivateAreaPress([...PrivateAreaPress ?? []]);
                        getQuota.privateAreas = ([...PrivateAreaPress ?? []]);
                      }
                      else {
                        setPrivateAreaPress([...(getPrivateAreaPress ?? []), info]);
                        getQuota.privateAreas = ([...(getPrivateAreaPress ?? []), info]);
                      }}} style={{borderColor: getPrivateAreaPress?.includes(info) ? '#86D66D' : '#FFFFFF',width: ResponsiveWidth('12%'), backgroundColor: getPrivateAreaPress?.includes(info) ? '#86D66D' : 'transparent'}}>
                      <Styled.TextSquare>{info}</Styled.TextSquare>
                    </Styled.Square>
                    )}
                  </Styled.SquareContainer>
                </View>}
                {SelectedCompany?.id === 10 && (props.reducedCommonArea as Array<string>)?.filter((item) => item).length > 0 ? undefined :
                <View style={{marginLeft:'7%', marginRight:'1%'}}>
                  <Styled.TextInformationsFilter>Área Comum</Styled.TextInformationsFilter>
                  <Styled.SquareContainer>
                    {props.reducedCommonArea?.map((info: string) =>
                    <Styled.Square activeOpacity={0.7} onPress={() => {
                      let CommonAreaPress = [...getCommonAreaPress ?? []];
                      if (CommonAreaPress?.includes(info)) {
                        CommonAreaPress.splice(CommonAreaPress.indexOf(info, 0), 1);
                        setCommonAreaPress([...CommonAreaPress ?? []]);
                        getQuota.commonAreas = ([...CommonAreaPress ?? []]);
                      }
                      else {
                        setCommonAreaPress([...(getCommonAreaPress ?? []), info]);
                        getQuota.commonAreas = ([...(getCommonAreaPress ?? []), info]);
                      }}} style={{borderColor: getCommonAreaPress?.includes(info) ? '#86D66D' : '#FFFFFF',width: ResponsiveWidth('11%'), backgroundColor: getCommonAreaPress?.includes(info) ? '#86D66D' : 'transparent'}}>
                      <Styled.TextSquare>{info}</Styled.TextSquare>
                    </Styled.Square>
                    )}
                  </Styled.SquareContainer>
                </View>}
                {(props.reducedGarage as Array<string>)?.filter((item) => item).length > 0 &&
                <View style={{marginLeft:'7%', marginRight:'1%'}}>
                  <Styled.TextInformationsFilter>Garagem</Styled.TextInformationsFilter>
                  <Styled.SquareContainer>
                    {props.reducedGarage?.map((info: string) =>
                    <Styled.Square activeOpacity={0.7} onPress={() => {
                      let GaragePress = [...getGaragePress ?? []];
                      if (GaragePress?.includes(info)) {
                        GaragePress.splice(GaragePress.indexOf(info, 0), 1);
                        setGaragePress([...GaragePress ?? []]);
                        getQuota.garages = ([...GaragePress ?? []]);
                      }
                      else {
                        setGaragePress([...(getGaragePress ?? []), info]);
                        getQuota.garages = ([...(getGaragePress ?? []), info]);
                      }}} style={{borderColor: getGaragePress?.includes(info) ? '#86D66D' : '#FFFFFF',width: ResponsiveWidth('11%'), backgroundColor: getGaragePress?.includes(info) ? '#86D66D' : 'transparent'}}>
                      <Styled.TextSquare>{info}</Styled.TextSquare>
                    </Styled.Square>
                    )}
                  </Styled.SquareContainer>
                </View>}
                {(props.reducedBedroom as Array<string>)?.filter((item) => item).length > 0 &&
                <View style={{marginLeft:'7%', marginRight:'1%'}}>
                  <Styled.TextInformationsFilter>Quantidade de Quartos</Styled.TextInformationsFilter>
                  <Styled.SquareContainer>
                    {props.reducedBedroom?.map((info: string) =>
                    <Styled.Square activeOpacity={0.7} onPress={() => {
                      let BedroomPress = [...getBedroomPress ?? []];
                      if (BedroomPress?.includes(info)) {
                        BedroomPress.splice(BedroomPress.indexOf(info, 0), 1);
                        setBedroomPress([...BedroomPress ?? []]);
                        getQuota.bedrooms = ([...BedroomPress ?? []]);
                      }
                      else {
                        setBedroomPress([...(getBedroomPress ?? []), info]);
                        getQuota.bedrooms = ([...(getBedroomPress ?? []), info]);
                      }}} style={{borderColor: getBedroomPress?.includes(info) ? '#86D66D' : '#FFFFFF',width: ResponsiveWidth('11%'), backgroundColor: getBedroomPress?.includes(info) ? '#86D66D' : 'transparent'}}>
                      <Styled.TextSquare>{info}</Styled.TextSquare>
                    </Styled.Square>
                    )}
                  </Styled.SquareContainer>
                </View>}
                {(props.reducedWeek as Array<string>)?.filter((item) => item).length > 0 &&
                <View style={{marginLeft:'7%', marginRight:'1%'}}>
                  <Styled.TextInformationsFilter>Quantidade de Semanas</Styled.TextInformationsFilter>
                  <Styled.SquareContainer>
                    {props.reducedWeek?.map((info: string) =>
                    <Styled.Square activeOpacity={0.7} onPress={() => {
                      let WeekPress = [...getWeekPress ?? []];
                      if (WeekPress?.includes(info)) {
                        WeekPress.splice(WeekPress.indexOf(info, 0), 1);
                        setWeekPress([...WeekPress ?? []]);
                        getQuota.weeks = ([...WeekPress ?? []]);
                      }
                      else {
                        setWeekPress([...(getWeekPress ?? []), info]);
                        getQuota.weeks = ([...(getWeekPress ?? []), info]);
                      }}} style={{borderColor: getWeekPress?.includes(info) ? '#86D66D' : '#FFFFFF',width: ResponsiveWidth('11%'), backgroundColor: getWeekPress?.includes(info) ? '#86D66D' : 'transparent'}}>
                      <Styled.TextSquare>{info}</Styled.TextSquare>
                    </Styled.Square>
                    )}
                  </Styled.SquareContainer>
                </View>}
                {SelectedCompany?.id === 10 && (props.reducedView as Array<string>)?.filter((item) => item).length > 0 ? undefined :
                <View style={{marginLeft:'7%', marginRight:'1%'}}>
                  <Styled.TextInformationsFilter>Vista</Styled.TextInformationsFilter>
                  <Styled.SquareContainer>
                    {props.reducedView?.map((info: string) =>
                    <Styled.Square activeOpacity={0.7} onPress={() => {
                      let ViewPress = [...getViewPress ?? []];
                      if (ViewPress?.includes(info)) {
                        ViewPress.splice(ViewPress.indexOf(info, 0), 1);
                        setViewPress([...ViewPress ?? []]);
                        getQuota.views = ([...ViewPress ?? []]);
                      }
                      else {
                        setViewPress([...(getViewPress ?? []), info]);
                        getQuota.views = ([...(getViewPress ?? []), info]);
                      }}} style={{borderColor: getViewPress?.includes(info) ? '#86D66D' : '#FFFFFF',width: ResponsiveWidth('19%'), backgroundColor: getViewPress?.includes(info) ? '#86D66D' : 'transparent'}}>
                      <Styled.TextSquare>{info}</Styled.TextSquare>
                    </Styled.Square>
                    )}
                  </Styled.SquareContainer>
                </View>}
              </ScrollView>
            </Styled.ContainerFilter> :
            <Styled.ContainerFilter>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginLeft:'7%', marginRight:'1%'}}>
                  <Styled.TextInformationsFilter>Status</Styled.TextInformationsFilter>
                  <Styled.SquareContainer>
                    {StatusAllotments.map((info: Status) =>
                      <Styled.Square activeOpacity={0.7} onPress={() => {
                        let StatusPress = [...props.getStatus ?? []];
                        if (StatusPress?.includes(info.id)) {
                          StatusPress.splice(StatusPress.indexOf(info.id, 0), 1);
                          props.setStatus([...StatusPress ?? []]);
                          getAllotments.status = ([...StatusPress ?? []])
                        }
                        else {
                          props.setStatus([...(props.getStatus ?? []), info.id]);
                          getAllotments.status = ([...(props.getStatus ?? []), info.id])
                        }}} style={{borderColor: props.getStatus?.map(String).includes(info.id) ? '#86D66D' : '#FFFFFF', width: '30%', backgroundColor: props.getStatus?.map(String).includes(info.id) ? '#86D66D' : 'transparent'}}>
                        <Styled.TextSquare>{info.status}</Styled.TextSquare>
                      </Styled.Square>
                    )}
                  </Styled.SquareContainer>
                </View>
              {(props.reducedBlock as Array<string>)?.filter((item) => item).length > 0 &&
                <View style={{marginLeft:'7%', marginRight:'1%'}}>
                  <Styled.TextInformationsFilter>Quadra</Styled.TextInformationsFilter>
                  <Styled.SquareContainer>
                  {props.reducedBlock?.map((info: string) =>
                  <Styled.Square activeOpacity={0.7} onPress={() => {
                    let BlockPress = [...getBlockPress ?? []];
                    if (BlockPress?.includes(info)) {
                      BlockPress.splice(BlockPress.indexOf(info, 0), 1);
                      setBlockPress([...BlockPress ?? []]);
                      getAllotments.blocks = [...BlockPress ?? []]
                    }
                    else {
                      setBlockPress([...(getBlockPress ?? []), info]);
                      getAllotments.blocks = [...(getBlockPress ?? []), info]
                    }}} style={{borderColor: getBlockPress?.includes(info) ? '#86D66D' : '#FFFFFF',width: ResponsiveWidth('19%'), backgroundColor: getBlockPress?.includes(info) ? '#86D66D' : 'transparent'}}>
                    <Styled.TextSquare>{info}</Styled.TextSquare>
                  </Styled.Square>
                  )}
                  </Styled.SquareContainer>
                </View>}
                {(props.reducedBatch as Array<string>)?.filter((item) => item).length > 0 &&
                <View style={{marginLeft:'7%', marginRight:'1%'}}>
                  <Styled.TextInformationsFilter>Lote</Styled.TextInformationsFilter>
                  <Styled.SquareContainer>
                    {props.reducedBatch?.map((info: string) =>
                    <Styled.Square activeOpacity={0.7} onPress={() => {
                      let BatchPress = [...getBatchPress ?? []];
                      if (BatchPress?.includes(info)) {
                        BatchPress.splice(BatchPress.indexOf(info, 0), 1);
                        setBatchPress([...BatchPress ?? []]);
                        getAllotments.batchs = [...BatchPress ?? []]  
                      }
                      else {
                        setBatchPress([...(getBatchPress ?? []), info]);
                        getAllotments.batchs = [...(getBatchPress ?? []), info]  
                      }}} style={{borderColor: getBatchPress?.includes(info) ? '#86D66D' : '#FFFFFF',width: ResponsiveWidth('19%'), backgroundColor: getBatchPress?.includes(info) ? '#86D66D' : 'transparent'}}>
                      <Styled.TextSquare>{info}</Styled.TextSquare>
                    </Styled.Square>
                    )}
                  </Styled.SquareContainer>
                </View>}
                {(props.reducedFront as Array<number>)?.filter((item) => item).length > 0 &&
                <View style={{marginLeft:'7%', marginRight:'1%'}}>
                  <Styled.TextInformationsFilter>Frente</Styled.TextInformationsFilter>
                  <Styled.SquareContainer>
                    {props.reducedFront?.map((info: number) =>
                    <Styled.Square activeOpacity={0.7} onPress={() => {
                      let FrontPress = [...getFrontPress ?? []];
                      if (FrontPress?.includes(info)) {
                        FrontPress.splice(FrontPress.indexOf(info, 0), 1);
                        setFrontPress([...FrontPress ?? []]);
                        getAllotments.fronts = [...FrontPress ?? []]
                      }
                      else {
                        setFrontPress([...(getFrontPress ?? []), info]);
                        getAllotments.fronts = [...(getFrontPress ?? []), info]  
                      }}} style={{borderColor: getFrontPress?.includes(info) ? '#86D66D' : '#FFFFFF',width: ResponsiveWidth('19%'), backgroundColor: getFrontPress?.includes(info) ? '#86D66D' : 'transparent'}}>
                      <Styled.TextSquare>{info}</Styled.TextSquare>
                    </Styled.Square>
                    )}
                  </Styled.SquareContainer>
                </View>}
                {(props.reducedConfrontationFront as Array<string>)?.filter((item) => item).length > 0 &&
                <View style={{marginLeft:'7%', marginRight:'1%'}}>
                  <Styled.TextInformationsFilter>Confronto Frente</Styled.TextInformationsFilter>
                  <Styled.SquareContainer>
                    {props.reducedConfrontationFront?.map((info: string) =>
                    <Styled.Square activeOpacity={0.7} onPress={() => {
                      let ConfrontationFrontPress = [...getConfrontationFrontPress ?? []];
                      if (ConfrontationFrontPress?.includes(info)) {
                        ConfrontationFrontPress.splice(ConfrontationFrontPress.indexOf(info, 0), 1);
                        setConfrontationFrontPress([...ConfrontationFrontPress ?? []]);
                        getAllotments.confrontationFronts = [...ConfrontationFrontPress ?? []]
                      }
                      else {
                        setConfrontationFrontPress([...(getConfrontationFrontPress ?? []), info]);
                        getAllotments.confrontationFronts = [...(getConfrontationFrontPress ?? []), info]  
                      }}} style={{borderColor: getConfrontationFrontPress?.includes(info) ? '#86D66D' : '#FFFFFF',width: ResponsiveWidth('19%'), backgroundColor: getConfrontationFrontPress?.includes(info) ? '#86D66D' : 'transparent'}}>
                      <Styled.TextSquare>{info}</Styled.TextSquare>
                    </Styled.Square>
                    )}
                  </Styled.SquareContainer>
                </View>}
                {(props.reducedBackground as Array<number>)?.filter((item) => item).length > 0 &&
                <View style={{marginLeft:'7%', marginRight:'1%'}}>
                  <Styled.TextInformationsFilter>Fundo</Styled.TextInformationsFilter>
                  <Styled.SquareContainer>
                    {props.reducedBackground?.map((info: number) =>
                    <Styled.Square activeOpacity={0.7} onPress={() => {
                      let BackgroundPress = [...getBackgroundPress ?? []];
                      if (BackgroundPress?.includes(info)) {
                        BackgroundPress.splice(BackgroundPress.indexOf(info, 0), 1);
                        setBackgroundPress([...BackgroundPress ?? []]);
                        getAllotments.backgrounds = [...BackgroundPress ?? []]
                      }
                      else {
                        setBackgroundPress([...(getBackgroundPress ?? []), info]);
                        getAllotments.backgrounds = [...(getBackgroundPress ?? []), info]  
                      }}} style={{borderColor: getBackgroundPress?.includes(info) ? '#86D66D' : '#FFFFFF',width: ResponsiveWidth('19%'), backgroundColor: getBackgroundPress?.includes(info) ? '#86D66D' : 'transparent'}}>
                      <Styled.TextSquare>{info}</Styled.TextSquare>
                    </Styled.Square>
                    )}
                  </Styled.SquareContainer>
                </View>}
                {(props.reducedConfrontationBackground as Array<string>)?.filter((item) => item).length > 0 &&
                <View style={{marginLeft:'7%', marginRight:'1%'}}>
                  <Styled.TextInformationsFilter>Confronto Fundo</Styled.TextInformationsFilter>
                  <Styled.SquareContainer>
                    {props.reducedConfrontationBackground?.map((info: string) =>
                    <Styled.Square activeOpacity={0.7} onPress={() => {
                      let ConfrontationBackgroundPress = [...getConfrontationBackgroundPress ?? []];
                      if (ConfrontationBackgroundPress?.includes(info)) {
                        ConfrontationBackgroundPress.splice(ConfrontationBackgroundPress.indexOf(info, 0), 1);
                        setConfrontationBackgroundPress([...ConfrontationBackgroundPress ?? []]);
                        getAllotments.confrontationBackgrounds = [...ConfrontationBackgroundPress ?? []]
                      }
                      else {
                        setConfrontationBackgroundPress([...(getConfrontationBackgroundPress ?? []), info]);
                        getAllotments.confrontationBackgrounds = [...(getConfrontationBackgroundPress ?? []), info]  
                      }}} style={{borderColor: getConfrontationBackgroundPress?.includes(info) ? '#86D66D' : '#FFFFFF',width: ResponsiveWidth('19%'), backgroundColor: getConfrontationBackgroundPress?.includes(info) ? '#86D66D' : 'transparent'}}>
                      <Styled.TextSquare>{info}</Styled.TextSquare>
                    </Styled.Square>
                    )}
                  </Styled.SquareContainer>
                </View>}
                {(props.reducedLeft as Array<number>)?.filter((item) => item).length > 0 &&
                <View style={{marginLeft:'7%', marginRight:'1%'}}>
                  <Styled.TextInformationsFilter>Esquerda</Styled.TextInformationsFilter>
                  <Styled.SquareContainer>
                    {props.reducedLeft?.map((info: number) =>
                    <Styled.Square activeOpacity={0.7} onPress={() => {
                      let LeftPress = [...getLeftPress ?? []];
                      if (LeftPress?.includes(info)) {
                        LeftPress.splice(LeftPress.indexOf(info, 0), 1);
                        setLeftPress([...LeftPress ?? []]);
                        getAllotments.lefts = [...LeftPress ?? []]
                      }
                      else {
                        setLeftPress([...(getLeftPress ?? []), info]);
                        getAllotments.lefts = [...(getLeftPress ?? []), info]  
                      }}} style={{borderColor: getLeftPress?.includes(info) ? '#86D66D' : '#FFFFFF',width: ResponsiveWidth('19%'), backgroundColor: getLeftPress?.includes(info) ? '#86D66D' : 'transparent'}}>
                      <Styled.TextSquare>{info}</Styled.TextSquare>
                    </Styled.Square>
                    )}
                  </Styled.SquareContainer>
                </View>}
                {(props.reducedConfrontationLeft as Array<string>)?.filter((item) => item).length > 0 &&
                <View style={{marginLeft:'7%', marginRight:'1%'}}>
                  <Styled.TextInformationsFilter>Confronto Esquerdo</Styled.TextInformationsFilter>
                  <Styled.SquareContainer>
                    {props.reducedConfrontationLeft?.map((info: string) =>
                    <Styled.Square activeOpacity={0.7} onPress={() => {
                      let ConfrontationLeftPress = [...getConfrontationLeftPress ?? []];
                      if (ConfrontationLeftPress?.includes(info)) {
                        ConfrontationLeftPress.splice(ConfrontationLeftPress.indexOf(info, 0), 1);
                        setConfrontationLeftPress([...ConfrontationLeftPress ?? []]);
                        getAllotments.confrontationLefts = [...ConfrontationLeftPress ?? []]
                      }
                      else {
                        setConfrontationLeftPress([...(getConfrontationLeftPress ?? []), info]);
                        getAllotments.confrontationLefts = [...(getConfrontationLeftPress ?? []), info]  
                      }}} style={{borderColor: getConfrontationLeftPress?.includes(info) ? '#86D66D' : '#FFFFFF',width: ResponsiveWidth('19%'), backgroundColor: getConfrontationLeftPress?.includes(info) ? '#86D66D' : 'transparent'}}>
                      <Styled.TextSquare>{info}</Styled.TextSquare>
                    </Styled.Square>
                    )}
                  </Styled.SquareContainer>
                </View>}
                {(props.reducedRight as Array<number>)?.filter((item) => item).length > 0 &&
                <View style={{marginLeft:'7%', marginRight:'1%'}}>
                  <Styled.TextInformationsFilter>Direita</Styled.TextInformationsFilter>
                  <Styled.SquareContainer>
                    {props.reducedRight?.map((info: number) =>
                    <Styled.Square activeOpacity={0.7} onPress={() => {
                      let RightPress = [...getRightPress ?? []];
                      if (RightPress?.includes(info)) {
                        RightPress.splice(RightPress.indexOf(info, 0), 1);
                        setRightPress([...RightPress ?? []]);
                        getAllotments.rights = [...RightPress ?? []]
                      }
                      else {
                        setRightPress([...(getRightPress ?? []), info]);
                        getAllotments.rights = [...(getRightPress ?? []), info]  
                      }}} style={{borderColor: getRightPress?.includes(info) ? '#86D66D' : '#FFFFFF',width: ResponsiveWidth('19%'), backgroundColor: getRightPress?.includes(info) ? '#86D66D' : 'transparent'}}>
                      <Styled.TextSquare>{info}</Styled.TextSquare>
                    </Styled.Square>
                    )}
                  </Styled.SquareContainer>
                </View>}
                {(props.reducedConfrontationRight as Array<string>)?.filter((item) => item).length > 0 &&
                  <View style={{marginLeft:'7%', marginRight:'1%'}}>
                  <Styled.TextInformationsFilter>Confronto Direito</Styled.TextInformationsFilter>
                  <Styled.SquareContainer>
                    {props.reducedConfrontationRight?.map((info: string) =>
                    <Styled.Square activeOpacity={0.7} onPress={() => {
                      let ConfrontationRightPress = [...getConfrontationRightPress ?? []];
                      if (ConfrontationRightPress?.includes(info)) {
                        ConfrontationRightPress.splice(ConfrontationRightPress.indexOf(info, 0), 1);
                        setConfrontationRightPress([...ConfrontationRightPress ?? []]);
                        getAllotments.confrontationRights = [...ConfrontationRightPress ?? []]
                      }
                      else {
                        setConfrontationRightPress([...(getConfrontationRightPress ?? []), info]);
                        getAllotments.confrontationRights = [...(getConfrontationRightPress ?? []), info]  
                      }}} style={{borderColor: getConfrontationRightPress?.includes(info) ? '#86D66D' : '#FFFFFF',width: ResponsiveWidth('19%'), backgroundColor: getConfrontationRightPress?.includes(info) ? '#86D66D' : 'transparent'}}>
                      <Styled.TextSquare>{info}</Styled.TextSquare>
                    </Styled.Square>
                    )}
                  </Styled.SquareContainer>
                </View>}
                {(props.reducedBevel as Array<number>)?.filter((item) => item).length > 0 &&
                <View style={{marginLeft:'7%', marginRight:'1%'}}>
                  <Styled.TextInformationsFilter>Chanfro</Styled.TextInformationsFilter>
                  <Styled.SquareContainer>
                  {props.reducedBevel?.map((info: number) =>
                  <Styled.Square activeOpacity={0.7} onPress={() => {
                    let BevelPress = [...getBevelPress ?? []];
                    if (BevelPress?.includes(info)) {
                      BevelPress.splice(BevelPress.indexOf(info, 0), 1);
                      setBevelPress([...BevelPress ?? []]);
                      getAllotments.bevels = [...BevelPress ?? []]
                    }
                    else {
                      setBevelPress([...(getBevelPress ?? []), info]);
                      getAllotments.bevels = [...(getBevelPress ?? []), info]  
                    }}} style={{borderColor: getBevelPress?.includes(info) ? '#86D66D' : '#FFFFFF',width: ResponsiveWidth('19%'), backgroundColor: getBevelPress?.includes(info) ? '#86D66D' : 'transparent'}}>
                    <Styled.TextSquare>{info}</Styled.TextSquare>
                  </Styled.Square>
                  )}
                  </Styled.SquareContainer>
                </View>}
                {(props.reducedRegistration as Array<string>)?.filter((item) => item).length > 0 &&
                <View style={{marginLeft:'7%', marginRight:'1%'}}>
                  <Styled.TextInformationsFilter>Matrícula</Styled.TextInformationsFilter>
                  <Styled.SquareContainer>
                  {props.reducedRegistration?.map((info: string) =>
                  <Styled.Square activeOpacity={0.7} onPress={() => {
                    let RegistrationPress = [...getRegistrationPress ?? []];
                    if (RegistrationPress?.includes(info)) {
                      RegistrationPress.splice(RegistrationPress.indexOf(info, 0), 1);
                      setRegistrationPress([...RegistrationPress ?? []]);
                      getAllotments.registrations = [...RegistrationPress ?? []]
                    }
                    else {
                      setRegistrationPress([...(getRegistrationPress ?? []), info]);
                      getAllotments.registrations = [...(getRegistrationPress ?? []), info]  
                    }}} style={{borderColor: getRegistrationPress?.includes(info) ? '#86D66D' : '#FFFFFF',width: ResponsiveWidth('19%'), backgroundColor: getRegistrationPress?.includes(info) ? '#86D66D' : 'transparent'}}>
                    <Styled.TextSquare>{info}</Styled.TextSquare>
                  </Styled.Square>
                  )}
                </Styled.SquareContainer>
              </View>}
                {(props.reducedEnrollmentDate as Array<string>)?.filter((item) => item).length > 0 &&
                <View style={{marginLeft:'7%', marginRight:'1%'}}>
                  <Styled.TextInformationsFilter>Data da Matrícula</Styled.TextInformationsFilter>
                  <Styled.SquareContainer>
                  {props.reducedEnrollmentDate?.map((info: string) =>
                  <Styled.Square activeOpacity={0.7} onPress={() => {
                    let EnrollmentDatePress = [...getEnrollmentDatePress ?? []];
                    if (EnrollmentDatePress?.includes(info)) {
                      EnrollmentDatePress.splice(EnrollmentDatePress.indexOf(info, 0), 1);
                      setEnrollmentDatePress([...EnrollmentDatePress ?? []]);
                      getAllotments.enrollmentDates = [...EnrollmentDatePress ?? []]
                    }
                    else {
                      setEnrollmentDatePress([...(getEnrollmentDatePress ?? []), info]);
                      getAllotments.enrollmentDates = [...(getEnrollmentDatePress ?? []), info]  
                    } }} style={{borderColor: getEnrollmentDatePress?.includes(info) ? '#86D66D' : '#FFFFFF',width: ResponsiveWidth('19%'), backgroundColor: getEnrollmentDatePress?.includes(info) ? '#86D66D' : 'transparent'}}>
                    <Styled.TextSquare>{info}</Styled.TextSquare>
                  </Styled.Square>
                  )}
                  </Styled.SquareContainer>
                </View>}
              </ScrollView>
            </Styled.ContainerFilter>}
          <Styled.Submit activeOpacity={0.9} onPress={async () => {
            if(props.getIdentificador?.find((item: Object_.Identificador) => item.informacoesGerais?.cota)) {
              await FilterQuota(getQuota);
              props.setVisibleModalFilterAllotments(false);
              props.setViewMore(0);
            } else if(props.getVisibleMap) {
              props.setChangeStatus(true)
              await FilterAllotments(getAllotments);
              props.handleRegionDidChange(props.getRegionVisible)
            } else if(props.getVisibleMap == false) {
              await FilterAllotments(getAllotments);
              props.setViewMore(0);
            }
          }}>
            <Styled.TextSubmit>Filtrar</Styled.TextSubmit>
          </Styled.Submit>
        </Styled.Container>
      </LinearGradient>
      <Modals.ModalLoading visible={getLoading} transparent={true} />
    </Modal>
  );
};

export const FilterAllotments = memo(FilterAllot);

