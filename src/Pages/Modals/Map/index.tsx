//#region React
import React, {useState, useEffect} from 'react';
import {Modal, TouchableOpacity, Platform, Alert, View, Text, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import ModalDrop from 'react-native-modalbox';
//#endregion

//#region Icons
import {ArrowBack, _Map, VisualizationGPS, VisualizationSatellite, Confirmed, Location, Rectangle, Dollar} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Styled
import * as Styled from './styles';
import * as Modals from '../../Modals';
import { MapBox } from '../../../Components/Map';
//#endregion

//#region Services
import * as Controllers from '../../../Services/Controllers';
import * as TextFormat from '../../../Themes/TextFormat';
import {Object_} from '../../../Services/Objects';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
import MapboxGL from '@rnmapbox/maps';
import { LegendMap } from '../../../Components';
//#endregion

//#region Interface
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
};
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
//#endregion
interface Props {
  visible: boolean;
  onPressClose(): void;
  getMapList: Object_.Lotes[];
  setMapList: (value: Object_.Lotes[]) => void;
  getOriginal: Object_.Map;
  getPositionCenter: number[];
  setPositionCenter: (value: number[]) => void;
  getMapOriginalList: Object_.Map | undefined;
  getSelectedCentroDeCusto: Object_.CentroDeCusto | undefined;
  setViewMore: (value: number) => void;
  getStatus: string[];
  setStatus: (value: string[]) => void;
  getIdentificador: Object_.Identificador[] | undefined;
  setIdentificador: (value: Object_.Identificador[] | undefined) => void;
  getOriginalIdentificador: Object_.Identificador[] | undefined;
  reducedTower: string[] | undefined;
  reducedPavement: string[] | undefined ;
  reducedApartment: string[] | undefined ;
  reducedQuota: string[] | undefined ;
  reducedPrivateArea: string[] | undefined ;
  reducedCommonArea: string[] | undefined ;
  reducedGarage: string[] | undefined ;
  reducedBedroom: string[] | undefined ;
  reducedWeek: string[] | undefined ;
  reducedView: string[] | undefined ;
  reducedBatch: string[] | undefined ;
  reducedBlock: string[] | undefined ;
  reducedFront: number[] | undefined;
  reducedConfrontationFront: string[] | undefined;
  reducedBackground: number[] | undefined;
  reducedConfrontationBackground: string[] | undefined;
  reducedLeft: number[] | undefined;
  reducedConfrontationLeft: string[] | undefined;
  reducedRight: number[] | undefined;
  reducedConfrontationRight: string[] | undefined;
  reducedBevel: number[] | undefined;
  reducedRegistration: string[] | undefined;
  reducedEnrollmentDate: string[] | undefined;
  getVisibleMap: boolean;
  handleRegionDidChange(value: number[][]): void;
  MapGet(): void;
  getVisiblePolygons: Object_.Lotes[];
}

