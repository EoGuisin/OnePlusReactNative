//#region React
import React, {useState, useEffect, memo, Dispatch, SetStateAction} from 'react';
import {Modal, TouchableOpacity, Platform, View, ScrollView, Linking, FlatList, Alert, PermissionsAndroid} from 'react-native';
import moment from 'moment';
import {useSelector} from 'react-redux';
//#endregion

//#region Icons
import {
  ArrowBack,
  Email,
  Anotation,
  Task,
  Gift,
  ScheduledVisits,
  Phone,
  Form,
  Activity,
  WPP,
  ThreeArrows,
  Clean,
} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Functions
import * as TextFormat from '../../../Themes/TextFormat';
import { ResponsiveHeight} from '../../../Functions';
//#endregion

//#region Services
import * as Controllers from '../../../Services/Controllers';
import { Object_ } from '../../../Services/Objects';
//#endregion

//#region Styled
import { Kanban } from '../../Catalog/Menu/PagesMenu/FunisDeVenda/type';
import { ToastMessage, Switch, Input, TouchInput, Annex } from '../../../Components';
import * as List from '../../../Data/List';
import * as Modals from '../';
import * as Styled from './styles';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
import {MotiTransitionProp, MotiView} from 'moti';
import {Easing} from 'react-native-reanimated';
import DatePicker from 'react-native-date-picker';
import DocumentPicker from 'react-native-document-picker'
import RNFetchBlob from 'rn-fetch-blob';
import {CameraOptions, launchCamera, launchImageLibrary} from 'react-native-image-picker';
//#endregion
interface UF {
  initials: string,
  states: string,
}
interface Props {
  visible: boolean;
  item: Object_.Lead;
  index: number;
  getSaleFunnel: Array<Object_.Funil>;
  getSelectedSaleFunnel: Object_.Funil | undefined;
  setLead:(value: Array<Kanban>) => void;
  getLead: Array<Kanban> | undefined | null;
  setVisibleLead:(value: boolean) => void;
  setSelectedLead:(value: Array<Object_.Lead>) => void;
  setLeadAnotation:(value: Array<Object_.Anotacao> | undefined) => void;
  getLeadAnotation: Array<Object_.Anotacao> | undefined;
  setLeadTask:(value: Array<Object_.Tarefa> | undefined) => void;
  getLeadTask: Array<Object_.Tarefa> | undefined;
  getLeadScheduledVisits: Array<Object_.AgendamentoDeVisita> | undefined;
  setLeadScheduledVisits: (value: Array<Object_.AgendamentoDeVisita> | undefined) => void;
  getLeadLinkGifts: Array<Object_.ItemDoAlmoxarifadoDeBrinde> | undefined;
  setLeadLinkGifts: (value: Array<Object_.ItemDoAlmoxarifadoDeBrinde> | undefined) => void;
  getDisqualification: boolean;
  setDisqualification: (value: boolean) => void;
  getOpportunity: boolean;
  setOpportunity: (value: boolean) => void;
  onPressClose(): void;
  getImageIdentification: string | undefined;
  setImageIdentification:(value: string | undefined) => void;
  getImageResponsibleAddress: string | undefined;
  setImageResponsibleAddress:(value: string | undefined) => void;
  getImageCorporateRegistration: string | undefined;
  setImageCorporateRegistration: (value: string | undefined) => void;
  getImageCorporateAddress: string | undefined;
  setImageCorporateAddress: (value: string | undefined) => void;
  getSelectedLeadDisqualification: Object_.Desqualificacao | undefined;
  setSelectedLeadDisqualification:(value: Object_.Desqualificacao | undefined) => void;
  getPdfOrImageIdentification: number | undefined;
  setPdfOrImageIdentification: (value: number | undefined) => void;
  getPdfOrImageAddress: number | undefined;
  setPdfOrImageAddress: (value: number | undefined) => void;
  getPdfOrImageCorporateAddress: number | undefined;
  setPdfOrImageCorporateAddress: (value: number | undefined) => void;
  getPdfOrImageCorporateRegistration: number | undefined;
  setPdfOrImageCorporateRegistration: (value: number | undefined) => void;
  getImageMaritalStatus: string | undefined;
  setImageMaritalStatus: (value: string | undefined) => void;
  getPdfOrImageMaritalStatus: number | undefined;
  setPdfOrImageMaritalStatus: (value: number | undefined) => void;
  getImageIdentificationSpouse: string | undefined;
  setImageIdentificationSpouse: (value: string | undefined) => void;
  getPdfOrImageIdentificationSpouse: number | undefined;
  setPdfOrImageIdentificationSpouse: (value: number | undefined) => void;
  getDocumentCorporateCardCNPJ: string | undefined;
  setDocumentCorporateCardCNPJ: (value: string | undefined) => void;
  getPdfOrImageDocumentCorporateCardCNPJ: number | undefined;
  setPdfOrImageDocumentCorporateCardCNPJ: (value: number | undefined) => void;
  getDocumentBoardTrade: string | undefined;
  setDocumentBoardTrade: (value: string | undefined) => void;
  getPdfOrImageDocumentBoardTrade: number | undefined;
  setPdfOrImageDocumentBoardTrade: (value: number | undefined) => void;
  getCellPhone: Object_.Telefone | undefined;
  setCellPhone:(value: Object_.Telefone | undefined) => void;
  getComercialPhone: Object_.Telefone | undefined;
  setComercialPhone:(value: Object_.Telefone | undefined) => void;
  salaDeVendaID: number;
  areaID: number;
  funilID: number;
  posicaoDoFunilID: number;
  posicaoDoFunilDescription: string;
  salaDeVendaDescription: string;
  areaDescription: string;
  funilDescription: string;
  setIsEnabledLegal: Dispatch<SetStateAction<boolean>>
  getIsEnabledLegal: boolean;
  getPersonalIncome: number | undefined;
  setPersonalIncome: Dispatch<SetStateAction<number | undefined>>;
  getCNPJ: string| undefined;
  setCNPJ: Dispatch<SetStateAction<string| undefined>>;
  getCorporateName: string| undefined;
  setCorporateName: Dispatch<SetStateAction<string| undefined>>;
  getFantasyName: string| undefined;
  setFantasyName: Dispatch<SetStateAction<string| undefined>>;
  getNIRE: string| undefined;
  setNIRE: Dispatch<SetStateAction<string| undefined>>;
  getSimplifiedCertificateNumber: string| undefined;
  setSimplifiedCertificateNumber: Dispatch<SetStateAction<string| undefined>>;
  getSimplifiedCertificateName: string| undefined;
  setSimplifiedCertificateName: Dispatch<SetStateAction<string| undefined>>;
  getDateIncorporation: string| undefined;
  setDateIncorporation: Dispatch<SetStateAction<string| undefined>>;
  getCorporateCEP: string| undefined;
  setCorporateCEP: Dispatch<SetStateAction<string| undefined>>;
  getCorporatePublicPlace: string| undefined;
  setCorporatePublicPlace: Dispatch<SetStateAction<string| undefined>>;
  getCorporateNumber: string| undefined;
  setCorporateNumber: Dispatch<SetStateAction<string| undefined>>;
  getCorporateComplement: string| undefined;
  setCorporateComplement: Dispatch<SetStateAction<string| undefined>>;
  getCorporateDistrict: string| undefined;
  setCorporateDistrict: Dispatch<SetStateAction<string| undefined>>;
  getCorporateCity: string| undefined;
  setCorporateCity: Dispatch<SetStateAction<string| undefined>>;
  getCorporateUF: string| undefined;
  setCorporateUF: Dispatch<SetStateAction<string| undefined>>;
  getName: string | undefined;
  setName: Dispatch<SetStateAction<string| undefined>>;
  getEmail: string | undefined;
  setEmail: Dispatch<SetStateAction<string| undefined>>;
  getCPF: string | undefined;
  setCPF: Dispatch<SetStateAction<string| undefined>>;
  getDataDeNascimento: string | undefined;
  setDataDeNascimento: Dispatch<SetStateAction<string| undefined>>;
  getNacionalidade: Object_.Nacao | undefined;
  setNacionalidade: Dispatch<SetStateAction<Object_.Nacao | undefined>>;
  getNaturalityUF: string | undefined;
  setNaturalityUF: Dispatch<SetStateAction<string | undefined>>;
  getNaturalityCity: string | undefined;
  setNaturalityCity: Dispatch<SetStateAction<string | undefined>>;
  getOcupacao: string | undefined;
  setOcupacao: Dispatch<SetStateAction<string | undefined>>;
  getFiliacao01: string | undefined;
  setFiliacao01: Dispatch<SetStateAction<string | undefined>>;
  getFiliacao02: string | undefined;
  setFiliacao02: Dispatch<SetStateAction<string | undefined>>;
  getNumberRG: string | undefined;
  setNumberRG: Dispatch<SetStateAction<string | undefined>>;
  getIssuingBodyRG: string | undefined;
  setIssuingBodyRG: Dispatch<SetStateAction<string | undefined>>;
  getUfRG: string | undefined;
  setUfRG: Dispatch<SetStateAction<string | undefined>>;
  getCNH_Number: string | undefined;
  setCNH_Number: Dispatch<SetStateAction<string | undefined>>;
  getCNH_ExpeditionDate: string | undefined;
  setCNH_ExpeditionDate: Dispatch<SetStateAction<string | undefined>>;
  getCNH_UF: string | undefined;
  setCNH_UF: Dispatch<SetStateAction<string | undefined>>;
  getSelectedMaritalStatus: number | undefined;
  setSelectedMaritalStatus: Dispatch<SetStateAction<number | undefined>>;
  getNameSpouse: string | undefined;
  setNameSpouse: Dispatch<SetStateAction<string | undefined>>;
  getEmailSpouse: string | undefined;
  setEmailSpouse: Dispatch<SetStateAction<string | undefined>>;
  getCPFSpouse: string | undefined;
  setCPFSpouse: Dispatch<SetStateAction<string | undefined>>;
  getBirthSpouse: string | undefined;
  setBirthSpouse: Dispatch<SetStateAction<string | undefined>>;
  getRGSpouse: string | undefined;
  setRGSpouse: Dispatch<SetStateAction<string | undefined>>;
  getIssuingAgencySpouse: string | undefined;
  setIssuingAgencySpouse: Dispatch<SetStateAction<string | undefined>>;
  getRGUFSpouse: string | undefined;
  setRGUFSpouse: Dispatch<SetStateAction<string | undefined>>;
  getNationalitySpouse: Object_.Nacao | undefined;
  setNationalitySpouse: Dispatch<SetStateAction<Object_.Nacao | undefined>>;
  getNaturalityUFSpouse: string | undefined;
  setNaturalityUFSpouse: Dispatch<SetStateAction<string | undefined>>;
  getNaturalityCitySpouse: string | undefined;
  setNaturalityCitySpouse: Dispatch<SetStateAction<string | undefined>>;
  getOcupationSpouse: string | undefined;
  setOcupationSpouse: Dispatch<SetStateAction<string | undefined>>;
  getPersonalIncomeSpouse: number | undefined;
  setPersonalIncomeSpouse: Dispatch<SetStateAction<number | undefined>>;
  getFiliacao01Spouse: string | undefined;
  setFiliacao01Spouse: Dispatch<SetStateAction<string | undefined>>;
  getFiliacao02Spouse: string | undefined;
  setFiliacao02Spouse: Dispatch<SetStateAction<string | undefined>>;
  getCellPhoneSpouse: Object_.Telefone | undefined;
  setCellPhoneSpouse: Dispatch<SetStateAction<Object_.Telefone | undefined>>;
  getCNH_NumberSpouse: string | undefined;
  setCNH_NumberSpouse: Dispatch<SetStateAction<string | undefined>>;
  getCNH_ExpeditionDateSpouse: string | undefined;
  setCNH_ExpeditionDateSpouse: Dispatch<SetStateAction<string | undefined>>;
  getCNH_UfSpouse: string | undefined;
  setCNH_UfSpouse: Dispatch<SetStateAction<string | undefined>>;
}

