//#region React
import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import {
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  Platform,
  ScrollView,
  Image,
  SafeAreaView,
  PermissionsAndroid,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br'
//#endregion

//#region Functions
import {ResponsiveWidth, ResponsiveHeight} from '../../../Functions';
import * as TextFormat from '../../../Themes/TextFormat';
//#endregion

//#region Services
import * as Controllers from '../../../Services/Controllers';
import { Object_ } from '../../../Services/Objects';
//#endregion

//#region Icons
import {ArrowBack, Camera, Cloud, Clean, Triangle, Picture, CancelAnnex, Home, ArrowGoButton, pdf} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Redux
import { useSelector } from 'react-redux';
//#endregion

//#region Styled
import { Type } from '../PaymentPlan/Modals/viewModel';
import * as Styled from './styles';
import * as Modals from '../index';
import { ToastMessage, Switch, Input, TouchInput, Annex } from '../../../Components';
import * as List from '../../../Data/List';
import { Comission } from '../../Catalog/Menu/PagesMenu/VendaDireta';
//#endregion

//#region Externals Directorys
import axios from 'axios'
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';
import {CameraOptions, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker'
import RNFetchBlob from 'rn-fetch-blob';
//#endregion
interface UF {
  states: string,
  initials: string,
}
interface Value {
  commissioned: {
    cpf: string | undefined;
   descricao: string | undefined;
  };
  salaDeVendas: string | undefined;
  title: string | undefined;
}
interface ComissionedGav {
  value: Value | undefined
}
interface Props {
  getCaptureLocation:Object_.LocalDeCaptacao[];
  setCaptureLocation: Dispatch<SetStateAction<Object_.LocalDeCaptacao[]>>;
  getPurchasePurpose: Object_.FinalidadesDeCompra[];
  setPurchasePurpose: Dispatch<SetStateAction<Object_.FinalidadesDeCompra[]>>;
  getAjustarSaldoAoValorAVista: boolean;
  setAjustarSaldoAoValorAVista: Dispatch<SetStateAction<boolean>>;
  getComissionControl: Comission;
  setComissionControl: Dispatch<SetStateAction<Comission>>;
  getModelosDeVenda: string[];
  setModelosDeVenda: Dispatch<SetStateAction<string[]>>;
  getSalesRooms: Array<{ salaDeVendas: Object_.SalaDeVenda, comissionados: Array<Object_.Comissionado> }>;
  setSalesRooms: Dispatch<SetStateAction<Array<{ salaDeVendas: Object_.SalaDeVenda, comissionados: Array<Object_.Comissionado> }>>>;
  goHome(): void;
  getTaxaDeDescontoValorAVista: number | undefined;
  setTaxaDeDescontoValorAVista: Dispatch<SetStateAction<number | undefined>>;
  visible: boolean;
  getDocumentChecklist: string;
  setDocumentChecklist: Dispatch<SetStateAction<string>>;
  getPDForImageChecklist: number | undefined;
  setPDForImageChecklist: Dispatch<SetStateAction<number | undefined>>;
  onPress(): void,
  getVisibleProponent: boolean;
  setVisibleProponent: Dispatch<SetStateAction<boolean>>;
  getIndexProspects: number,
  setIndexProspects: (value: number) => void,
  getProspectsList: Object_.Prospect[],
  setProspectsList: (value: Object_.Prospect[]) => void,
  getDependentsList: Object_.Dependente[],
  setDependentsList: (value: Object_.Dependente[]) => void,
  onPressBack(): void,
  getCellPhone: Object_.Telefone | undefined,
  setCellPhone: (value: Object_.Telefone | undefined) => void,
  getComercialPhone: Object_.Telefone | undefined,
  setComercialPhone: (value: Object_.Telefone | undefined) => void,
  getCellPhoneSpouse: Object_.Telefone | undefined,
  setCellPhoneSpouse: (value: Object_.Telefone | undefined) => void,
  getComercialPhoneSpouse: Object_.Telefone | undefined,
  setComercialPhoneSpouse: (value: Object_.Telefone | undefined) => void,
  setSelectedPaymentMethod: (value: Object_.MeioDePagamento | undefined) => void,
  getSelectedPaymentMethod: Object_.MeioDePagamento | undefined,
  getTitulosDeIntermediacao: Type.ViewModel;
  setTitulosDeIntermediacao: Dispatch<SetStateAction<Type.ViewModel>>;
  getTitulosDeIntermediaria: Type.ViewModel;
  setTitulosDeIntermediaria: Dispatch<SetStateAction<Type.ViewModel>>;
  getTitulosDeEntrada: Type.ViewModel,
  setTitulosDeEntrada: Dispatch<SetStateAction<Type.ViewModel>>,
  getTitulosDeSinal:  Type.ViewModel,
  setTitulosDeSinal: Dispatch<SetStateAction<Type.ViewModel>>,
  getTitulosDeSaldo:  Type.ViewModel,
  setTitulosDeSaldo: Dispatch<SetStateAction<Type.ViewModel>>,
  getValorDescontadoTituloIntermediacao: number;
  setValorDescontadoTituloIntermediacao: Dispatch<SetStateAction<number>>;
  getValorDescontadoTituloEntrada: number;
  setValorDescontadoTituloEntrada: Dispatch<SetStateAction<number>>;
  getValorDescontadoTituloIntermediaria: number;
  setValorDescontadoTituloIntermediaria: Dispatch<SetStateAction<number>>;
  getValorDescontadoTituloSaldo: number;
  setValorDescontadoTituloSaldo: Dispatch<SetStateAction<number>>;
  getValorDescontadoTituloSinal: number;
  setValorDescontadoTituloSinal: Dispatch<SetStateAction<number>>;
  getObjectIdentificador: Object_.IdentificadorSintetico | undefined,
  setObjectIdentificador: (value: Object_.IdentificadorSintetico | undefined) => void,
  getIdentificador: Object_.Identificador[] | undefined,
  setIdentificador: (value: Object_.Identificador[] | undefined) => void,
  getCentroDeCusto: Object_.CentroDeCusto[] | undefined,
  setCentroDeCusto: (value: Object_.CentroDeCusto[] | undefined) => void,
  getSelectedUnity: Object_.IdentificadorSintetico | undefined,
  setSelectedUnity: (value: Object_.IdentificadorSintetico | undefined) => void,
  getSelectedCentroDeCusto: Object_.CentroDeCusto | undefined
  setSelectedCentroDeCusto: (value: Object_.CentroDeCusto | undefined) => void,
  getSalesTableOriginal: Object_.TabelaDeVenda | undefined,
  setSalesTableOriginal: (value: Object_.TabelaDeVenda | undefined) => void,
  getSelectedSalesModel: string | undefined,
  setSelectedSalesModel: Dispatch<SetStateAction<string | undefined>>
  setSaleRoom: Dispatch<SetStateAction<Object_.SalaDeVenda | undefined>>,
  setCommissioned: Dispatch<SetStateAction<Object_.Comissionado[]>>,
  getCommissioned: Object_.Comissionado[],
  getSaleRoom: Object_.SalaDeVenda | undefined,
  scrollRef: any,
  getCommissionedGAV: ComissionedGav[] | undefined;
  setCommissionedGAV: Dispatch<SetStateAction<ComissionedGav[] | undefined>>;
  getDocumentFilesNegotiation: string;
  setDocumentFilesNegotiation: (value: string) => void;
  getPDForImageNegotiation: number | undefined;
  setPDForImageNegotiation: (value: number | undefined) => void;
  getDocumentFilesService: string;
  setDocumentFilesService: (value: string) => void;
  getPDForImageService: number | undefined;
  setPDForImageService: (value: number | undefined) => void;
  getDocumentComplementary: string;
  setDocumentComplementary: Dispatch<SetStateAction<string>>;
  getPDForImageDocumentComplementary: number | undefined;
  setPDForImageDocumentComplementary: Dispatch<SetStateAction<number | undefined>>;
  getSelectedProposalDate: Date,
  setSelectedProposalDate: Dispatch<SetStateAction<Date>>;
  getSelectedCaptureLocation: Object_.LocalDeCaptacao | undefined;
  setSelectedCaptureLocation: Dispatch<SetStateAction<Object_.LocalDeCaptacao | undefined>>;
  getSelectedPurchasePurpose: Object_.FinalidadesDeCompra | undefined;
  setSelectedPurchasePurpose: Dispatch<SetStateAction<Object_.FinalidadesDeCompra | undefined>>;
  getVisibleChecklistRegistration: boolean;
  setVisibleChecklistRegistration: Dispatch<SetStateAction<boolean>>;
  getVisibleProductData: boolean;
  setVisibleProductData: Dispatch<SetStateAction<boolean>>;
  getVisibleCommissionControl: boolean;
  setVisibleCommissionControl: Dispatch<SetStateAction<boolean>>;
  getVisiblePaymentPlan: boolean;
  setVisiblePaymentPlan: Dispatch<SetStateAction<boolean>>;
  getVisibleNegotiationCard: boolean;
  setVisibleNegotiationCard: Dispatch<SetStateAction<boolean>>;
  getVisibleComplementaryDocumentation: boolean;
  setVisibleComplementaryDocumentation: Dispatch<SetStateAction<boolean>>;
  getVisibleAdditionalInformation: boolean;
  setVisibleAdditionalInformation: Dispatch<SetStateAction<boolean>>;
};

export const Proponent = (props: Props) => {
  //#region Variables
  const DataLogin: Object_.SignIn = useSelector((state:any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);
  const blurredColor = "rgba(255, 255, 255, 0.7)";
  //#endregion

  //#region UseState
  const [getShowToast, setShowToast] = useState<boolean>(false);
  const [getMessage1, setMessage1] = useState<string>("");
  const [getMessage2, setMessage2] = useState<string>("");

    //#region Visible Modals Proponent
    const [getDate] = useState<Date>(new Date());
    const [getLoading, setLoading] = useState<boolean>(false);
    const [getOpenBirth, setOpenBirth] = useState<boolean>(false);
    const [getVisibleNaturalnessCity, setVisibleNaturalnessCity] = useState<boolean>(false);
    const [getVisibleMaritalStatus, setVisibleMaritalStatus] = useState<boolean>(false);
    const [getVisibleUF_RGProponent, setVisibleUF_RGProponent] = useState<boolean>(false);
    const [getVisibleCNH_UFProponent, setVisibleCNH_UFProponent] = useState<boolean>(false);
    const [getVisibleUFAddress, setVisibleUFAddress] = useState<boolean>(false);
    const [getVisibleCNH_UFSpouse, setVisibleCNH_UFSpouse] = useState<boolean>(false);
    const [getVisibleUF_RGSpouse, setVisibleUF_RGSpouse] = useState<boolean>(false);
    const [getVisibleNaturalnessCitySpouse, setVisibleNaturalnessCitySpouse] = useState<boolean>(false);
    const [getVisibleImageIdentification, setVisibleImageIdentification] = useState<boolean>(false);
    const [getVisibleNaturalnessUFSpouse, setVisibleNaturalnessUFSpouse] = useState<boolean>(false);
    const [getVisiblePDFIdentification, setVisiblePDFIdentification] = useState<boolean>(false);
    const [getVisibleImageMaritalStatus, setVisibleImageMaritalStatus] = useState<boolean>(false);
    const [getVisiblePDFMaritalStatus, setVisiblePDFMaritalStatus] = useState<boolean>(false);
    const [getVisibleImageAddress, setVisibleImageAddress] = useState<boolean>(false);
    const [getVisiblePDFAddress, setVisiblePDFAddress] = useState<boolean>(false);
    const [getVisibleImageIdentificationSpouse, setVisibleImageIdentificationSpouse] = useState<boolean>(false);
    const [getVisiblePDFIdentificationSpouse, setVisiblePDFIdentificationSpouse] = useState<boolean>(false);
    const [getVisibleWeddingDate, setVisibleWeddingDate] = useState<boolean>(false);
    const [getVisibleExpeditionDate, setVisibleExpeditionDate] = useState<boolean>(false);
    const [getVisibleSpouseBirth, setVisibleSpouseBirth] = useState<boolean>(false);
    const [getVisibleNationalitySpouse, setVisibleNationalitySpouse] = useState<boolean>(false);
    const [getVisibleExpeditionDateSpouse, setVisibleExpeditionDateSpouse] = useState<boolean>(false);
    const [getVisibleDateIncorporation, setVisibleDateIncorporation] = useState<boolean>(false);
    const [getVisibleImageCompanyRegistration, setVisibleImageCompanyRegistration] = useState<boolean>(false);
    const [getVisiblePDFCompanyRegistration, setVisiblePDFCompanyRegistration] = useState<boolean>(false);
    const [getVisibleImageBoardTrade, setVisibleImageBoardTrade] = useState<boolean>(false);
    const [getVisiblePDFBoardTrade, setVisiblePDFBoardTrade] = useState<boolean>(false);
    const [getVisibleImageCardCNPJ, setVisibleImageCardCNPJ] = useState<boolean>(false);
    const [getVisiblePDFCardCNPJ, setVisiblePDFCardCNPJ] = useState<boolean>(false);
    const [getVisibleImageCompanyAddress, setVisibleImageCompanyAddress] = useState<boolean>(false);
    const [getVisiblePDFCompanyAddress, setVisiblePDFCompanyAddress] = useState<boolean>(false);
    //#endregion

    //#region Global
    const [getVisiblePropertyRegime, setVisiblePropertyRegime] = useState<boolean>(false);
    const [getVisibleNationality, setVisibleNationality] = useState<boolean>(false);
    const [getOriginalNationality, setOriginalNationality] = useState<Array<Object_.Nacao>>();
    const [getNationality, setNationality] = useState<Array<Object_.Nacao>>();
    const [getPropertyRegime, setPropertyRegime] = useState<Array<Object_.RegimeDeBens>>();
    const [getMaritalStatus, setMaritalStatus] = useState<Array<Object_.RegimeDeBens>>();
    const [getVisibleUF, setVisibleUF] = useState<boolean>(false);
    const [getVisibleUF_AddressLegalProponent, setVisibleUF_AddressLegalProponent] = useState<boolean>(false);
    const [getIsEnabledProponentLegal, setIsEnabledProponentLegal] = useState<boolean>(false);
    const [getUF, setUF] = useState<Array<UF>>(List.UF);
    const [getCity, setCity] = useState<Array<string>>();

    const [getConjugeNaturalidadeUF, setConjugeNaturalidadeUF] = useState<string>();
    //#endregion
  //#endregion

  //#region Functions
  async function CEP(cep: string) {
    setLoading(true)
    let Response = await Controllers.Correios.Get(DataLogin?.token, cep);
    if (Math.floor(Response.status / 100) === 2) {
      let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
      ProspectRecord.endereco = {
        bairro: Response.data.bairro,
        cep: TextFormat.CEP.DesformatarTexto(Response.data.cep),
        cidade: Response.data.cidade?.descricao,
        classificacao: 1,
        complemento: Response.data.complemento,
        logradouro: Response.data.logradouro,
        numero: undefined,
        uf: Response?.data?.uf?.sigla,
      }; props.setProspectsList([...props.getProspectsList]);
    }
    setLoading(false)
  }

  async function CEPCompany(cep: string) {
    setLoading(true)
    let Response = await Controllers.Correios.Get(DataLogin?.token, cep);
    if (Math.floor(Response.status / 100) === 2) {
      let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
      ProspectRecord.pjVinculado = { 
        dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
        nire: ProspectRecord.pjVinculado?.nire,
        nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
        numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
        cNAEs: ProspectRecord.pjVinculado?.cNAEs,
        cnpj: ProspectRecord.pjVinculado?.cnpj,
        documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
        emails: ProspectRecord.pjVinculado?.emails,
        endereco: {
          classificacao: 2,
          numero: ProspectRecord.pjVinculado?.endereco?.numero,
          bairro: Response.data.bairro,
          cep: Response.data.cep,
          cidade: Response.data.cidade?.descricao,
          complemento: Response.data.complemento,
          logradouro: Response.data.logradouro,
          uf: Response.data.uf?.descricao,
        },
        enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
        fichaCadastral: ProspectRecord.pjVinculado?.fichaCadastral,
        id: ProspectRecord.pjVinculado?.id,
        ie: ProspectRecord.pjVinculado?.ie,
        im: ProspectRecord.pjVinculado?.im,
        juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
        nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
        razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
        telefones: ProspectRecord.pjVinculado?.telefones,
      }
      props.setProspectsList([...props.getProspectsList]);
    }
    setLoading(false)
  }

  async function PropertyRegimeAPI() {
    let Response = await Controllers.Pessoa.RegimeDeBens(DataLogin?.token);
    if (Math.floor(Response.status / 100) === 2) {
    setPropertyRegime(Response.data)
    }
  }

  function Toast() {
    setShowToast(false)
  }

  async function MaritalStatusAPI() {
    let Response = await Controllers.Pessoa.EstadoCivil(DataLogin?.token);
    if (Math.floor(Response.status / 100) === 2) {
      setMaritalStatus(Response.data)
    }
  }

  async function NationalityAPI() {
    let Response = await Controllers.Nacao.Get(DataLogin?.token);
    if (Math.floor(Response.status / 100) === 2) {
      setOriginalNationality(Response.data)
      setNationality(Response.data)
    }
  }

  function SearchNationality(search: string) {
    let FilteredNationality = JSON.parse(JSON.stringify(getOriginalNationality))
    FilteredNationality.map((item: Object_.Nacao) => item.nacionalidade?.toLowerCase());
    setNationality(FilteredNationality?.filter((data: Object_.Nacao) => data.nacionalidade?.normalize('NFD').replace(/[\u0300-\u036f]/g, "")?.includes(search.toLowerCase())))
  }

  function SearchUF(search: string) {
    let FilteredUF = JSON.parse(JSON.stringify(List.UF))
    setUF(FilteredUF?.filter((data: UF) => data.initials?.includes(search.toUpperCase())))
  }

  function SearchCity(search: string) {
    let FilteredNaturalness = JSON.parse(JSON.stringify(
      props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "AC" ? List.Acre
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "AL" ? List.Alagoas
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "AP" ? List.Amapa
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "AM" ? List.Amazonas
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "BA" ? List.Bahia
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "CE" ? List.Ceara
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "DF" ? List.DistritoFederal
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "ES" ? List.EspiritoSanto
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "GO" ? List.Goias
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "MA" ? List.Maranhao
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "MT" ? List.MatoGrosso
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "MS" ? List.MatoGrossoDoSul
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "MG" ? List.MinasGerais
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "PA" ? List.Para
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "PB" ? List.Paraiba
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "PR" ? List.Parana
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "PE" ? List.Pernambuco
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "PI" ? List.Piaui
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "RJ" ? List.RioDeJaneiro
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "RN" ? List.RioGrandeDoNorte
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "RS" ? List.RioGrandeDoSul
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "RO" ? List.Rondonia
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "RR" ? List.Roraima
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "SC" ? List.SantaCatarina
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "SP" ? List.SaoPaulo
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "SE" ? List.Sergipe
      : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf == "TO" ? List.Tocantins
      : []
    ))
    FilteredNaturalness.map((item: string) => item?.toLowerCase());
    setCity(FilteredNaturalness?.filter((data: string) => data.normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search)))
  }

  function SearchCitySpouse(search: string) {
    let FilteredNaturalness = JSON.parse(JSON.stringify(
      getConjugeNaturalidadeUF == "AC" ? List.Acre :
      getConjugeNaturalidadeUF == "AL" ? List.Alagoas :
      getConjugeNaturalidadeUF == "AP" ? List.Amapa :
      getConjugeNaturalidadeUF == "AM" ? List.Amazonas :
      getConjugeNaturalidadeUF == "BA" ? List.Bahia :
      getConjugeNaturalidadeUF == "CE" ? List.Ceara :
      getConjugeNaturalidadeUF == "DF" ? List.DistritoFederal :
      getConjugeNaturalidadeUF == "ES" ? List.EspiritoSanto :
      getConjugeNaturalidadeUF == "GO" ? List.Goias :
      getConjugeNaturalidadeUF == "MA" ? List.Maranhao :
      getConjugeNaturalidadeUF == "MT" ? List.MatoGrosso :
      getConjugeNaturalidadeUF == "MS" ? List.MatoGrossoDoSul :
      getConjugeNaturalidadeUF == "MG" ? List.MinasGerais :
      getConjugeNaturalidadeUF == "PA" ? List.Para :
      getConjugeNaturalidadeUF == "PB" ? List.Paraiba :
      getConjugeNaturalidadeUF == "PR" ? List.Parana :
      getConjugeNaturalidadeUF == "PE" ? List.Pernambuco :
      getConjugeNaturalidadeUF == "PI" ? List.Piaui :
      getConjugeNaturalidadeUF == "RJ" ? List.RioDeJaneiro :
      getConjugeNaturalidadeUF == "RN" ? List.RioGrandeDoNorte :
      getConjugeNaturalidadeUF == "RS" ? List.RioGrandeDoSul :
      getConjugeNaturalidadeUF == "RO" ? List.Rondonia :
      getConjugeNaturalidadeUF == "RR" ? List.Roraima :
      getConjugeNaturalidadeUF == "SC" ? List.SantaCatarina :
      getConjugeNaturalidadeUF == "SP" ? List.SaoPaulo :
      getConjugeNaturalidadeUF == "SE" ? List.Sergipe :
      getConjugeNaturalidadeUF == "TO" ? List.Tocantins : []
    ))
    FilteredNaturalness.map((item: string) => item?.toLowerCase());
    setCity(FilteredNaturalness?.filter((data: string) => data!?.normalize('NFD')!?.replace(/[\u0300-\u036f]/g, "")!?.includes(search)))
  }

  async function requestCompanyRegistrationCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Permissão de acesso à Câmera",
          message: "Aplicativo precisa de permissão para uso da Câmera",
          buttonNeutral: "Perguntar Depois!",
          buttonNegative: "Cancelar!",
          buttonPositive: "Ok!",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        pickCameraCompanyRegistration()
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async function pickCameraCompanyRegistration() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchCamera(options);
    if(result?.assets) {
      let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
      ProspectRecord.pjVinculado = {
        dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
        nire: ProspectRecord.pjVinculado?.nire,
        nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
        numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
        cNAEs: ProspectRecord.pjVinculado?.cNAEs,
        cnpj: ProspectRecord.pjVinculado?.cnpj,
        documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
        emails: ProspectRecord.pjVinculado?.emails,
        endereco: ProspectRecord.pjVinculado?.endereco,
        enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
        fichaCadastral: {
          classificacao: 6,
          descricao: 'Documento PJ Vinculado - Ficha Cadastral',
          arquivo: result?.assets[0]?.base64 ? result?.assets[0]?.base64 : "",
          extensao: 'jpg',
        },
        id: ProspectRecord.pjVinculado?.id,
        ie: ProspectRecord.pjVinculado?.ie,
        im: ProspectRecord.pjVinculado?.im,
        juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
        nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
        razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
        telefones: ProspectRecord.pjVinculado?.telefones,
        cartaoCNPJ: ProspectRecord.pjVinculado?.cartaoCNPJ,
        certidaoDaJuntaComercial: ProspectRecord.pjVinculado?.certidaoDaJuntaComercial,
      }
      props.setProspectsList([...props.getProspectsList]);
    }
  }
  
  async function pickLibraryCompanyRegistration() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchImageLibrary(options);
    if(result?.assets) {
      let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
      ProspectRecord.pjVinculado = {
        dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
        nire: ProspectRecord.pjVinculado?.nire,
        nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
        numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
        cNAEs: ProspectRecord.pjVinculado?.cNAEs,
        cnpj: ProspectRecord.pjVinculado?.cnpj,
        documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
        emails: ProspectRecord.pjVinculado?.emails,
        endereco: ProspectRecord.pjVinculado?.endereco,
        enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
        fichaCadastral: {
          classificacao: 6,
          descricao: 'Documento PJ Vinculado - Ficha Cadastral',
          arquivo: result?.assets[0]?.base64 ? result?.assets[0]?.base64 : "",
          extensao: 'jpg',
        },
        id: ProspectRecord.pjVinculado?.id,
        ie: ProspectRecord.pjVinculado?.ie,
        im: ProspectRecord.pjVinculado?.im,
        juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
        nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
        razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
        telefones: ProspectRecord.pjVinculado?.telefones,
        cartaoCNPJ: ProspectRecord.pjVinculado?.cartaoCNPJ,
        certidaoDaJuntaComercial: ProspectRecord.pjVinculado?.certidaoDaJuntaComercial,
      }
      props.setProspectsList([...props.getProspectsList]);
    }

  }

  async function DocumentPDFCompanyRegistration() {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        presentationStyle:'fullScreen'
      });
      let uri = doc.uri
      console.log(doc)
      if (Platform.OS === 'ios') {
        uri = doc.uri.replace('file:', '')
      } else {
        uri = doc.uri
      }
      const decodedPath = decodeURIComponent(uri)
      RNFetchBlob.fs.readFile(decodedPath, 'base64').then((data: string) => {
        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
        ProspectRecord.pjVinculado = {
          dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
          nire: ProspectRecord.pjVinculado?.nire,
          nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
          numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
          cNAEs: ProspectRecord.pjVinculado?.cNAEs,
          cnpj: ProspectRecord.pjVinculado?.cnpj,
          documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
          emails: ProspectRecord.pjVinculado?.emails,
          endereco: ProspectRecord.pjVinculado?.endereco,
          enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
          fichaCadastral: {
            classificacao: 6,
            descricao: 'Documento PJ Vinculado - Ficha Cadastral',
            arquivo: data,
            extensao: 'pdf',
          },
          id: ProspectRecord.pjVinculado?.id,
          ie: ProspectRecord.pjVinculado?.ie,
          im: ProspectRecord.pjVinculado?.im,
          juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
          nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
          razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
          telefones: ProspectRecord.pjVinculado?.telefones,
          cartaoCNPJ: ProspectRecord.pjVinculado?.cartaoCNPJ,
          certidaoDaJuntaComercial: ProspectRecord.pjVinculado?.certidaoDaJuntaComercial,
        }
        props.setProspectsList([...props.getProspectsList]);
      }).catch((err) => {
        console.error("Erro BASE64", err);
      });
    }
    catch (error) {
      if(DocumentPicker.isCancel(error)) {
        console.log("User cancelled the upload", error)
      } else {
        console.log(error)
      }
    }
  }

  async function requestBoardTradeCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Permissão de acesso à Câmera",
          message: "Aplicativo precisa de permissão para uso da Câmera",
          buttonNegative: "Cancelar!",
          buttonPositive: "Ok!",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        pickCameraBoardTrade()
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async function pickCameraBoardTrade() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchCamera(options);
    if(result?.assets) {
      let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
      ProspectRecord.pjVinculado = {
        dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
        nire: ProspectRecord.pjVinculado?.nire,
        nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
        numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
        cNAEs: ProspectRecord.pjVinculado?.cNAEs,
        cnpj: ProspectRecord.pjVinculado?.cnpj,
        documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
        emails: ProspectRecord.pjVinculado?.emails,
        endereco: ProspectRecord.pjVinculado?.endereco,
        enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
        fichaCadastral: ProspectRecord.pjVinculado?.fichaCadastral,
        id: ProspectRecord.pjVinculado?.id,
        ie: ProspectRecord.pjVinculado?.ie,
        im: ProspectRecord.pjVinculado?.im,
        juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
        nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
        razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
        telefones: ProspectRecord.pjVinculado?.telefones,
        cartaoCNPJ: ProspectRecord.pjVinculado?.cartaoCNPJ,
        certidaoDaJuntaComercial: {
          classificacao: 6,
          descricao: 'Documento PJ Vinculado - Certidão da Junta Comercial',
          arquivo: result?.assets[0]?.base64 ? result?.assets[0]?.base64 : "",
          extensao: 'jpg',
        },
      }
      props.setProspectsList([...props.getProspectsList]);
    }
  }
  
  async function pickLibraryBoardTrade() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchImageLibrary(options);
    if(result?.assets) {
      let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
      ProspectRecord.pjVinculado = {
        dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
        nire: ProspectRecord.pjVinculado?.nire,
        nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
        numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
        cNAEs: ProspectRecord.pjVinculado?.cNAEs,
        cnpj: ProspectRecord.pjVinculado?.cnpj,
        documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
        emails: ProspectRecord.pjVinculado?.emails,
        endereco: ProspectRecord.pjVinculado?.endereco,
        enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
        fichaCadastral: ProspectRecord.pjVinculado?.fichaCadastral,
        id: ProspectRecord.pjVinculado?.id,
        ie: ProspectRecord.pjVinculado?.ie,
        im: ProspectRecord.pjVinculado?.im,
        juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
        nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
        razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
        telefones: ProspectRecord.pjVinculado?.telefones,
        cartaoCNPJ: ProspectRecord.pjVinculado?.cartaoCNPJ,
        certidaoDaJuntaComercial: {
          classificacao: 6,
          descricao: 'Documento PJ Vinculado - Certidão da Junta Comercial',
          arquivo: result?.assets[0]?.base64 ? result?.assets[0]?.base64 : "",
          extensao: 'jpg',
        },
      }
      props.setProspectsList([...props.getProspectsList]);
    }

  }

  async function DocumentPDFBoardTrade() {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        presentationStyle:'fullScreen'
      });
      let uri = doc.uri
      console.log(doc)
      if (Platform.OS === 'ios') {
        uri = doc.uri.replace('file:', '')
      } else {
        uri = doc.uri
      }
      const decodedPath = decodeURIComponent(uri)
      RNFetchBlob.fs.readFile(decodedPath, 'base64').then((data: string) => {
        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
        ProspectRecord.pjVinculado = {
          dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
          nire: ProspectRecord.pjVinculado?.nire,
          nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
          numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
          cNAEs: ProspectRecord.pjVinculado?.cNAEs,
          cnpj: ProspectRecord.pjVinculado?.cnpj,
          documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
          emails: ProspectRecord.pjVinculado?.emails,
          endereco: ProspectRecord.pjVinculado?.endereco,
          enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
          fichaCadastral: ProspectRecord.pjVinculado?.fichaCadastral,
          id: ProspectRecord.pjVinculado?.id,
          ie: ProspectRecord.pjVinculado?.ie,
          im: ProspectRecord.pjVinculado?.im,
          juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
          nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
          razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
          telefones: ProspectRecord.pjVinculado?.telefones,
          cartaoCNPJ: ProspectRecord.pjVinculado?.cartaoCNPJ,
          certidaoDaJuntaComercial: {
            classificacao: 6,
            descricao: 'Documento PJ Vinculado - Certidão da Junta Comercial',
            arquivo: data,
            extensao: 'pdf',
          },
        }
        props.setProspectsList([...props.getProspectsList]);
      }).catch((err) => {
        console.error("Erro BASE64", err);
      });
    }
    catch (error) {
      if(DocumentPicker.isCancel(error)) {
        console.log("User cancelled the upload", error)
      } else {
        console.log(error)
      }
    }
  }

  async function requestCardCNPJCameraPermission() {
    console.log('entrou')
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Permissão de acesso à Câmera",
          message: "Aplicativo precisa de permissão para uso da Câmera",
          buttonNegative: "Cancelar!",
          buttonPositive: "Ok!",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        pickCameraCardCNPJ();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async function pickCameraCardCNPJ() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchCamera(options);
    if(result?.assets) {
      let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
      ProspectRecord.pjVinculado = {
        dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
        nire: ProspectRecord.pjVinculado?.nire,
        nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
        numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
        cNAEs: ProspectRecord.pjVinculado?.cNAEs,
        cnpj: ProspectRecord.pjVinculado?.cnpj,
        documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
        emails: ProspectRecord.pjVinculado?.emails,
        endereco: ProspectRecord.pjVinculado?.endereco,
        enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
        fichaCadastral: ProspectRecord.pjVinculado?.fichaCadastral,
        id: ProspectRecord.pjVinculado?.id,
        ie: ProspectRecord.pjVinculado?.ie,
        im: ProspectRecord.pjVinculado?.im,
        juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
        nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
        razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
        telefones: ProspectRecord.pjVinculado?.telefones,
        cartaoCNPJ: {
          classificacao: 6,
          descricao: 'Documento PJ Vinculado - Cartão CNPJ',
          arquivo: result?.assets[0]?.base64 ? result?.assets[0]?.base64 : "",
          extensao: 'jpg',
        },
        certidaoDaJuntaComercial: ProspectRecord.pjVinculado?.certidaoDaJuntaComercial,
      }
      props.setProspectsList([...props.getProspectsList]);
    }
  }
  
  async function pickLibraryCardCNPJ() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchImageLibrary(options);
    if(result?.assets) {
      let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
      ProspectRecord.pjVinculado = {
        dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
        nire: ProspectRecord.pjVinculado?.nire,
        nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
        numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
        cNAEs: ProspectRecord.pjVinculado?.cNAEs,
        cnpj: ProspectRecord.pjVinculado?.cnpj,
        documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
        emails: ProspectRecord.pjVinculado?.emails,
        endereco: ProspectRecord.pjVinculado?.endereco,
        enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
        fichaCadastral: ProspectRecord.pjVinculado?.fichaCadastral,
        id: ProspectRecord.pjVinculado?.id,
        ie: ProspectRecord.pjVinculado?.ie,
        im: ProspectRecord.pjVinculado?.im,
        juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
        nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
        razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
        telefones: ProspectRecord.pjVinculado?.telefones,
        cartaoCNPJ: {
          classificacao: 6,
          descricao: 'Documento PJ Vinculado - Cartão CNPJ',
          arquivo: result?.assets[0]?.base64 ? result?.assets[0]?.base64 : "",
          extensao: 'jpg',
        },
        certidaoDaJuntaComercial: ProspectRecord.pjVinculado?.certidaoDaJuntaComercial,
      }
      props.setProspectsList([...props.getProspectsList]);
    }

  }

  async function DocumentPDFCardCNPJ() {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        presentationStyle:'fullScreen'
      });
      let uri = doc.uri
      console.log(doc)
      if (Platform.OS === 'ios') {
        uri = doc.uri.replace('file:', '')
      } else {
        uri = doc.uri
      }
      const decodedPath = decodeURIComponent(uri)
      RNFetchBlob.fs.readFile(decodedPath, 'base64').then((data: string) => {
        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
        ProspectRecord.pjVinculado = {
          dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
          nire: ProspectRecord.pjVinculado?.nire,
          nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
          numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
          cNAEs: ProspectRecord.pjVinculado?.cNAEs,
          cnpj: ProspectRecord.pjVinculado?.cnpj,
          documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
          emails: ProspectRecord.pjVinculado?.emails,
          endereco: ProspectRecord.pjVinculado?.endereco,
          enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
          fichaCadastral: ProspectRecord.pjVinculado?.fichaCadastral,
          id: ProspectRecord.pjVinculado?.id,
          ie: ProspectRecord.pjVinculado?.ie,
          im: ProspectRecord.pjVinculado?.im,
          juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
          nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
          razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
          telefones: ProspectRecord.pjVinculado?.telefones,
          cartaoCNPJ: {
            classificacao: 6,
            descricao: 'Documento PJ Vinculado - Cartão CNPJ',
            arquivo: data,
            extensao: 'pdf',
          },
          certidaoDaJuntaComercial: ProspectRecord.pjVinculado?.certidaoDaJuntaComercial,
        }
        props.setProspectsList([...props.getProspectsList]);
      }).catch((err) => {
        console.error("Erro BASE64", err);
      });
    }
    catch (error) {
      if(DocumentPicker.isCancel(error)) {
        console.log("User cancelled the upload", error)
      } else {
        console.log(error)
      }
    }
  }

  async function requestCompanyAddressCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Permissão de acesso à Câmera",
          message: "Aplicativo precisa de permissão para uso da Câmera",
          buttonNegative: "Cancelar!",
          buttonPositive: "Ok!",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        pickCameraCompanyAddress()
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async function pickCameraCompanyAddress() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchCamera(options);
    if(result?.assets) {
      let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
      ProspectRecord.pjVinculado = {
        dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
        nire: ProspectRecord.pjVinculado?.nire,
        nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
        numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
        cNAEs: ProspectRecord.pjVinculado?.cNAEs,
        cnpj: ProspectRecord.pjVinculado?.cnpj,
        documentoEndereco: {
          classificacao: 7,
          descricao: 'Documento PJ Vinculado - Endereço',
          arquivo: result?.assets[0]?.base64 ? result?.assets[0]?.base64 : "",
          extensao: 'jpg',
        },
        emails: ProspectRecord.pjVinculado?.emails,
        endereco: ProspectRecord.pjVinculado?.endereco,
        enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
        fichaCadastral: ProspectRecord?.pjVinculado?.fichaCadastral,
        id: ProspectRecord.pjVinculado?.id,
        ie: ProspectRecord.pjVinculado?.ie,
        im: ProspectRecord.pjVinculado?.im,
        juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
        nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
        razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
        telefones: ProspectRecord.pjVinculado?.telefones,
      }
      props.setProspectsList([...props.getProspectsList]);
    }
  }
  
  async function pickLibraryCompanyAddress() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchImageLibrary(options);
    if(result?.assets) {
      let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
      ProspectRecord.pjVinculado = {
        dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
        nire: ProspectRecord.pjVinculado?.nire,
        nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
        numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
        cNAEs: ProspectRecord.pjVinculado?.cNAEs,
        cnpj: ProspectRecord.pjVinculado?.cnpj,
        documentoEndereco: {
          classificacao: 7,
          descricao: 'Documento PJ Vinculado - Endereço',
          arquivo: result?.assets[0]?.base64 ? result?.assets[0]?.base64 : "",
          extensao: 'jpg',
        },
        emails: ProspectRecord.pjVinculado?.emails,
        endereco: ProspectRecord.pjVinculado?.endereco,
        enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
        fichaCadastral: ProspectRecord?.pjVinculado?.fichaCadastral,
        id: ProspectRecord.pjVinculado?.id,
        ie: ProspectRecord.pjVinculado?.ie,
        im: ProspectRecord.pjVinculado?.im,
        juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
        nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
        razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
        telefones: ProspectRecord.pjVinculado?.telefones,
      }
      props.setProspectsList([...props.getProspectsList]);
    }
  }

  async function DocumentPDFCompanyAddress() {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        presentationStyle:'fullScreen'
      });
      let uri = doc.uri
      console.log(doc)
      if (Platform.OS === 'ios') {
        uri = doc.uri.replace('file:', '')
      } else {
        uri = doc.uri
      }
      const decodedPath = decodeURIComponent(uri)
      RNFetchBlob.fs.readFile(decodedPath, 'base64').then((data: string) => {
        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
        ProspectRecord.pjVinculado = {
          dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
          nire: ProspectRecord.pjVinculado?.nire,
          nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
          numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
          cNAEs: ProspectRecord.pjVinculado?.cNAEs,
          cnpj: ProspectRecord.pjVinculado?.cnpj,
          documentoEndereco: {
            classificacao: 7,
            descricao: 'Documento PJ Vinculado - Endereço',
            arquivo: data,
            extensao: 'pdf',
          },
          emails: ProspectRecord.pjVinculado?.emails,
          endereco: ProspectRecord.pjVinculado?.endereco,
          enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
          fichaCadastral: ProspectRecord?.pjVinculado?.fichaCadastral,
          id: ProspectRecord.pjVinculado?.id,
          ie: ProspectRecord.pjVinculado?.ie,
          im: ProspectRecord.pjVinculado?.im,
          juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
          nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
          razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
          telefones: ProspectRecord.pjVinculado?.telefones,
        }
        props.setProspectsList([...props.getProspectsList]);
      }).catch((err) => {
        console.error("Erro BASE64", err);
      });
    }
    catch (error) {
      if(DocumentPicker.isCancel(error)) {
        console.log("User cancelled the upload", error)
      } else {
        console.log(error)
      }
    }
  }

  async function requestIdentificationCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Permissão de acesso à Câmera",
          message: "Aplicativo precisa de permissão para uso da Câmera",
          buttonNegative: "Cancelar!",
          buttonPositive: "Ok!",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        pickCameraIdentification()
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async function pickCameraIdentification() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchCamera(options);
    if(result?.assets != undefined) {
      let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
      ProspectRecord.documentoPessoal = {
        classificacao: 1,
        descricao: 'Documento do Lead - Pessoal',
        arquivo: result?.assets[0]?.base64 ? result?.assets[0]?.base64 : "",
        extensao: 'jpg',
      },
      props.setProspectsList([...props.getProspectsList]);
    }
  }
  
  async function pickLibraryIdentification() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchImageLibrary(options);
    if(result?.assets != undefined) {
      let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
      ProspectRecord.documentoPessoal = {
        classificacao: 1,
        descricao: 'Documento do Lead - Pessoal',
        arquivo: result?.assets[0]?.base64 ? result?.assets[0]?.base64 : "",
        extensao: 'jpg',
      },
      props.setProspectsList([...props.getProspectsList]);
    }
  }

  async function DocumentPDFIdentification() {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        presentationStyle:'fullScreen'
      });
      let uri = doc.uri
      console.log(doc)
      if (Platform.OS === 'ios') {
        uri = doc.uri.replace('file:', '')
      } else {
        uri = doc.uri
      }
      const decodedPath = decodeURIComponent(uri)
      RNFetchBlob.fs.readFile(decodedPath, 'base64').then((data: string) => {
        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
        ProspectRecord.documentoPessoal = {
          classificacao: 1,
          descricao: 'Documento do Lead - Pessoal',
          arquivo: data,
          extensao: 'pdf',
        },
        props.setProspectsList([...props.getProspectsList]);
      }).catch((err) => {
        console.error("Erro BASE64", err);
      });
    }
    catch (error) {
      if(DocumentPicker.isCancel(error)) {
        console.log("User cancelled the upload", error)
      } else {
        console.log(error)
      }
    }
  }

  async function requestMaritalStatusCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Permissão de acesso à Câmera",
          message: "Aplicativo precisa de permissão para uso da Câmera",
          buttonNegative: "Cancelar!",
          buttonPositive: "Ok!",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        pickCameraMaritalStatus()
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async function pickCameraMaritalStatus() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchCamera(options);
    if(result?.assets != undefined) {
      let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
      ProspectRecord.documentoDeEstadoCivil = {
        classificacao: 3,
        descricao: 'Declaração/Comprovante de estado civil',
        arquivo: result?.assets[0]?.base64 ? result?.assets[0]?.base64 : "",
        extensao: 'jpg',
      },
      props.setProspectsList([...props.getProspectsList]);
    }
  }
  
  async function pickLibraryMaritalStatus() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchImageLibrary(options);
    if(result.assets) {
      let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
      ProspectRecord.documentoDeEstadoCivil = {
        classificacao: 3,
        descricao: 'Declaração/Comprovante de estado civil',
        arquivo: result?.assets[0]?.base64 ? result?.assets[0]?.base64 : "",
        extensao: 'jpg',
      },
      props.setProspectsList([...props.getProspectsList]);
    }
  }

  async function DocumentPDFMaritalStatus() {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        presentationStyle:'fullScreen'
      });
      let uri = doc.uri
      console.log(doc)
      if (Platform.OS === 'ios') {
        uri = doc.uri.replace('file:', '')
      } else {
        uri = doc.uri
      }
      const decodedPath = decodeURIComponent(uri)
      RNFetchBlob.fs.readFile(decodedPath, 'base64').then((data: string) => {
        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
        ProspectRecord.documentoDeEstadoCivil = {
          classificacao: 3,
          descricao: 'Declaração/Comprovante de estado civil',
          arquivo: data,
          extensao: 'pdf',
        },
        props.setProspectsList([...props.getProspectsList]);
      }).catch((err) => {
        console.error("Erro BASE64", err);
      });
    }
    catch (error) {
      if(DocumentPicker.isCancel(error)) {
        console.log("User cancelled the upload", error)
      } else {
        console.log(error)
      }
    }
  }

  async function requestResponsibleAddressCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Permissão de acesso à Câmera",
          message: "Aplicativo precisa de permissão para uso da Câmera",
          buttonNegative: "Cancelar!",
          buttonPositive: "Ok!",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        pickCameraResponsibleAddress()
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async function pickCameraResponsibleAddress() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchCamera(options);
    if(result?.assets != undefined) {
      let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
      ProspectRecord.documentoEndereco = {
        classificacao: 2,
        descricao: 'Documento do Lead - Endereço',
        arquivo: result?.assets[0]?.base64 ? result?.assets[0]?.base64 : "",
        extensao: 'jpg',
      },
      props.setProspectsList([...props.getProspectsList]);
    }
  }
  
  async function pickLibraryResponsibleAddress() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchImageLibrary(options);
    if(result?.assets != undefined) {
      let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
      ProspectRecord.documentoEndereco = {
        classificacao: 2,
        descricao: 'Documento do Lead - Endereço',
        arquivo: result?.assets[0]?.base64 ? result?.assets[0]?.base64 : "",
        extensao: 'jpg',
      },
      props.setProspectsList([...props.getProspectsList]);
    }
  }

  async function DocumentPDFResponsibleAddress() {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        presentationStyle:'fullScreen'
      });
      let uri = doc.uri
      console.log(doc)
      if (Platform.OS === 'ios') {
        uri = doc.uri.replace('file:', '')
      } else {
        uri = doc.uri
      }
      const decodedPath = decodeURIComponent(uri)
      RNFetchBlob.fs.readFile(decodedPath, 'base64').then((data: string) => {
        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
        ProspectRecord.documentoEndereco = {
          classificacao: 2,
          descricao: 'Documento do Lead - Endereço',
          arquivo: data,
          extensao: 'pdf',
        },
        props.setProspectsList([...props.getProspectsList]);
      }).catch((err) => {
        console.error("Erro BASE64", err);
      });
    }
    catch (error) {
      if(DocumentPicker.isCancel(error)) {
        console.log("User cancelled the upload", error)
      } else {
        console.log(error)
      }
    }
  }


  async function requestSpouseIdentificationCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Permissão de acesso à Câmera",
          message: "Aplicativo precisa de permissão para uso da Câmera",
          buttonNegative: "Cancelar!",
          buttonPositive: "Ok!",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        pickCameraSpouseIdentification()
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async function pickCameraSpouseIdentification() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchCamera(options);
    if(result?.assets != undefined) {
      let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
      let Dependents = [... props.getDependentsList]; let DependentsRecord: Object_.Dependente = Dependents[props.getIndexProspects];
      ProspectRecord.dependentes = [...props.getDependentsList]
      DependentsRecord.documentoPessoal = {
        classificacao: 1,
        descricao: 'Documento do Dependente - Pessoal',
        arquivo: result?.assets[0]?.base64 ? result?.assets[0]?.base64 : "",
        extensao: "jpg",
      };
      props.setDependentsList([...props.getDependentsList]);
      props.setProspectsList([...props.getProspectsList]);
    }
  }
  
  async function pickLibrarySpouseIdentification() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchImageLibrary(options);
    if(result?.assets != undefined) {
      let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
      let Dependents = [... props.getDependentsList]; let DependentsRecord: Object_.Dependente = Dependents[props.getIndexProspects];
      ProspectRecord.dependentes = [...props.getDependentsList]
      DependentsRecord.documentoPessoal = {
        classificacao: 1,
        descricao: 'Documento do Dependente - Pessoal',
        arquivo: result?.assets[0]?.base64 ? result?.assets[0]?.base64 : "",
        extensao: "jpg",
      };
      props.setDependentsList([...props.getDependentsList]);
      props.setProspectsList([...props.getProspectsList]);
    }
  }

  async function DocumentPDFSpouseIdentification() {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        presentationStyle:'fullScreen'
      });
      let uri = doc.uri
      console.log(doc)
      if (Platform.OS === 'ios') {
        uri = doc.uri.replace('file:', '')
      } else {
        uri = doc.uri
      }
      const decodedPath = decodeURIComponent(uri)
      RNFetchBlob.fs.readFile(decodedPath, 'base64').then((data: string) => {
        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
        let Dependents = [... props.getDependentsList]; let DependentsRecord: Object_.Dependente = Dependents[props.getIndexProspects];
        ProspectRecord.dependentes = [...props.getDependentsList]
        DependentsRecord.documentoPessoal = {
          classificacao: 4,
          descricao: 'Documento do Dependente - Pessoal',
          arquivo: data,
          extensao: "pdf",
        };
        props.setDependentsList([...props.getDependentsList]);
        props.setProspectsList([...props.getProspectsList]);
      }).catch((err) => {
        console.error("Erro BASE64", err);
      });
    }
    catch (error) {
      if(DocumentPicker.isCancel(error)) {
        console.log("User cancelled the upload", error)
      } else {
        console.log(error)
      }
    }
  }

  async function CPFConsultationDependent(CPF: string, ) {
    let valid = TextFormat.CPF.TextoValido(CPF)
    if(valid) {
      setLoading(true)
      if(SelectedCompany?.id == 4) {
        await axios.create({ baseURL: 'https://vendadigital.gavresorts.com.br:4443' })
        .get(`/Pessoa/${"NzAyNjEyMzExNDZjMjl6Skc1bGRETXk="}/${CPF}`).then((response) => {
          let data = response.data as Object_.Pessoa
          let Dependents = [... props.getDependentsList]; let DependentsRecord: Object_.Dependente = Dependents[0];
          DependentsRecord.cpf = data?.cpf;
          DependentsRecord.nome = data?.nome;
          DependentsRecord.dataDeNascimento = data?.dataDeNascimento;
          DependentsRecord.nacionalidade = data?.nacionalidade ? data?.nacionalidade : 
          {
            id: 195,
            descricao: "Brasil",
            nacionalidade: "brasileiro(a)",
            masculino: "brasileiro",
            feminino: "brasileira"
          },
          DependentsRecord.email = data?.emails![0]?.descricao;
          DependentsRecord.rg = data?.rg
          DependentsRecord.telefones = [{
            classificacao: 2,
            ddi: "55",
            ddd: data?.telefones![0]?.ddd,
            numero: data?.telefones![0]?.numero,
            observacao: ""
          }]
          DependentsRecord.ocupacao = { 
            cargo: "", 
            id: 0, 
            nome: data?.observacao,
          }
          props.setProspectsList([...props.getProspectsList]);
          setLoading(false)
        }).catch(error => {
          console.log(error);
          setMessage1("Erro!"); setMessage2("Não foi possível trazer as informações do Lead."); setShowToast(true);
          setLoading(false);
        })
      } else {
        let response = (await Controllers.Pessoa.Get(DataLogin?.token, SelectedCompany?.id, CPF, undefined, undefined, undefined))
        let data = response.data[0] as Object_.Pessoa
        if ((Math.floor(response.status / 100) === 2) && data) {
          let Dependents = [... props.getDependentsList]; let DependentsRecord: Object_.Dependente = Dependents[0];
          DependentsRecord.cpf = data?.cpf;
          DependentsRecord.nome = data?.nome;
          DependentsRecord.dataDeNascimento = data?.dataDeNascimento;
          DependentsRecord.nacionalidade = data?.nacionalidade ? data?.nacionalidade : 
          {
            id: 195,
            descricao: "Brasil",
            nacionalidade: "brasileiro(a)",
            masculino: "brasileiro",
            feminino: "brasileira"
          },
          DependentsRecord.email = data?.emails![0]?.descricao;
          DependentsRecord.rg = data?.rg
          DependentsRecord.telefones = [{
            classificacao: 2,
            ddi: "55",
            ddd: data?.telefones![0]?.ddd,
            numero: data?.telefones![0]?.numero,
            observacao: ""
          }]
          DependentsRecord.ocupacao = { 
            cargo: "", 
            id: 0, 
            nome: data?.observacao,
          }
          props.setProspectsList([...props.getProspectsList]);
          setLoading(false)
        } else {
          setMessage1("Erro!"); setMessage2("Não foi possível trazer as informações do Lead."); setShowToast(true)
          setLoading(false)
        }
      }
    } else {
      setMessage1("Erro!"); setMessage2("Não foi possível trazer as informações do Lead, pois o CPF digitado é inválido"); setShowToast(true)
    }
    setLoading(false)
  }

  async function CPFConsultationProponent(CPF: string, ) {
    let valid = TextFormat.CPF.TextoValido(CPF)
    if(valid) {
      setLoading(true)
      if(SelectedCompany?.id == 4) {
        console.log(0)
        await axios.create({ baseURL: 'https://vendadigital.gavresorts.com.br:4443' }).get(`/Pessoa/NzAyNjEyMzExNDZjMjl6Skc1bGRETXk%3D?CPF=${CPF}`)
        .then((response) => {
          console.log(1)
          let data = response.data as Object_.Pessoa
          console.log(2)
          let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
          ProspectRecord.cpf = data?.cpf ? data?.cpf : undefined;
          ProspectRecord.nome = data?.nome ? data?.nome : undefined;
          ProspectRecord.dataDeNascimento = data?.dataDeNascimento ? data?.dataDeNascimento : undefined;
          ProspectRecord.nacionalidade = data?.nacionalidade ? data?.nacionalidade : 
          {
            id: 195,
            descricao: "Brasil",
            nacionalidade: "brasileiro(a)",
            masculino: "brasileiro",
            feminino: "brasileira"
          };
          ProspectRecord.rg = data?.rg ? data?.rg : undefined;
          ProspectRecord.estadoCivil = data?.estadoCivil ? data.estadoCivil : undefined;
          ProspectRecord.emails = data?.emails ? data?.emails : undefined;
          ProspectRecord.endereco = data?.endereco ? data?.endereco : undefined;
          ProspectRecord.telefones = data?.telefones ? data?.telefones : undefined;
          ProspectRecord.ocupacao = data?.observacao ? { 
            cargo: "", 
            id: 0, 
            nome: data?.observacao,
          } : undefined;
          try {
            let cellPhone = data.telefones?.find((item: Object_.Telefone) => item?.classificacao == 1);
            props.setCellPhone({
              classificacao: 1,
              ddi: "55",
              ddd: cellPhone?.ddd,
              numero: cellPhone?.numero
            } as Object_.Telefone); 
            props.setProspectsList([...props.getProspectsList]);
          } catch {} 
          try {
            let comercialPhone = data.telefones?.find((item: Object_.Telefone) => item?.classificacao == 2);
            props.setComercialPhone({
              classificacao: 2,
              ddi: "55",
              ddd: comercialPhone?.ddd,
              numero: comercialPhone?.numero
            } as Object_.Telefone); 
            props.setProspectsList([...props.getProspectsList]);
          } catch {} 
          props.setProspectsList([...props.getProspectsList]);
        }).catch(error => {
          console.log("ERRO", error);
          setMessage1("Erro!"); setMessage2("Não foi possível trazer as informações do Lead."); setShowToast(true);
        })
      } else {
        let response = (await Controllers.Pessoa.Get(DataLogin?.token, SelectedCompany?.id, CPF, undefined, undefined, undefined))
        let data = response.data[0] as Object_.Pessoa
        if ((Math.floor(response.status / 100) === 2) && data) {
          let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
          ProspectRecord.cpf = data?.cpf;
          ProspectRecord.nome = data?.nome;
          ProspectRecord.dataDeNascimento = data?.dataDeNascimento;
          ProspectRecord.nacionalidade = data?.nacionalidade ? data?.nacionalidade : 
          {
            id: 195,
            descricao: "Brasil",
            nacionalidade: "brasileiro(a)",
            masculino: "brasileiro",
            feminino: "brasileira"
          },
          ProspectRecord.emails = data?.emails;
          ProspectRecord.rg = data?.rg
          ProspectRecord.estadoCivil = data?.estadoCivil
          ProspectRecord.endereco = data?.endereco
          ProspectRecord.telefones = data?.telefones
          ProspectRecord.ocupacao = { 
            cargo: "", 
            id: 0, 
            nome: data?.observacao,
          }
          try {
            let cellPhone = data.telefones?.find((item: Object_.Telefone) => item?.classificacao == 1);
            props.setCellPhone({
              classificacao: 1,
              ddi: "55",
              ddd: cellPhone?.ddd,
              numero: cellPhone?.numero
            } as Object_.Telefone); 
            props.setProspectsList([...props.getProspectsList]);
          } catch {} 
          try {
            let comercialPhone = data.telefones?.find((item: Object_.Telefone) => item?.classificacao == 2);
            props.setComercialPhone({
              classificacao: 2,
              ddi: "55",
              ddd: comercialPhone?.ddd,
              numero: comercialPhone?.numero
            } as Object_.Telefone); 
            props.setProspectsList([...props.getProspectsList]);
          } catch {} 
        props.setProspectsList([...props.getProspectsList]);
      } else {
          setLoading(false)
          setMessage1("Erro!"); setMessage2("Não foi possível trazer as informações do Lead."); setShowToast(true)
        }
      }
    } else {
      setMessage1("Erro!"); setMessage2("Não foi possível trazer as informações do Lead, pois o CPF digitado é inválido"); setShowToast(true)
    }
    setLoading(false)
  }

  function DeleteProponent() {
    props.getProspectsList.splice(props.getIndexProspects, 1);
    props.setIndexProspects(props.getIndexProspects - 1);
  }

  async function ValidatingData() {
    props.getProspectsList.map((Item, Index) => {
      if (Item.documentoPessoal && Item.documentoPessoal.arquivo == '') {
        setMessage1(`O documento pessoal do ${Index + 1}º proponente não foi anexado`); setMessage2('Selecione um novo arquivo'); setShowToast(true)
      } else if (Item.cpf!?.length < 11) {
        setMessage1(`O CPF do ${Index + 1}º proponente é inválido`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
      } else if (!Item.cpf || Item.cpf == '') {
        setMessage1(`O CPF do ${Index + 1}º proponente não foi informado`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
      } else if (Item?.nome == undefined) {
        setMessage1(`O nome do ${Index + 1}º proponente não foi informado`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
      } else if (!Item.dataDeNascimento) {
        setMessage1(`A data de nascimento do ${Index + 1}º proponente não foi informada`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
      } else if (!Item.nacionalidade || Item.nacionalidade.descricao == '') {
        setMessage1(`A nacionalidade do ${Index + 1}º proponente não foi informada`); setMessage2('Tente selecionar novamente a opção desejada'); setShowToast(true)
      } else if (!Item.estadoCivil) {
        setMessage1(`O estado civil do ${Index + 1}º proponente não foi informado`); setMessage2('Tente selecionar novamente a opção desejada'); setShowToast(true)
      } else if (!Item?.emails![0]?.descricao || Item?.emails?.length == 0) {
        setMessage1(`O email do ${Index + 1}º proponente não foi informado`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
      } else if (!Item.telefones || Item.telefones?.length == 0) {
        setMessage1(`Nenhum telefone ou telefone incompleto foi informado para o ${Index + 1}º proponente`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
      } else if (!Item.ocupacao || Item.ocupacao.nome == '') {
        setMessage1(`A profissão do ${Index + 1}º proponente não foi informada`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
      } else if (!Item.dataDeNascimento) {
        setMessage1(`A data de nascimento do ${Index + 1}º proponente não foi informada`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
      } else if (!Item.rg || !Item.rg.orgaoEmissor || Item.rg.orgaoEmissor == '') {
        setMessage1(`O orgão emissor do RG do ${Index + 1}º proponente não foi informado`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
      } else if (!Item.rg || !Item.rg.uf || Item.rg.uf == '') {
        setMessage1(`A UF responsável pela emissão do RG do ${Index + 1}º proponente não foi informado`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
      } else if (!Item.rg || !Item.rg.numero || Item.rg.numero == '') {
        setMessage1(`O número responsável pela emissão do RG do ${Index + 1}º proponente não foi informada`); setMessage2('Tente selecionar novamente a opção desejada'); setShowToast(true)
      } else if (Item.endereco == undefined) {
        setMessage1(`O endereço do ${Index + 1}º proponente não foi informado`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
      } else if (!Item.endereco.cep || !Item.endereco.logradouro || !Item.endereco.bairro || !Item.endereco.cidade || !Item.endereco.uf) {
        setMessage1(`O endereço do ${Index + 1}º proponente possui campos não informados`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
      } else {
        props.setVisibleProductData(true);
      }
    })
    if(props.getProspectsList[props.getIndexProspects]?.estadoCivil === 2 || props.getProspectsList[props.getIndexProspects]?.estadoCivil === 7) {
      props.getDependentsList.map((Item, Index) => {
        if (Item?.documentoPessoal && Item?.documentoPessoal.arquivo == '') {
          setMessage1(`O documento pessoal do ${Index + 1}º proponente não foi anexado`); setMessage2('Selecione um novo arquivo'); setShowToast(true)
        } else if (!Item || !Item?.cpf || Item?.cpf == '') {
          setMessage1(`O CPF do conjugê do ${Index + 1}º proponente não foi informado`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
        } else if (Item && Item?.cpf && Item?.cpf.length != 11) {
          setMessage1(`O CPF do conjugê do ${Index + 1}º proponente é inválido`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
        } else if (!Item?.email || Item?.email == '') {
          setMessage1(`O email do conjugê do ${Index + 1}º proponente não foi informado`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
        } else if (!Item?.rg || !Item?.rg.numero || Item?.rg.numero == '') {
          setMessage1(`O RG do conjugê do ${Index + 1}º proponente não foi informado`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
        } else if (!Item?.nome || Item?.nome == '') {
          setMessage1(`O nome do conjugê do ${Index + 1}º proponente não foi informado`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
        } else if (!Item?.rg || !Item?.rg.orgaoEmissor || Item?.rg.orgaoEmissor == '') {
          setMessage1(`O orgão emissor do RG do conjugê do ${Index + 1}º proponente não foi informado`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
        } else if (!Item?.dataDeNascimento) {
          setMessage1(`A data de nascimento do conjugê do ${Index + 1}º proponente não foi informada`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
        } else if (!Item?.telefones || Item?.telefones?.length == 0) {
          setMessage1(`Nenhum telefone foi informado para o conjugê do ${Index + 1}º proponente`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
        } else if (!Item?.rg || !Item?.rg.uf || Item?.rg.uf == '') {
          setMessage1(`A UF responsável pela emissão do RG do conjugê do ${Index + 1}º proponente não foi informada`); setMessage2('Tente selecionar novamente a opção desejada e se persistir, entre em contato com a equipe de desenvolvimento'); setShowToast(true)
        } else if (!Item?.nacionalidade || Item?.nacionalidade.descricao == '') {
          setMessage1(`A nacionalidade do conjugê do ${Index + 1}º proponente não foi informada`); setMessage2('Tente selecionar novamente a opção desejada e se persistir, entre em contato com a equipe de desenvolvimento'); setShowToast(true)
        } else if (!Item?.ocupacao || Item?.ocupacao.nome == '') {
          setMessage1(`A profissão do conjugê do ${Index + 1}º proponente não foi informada`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
        }
      })
    }
  }
  //#endregion
  
  //#region UseEffect
  useEffect(() => {
    PropertyRegimeAPI();
    MaritalStatusAPI();
    NationalityAPI();
  }, []);
  //#endregion

  return (
    <Modal animationType="slide" visible={props.visible}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <SafeAreaView>
        <Modals.ModalLoading visible={getLoading} transparent={true} />
        <Styled.Container>
          <View style={{top: -5}}>
            <ToastMessage
              showToast={getShowToast}
              hideToast={setShowToast}
              function={Toast}
              message1={getMessage1}
              message2={getMessage2}
            />
          </View>
          <KeyboardAvoidingView behavior='position'>
            <Styled.ContainerHeader style={{ marginTop: Platform.OS === 'ios' ? '5%' : '10%', opacity: getShowToast ? 0 : 1}}>
              {props.getIndexProspects != 0 ?
              <TouchableOpacity onPress={props.onPressBack}>
                <SvgCss xml={ArrowBack} />
              </TouchableOpacity> :
              <Styled.Number activeOpacity={0.9} onPress={props.onPressBack}>
                <Styled.TextNumber>1</Styled.TextNumber>
              </Styled.Number>}
              <Styled.TextHeader>{`${TextFormat.Numero.FormatarTextoParaInteiro(props.getIndexProspects + 1)}º Proponente`}</Styled.TextHeader>
              <TouchableOpacity onPress={props.goHome}>
                <SvgCss xml={Home} />
              </TouchableOpacity>
            </Styled.ContainerHeader>
            <Styled.SubContainer>
              {props.getIndexProspects != 0 &&
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: '5%', justifyContent: 'space-between' }}>
                <Styled.TextCancelProponent>{`Esta venda possui ${TextFormat.Numero.FormatarTextoParaInteiro(props.getIndexProspects + 1)}º proponente?`}</Styled.TextCancelProponent>
                <Switch
                  size={25}
                  onPress={() => DeleteProponent()}
                  isEnabled={true}
                />
              </View>}
              <ScrollView ref={props.scrollRef} showsVerticalScrollIndicator={false}>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: '5%', width: '90%', justifyContent: 'center' }}>
                <Styled.TextLegal>{`Este proponente será uma \npessoa jurídica?`}</Styled.TextLegal>
                <Switch
                  size={25}
                  onPress={() => {setIsEnabledProponentLegal(prev => !prev)}}
                  isEnabled={getIsEnabledProponentLegal}
                />
              </View>
                <View style={{marginBottom: '10%'}}>
                  {/*JURÍDICO*/}
                  {getIsEnabledProponentLegal === true &&
                  <>
                    <Styled.TextSubtitle>2.1.1. Dados comerciais</Styled.TextSubtitle>
                    <Modals.ViewImage
                      marginLeft={"5%"}
                      title="Imagem Selecionada"
                      onPressClose={() => {setVisibleImageCompanyRegistration(false)}}
                      visible={getVisibleImageCompanyRegistration}
                      image={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.fichaCadastral?.arquivo}
                    />
                    <Modals.PdfViewer
                      visible={getVisiblePDFCompanyRegistration}
                      onPressClose={() => {setVisiblePDFCompanyRegistration(false)}}
                      resource={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.fichaCadastral?.arquivo}
                    />
                    <Annex
                      viewImage={() => setVisibleImageCompanyRegistration(true)}
                      viewPDF={() => setVisiblePDFCompanyRegistration(true)}
                      PDForIMAGE={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.fichaCadastral?.extensao == 'pdf' ? 1 : 0}
                      cancelTouch={() => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.pjVinculado = {
                          dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
                          nire: ProspectRecord.pjVinculado?.nire,
                          nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
                          numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
                          cNAEs: ProspectRecord.pjVinculado?.cNAEs,
                          cnpj: ProspectRecord.pjVinculado?.cnpj,
                          documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
                          emails: ProspectRecord.pjVinculado?.emails,
                          endereco: ProspectRecord.pjVinculado?.endereco,
                          enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
                          fichaCadastral: undefined,
                          id: ProspectRecord.pjVinculado?.id,
                          ie: ProspectRecord.pjVinculado?.ie,
                          im: ProspectRecord.pjVinculado?.im,
                          juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
                          nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
                          razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
                          telefones: ProspectRecord.pjVinculado?.telefones,
                          cartaoCNPJ: ProspectRecord.pjVinculado?.cartaoCNPJ,
                          certidaoDaJuntaComercial: ProspectRecord.pjVinculado?.certidaoDaJuntaComercial,
                        }
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      library={() => pickLibraryCompanyRegistration()}
                      pdf={() => DocumentPDFCompanyRegistration()}
                      camera={() => requestCompanyRegistrationCameraPermission()}
                      uri={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.fichaCadastral?.arquivo}
                      title='Anexe Ficha Cadastral Da Empresa'
                      base64={true}
                      heightImage={100}
                      widthImage={170}
                      heightPdf={100}
                      widthPdf={170}
                    />
                    <Modals.ViewImage
                      marginLeft={"5%"}
                      title="Imagem Selecionada"
                      onPressClose={() => {setVisibleImageBoardTrade(false)}}
                      visible={getVisibleImageBoardTrade}
                      image={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.certidaoDaJuntaComercial?.arquivo}
                    />
                    <Modals.PdfViewer
                      visible={getVisiblePDFBoardTrade}
                      onPressClose={() => {setVisiblePDFBoardTrade(false)}}
                      resource={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.certidaoDaJuntaComercial?.arquivo}
                    />
                    <Annex
                      viewImage={() => setVisibleImageBoardTrade(true)}
                      viewPDF={() => setVisiblePDFBoardTrade(true)}
                      PDForIMAGE={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.certidaoDaJuntaComercial?.extensao == 'pdf' ? 1 : 0}
                      cancelTouch={() => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.pjVinculado = {
                          dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
                          nire: ProspectRecord.pjVinculado?.nire,
                          nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
                          numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
                          cNAEs: ProspectRecord.pjVinculado?.cNAEs,
                          cnpj: ProspectRecord.pjVinculado?.cnpj,
                          documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
                          emails: ProspectRecord.pjVinculado?.emails,
                          endereco: ProspectRecord.pjVinculado?.endereco,
                          enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
                          fichaCadastral: ProspectRecord.pjVinculado?.fichaCadastral,
                          id: ProspectRecord.pjVinculado?.id,
                          ie: ProspectRecord.pjVinculado?.ie,
                          im: ProspectRecord.pjVinculado?.im,
                          juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
                          nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
                          razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
                          telefones: ProspectRecord.pjVinculado?.telefones,
                          cartaoCNPJ: ProspectRecord.pjVinculado?.cartaoCNPJ,
                          certidaoDaJuntaComercial: undefined,
                        }
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      library={() => pickLibraryBoardTrade()}
                      pdf={() => DocumentPDFBoardTrade()}
                      camera={() => requestBoardTradeCameraPermission()}
                      uri={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.certidaoDaJuntaComercial?.arquivo}
                      title='Anexe Certidão Junta Comercial'
                      base64={true}
                      heightImage={100}
                      widthImage={170}
                      heightPdf={100}
                      widthPdf={170}
                    />
                    <Modals.ViewImage
                      marginLeft={"5%"}
                      title="Imagem Selecionada"
                      onPressClose={() => {setVisibleImageCardCNPJ(false)}}
                      visible={getVisibleImageCardCNPJ}
                      image={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.cartaoCNPJ?.arquivo}
                    />
                    <Modals.PdfViewer
                      visible={getVisiblePDFCardCNPJ}
                      onPressClose={() => {setVisiblePDFCardCNPJ(false)}}
                      resource={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.cartaoCNPJ?.arquivo}
                    />
                    <Annex
                      viewImage={() => setVisibleImageCardCNPJ(true)}
                      viewPDF={() => setVisiblePDFCardCNPJ(true)}
                      PDForIMAGE={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.cartaoCNPJ?.extensao == 'pdf' ? 1 : 0}
                      cancelTouch={() => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.pjVinculado = {
                          dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
                          nire: ProspectRecord.pjVinculado?.nire,
                          nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
                          numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
                          cNAEs: ProspectRecord.pjVinculado?.cNAEs,
                          cnpj: ProspectRecord.pjVinculado?.cnpj,
                          documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
                          emails: ProspectRecord.pjVinculado?.emails,
                          endereco: ProspectRecord.pjVinculado?.endereco,
                          enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
                          fichaCadastral: ProspectRecord.pjVinculado?.fichaCadastral,
                          id: ProspectRecord.pjVinculado?.id,
                          ie: ProspectRecord.pjVinculado?.ie,
                          im: ProspectRecord.pjVinculado?.im,
                          juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
                          nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
                          razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
                          telefones: ProspectRecord.pjVinculado?.telefones,
                          cartaoCNPJ: undefined,
                          certidaoDaJuntaComercial: ProspectRecord.pjVinculado?.certidaoDaJuntaComercial,
                        }
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      library={() => pickLibraryCardCNPJ()}
                      pdf={() => DocumentPDFCardCNPJ()}
                      camera={() => requestCardCNPJCameraPermission()}
                      uri={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.cartaoCNPJ?.arquivo}
                      title='    Anexe o Cartão do CNPJ'
                      base64={true}
                      heightImage={100}
                      widthImage={170}
                      heightPdf={100}
                      widthPdf={170}
                    />
                    <Input
                      onChangeText={(text) => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.pjVinculado = {
                          dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
                          nire: ProspectRecord.pjVinculado?.nire,
                          nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
                          numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
                          cNAEs: ProspectRecord.pjVinculado?.cNAEs,
                          cnpj: TextFormat.CNPJ.DesformatarTexto(text),
                          documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
                          emails: ProspectRecord.pjVinculado?.emails,
                          endereco: ProspectRecord.pjVinculado?.endereco,
                          enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
                          fichaCadastral: ProspectRecord.pjVinculado?.fichaCadastral,
                          id: ProspectRecord.pjVinculado?.id,
                          ie: ProspectRecord.pjVinculado?.ie,
                          im: ProspectRecord.pjVinculado?.im,
                          juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
                          nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
                          razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
                          telefones: ProspectRecord.pjVinculado?.telefones,
                          cartaoCNPJ: ProspectRecord.pjVinculado?.cartaoCNPJ,
                          certidaoDaJuntaComercial: ProspectRecord.pjVinculado?.certidaoDaJuntaComercial,
                        }
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={TextFormat.CNPJ.FormatarTexto(props.getProspectsList[props.getIndexProspects]?.pjVinculado?.cnpj)} titleInput='CNPJ' keyboardType='number-pad'
                    />
                    <Input
                      onChangeText={(text) => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.pjVinculado = {
                          dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
                          nire: ProspectRecord.pjVinculado?.nire,
                          nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
                          numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
                          cNAEs: ProspectRecord.pjVinculado?.cNAEs,
                          cnpj: ProspectRecord.pjVinculado?.cnpj,
                          documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
                          emails: ProspectRecord.pjVinculado?.emails,
                          endereco: ProspectRecord.pjVinculado?.endereco,
                          enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
                          fichaCadastral: ProspectRecord.pjVinculado?.fichaCadastral,
                          id: ProspectRecord.pjVinculado?.id,
                          ie: ProspectRecord.pjVinculado?.ie,
                          im: ProspectRecord.pjVinculado?.im,
                          juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
                          nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
                          razaoSocial: text,
                          telefones: ProspectRecord.pjVinculado?.telefones,
                          cartaoCNPJ: ProspectRecord.pjVinculado?.cartaoCNPJ,
                          certidaoDaJuntaComercial: ProspectRecord.pjVinculado?.certidaoDaJuntaComercial,
                        }
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.razaoSocial} titleInput='Razão social' keyboardType='default'
                    />
                    <Input
                      onChangeText={(text) => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.pjVinculado = {
                          dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
                          nire: ProspectRecord.pjVinculado?.nire,
                          nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
                          numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
                          cNAEs: ProspectRecord.pjVinculado?.cNAEs,
                          cnpj: ProspectRecord.pjVinculado?.cnpj,
                          documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
                          emails: ProspectRecord.pjVinculado?.emails,
                          endereco: ProspectRecord.pjVinculado?.endereco,
                          enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
                          fichaCadastral: ProspectRecord.pjVinculado?.fichaCadastral,
                          id: ProspectRecord.pjVinculado?.id,
                          ie: ProspectRecord.pjVinculado?.ie,
                          im: ProspectRecord.pjVinculado?.im,
                          juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
                          nomeFantasia: text,
                          razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
                          telefones: ProspectRecord.pjVinculado?.telefones,
                          cartaoCNPJ: ProspectRecord.pjVinculado?.cartaoCNPJ,
                          certidaoDaJuntaComercial: ProspectRecord.pjVinculado?.certidaoDaJuntaComercial,
                        }
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.nomeFantasia} titleInput='Nome fantasia' keyboardType='default'
                    />
                    <Input
                      onChangeText={(text) => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.pjVinculado = {
                          dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
                          nire: text,
                          nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
                          numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
                          cNAEs: ProspectRecord.pjVinculado?.cNAEs,
                          cnpj: ProspectRecord.pjVinculado?.cnpj,
                          documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
                          emails: ProspectRecord.pjVinculado?.emails,
                          endereco: ProspectRecord.pjVinculado?.endereco,
                          enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
                          fichaCadastral: ProspectRecord.pjVinculado?.fichaCadastral,
                          id: ProspectRecord.pjVinculado?.id,
                          ie: ProspectRecord.pjVinculado?.ie,
                          im: ProspectRecord.pjVinculado?.im,
                          juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
                          nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
                          razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
                          telefones: ProspectRecord.pjVinculado?.telefones,
                          cartaoCNPJ: ProspectRecord.pjVinculado?.cartaoCNPJ,
                          certidaoDaJuntaComercial: ProspectRecord.pjVinculado?.certidaoDaJuntaComercial,
                        }
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.nire} titleInput='NIRE' keyboardType='number-pad' placeholder='00000000000' placeholderTextColor={blurredColor}
                    />
                    <Input
                      onChangeText={(text) => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.pjVinculado = {
                          dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
                          nire: ProspectRecord.pjVinculado?.nire,
                          nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
                          numeroCertidaoSimplificada: text,
                          cNAEs: ProspectRecord.pjVinculado?.cNAEs,
                          cnpj: ProspectRecord.pjVinculado?.cnpj,
                          documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
                          emails: ProspectRecord.pjVinculado?.emails,
                          endereco: ProspectRecord.pjVinculado?.endereco,
                          enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
                          fichaCadastral: ProspectRecord.pjVinculado?.fichaCadastral,
                          id: ProspectRecord.pjVinculado?.id,
                          ie: ProspectRecord.pjVinculado?.ie,
                          im: ProspectRecord.pjVinculado?.im,
                          juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
                          nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
                          razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
                          telefones: ProspectRecord.pjVinculado?.telefones,
                          cartaoCNPJ: ProspectRecord.pjVinculado?.cartaoCNPJ,
                          certidaoDaJuntaComercial: ProspectRecord.pjVinculado?.certidaoDaJuntaComercial,
                        }
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.numeroCertidaoSimplificada} titleInput='Certidão Simplificada Nº' keyboardType='number-pad' placeholder='0000' placeholderTextColor={blurredColor}
                    />
                    <Input
                      onChangeText={(text) => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.pjVinculado = {
                          dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
                          nire: ProspectRecord.pjVinculado?.nire,
                          nomeCertidaoSimplificada: text,
                          numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
                          cNAEs: ProspectRecord.pjVinculado?.cNAEs,
                          cnpj: ProspectRecord.pjVinculado?.cnpj,
                          documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
                          emails: ProspectRecord.pjVinculado?.emails,
                          endereco: ProspectRecord.pjVinculado?.endereco,
                          enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
                          fichaCadastral: ProspectRecord.pjVinculado?.fichaCadastral,
                          id: ProspectRecord.pjVinculado?.id,
                          ie: ProspectRecord.pjVinculado?.ie,
                          im: ProspectRecord.pjVinculado?.im,
                          juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
                          nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
                          razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
                          telefones: ProspectRecord.pjVinculado?.telefones,
                          cartaoCNPJ: ProspectRecord.pjVinculado?.cartaoCNPJ,
                          certidaoDaJuntaComercial: ProspectRecord.pjVinculado?.certidaoDaJuntaComercial,
                        }
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.nomeCertidaoSimplificada} titleInput='Nome da Certidão' keyboardType='default' placeholder='Nome da Certidão' placeholderTextColor={blurredColor}
                    />
                    <TouchInput 
                      onPress={() => setVisibleDateIncorporation(true)}
                      selectedInput={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.dataArqAtoConst ? moment(props.getProspectsList[props.getIndexProspects]?.pjVinculado?.dataArqAtoConst).format("DD/MM/YYYY") : undefined} titleInput='Dt. ato constitutivo'
                    />
                    <Styled.TextSubtitle>2.1.2. Endereço comercial</Styled.TextSubtitle>
                    <Modals.ViewImage
                      marginLeft={"5%"}
                      title="Imagem Selecionada"
                      onPressClose={() => {setVisibleImageCompanyAddress(false)}}
                      visible={getVisibleImageCompanyAddress}
                      image={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.documentoEndereco?.arquivo}
                    />
                    <Modals.PdfViewer
                      visible={getVisiblePDFCompanyAddress}
                      onPressClose={() => {setVisiblePDFCompanyAddress(false)}}
                      resource={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.documentoEndereco?.arquivo}
                    />
                    <Annex
                      viewImage={() => setVisibleImageCompanyAddress(true)}
                      viewPDF={() => setVisiblePDFCompanyAddress(true)}
                      PDForIMAGE={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.documentoEndereco?.extensao == 'pdf' ? 1 : 0}
                      cancelTouch={() => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.pjVinculado = {
                          dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
                          nire: ProspectRecord.pjVinculado?.nire,
                          nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
                          numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
                          cNAEs: ProspectRecord.pjVinculado?.cNAEs,
                          cnpj: ProspectRecord.pjVinculado?.cnpj,
                          documentoEndereco: undefined,
                          emails: ProspectRecord.pjVinculado?.emails,
                          endereco: ProspectRecord.pjVinculado?.endereco,
                          enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
                          fichaCadastral: ProspectRecord.pjVinculado?.fichaCadastral,
                          id: ProspectRecord.pjVinculado?.id,
                          ie: ProspectRecord.pjVinculado?.ie,
                          im: ProspectRecord.pjVinculado?.im,
                          juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
                          nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
                          razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
                          telefones: ProspectRecord.pjVinculado?.telefones,
                          cartaoCNPJ: ProspectRecord.pjVinculado?.cartaoCNPJ,
                          certidaoDaJuntaComercial: ProspectRecord.pjVinculado?.certidaoDaJuntaComercial,
                        }
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      library={() => pickLibraryCompanyAddress()}
                      pdf={() => DocumentPDFCompanyAddress()}
                      camera={() => requestCompanyAddressCameraPermission()}
                      uri={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.documentoEndereco?.arquivo}
                      title='Anexe Comprovante De Endereço'
                      base64={true}
                      heightImage={100}
                      widthImage={170}
                      heightPdf={100}
                      widthPdf={170}
                    />
                    <Input onChangeText={(text) => {
                        if(text?.length == 8) {
                          CEPCompany(text);
                        };
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.pjVinculado = {
                          dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
                          nire: ProspectRecord.pjVinculado?.nire,
                          nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
                          numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
                          cNAEs: ProspectRecord.pjVinculado?.cNAEs,
                          cnpj: ProspectRecord.pjVinculado?.cnpj,
                          documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
                          emails: ProspectRecord.pjVinculado?.emails,
                          endereco: {
                            bairro: ProspectRecord.pjVinculado?.endereco?.bairro,
                            cep: text,
                            cidade: ProspectRecord.pjVinculado?.endereco?.cidade,
                            classificacao: ProspectRecord.pjVinculado?.endereco?.classificacao,
                            complemento: ProspectRecord.pjVinculado?.endereco?.complemento,
                            logradouro: ProspectRecord.pjVinculado?.endereco?.logradouro,
                            numero: ProspectRecord.pjVinculado?.endereco?.numero,
                            uf: ProspectRecord.pjVinculado?.endereco?.uf,
                          },
                          enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
                          fichaCadastral: ProspectRecord.pjVinculado?.fichaCadastral,
                          id: ProspectRecord.pjVinculado?.id,
                          ie: ProspectRecord.pjVinculado?.ie,
                          im: ProspectRecord.pjVinculado?.im,
                          juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
                          nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
                          razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
                          telefones: ProspectRecord.pjVinculado?.telefones,
                          cartaoCNPJ: ProspectRecord.pjVinculado?.cartaoCNPJ,
                          certidaoDaJuntaComercial: ProspectRecord.pjVinculado?.certidaoDaJuntaComercial,
                        }
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.endereco?.cep} titleInput='CEP' keyboardType='numeric' 
                    />
                    <Input onChangeText={(text) => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.pjVinculado = {
                          dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
                          nire: ProspectRecord.pjVinculado?.nire,
                          nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
                          numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
                          cNAEs: ProspectRecord.pjVinculado?.cNAEs,
                          cnpj: ProspectRecord.pjVinculado?.cnpj,
                          documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
                          emails: ProspectRecord.pjVinculado?.emails,
                          endereco: {
                            bairro: ProspectRecord.pjVinculado?.endereco?.bairro,
                            cep: ProspectRecord.pjVinculado?.endereco?.cep,
                            cidade: ProspectRecord.pjVinculado?.endereco?.cidade,
                            classificacao: ProspectRecord.pjVinculado?.endereco?.classificacao,
                            complemento: ProspectRecord.pjVinculado?.endereco?.complemento,
                            logradouro: text,
                            numero: ProspectRecord.pjVinculado?.endereco?.numero,
                            uf: ProspectRecord.pjVinculado?.endereco?.uf,
                          },
                          enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
                          fichaCadastral: ProspectRecord.pjVinculado?.fichaCadastral,
                          id: ProspectRecord.pjVinculado?.id,
                          ie: ProspectRecord.pjVinculado?.ie,
                          im: ProspectRecord.pjVinculado?.im,
                          juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
                          nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
                          razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
                          telefones: ProspectRecord.pjVinculado?.telefones,
                          cartaoCNPJ: ProspectRecord.pjVinculado?.cartaoCNPJ,
                          certidaoDaJuntaComercial: ProspectRecord.pjVinculado?.certidaoDaJuntaComercial,
                        }
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.endereco?.logradouro} titleInput='Logradouro' keyboardType='default'
                    />
                    <Input onChangeText={(text) => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.pjVinculado = {
                          dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
                          nire: ProspectRecord.pjVinculado?.nire,
                          nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
                          numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
                          cNAEs: ProspectRecord.pjVinculado?.cNAEs,
                          cnpj: ProspectRecord.pjVinculado?.cnpj,
                          documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
                          emails: ProspectRecord.pjVinculado?.emails,
                          endereco: {
                            bairro: ProspectRecord.pjVinculado?.endereco?.bairro,
                            cep: ProspectRecord.pjVinculado?.endereco?.cep,
                            cidade: ProspectRecord.pjVinculado?.endereco?.cidade,
                            classificacao: ProspectRecord.pjVinculado?.endereco?.classificacao,
                            complemento: ProspectRecord.pjVinculado?.endereco?.complemento,
                            logradouro: ProspectRecord.pjVinculado?.endereco?.logradouro,
                            numero: text,
                            uf: ProspectRecord.pjVinculado?.endereco?.uf,
                          },
                          enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
                          fichaCadastral: ProspectRecord.pjVinculado?.fichaCadastral,
                          id: ProspectRecord.pjVinculado?.id,
                          ie: ProspectRecord.pjVinculado?.ie,
                          im: ProspectRecord.pjVinculado?.im,
                          juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
                          nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
                          razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
                          telefones: ProspectRecord.pjVinculado?.telefones,
                          cartaoCNPJ: ProspectRecord.pjVinculado?.cartaoCNPJ,
                          certidaoDaJuntaComercial: ProspectRecord.pjVinculado?.certidaoDaJuntaComercial,
                        }
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.endereco?.numero} titleInput='Numero' keyboardType='default'
                    />
                    <Input onChangeText={(text) => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.pjVinculado = {
                          dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
                          nire: ProspectRecord.pjVinculado?.nire,
                          nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
                          numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
                          cNAEs: ProspectRecord.pjVinculado?.cNAEs,
                          cnpj: ProspectRecord.pjVinculado?.cnpj,
                          documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
                          emails: ProspectRecord.pjVinculado?.emails,
                          endereco: {
                            bairro: ProspectRecord.pjVinculado?.endereco?.bairro,
                            cep: ProspectRecord.pjVinculado?.endereco?.cep,
                            cidade: ProspectRecord.pjVinculado?.endereco?.cidade,
                            classificacao: ProspectRecord.pjVinculado?.endereco?.classificacao,
                            complemento: text,
                            logradouro: ProspectRecord.pjVinculado?.endereco?.logradouro,
                            numero: ProspectRecord.pjVinculado?.endereco?.numero,
                            uf: ProspectRecord.pjVinculado?.endereco?.uf,
                          },
                          enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
                          fichaCadastral: ProspectRecord.pjVinculado?.fichaCadastral,
                          id: ProspectRecord.pjVinculado?.id,
                          ie: ProspectRecord.pjVinculado?.ie,
                          im: ProspectRecord.pjVinculado?.im,
                          juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
                          nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
                          razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
                          telefones: ProspectRecord.pjVinculado?.telefones,
                          cartaoCNPJ: ProspectRecord.pjVinculado?.cartaoCNPJ,
                          certidaoDaJuntaComercial: ProspectRecord.pjVinculado?.certidaoDaJuntaComercial,
                        }
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.endereco?.complemento} titleInput='Complemento' keyboardType='default'
                    />
                    <Input onChangeText={(text) => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.pjVinculado = {
                          dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
                          nire: ProspectRecord.pjVinculado?.nire,
                          nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
                          numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
                          cNAEs: ProspectRecord.pjVinculado?.cNAEs,
                          cnpj: ProspectRecord.pjVinculado?.cnpj,
                          documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
                          emails: ProspectRecord.pjVinculado?.emails,
                          endereco: {
                            bairro: text,
                            cep: ProspectRecord.pjVinculado?.endereco?.cep,
                            cidade: ProspectRecord.pjVinculado?.endereco?.cidade,
                            classificacao: ProspectRecord.pjVinculado?.endereco?.classificacao,
                            complemento: ProspectRecord.pjVinculado?.endereco?.complemento,
                            logradouro: ProspectRecord.pjVinculado?.endereco?.logradouro,
                            numero: ProspectRecord.pjVinculado?.endereco?.numero,
                            uf: ProspectRecord.pjVinculado?.endereco?.uf,
                          },
                          enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
                          fichaCadastral: ProspectRecord.pjVinculado?.fichaCadastral,
                          id: ProspectRecord.pjVinculado?.id,
                          ie: ProspectRecord.pjVinculado?.ie,
                          im: ProspectRecord.pjVinculado?.im,
                          juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
                          nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
                          razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
                          telefones: ProspectRecord.pjVinculado?.telefones,
                          cartaoCNPJ: ProspectRecord.pjVinculado?.cartaoCNPJ,
                          certidaoDaJuntaComercial: ProspectRecord.pjVinculado?.certidaoDaJuntaComercial,
                        }
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.endereco?.bairro} titleInput='Bairro' keyboardType='default'
                    />
                    <Input onChangeText={(text) => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.pjVinculado = {
                          dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
                          nire: ProspectRecord.pjVinculado?.nire,
                          nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
                          numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
                          cNAEs: ProspectRecord.pjVinculado?.cNAEs,
                          cnpj: ProspectRecord.pjVinculado?.cnpj,
                          documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
                          emails: ProspectRecord.pjVinculado?.emails,
                          endereco: {
                            bairro: ProspectRecord.pjVinculado?.endereco?.bairro,
                            cep: ProspectRecord.pjVinculado?.endereco?.cep,
                            cidade: text,
                            classificacao: ProspectRecord.pjVinculado?.endereco?.classificacao,
                            complemento: ProspectRecord.pjVinculado?.endereco?.complemento,
                            logradouro: ProspectRecord.pjVinculado?.endereco?.logradouro,
                            numero: ProspectRecord.pjVinculado?.endereco?.numero,
                            uf: ProspectRecord.pjVinculado?.endereco?.uf,
                          },
                          enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
                          fichaCadastral: ProspectRecord.pjVinculado?.fichaCadastral,
                          id: ProspectRecord.pjVinculado?.id,
                          ie: ProspectRecord.pjVinculado?.ie,
                          im: ProspectRecord.pjVinculado?.im,
                          juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
                          nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
                          razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
                          telefones: ProspectRecord.pjVinculado?.telefones,
                          cartaoCNPJ: ProspectRecord.pjVinculado?.cartaoCNPJ,
                          certidaoDaJuntaComercial: ProspectRecord.pjVinculado?.certidaoDaJuntaComercial,
                        }
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.endereco?.cidade} titleInput='Cidade' keyboardType='default'
                    />
                    <TouchInput 
                      onPress={() => {setVisibleUF_AddressLegalProponent(true); setUF(List.UF)}}
                      selectedInput={props.getProspectsList[props.getIndexProspects]?.pjVinculado?.endereco?.uf} titleInput='UF'
                    />
                  </>}
                  
                  {/*DADOS PESSOAIS*/}
                  <>
                    <Styled.TextSubtitle>{getIsEnabledProponentLegal ? '2.1.3.' : '2.1.1.'} Dados pessoais</Styled.TextSubtitle>
                    <Modals.ViewImage
                      marginLeft={"5%"}
                      title="Imagem Selecionada"
                      onPressClose={() => {setVisibleImageIdentification(false)}}
                      visible={getVisibleImageIdentification}
                      image={props.getProspectsList[props.getIndexProspects]?.documentoPessoal?.arquivo}
                    />
                    <Modals.PdfViewer
                      visible={getVisiblePDFIdentification}
                      onPressClose={() => {setVisiblePDFIdentification(false)}}
                      resource={props.getProspectsList[props.getIndexProspects]?.documentoPessoal?.arquivo}
                    />
                    <Annex
                      viewImage={() => setVisibleImageIdentification(true)}
                      viewPDF={() => setVisiblePDFIdentification(true)}
                      PDForIMAGE={props.getProspectsList[props.getIndexProspects]?.documentoPessoal?.extensao == 'pdf' ? 1 : 0}
                      cancelTouch={() => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.documentoPessoal = undefined;
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      library={() => pickLibraryIdentification()}
                      pdf={() => DocumentPDFIdentification()}
                      camera={() => requestIdentificationCameraPermission()}
                      uri={props.getProspectsList[props.getIndexProspects]?.documentoPessoal?.arquivo}
                      title='Anexe um Documento Pessoal'
                      base64={true}
                      heightImage={100}
                      widthImage={170}
                      heightPdf={100}
                      widthPdf={170}
                    />
                    <Input
                      key='cpf'
                      onChangeText={(text) => {
                        text = TextFormat.CPF.DesformatarTexto(text);
                        if(text.length == 11) {
                          CPFConsultationProponent(text)
                        }
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.cpf = TextFormat.CPF.DesformatarTexto(text);
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={TextFormat.CPF.FormatarTexto(props.getProspectsList[props.getIndexProspects]?.cpf)} titleInput='CPF' keyboardType='number-pad' placeholder={TextFormat.CPF.FormatarTexto("00000000000")} placeholderTextColor={blurredColor}
                    />
                    <Input
                      key='name'
                      onChangeText={(text) => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.nome = text.length == 0 ? undefined : text;
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.nome} titleInput='Nome' keyboardType='default' placeholder="Nome e Sobrenome" placeholderTextColor={blurredColor}
                    />
                    <TouchInput 
                      key='birth'
                      onPress={() => {setOpenBirth(true)}}
                      colorWithNothingSelected={props.getProspectsList[props.getIndexProspects]?.dataDeNascimento ? undefined : blurredColor}
                      selectedInput={props.getProspectsList[props.getIndexProspects]?.dataDeNascimento ? moment(props.getProspectsList[props.getIndexProspects]?.dataDeNascimento).format("DD/MM/YYYY") : "00/00/0000"} titleInput='Dt. Nascimento'
                    />
                    <TouchInput 
                      key='nationality'
                      onPress={() => {setVisibleNationality(true)}}
                      selectedInput={props.getProspectsList[props.getIndexProspects]?.nacionalidade?.nacionalidade} titleInput='Nacionalidade'
                    />
                    <TouchInput 
                      key='naturality (uf)'
                      onPress={() => {setVisibleUF(true); setUF(List.UF)}}
                      colorWithNothingSelected={blurredColor}
                      colorOptionalInput={blurredColor}
                      selectedInput={props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf ? props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf : ""} titleInput='Naturalidade (UF)'
                    />
                    <TouchInput 
                      key='naturality (city)'
                      onPress={() => {setVisibleNaturalnessCity(true)}}
                      colorWithNothingSelected={blurredColor}
                      colorOptionalInput={blurredColor}
                      selectedInput={props.getProspectsList[props.getIndexProspects]?.naturalidade?.cidade ? props.getProspectsList[props.getIndexProspects]?.naturalidade?.cidade : ""} titleInput='Naturalidade (Cidade)'
                    />
                    <TouchInput 
                      key='marital status'
                      onPress={() => {setVisibleMaritalStatus(true)}}
                      selectedInput={props.getProspectsList[props.getIndexProspects]?.estadoCivil == 1 ? "Solteiro(a)" : props.getProspectsList[props.getIndexProspects]!?.estadoCivil == 2 ? "Casado(a)" : props.getProspectsList[props.getIndexProspects]?.estadoCivil == 3 ? "Divorciado(a)" : props.getProspectsList[props.getIndexProspects]?.estadoCivil == 4 ? "Desquitado(a)" : props.getProspectsList[props.getIndexProspects]?.estadoCivil == 5 ? "Separado(a)" : props.getProspectsList[props.getIndexProspects]?.estadoCivil == 6 ? "Viúvo(a)"  : props.getProspectsList[props.getIndexProspects]?.estadoCivil == 7 ? "União estável" :  ""} titleInput='Estado Civil'
                    />

                    {props.getProspectsList[props.getIndexProspects]?.estadoCivil &&
                    <>
                      <Annex
                        viewImage={() => setVisibleImageMaritalStatus(true)}
                        viewPDF={() => setVisiblePDFMaritalStatus(true)}
                        PDForIMAGE={props.getProspectsList[props.getIndexProspects]?.documentoDeEstadoCivil?.extensao == 'pdf' ? 1 : 0}
                        cancelTouch={() => {
                          let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                          ProspectRecord.documentoDeEstadoCivil = undefined
                          props.setProspectsList([...props.getProspectsList]);
                        }}
                        library={() => pickLibraryMaritalStatus()}
                        pdf={() => DocumentPDFMaritalStatus()}
                        camera={() => requestMaritalStatusCameraPermission()}
                        uri={props.getProspectsList[props.getIndexProspects]?.documentoDeEstadoCivil?.arquivo}
                        title={`Anexe a ${props.getProspectsList[props.getIndexProspects]?.estadoCivil == 1 ? "Certidão de nascimento" : props.getProspectsList[props.getIndexProspects]?.estadoCivil == 2 ? "Certidão de casamento" : props.getProspectsList[props.getIndexProspects]?.estadoCivil == 3 ? "Certidão de divórcio" : props.getProspectsList[props.getIndexProspects]?.estadoCivil == 4 ? "Declaração de desquite" : props.getProspectsList[props.getIndexProspects]?.estadoCivil == 5 ? "Certidão de casamento" : props.getProspectsList[props.getIndexProspects]?.estadoCivil == 6 ? "Certidão de casamento"  : props.getProspectsList[props.getIndexProspects]?.estadoCivil == 7 ? "Certidão de escritura de união" :  ""}`}
                        base64={true}
                        heightImage={100}
                        widthImage={170}
                        heightPdf={100}
                        widthPdf={170}
                      />
                      <Modals.ViewImage
                        marginLeft={"5%"}
                        title="Imagem Selecionada"
                        onPressClose={() => {setVisibleImageMaritalStatus(false)}}
                        visible={getVisibleImageMaritalStatus}
                        image={props.getProspectsList[props.getIndexProspects]?.documentoDeEstadoCivil?.arquivo}
                      />
                      <Modals.PdfViewer
                        visible={getVisiblePDFMaritalStatus}
                        onPressClose={() => {setVisiblePDFMaritalStatus(false)}}
                        resource={props.getProspectsList[props.getIndexProspects]?.documentoDeEstadoCivil?.arquivo}
                      />
                    </>}
                    {props.getProspectsList![props.getIndexProspects]!?.estadoCivil == 2 &&
                    <>
                      <TouchInput 
                        key='property regime'
                        onPress={() => {setVisiblePropertyRegime(true)}}
                        colorWithNothingSelected={blurredColor}
                        colorOptionalInput={blurredColor}
                        selectedInput={props.getProspectsList[props.getIndexProspects].regimeDeCasamento?.descricao ? props.getProspectsList[props.getIndexProspects].regimeDeCasamento?.descricao : ""} titleInput='Regime de Bens'
                      />
                      <Input
                        key='certificate number'
                        onChangeText={(text) => {
                          let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                          ProspectRecord.numeroDeCertidao = text;
                          props.setProspectsList([...props.getProspectsList]);
                        }}
                        nameInput={props.getProspectsList[props.getIndexProspects]?.numeroDeCertidao} titleInput='N.º Certidão' keyboardType='default' placeholder={TextFormat.CPF.FormatarTexto("00000000000")} placeholderTextColor={blurredColor} colorOptionalInput={blurredColor} colorWithNothing={blurredColor}
                      />
                      <TouchInput 
                        key='wedding date'
                        onPress={() => {setVisibleWeddingDate(true)}}
                        colorWithNothingSelected={blurredColor}
                        colorOptionalInput={blurredColor}
                        selectedInput={props.getProspectsList[props.getIndexProspects]?.dataDeCasamento ? moment(props.getProspectsList[props.getIndexProspects]?.dataDeCasamento).format("DD/MM/YYYY") : ""} titleInput='Dt. Casamento'
                      />
                    </>}
                    <Input
                      key='personal income'
                      onChangeText={(text) => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        let typedText = TextFormat.Moeda.DesformatarTexto(text);
                        Number(typedText)
                        ProspectRecord.renda = typedText
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      value={TextFormat.Moeda.FormatarTexto(props.getProspectsList[props.getIndexProspects]?.renda)} titleInput='Renda Pessoal' keyboardType='number-pad' placeholder={TextFormat.Moeda.FormatarTexto(0)} placeholderTextColor={blurredColor} colorOptionalInput={blurredColor} colorWithNothing={blurredColor}
                    />
                    <Input
                      key='email'
                      onChangeText={(text) => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.emails = [{
                          classificacao: 1,
                          descricao: text,
                        }];
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.emails?.map(email => email.descricao)} titleInput='Email' keyboardType='email-address' placeholder="email@dominio.com.br" placeholderTextColor={blurredColor}
                    />
                    <Input
                      key='cell phone'
                      onChangeText={(text) => {
                        let ProspectsList = [...props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        let Registro = {
                          classificacao: 1,
                          ddi: "55",
                          ddd: text.length <= 2 ? (text) : TextFormat.Telefone.ObterDDD(TextFormat.Telefone.DesformatarTexto(text)),
                          numero: TextFormat.Telefone.ObterNumero(TextFormat.Telefone.DesformatarTexto(text))
                        } as Object_.Telefone;
                        props.setCellPhone(Registro);
                        ProspectRecord.telefones = ProspectRecord.telefones ?? [];
                        let index = ProspectRecord.telefones?.findIndex((Item) => Item.classificacao == Registro.classificacao)
                        if(index != -1) {
                          ProspectRecord.telefones?.splice(index, 1);
                          ProspectRecord.telefones?.push(Registro);
                        } else {
                          ProspectRecord.telefones?.push(Registro);
                        };
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      value={TextFormat.Telefone.FormatarTexto(props.getCellPhone ? (props.getCellPhone?.ddd + props.getCellPhone?.numero) : "")} titleInput='Tel. celular' keyboardType='number-pad' placeholder="(00) 000000000" placeholderTextColor={blurredColor}
                    />
                    <Input
                      key='comercial phone'
                      onChangeText={(text) => {
                        let ProspectsList = [...props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        let Registro = {
                          classificacao: 2,
                          ddi: "55",
                          ddd: text.length <= 2 ? (text) : TextFormat.Telefone.ObterDDD(TextFormat.Telefone.DesformatarTexto(text)),
                          numero: TextFormat.Telefone.ObterNumero(TextFormat.Telefone.DesformatarTexto(text))
                        } as Object_.Telefone;
                        props.setComercialPhone(Registro);
                        ProspectRecord.telefones = ProspectRecord.telefones ?? [];
                        let index = ProspectRecord.telefones?.findIndex((Item) => Item.classificacao == Registro.classificacao)
                        if(index != -1) {
                          ProspectRecord.telefones?.splice(index, 1);
                          ProspectRecord.telefones?.push(Registro);
                        } else {
                          ProspectRecord.telefones?.push(Registro);
                        };
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      value={TextFormat.Telefone.FormatarTexto(props.getComercialPhone ? (props.getComercialPhone?.ddd + props.getComercialPhone?.numero) : "")} titleInput='Tel. comercial' keyboardType='number-pad' placeholder="(00) 000000000" placeholderTextColor={blurredColor} colorOptionalInput={blurredColor} colorWithNothing={blurredColor}
                    />
                    <Input
                      key='profession'
                      onChangeText={(text) => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.ocupacao = {
                          nome: text,
                        } as Object_.Ocupacao
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.ocupacao?.nome} titleInput='Profissão' keyboardType='default' placeholder="Profissão ou cargo" placeholderTextColor={blurredColor}
                    />
                    <Input
                      key="father's name"
                      onChangeText={(text) => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.filiacao01 = text;
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.filiacao01} titleInput='Nome do Pai' keyboardType='default' placeholder="Nome e Sobrenome" placeholderTextColor={blurredColor} colorOptionalInput={blurredColor} colorWithNothing={blurredColor}
                    />
                    <Input
                      key="mother's name"
                      onChangeText={(text) => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.filiacao02 = text;
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.filiacao02} titleInput='Nome da Mãe' keyboardType='default' placeholder="Nome e Sobrenome" placeholderTextColor={blurredColor} colorOptionalInput={blurredColor} colorWithNothing={blurredColor}
                    />
                    <Input
                      key='rg number'
                      onChangeText={(text) => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.rg = {
                          numero: text,
                          orgaoEmissor: ProspectRecord.rg?.orgaoEmissor,
                          uf: ProspectRecord.rg?.uf,
                        }
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.rg?.numero} titleInput='RG (Número)' placeholder="00.000-00" keyboardType='default' placeholderTextColor={blurredColor}
                    />
                    <Input
                      key='rg issuing agency'
                      onChangeText={(text) => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.rg = {
                          numero: ProspectRecord.rg?.numero,
                          orgaoEmissor: text,
                          uf: ProspectRecord.rg?.uf,
                        }
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.rg?.orgaoEmissor} titleInput='RG (Órgão Emissor)' placeholder="XXX" keyboardType='default' placeholderTextColor={blurredColor}
                    />
                    <TouchInput 
                      key='rg uf'
                      onPress={() => {setVisibleUF_RGProponent(true); setUF(List.UF)}}
                      selectedInput={props.getProspectsList[props.getIndexProspects]?.rg?.uf ? props.getProspectsList[props.getIndexProspects]?.rg?.uf : ""} titleInput='RG (UF)' 
                    />
                    <Input
                      key='cnh number'
                      onChangeText={(text) => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.cnh = {
                          numero: text,
                          dataDeEmissao: ProspectRecord.cnh?.dataDeEmissao,
                          uf: ProspectRecord.cnh?.uf,
                        };
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.cnh?.numero} titleInput='CNH (Número)' keyboardType='default' placeholder="0000000" placeholderTextColor={blurredColor} colorOptionalInput={blurredColor} colorWithNothing={blurredColor}
                    />
                    <TouchInput 
                      key='cnh expedition date'
                      onPress={() => {setVisibleExpeditionDate(true)}}
                      colorWithNothingSelected={blurredColor}
                      colorOptionalInput={blurredColor}
                      selectedInput={props.getProspectsList[props.getIndexProspects]?.cnh?.dataDeEmissao ? moment(props.getProspectsList[props.getIndexProspects]?.cnh?.dataDeEmissao).format("DD/MM/YYYY") : ""} titleInput='CNH (Dt. de Exped.)'
                    />
                    <TouchInput 
                      key='cnh uf'
                      onPress={() => {setVisibleCNH_UFProponent(true); setUF(List.UF)}}
                      colorWithNothingSelected={blurredColor}
                      colorOptionalInput={blurredColor}
                      selectedInput={props.getProspectsList[props.getIndexProspects]?.cnh?.uf} titleInput='CNH (UF)'
                    />
                  </>

                  {/*ENDERECO PESSOAL*/}
                  <>
                    <Styled.TextSubtitle>{getIsEnabledProponentLegal ? '2.1.4.' : '2.1.2.'} Endereço residencial</Styled.TextSubtitle>
                    <Annex
                      viewImage={() => setVisibleImageAddress(true)}
                      viewPDF={() => setVisiblePDFAddress(true)}
                      PDForIMAGE={props.getProspectsList[props.getIndexProspects]?.documentoEndereco?.extensao == 'pdf' ? 1 : 0}
                      cancelTouch={() => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.documentoEndereco = undefined
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      library={() => pickLibraryResponsibleAddress()}
                      pdf={() => DocumentPDFResponsibleAddress()}
                      camera={() => requestResponsibleAddressCameraPermission()}
                      uri={props.getProspectsList[props.getIndexProspects]?.documentoEndereco?.arquivo}
                      title='Anexe o Comprovante de Endereço'
                      base64={true}
                      heightImage={100}
                      widthImage={170}
                      heightPdf={100}
                      widthPdf={170}
                    />
                    <Modals.ViewImage
                      marginLeft={"5%"}
                      title="Imagem Selecionada"
                      onPressClose={() => {setVisibleImageAddress(false)}}
                      visible={getVisibleImageAddress}
                      image={props.getProspectsList[props.getIndexProspects]?.documentoEndereco?.arquivo}
                    />
                    <Modals.PdfViewer
                      visible={getVisiblePDFAddress}
                      onPressClose={() => {setVisiblePDFAddress(false)}}
                      resource={props.getProspectsList[props.getIndexProspects]?.documentoEndereco?.arquivo}
                    />
                    <Input
                      key='cep'
                      onChangeText={(text) => {
                        text = TextFormat.CEP.DesformatarTexto(text)
                        if(text?.length == 8) CEP(text);
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.endereco = {
                          bairro: ProspectRecord.endereco?.bairro,
                          cep: text,
                          cidade: ProspectRecord.endereco?.cidade,
                          complemento: ProspectRecord.endereco?.complemento,
                          logradouro: ProspectRecord.endereco?.logradouro,
                          numero: ProspectRecord.endereco?.numero,
                          uf: ProspectRecord.endereco?.uf,
                        }
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={TextFormat.CEP.FormatarTexto(props.getProspectsList[props.getIndexProspects]?.endereco?.cep)} titleInput='CEP' keyboardType='numeric'
                    />
                    <Input
                      key='public place'
                      onChangeText={(text) => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.endereco = {
                          bairro: ProspectRecord.endereco?.bairro,
                          cep: ProspectRecord.endereco?.cep,
                          cidade: ProspectRecord.endereco?.cidade,
                          complemento: ProspectRecord.endereco?.complemento,
                          logradouro: text,
                          numero: ProspectRecord.endereco?.numero,
                          uf: ProspectRecord.endereco?.uf,
                        }
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.endereco?.logradouro} titleInput='Logradouro' keyboardType='default'
                    />
                    <Input
                      key='number'
                      onChangeText={(text) => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.endereco = {
                          bairro: ProspectRecord.endereco?.bairro,
                          cep: ProspectRecord.endereco?.cep,
                          cidade: ProspectRecord.endereco?.cidade,
                          complemento: ProspectRecord.endereco?.complemento,
                          logradouro: ProspectRecord.endereco?.logradouro,
                          numero: text,
                          uf: ProspectRecord.endereco?.uf,
                        };
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.endereco?.numero} titleInput='Número' keyboardType='default'
                    />
                    <Input
                      key='complement'
                      onChangeText={(text) => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.endereco = {
                          bairro: ProspectRecord.endereco?.bairro,
                          cep: ProspectRecord.endereco?.cep,
                          cidade: ProspectRecord.endereco?.cidade,
                          complemento: text,
                          logradouro: ProspectRecord.endereco?.logradouro,
                          numero: ProspectRecord.endereco?.numero,
                          uf: ProspectRecord.endereco?.uf,
                        };
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.endereco?.complemento} titleInput='Complemento' keyboardType='default'
                    />
                    <Input
                      key='district'
                      onChangeText={(text) => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.endereco = {
                          bairro: text,
                          cep: ProspectRecord.endereco?.cep,
                          cidade: ProspectRecord.endereco?.cidade,
                          complemento: ProspectRecord.endereco?.complemento,
                          logradouro: ProspectRecord.endereco?.logradouro,
                          numero: ProspectRecord.endereco?.numero,
                          uf: ProspectRecord.endereco?.uf,
                        };
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.endereco?.bairro} titleInput='Bairro' keyboardType='default'
                    />
                    <Input
                      key='city'
                      onChangeText={(text) => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        ProspectRecord.endereco = {
                          bairro: ProspectRecord.endereco?.bairro,
                          cep: ProspectRecord.endereco?.cep,
                          cidade: text,
                          complemento: ProspectRecord.endereco?.complemento,
                          logradouro: ProspectRecord.endereco?.logradouro,
                          numero: ProspectRecord.endereco?.numero,
                          uf: ProspectRecord.endereco?.uf,
                        };
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.endereco?.cidade} titleInput='Cidade' keyboardType='default'
                    />
                    <TouchInput 
                      key='uf address'
                      onPress={() => {setVisibleUFAddress(true); setUF(List.UF)}}
                      selectedInput={props.getProspectsList[props.getIndexProspects]?.endereco?.uf} titleInput='UF'
                    />
                  </>
                </View>

                {props.getProspectsList[props.getIndexProspects]?.estadoCivil === 2 || props.getProspectsList[props.getIndexProspects]?.estadoCivil === 7 ? 
                  <Styled.ContainerMarried>
                    <Styled.TextSubtitle>Cônjuge</Styled.TextSubtitle>
                    <Annex
                      viewImage={() => setVisibleImageIdentificationSpouse(true)}
                      viewPDF={() => setVisiblePDFIdentificationSpouse(true)}
                      PDForIMAGE={props.getProspectsList[props.getIndexProspects]?.dependentes!?.map(item => item.documentoPessoal!?.extensao == 'pdf' ? 1 : 0)}
                      cancelTouch={() => {
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                          let Dependents = [... props.getDependentsList]; let DependentsRecord: Object_.Dependente = Dependents![0];
                          ProspectRecord.dependentes = [...props.getDependentsList]
                          DependentsRecord.documentoPessoal = undefined
                          props.setProspectsList([...props.getProspectsList]);
                      }}
                      library={() => pickLibrarySpouseIdentification()}
                      pdf={() => DocumentPDFSpouseIdentification()}
                      camera={() => requestSpouseIdentificationCameraPermission()}
                      uri={props.getProspectsList[props.getIndexProspects]?.dependentes!?.map(item => item.documentoPessoal!?.arquivo)}
                      title='Anexe RG, CNH ou outra identificação'
                      base64={true}
                      heightImage={100}
                      widthImage={170}
                      heightPdf={100}
                      widthPdf={170}
                    />
                    <Modals.ViewImage
                      marginLeft={"5%"}
                      title="Imagem Selecionada"
                      onPressClose={() => {setVisibleImageIdentificationSpouse(false)}}
                      visible={getVisibleImageIdentificationSpouse}
                      image={props.getProspectsList[props.getIndexProspects]?.dependentes!?.map(item => item.documentoPessoal!?.arquivo)}
                    />
                    <Modals.PdfViewer
                      visible={getVisiblePDFIdentificationSpouse}
                      onPressClose={() => {setVisiblePDFIdentificationSpouse(false)}}
                      resource={props.getProspectsList[props.getIndexProspects]?.dependentes!?.map(item => item.documentoPessoal!?.arquivo)}
                    />
                    <Input
                      key='cpf'
                      onChangeText={(text) => {
                        text = TextFormat.CPF.DesformatarTexto(text);
                        if(text.length == 11) CPFConsultationDependent(text)
                        let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        let Dependents = [... props.getDependentsList]; let DependentsRecord: Object_.Dependente = Dependents[0];
                        ProspectRecord.dependentes = [...props.getDependentsList]
                        DependentsRecord.cpf = text;
                        DependentsRecord.classificacao = 1;
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.dependentes!?.map((item: Object_.Dependente) => TextFormat.CPF.FormatarTexto(item.cpf))} titleInput='CPF' keyboardType='number-pad' placeholder={TextFormat.CPF.FormatarTexto("00000000000")} placeholderTextColor={blurredColor}
                    />
                    <Input
                      key='name spouse'
                      onChangeText={(text) => {
                        let ProspectsList = [...props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        let Dependents = [... props.getDependentsList]; let DependentsRecord: Object_.Dependente = Dependents[0];
                        ProspectRecord.dependentes = [...props.getDependentsList]
                        DependentsRecord.nome = text;
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.dependentes!?.map((item: Object_.Dependente) => item.nome)} titleInput='Nome' keyboardType='default' placeholder="Nome e Sobrenome" placeholderTextColor={blurredColor}
                    />
                    <TouchInput 
                      key='birth spouse'
                      onPress={() => {setVisibleSpouseBirth(true)}}
                      selectedInput={props.getProspectsList[props.getIndexProspects]?.dependentes!?.map((item: Object_.Dependente) => item.dataDeNascimento ? moment(item.dataDeNascimento).format("DD/MM/YYYY") : "00/00/0000")} titleInput='Dt. Nascimento'
                    />
                    <TouchInput 
                      key='nationality spouse'
                      onPress={() => {setVisibleNationalitySpouse(true)}}
                      colorWithNothingSelected={props.getProspectsList[props.getIndexProspects]?.nacionalidade?.nacionalidade ? undefined : blurredColor}
                      selectedInput={props.getProspectsList[props.getIndexProspects]?.dependentes!?.map((item: Object_.Dependente) => item.nacionalidade?.nacionalidade)} titleInput='Nacionalidade'
                    />
                    <TouchInput 
                      key='naturality (uf) spouse'
                      onPress={() => {setVisibleNaturalnessUFSpouse(true); setUF(List.UF)}}
                      colorWithNothingSelected={blurredColor}
                      colorOptionalInput={blurredColor}
                      selectedInput={props.getProspectsList[props.getIndexProspects]?.dependentes!?.map((item: Object_.Dependente) => item.naturalidade?.uf)} titleInput='Naturalidade (UF)'
                    />
                    <TouchInput 
                      key='naturality (city) spouse'
                      onPress={() => {setVisibleNaturalnessCitySpouse(true)}}
                      colorWithNothingSelected={blurredColor}
                      colorOptionalInput={blurredColor}
                      selectedInput={props.getProspectsList[props.getIndexProspects]?.dependentes!?.map((item: Object_.Dependente) => item.naturalidade?.cidade)} titleInput='Naturalidade (Cidade)'
                    />
                    <Input
                      key='personal income'
                      onChangeText={(text) => {
                        let ProspectsList = [...props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        let Dependents = [... props.getDependentsList]; let DependentsRecord: Object_.Dependente = Dependents[0];
                        ProspectRecord.dependentes = [...props.getDependentsList]
                        let typedText = TextFormat.Moeda.DesformatarTexto(text);
                        Number(typedText)
                        DependentsRecord.renda = typedText;
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      value={TextFormat.Moeda.FormatarTexto(props.getDependentsList![0]!?.renda)} titleInput='Renda Pessoal' keyboardType='number-pad' placeholder={TextFormat.Moeda.FormatarTexto(0)} placeholderTextColor={blurredColor} colorOptionalInput={blurredColor} colorWithNothing={blurredColor}
                    />
                    <Input
                      key='email spouse'
                      onChangeText={(text) => {
                        let ProspectsList = [...props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        let Dependents = [... props.getDependentsList]; let DependentsRecord: Object_.Dependente = Dependents[0];
                        ProspectRecord.dependentes = [...props.getDependentsList]
                        DependentsRecord.email = text;
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.dependentes!?.map((item: Object_.Dependente) => item.email)} titleInput='Email' keyboardType='email-address' placeholder="email@dominio.com.br" placeholderTextColor={blurredColor}
                    />
                    <Input
                      key='cell phone spouse'
                      onChangeText={(text) => {
                        let ProspectsList = [...props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        let Dependents = [... props.getDependentsList]; let DependentsRecord: Object_.Dependente = Dependents[0];
                        ProspectRecord.dependentes = [...props.getDependentsList]
                        let phone = {
                          classificacao: 1,
                          ddi: "55",
                          ddd: text.length <= 2 ? (text) : TextFormat.Telefone.ObterDDD(TextFormat.Telefone.DesformatarTexto(text)),
                          numero: TextFormat.Telefone.ObterNumero(TextFormat.Telefone.DesformatarTexto(text)),
                          observacao: ""
                        } as Object_.Telefone;
                        props.setCellPhoneSpouse(phone);
                        DependentsRecord.telefones = DependentsRecord.telefones ?? [];
                        DependentsRecord.telefones?.splice(DependentsRecord.telefones?.findIndex((Item) => Item?.classificacao == phone?.classificacao), 1);
                        DependentsRecord.telefones?.push(phone);
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      value={TextFormat.Telefone.FormatarTexto(props.getCellPhoneSpouse ? (props.getCellPhoneSpouse!?.ddd + props.getCellPhoneSpouse!?.numero) : "")} titleInput='Tel. celular' keyboardType='number-pad' placeholder="(00) 000000000" placeholderTextColor={blurredColor}
                    />
                    <Input
                      key='comercial phone spouse'
                      onChangeText={(text) => {
                        let ProspectsList = [...props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        let Dependents = [... props.getDependentsList]; let DependentsRecord: Object_.Dependente = Dependents[0];
                        ProspectRecord.dependentes = [...props.getDependentsList]
                        let phone = {
                          classificacao: 2,
                          ddi: "55",
                          ddd: text.length <= 2 ? (text) : TextFormat.Telefone.ObterDDD(TextFormat.Telefone.DesformatarTexto(text)),
                          numero: TextFormat.Telefone.ObterNumero(TextFormat.Telefone.DesformatarTexto(text)),
                          observacao: ""
                        } as Object_.Telefone;
                        props.setComercialPhoneSpouse(phone)
                        DependentsRecord.telefones = DependentsRecord.telefones ?? [];
                        DependentsRecord.telefones?.splice(DependentsRecord.telefones?.findIndex((Item) => Item?.classificacao == phone?.classificacao), 2);
                        DependentsRecord.telefones?.push(phone);
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      value={TextFormat.Telefone.FormatarTexto(props.getComercialPhoneSpouse ? (props.getComercialPhoneSpouse?.ddd + props.getComercialPhoneSpouse?.numero) : "")} titleInput='Tel. comercial' keyboardType='number-pad' placeholder="(00) 000000000" placeholderTextColor={blurredColor} colorOptionalInput={blurredColor} colorWithNothing={blurredColor}
                    />
                    <Input
                      key='profession spouse'
                      onChangeText={(text) => {
                        let ProspectsList = [...props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        let Dependents = [... props.getDependentsList]; let DependentsRecord: Object_.Dependente = Dependents[0];
                        ProspectRecord.dependentes = [...props.getDependentsList]
                        DependentsRecord.ocupacao = {
                          id: 0,
                          cargo: "", 
                          nome: text,
                        }
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.dependentes!?.map((item: Object_.Dependente) => item.ocupacao?.nome)} titleInput='Profissão' keyboardType='default' placeholder="Profissão ou cargo" placeholderTextColor={blurredColor}
                    />
                    <Input
                      key="father's name spouse"
                      onChangeText={(text) => {
                        let ProspectsList = [...props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        let Dependents = [... props.getDependentsList]; let DependentsRecord: Object_.Dependente = Dependents[0];
                        ProspectRecord.dependentes = [...props.getDependentsList]
                        DependentsRecord.filiacao01 = text
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.dependentes!?.map((item: Object_.Dependente) => item.filiacao01)} titleInput='Nome do Pai' keyboardType='default' placeholder="Nome e Sobrenome" placeholderTextColor={blurredColor} colorOptionalInput={blurredColor} colorWithNothing={blurredColor}
                    />
                    <Input
                      key="mother's name spouse"
                      onChangeText={(text) => {
                        let ProspectsList = [...props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        let Dependents = [... props.getDependentsList]; let DependentsRecord: Object_.Dependente = Dependents[0];
                        ProspectRecord.dependentes = [...props.getDependentsList]
                        DependentsRecord.filiacao02 = text
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.dependentes!?.map((item: Object_.Dependente) => item.filiacao02)} titleInput='Nome da Mãe' keyboardType='default' placeholder="Nome e Sobrenome" placeholderTextColor={blurredColor} colorOptionalInput={blurredColor} colorWithNothing={blurredColor}
                    />
                    <Input
                      key='rg number spouse'
                      onChangeText={(text) => {
                        let ProspectsList = [...props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        let Dependents = [... props.getDependentsList]; let DependentsRecord: Object_.Dependente = Dependents[0];
                        ProspectRecord.dependentes = [...props.getDependentsList]
                        DependentsRecord.rg = {
                          numero: text,
                          orgaoEmissor: DependentsRecord.rg?.orgaoEmissor,
                          uf: DependentsRecord.rg?.uf,
                        }
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.dependentes!?.map((item: Object_.Dependente) => item.rg?.numero)} titleInput='RG (Número)' placeholder="00.000-00" keyboardType='default' placeholderTextColor={blurredColor}
                    />
                    <Input
                      key='rg issuing agency spouse'
                      onChangeText={(text) => {
                        let ProspectsList = [...props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        let Dependents = [... props.getDependentsList]; let DependentsRecord: Object_.Dependente = Dependents[0];
                        ProspectRecord.dependentes = [...props.getDependentsList]
                        DependentsRecord.rg = {
                          numero: DependentsRecord.rg?.numero,
                          orgaoEmissor: text,
                          uf: DependentsRecord.rg?.uf,
                        }
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.dependentes!?.map((item: Object_.Dependente) => item.rg?.orgaoEmissor)} titleInput='RG (Órgão Emissor)' placeholder="XXX" keyboardType='default' placeholderTextColor={blurredColor}
                    />
                    <TouchInput 
                      key='rg uf spouse'
                      onPress={() => {setVisibleUF_RGSpouse(true); setUF(List.UF)}}
                      selectedInput={props.getProspectsList[props.getIndexProspects]?.dependentes!?.map((item: Object_.Dependente) => item.rg?.uf)} titleInput='RG (UF)' 
                    />
                    <Input
                      key='cnh number spouse'
                      onChangeText={(text) => {
                        let ProspectsList = [...props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                        let Dependents = [... props.getDependentsList]; let DependentsRecord: Object_.Dependente = Dependents[0];
                        ProspectRecord.dependentes = [...props.getDependentsList]
                        DependentsRecord.cnh = {
                          numero: text,
                          dataDeEmissao: DependentsRecord.cnh?.dataDeEmissao,
                          uf: DependentsRecord.cnh?.uf,
                        }
                        props.setProspectsList([...props.getProspectsList]);
                      }}
                      nameInput={props.getProspectsList[props.getIndexProspects]?.dependentes!?.map((item: Object_.Dependente) => item.cnh?.numero)} titleInput='CNH (Número)' keyboardType='default' placeholder="0000000" placeholderTextColor={blurredColor} colorOptionalInput={blurredColor} colorWithNothing={blurredColor}
                    />
                    <TouchInput 
                      key='cnh expedition date spouse'
                      onPress={() => {setVisibleExpeditionDateSpouse(true)}}
                      colorWithNothingSelected={blurredColor}
                      colorOptionalInput={blurredColor}
                      selectedInput={props.getProspectsList[props.getIndexProspects]?.dependentes!?.map((item: Object_.Dependente) => item.cnh?.dataDeEmissao ? moment(item.cnh?.dataDeEmissao).format("DD/MM/YYYY") : "00/00/0000")} titleInput='CNH (Dt. de Exped.)'
                    />
                    <TouchInput 
                      key='cnh uf spouse'
                      onPress={() => {setVisibleCNH_UFSpouse(true); setUF(List.UF)}}
                      colorWithNothingSelected={blurredColor}
                      colorOptionalInput={blurredColor}
                      selectedInput={props.getProspectsList[props.getIndexProspects]?.dependentes!?.map((item: Object_.Dependente) => item.cnh?.uf)} titleInput='CNH (UF)'
                    />
                  </Styled.ContainerMarried>
                : undefined}
                {props.getProspectsList.length === (props.getIndexProspects + 1) &&
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Styled.TextProponents>Deseja adicionar um novo proponente?</Styled.TextProponents>
                    <Styled.ContainerSwitch>
                      <Switch
                        size={30}
                        onPress={props.onPress}
                        isEnabled={false}
                      />
                    </Styled.ContainerSwitch>
                  </View>}
              </ScrollView>
            </Styled.SubContainer>
          </KeyboardAvoidingView>
          <Styled.Submit onPress={async () => {
            if(props.getProspectsList.length === (props.getIndexProspects + 1)) {
              ValidatingData()
            } else {
              props.setIndexProspects(props.getIndexProspects + 1);
              try {
                let cellPhone = props.getProspectsList[props.getIndexProspects + 1]?.telefones?.find((item: Object_.Telefone) => item?.classificacao == 1);
                props.setCellPhone({
                  classificacao: 1,
                  ddi: "55",
                  ddd: cellPhone?.ddd,
                  numero: cellPhone?.numero
                } as Object_.Telefone);
              } catch {} 
              try {
                let comercialPhone = props.getProspectsList[props.getIndexProspects + 1]?.telefones?.find((item: Object_.Telefone) => item?.classificacao == 2);
                props.setComercialPhone({
                  classificacao: 2,
                  ddi: "55",
                  ddd: comercialPhone?.ddd,
                  numero: comercialPhone?.numero
                } as Object_.Telefone); 
              } catch {}
            }
          }} activeOpacity={0.8}>
          {props.getProspectsList.length === (props.getIndexProspects + 1) === false ?
            <Styled.TextSubmit>Avançar Proponente</Styled.TextSubmit>
          : <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Styled.TextSubmit>Prosseguir</Styled.TextSubmit>
              <SvgCss xml={ArrowGoButton} style={{marginLeft: '10%'}}/>
            </View>}
          </Styled.Submit>


          {/*MODALS*/}
          <>
            <Modals.MultipleSelections
              marginLeft="15%"
              title="Unidades Federativas"
              visible={getVisibleUF_AddressLegalProponent}
              search={true}
              onChangeText={(event) => {SearchUF(event)}}
              onPressClose={() => {setVisibleUF_AddressLegalProponent(false)}}
              data={getUF}
              renderItem={({item}) => (
                <Styled.ItemContainer onPress={() => {
                  let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                  ProspectRecord.pjVinculado = {
                    dataArqAtoConst: ProspectRecord.pjVinculado?.dataArqAtoConst,
                    nire: ProspectRecord.pjVinculado?.nire,
                    nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
                    numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
                    cNAEs: ProspectRecord.pjVinculado?.cNAEs,
                    cnpj: ProspectRecord.pjVinculado?.cnpj,
                    documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
                    emails: ProspectRecord.pjVinculado?.emails,
                    endereco: {
                      bairro: ProspectRecord.pjVinculado?.endereco?.bairro,
                      cep: ProspectRecord.pjVinculado?.endereco?.cep,
                      cidade: ProspectRecord.pjVinculado?.endereco?.cidade,
                      classificacao: ProspectRecord.pjVinculado?.endereco?.classificacao,
                      complemento: ProspectRecord.pjVinculado?.endereco?.complemento,
                      logradouro: ProspectRecord.pjVinculado?.endereco?.logradouro,
                      numero: ProspectRecord.pjVinculado?.endereco?.numero,
                      uf: item.initials,
                    },
                    enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
                    fichaCadastral: ProspectRecord.pjVinculado?.fichaCadastral,
                    id: ProspectRecord.pjVinculado?.id,
                    ie: ProspectRecord.pjVinculado?.ie,
                    im: ProspectRecord.pjVinculado?.im,
                    juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
                    nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
                    razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
                    telefones: ProspectRecord.pjVinculado?.telefones,
                    cartaoCNPJ: ProspectRecord.pjVinculado?.cartaoCNPJ,
                    certidaoDaJuntaComercial: ProspectRecord.pjVinculado?.certidaoDaJuntaComercial,
                  }
                  props.setProspectsList([...props.getProspectsList]);
                  setVisibleUF_AddressLegalProponent(false)
                }}>
                  <Styled.Item>
                    <Styled.TextItem>{item.initials}</Styled.TextItem>
                  </Styled.Item>
                </Styled.ItemContainer>
              )}
            />
            <DatePicker
              modal
              mode='date'
              open={getOpenBirth}
              date={getDate}
              maximumDate={getDate}
              onConfirm={(date) => {
                let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                ProspectRecord.dataDeNascimento = date.toISOString();
                props.setProspectsList([...props.getProspectsList]);
                setOpenBirth(false)
              }}
              onCancel={() => {
                setOpenBirth(false)
              }}
            />
            {getVisibleDateIncorporation &&
            <DatePicker
              modal
              mode='date'
              open={getVisibleDateIncorporation}
              date={getDate}
              maximumDate={getDate}
              onConfirm={(date) => {
                let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                ProspectRecord.pjVinculado = {
                  dataArqAtoConst: date.toISOString(),
                  nire: ProspectRecord.pjVinculado?.nire,
                  nomeCertidaoSimplificada: ProspectRecord.pjVinculado?.nomeCertidaoSimplificada,
                  numeroCertidaoSimplificada: ProspectRecord.pjVinculado?.numeroCertidaoSimplificada,
                  cNAEs: ProspectRecord.pjVinculado?.cNAEs,
                  cnpj: ProspectRecord.pjVinculado?.cnpj,
                  documentoEndereco: ProspectRecord.pjVinculado?.documentoEndereco,
                  emails: ProspectRecord.pjVinculado?.emails,
                  endereco: ProspectRecord.pjVinculado?.endereco,
                  enquadramentoTributario: ProspectRecord.pjVinculado?.enquadramentoTributario,
                  fichaCadastral: ProspectRecord.pjVinculado?.fichaCadastral,
                  id: ProspectRecord.pjVinculado?.id,
                  ie: ProspectRecord.pjVinculado?.ie,
                  im: ProspectRecord.pjVinculado?.im,
                  juntaComercial: ProspectRecord.pjVinculado?.juntaComercial,
                  nomeFantasia: ProspectRecord.pjVinculado?.nomeFantasia,
                  razaoSocial: ProspectRecord.pjVinculado?.razaoSocial,
                  telefones: ProspectRecord.pjVinculado?.telefones,
                }
                props.setProspectsList([...props.getProspectsList]);
                setVisibleDateIncorporation(false)
              }}
              onCancel={() => {
                setVisibleDateIncorporation(false)
              }}
            />}
            <Modals.MultipleSelections
              search={true}
              marginLeft="13%"
              title="Nacionalidades"
              visible={getVisibleNationality}
              onPressClose={() => {setVisibleNationality(false)}}
              data={getNationality}
              onChangeText={(event) => SearchNationality(event)}
              renderItem={(item) => (
                <Styled.ItemContainer onPress={() => {
                  let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                  ProspectRecord.nacionalidade = item.item
                  props.setProspectsList([...props.getProspectsList]);
                  setVisibleNationality(false)}}>
                  <Styled.Item>
                    <Styled.TextItem>{item.item.nacionalidade}</Styled.TextItem>
                  </Styled.Item>
                </Styled.ItemContainer>
              )}
            />
            <Modals.MultipleSelections
              search={true}
              marginLeft="15%"
              title="Unidades Federativas"
              visible={getVisibleUF}
              onChangeText={(event) => SearchUF(event)}
              onPressClose={() => {setVisibleUF(false)}}
              data={getUF}
              renderItem={({item}: any) => (
                <Styled.ItemContainer onPress={() => {
                  let ProspectsList = [...props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                  ProspectRecord.naturalidade = {
                    cidade: undefined,
                    uf: item.initials,
                  }; props.setProspectsList([...props.getProspectsList]);
                  setVisibleUF(false)
                }}>
                  <Styled.Item>
                    <Styled.TextItem>{item.initials}</Styled.TextItem>
                  </Styled.Item>
                </Styled.ItemContainer>
              )}
            />
            <Modals.MultipleSelections
              search={true}
              onChangeText={(event) => SearchCity(event)}
              marginLeft="23%"
              title="Cidades"
              visible={getVisibleNaturalnessCity}
              onPressClose={() => {setVisibleNaturalnessCity(false)}}
              data={props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "AC" ? List.Acre
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "AL" ? List.Alagoas
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "AP" ? List.Amapa
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "AM" ? List.Amazonas
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "BA" ? List.Bahia
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "CE" ? List.Ceara
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "DF" ? List.DistritoFederal
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "ES" ? List.EspiritoSanto
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "GO" ? List.Goias
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "MA" ? List.Maranhao
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "MT" ? List.MatoGrosso
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "MS" ? List.MatoGrossoDoSul
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "MG" ? List.MinasGerais
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "PA" ? List.Para
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "PB" ? List.Paraiba
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "PR" ? List.Parana
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "PE" ? List.Pernambuco
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "PI" ? List.Piaui
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "RJ" ? List.RioDeJaneiro
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "RN" ? List.RioGrandeDoNorte
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "RS" ? List.RioGrandeDoSul
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "RO" ? List.Rondonia
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "RR" ? List.Roraima
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "SC" ? List.SantaCatarina
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "SP" ? List.SaoPaulo
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "SE" ? List.Sergipe
                : props.getProspectsList[props.getIndexProspects]?.naturalidade?.uf === "TO" ? List.Tocantins
                : []
              }
              renderItem={({item}: any) => (
                <Styled.ItemContainer onPress={() => {
                  let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                  ProspectRecord.naturalidade = {
                    uf: ProspectRecord.naturalidade!?.uf,
                    cidade: item,
                  }; props.setProspectsList([...props.getProspectsList]);
                  setVisibleNaturalnessCity(false)
                }}>
                  <Styled.Item>
                    <Styled.TextItem>{item}</Styled.TextItem>
                  </Styled.Item>
                </Styled.ItemContainer>
              )}
            />
            <Modals.MultipleSelections
              marginLeft="15%"
              title="Estado Civil"
              visible={getVisibleMaritalStatus}
              onPressClose={() => {setVisibleMaritalStatus(false)}}
              data={getMaritalStatus}
              renderItem={({item}) => (
                <Styled.ItemContainer onPress={() => {
                  console.log(item)
                  let ProspectsList = [...props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                  ProspectRecord.estadoCivil = item!?.id;
                  props.setProspectsList([...props.getProspectsList]);
                  setVisibleMaritalStatus(false)
                }}>
                  <Styled.Item>
                    <Styled.TextItem>{item.descricao}</Styled.TextItem>
                  </Styled.Item>
                </Styled.ItemContainer>
              )}
            />
            <Modals.PropertyRegime
              visible={getVisiblePropertyRegime}
              onPressClose={() => {setVisiblePropertyRegime(false)}}
              data={getPropertyRegime}
              renderItem={(item: any) => (
                <Styled.ItemContainer onPress={() => {
                  let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                  ProspectRecord.regimeDeCasamento = {
                    id: item.item.id,
                    descricao: item.item.descricao,
                  }
                  props.setProspectsList([...props.getProspectsList]);
                  setVisiblePropertyRegime(false)}}>
                  <Styled.Item>
                    <Styled.TextItem>{item.item.descricao}</Styled.TextItem>
                  </Styled.Item>
                </Styled.ItemContainer>
              )}
            />
            <DatePicker
              modal
              mode='date'
              open={getVisibleWeddingDate}
              date={getDate}
              maximumDate={getDate}
              onConfirm={(date) => {
                let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                ProspectRecord.dataDeCasamento = date.toISOString();
                props.setProspectsList([...props.getProspectsList]);
                setVisibleWeddingDate(false)
              }}
              onCancel={() => {
                setVisibleWeddingDate(false)
              }}
            />
            <Modals.MultipleSelections
              search={true}
              marginLeft="15%"
              title="Unidades Federativas"
              visible={getVisibleUF_RGProponent}
              onChangeText={(event) => {SearchUF(event)}}
              onPressClose={() => {setVisibleUF_RGProponent(false)}}
              data={getUF}
              renderItem={item => (
                <Styled.ItemContainer onPress={() => {
                  let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                  ProspectRecord.rg = {
                    numero: ProspectRecord.rg?.numero,
                    orgaoEmissor: ProspectRecord.rg?.orgaoEmissor,
                    uf: item.item.initials,
                  }
                  props.setProspectsList([...props.getProspectsList]);
                  setVisibleUF_RGProponent(false)
                }}>
                  <Styled.Item>
                    <Styled.TextItem>{item.item.initials}</Styled.TextItem>
                  </Styled.Item>
                </Styled.ItemContainer>
              )}
            />
            <DatePicker
              modal
              mode='date'
              open={getVisibleExpeditionDate}
              date={getDate}
              maximumDate={getDate}
              onConfirm={(date) => {
                let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                ProspectRecord.cnh = {
                  dataDeEmissao: date.toISOString(),
                  numero: ProspectRecord.cnh?.numero,
                  uf: ProspectRecord.cnh?.uf,
                };
                props.setProspectsList([...props.getProspectsList]);
                setVisibleExpeditionDate(false)
              }}
              onCancel={() => {
                setVisibleExpeditionDate(false)
              }}
            />
            <Modals.MultipleSelections
              search={true}
              marginLeft="15%"
              title="Unidades Federativas"
              visible={getVisibleCNH_UFProponent}
              onChangeText={(event) => {SearchUF(event)}}
              onPressClose={() => {setVisibleCNH_UFProponent(false)}}
              data={getUF}
              renderItem={({item}: any) => (
                <Styled.ItemContainer onPress={() => {
                  let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                  ProspectRecord.cnh = {
                    dataDeEmissao: ProspectRecord.cnh!?.dataDeEmissao,
                    numero: ProspectRecord.cnh!?.numero,
                    uf: item.initials,
                  }
                  props.setProspectsList([...props.getProspectsList]);
                  setVisibleCNH_UFProponent(false)}}>
                  <Styled.Item>
                    <Styled.TextItem>{item.initials}</Styled.TextItem>
                  </Styled.Item>
                </Styled.ItemContainer>
              )}
            />
            <Modals.MultipleSelections
              search={true}
              marginLeft="15%"
              title="Unidades Federativas"
              visible={getVisibleUFAddress}
              onPressClose={() => {setVisibleUFAddress(false)}}
              onChangeText={(event) => {SearchUF(event)}}
              data={getUF}
              renderItem={({item}) => (
                <Styled.ItemContainer onPress={() => {
                  let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                  ProspectRecord.endereco = {
                    bairro: ProspectRecord.endereco?.bairro,
                    cep: ProspectRecord.endereco?.cep,
                    cidade: ProspectRecord.endereco?.cidade,
                    complemento: ProspectRecord.endereco?.complemento,
                    logradouro: ProspectRecord.endereco?.logradouro,
                    numero: ProspectRecord.endereco?.numero,
                    uf: item.initials,
                  };
                  props.setProspectsList([...props.getProspectsList]);
                  setVisibleUFAddress(false)
                }}>
                  <Styled.Item>
                    <Styled.TextItem>{item.initials}</Styled.TextItem>
                  </Styled.Item>
                </Styled.ItemContainer>
              )}
            />
            <DatePicker
              modal
              mode='date'
              open={getVisibleSpouseBirth}
              date={getDate}
              maximumDate={getDate}
              onConfirm={(date) => {
                let ProspectsList = [...props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                let Dependents = [... props.getDependentsList]; let DependentsRecord: Object_.Dependente = Dependents[0];
                ProspectRecord.dependentes = [...props.getDependentsList]
                DependentsRecord.dataDeNascimento = date.toISOString();
                props.setProspectsList([...props.getProspectsList]);
                setVisibleSpouseBirth(false)
              }}
              onCancel={() => {
                setVisibleSpouseBirth(false)
              }}
            />
            <Modals.MultipleSelections
              search={true}
              marginLeft="12%"
              title="Nacionalidades"
              visible={getVisibleNationalitySpouse}
              onPressClose={() => {setVisibleNationalitySpouse(false)}}
              data={getNationality}
              onChangeText={(event) => SearchNationality(event)}
              renderItem={(item) => (
                <Styled.ItemContainer onPress={() => {
                  let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                  let Dependents = [... props.getDependentsList]; let DependentsRecord: Object_.Dependente = Dependents[0];
                  ProspectRecord.dependentes = [...props.getDependentsList]
                  if (DependentsRecord != undefined) {
                    DependentsRecord.nacionalidade = item.item
                  }
                  props.setProspectsList([...props.getProspectsList]);
                  setVisibleNationalitySpouse(false)}}>
                  <Styled.Item>
                    <Styled.TextItem>{item.item.nacionalidade}</Styled.TextItem>
                  </Styled.Item>
                </Styled.ItemContainer>
              )}
            />
            <Modals.MultipleSelections
              search={true}
              marginLeft="15%"
              title="Unidades Federativas"
              visible={getVisibleNaturalnessUFSpouse}
              onPressClose={() => {setVisibleNaturalnessUFSpouse(false)}}
              onChangeText={(event) => {SearchUF(event)}}
              data={getUF}
              renderItem={({item}) => (
                <Styled.ItemContainer onPress={() => {
                  let ProspectsList = [... props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                  let Dependents = [... props.getDependentsList]; let DependentsRecord: Object_.Dependente = Dependents[0];
                  ProspectRecord.dependentes = [...props.getDependentsList]
                  DependentsRecord.naturalidade = {
                    cidade: DependentsRecord.naturalidade?.cidade,
                    uf: item.initials,
                  }
                  setConjugeNaturalidadeUF(item.initials);
                  props.setProspectsList([...props.getProspectsList]);
                  setVisibleNaturalnessUFSpouse(false)}}>
                  <Styled.Item>
                    <Styled.TextItem>{item.initials}</Styled.TextItem>
                  </Styled.Item>
                </Styled.ItemContainer>
              )}
            />
            <Modals.MultipleSelections
              search={true}
              onChangeText={(event) => SearchCitySpouse(event)}
              marginLeft="23%"
              title="Cidades"
              visible={getVisibleNaturalnessCitySpouse}
              onPressClose={() => {setVisibleNaturalnessCitySpouse(false)}}
              data={getConjugeNaturalidadeUF == "AC" ? List.Acre :
                getConjugeNaturalidadeUF == "AL" ? List.Alagoas :
                getConjugeNaturalidadeUF == "AP" ? List.Amapa :
                getConjugeNaturalidadeUF == "AM" ? List.Amazonas :
                getConjugeNaturalidadeUF == "BA" ? List.Bahia :
                getConjugeNaturalidadeUF == "CE" ? List.Ceara :
                getConjugeNaturalidadeUF == "DF" ? List.DistritoFederal :
                getConjugeNaturalidadeUF == "ES" ? List.EspiritoSanto :
                getConjugeNaturalidadeUF == "GO" ? List.Goias :
                getConjugeNaturalidadeUF == "MA" ? List.Maranhao :
                getConjugeNaturalidadeUF == "MT" ? List.MatoGrosso :
                getConjugeNaturalidadeUF == "MS" ? List.MatoGrossoDoSul :
                getConjugeNaturalidadeUF == "MG" ? List.MinasGerais :
                getConjugeNaturalidadeUF == "PA" ? List.Para :
                getConjugeNaturalidadeUF == "PB" ? List.Paraiba :
                getConjugeNaturalidadeUF == "PR" ? List.Parana :
                getConjugeNaturalidadeUF == "PE" ? List.Pernambuco :
                getConjugeNaturalidadeUF == "PI" ? List.Piaui :
                getConjugeNaturalidadeUF == "RJ" ? List.RioDeJaneiro :
                getConjugeNaturalidadeUF == "RN" ? List.RioGrandeDoNorte :
                getConjugeNaturalidadeUF == "RS" ? List.RioGrandeDoSul :
                getConjugeNaturalidadeUF == "RO" ? List.Rondonia :
                getConjugeNaturalidadeUF == "RR" ? List.Roraima :
                getConjugeNaturalidadeUF == "SC" ? List.SantaCatarina :
                getConjugeNaturalidadeUF == "SP" ? List.SaoPaulo :
                getConjugeNaturalidadeUF == "SE" ? List.Sergipe :
                getConjugeNaturalidadeUF == "TO" ? List.Tocantins : []
              }
              renderItem={({item}) => (
                <Styled.ItemContainer onPress={() => {
                  let ProspectsList = [...props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                  let Dependents = [... props.getDependentsList]; let DependentsRecord: Object_.Dependente = Dependents[0];
                  ProspectRecord.dependentes = [...props.getDependentsList]
                  DependentsRecord.naturalidade = {
                    cidade: item,
                    uf: DependentsRecord.naturalidade?.uf,
                  }
                  props.setProspectsList([...props.getProspectsList]);
                  setVisibleNaturalnessCitySpouse(false)}}>
                  <Styled.Item>
                    <Styled.TextItem>{item}</Styled.TextItem>
                  </Styled.Item>
                </Styled.ItemContainer>
              )}
            />
            <Modals.MultipleSelections
              search={true}
              onChangeText={(event) => {SearchUF(event)}}
              marginLeft="15%"
              title="Unidades Federativas"
              visible={getVisibleUF_RGSpouse}
              onPressClose={() => {setVisibleUF_RGSpouse(false)}}
              data={getUF}
              renderItem={({item}) => (
                <Styled.ItemContainer onPress={() => {
                  let ProspectsList = [...props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                  let Dependents = [... props.getDependentsList]; let DependentsRecord: Object_.Dependente = Dependents[0];
                  ProspectRecord.dependentes = [...props.getDependentsList]
                  DependentsRecord.rg = {
                    numero: DependentsRecord.rg?.numero,
                    orgaoEmissor: DependentsRecord.rg?.orgaoEmissor,
                    uf: item.initials,
                  }
                  props.setProspectsList([...props.getProspectsList]);
                  setVisibleUF_RGSpouse(false)
                }}>
                  <Styled.Item>
                    <Styled.TextItem>{item.initials}</Styled.TextItem>
                  </Styled.Item>
                </Styled.ItemContainer>
              )}
            />
            <DatePicker
              modal
              mode='date'
              open={getVisibleExpeditionDateSpouse}
              date={getDate}
              maximumDate={getDate}
              onConfirm={(date) => {
                let ProspectsList = [...props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                let Dependents = [... props.getDependentsList]; let DependentsRecord: Object_.Dependente = Dependents[0];
                ProspectRecord.dependentes = [...props.getDependentsList]
                DependentsRecord.cnh = {
                  numero: DependentsRecord.cnh?.numero,
                  dataDeEmissao: date.toISOString(),
                  uf: DependentsRecord.cnh?.uf,
                }
                props.setProspectsList([...props.getProspectsList]);
                setVisibleExpeditionDateSpouse(false)
              }}
              onCancel={() => {
                setVisibleExpeditionDateSpouse(false)
              }}
            />
            <Modals.MultipleSelections
              search={true}
              onChangeText={(event) => {SearchUF(event)}}
              marginLeft="15%"
              title="Unidades Federativas"
              visible={getVisibleCNH_UFSpouse}
              onPressClose={() => {setVisibleCNH_UFSpouse(false)}}
              data={getUF}
              renderItem={({item}: any) => (
                <Styled.ItemContainer onPress={() => {
                  let ProspectsList = [...props.getProspectsList]; let ProspectRecord: Object_.Prospect = ProspectsList[props.getIndexProspects];
                  let Dependents = [... props.getDependentsList]; let DependentsRecord: Object_.Dependente = Dependents[0];
                  ProspectRecord.dependentes = [...props.getDependentsList]
                  DependentsRecord.cnh = {
                    numero: DependentsRecord.cnh?.numero,
                    dataDeEmissao: DependentsRecord.cnh?.dataDeEmissao,
                    uf: item.initials,
                  }
                  props.setProspectsList([...props.getProspectsList]);
                  setVisibleCNH_UFSpouse(false)
                }}>
                  <Styled.Item>
                    <Styled.TextItem>{item.initials}</Styled.TextItem>
                  </Styled.Item>
                </Styled.ItemContainer>
              )}
            />
            <Modals.ProductData
              getCaptureLocation={props.getCaptureLocation}
              setCaptureLocation={props.setCaptureLocation}
              getPurchasePurpose={props.getPurchasePurpose}
              setPurchasePurpose={props.setPurchasePurpose}
              getComissionControl={props.getComissionControl}
              setComissionControl={props.setComissionControl}
              getSalesRooms={props.getSalesRooms}
              setSalesRooms={props.setSalesRooms}
              goHome={props.goHome}
              getTaxaDeDescontoValorAVista={props.getTaxaDeDescontoValorAVista}
              setTaxaDeDescontoValorAVista={props.setTaxaDeDescontoValorAVista}
              visible={props.getVisibleProductData}
              getDocumentChecklist={props.getDocumentChecklist}
              setDocumentChecklist={props.setDocumentChecklist}
              getPDForImageChecklist={props.getPDForImageChecklist}
              setPDForImageChecklist={props.setPDForImageChecklist}
              getSaleRoom={props.getSaleRoom}
              getCommissioned={props.getCommissioned}
              setCommissioned={props.setCommissioned}
              scrollRef={props.scrollRef}
              setSaleRoom={props.setSaleRoom}
              onPress={async () => {
                props.setProspectsList([...props.getProspectsList, {nacionalidade: {id: 195, descricao: "Brasil", nacionalidade: "brasileiro(a)", masculino: "brasileiro", feminino: "brasileira"}} as Object_.Prospect]);
                props.setIndexProspects(props.getIndexProspects + 1);
                props.setDependentsList([...props.getDependentsList, {nacionalidade: {id: 195, descricao: "Brasil", nacionalidade: "brasileiro(a)", masculino: "brasileiro", feminino: "brasileira"}} as Object_.Dependente]);
                props.scrollRef.current?.scrollTo({
                  y: 0,
                  animated: true,
                });
              }}
              setVisibleProponent={props.setVisibleProponent}
              getVisibleProponent={props.getVisibleProponent}
              getIndexProspects={props.getIndexProspects}
              setIndexProspects={props.setIndexProspects}
              getProspectsList={props.getProspectsList}
              setProspectsList={props.setProspectsList}
              getDependentsList={props.getDependentsList}
              setDependentsList={props.setDependentsList}
              onPressBack={() => {
                if(props.getIndexProspects === 0) {
                  props.setVisibleProponent(false)
                } else {
                  props.setIndexProspects(props.getIndexProspects - 1)
                  try {
                    let cellPhone = props.getProspectsList[props.getIndexProspects - 1]?.telefones?.find((item: Object_.Telefone) => item.classificacao == 1);
                    props.setCellPhone({
                      classificacao: 1,
                      ddi: "55",
                      ddd: cellPhone?.ddd,
                      numero: cellPhone?.numero
                    } as Object_.Telefone);
                  } catch {}
                  try {
                    let comercialPhone = props.getProspectsList[props.getIndexProspects - 1]?.telefones?.find((item: Object_.Telefone) => item.classificacao == 2);
                    props.setComercialPhone({
                      classificacao: 2,
                      ddi: "55",
                      ddd: comercialPhone?.ddd,
                      numero: comercialPhone?.numero
                    } as Object_.Telefone); 
                  } catch {}
                }
              }}
              getCellPhone={props.getCellPhone}
              setCellPhone={props.setCellPhone}
              getComercialPhone={props.getComercialPhone}
              setComercialPhone={props.setComercialPhone}
              getCellPhoneSpouse={props.getCellPhoneSpouse}
              setCellPhoneSpouse={props.setCellPhoneSpouse}
              getComercialPhoneSpouse={props.getComercialPhoneSpouse}
              setComercialPhoneSpouse={props.setComercialPhoneSpouse}
              setSelectedPaymentMethod={props.setSelectedPaymentMethod}
              getSelectedPaymentMethod={props.getSelectedPaymentMethod}
              getObjectIdentificador={props.getObjectIdentificador}
              setObjectIdentificador={props.setObjectIdentificador}
              getIdentificador={props.getIdentificador}
              setIdentificador={props.setIdentificador}
              getCentroDeCusto={props.getCentroDeCusto}
              setCentroDeCusto={props.setCentroDeCusto}
              getSelectedUnity={props.getSelectedUnity}
              setSelectedUnity={props.setSelectedUnity}
              getSelectedCentroDeCusto={props.getSelectedCentroDeCusto}
              setSelectedCentroDeCusto={props.setSelectedCentroDeCusto}
              getSalesTableOriginal={props.getSalesTableOriginal}
              setSalesTableOriginal={props.setSalesTableOriginal}
              getSelectedSalesModel={props.getSelectedSalesModel}
              setSelectedSalesModel={props.setSelectedSalesModel}
              getCommissionedGAV={props.getCommissionedGAV}
              setCommissionedGAV={props.setCommissionedGAV}
              getDocumentFilesNegotiation={props.getDocumentFilesNegotiation}
              setDocumentFilesNegotiation={props.setDocumentFilesNegotiation}
              getDocumentFilesService={props.getDocumentFilesService}
              setDocumentFilesService={props.setDocumentFilesService}
              getPDForImageNegotiation={props.getPDForImageNegotiation}
              setPDForImageNegotiation={props.setPDForImageNegotiation}
              getPDForImageService={props.getPDForImageService}
              setPDForImageService={props.setPDForImageService}
              getDocumentComplementary={props.getDocumentComplementary}
              setDocumentComplementary={props.setDocumentComplementary}
              getPDForImageDocumentComplementary={props.getPDForImageDocumentComplementary}
              setPDForImageDocumentComplementary={props.setPDForImageDocumentComplementary}
              getSelectedProposalDate={props.getSelectedProposalDate}
              setSelectedProposalDate={props.setSelectedProposalDate}
              getSelectedCaptureLocation={props.getSelectedCaptureLocation}
              setSelectedCaptureLocation={props.setSelectedCaptureLocation}
              getSelectedPurchasePurpose={props.getSelectedPurchasePurpose}
              setSelectedPurchasePurpose={props.setSelectedPurchasePurpose}
              getVisibleChecklistRegistration={props.getVisibleChecklistRegistration}
              setVisibleChecklistRegistration={props.setVisibleChecklistRegistration}
              getVisibleProductData={props.getVisibleProductData}
              setVisibleProductData={props.setVisibleProductData}
              getVisibleCommissionControl={props.getVisibleCommissionControl}
              setVisibleCommissionControl={props.setVisibleCommissionControl}
              getVisiblePaymentPlan={props.getVisiblePaymentPlan}
              setVisiblePaymentPlan={props.setVisiblePaymentPlan}
              getVisibleNegotiationCard={props.getVisibleNegotiationCard}
              setVisibleNegotiationCard={props.setVisibleNegotiationCard}
              getVisibleComplementaryDocumentation={props.getVisibleComplementaryDocumentation}
              setVisibleComplementaryDocumentation={props.setVisibleComplementaryDocumentation}
              getVisibleAdditionalInformation={props.getVisibleAdditionalInformation}
              setVisibleAdditionalInformation={props.setVisibleAdditionalInformation}
              getTitulosDeIntermediacao={props.getTitulosDeIntermediacao}
              setTitulosDeIntermediacao={props.setTitulosDeIntermediacao}
              getTitulosDeEntrada={props.getTitulosDeEntrada}
              setTitulosDeEntrada={props.setTitulosDeEntrada}
              getTitulosDeSinal={props.getTitulosDeSinal}
              setTitulosDeSinal={props.setTitulosDeSinal}
              getTitulosDeIntermediaria={props.getTitulosDeIntermediaria}
              setTitulosDeIntermediaria={props.setTitulosDeIntermediaria}
              getTitulosDeSaldo={props.getTitulosDeSaldo}
              setTitulosDeSaldo={props.setTitulosDeSaldo}
              getValorDescontadoTituloIntermediacao={props.getValorDescontadoTituloIntermediacao}
              setValorDescontadoTituloIntermediacao={props.setValorDescontadoTituloIntermediacao}
              getValorDescontadoTituloEntrada={props.getValorDescontadoTituloEntrada}
              setValorDescontadoTituloEntrada={props.setValorDescontadoTituloEntrada}
              getValorDescontadoTituloIntermediaria={props.getValorDescontadoTituloIntermediaria}
              setValorDescontadoTituloIntermediaria={props.setValorDescontadoTituloIntermediaria}
              getValorDescontadoTituloSaldo={props.getValorDescontadoTituloSaldo}
              setValorDescontadoTituloSaldo={props.setValorDescontadoTituloSaldo}
              getValorDescontadoTituloSinal={props.getValorDescontadoTituloSinal}
              setValorDescontadoTituloSinal={props.setValorDescontadoTituloSinal}
              getAjustarSaldoAoValorAVista={props.getAjustarSaldoAoValorAVista}
              getModelosDeVenda={props.getModelosDeVenda}
              setAjustarSaldoAoValorAVista={props.setAjustarSaldoAoValorAVista}
              setModelosDeVenda={props.setModelosDeVenda}
            />
          </>
        </Styled.Container>
        </SafeAreaView>
      </LinearGradient>
    </Modal>
  );
};