export const Map = (props: Props) => {
  const gps = "https://api.maptiler.com/maps/a77c0ac8-28f8-469e-9d32-8cef9fb73883/style.json?key=DHNboGxPRjwmYM0CExBY";
  const satellite = "https://api.maptiler.com/maps/hybrid/style.json?key=DHNboGxPRjwmYM0CExBY";
  const token = 'pk.eyJ1IjoiaXphY2MiLCJhIjoiY2sxejhyajR6MHZuZjNtbDJoZHNlbGNhNyJ9.pKPky_4hYzRs0GhzhVNunw';
  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);

  //#region useState
  const [getRegionVisible, setRegionVisible] = useState<number[][]>([]);
  const [getVisualizationMap, setVisualizationMap] = useState<string>("https://api.maptiler.com/maps/a77c0ac8-28f8-469e-9d32-8cef9fb73883/style.json?key=DHNboGxPRjwmYM0CExBY");
  const [getModalLegend, setModalLegend] = useState<boolean>(false);
  const [getModalInformationSelected, setModalInformationSelected] = useState<boolean>(false);
  const [getVisibleLegend, setVisibleLegend] = useState<boolean | undefined>(true);
  const [getVisibleVisualization, setVisibleVisualization] = useState<boolean>(false);
  const [getVisibleFilter, setVisibleFilter] = useState<boolean>(false);

  const [getRememberStatus, setRememberStatus] = useState<Array<string>>([]);
  const [getChangeStatus, setChangeStatus] = useState<boolean>(false);

  const [getAvailable, setAvailable] = useState<Object_.Lotes[]>([]);
  const [getSold, setSold] = useState<Object_.Lotes[]>([]);
  const [getReserved, setReserved] = useState<Object_.Lotes[]>([]);
  const [getProposal, setProposal] = useState<Object_.Lotes[]>([]);
  const [getSettled, setSettled] = useState<Object_.Lotes[]>([]);
  const [getCarrying, setCarrying] = useState<Object_.Lotes[]>([]);
  const [getOnSale, setOnSale] = useState<Object_.Lotes[]>([]);
  const [getSuspendedSale, setSuspendedSale] = useState<Object_.Lotes[]>([]);
  const [getOutOfSale, setOutOfSale] = useState<Object_.Lotes[]>([]);
  const [getInAgreement, setInAgreement] = useState<Object_.Lotes[]>([]);
  const [getReplacement, setReplacement] = useState<Object_.Lotes[]>([]);

  const [getSelectedLotes, setSelectedLotes] = useState<Object_.Lotes>();
  const [getLoading, setLoading] = useState<boolean>(false);
  //#endregion

  MapboxGL.setAccessToken(token);

  //#region functions
    async function ReservarUnidade() {
      setLoading(true);
      try {
        let Response = await Controllers.Identificador.Get(DataLogin?.token, SelectedCompany?.id, "0,1,2,3,4,5,6,7,8,9", undefined, undefined, undefined, undefined, undefined, undefined, undefined, getSelectedLotes?.dadosUau?.EmpresaVinculada, getSelectedLotes?.dadosUau?.CentroDeCustoVinculado, getSelectedLotes?.dadosUau?.LocalVinculado, getSelectedLotes?.dadosUau?.SublocalVinculado)
        if (Math.floor(Response.status / 100) === 2) {
          let ResponseReserva = await Controllers.Identificador.ReservarUnidades(DataLogin?.token, SelectedCompany?.id, undefined, undefined, Response.data)
          if (Math.floor(ResponseReserva.status / 100) === 2) {
            console.log('deu certo a reserva');
            props.MapGet()
            setLoading(false);
            setModalInformationSelected(false);
          } else {
            console.log('não deu certo a reserva');
          }
        } else {
          setLoading(false)
        }
      } catch(e) {
        console.log(e);
      }
    }

    function FilteredLists() {
      //#region Available
      let availableFilter = props.getOriginal?.lista?.map(quadra => quadra.lotes.filter(item => item.dadosUau.status == 0));
      let availableNoArr = availableFilter.filter(function (i) {return i.length > 0});
      let available = availableNoArr.reduce((Acumulado, Atual) => {
        Atual.forEach(item => {
          Acumulado.push(item);
        });
        return Acumulado;
      }, [])
      setAvailable(available);
      //#endregion

      //#region Sold
      let soldFilter = props.getOriginal?.lista?.map(quadra => quadra.lotes.filter(item => item.dadosUau.status == 1));
      let soldNoArr = soldFilter.filter(function (i) {return i.length > 0});
      let sold = soldNoArr.reduce((Acumulado, Atual) => {
        Atual.forEach(item => {
          Acumulado.push(item);
        });
        return Acumulado;
      }, [])
      setSold(sold)
      //#endregion

      //#region Reserved
      let reservedFilter = props.getOriginal?.lista?.map(quadra => quadra.lotes.filter(item => item.dadosUau.status == 2));
      let reservedNoArr = reservedFilter.filter(function (i) {return i.length > 0});
      let reserved = reservedNoArr.reduce((Acumulado, Atual) => {
        Atual.forEach(item => {
          Acumulado.push(item);
        });
        return Acumulado;
      }, [])
      setReserved(reserved)
      //#endregion

      //#region Proposal
      let proposalFilter = props.getOriginal?.lista?.map(quadra => quadra.lotes.filter(item => item.dadosUau.status == 3));
      let proposalNoArr = proposalFilter.filter(function (i) {return i.length > 0});
      let proposal = proposalNoArr.reduce((Acumulado, Atual) => {
        Atual.forEach(item => {
          Acumulado.push(item);
        });
        return Acumulado;
      }, [])
      setProposal(proposal)
      //#endregion
      
      //#region Settled
      let settledFilter = props.getOriginal?.lista?.map(quadra => quadra.lotes.filter(item => item.dadosUau.status == 4));
      let settledNoArr = settledFilter.filter(function (i) {return i.length > 0});
      let settled = settledNoArr.reduce((Acumulado, Atual) => {
        Atual.forEach(item => {
          Acumulado.push(item);
        });
        return Acumulado;
      }, [])
      setSettled(settled)
      //#endregion
      
      //#region Carrying
      let carryingFilter = props.getOriginal?.lista?.map(quadra => quadra.lotes.filter(item => item.dadosUau.status == 5));
      let carryingNoArr = carryingFilter.filter(function (i) {return i.length > 0});
      let carrying = carryingNoArr.reduce((Acumulado, Atual) => {
        Atual.forEach(item => {
          Acumulado.push(item);
        });
        return Acumulado;
      }, [])
      setCarrying(carrying)
      //#endregion
      
      //#region OnSale
      let onSaleFilter = props.getOriginal?.lista?.map(quadra => quadra.lotes.filter(item => item.dadosUau.status == 6));
      let onSaleNoArr = onSaleFilter.filter(function (i) {return i.length > 0});
      let onSale = onSaleNoArr.reduce((Acumulado, Atual) => {
        Atual.forEach(item => {
          Acumulado.push(item);
        });
        return Acumulado;
      }, [])
      setOnSale(onSale)
      //#endregion

      //#region SuspendedSale
      let suspendedSaleFilter = props.getOriginal?.lista?.map(quadra => quadra.lotes.filter(item => item.dadosUau.status == 7));
      let suspendedSaleNoArr = suspendedSaleFilter.filter(function (i) {return i.length > 0});
      let suspendedSale = suspendedSaleNoArr.reduce((Acumulado, Atual) => {
        Atual.forEach(item => {
          Acumulado.push(item);
        });
        return Acumulado;
      }, [])
      setSuspendedSale(suspendedSale)
      //#endregion
      
      //#region OutOfSale
      let outOfSaleFilter = props.getOriginal?.lista?.map(quadra => quadra.lotes.filter(item => item.dadosUau.status == 8));
      let outOfSaleNoArr = outOfSaleFilter.filter(function (i) {return i.length > 0});
      let outOfSale = outOfSaleNoArr.reduce((Acumulado, Atual) => {
        Atual.forEach(item => {
          Acumulado.push(item);
        });
        return Acumulado;
      }, [])
      setOutOfSale(outOfSale)
      //#endregion
      
      //#region InAgreement
      let inAgreementFilter = props.getOriginal?.lista?.map(quadra => quadra.lotes.filter(item => item.dadosUau.status == 9));
      let inAgreementNoArr = inAgreementFilter.filter(function (i) {return i.length > 0});
      let inAgreement = inAgreementNoArr.reduce((Acumulado, Atual) => {
        Atual.forEach(item => {
          Acumulado.push(item);
        });
        return Acumulado;
      }, [])
      setInAgreement(inAgreement)
      //#endregion
    
      //#region Replacement
      let replacementFilter = props.getOriginal?.lista?.map(quadra => quadra.lotes.filter(item => item.dadosUau.status == 10));
      let replacementNoArr = replacementFilter.filter(function (i) {return i.length > 0});
      let replacement = replacementNoArr.reduce((Acumulado, Atual) => {
        Atual.forEach(item => {
          Acumulado.push(item);
        });
        return Acumulado;
      }, [])
      setReplacement(replacement)
      //#endregion
    }
    
    //#region Allotments
      let reducedAllotments: FiltersAllotments | undefined = props.getMapList?.reduce((GroupedList: FiltersAllotments, Unity: Object_.Lotes) => { 
        // if (!GroupedList.batchs.find((Item) => Item == Unity.informations?.lote)) GroupedList.batchs?.push(Unity?.informations?.lote);
        // if (!GroupedList.blocks.find((Item) => Item == Unity.informations?.quadra)) GroupedList.blocks?.push(Unity?.informations?.quadra);
        // if (!GroupedList.fronts.find((Item) => Item == Unity.informations?.frente)) GroupedList.fronts?.push(Unity?.informations?.frente);
        // if (!GroupedList.confrontationFronts.find((Item) => Item == Unity.informations?.confrontoFrente)) GroupedList.confrontationFronts?.push(Unity?.informations?.confrontoFrente);
        // if (!GroupedList.backgrounds.find((Item) => Item == Unity.informations?.fundo)) GroupedList.backgrounds?.push(Unity?.informations?.fundo);
        // if (!GroupedList.confrontationBackgrounds.find((Item) => Item == Unity.informations?.confrontoFundo)) GroupedList.confrontationBackgrounds?.push(Unity?.informations?.confrontoFundo)
        // if (!GroupedList.lefts.find((Item) => Item == Unity.informations?.esquerda)) GroupedList.lefts?.push(Unity?.informations?.esquerda);
        // if (!GroupedList.confrontationLefts.find((Item) => Item == Unity.informations?.confrontoEsquerdo)) GroupedList.confrontationLefts?.push(Unity?.informations?.confrontoEsquerdo);
        // if (!GroupedList.rights.find((Item) => Item == Unity.informations?.direita)) GroupedList.rights?.push(Unity?.informations?.direita);
        // if (!GroupedList.confrontationRights.find((Item) => Item == Unity.informations?.confrontoDireito)) GroupedList.confrontationRights?.push(Unity?.informations?.confrontoDireito);
        // if (!GroupedList.bevels.find((Item) => Item == Unity.informations?.chanfro)) GroupedList.bevels?.push(Unity?.informations?.chanfro);
        // if (!GroupedList.registrations.find((Item) => Item == Unity.informations?.matricula)) GroupedList.registrations?.push(Unity?.informations?.matricula);
        // if (!GroupedList.enrollmentDates.find((Item) => Item == Unity.informations?.dataMatricula)) GroupedList.enrollmentDates?.push(Unity?.informations?.dataMatricula);
        return GroupedList;
      }, {batchs: [], blocks: [], fronts: [], confrontationFronts: [], backgrounds: [], confrontationBackgrounds: [], lefts: [], confrontationLefts: [], rights: [], confrontationRights: [], bevels: [], registrations: [], enrollmentDates:[]} as FiltersAllotments);
    //#endregion
  //#endregion

  useEffect(() => {
    FilteredLists();
  }, []);
                        
  return (
  <Modal animationType="slide" transparent={false} visible={props.visible}>
    <LinearGradient colors={['#26A77C', '#105B74']}>
      <Styled.Container>
        <Styled.ContainerHeader style={{marginTop: Platform.OS === 'ios' ? "15%" : "3%"}}>
          <TouchableOpacity activeOpacity={0.9} onPress={props.onPressClose}>
            <SvgCss xml={ArrowBack} />
          </TouchableOpacity>
          <Styled.TextHeader>Mapa</Styled.TextHeader>
          <Styled.Submit onPress={() => {setModalLegend(true); setVisibleLegend(true)}} activeOpacity={0.8}>
            <SvgCss xml={_Map}/>
          </Styled.Submit>
        </Styled.ContainerHeader>
        <View style={{width: '100%',height: '90%', borderRadius: 10, marginTop: '5%',borderWidth: 3,borderColor: '#FFFFFF', backgroundColor: '#D3D3D3'}}>
          <MapBox
            setSelectedLotes={setSelectedLotes}
            setRegionVisible={setRegionVisible}
            // handleRegionDidChange={props.handleRegionDidChange}
            getVisiblePolygons={props.getVisiblePolygons}
            getMapList={props.getMapList}
            getMapOriginalList={props.getMapOriginalList}
            getPositionCenter={props.getPositionCenter}
            getVisualizationMap={getVisualizationMap}
            setModalInformationSelected={setModalInformationSelected}
          />
        </View>
        <ModalDrop
          swipeToClose={false}
          style={{height: '50%', borderTopRightRadius: 40, borderTopLeftRadius: 40, backgroundColor: '#2A5B68', borderColor: '#FFFFFF', borderWidth: 1,}}
          position={"bottom"}
          isOpen={getModalLegend}
          animationDuration={200}
          onClosed={() => {setModalLegend(false)}}>
            <View>
              <View style={{flexDirection: 'row', marginTop: '5%', justifyContent: 'center'}}>
                <Styled.ButtonHeaderModal activeOpacity={0.8} onPress={() => {setVisibleLegend(true); setVisibleVisualization(false); setVisibleFilter(false);}} style={{borderColor: getVisibleLegend ? '#86D66D' : '#FFFFFF'}}>
                  <Styled.TextHeaderModal style={{color: getVisibleLegend ? '#86D66D' : '#FFFFFF'}}>Legenda</Styled.TextHeaderModal>
                </Styled.ButtonHeaderModal>
                <Styled.ButtonHeaderModal activeOpacity={0.8} onPress={() => {setVisibleLegend(false); setVisibleVisualization(true); setVisibleFilter(false);}} style={{borderColor: getVisibleVisualization ? '#86D66D' : '#FFFFFF'}}>
                  <Styled.TextHeaderModal style={{color: getVisibleVisualization ? '#86D66D' : '#FFFFFF'}}>Visualização</Styled.TextHeaderModal>
                </Styled.ButtonHeaderModal>
                <Styled.ButtonHeaderModal activeOpacity={0.8} onPress={() => {setVisibleLegend(false); setVisibleVisualization(false); setVisibleFilter(true);}} style={{borderColor: getVisibleFilter ? '#86D66D' : '#FFFFFF'}}>
                  <Styled.TextHeaderModal style={{color: getVisibleFilter ? '#86D66D' : '#FFFFFF'}}>Filtro</Styled.TextHeaderModal>
                </Styled.ButtonHeaderModal>
                {getVisibleFilter &&
                  <Modals.FilterAllotments
                    getRememberStatus={getRememberStatus}
                    setRememberStatus={setRememberStatus}
                    getChangeStatus={getChangeStatus}
                    setChangeStatus={setChangeStatus}
                    getRegionVisible={getRegionVisible}
                    getVisiblePolygons={props.getVisiblePolygons}
                    handleRegionDidChange={props.handleRegionDidChange}
                    setVisibleLegend={setVisibleLegend}
                    getOriginal={props.getOriginal}
                    getMapList={props.getMapList}
                    setMapList={props.setMapList}
                    getSelectedCentroDeCusto={props.getSelectedCentroDeCusto}
                    setViewMore={props.setViewMore}
                    setVisibleModalFilterAllotments={setVisibleFilter}
                    getVisibleMap={props.getVisibleMap}
                    getStatus={props.getStatus}
                    setStatus={props.setStatus}
                    visible={getVisibleFilter}
                    onPressClose={() => {setVisibleFilter(false); setVisibleLegend(true)}}
                    getIdentificador={props.getIdentificador}
                    setIdentificador={props.setIdentificador}
                    getOriginalIdentificador={props.getOriginalIdentificador}
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
                  />
                }
              </View>
              {getVisibleLegend &&
              <View style={{alignItems: 'center'}}>
                <LegendMap
                  getStatus={props.getStatus}
                  getAvailable={getAvailable}
                  getSold={getSold}
                  getReserved={getReserved}
                  getProposal={getProposal}
                  getSettled={getSettled}
                  getCarrying={getCarrying}
                  getOnSale={getOnSale}
                  getSuspendedSale={getSuspendedSale}
                  getOutOfSale={getOutOfSale}
                  getInAgreement={getInAgreement}
                  getReplacement={getReplacement}
                />
              </View>}
              {getVisibleVisualization && 
                <Styled.ContainerVisualization>
                  <TouchableOpacity activeOpacity={0.8} style={{backgroundColor: getVisualizationMap === gps ? '#234b56' : undefined, padding: '2%', borderRadius: 10}} onPress={() => {setVisualizationMap("https://api.maptiler.com/maps/a77c0ac8-28f8-469e-9d32-8cef9fb73883/style.json?key=DHNboGxPRjwmYM0CExBY")}}>
                    <SvgCss xml={VisualizationGPS} />
                    <Styled.TextTitleVisualization>GPS</Styled.TextTitleVisualization>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} style={{backgroundColor: getVisualizationMap === satellite ? '#234b56' : undefined, padding: '2%', borderRadius: 10}} onPress={() => {setVisualizationMap("https://api.maptiler.com/maps/hybrid/style.json?key=DHNboGxPRjwmYM0CExBY")}}>
                    <SvgCss xml={VisualizationSatellite} />
                    <Styled.TextTitleVisualization>Satélite</Styled.TextTitleVisualization>
                  </TouchableOpacity>
                </Styled.ContainerVisualization>}
            </View>
        </ModalDrop>
        <ModalDrop
          style={{height: '30%', borderRadius: 20, backgroundColor: '#2A5B68', borderColor: '#FFFFFF', borderWidth: 1, width: '95%', paddingTop: '5%'}}
          position={"center"}
          isOpen={getModalInformationSelected}
          animationDuration={200}
          onClosed={() => {setModalInformationSelected(false)}}
        >
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
              <SvgCss xml={Location}  />
              <Styled.TextDescriptionHeaderModal style={{marginLeft: '2%'}}>{`${getSelectedLotes?.dadosUau?.descricao}`}</Styled.TextDescriptionHeaderModal>
            </View>
            <Styled.ContainerInformation style={{marginTop: '5%'}}>
              <SvgCss xml={Rectangle} />
              <Styled.TextDescriptionTitle>Área: </Styled.TextDescriptionTitle>
              <Styled.TextDescription>{`${getSelectedLotes?.dadosUau?.area} m²`}</Styled.TextDescription>
            </Styled.ContainerInformation>
            <Styled.ContainerInformation>
              <SvgCss xml={Dollar} />
              <Styled.TextDescriptionTitle>Valor: </Styled.TextDescriptionTitle>
              <Styled.TextDescription>{`${TextFormat.Moeda.FormatarTexto(getSelectedLotes?.dadosUau?.valorAVista)}`}</Styled.TextDescription>
            </Styled.ContainerInformation>
            <Styled.ContainerInformation>
              <SvgCss xml={Confirmed} />
              <Styled.TextDescriptionTitle>Status: </Styled.TextDescriptionTitle>
              <Styled.TextDescription>{`${
                getSelectedLotes?.dadosUau.status == 0 ? "Disponível" :
                getSelectedLotes?.dadosUau.status == 1 ? "Vendido" :
                getSelectedLotes?.dadosUau.status == 2 ? "Reservado" :
                getSelectedLotes?.dadosUau.status == 3 ? "Proposta" :
                getSelectedLotes?.dadosUau.status == 4 ? "Quitado" :
                getSelectedLotes?.dadosUau.status == 5 ? "Escriturado" :
                getSelectedLotes?.dadosUau.status == 6 ? "Em Venda" :
                getSelectedLotes?.dadosUau.status == 7 ? "Suspenso venda" :
                getSelectedLotes?.dadosUau.status == 8 ? "Fora de venda" :
                getSelectedLotes?.dadosUau.status == 9 ? "Em acerto" :
                getSelectedLotes?.dadosUau.status == 10 ? "Dação" : ""
              }`}</Styled.TextDescription>
            </Styled.ContainerInformation>
            {getSelectedLotes?.dadosUau?.status == 0 &&
            <Styled.ContainerButtons>
              <Styled.SubmitCancelButton onPress={() => {setModalInformationSelected(false)}} activeOpacity={0.8}>
                <Styled.TextSubmit>Cancelar</Styled.TextSubmit>
              </Styled.SubmitCancelButton>
              <Styled.SubmitReservationButton onPress={() => {
                ReservarUnidade();
              }} activeOpacity={0.8}>
                <Styled.TextSubmit>Reservar</Styled.TextSubmit>
              </Styled.SubmitReservationButton>
            </Styled.ContainerButtons>}
          </View>
        </ModalDrop>
        <Modals.ModalLoading
          transparent={true}
          visible={getLoading}
        />
      </Styled.Container>
    </LinearGradient>
  </Modal>
  )
};