const FunilLead = (props: Props) => {
  //#region useState
  const [getSwipeCompany, setSwipeCompany] = useState<boolean>(false);
  const [getSwipeCompanyAddress, setSwipeCompanyAddress] = useState<boolean>(false);
  const [getSwipePersonals, setSwipePersonals] = useState<boolean>(false);
  const [getSwipeComplements, setSwipeComplements] = useState<boolean>(false);
  const [getDate] = useState<Date>(new Date());
  const [getOpen, setOpen] = useState<boolean>(false);
  const [getVisibleCorporateAddressUF, setVisibleCorporateAddressUF] = useState<boolean>(false);
  const [getVisibleRGPersonalUF, setVisibleRGPersonalUF] = useState<boolean>(false);
  const [getVisiblePersonalAddressUF, setVisiblePersonalAddressUF] = useState<boolean>(false);
  const [getVisibleUFSpouse, setVisibleUFSpouse] = useState<boolean>(false);
  const [getVisibleMaritalStatus, setVisibleMaritalStatus] = useState<boolean>(false);
  const [getMaritalStatus, setMaritalStatus] = useState<Array<Object_.RegimeDeBens>>();
  const [getVisibleNationality, setVisibleNationality] = useState<boolean>(false);
  const [getOriginalNationality, setOriginalNationality] = useState<Array<Object_.Nacao>>();
  const [getUF, setUF] = useState<Array<UF>>(List.UF);
  const [getVisibleNaturalityUF, setVisibleNaturalityUF] = useState<boolean>(false);
  const [getVisibleNaturalityCity, setVisibleNaturalityCity] = useState<boolean>(false);
  const [getArrayNaturalityCity, setArrayNaturalityCity] = useState<Array<string> | undefined>();
  const [getLoading, setLoading] = useState<boolean>(false);
  const [getCEP, setCEP] = useState<string | undefined>(undefined);
  const [getVisibleCNHDate, setVisibleCNHDate] = useState<boolean>(false);
  const [getVisibleCNH_UF, setVisibleCNH_UF] = useState<boolean>(false);
  const [getPublicPlace, setPublicPlace] = useState<string | undefined>(undefined);
  const [getNumber, setNumber] = useState<string | undefined>(undefined);
  const [getComplement, setComplement] = useState<string | undefined>(undefined);
  const [getDistrict, setDistrict] = useState<string | undefined>(undefined);
  const [getCity, setCity] = useState<string | undefined>(undefined);
  const [getUFAddress, setUFAddress] = useState<string | undefined>(undefined);
  const [getLeadDisqualification, setLeadDisqualification] = useState<Array<Object_.Desqualificacao>>([{} as Object_.Desqualificacao]);
  const [getVisibleModalDisqualification, setVisibleModalDisqualification] = useState<boolean>(false);
  const [getFunnellHistory, setFunnellHistory] = useState<boolean>(false);
  const [getFunnelLevels, setFunnelLevels] = useState<boolean>(true);
  const [getVisibleAnotation, setVisibleAnotation] = useState<boolean>(false);
  const [getVisibleTask, setVisibleTask] = useState<boolean>(false);
  const [getVisibleActivity, setVisibleActivity] = useState<boolean>(false);
  const [getVisibleEmail, setVisibleEmail] = useState<boolean>(false);
  const [getVisibleScheduledVisits, setVisibleScheduledVisits] = useState<boolean>(false);
  const [getVisibleForm, setVisibleForm] = useState<boolean>(false);
  const [getVisibleLinkGifts, setVisibleLinkGifts] = useState<boolean>(false);
  const [getShowToast, setShowToast] = useState<boolean>(false);
  const [getMessage1, setMessage1] = useState<string>("");
  const [getMessage2, setMessage2] = useState<string>("");
  const [getVisibleImageIdentification, setVisibleImageIdentification] = useState<boolean>(false);
  const [getVisibleImageIdentificationSpouse, setVisibleImageIdentificationSpouse] = useState<boolean>(false);
  const [getVisibleImageMaritalStatus, setVisibleImageMaritalStatus] = useState<boolean>(false);
  const [getVisibleImageAddress, setVisibleImageAddress] = useState<boolean>(false);
  const [getVisibleCorporateRegistration, setVisibleCorporateRegistration] = useState<boolean>(false);
  const [getVisibleCorporateAddress, setVisibleCorporateAddress] = useState<boolean>(false);
  const [getVisibleImageBoardTrade, setVisibleImageBoardTrade] = useState<boolean>(false);
  const [getVisiblePDFBoardTrade, setVisiblePDFBoardTrade] = useState<boolean>(false);
  const [getVisibleImageCardCNPJ, setVisibleImageCardCNPJ] = useState<boolean>(false);
  const [getVisiblePDFCardCNPJ, setVisiblePDFCardCNPJ] = useState<boolean>(false);
  const [getVisiblePDFIdentification, setVisiblePDFIdentification] = useState<boolean>(false);
  const [getVisiblePDFIdentificationSpouse, setVisiblePDFIdentificationSpouse] = useState<boolean>(false);
  const [getVisiblePDFAddress, setVisiblePDFAddress] = useState<boolean>(false);
  const [getVisiblePDFCorporateRegistration, setVisiblePDFCorporateRegistration] = useState<boolean>(false);
  const [getVisiblePDFCorporateAddress, setVisiblePDFCorporateAddress] = useState<boolean>(false);
  const [getVisiblePDFMaritalStatus, setVisiblePDFMaritalStatus] = useState<boolean>(false);
  const [getVisibleNationalitySpouse, setVisibleNationalitySpouse] = useState<boolean>(false);
  const [getVisibleDateIncorporation, setVisibleDateIncorporation] = useState<boolean>(false);
  const [getForm, setForm] = useState<Object_.Formulario[] | undefined>();
  const [getResponse, setResponse] = useState<Object_.Perguntas[] | undefined>(undefined);
  const [getNationality, setNationality] = useState<Array<Object_.Nacao>>();
  const [getVisibleBirthSpouse, setVisibleBirthSpouse] = useState<boolean>(false);
  const [getVisibleNaturalnessUFSpouse, setVisibleNaturalnessUFSpouse] = useState<boolean>(false);
  const [getVisibleNaturalnessCitySpouse, setVisibleNaturalnessCitySpouse] = useState<boolean>(false);
  const [getVisibleExpeditionDateSpouse, setVisibleExpeditionDateSpouse] = useState<boolean>(false);
  const [getVisibleCNH_UFSpouse, setVisibleCNH_UFSpouse] = useState<boolean>(false);
  //#endregion

  //#region Variables
  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);
  const Icons = [
    {
      id: 0,
      icon: WPP,
      descricao: 'WhatsApp',
    },
    {
      id: 1,
      icon: Activity,
      descricao: 'Atividades',
    },
    {
      id: 2,
      icon: Email,
      descricao: 'Email',
    },
    {
      id: 3,
      icon: Anotation,
      descricao: 'Anotações',
    },
    {
      id: 4,
      icon: Task,
      descricao: 'Tarefas',
    },
    {
      id: 5,
      icon: Gift,
      descricao: 'Brindes',
    },
    {
      id: 6,
      icon: ScheduledVisits,
      descricao: 'Agendamento de visitas',
    },
    {
      id: 7,
      icon: Phone,
      descricao: 'Telefone',
    },
    {
      id: 8,
      icon: Form,
      descricao: 'Formulário',
    },
  ]
  const blurredColor = "rgba(255, 255, 255, 0.7)";
  const transition: MotiTransitionProp = {
    type: 'timing',
    duration: 300,
    easing: Easing.out(Easing.ease),
  };
  //#endregion

  //#region Functions
  function Toast() {
    setShowToast(false)
  }

  async function MovimentationFunnel(funnel: Object_.PosicaoDoFunil): Promise<boolean> {
    setLoading(true)
    const today = new Date();
    let Movimentation = {} as Object_.HistoricoDoFunil;
    Movimentation = {
      salaDeVenda: {
        id: props.salaDeVendaID,
        descricao: props.salaDeVendaDescription,
      },
      area: {
        id: props.areaID,
        descricao: props.areaDescription,
      },
      funil: {
        id: props.funilID,
        descricao: props.funilDescription,
      },
      posicaoDoFunil: {
        descricao: funnel.descricao,
        id: funnel.id,
      },
      datasDeAlteracoes: [today.toISOString()],
      historicoDeResponsaveis: [DataLogin?.pessoa?.nome],
    } as Object_.HistoricoDoFunil;
    let ResponseMovimentation = await Controllers.Lead.NovaMovimentacaoNoFunil(DataLogin?.token, SelectedCompany?.id, props.item?.id, Movimentation);
    if (Math.floor(ResponseMovimentation.status / 100) === 2) {
      let Response = await Controllers.Lead.Get(DataLogin?.token, SelectedCompany?.id, false, undefined, props.item?.id, props.item?.nome, undefined, undefined, props.salaDeVendaID, props.areaID, false, props.funilID, undefined, undefined, true);
      if (Math.floor(Response.status / 100) === 2) {
        props.setSelectedLead(Response.data)
        setLoading(false)
        return true
        // Notification('success', 'Sucesso', 'Movimentação do funil realizado com sucesso!', 4000)
      }
    } else {
      setLoading(false)
      // Notification('success', 'Erro', 'Não foi possível realizar a movimentação do funil!', 4000)
      console.log('Movimentation', ResponseMovimentation)
      return false
    }
    return false
  }

  async function LeadDisqualification() {
    let Response = await Controllers.Desqualificacao.Get(DataLogin?.token, SelectedCompany?.id);
    if (Math.floor(Response.status / 100) === 2) {
      setLeadDisqualification(Response.data)
    } else {
      console.log("Something went wrong")
    }
  }

  async function ConfirmationUpdate() {
    if(props.getDisqualification === false && props.getSelectedLeadDisqualification === undefined) {
      setMessage1("Informação"); setMessage2("Você escolheu desqualificar o Lead, informe o motivo!"); setShowToast(true)
    } else {
      Update();
    }
  }

  async function Update() {
    setLoading(true);
    let phone = props.getCellPhone?.numero || props.getComercialPhone?.numero ? [props.getCellPhone?.numero!?.length < 9 ? undefined : props.getCellPhone, props.getComercialPhone?.numero!?.length < 9 ? undefined : props.getComercialPhone].filter(function (i) {return i}) : props.item?.telefones
    let body = {
      dataDeCadastro: props.item?.dataDeCadastro,
      id: props.item?.id,
      cpf: props.getCPF && TextFormat.CPF.DesformatarTexto(props.getCPF),
      nome: props.getName,
      dataDeNascimento: props.getDataDeNascimento,
      idade: undefined,
      naturalidade: {
        cidade: props.getNaturalityCity,
        uf: props.getNaturalityUF,
      },
      nacionalidade: props.getNacionalidade,
      sexo: props.item?.sexo,
      emails: [{
        classificacao: 0,
        descricao: props.getEmail,
        habilitarSSL: false,
        host: "",
        porta: "",
        senha: "",
        usuario: "",
      }],
      fotoDoLead: props.item?.fotoDoLead,
      documentoPessoal: props.getImageIdentification!?.length > 0 && props.getPdfOrImageIdentification != 2 ? {
        classificacao: 1,
        descricao: 'Documento do Lead - Pessoal',
        arquivo: props.getImageIdentification,
        extensao: props.getPdfOrImageIdentification == 0 ? 'jpg' : props.getPdfOrImageIdentification == 1 ? 'pdf' : undefined,
      } : props.getPdfOrImageIdentification == 2 ? undefined : props.item.documentoPessoal,
      rg: {
        numero: props.getNumberRG,
        orgaoEmissor: props.getIssuingBodyRG,
        uf: props.getUfRG,
      },
      cnh: {
        dataDeEmissao: props.getCNH_ExpeditionDate ,
        numero: props.getCNH_Number,
        uf: props.getCNH_UF,
      },
      filiacao01: props.getFiliacao01,
      filiacao02: props.getFiliacao02,
      estadoCivil: props.getSelectedMaritalStatus,
      certidaoDeCasamento: props.item?.certidaoDeCasamento,
      regimeDeCasamento: props.item?.regimeDeCasamento,
      ocupacao: {
        cargo: "",
        id: 0,
        nome: props.getOcupacao,
      },
      renda: props.getPersonalIncome,
      dadosDosVeiculos: props.item?.dadosDosVeiculos,
      dependentes: props.getSelectedMaritalStatus == 2 || props.getSelectedMaritalStatus == 7 ? [{
        classificacao: 1,
        nome: props.getNameSpouse,
        cpf: TextFormat.CPF.DesformatarTexto(props.getCPFSpouse),
        email: props.getEmailSpouse,
        dataDeNascimento: props.getBirthSpouse,
        rg: {
          numero: props.getRGSpouse,
          orgaoEmissor: props.getIssuingAgencySpouse,
          uf: props.getRGUFSpouse,
        },
        cnh: {
          dataDeEmissao: props.getCNH_ExpeditionDateSpouse,
          numero: props.getCNH_NumberSpouse,
          uf: props.getCNH_UfSpouse,
        },
        renda: props.getPersonalIncomeSpouse,
        filiacao01: props.getFiliacao01,
        filiacao02: props.getFiliacao02,
        ocupacao: props.getOcupationSpouse,
        telefones: props.getCellPhoneSpouse,
        naturalidade: {
          cidade: props.getNaturalityCitySpouse,
          uf: props.getNaturalityUFSpouse,
        },
        nacionalidade: props.getNationalitySpouse,
        fotoDoDependente: props.getImageIdentificationSpouse ? {
          classificacao: 4,
          descricao: 'Documento do Dependente - Pessoal',
          arquivo: props.getImageIdentificationSpouse,
          extensao: props.getPdfOrImageIdentificationSpouse ? props.getPdfOrImageIdentificationSpouse == 0 ? 'jpg' : props.getPdfOrImageIdentificationSpouse == 1 ? 'pdf' : undefined : undefined,
        } : props.item.dependentes![0]?.fotoDoDependente,
      }] : props.item?.dependentes,
      endereco: getCEP || getDistrict || getCity || getComplement || getPublicPlace || getNumber || getUFAddress ? {
        bairro: getDistrict,
        cep: getCEP ? getCEP : props.item.endereco?.cep,
        cidade: getCity ? getCity : props.item.endereco?.cidade,
        classificacao: 0,
        complemento: getComplement ? getComplement : props.item.endereco?.complemento,
        logradouro: getPublicPlace ? getPublicPlace : props.item.endereco?.logradouro,
        numero: getNumber ? getNumber : props.item.endereco?.numero,
        uf: getUFAddress ? getUFAddress : props.item.endereco?.uf,
      } : props.item?.endereco,
      documentoEndereco: props.getImageResponsibleAddress!?.length > 0 && props.getPdfOrImageAddress != 2 ? {
        classificacao: 2,
        descricao: 'Documento do Lead - Endereço',
        arquivo: props.getImageResponsibleAddress,
        extensao: props.getPdfOrImageAddress == 0 ? 'jpg' : props.getPdfOrImageAddress == 1 ? 'pdf' : undefined,
      } : props.getPdfOrImageAddress == 2 ? undefined : props.item.documentoEndereco,
      telefones: phone,
      localDeCaptacao: props.item?.localDeCaptacao,
      status: props.item?.status,
      alturaDoItem: props.item?.alturaDoItem,
      historicoDoFunil: props.item?.historicoDoFunil,
      atividades: props.item?.atividades,
      anotacoes: props.item?.anotacoes,
      emailsEnviados: props.item?.emailsEnviados,
      tarefas: props.item?.tarefas,
      formularios: props.item?.formularios,
      brindesOfertados: props.item?.brindesOfertados,
      historicoDoControleDeSala: props.item?.historicoDoControleDeSala,
      emSala: props.item?.emSala,
      keyField: props.item?.keyField,
      corDoCard: props.item?.corDoCard,
      agendamentosDeVisitas: props.item?.agendamentosDeVisitas,
      qualificado: props.getDisqualification,
      oportunidade: props.getOpportunity,
      motivoDeDesqualificacao: props.getSelectedLeadDisqualification,
      pjVinculado: props.getIsEnabledLegal ? {
        cnpj: props.getCNPJ && TextFormat.CNPJ.DesformatarTexto(props.getCNPJ),
        razaoSocial: props.getCorporateName,
        nomeFantasia: props.getFantasyName,
        nire: props.getNIRE,
        dataArqAtoConst: props.getDateIncorporation,
        numeroCertidaoSimplificada: props.getSimplifiedCertificateNumber,
        nomeCertidaoSimplificada: props.getSimplifiedCertificateName,
        certidaoDaJuntaComercial: props.getDocumentBoardTrade!?.length > 0 && props.getPdfOrImageDocumentBoardTrade != 2 ? {
          classificacao: 0,
          descricao: 'Documento PJ Vinculado - Ficha Cadastral',
          arquivo: props.getDocumentBoardTrade,
          extensao: props.getDocumentBoardTrade ? props.getPdfOrImageDocumentBoardTrade == 0 ? 'jpg' : props.getPdfOrImageDocumentBoardTrade == 1 ? 'pdf' : undefined : undefined,
        } : props.getPdfOrImageDocumentBoardTrade == 2 ? undefined : props.item.pjVinculado?.certidaoDaJuntaComercial,

        cartaoCNPJ: props.getDocumentCorporateCardCNPJ!?.length > 0 && props.getPdfOrImageDocumentCorporateCardCNPJ != 2 ? {
          classificacao: 0,
          descricao: 'Documento PJ Vinculado - Ficha Cadastral',
          arquivo: props.getDocumentCorporateCardCNPJ,
          extensao: props.getDocumentCorporateCardCNPJ ? props.getPdfOrImageDocumentCorporateCardCNPJ == 0 ? 'jpg' : props.getPdfOrImageDocumentCorporateCardCNPJ == 1 ? 'pdf' : undefined : undefined,
        } : props.getPdfOrImageDocumentCorporateCardCNPJ == 2 ? undefined : props.item.pjVinculado?.cartaoCNPJ,

        fichaCadastral: props.getImageCorporateRegistration!?.length > 0 && props.getPdfOrImageCorporateRegistration != 2 ? {
          classificacao: 6,
          descricao: 'Documento PJ Vinculado - Ficha Cadastral',
          arquivo: props.getImageCorporateRegistration,
          extensao: props.getImageCorporateRegistration ? props.getPdfOrImageCorporateRegistration == 0 ? 'jpg' : props.getPdfOrImageCorporateRegistration == 1 ? 'pdf' : undefined : undefined,
        }: props.getPdfOrImageCorporateRegistration == 2 ? undefined : props.item.pjVinculado?.fichaCadastral,
        endereco: {
          classificacao: 0,
          logradouro: props.getCorporatePublicPlace,
          numero: props.getCorporateNumber,
          complemento: props.getCorporateComplement,
          bairro: props.getCorporateDistrict,
          cidade: props.getCorporateCity,
          uf: props.getCorporateUF,
          cep: props.getCorporateCEP,
        },
        documentoEndereco: props.getImageCorporateAddress!?.length > 0 && props.getPdfOrImageCorporateAddress != 2 ? {
          classificacao: 7,
          descricao: 'Documento PJ Vinculado - Endereço',
          arquivo: props.getImageCorporateAddress,
          extensao: props.getImageCorporateAddress ? props.getPdfOrImageCorporateAddress == 0 ? 'jpg' : props.getPdfOrImageCorporateAddress == 1 ? 'pdf' : undefined : undefined,
        } : props.getPdfOrImageCorporateAddress == 2 ? undefined : props.item.pjVinculado?.documentoEndereco,
      } : props.item.pjVinculado,
      documentoDeEstadoCivil: props.getImageMaritalStatus!?.length > 0 && props.getPdfOrImageMaritalStatus != 2 ? {
        classificacao: 7,
        descricao: 'Documento do Lead - Estado civil',
        arquivo: props.getImageMaritalStatus,
        extensao: props.getPdfOrImageMaritalStatus == 0 ? 'jpg' : props.getPdfOrImageMaritalStatus == 1 ? 'pdf' : undefined,
      } : props.getPdfOrImageMaritalStatus == 2 ? undefined : props.item.documentoDeEstadoCivil,
    } as Object_.Lead;
    console.log(JSON.stringify(body))
    let Response = await Controllers.Lead.Put(DataLogin?.token, SelectedCompany?.id, body);
    if (Math.floor(Response.status / 100) === 2) {
      let response = await Controllers.Lead.Get(DataLogin?.token, SelectedCompany?.id, false, undefined, Response.data?.id, undefined, undefined, undefined, undefined, undefined, false, undefined, undefined, undefined, true);
      if (Math.floor(Response.status / 100) === 2) {
        props.setSelectedLead(response.data)
        props.setLeadAnotation(response.data[0]?.anotacoes)
        props.setLeadTask(response.data[0]?.tarefas)
        setLoading(false)
        setMessage1("Sucesso!"); setMessage2("Atualização realizada!"); setShowToast(true)
      }
    } else {
      setLoading(false)
      setMessage1("Erro!"); setMessage2("Entre em contato com a equipe de desenvolvimento!"); setShowToast(true)
      console.error(Response)
    }
  }

  async function Inativate() {
    setLoading(true)
    let Response = await Controllers.Lead.AlterarStatus(DataLogin?.token, SelectedCompany?.id, props.item?.id, false);
    if (Math.floor(Response.status / 100) === 2) {
      setLoading(false)
      let ListLead = [...props.getLead ?? []];
      ListLead.splice(props.index, 1);
      props.setLead(ListLead);
      props.setVisibleLead(false)
      setMessage1("Sucesso!"); setMessage2("Lead inativado com sucesso!"); setShowToast(true)
    } else {
      console.log(Response)
      setLoading(false)
      setMessage1("Erro!"); setMessage2("Não foi possível inativar o Lead. Entre em contato com a equipe de desenvolvimento!"); setShowToast(true)
    }
  }

  async function CEP(cep: string) {
    setLoading(true)
    let Response = await Controllers.Correios.Get(DataLogin?.token, cep)
    if(Math.floor(Response.status / 100) === 2) {
      console.log(Response.data)
      setCEP(Response.data.cep)
      setPublicPlace(Response.data.logradouro)
      setComplement(Response.data.complemento)
      setDistrict(Response.data.bairro)
      setCity(Response.data.cidade?.descricao)
      setUFAddress(Response.data.uf?.sigla)
      setLoading(false)
    }
    setLoading(false)
  }

  async function CorporateCEP(cep: string) {
    let Response = await Controllers.Correios.Get(DataLogin?.token, cep)
    if(Math.floor(Response.status / 100) === 2) {
      props.setCorporateCEP(Response.data.cep)
      props.setCorporatePublicPlace(Response.data.logradouro)
      props.setCorporateComplement(Response.data.complemento)
      props.setCorporateDistrict(Response.data.bairro)
      props.setCorporateCity(Response.data.cidade?.descricao)
      props.setCorporateUF(Response.data.uf?.descricao)
    }
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
    setNationality(FilteredNationality?.filter((data: Object_.Nacao) => data.nacionalidade?.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(search.toLowerCase())))
  }

  function SearchUF(search: string) {
    let FilteredUF = JSON.parse(JSON.stringify(List.UF))
    setUF(FilteredUF?.filter((data: UF) => data.states.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(search)))
  }

  function SearchCity(search: string) {
    let FilteredNaturalness = JSON.parse(JSON.stringify(
      props.getNaturalityUF === "AC" ? List.Acre
      : props.getNaturalityUF === "AL" ? List.Alagoas
      : props.getNaturalityUF === "AP" ? List.Amapa
      : props.getNaturalityUF === "AM" ? List.Amazonas
      : props.getNaturalityUF === "BA" ? List.Bahia
      : props.getNaturalityUF === "CE" ? List.Ceara
      : props.getNaturalityUF === "DF" ? List.DistritoFederal
      : props.getNaturalityUF === "ES" ? List.EspiritoSanto
      : props.getNaturalityUF === "GO" ? List.Goias
      : props.getNaturalityUF === "MA" ? List.Maranhao
      : props.getNaturalityUF === "MT" ? List.MatoGrosso
      : props.getNaturalityUF === "MS" ? List.MatoGrossoDoSul
      : props.getNaturalityUF === "MG" ? List.MinasGerais
      : props.getNaturalityUF === "PA" ? List.Para
      : props.getNaturalityUF === "PB" ? List.Paraiba
      : props.getNaturalityUF === "PR" ? List.Parana
      : props.getNaturalityUF === "PE" ? List.Pernambuco
      : props.getNaturalityUF === "PI" ? List.Piaui
      : props.getNaturalityUF === "RJ" ? List.RioDeJaneiro
      : props.getNaturalityUF === "RN" ? List.RioGrandeDoNorte
      : props.getNaturalityUF === "RS" ? List.RioGrandeDoSul
      : props.getNaturalityUF === "RO" ? List.Rondonia
      : props.getNaturalityUF === "RR" ? List.Roraima
      : props.getNaturalityUF === "SC" ? List.SantaCatarina
      : props.getNaturalityUF === "SP" ? List.SaoPaulo
      : props.getNaturalityUF === "SE" ? List.Sergipe
      : props.getNaturalityUF === "TO" ? List.Tocantins
      : undefined
    ))
    setArrayNaturalityCity(FilteredNaturalness?.filter((data: string) => data.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(search)))
  }

  async function ConfirmationLostSell(item: Object_.PosicaoDoFunil) {
    if(SelectedCompany.id == 5) {
      if(item.id == 6) {
        if(props.getSelectedLeadDisqualification == undefined) {
          setMessage1("Informação"); setMessage2("Selecione o motivo da desqualificação para enviá-lo para Venda Perdida!"); setShowToast(true);
        } else {
          if(await MovimentationFunnel(item) == true) {
            Update();
          }
        }
      } else if(item.id >= 2) {
        MovimentationFunnel(item);
      }
    } else {
      if(item.id == 6) {
        if(props.getDisqualification == true  && props.getSelectedLeadDisqualification == undefined) {
          setMessage1("Informação"); setMessage2("Desqualifique o Lead e selecione o motivo para enviá-lo para Venda Perdida!"); setShowToast(true);
        } else if(props.getDisqualification == false && props.getSelectedLeadDisqualification == undefined) {
          setMessage1("Informação"); setMessage2("Selecione o motivo da desqualificação para enviá-lo para Venda Perdida!"); setShowToast(true)
        } else if(props.getDisqualification == true && props.getSelectedLeadDisqualification != undefined) {
          setMessage1("Confirmação de envio do Lead para Venda Perdida"); setMessage2("Deseja realmente enviar este Lead para Venda Perdida?"); setShowToast(true);
        } else {
          if(await MovimentationFunnel(item) == true) {
            Update();
          }
        }
      } else MovimentationFunnel(item);
    }
  }

  //#region Identification
  async function requestCameraPermissionIdentification() {
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
        pickCameraIdentification();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async function pickCameraIdentification() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchCamera(options);
    console.log(result);
    if(result?.assets != undefined) {
      props.setImageIdentification(result?.assets[0]?.base64)
      props.setPdfOrImageIdentification(0)
    }
  }
  
  async function pickLibraryIdentification() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchImageLibrary(options);
    if(result?.assets != undefined) {
      props.setImageIdentification(result?.assets[0]?.base64)
      props.setPdfOrImageIdentification(0)
    }
  }

  async function DocumentPDFIdentification() {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        presentationStyle:'fullScreen'
      });
      let uri = doc.uri
      if (Platform.OS === 'ios') {
        uri = doc.uri.replace('file:', '')
      } else {
        uri = doc.uri
      }
      const decodedPath = decodeURIComponent(uri)
      RNFetchBlob.fs.readFile(decodedPath, 'base64').then((data: string) => {
        props.setImageIdentification(data)
        props.setPdfOrImageIdentification(1)
      }).catch((err) => {
        console.error("Erro BASE64 -", err);
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
  //#endregion

  //#region Address
  async function requestCameraPermissionAddress() {
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
        pickCameraAddress();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async function pickCameraAddress() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchCamera(options);
    if(result?.assets != undefined) {
      props.setImageResponsibleAddress(result?.assets[0]?.base64)
      props.setPdfOrImageAddress(0)
    }
  }
  
  async function pickLibraryAddress() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchImageLibrary(options);
    if(result?.assets != undefined) {
      props.setImageResponsibleAddress(result.assets[0]?.base64)
      props.setPdfOrImageAddress(0)
    }
  }

  async function DocumentPDFAddress() {
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
        props.setImageResponsibleAddress(data)
        props.setPdfOrImageAddress(1)
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
  //#endregion
  
  //#region Corporate
  async function requestCameraPermissionCorporateRegistration() {
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
        pickCameraCorporateRegistration();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async function pickCameraCorporateRegistration() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchCamera(options);
    if(result?.assets != undefined) {
      props.setImageCorporateRegistration(result?.assets[0]?.base64)
      props.setPdfOrImageCorporateRegistration(0)
    }
  }
  
  async function pickLibraryCorporateRegistration() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchImageLibrary(options);
    if(result?.assets != undefined) {
      props.setImageCorporateRegistration(result.assets[0]?.base64)
      props.setPdfOrImageCorporateRegistration(0)
    }
  }

  async function DocumentPDFCorporateRegistration() {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        presentationStyle:'fullScreen'
      });
      let uri = doc.uri
      if (Platform.OS === 'ios') {
        uri = doc.uri.replace('file:', '')
      } else {
        uri = doc.uri
      }
      const decodedPath = decodeURIComponent(uri)
      RNFetchBlob.fs.readFile(decodedPath, 'base64').then((data: string) => {
        props.setImageCorporateRegistration(data)
        props.setPdfOrImageCorporateRegistration(1)
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
  //#endregion

  //#region Corporate Board Trade
  async function requestBoardTradeCameraPermission() {
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
        pickCameraBoardTrade();
      }
    } catch (err) {
      console.warn(err);
    }
  }

  async function pickCameraBoardTrade() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchCamera(options);
    if(result?.assets != undefined) {
      props.setDocumentBoardTrade(result?.assets[0]?.base64)
      props.setPdfOrImageDocumentBoardTrade(0)
    }
  }
  
  async function pickLibraryBoardTrade() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchImageLibrary(options);
    if(result?.assets != undefined) {
      props.setDocumentBoardTrade(result.assets[0]?.base64)
      props.setPdfOrImageDocumentBoardTrade(0)
    }
  }

  async function DocumentPDFBoardTrade() {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        presentationStyle:'fullScreen'
      });
      let uri = doc.uri
      if (Platform.OS === 'ios') {
        uri = doc.uri.replace('file:', '')
      } else {
        uri = doc.uri
      }
      const decodedPath = decodeURIComponent(uri)
      RNFetchBlob.fs.readFile(decodedPath, 'base64').then((data: string) => {
        props.setDocumentBoardTrade(data)
        props.setPdfOrImageDocumentBoardTrade(1)
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
  //#endregion

  //#region Corporate Card CNPJ
  async function requestCardCNPJCameraPermission() {
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
        pickCameraCardCNPJ();
      }
    } catch (err) {
      console.warn(err);
    }
  }

  async function pickCameraCardCNPJ() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchCamera(options);
    if(result?.assets != undefined) {
      props.setDocumentCorporateCardCNPJ(result?.assets[0]?.base64)
      props.setPdfOrImageDocumentCorporateCardCNPJ(0)
    }
  }
  
  async function pickLibraryCardCNPJ() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchImageLibrary(options);
    if(result?.assets != undefined) {
      props.setDocumentCorporateCardCNPJ(result.assets[0]?.base64)
      props.setPdfOrImageDocumentCorporateCardCNPJ(0)
    }
  }

  async function DocumentPDFCardCNPJ() {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        presentationStyle:'fullScreen'
      });
      let uri = doc.uri
      if (Platform.OS === 'ios') {
        uri = doc.uri.replace('file:', '')
      } else {
        uri = doc.uri
      }
      const decodedPath = decodeURIComponent(uri)
      RNFetchBlob.fs.readFile(decodedPath, 'base64').then((data: string) => {
        props.setDocumentCorporateCardCNPJ(data)
        props.setPdfOrImageDocumentCorporateCardCNPJ(1)
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
  //#endregion

  //#region Coporate Address
  async function requestCameraPermissionCorporateAddress() {
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
        pickCameraCorporateAddress();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async function pickCameraCorporateAddress() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchCamera(options);
    if(result?.assets != undefined) {
      props.setImageCorporateAddress(result?.assets[0]?.base64)
      props.setPdfOrImageCorporateAddress(0)
    }
  }
  
  async function pickLibraryCorporateAddress() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchImageLibrary(options);
    if(result?.assets != undefined) {
      props.setImageCorporateAddress(result.assets[0]?.base64)
      props.setPdfOrImageCorporateAddress(0)
    }
  }

  async function DocumentPDFCorporateAddress() {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        presentationStyle:'fullScreen'
      });
      let uri = doc.uri
      if (Platform.OS === 'ios') {
        uri = doc.uri.replace('file:', '')
      } else {
        uri = doc.uri
      }
      const decodedPath = decodeURIComponent(uri)
      RNFetchBlob.fs.readFile(decodedPath, 'base64').then((data: string) => {
        props.setImageCorporateAddress(data)
        props.setPdfOrImageCorporateAddress(1)
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
  //#endregion

  //#region Marital Status
  async function requestCameraPermissionMaritalStatus() {
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
        pickCameraMaritalStatus();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async function pickCameraMaritalStatus() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchCamera(options);
    if(result?.assets != undefined) {
      props.setImageMaritalStatus(result?.assets[0]?.base64)
      props.setPdfOrImageMaritalStatus(0)
    }
  }
  
  async function pickLibraryMaritalStatus() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchImageLibrary(options);
    if(result?.assets != undefined) {
      props.setImageMaritalStatus(result.assets[0]?.base64)
      props.setPdfOrImageMaritalStatus(0)
    }
  }

  async function DocumentPDFMaritalStatus() {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        presentationStyle:'fullScreen'
      });
      let uri = doc.uri
      if (Platform.OS === 'ios') {
        uri = doc.uri.replace('file:', '')
      } else {
        uri = doc.uri
      }
      const decodedPath = decodeURIComponent(uri)
      RNFetchBlob.fs.readFile(decodedPath, 'base64').then((data: string) => {
        props.setImageMaritalStatus(data)
        props.setPdfOrImageMaritalStatus(1)
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
  //#endregion
  
  //#region Identification Spouse
  async function requestCameraPermissionIdentificationSpouse() {
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
        pickCameraIdentificationSpouse();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async function pickCameraIdentificationSpouse() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchCamera(options);
    console.log(result);
    if(result?.assets != undefined) {
      props.setImageIdentificationSpouse(result?.assets[0]?.base64)
      props.setPdfOrImageIdentificationSpouse(0)
    }
  }
  
  async function pickLibraryIdentificationSpouse() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchImageLibrary(options);
    if(result?.assets != undefined) {
      props.setImageIdentificationSpouse(result?.assets[0]?.base64)
      props.setPdfOrImageIdentificationSpouse(0)
    }
  }

  async function DocumentPDFIdentificationSpouse() {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        presentationStyle:'fullScreen'
      });
      let uri = doc.uri
      if (Platform.OS === 'ios') {
        uri = doc.uri.replace('file:', '')
      } else {
        uri = doc.uri
      }
      const decodedPath = decodeURIComponent(uri)
      RNFetchBlob.fs.readFile(decodedPath, 'base64').then((data: string) => {
        props.setImageIdentificationSpouse(data)
        props.setPdfOrImageIdentificationSpouse(1)
      }).catch((err) => {
        console.error("Erro BASE64 -", err);
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
  //#endregion


  function SwitchQualified() {
    if(props.getDisqualification === true) {
      props.setDisqualification(false)
    } else {
      props.setDisqualification(true)
    }
  }

  function SwitchOpportunity() {
    if(props.getOpportunity === true) {
      props.setOpportunity(false)
    } else {
      props.setOpportunity(true)
    }
  }

  function OpenForm() {
    setResponse(props.item?.formularios![0]?.perguntas)
    setVisibleForm(true);
  }
  //#endregion

  //#region UseEffect
  useEffect(() => {
    NationalityAPI();
    MaritalStatusAPI();
    LeadDisqualification();
    if(props.item) {
      props.item.pjVinculado ? props.setIsEnabledLegal(true) : props.setIsEnabledLegal(false)
    }
  }, []);
  //#endregion

  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <Styled.Container>
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
            <Styled.TextHeader>{props.item?.nome?.split(" ")[0]} {props.item?.nome?.split(" ")[1]}</Styled.TextHeader>
          </Styled.ContainerHeader>
          <Styled.ContainerIcons>
          {Icons.map(item =>
            <TouchableOpacity onPress={() => {
              item.id === 0 ? Linking.openURL(`https://wa.me/55${props.item?.telefones![0]?.ddd + props.item?.telefones![0]?.numero}?text=Olá ${props.item?.nome}, tudo bem? Sou o ${DataLogin!?.pessoa?.nome} e vou fazer seu atendimento sobre o ${props.item?.historicoDoFunil![0]?.salaDeVenda?.descricao} a partir de agora. Como posso te ajudar?`) :
              item.id === 1 ? setVisibleActivity(true) :
              item.id === 2 ? setVisibleEmail(true) :
              item.id === 3 ? setVisibleAnotation(true) :
              item.id === 4 ? setVisibleTask(true) :
              item.id === 5 ? setVisibleLinkGifts(true) :
              item.id === 6 ? setVisibleScheduledVisits(true) :
              item.id === 7 ? Linking.openURL(`tel:${props.item?.telefones![0].ddd + props.item?.telefones![0].numero}`) :
              item.id === 8 ? OpenForm() :
              undefined
            }}>
              <SvgCss xml={item.icon} />
            </TouchableOpacity>)}

          </Styled.ContainerIcons>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Styled.ContainerLegal style={{}}>
              <Styled.TextLegal>{`Este Lead será uma pessoa \njurídica?`}</Styled.TextLegal>
              <Switch
                size={25}
                onPress={() => {props.setIsEnabledLegal((previous: boolean) => !previous)}}
                isEnabled={props.getIsEnabledLegal}
              />
            </Styled.ContainerLegal>
            {props.getIsEnabledLegal &&
            <View>
              {/*DADOS EMPRESARIAIS*/}
              <MotiView
                transition={transition}
                from={{paddingBottom: getSwipeCompany === true ? '10%' : '2%'}}
                style={{
                  backgroundColor: 'rgba(192, 227, 220, 0.3)',
                  borderRadius: 20,
                  marginHorizontal: '5%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: '4%',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  marginTop: '3%',
                }}>
                <Styled.SubContainerText style={{color: '#FFFFFF'}}>Dados Empresa Vinculada</Styled.SubContainerText>
                {getSwipeCompany ?
                <Styled.Swipe onPress={() => {setSwipeCompany(false)}}>
                  <SvgCss xml={ThreeArrows} style={{marginRight: '5%', marginTop: '4%', transform: [{ rotateY: '180deg' }]}} />
                </Styled.Swipe> :
                <Styled.Swipe onPress={() => {setSwipeCompany(true)}}>
                  <SvgCss xml={ThreeArrows} style={{marginRight: '5%', marginTop: '4%'}} />
                </Styled.Swipe>}
                {getSwipeCompany &&
                <View style={{width: '100%'}}>
                  <Annex
                    viewImage={() => {setVisibleCorporateRegistration(true)}}
                    viewPDF={() => setVisiblePDFCorporateRegistration(true)}
                    PDForIMAGE={props.getPdfOrImageCorporateRegistration}
                    cancelTouch={() => {props.setImageCorporateRegistration(undefined); props.setPdfOrImageCorporateRegistration(2)}}
                    library={() => pickLibraryCorporateRegistration()}
                    pdf={() => DocumentPDFCorporateRegistration()}
                    camera={() => requestCameraPermissionCorporateRegistration()}
                    uri={props.getImageCorporateRegistration}
                    title='Anexe a Ficha Cadastral da Empresa'
                    base64={true}
                    heightImage={100}
                    widthImage={170}
                    heightPdf={100}
                    widthPdf={170}
                  />
                  <Modals.ViewImage
                    marginLeft={"5%"}
                    title="Imagem Selecionada"
                    onPressClose={() => {setVisibleCorporateRegistration(false)}}
                    visible={getVisibleCorporateRegistration}
                    image={props.getImageCorporateRegistration}
                  />
                  <Modals.PdfViewer
                    visible={getVisiblePDFCorporateRegistration}
                    onPressClose={() => {setVisiblePDFCorporateRegistration(false)}}
                    resource={props.getImageCorporateRegistration}
                  />
                  <Annex
                    viewImage={() => setVisibleImageBoardTrade(true)}
                    viewPDF={() => setVisiblePDFBoardTrade(true)}
                    PDForIMAGE={props.getPdfOrImageDocumentBoardTrade}
                    cancelTouch={() => {props.setDocumentBoardTrade(undefined); props.setPdfOrImageDocumentBoardTrade(2)}}
                    library={() => pickLibraryBoardTrade()}
                    pdf={() => DocumentPDFBoardTrade()}
                    camera={() => requestBoardTradeCameraPermission()}
                    uri={props.getDocumentBoardTrade}
                    title='Anexe a Certidão de Junta Comercial'
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
                    image={props.getDocumentBoardTrade}
                  />
                  <Modals.PdfViewer
                    visible={getVisiblePDFBoardTrade}
                    onPressClose={() => {setVisiblePDFBoardTrade(false)}}
                    resource={props.getDocumentBoardTrade}
                  />
                  <Annex
                    viewImage={() => setVisibleImageCardCNPJ(true)}
                    viewPDF={() => setVisiblePDFCardCNPJ(true)}
                    PDForIMAGE={props.getPdfOrImageDocumentCorporateCardCNPJ}
                    cancelTouch={() => {props.setDocumentCorporateCardCNPJ(undefined); props.setPdfOrImageDocumentCorporateCardCNPJ(2)}}
                    library={() => pickLibraryCardCNPJ()}
                    pdf={() => DocumentPDFCardCNPJ()}
                    camera={() => requestCardCNPJCameraPermission()}
                    uri={props.getDocumentCorporateCardCNPJ}
                    title='    Anexe o Cartão do CNPJ'
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
                    image={props.getDocumentCorporateCardCNPJ}
                  />
                  <Modals.PdfViewer
                    visible={getVisiblePDFCardCNPJ}
                    onPressClose={() => {setVisiblePDFCardCNPJ(false)}}
                    resource={props.getDocumentCorporateCardCNPJ}
                  />
                  <Input
                    key='cnpj'
                    onChangeText={(text) => props.setCNPJ(text)}
                    nameInput={TextFormat.CNPJ.FormatarTexto(props.getCNPJ)} titleInput='CNPJ' keyboardType='number-pad' placeholder={TextFormat.CNPJ.FormatarTexto("00000000000000")} placeholderTextColor={blurredColor}
                  />
                  <Input
                    key='corporate name'
                    onChangeText={(text) => props.setCorporateName(text)}
                    nameInput={props.getCorporateName} titleInput='Razão social' keyboardType='default' placeholder='Razão Social' placeholderTextColor={blurredColor}
                  />
                  <Input
                    key='fantasy name'
                    onChangeText={(text) => props.setFantasyName(text)}
                    nameInput={props.getFantasyName} titleInput='Nome fantasia' keyboardType='default' placeholder='Nome Fantasia' placeholderTextColor={blurredColor}
                  />
                  <Input
                    key='nire'
                    onChangeText={(text) => props.setNIRE(text)}
                    nameInput={props.getNIRE} titleInput='NIRE' keyboardType='number-pad' placeholder='00000000000' placeholderTextColor={blurredColor} colorOptionalInput={blurredColor} colorWithNothing={blurredColor}
                  />
                  <Input
                    key='simplified certificate number'
                    onChangeText={(text) => props.setSimplifiedCertificateNumber(text)}
                    nameInput={props.getSimplifiedCertificateNumber} titleInput='Certidão Simplificada Nº' keyboardType='number-pad' placeholder='0000' placeholderTextColor={blurredColor} colorOptionalInput={blurredColor} colorWithNothing={blurredColor}
                  />
                  <Input
                    key='simplified certificate name'
                    onChangeText={(text) => props.setSimplifiedCertificateName(text)}
                    nameInput={props.getSimplifiedCertificateName} titleInput='Nome da Certidão' keyboardType='number-pad' placeholder='Nome da Certidão' placeholderTextColor={blurredColor} colorOptionalInput={blurredColor} colorWithNothing={blurredColor}
                  />
                  <TouchInput
                    onPress={() => setVisibleDateIncorporation(true)}
                    selectedInput={props.getDateIncorporation ? moment(props.getDateIncorporation).format("DD/MM/YYYY") : undefined} titleInput='Dt. ato constitutivo' colorWithNothingSelected={blurredColor} colorOptionalInput={blurredColor}
                  />
                </View>}
              </MotiView>

              {/*ENDERECO EMPRESARIAL*/}
              <MotiView
                transition={transition}
                from={{paddingBottom: getSwipeCompanyAddress === true ? '10%' : '2%'}}
                style={{
                  backgroundColor: 'rgba(192, 227, 220, 0.3)',
                  borderRadius: 20,
                  marginHorizontal: '5%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: '4%',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  marginTop: '3%',
                }}>
                <Styled.SubContainerText style={{color: '#FFFFFF'}}>Endereço Empresa Vinculada</Styled.SubContainerText>
                {getSwipeCompanyAddress ?
                <Styled.Swipe onPress={() => {setSwipeCompanyAddress(false)}}>
                  <SvgCss xml={ThreeArrows} style={{marginRight: '5%', marginTop: '4%', transform: [{ rotateY: '180deg' }]}} />
                </Styled.Swipe> :
                <Styled.Swipe onPress={() => {setSwipeCompanyAddress(true)}}>
                  <SvgCss xml={ThreeArrows} style={{marginRight: '5%', marginTop: '4%'}} />
                </Styled.Swipe>}
                {getSwipeCompanyAddress ?
                <View>
                  <Annex
                    viewImage={() => {setVisibleCorporateAddress(true)}}
                    viewPDF={() => setVisiblePDFCorporateAddress(true)}
                    PDForIMAGE={props.getPdfOrImageCorporateAddress}
                    cancelTouch={() => {props.setImageCorporateAddress(undefined); props.setPdfOrImageCorporateAddress(2)}}
                    library={() => pickLibraryCorporateAddress()}
                    pdf={() => DocumentPDFCorporateAddress()}
                    camera={() => requestCameraPermissionCorporateAddress()}
                    uri={props.getImageCorporateAddress}
                    title='Anexe Comprovante de Endereço'
                    base64={true}
                    heightImage={100}
                    widthImage={170}
                    heightPdf={100}
                    widthPdf={170}
                  />
                  <Modals.ViewImage
                    marginLeft={"5%"}
                    title="Imagem Selecionada"
                    onPressClose={() => {setVisibleCorporateAddress(false)}}
                    visible={getVisibleCorporateAddress}
                    image={props.getImageCorporateAddress}
                  />
                  <Modals.PdfViewer
                    visible={getVisiblePDFCorporateAddress}
                    onPressClose={() => {setVisiblePDFCorporateAddress(false)}}
                    resource={props.getImageCorporateAddress}
                  />
                  <Input
                    key='corporate cep'
                    onChangeText={(text) => {
                      if(text.length == 8) CorporateCEP(text)
                      props.setCorporateCEP(text)
                    }}
                    nameInput={props.getCorporateCEP} titleInput='CEP' keyboardType='default'
                  />
                  <Input
                    key='corporate public place'
                    onChangeText={(text) => props.setCorporatePublicPlace(text)}
                    nameInput={props.getCorporatePublicPlace} titleInput='Logradouro' keyboardType='default'
                  />
                  <Input
                    key='corporate number'
                    onChangeText={(text) => props.setCorporateNumber(text)}
                    nameInput={props.getCorporateNumber} titleInput='Numero' keyboardType='default'
                  />
                  <Input
                    key='corporate complement'
                    onChangeText={(text) => props.setCorporateComplement(text)}
                    nameInput={props.getCorporateComplement} titleInput='Complemento' keyboardType='default'
                  />
                  <Input
                    key='corporate district'
                    onChangeText={(text) => props.setCorporateDistrict(text)}
                    nameInput={props.getCorporateDistrict} titleInput='Bairro' keyboardType='default'
                  />
                  <Input
                    key='corporate city'
                    onChangeText={(text) => props.setCorporateCity(text)}
                    nameInput={props.getCorporateCity} titleInput='Cidade' keyboardType='default'
                  />
                  <TouchInput 
                    onPress={() => {setVisibleCorporateAddressUF(true)}}
                    selectedInput={props.getCorporateUF} titleInput='UF'
                  />
                </View>
                : <></>}
              </MotiView>
            </View>}

            {/*DADOS PESSOAIS*/}
              <MotiView
                transition={transition}
                from={{paddingBottom: getSwipePersonals === true ? '10%' : '2%'}}
                style={{
                  backgroundColor: 'rgba(192, 227, 220, 0.3)',
                  borderRadius: 20,
                  marginHorizontal: '5%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: '4%',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  marginTop: '3%',
                }}>
                <Styled.SubContainerText style={{color: '#FFFFFF'}}>Dados Pessoais</Styled.SubContainerText>
                {getSwipePersonals ?
                <Styled.Swipe onPress={() => {setSwipePersonals(false)}}>
                  <SvgCss xml={ThreeArrows} style={{marginRight: '5%', marginTop: '4%', transform: [{ rotateY: '180deg' }]}} />
                </Styled.Swipe> :
                <Styled.Swipe onPress={() => {setSwipePersonals(true)}}>
                  <SvgCss xml={ThreeArrows} style={{marginRight: '5%', marginTop: '4%'}} />
                </Styled.Swipe>}
                {getSwipePersonals &&
                <View style={{width: '100%'}}>
                  <Annex
                    viewImage={() => {setVisibleImageIdentification(true)}}
                    viewPDF={() => setVisiblePDFIdentification(true)}
                    PDForIMAGE={props.getPdfOrImageIdentification}
                    cancelTouch={() => {props.setImageIdentification(undefined); props.setPdfOrImageIdentification(2)}}
                    library={() => pickLibraryIdentification()}
                    pdf={() => DocumentPDFIdentification()}
                    camera={() => requestCameraPermissionIdentification()}
                    uri={props.getImageIdentification}
                    title='Anexe um Documento Pessoal'
                    base64={true}
                    heightImage={100}
                    widthImage={170}
                    heightPdf={100}
                    widthPdf={170}
                  />
                  <Modals.ViewImage
                    marginLeft={"5%"}
                    title="Imagem Selecionada"
                    onPressClose={() => {setVisibleImageIdentification(false)}}
                    visible={getVisibleImageIdentification}
                    image={props.getImageIdentification}
                  />
                  <Modals.PdfViewer
                    visible={getVisiblePDFIdentification}
                    onPressClose={() => {setVisiblePDFIdentification(false)}}
                    resource={props.getImageIdentification}
                  />
                  <Input
                    key='name'
                    onChangeText={(text) => props.setName(text)}
                    nameInput={props?.item?.nome} titleInput='Nome' keyboardType='default' placeholder="Nome e Sobrenome" placeholderTextColor={blurredColor}
                  />
                  <Input
                    key='email'
                    onChangeText={(text) => props.setEmail(text)}
                    nameInput={props.item?.emails![0]?.descricao} titleInput='Email' keyboardType='email-address' placeholder="email@dominio.com.br" placeholderTextColor={blurredColor}
                  />
                  <Input
                    key='cpf'
                    onChangeText={(text) => props.setCPF(text)}
                    nameInput={TextFormat.CPF.FormatarTexto(props.getCPF)} titleInput='CPF' keyboardType='number-pad' placeholder={TextFormat.CPF.FormatarTexto("00000000000")} placeholderTextColor={blurredColor}
                  />
                  <TouchInput 
                    key='birth'
                    onPress={() => {setOpen(true)}}
                    selectedInput={props.getDataDeNascimento ? moment(props.getDataDeNascimento).format("DD/MM/YYYY") : undefined} titleInput='Dt. Nascimento'
                  />
                  <TouchInput 
                    key='nationality'
                    onPress={() => {setVisibleNationality(true)}}
                    selectedInput={props.getNacionalidade?.nacionalidade} titleInput='Nacionalidade'
                  />
                  <TouchInput 
                    key='naturality (uf)'
                    onPress={() => {setVisibleNaturalityUF(true)}}
                    selectedInput={props.getNaturalityUF} titleInput='Naturalidade (UF)'
                    colorWithNothingSelected={blurredColor} colorOptionalInput={blurredColor}
                  />
                  <TouchInput 
                    key='naturality (city)'
                    onPress={() => {setVisibleNaturalityCity(true)}}
                    selectedInput={props.getNaturalityCity} titleInput='Naturalidade (Cidade)'
                    colorWithNothingSelected={blurredColor} colorOptionalInput={blurredColor}
                  />
                  <Input
                    key='profession'
                    onChangeText={(text) => props.setOcupacao(text)}
                    nameInput={props.getOcupacao} titleInput='Profissão' keyboardType='default' placeholder="Profissão ou cargo" placeholderTextColor={blurredColor}
                  />
                  <Input
                    key='cell phone'
                    onChangeText={(text) => {
                      let phone = {
                        classificacao: 1,
                        ddi: "55",
                        ddd: text.length <= 2 ? (text) : TextFormat.Telefone.ObterDDD(TextFormat.Telefone.DesformatarTexto(text)),
                        numero: TextFormat.Telefone.ObterNumero(TextFormat.Telefone.DesformatarTexto(text)),
                        observacao: ""
                      } as Object_.Telefone;
                      props.setCellPhone(phone);
                    }}
                    nameInput={TextFormat.Telefone.FormatarTexto(props.getCellPhone ? (props.getCellPhone?.ddd + props.getCellPhone?.numero) : "")} titleInput='Tel. Celular' keyboardType='number-pad' placeholder="(00) 000000000" placeholderTextColor={blurredColor}
                  />
                  <Input
                    key='comercial phone'
                    onChangeText={(text) => {
                      let phone = {
                        classificacao: 2,
                        ddi: "55",
                        ddd: text.length <= 2 ? (text) : TextFormat.Telefone.ObterDDD(TextFormat.Telefone.DesformatarTexto(text)),
                        numero: TextFormat.Telefone.ObterNumero(TextFormat.Telefone.DesformatarTexto(text)),
                        observacao: ""
                      } as Object_.Telefone;
                      props.setComercialPhone(phone);
                    }}
                    nameInput={TextFormat.Telefone.FormatarTexto(props.getComercialPhone ? (props.getComercialPhone?.ddd + props.getComercialPhone?.numero) : "")} titleInput='Tel. Comercial' keyboardType='number-pad' placeholder="(00) 000000000" placeholderTextColor={blurredColor}
                  />
                  <Input
                    key='personal income'
                    onChangeText={(text) => {
                      let typedText = TextFormat.Moeda.DesformatarTexto(text);
                      Number(typedText)
                      props.setPersonalIncome(typedText);
                    }}
                    nameInput={TextFormat.Moeda.FormatarTexto(props.getPersonalIncome)} titleInput='Renda Pessoal' keyboardType='number-pad' placeholder="R$ 00,00" placeholderTextColor={blurredColor} colorOptionalInput={blurredColor} colorWithNothing={blurredColor}
                  />
                  <Input
                    key="father's name"
                    onChangeText={(text) => props.setFiliacao01(text)}
                    nameInput={props.getFiliacao01} titleInput='Nome do Pai' keyboardType='default' placeholder="Nome e Sobrenome" placeholderTextColor={blurredColor} colorOptionalInput={blurredColor} colorWithNothing={blurredColor}
                  />
                  <Input
                    key="mother's name"
                    onChangeText={(text) => props.setFiliacao02(text)}
                    nameInput={props.getFiliacao02} titleInput='Nome da Mãe' keyboardType='default' placeholder="Nome e Sobrenome" placeholderTextColor={blurredColor} colorOptionalInput={blurredColor} colorWithNothing={blurredColor}
                  />
                  <Input
                    key='rg number'
                    onChangeText={(text) => props.setNumberRG(text)}
                    nameInput={props.getNumberRG} titleInput='RG (Número)' placeholder="00.000-00" keyboardType='default' placeholderTextColor={blurredColor}
                  />
                  <Input
                    key='rg issuing agency'
                    onChangeText={(text) => props.setIssuingBodyRG(text)}
                    nameInput={props.getIssuingBodyRG} titleInput='RG (Órgão Emissor)' placeholder="XXX" keyboardType='default' placeholderTextColor={blurredColor}
                  />
                  <TouchInput 
                    key='rg uf'
                    onPress={() => {setVisibleRGPersonalUF(true)}}
                    selectedInput={props.getUfRG} titleInput='RG (UF)'
                  />
                  <Input
                    key='cnh number'
                    onChangeText={(text) => props.setCNH_Number(text)}
                    nameInput={props.getCNH_Number} titleInput='CNH (Número)' keyboardType='default' placeholder="0000000" placeholderTextColor={blurredColor} colorOptionalInput={blurredColor} colorWithNothing={blurredColor}
                  />
                  <TouchInput 
                    key='cnh expedition date'
                    onPress={() => {setVisibleCNHDate(true)}}
                    selectedInput={props.getCNH_ExpeditionDate ? moment(props.getCNH_ExpeditionDate).format("DD/MM/YYYY") : undefined} titleInput='CNH (Dt. Exped.)'
                    colorWithNothingSelected={blurredColor} colorOptionalInput={blurredColor}
                  />
                  <TouchInput 
                    key='cnh uf'
                    onPress={() => {setVisibleCNH_UF(true)}}
                    selectedInput={props.getCNH_UF} titleInput='CNH (UF)'
                    colorWithNothingSelected={blurredColor} colorOptionalInput={blurredColor}
                  />
                  <TouchInput 
                    key='marital status'
                    onPress={() => {setVisibleMaritalStatus(true)}}
                    selectedInput={props.getSelectedMaritalStatus == 1 ? "Solteiro(a)" : props.getSelectedMaritalStatus == 2 ? "Casado(a)" : props.getSelectedMaritalStatus == 3 ? "Divorciado(a)" : props.getSelectedMaritalStatus == 4 ? "Desquitado(a)" : props.getSelectedMaritalStatus == 5 ? "Separado(a)" : props.getSelectedMaritalStatus == 6 ? "Viúvo(a)"  : props.getSelectedMaritalStatus == 7 ? "União estável" :  "" } 
                    titleInput='Estado Civil'
                  />
                  {props.getSelectedMaritalStatus ?
                  <>
                    <Annex
                      viewImage={() => {setVisibleImageMaritalStatus(true)}}
                      viewPDF={() => setVisiblePDFMaritalStatus(true)}
                      PDForIMAGE={props.getPdfOrImageMaritalStatus}
                      cancelTouch={() => {props.setImageMaritalStatus(undefined); props.setPdfOrImageMaritalStatus(2)}}
                      library={() => pickLibraryMaritalStatus()}
                      pdf={() => DocumentPDFMaritalStatus()}
                      camera={() => requestCameraPermissionMaritalStatus()}
                      uri={props.getImageMaritalStatus}
                      title='Anexe um Documento Pessoal'
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
                      image={props.getImageMaritalStatus}
                    />
                    <Modals.PdfViewer
                      visible={getVisiblePDFMaritalStatus}
                      onPressClose={() => {setVisiblePDFMaritalStatus(false)}}
                      resource={props.getImageMaritalStatus}
                    />
                  </> : undefined}

                  {/*DADOS CÔNJUGE*/}
                  {props.getSelectedMaritalStatus == 2 || props.getSelectedMaritalStatus == 7 ?
                    <View>
                      <Styled.SubContainerText style={{color: '#FFFFFF', fontSize: 18, marginTop: 12}}>Cônjuge</Styled.SubContainerText>
                      <Annex
                        viewImage={() => {setVisibleImageIdentificationSpouse(true)}}
                        viewPDF={() => setVisiblePDFIdentificationSpouse(true)}
                        PDForIMAGE={props.getPdfOrImageIdentificationSpouse}
                        cancelTouch={() => {props.setImageIdentificationSpouse(undefined); props.setPdfOrImageIdentificationSpouse(2)}}
                        library={() => pickLibraryIdentificationSpouse()}
                        pdf={() => DocumentPDFIdentificationSpouse()}
                        camera={() => requestCameraPermissionIdentificationSpouse()}
                        uri={props.getImageIdentificationSpouse}
                        title='Anexe um Documento Pessoal'
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
                        image={props.getImageIdentificationSpouse}
                      />
                      <Modals.PdfViewer
                        visible={getVisiblePDFIdentificationSpouse}
                        onPressClose={() => {setVisiblePDFIdentificationSpouse(false)}}
                        resource={props.getImageIdentificationSpouse}
                      />
                      <Input
                        key='name spouse'
                        onChangeText={(text) => props.setNameSpouse(text)}
                        nameInput={props.getNameSpouse} titleInput='Nome' keyboardType='default' placeholder="Nome e Sobrenome" placeholderTextColor={blurredColor}
                      />
                      <Input
                        key='email spouse'
                        onChangeText={(text) => props.setEmailSpouse(text)}
                        nameInput={props.getEmailSpouse} titleInput='Email' keyboardType='email-address' placeholder="email@dominio.com.br" placeholderTextColor={blurredColor}
                      />
                      <Input
                        key='cpf spouse'
                        onChangeText={(text) => props.setCPFSpouse(text)}
                        nameInput={TextFormat.CPF.FormatarTexto(props.getCPFSpouse)} titleInput='CPF' keyboardType='number-pad' placeholder="000.000.000-00" placeholderTextColor={blurredColor}
                      />
                      <TouchInput 
                        key='birth spouse'
                        onPress={() => {setVisibleBirthSpouse(true)}}
                        selectedInput={props.getBirthSpouse ? moment(props.getBirthSpouse).format("DD/MM/YYYY") : undefined} titleInput='Dt. Nascimento'
                      />
                      <TouchInput 
                        key='nationality spouse'
                        onPress={() => {setVisibleNationalitySpouse(true)}}
                        selectedInput={props.getNationalitySpouse?.nacionalidade} titleInput='Nacionalidade'
                      />
                      <TouchInput
                        key='naturality (uf) spouse'
                        onPress={() => {setVisibleNaturalnessUFSpouse(true)}}
                        colorWithNothingSelected={blurredColor}
                        colorOptionalInput={blurredColor}
                        selectedInput={props.getNaturalityUFSpouse} titleInput='Naturalidade (UF)'
                      />
                      <TouchInput 
                        key='naturality (city) spouse'
                        onPress={() => {setVisibleNaturalnessCitySpouse(true)}}
                        colorWithNothingSelected={blurredColor}
                        colorOptionalInput={blurredColor}
                        selectedInput={props.getNaturalityCitySpouse} titleInput='Naturalidade (Cidade)'
                      />
                      <Input
                        key='profession spouse'
                        onChangeText={(text) => props.setOcupationSpouse(text)}
                        nameInput={props.getOcupationSpouse} titleInput='Profissão' keyboardType='default' placeholder="Profissão ou cargo" placeholderTextColor={blurredColor}
                      />
                      <Input
                        key='personal income spouse'
                        onChangeText={(text) => {
                          let typedText = TextFormat.Moeda.DesformatarTexto(text);
                          Number(typedText);
                          props.setPersonalIncomeSpouse(typedText);
                        }}
                        nameInput={TextFormat.Moeda.FormatarTexto(props.getPersonalIncomeSpouse)} titleInput='Renda Pessoal' keyboardType='default' placeholder="R$ 00,00" placeholderTextColor={blurredColor}
                      />
                      <Input
                        key="father's name spouse"
                        onChangeText={(text) => props.setFiliacao01(text)}
                        nameInput={props.getFiliacao01} titleInput='Nome do Pai' keyboardType='default' placeholder="Nome e Sobrenome" placeholderTextColor={blurredColor} colorOptionalInput={blurredColor} colorWithNothing={blurredColor}
                      />
                      <Input
                        key="mother's name spouse"
                        onChangeText={(text) => props.setFiliacao02(text)}
                        nameInput={props.getFiliacao02} titleInput='Nome da Mãe' keyboardType='default' placeholder="Nome e Sobrenome" placeholderTextColor={blurredColor} colorOptionalInput={blurredColor} colorWithNothing={blurredColor}
                      />
                      <Input
                        key='rg number spouse'
                        onChangeText={(text) => props.setRGSpouse(text)}
                        nameInput={props.getRGSpouse} titleInput='RG' keyboardType='default' placeholder="00.000-00" placeholderTextColor={blurredColor}
                      />
                      <Input
                        key='rg issuing agency spouse'
                        onChangeText={(text) => props.setIssuingAgencySpouse(text)}
                        nameInput={props.getIssuingAgencySpouse} titleInput='Órgão Emissor' keyboardType='default' placeholder="XXX" placeholderTextColor={blurredColor}
                      />
                      <TouchInput 
                        key='rg uf spouse'
                        onPress={() => {setVisibleUFSpouse(true)}}
                        selectedInput={props.getRGUFSpouse} titleInput='UF'
                      />
                      <Input
                        key='cnh number spouse'
                        onChangeText={(text) => props.setCNH_NumberSpouse(text)}
                        nameInput={props.getCNH_NumberSpouse} titleInput='CNH (Número)' keyboardType='default' placeholder="0000000" placeholderTextColor={blurredColor} colorOptionalInput={blurredColor} colorWithNothing={blurredColor}
                      />
                      <TouchInput
                        key='cnh expedition date spouse'
                        onPress={() => {setVisibleExpeditionDateSpouse(true)}}
                        colorWithNothingSelected={blurredColor}
                        colorOptionalInput={blurredColor}
                        selectedInput={props.getCNH_ExpeditionDateSpouse ? moment(props.getCNH_ExpeditionDateSpouse).format("DD/MM/YYYY") : undefined} titleInput='CNH (Dt. de Exped.)'
                      />
                      <TouchInput
                        key='cnh uf spouse'
                        onPress={() => {setVisibleCNH_UFSpouse(true)}}
                        colorWithNothingSelected={blurredColor}
                        colorOptionalInput={blurredColor}
                        selectedInput={props.getCNH_UfSpouse} titleInput='CNH (UF)'
                      />
                      <Input
                        key='cell phone spouse'
                        onChangeText={(text) => {
                          let phone = {
                            classificacao: 1,
                            ddi: "55",
                            ddd: text.length <= 2 ? (text) : TextFormat.Telefone.ObterDDD(TextFormat.Telefone.DesformatarTexto(text)),
                            numero: TextFormat.Telefone.ObterNumero(TextFormat.Telefone.DesformatarTexto(text)),
                            observacao: ""
                          } as Object_.Telefone;
                          props.setCellPhoneSpouse(phone);
                        }}
                        nameInput={TextFormat.Telefone.FormatarTexto(props.getCellPhoneSpouse ? (props.getCellPhoneSpouse?.ddd + props.getCellPhoneSpouse?.numero) : "")} titleInput='Tel. Celular' keyboardType='number-pad' placeholder="(00) 000000000" placeholderTextColor={blurredColor}
                      />
                    </View>
                  : undefined}
                </View>}
              </MotiView>

            {/*ENDERECO PESSOAL*/}
              <MotiView
                transition={transition}
                from={{paddingBottom: getSwipeComplements === true ? '10%' : '2%'}}
                style={{
                  backgroundColor: 'rgba(192, 227, 220, 0.3)',
                  borderRadius: 20,
                  marginHorizontal: '5%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: '4%',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  marginTop: '3%',
                }}>
                <Styled.SubContainerText style={{color: '#FFFFFF'}}>Endereço Pessoal</Styled.SubContainerText>
                {getSwipeComplements ?
                <Styled.Swipe onPress={() => {setSwipeComplements(false)}}>
                  <SvgCss xml={ThreeArrows} style={{marginRight: '5%', marginTop: '4%', transform: [{ rotateY: '180deg' }]}} />
                </Styled.Swipe> :
                <Styled.Swipe onPress={() => {setSwipeComplements(true)}}>
                  <SvgCss xml={ThreeArrows} style={{marginRight: '5%', marginTop: '4%'}} />
                </Styled.Swipe>}
                {getSwipeComplements ?
                <View>
                  <Annex
                    viewImage={() => {setVisibleImageAddress(true)}}
                    viewPDF={() => setVisiblePDFAddress(true)}
                    PDForIMAGE={props.getPdfOrImageAddress}
                    cancelTouch={() => {props.setImageResponsibleAddress(undefined); props.setPdfOrImageAddress(2)}}
                    library={() => pickLibraryAddress()}
                    pdf={() => DocumentPDFAddress()}
                    camera={() => requestCameraPermissionAddress()}
                    uri={props.getImageResponsibleAddress}
                    title='Anexe um Documento Pessoal'
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
                    image={props.getImageResponsibleAddress}
                  />
                  <Modals.PdfViewer
                    visible={getVisiblePDFAddress}
                    onPressClose={() => {setVisiblePDFAddress(false)}}
                    resource={props.getImageResponsibleAddress}
                  />
                  <Input
                    key='cep'
                    onChangeText={(text) => {setCEP(text); if(text.length == 8) CEP(text)}}
                    nameInput={props.item?.endereco?.cep ? TextFormat.CEP.FormatarTexto(props.item?.endereco?.cep) : TextFormat.CEP.FormatarTexto(getCEP)} titleInput='CEP' keyboardType='default'
                  />
                  <Input
                    key='public place'
                    onChangeText={(text) => setPublicPlace(text)}
                    nameInput={props.item?.endereco?.logradouro || getPublicPlace} titleInput='Logradouro' keyboardType='default'
                  />
                  <Input
                    key='number'
                    onChangeText={(text) => setNumber(text)}
                    nameInput={props.item?.endereco?.numero || getNumber} titleInput='Número' keyboardType='default'
                  />
                  <Input
                    key='complement'
                    onChangeText={(text) => setComplement(text)}
                    nameInput={props.item?.endereco?.complemento || getComplement} titleInput='Complemento' keyboardType='default'
                  />
                  <Input
                    key='district'
                    onChangeText={(text) => setDistrict(text)}
                    nameInput={props.item?.endereco?.bairro || getDistrict} titleInput='Bairro' keyboardType='default'
                  />
                  <Input
                    key='city'
                    onChangeText={(text) => setDistrict(text)}
                    nameInput={props.item?.endereco?.cidade || getCity} titleInput='Cidade' keyboardType='default'
                  />
                  <TouchInput 
                    key='uf address'
                    onPress={() => {setVisiblePersonalAddressUF(true)}}
                    selectedInput={props.item?.endereco?.uf ? props.item?.endereco?.uf : getUFAddress} titleInput='UF'
                  />
                </View>
                : <></>}
              </MotiView>

            {/*QUALIFICATION*/}
              <MotiView
                transition={transition}
                from={{paddingBottom: props.getDisqualification === false ? '5%' : '2%'}}
                style={{
                  backgroundColor: 'rgba(192, 227, 220, 0.3)',
                  borderRadius: 20,
                  marginHorizontal: '5%',
                  paddingHorizontal: '4%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 5,
                  marginTop: '3%',
                }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Styled.SubContainerText style={{color: '#FFFFFF', marginRight: 100}}>{props.getDisqualification ? 'Qualificado' : 'Desqualificado:'}</Styled.SubContainerText>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Styled.SubContainerText style={{color: '#FFFFFF', marginRight: '4%', fontFamily: props.getDisqualification === true ? 'AzeretMono-Medium' : 'AzeretMono-Black'}}>NQ</Styled.SubContainerText>
                      <Switch
                        size={25}
                        onPress={() => {
                          if(SelectedCompany?.id !== 5) {
                            SwitchQualified();
                          }
                        }}
                        isEnabled={props.getDisqualification}
                      /> 
                      <Styled.SubContainerText style={{color: '#FFFFFF', marginLeft: '4%', fontFamily: props.getDisqualification === false ? 'AzeretMono-Medium' : 'AzeretMono-Black'}}>Q</Styled.SubContainerText>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {props.getDisqualification && SelectedCompany.id != 5 ? <></> :
                    <View >
                      <Styled.TouchableContainer onPress={() => {setVisibleModalDisqualification(true)}}>
                        <Styled.Text style={{width: '100%', top: 10}}>{props.getSelectedLeadDisqualification ? props.getSelectedLeadDisqualification?.descricao : 'Selecione o motivo'}</Styled.Text>
                        {getVisibleModalDisqualification &&
                        <Modals.MultipleSelections
                          marginLeft="20%"
                          title="Desqualificado"
                          visible={getVisibleModalDisqualification}
                          onPressClose={() => {setVisibleModalDisqualification(false)}}
                          data={getLeadDisqualification}
                          renderItem={({item}) => (
                            <Styled.ItemContainer onPress={() => {
                              props.setSelectedLeadDisqualification(item);
                              setVisibleModalDisqualification(false);
                            }}>
                              <Styled.Item>
                                <Styled.TextItem>{item?.descricao}</Styled.TextItem>
                              </Styled.Item>
                            </Styled.ItemContainer>
                          )}
                        />}
                      </Styled.TouchableContainer>
                    </View>}
                    {props.getSelectedLeadDisqualification != undefined &&
                      <TouchableOpacity style={{right: 20, top: 5}} onPress={() => props.setSelectedLeadDisqualification(undefined)}>
                        <SvgCss xml={Clean} style={{alignSelf:'center'}} />
                      </TouchableOpacity>}
                    </View>
              </MotiView>

              <View style={{
                backgroundColor: 'rgba(192, 227, 220, 0.3)',
                borderRadius: 20,
                marginHorizontal: '5%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: '4%',
                alignItems: 'center',
                marginTop: '3%',
              }}>
                <Styled.SubContainerText style={{color: '#FFFFFF'}}>Oportunidade:</Styled.SubContainerText>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Styled.SubContainerText style={{color: '#FFFFFF', marginRight: '4%', fontFamily: props.getOpportunity === true ? 'AzeretMono-Medium' : 'AzeretMono-Black'}}>Não</Styled.SubContainerText>
                  <Switch
                    size={25}
                    onPress={() => {
                      SwitchOpportunity();
                    }}
                    isEnabled={props.getOpportunity}
                  /> 
                  <Styled.SubContainerText style={{color: '#FFFFFF', marginLeft: '4%', fontFamily: props.getOpportunity === false ? 'AzeretMono-Medium' : 'AzeretMono-Black'}}>Sim</Styled.SubContainerText>
                </View>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <Styled.Submit
                  activeOpacity={0.7}
                  style={{backgroundColor: '#cc3e3e'}}
                  onPress={() => {
                    SelectedCompany?.id != 5 ?
                      Alert.alert('Confirmação de Inativação', 'Deseja realmente inativar este Lead?', [
                        {
                          text: 'Cancelar',
                          style: 'cancel',
                        },
                        {
                          text: 'OK',
                          onPress: () => Inativate()},
                      ]) :
                    undefined
                  }}>
                  <Styled.TextSubmit>Inativar</Styled.TextSubmit>
                </Styled.Submit>
                <Styled.Submit activeOpacity={0.7} style={{backgroundColor: '#3BB273'}} onPress={() => {
                  ConfirmationUpdate();
                }}>
                  <Styled.TextSubmit>Atualizar</Styled.TextSubmit>
                </Styled.Submit>
              </View>
              <View style={{justifyContent: 'space-evenly', flexDirection: 'row', marginHorizontal: '0%'}}>
                <Styled.TitleFunnelHistoryAndLevels activeOpacity={0.8} onPress={() => {
                  setFunnellHistory(true); setFunnelLevels(false)}} style={{borderColor: getFunnellHistory ? '#1ff683' : '#ffffff'}}>
                  <Styled.TextFunnelHistoryAndLevels style={{color: getFunnellHistory ? '#1ff683' : '#ffffff'}}>Histórico do funil</Styled.TextFunnelHistoryAndLevels>
                </Styled.TitleFunnelHistoryAndLevels>
                <Styled.TitleFunnelHistoryAndLevels activeOpacity={0.8} onPress={() => {setFunnellHistory(false); setFunnelLevels(true)}} style={{borderColor: getFunnelLevels ? '#1ff683' : '#ffffff'}}>
                  <Styled.TextFunnelHistoryAndLevels style={{color: getFunnelLevels ? '#1ff683' : '#ffffff'}}>Fases do funil</Styled.TextFunnelHistoryAndLevels>
                </Styled.TitleFunnelHistoryAndLevels>
              </View>
              {getFunnellHistory &&
              <Styled.SubContainer>
                {props?.item?.historicoDoFunil! ?
                  <FlatList
                  refreshing={true}
                  showsVerticalScrollIndicator={false}
                  data={props?.item?.historicoDoFunil!}
                  renderItem={({item}) =>
                    <Styled.BorderSubContainerView style={{borderColor: '#FFFFFF'}}>
                      <Styled.SubContainerText style={{color: '#FFFFFF'}}>{item.posicaoDoFunil.descricao}</Styled.SubContainerText>
                    </Styled.BorderSubContainerView>}
                /> :
                <Styled.ContainerNoHistory>
                  <Styled.TextNoHistory>Não há histórico do funil no momento.</Styled.TextNoHistory>
                </Styled.ContainerNoHistory>}
              </Styled.SubContainer>}
              {getFunnelLevels &&
              <Styled.SubContainer>
                <View style={{width: '100%'}}>
                  <Styled.NoClassification style={{borderColor: props.item?.historicoDoFunil![0]?.posicaoDoFunil == undefined ? '#1ff683' : '#FFFFFF'}}>
                    <Styled.SubContainerText style={{color: props.item?.historicoDoFunil![0]?.posicaoDoFunil == undefined ? '#1ff683' : '#FFFFFF'}}>Não classificado</Styled.SubContainerText>
                  </Styled.NoClassification>
                  <FlatList
                    refreshing={true}
                    showsVerticalScrollIndicator={false}
                    data={props.getSaleFunnel[0].posicoesDoFunil}
                    renderItem={({item}) =>
                      <Styled.BorderSubContainer onPress={() => {
                        ConfirmationLostSell(item);
                      }} style={{borderColor: item.id == props.item?.historicoDoFunil![0]?.posicaoDoFunil.id ? '#1ff683' : '#FFFFFF'}}>
                        <Styled.SubContainerText style={{color: item.id == props.item?.historicoDoFunil![0]?.posicaoDoFunil.id ? '#1ff683' : '#FFFFFF'}}>{item.descricao}</Styled.SubContainerText>
                      </Styled.BorderSubContainer>
                    }
                  />
                </View>
              </Styled.SubContainer>}
          </ScrollView>
        </Styled.Container>

        {/*MODALS*/}
        <>
          {getVisibleRGPersonalUF &&
          <Modals.MultipleSelections
            marginLeft="23%"
            title="Unidade"
            search={true}
            visible={getVisibleRGPersonalUF}
            onPressClose={() => {setVisibleRGPersonalUF(false)}}
            onChangeText={(event) => {SearchUF(event)}}
            data={getUF}
            renderItem={({item}) => (
              <Styled.ItemContainer onPress={ async () => {
                props.setUfRG(item.initials)
                setVisibleRGPersonalUF(false);
              }}>
                <Styled.Item>
                  <Styled.TextItem>{item?.states}</Styled.TextItem>
                </Styled.Item>
              </Styled.ItemContainer>
            )}
          />}
          {getVisibleCorporateAddressUF &&
          <Modals.MultipleSelections
            marginLeft="23%"
            title="Unidade"
            search={true}
            visible={getVisibleCorporateAddressUF}
            onPressClose={() => {setVisibleCorporateAddressUF(false)}}
            onChangeText={(event) => {SearchUF(event)}}
            data={getUF}
            renderItem={({item}) => (
              <Styled.ItemContainer onPress={ async () => {
                props.setCorporateUF(item?.initials)
                setVisibleCorporateAddressUF(false);
              }}>
                <Styled.Item>
                  <Styled.TextItem>{item?.states}</Styled.TextItem>
                </Styled.Item>
              </Styled.ItemContainer>
            )}
          />}
          {getVisibleUFSpouse &&
          <Modals.MultipleSelections
            marginLeft="23%"
            title="Unidade"
            search={true}
            visible={getVisibleUFSpouse}
            onPressClose={() => {setVisibleUFSpouse(false)}}
            onChangeText={(event) => {SearchUF(event)}}
            data={getUF}
            renderItem={({item}) => (
              <Styled.ItemContainer onPress={ async () => {
                props.setRGUFSpouse(item?.initials)
                setVisibleUFSpouse(false);
              }}>
                <Styled.Item>
                  <Styled.TextItem>{item?.states}</Styled.TextItem>
                </Styled.Item>
              </Styled.ItemContainer>
            )}
          />}
          {getVisiblePersonalAddressUF &&
          <Modals.MultipleSelections
            marginLeft="23%"
            title="Unidade"
            search={true}
            visible={getVisiblePersonalAddressUF}
            onPressClose={() => {setVisiblePersonalAddressUF(false)}}
            onChangeText={(event) => {SearchUF(event)}}
            data={getUF}
            renderItem={({item}) => (
              <Styled.ItemContainer onPress={ async () => {
                setUFAddress(item?.initials)
                setVisiblePersonalAddressUF(false);
              }}>
                <Styled.Item>
                  <Styled.TextItem>{item?.states}</Styled.TextItem>
                </Styled.Item>
              </Styled.ItemContainer>
            )}
          />}
          {getVisibleNationality &&
          <Modals.MultipleSelections
            search={true}
            marginLeft="12%"
            title="Nacionalidade"
            visible={getVisibleNationality}
            onPressClose={() => {setVisibleNationality(false)}}
            data={getNationality}
            onChangeText={(event) => SearchNationality(event)}
            renderItem={({item}) => (
              <Styled.ItemContainer onPress={() => {
                props.setNacionalidade(item)
                setVisibleNationality(false);
              }}>
                <Styled.Item>
                  <Styled.TextItem>{item.nacionalidade}</Styled.TextItem>
                </Styled.Item>
              </Styled.ItemContainer>
            )}
          />}
          {getVisibleNationalitySpouse &&
          <Modals.MultipleSelections
            search={true}
            marginLeft="12%"
            title="Nacionalidade"
            visible={getVisibleNationalitySpouse}
            onPressClose={() => {setVisibleNationalitySpouse(false)}}
            data={getNationality}
            onChangeText={(event) => SearchNationality(event)}
            renderItem={({item}) => (
              <Styled.ItemContainer onPress={() => {
                props.setNationalitySpouse(item)
                setVisibleNationalitySpouse(false);
              }}>
                <Styled.Item>
                  <Styled.TextItem>{item.nacionalidade}</Styled.TextItem>
                </Styled.Item>
              </Styled.ItemContainer>
            )}
          />}
          {getVisibleMaritalStatus &&
          <Modals.MultipleSelections
            marginLeft="15%"
            title="Estado Civil"
            visible={getVisibleMaritalStatus}
            onPressClose={() => {setVisibleMaritalStatus(false)}}
            data={getMaritalStatus}
            renderItem={({item}: any) => (
              <Styled.ItemContainer onPress={() => {
                props.setSelectedMaritalStatus(item.id)
                setVisibleMaritalStatus(false)
              }}>
                <Styled.Item>
                  <Styled.TextItem>{item.descricao}</Styled.TextItem>
                </Styled.Item>
              </Styled.ItemContainer>
            )}
          />}
          {getLoading &&
          <Modals.ModalLoading 
            transparent={true}
            visible={getLoading}
          />}
          {getVisibleActivity &&
          <Modals.Activity
            onPressClose={() => {setVisibleActivity(false)}}
            visible={getVisibleActivity}
            item={props.item}
            getSaleFunnel={props.getSaleFunnel}
          />}
          {getVisibleForm &&
          <Modals.Form
            salaDeVendaID={props.salaDeVendaID}
            areaID={props.areaID}
            funilID={props.funilID}
            visible={getVisibleForm}
            setVisibleForm={setVisibleForm}
            item={props.item}
            getSaleFunnel={props.getSaleFunnel}
            getResponse={getResponse}
            setResponse={setResponse}
            getForm={getForm}
            setForm={setForm}
          />}
          {getVisibleEmail &&
          <Modals.Email
            onPressClose={() => {setVisibleEmail(false)}}
            visible={getVisibleEmail}
            item={props.item}
            getSaleFunnel={props.getSaleFunnel}
          />}
          {getVisibleAnotation &&
          <Modals.Anotation
            onPressClose={() => {setVisibleAnotation(false)}}
            visible={getVisibleAnotation}
            item={props.item}
            getSaleFunnel={props.getSaleFunnel}
            setLeadAnotation={props.setLeadAnotation}
            getLeadAnotation={props.getLeadAnotation}
            areaID={props.areaID}
            funilID={props.funilID}
            salaDeVendaID={props.salaDeVendaID}
            posicaoDoFunilID={props.posicaoDoFunilID}
            posicaoDoFunilDescription={props.posicaoDoFunilDescription}
            funilDescription={props.funilDescription}
          />}
          {getVisibleTask &&
            <Modals.Task
            onPressClose={() => {setVisibleTask(false)}}
            visible={getVisibleTask}
            item={props.item}
            getSaleFunnel={props.getSaleFunnel}
            getSelectedSaleFunnel={props.getSelectedSaleFunnel}
            setLeadTask={props.setLeadTask}
            getLeadTask={props.getLeadTask}
            areaID={props.areaID}
            salaDeVendaID={props.salaDeVendaID}
          />}
          {getVisibleScheduledVisits &&
          <Modals.ScheduledVisits
            onPressClose={() => {setVisibleScheduledVisits(false)}}
            visible={getVisibleScheduledVisits}
            item={props.item}
            getSaleFunnel={props.getSaleFunnel}
            getSelectedSaleFunnel={props.getSelectedSaleFunnel}
            setLeadScheduledVisits={props.setLeadScheduledVisits}
            getLeadScheduledVisits={props.getLeadScheduledVisits}
          />}
          {getVisibleLinkGifts &&
          <Modals.LinkGifts
            onPressClose={() => {setVisibleLinkGifts(false)}}
            visible={getVisibleLinkGifts}
            item={props.item}
            getSaleFunnel={props.getSaleFunnel}
            getSelectedSaleFunnel={props.getSelectedSaleFunnel}
            setLeadLinkGifts={props.setLeadLinkGifts}
            getLeadLinkGifts={props.getLeadLinkGifts}
          />}
          {getOpen &&
          <DatePicker
            modal
            mode='date'
            open={getOpen}
            date={getDate}
            maximumDate={getDate}
            onConfirm={(date) => {
              props.setDataDeNascimento(date.toISOString())
              setOpen(false)
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />}
          {getVisibleBirthSpouse &&
          <DatePicker
            modal
            mode='date'
            open={getVisibleBirthSpouse}
            date={getDate}
            maximumDate={getDate}
            onConfirm={(date) => {
              props.setBirthSpouse(date.toISOString())
              setVisibleBirthSpouse(false)
            }}
            onCancel={() => {
              setVisibleBirthSpouse(false)
            }}
          />}
          {getVisibleExpeditionDateSpouse &&
          <DatePicker
            modal
            mode='date'
            open={getVisibleExpeditionDateSpouse}
            date={getDate}
            maximumDate={getDate}
            onConfirm={(date) => {
              props.setCNH_ExpeditionDateSpouse(date.toISOString())
              setVisibleExpeditionDateSpouse(false)
            }}
            onCancel={() => setVisibleExpeditionDateSpouse(false)}
          />}
          {getVisibleCNHDate &&
          <DatePicker
            modal
            mode='date'
            open={getVisibleCNHDate}
            date={getDate}
            maximumDate={getDate}
            onConfirm={(date) => {
              props.setCNH_ExpeditionDate(date.toISOString())
              setVisibleCNHDate(false)
            }}
            onCancel={() => {
              setVisibleCNHDate(false)
            }}
          />}
          {getVisibleCNH_UF &&
          <Modals.MultipleSelections
            marginLeft="23%"
            title="Unidade"
            search={true}
            visible={getVisibleCNH_UF}
            onPressClose={() => {setVisibleCNH_UF(false)}}
            onChangeText={(event) => {SearchUF(event)}}
            data={getUF}
            renderItem={({item}) => (
              <Styled.ItemContainer onPress={ async () => {
                props.setCNH_UF(item?.initials)
                setVisibleCNH_UF(false);
              }}>
                <Styled.Item>
                  <Styled.TextItem>{item?.states}</Styled.TextItem>
                </Styled.Item>
              </Styled.ItemContainer>
            )}
          />}
          <Modals.MultipleSelections
              search={true}
              marginLeft="5%"
              title="Unidades Federativas"
              visible={getVisibleNaturalityUF}
              onChangeText={(event) => SearchUF(event)}
              onPressClose={() => {setVisibleNaturalityUF(false)}}
              data={getUF}
              renderItem={({item}) => (
                <Styled.ItemContainer onPress={() => {
                  console.log(item)
                  props.setNaturalityUF(item)
                  setVisibleNaturalityUF(false)
                }}>
                  <Styled.Item>
                    <Styled.TextItem>{item.states}</Styled.TextItem>
                  </Styled.Item>
                </Styled.ItemContainer>
              )}
            />
          {getVisibleCNH_UFSpouse &&
          <Modals.MultipleSelections
            search={true}
            marginLeft="5%"
            title="Unidades Federativas"
            visible={getVisibleCNH_UFSpouse}
            onChangeText={(event) => SearchUF(event)}
            onPressClose={() => {setVisibleCNH_UFSpouse(false)}}
            data={getUF}
            renderItem={({item}) => (
              <Styled.ItemContainer onPress={() => {
                props.setCNH_UfSpouse(item)
                setVisibleCNH_UFSpouse(false)
              }}>
                <Styled.Item>
                  <Styled.TextItem>{item.states}</Styled.TextItem>
                </Styled.Item>
              </Styled.ItemContainer>
            )}
          />}
          <Modals.MultipleSelections
            search={true}
            onChangeText={(event) => SearchCity(event)}
            marginLeft="23%"
            title="Cidades"
            visible={getVisibleNaturalityCity}
            onPressClose={() => {setVisibleNaturalityCity(false)}}
            data={getArrayNaturalityCity ? getArrayNaturalityCity : 
              props.getNaturalityUF == "AC" ? List.Acre
              : props.getNaturalityUF == "AL" ? List.Alagoas
              : props.getNaturalityUF == "AP" ? List.Amapa
              : props.getNaturalityUF == "AM" ? List.Amazonas
              : props.getNaturalityUF == "BA" ? List.Bahia
              : props.getNaturalityUF == "CE" ? List.Ceara
              : props.getNaturalityUF == "DF" ? List.DistritoFederal
              : props.getNaturalityUF == "ES" ? List.EspiritoSanto
              : props.getNaturalityUF == "GO" ? List.Goias
              : props.getNaturalityUF == "MA" ? List.Maranhao
              : props.getNaturalityUF == "MT" ? List.MatoGrosso
              : props.getNaturalityUF == "MS" ? List.MatoGrossoDoSul
              : props.getNaturalityUF == "MG" ? List.MinasGerais
              : props.getNaturalityUF == "PA" ? List.Para
              : props.getNaturalityUF == "PB" ? List.Paraiba
              : props.getNaturalityUF == "PR" ? List.Parana
              : props.getNaturalityUF == "PE" ? List.Pernambuco
              : props.getNaturalityUF == "PI" ? List.Piaui
              : props.getNaturalityUF == "RJ" ? List.RioDeJaneiro
              : props.getNaturalityUF == "RN" ? List.RioGrandeDoNorte
              : props.getNaturalityUF == "RS" ? List.RioGrandeDoSul
              : props.getNaturalityUF == "RO" ? List.Rondonia
              : props.getNaturalityUF == "RR" ? List.Roraima
              : props.getNaturalityUF == "SC" ? List.SantaCatarina
              : props.getNaturalityUF == "SP" ? List.SaoPaulo
              : props.getNaturalityUF == "SE" ? List.Sergipe
              : props.getNaturalityUF == "TO" ? List.Tocantins
              : []
            }
            renderItem={({item}) => (
              <Styled.ItemContainer onPress={() => {
                console.log(item)
                props.setNaturalityCity(item)
                setVisibleNaturalityCity(false)
              }}>
                <Styled.Item>
                  <Styled.TextItem>{item}</Styled.TextItem>
                </Styled.Item>
              </Styled.ItemContainer>
            )}
          />
          <Modals.MultipleSelections
              search={true}
              marginLeft="5%"
              title="Unidades Federativas"
              visible={getVisibleNaturalnessUFSpouse}
              onChangeText={(event) => SearchUF(event)}
              onPressClose={() => {setVisibleNaturalnessUFSpouse(false)}}
              data={getUF}
              renderItem={({item}) => (
                <Styled.ItemContainer onPress={() => {
                  console.log(item)
                  props.setNaturalityUFSpouse(item)
                  setVisibleNaturalnessUFSpouse(false)
                }}>
                  <Styled.Item>
                    <Styled.TextItem>{item.states}</Styled.TextItem>
                  </Styled.Item>
                </Styled.ItemContainer>
              )}
            />
          <Modals.MultipleSelections
            search={true}
            onChangeText={(event) => SearchCity(event)}
            marginLeft="23%"
            title="Cidades"
            visible={getVisibleNaturalnessCitySpouse}
            onPressClose={() => {setVisibleNaturalnessCitySpouse(false)}}
            data={getArrayNaturalityCity ? getArrayNaturalityCity : 
              props.getNaturalityUF == "AC" ? List.Acre
              : props.getNaturalityUF == "AL" ? List.Alagoas
              : props.getNaturalityUF == "AP" ? List.Amapa
              : props.getNaturalityUF == "AM" ? List.Amazonas
              : props.getNaturalityUF == "BA" ? List.Bahia
              : props.getNaturalityUF == "CE" ? List.Ceara
              : props.getNaturalityUF == "DF" ? List.DistritoFederal
              : props.getNaturalityUF == "ES" ? List.EspiritoSanto
              : props.getNaturalityUF == "GO" ? List.Goias
              : props.getNaturalityUF == "MA" ? List.Maranhao
              : props.getNaturalityUF == "MT" ? List.MatoGrosso
              : props.getNaturalityUF == "MS" ? List.MatoGrossoDoSul
              : props.getNaturalityUF == "MG" ? List.MinasGerais
              : props.getNaturalityUF == "PA" ? List.Para
              : props.getNaturalityUF == "PB" ? List.Paraiba
              : props.getNaturalityUF == "PR" ? List.Parana
              : props.getNaturalityUF == "PE" ? List.Pernambuco
              : props.getNaturalityUF == "PI" ? List.Piaui
              : props.getNaturalityUF == "RJ" ? List.RioDeJaneiro
              : props.getNaturalityUF == "RN" ? List.RioGrandeDoNorte
              : props.getNaturalityUF == "RS" ? List.RioGrandeDoSul
              : props.getNaturalityUF == "RO" ? List.Rondonia
              : props.getNaturalityUF == "RR" ? List.Roraima
              : props.getNaturalityUF == "SC" ? List.SantaCatarina
              : props.getNaturalityUF == "SP" ? List.SaoPaulo
              : props.getNaturalityUF == "SE" ? List.Sergipe
              : props.getNaturalityUF == "TO" ? List.Tocantins
              : []
            }
            renderItem={({item}) => (
              <Styled.ItemContainer onPress={() => {
                props.setNaturalityCitySpouse(item)
                setVisibleNaturalnessCitySpouse(false)
              }}>
                <Styled.Item>
                  <Styled.TextItem>{item}</Styled.TextItem>
                </Styled.Item>
              </Styled.ItemContainer>
            )}
          />
          {getVisibleDateIncorporation &&
          <DatePicker
            modal
            mode='date'
            open={getVisibleDateIncorporation}
            date={getDate}
            maximumDate={getDate}
            onConfirm={(date) => {
              props.setDateIncorporation(date.toISOString())
              setVisibleDateIncorporation(false)
            }}
            onCancel={() => {
              setVisibleDateIncorporation(false)
            }}
          />}
        </>
      </LinearGradient>
    </Modal>
  );
};

export const Lead = memo(FunilLead);