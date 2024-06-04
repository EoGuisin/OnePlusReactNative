//#region React
import React, {useState, useEffect} from 'react';
import {Platform, TouchableOpacity, View, FlatList} from 'react-native';
import moment from 'moment';
import {useSelector} from 'react-redux';
//#endregion

//#region Styled
import * as Styled from './styles'
import * as Modals from '../../../../Modals';
import { ToastMessage } from '../../../../../Components';
//#endregion

//#region Services
import * as Controllers from '../../../../../Services/Controllers';
import { Object_ } from '../../../../../Services/Objects';
//#endregion

//#region ViewModel
import viewModel from './ViewModel';
import {Kanban} from './type';
//#endregion

//#region Images
import { ArrowBack, _Filter, Plus, Profile, MagnifyingGlass } from '../../../../../Assets';
import { SvgCss } from 'react-native-svg';
//#endregion

import Lottie from 'lottie-react-native';
import { LoadingInformations } from '../../../../../Animation';

//#region Functions
import {ResponsiveHeight} from '../../../../../Functions';
import * as TextFormat from '../../../../../Themes/TextFormat';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
//#endregion

export function ScreenFunisDeVenda(viewModel: viewModel) {
  interface Permission {
    usuario : {
      id: number,
      nome: string,
      cargo: {
        id: number,
        nome: string
      },
      email: {
        classificacao: number,
        descricao: string
      }
    },
    salaDeVenda: {
      id: number, 
      descricao: string
    }, 
    area: {
      id: number,
      descricao: string
    },
    funil: Object_.Funil
  }

  //#region useState
  const [getVisibleFilter, setVisibleFilter] = useState<boolean>(false);
  const [getVisibleLead, setVisibleLead] = useState<boolean>(false);
  const [getLoading, setLoading] = useState<boolean>(false);
  const [getCaptureLocation, setCaptureLocation] = useState<Array<Object_.LocalDeCaptacao>>([]);
  const [getVisibleNewOpportunity, setVisibleNewOpportunity] = useState<boolean>(false);
  const [getFirst, setFirst] = useState<boolean>(true);
  const [getLead, setLead] = useState<Array<Kanban> | undefined | null>(null);
  const [getOriginalLead, setOriginalLead] = useState<Array<Kanban>>([]);
  const [getSelectedLead, setSelectedLead] = useState<Array<Object_.Lead>>([{} as Object_.Lead]);
  const [getLeadAnotation, setLeadAnotation] = useState<Array<Object_.Anotacao> | undefined>([{} as Object_.Anotacao]);
  const [getLeadTask, setLeadTask] = useState<Array<Object_.Tarefa> | undefined>([{} as Object_.Tarefa]);
  const [getLeadScheduledVisits, setLeadScheduledVisits] = useState<Array<Object_.AgendamentoDeVisita> | undefined>([{} as Object_.AgendamentoDeVisita]);
  const [getLeadLinkGifts, setLeadLinkGifts] = useState<Array<Object_.ItemDoAlmoxarifadoDeBrinde> | undefined>([{} as Object_.ItemDoAlmoxarifadoDeBrinde]);
  const [getDisqualification, setDisqualification] = useState<boolean>(false);
  const [getOpportunity, setOpportunity] = useState<boolean>(false);
  const [getSaleFunnel, setSaleFunnel] = useState<Array<Object_.Funil>>([]);
  const [getSelectedSaleFunnel, setSelectedSaleFunnel] = useState<Object_.Funil | undefined>(undefined);
  const [getShowToast, setShowToast] = useState<boolean>(false);
  const [getMessage1, setMessage1] = useState<string>("");
  const [getMessage2, setMessage2] = useState<string>("");
  const [getImageIdentification, setImageIdentification] = useState<string | undefined>(undefined);
  const [getDocumentCorporateCardCNPJ, setDocumentCorporateCardCNPJ] = useState<string | undefined>(undefined);
  const [getPdfOrImageDocumentCorporateCardCNPJ, setPdfOrImageDocumentCorporateCardCNPJ] = useState<number | undefined>(undefined);
  const [getDocumentBoardTrade, setDocumentBoardTrade] = useState<string | undefined>(undefined);
  const [getPdfOrImageDocumentBoardTrade, setPdfOrImageDocumentBoardTrade] = useState<number | undefined>(undefined);
  const [getImageCorporateRegistration, setImageCorporateRegistration] = useState<string | undefined>(undefined);
  const [getImageMaritalStatus, setImageMaritalStatus] = useState<string | undefined>(undefined);
  const [getPdfOrImageMaritalStatus, setPdfOrImageMaritalStatus] = useState<number | undefined>(undefined);
  const [getImageIdentificationSpouse, setImageIdentificationSpouse] = useState<string | undefined>(undefined);
  const [getPdfOrImageIdentificationSpouse, setPdfOrImageIdentificationSpouse] = useState<number | undefined>(undefined);
  const [getImageCorporateAddress, setImageCorporateAddress] = useState<string | undefined>(undefined);
  const [getPdfOrImageIdentification, setPdfOrImageIdentification] = useState<number | undefined>(undefined);
  const [getPdfOrImageAddress, setPdfOrImageAddress] = useState<number | undefined>(undefined);
  const [getPdfOrImageCorporateAddress, setPdfOrImageCorporateAddress] = useState<number | undefined>(undefined);
  const [getPdfOrImageCorporateRegistration, setPdfOrImageCorporateRegistration] = useState<number | undefined>(undefined);
  const [getImageResponsibleAddress, setImageResponsibleAddress] = useState<string | undefined>(undefined);
  const [getPermissionFunnelSales, setPermissionFunnelSales] = useState<Array<Permission>>([]);
  const [getSelectedLeadDisqualification, setSelectedLeadDisqualification] = useState<Object_.Desqualificacao | undefined>(undefined);
  const [getCellPhone, setCellPhone] = useState<Object_.Telefone | undefined>(undefined);
  const [getComercialPhone, setComercialPhone] = useState<Object_.Telefone | undefined>(undefined);
  const [getIsEnabledLegal, setIsEnabledLegal] = useState<boolean>(false);
  const [getPersonalIncome, setPersonalIncome] = useState<number | undefined>(undefined);

  //#region DADOS EMPRESARIAIS
  const [getCNPJ, setCNPJ] = useState<string | undefined>(undefined);
  const [getCorporateName, setCorporateName] = useState<string | undefined>(undefined);
  const [getFantasyName, setFantasyName] = useState<string | undefined>(undefined);
  const [getNIRE, setNIRE] = useState<string | undefined>(undefined);
  const [getSimplifiedCertificateNumber, setSimplifiedCertificateNumber] = useState<string | undefined>(undefined);
  const [getSimplifiedCertificateName, setSimplifiedCertificateName] = useState<string | undefined>(undefined);
  const [getDateIncorporation, setDateIncorporation] = useState<string | undefined>(undefined);
  //#endregion

  //#region ENDEREÇO EMPRESARIAL
  const [getCorporateCEP, setCorporateCEP] = useState<string | undefined>(undefined);
  const [getCorporatePublicPlace, setCorporatePublicPlace] = useState<string | undefined>(undefined);
  const [getCorporateNumber, setCorporateNumber] = useState<string | undefined>(undefined);
  const [getCorporateComplement, setCorporateComplement] = useState<string | undefined>(undefined);
  const [getCorporateDistrict, setCorporateDistrict] = useState<string | undefined>(undefined);
  const [getCorporateCity, setCorporateCity] = useState<string | undefined>(undefined);
  const [getCorporateUF, setCorporateUF] = useState<string | undefined>(undefined);
  //#endregion

  //#region DADOS PESSOAIS
  const [getName, setName] = useState<string | undefined>(undefined);
  const [getEmail, setEmail] = useState<string | undefined>(undefined);
  const [getCPF, setCPF] = useState<string | undefined>(undefined);
  const [getDataDeNascimento, setDataDeNascimento] = useState<string | undefined>(undefined);
  const [getNacionalidade, setNacionalidade] = useState<Object_.Nacao | undefined>(undefined);
  const [getNaturalityUF, setNaturalityUF] = useState<string | undefined>(undefined);
  const [getNaturalityCity, setNaturalityCity] = useState<string | undefined>(undefined);
  const [getOcupacao, setOcupacao] = useState<string | undefined>(undefined);
  const [getFiliacao02, setFiliacao02] = useState<string | undefined>(undefined);
  const [getFiliacao01, setFiliacao01] = useState<string | undefined>(undefined);
  const [getNumberRG, setNumberRG] = useState<string | undefined>(undefined);
  const [getIssuingBodyRG, setIssuingBodyRG] = useState<string | undefined>(undefined);
  const [getUfRG, setUfRG] = useState<string | undefined>(undefined);
  const [getCNH_Number, setCNH_Number] = useState<string | undefined>(undefined);
  const [getCNH_ExpeditionDate, setCNH_ExpeditionDate] = useState<string | undefined>(undefined);
  const [getCNH_UF, setCNH_UF] = useState<string | undefined>(undefined);
  const [getSelectedMaritalStatus, setSelectedMaritalStatus] = useState<number | undefined>(undefined);
  //#endregion
  
  //#region DADOS CÔNJUGE
  const [getNameSpouse, setNameSpouse] = useState<string | undefined>(undefined);
  const [getEmailSpouse, setEmailSpouse] = useState<string | undefined>(undefined);
  const [getCPFSpouse, setCPFSpouse] = useState<string | undefined>(undefined);
  const [getBirthSpouse, setBirthSpouse] = useState<string | undefined>(undefined);
  const [getRGSpouse, setRGSpouse] = useState<string | undefined>(undefined);
  const [getIssuingAgencySpouse, setIssuingAgencySpouse] = useState<string | undefined>(undefined);
  const [getRGUFSpouse, setRGUFSpouse] = useState<string | undefined>(undefined);
  const [getNationalitySpouse, setNationalitySpouse] = useState<Object_.Nacao | undefined>(undefined);
  const [getNaturalityUFSpouse, setNaturalityUFSpouse] = useState<string | undefined>(undefined);
  const [getNaturalityCitySpouse, setNaturalityCitySpouse] = useState<string | undefined>(undefined);
  const [getOcupationSpouse, setOcupationSpouse] = useState<string | undefined>(undefined);
  const [getPersonalIncomeSpouse, setPersonalIncomeSpouse] = useState<number | undefined>(undefined);
  const [getFiliacao01Spouse, setFiliacao01Spouse] = useState<string | undefined>(undefined);
  const [getFiliacao02Spouse, setFiliacao02Spouse] = useState<string | undefined>(undefined);
  const [getCellPhoneSpouse, setCellPhoneSpouse] = useState<Object_.Telefone | undefined>(undefined);
  const [getCNH_NumberSpouse, setCNH_NumberSpouse] = useState<string | undefined>(undefined);
  const [getCNH_ExpeditionDateSpouse, setCNH_ExpeditionDateSpouse] = useState<string | undefined>(undefined);
  const [getCNH_UfSpouse, setCNH_UfSpouse] = useState<string | undefined>(undefined);
  //#endregion
  //#endregion

  //#region variables
  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);
  //#endregion

  //#region Function
  function Toast() {
    setShowToast(false)
  }

  async function CaptureLocation() {
    let Response = await Controllers.LocalDeCaptacao.Get(DataLogin?.token, SelectedCompany?.id)
    if (Math.floor(Response.status / 100) === 2) {
      setCaptureLocation(Response.data)
    } else {
      console.log('ERROR LOCAL', Response.data)
    }
  }

  async function CanalAccess() {
    let Response = await Controllers.Logon.PermissaoDeAcessoPorFunilDeVenda(DataLogin?.token, SelectedCompany.id, undefined, undefined, undefined, DataLogin?.pessoa?.id ?? 0)
    if(Response.data.length > 0) {
      setPermissionFunnelSales(Response.data)
    }
  }

  async function SalesFunnel() {
    let Response = await Controllers.FunilDeVendas.Get(DataLogin?.token, SelectedCompany?.id, undefined, undefined, false);
    if (Math.floor(Response.status / 100) === 2) {
      setSaleFunnel(Response.data)
    } else {
      console.log('ERROR FUNIL', Response)
    }
  }

  async function GetLead() {
    let Response = await Controllers.Lead.Get(DataLogin?.token, SelectedCompany?.id, true, undefined, undefined, undefined, undefined, undefined, undefined, undefined, false, undefined, undefined, undefined, true);
    if (Math.floor(Response.status / 100) === 2) {
      let response: Kanban[] = Response.data
      setOriginalLead(response)
      if(SelectedCompany?.id == 5) {
        let filter = response.filter(Item => Item.posicaoDoFunil == 1 || Item.posicaoDoFunil == 2 || Item.posicaoDoFunil == 3 || Item.posicaoDoFunil == 4)
        setLead(filter)
      } else {
        setLead(response)
      }
    } else {
      setMessage1("Informação"); setMessage2("Não foi possível trazer os Leads, entre em contato com a equipe de desenvolvimento.."); setShowToast(true)
    }
  }

  async function GetSelectedLead(Item: Kanban) {
    setLoading(true);
    let Response = await Controllers.Lead.Get(DataLogin?.token, SelectedCompany?.id, false, undefined, Item.id, Item.nome, undefined, undefined, undefined, undefined, false, undefined, undefined, undefined, true);
    if (Math.floor(Response.status / 100) === 2) {
      let response: Object_.Lead[] = Response.data
      setSelectedLead(response);
      setLeadAnotation(response[0]?.anotacoes);
      setLeadTask(response[0]?.tarefas);
      setLeadScheduledVisits(response[0]?.agendamentosDeVisitas);
      setLeadLinkGifts(response[0]?.brindesOfertados);
      setDisqualification(response[0]?.qualificado);
      setSelectedLeadDisqualification(response[0]?.motivoDeDesqualificacao ? response[0]?.motivoDeDesqualificacao : undefined);
      setOpportunity(response[0]?.oportunidade ? true : false);
      setImageIdentification(response[0]?.documentoPessoal?.arquivo);
      setPdfOrImageIdentification(response[0]?.documentoPessoal?.extensao != 'pdf' ? 0 : response[0]?.documentoPessoal?.extensao == 'pdf' ? 1 : undefined);
      setPdfOrImageAddress(response[0]?.documentoEndereco?.extensao != 'pdf' ? 0 : response[0]?.documentoEndereco?.extensao == 'pdf' ? 1 : undefined);
      setImageResponsibleAddress(response[0]?.documentoEndereco?.arquivo);
      setImageCorporateRegistration(response[0]?.pjVinculado?.fichaCadastral?.arquivo);
      setImageCorporateAddress(response[0]?.pjVinculado?.documentoEndereco?.arquivo);
      setPdfOrImageCorporateRegistration(response[0]?.pjVinculado?.fichaCadastral?.extensao != 'pdf' ? 0 : response[0]?.documentoPessoal?.extensao == 'pdf' ? 1 : undefined);
      setPdfOrImageCorporateAddress(response[0]?.pjVinculado?.documentoEndereco?.extensao != 'pdf' ? 0 : response[0]?.documentoEndereco?.extensao == 'pdf' ? 1 : undefined);
      setImageMaritalStatus(response[0]?.documentoDeEstadoCivil?.arquivo);
      setPdfOrImageMaritalStatus(response[0]?.documentoDeEstadoCivil?.extensao != 'pdf' ? 0 : response[0].dependentes![0]?.documentoPessoal?.extensao == 'pdf' ? 1 : undefined)
      setImageIdentificationSpouse(response[0]?.dependentes![0]?.fotoDoDependente?.arquivo);
      setPdfOrImageIdentificationSpouse(response[0]?.dependentes![0]?.fotoDoDependente?.extensao != 'pdf' ? 0 : response[0].dependentes![0]?.fotoDoDependente?.extensao == 'pdf' ? 1 : undefined);
      setDocumentCorporateCardCNPJ(response[0]?.pjVinculado?.cartaoCNPJ?.arquivo);
      setPdfOrImageDocumentCorporateCardCNPJ(response[0]?.pjVinculado?.cartaoCNPJ?.extensao != 'pdf' ? 0 : response[0]?.pjVinculado?.cartaoCNPJ?.extensao == 'pdf' ? 1 : undefined);
      setDocumentBoardTrade(response[0]?.pjVinculado?.certidaoDaJuntaComercial?.arquivo);
      setPdfOrImageDocumentBoardTrade(response[0]?.pjVinculado?.certidaoDaJuntaComercial?.extensao != 'pdf' ? 0 : response[0]?.pjVinculado?.certidaoDaJuntaComercial?.extensao == 'pdf' ? 1 : undefined);
      setPdfOrImageIdentificationSpouse(response[0]?.dependentes![0]?.fotoDoDependente?.extensao != 'pdf' ? 0 : response[0].dependentes![0]?.fotoDoDependente?.extensao == 'pdf' ? 1 : undefined);
      setCellPhone(response[0]?.telefones ? response[0]?.telefones?.find(item => item.classificacao == 1 && item) : undefined)
      setComercialPhone(response[0]?.telefones ? response[0]?.telefones?.find(item => item.classificacao == 2 && item) : undefined)
      setIsEnabledLegal(response[0]?.pjVinculado ? true : false)
      setPersonalIncome(response[0].renda)
      setCNPJ(response[0]?.pjVinculado?.cnpj)
      setCorporateName(response[0]?.pjVinculado?.razaoSocial)
      setFantasyName(response[0]?.pjVinculado?.nomeFantasia)
      setNIRE(response[0]?.pjVinculado?.nire)
      setSimplifiedCertificateNumber(response[0]?.pjVinculado?.numeroCertidaoSimplificada)
      setSimplifiedCertificateName(response[0]?.pjVinculado?.nomeCertidaoSimplificada)
      setDateIncorporation(response[0]?.pjVinculado?.dataArqAtoConst)
      setCorporateCEP(response[0]?.pjVinculado?.endereco?.cep)
      setCorporatePublicPlace(response[0]?.pjVinculado?.endereco?.logradouro)
      setCorporateNumber(response[0]?.pjVinculado?.endereco?.numero)
      setCorporateComplement(response[0]?.pjVinculado?.endereco?.complemento)
      setCorporateDistrict(response[0]?.pjVinculado?.endereco?.bairro)
      setCorporateCity(response[0]?.pjVinculado?.endereco?.cidade)
      setCorporateUF(response[0]?.pjVinculado?.endereco?.uf)
      setName(response[0].nome)
      setEmail(response[0].emails![0]!?.descricao)
      setCPF(response[0].cpf)
      setDataDeNascimento(response[0].dataDeNascimento)
      setNacionalidade(response[0].nacionalidade)
      setNaturalityUF(response[0].naturalidade?.uf)
      setNaturalityCity(response[0].naturalidade?.cidade)
      setOcupacao(response[0].ocupacao?.nome)
      setFiliacao02(response[0].filiacao01)
      setFiliacao01(response[0].filiacao02)
      setNumberRG(response[0].rg?.numero)
      setIssuingBodyRG(response[0].rg?.orgaoEmissor)
      setUfRG(response[0].rg?.uf)
      setCNH_Number(response[0].cnh?.numero)
      setCNH_ExpeditionDate(response[0].cnh?.dataDeEmissao)
      setCNH_UF(response[0].cnh?.uf)
      setSelectedMaritalStatus(response[0].estadoCivil)
      setNameSpouse(response[0].dependentes![0]?.nome)
      setEmailSpouse(response[0].dependentes![0]?.email)
      setCPFSpouse(response[0].dependentes![0]?.cpf)
      setBirthSpouse(response[0].dependentes![0]?.dataDeNascimento)
      setRGSpouse(response[0].dependentes![0]?.rg?.numero)
      setIssuingAgencySpouse(response[0].dependentes![0]?.rg?.orgaoEmissor)
      setRGUFSpouse(response[0].dependentes![0]?.rg?.uf)
      setNationalitySpouse(response[0].dependentes![0]?.nacionalidade)
      setNaturalityUFSpouse(response[0].dependentes![0]?.naturalidade?.uf)
      setNaturalityCitySpouse(response[0].dependentes![0]?.naturalidade?.cidade)
      setCellPhoneSpouse(response[0].dependentes![0]?.telefones![0])
      setPersonalIncomeSpouse(response[0].dependentes![0]?.renda)
      setOcupationSpouse(response[0].dependentes![0]?.ocupacao?.nome)
      setFiliacao01Spouse(response[0].dependentes![0]?.filiacao01)
      setFiliacao02Spouse(response[0].dependentes![0]?.filiacao02)
      setCNH_NumberSpouse(response[0].dependentes![0]?.cnh?.numero)
      setCNH_ExpeditionDateSpouse(response[0].dependentes![0]?.cnh?.dataDeEmissao)
      setCNH_UfSpouse(response[0].dependentes![0]?.cnh?.uf)
      setLoading(false)
      setVisibleLead(true)
    } else {
      setLoading(false)
      console.log('ERROR LEAD', Response)
    }
  }

  console.log(getLead ? getLead[0] : undefined)

  function SearchLead(search: string) {
    search = search.toLowerCase();
    let filteredLead: Kanban[] = JSON.parse(JSON.stringify(getOriginalLead));
    if(search.length == 0) {
      setLead(getOriginalLead);
    }
    else {
      if(filteredLead.find(item => item.id?.toString()?.includes(search))) {
        filteredLead = filteredLead.filter(item => item.id?.toString()?.includes(search));
      };
      if(filteredLead.find(item => item.telefone![0]?.numero?.includes(search))) {
        filteredLead = filteredLead.filter(item => item.telefone![0]?.numero?.includes(search));
      };
      if(filteredLead.find(item => item.nome.toLowerCase()?.includes(search))) {
        filteredLead = filteredLead.filter(item => item?.nome?.toLowerCase()?.includes(search));
      };
      if(filteredLead.find(item => item.email![0]?.descricao?.toLowerCase()?.includes(search))) {
        filteredLead = filteredLead.filter(item => item.email![0]?.descricao?.toLowerCase()?.includes(search));
      };
      if(filteredLead.find(item => item.funilDescricao?.toLowerCase()?.includes(search))) {
        filteredLead = filteredLead.filter(item => item.funilDescricao?.toLowerCase()?.includes(search));
      };
      if(filteredLead.find(item => item.salaDeVendaDescricao?.toLowerCase()?.includes(search))) {
        filteredLead = filteredLead.filter(item => item?.salaDeVendaDescricao?.toLowerCase()?.includes(search));
      };
      if(filteredLead.find(item => item.areaDescricao?.toLowerCase()?.includes(search))) {
        filteredLead = filteredLead.filter(item => item?.areaDescricao?.toLowerCase()?.includes(search));
      };
    };
    setLead(filteredLead);
  }
  
  const customSort = (a: Kanban, b: Kanban) => {
    if(a.dataAlteracao && b.dataAlteracao) {
      const dateA = new Date(a.dataAlteracao)
      const dateB = new Date(b.dataAlteracao)
      if(dateA < dateB) return 1;
      else if(dateA > dateB) return -1;
      return 0
    } else return 0
  }

  function scheduleVisit(): number {
    let today = new Date();
    let visitDay = new Date("2023-08-25T14:57:40.753Z");
    let difference = visitDay.getDate()-today.getDate();
    return difference
  }
  //#endregion

  //#region UseEffect
  useEffect(() => {
    if(getFirst === true) {
      CaptureLocation();
      GetLead();
      CanalAccess();
      setFirst(false)
      SalesFunnel();
    }
  }, []);
  //#endregion

  return (
    <LinearGradient colors={['#26A77C', '#105B74']}>
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
    <Styled.Container>
        <Styled.ContainerHeader style={{marginTop: Platform.OS === 'ios' ? '15%' : '10%'}}>
            <TouchableOpacity activeOpacity={0.9} onPress={() => {viewModel.navigation.navigate('Menu')}}>
              <SvgCss xml={ArrowBack} />
            </TouchableOpacity>
        <Styled.TextHeader>Funis De Vendas</Styled.TextHeader>
      </Styled.ContainerHeader>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: '5%', marginTop: '2%', marginBottom: 5}}>
        <Styled.TextLead>{getLead ? getLead?.length : undefined} Leads</Styled.TextLead>
        <TouchableOpacity onPress={() => {setVisibleFilter(true)}}>
          <SvgCss xml={_Filter} />
        </TouchableOpacity>
        {getVisibleFilter &&
        <Modals.FilterSaleFunnel
          setLead={setLead}
          getLead={getLead}
          getOriginalLead={getOriginalLead}
          visible={getVisibleFilter}
          setVisibleFilter={setVisibleFilter}
          getSelectedSaleFunnel={getSelectedSaleFunnel}
          setSelectedSaleFunnel={setSelectedSaleFunnel}
          getPermissionFunnelSales={getPermissionFunnelSales}
        />}
      </View>
      {getLead!?.length > 0 &&
      <>
        <Styled.InputSquareContainer>
          <Styled.InputSquare
            onChangeText={(event) => {SearchLead(event)}}
            placeholder="Buscar Lead"
            placeholderTextColor={'#FFFFFF95'}
            textAlign={'center'}
          />
          <SvgCss
            xml={MagnifyingGlass}
            style={{marginLeft: '90%', position: 'absolute'}}
          />
        </Styled.InputSquareContainer>
        <FlatList
          style={{marginBottom: '5%'}}
          refreshing={true}
          showsVerticalScrollIndicator={false}
          data={getLead?.sort(customSort)}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({item, index}) => 
            <Styled.SubContainer onPress={() => {GetSelectedLead(item)}} activeOpacity={0.9}>
              {getVisibleLead &&
              <Modals.Lead
                onPressClose={() => {setVisibleLead(false)}}
                index={index}
                setVisibleLead={setVisibleLead}
                visible={getVisibleLead}
                item={getSelectedLead![0]}
                getSaleFunnel={getSaleFunnel}
                getSelectedSaleFunnel={getSelectedSaleFunnel}
                setLead={setLead}
                getLead={getLead}
                setSelectedLead={setSelectedLead}
                setLeadAnotation={setLeadAnotation}
                getLeadAnotation={getLeadAnotation}
                getLeadTask={getLeadTask}
                setLeadTask={setLeadTask}
                getLeadScheduledVisits={getLeadScheduledVisits}
                setLeadScheduledVisits={setLeadScheduledVisits}
                getLeadLinkGifts={getLeadLinkGifts}
                setLeadLinkGifts={setLeadLinkGifts}
                getDisqualification={getDisqualification}
                setDisqualification={setDisqualification}
                getOpportunity={getOpportunity}
                setOpportunity={setOpportunity}
                getImageIdentification={getImageIdentification}
                setImageIdentification={setImageIdentification}
                getImageResponsibleAddress={getImageResponsibleAddress}
                setImageResponsibleAddress={setImageResponsibleAddress}
                getSelectedLeadDisqualification={getSelectedLeadDisqualification}
                setSelectedLeadDisqualification={setSelectedLeadDisqualification}
                getPdfOrImageIdentification={getPdfOrImageIdentification}
                setPdfOrImageIdentification={setPdfOrImageIdentification}
                getImageCorporateRegistration={getImageCorporateRegistration}
                setImageCorporateRegistration={setImageCorporateRegistration}
                getImageCorporateAddress={getImageCorporateAddress}
                setImageCorporateAddress={setImageCorporateAddress}
                getPdfOrImageAddress={getPdfOrImageAddress}
                setPdfOrImageAddress={setPdfOrImageAddress}
                getPdfOrImageCorporateAddress={getPdfOrImageCorporateAddress}
                setPdfOrImageCorporateAddress={setPdfOrImageCorporateAddress}
                getPdfOrImageCorporateRegistration={getPdfOrImageCorporateRegistration}
                setPdfOrImageCorporateRegistration={setPdfOrImageCorporateRegistration}
                getImageMaritalStatus={getImageMaritalStatus}
                setImageMaritalStatus={setImageMaritalStatus}
                getPdfOrImageMaritalStatus={getPdfOrImageMaritalStatus}
                setPdfOrImageMaritalStatus={setPdfOrImageMaritalStatus}
                getImageIdentificationSpouse={getImageIdentificationSpouse}
                setImageIdentificationSpouse={setImageIdentificationSpouse}
                getPdfOrImageIdentificationSpouse={getPdfOrImageIdentificationSpouse}
                setPdfOrImageIdentificationSpouse={setPdfOrImageIdentificationSpouse}
                getDocumentCorporateCardCNPJ={getDocumentCorporateCardCNPJ}
                getPdfOrImageDocumentCorporateCardCNPJ={getPdfOrImageDocumentCorporateCardCNPJ}
                getDocumentBoardTrade={getDocumentBoardTrade}
                getPdfOrImageDocumentBoardTrade={getPdfOrImageDocumentBoardTrade}
                setDocumentCorporateCardCNPJ={setDocumentCorporateCardCNPJ}
                setPdfOrImageDocumentCorporateCardCNPJ={setPdfOrImageDocumentCorporateCardCNPJ}
                setDocumentBoardTrade={setDocumentBoardTrade}
                setPdfOrImageDocumentBoardTrade={setPdfOrImageDocumentBoardTrade}
                getCellPhone={getCellPhone}
                setCellPhone={setCellPhone}
                getComercialPhone={getComercialPhone}
                setComercialPhone={setComercialPhone}
                salaDeVendaID={item.salaDeVenda}
                areaID={item.area}
                funilID={item.funil}
                salaDeVendaDescription={item.salaDeVendaDescricao}
                areaDescription={item.areaDescricao}
                funilDescription={item.funilDescricao}
                posicaoDoFunilID={item.posicaoDoFunil}
                posicaoDoFunilDescription={item.posicaoDoFunilDescricao}
                setIsEnabledLegal={setIsEnabledLegal}
                getIsEnabledLegal={getIsEnabledLegal}
                getPersonalIncome={getPersonalIncome}
                setPersonalIncome={setPersonalIncome}
                getCNPJ={getCNPJ}
                setCNPJ={setCNPJ}
                getCorporateName={getCorporateName}
                setCorporateName={setCorporateName}
                getFantasyName={getFantasyName}
                setFantasyName={setFantasyName}
                getNIRE={getNIRE}
                setNIRE={setNIRE}
                getSimplifiedCertificateNumber={getSimplifiedCertificateNumber}
                setSimplifiedCertificateNumber={setSimplifiedCertificateNumber}
                getSimplifiedCertificateName={getSimplifiedCertificateName}
                setSimplifiedCertificateName={setSimplifiedCertificateName}
                getDateIncorporation={getDateIncorporation}
                setDateIncorporation={setDateIncorporation}
                getCorporateCEP={getCorporateCEP}
                setCorporateCEP={setCorporateCEP}
                getCorporatePublicPlace={getCorporatePublicPlace}
                setCorporatePublicPlace={setCorporatePublicPlace}
                getCorporateNumber={getCorporateNumber}
                setCorporateNumber={setCorporateNumber}
                getCorporateComplement={getCorporateComplement}
                setCorporateComplement={setCorporateComplement}
                getCorporateDistrict={getCorporateDistrict}
                setCorporateDistrict={setCorporateDistrict}
                getCorporateCity={getCorporateCity}
                setCorporateCity={setCorporateCity}
                getCorporateUF={getCorporateUF}
                setCorporateUF={setCorporateUF}
                getName={getName}
                setName={setName}
                getEmail={getEmail}
                setEmail={setEmail}
                getCPF={getCPF}
                setCPF={setCPF}
                getDataDeNascimento={getDataDeNascimento}
                setDataDeNascimento={setDataDeNascimento}
                getNacionalidade={getNacionalidade}
                setNacionalidade={setNacionalidade}
                getNaturalityUF={getNaturalityUF}
                setNaturalityUF={setNaturalityUF}
                getNaturalityCity={getNaturalityCity}
                setNaturalityCity={setNaturalityCity}
                getOcupacao={getOcupacao}
                setOcupacao={setOcupacao}
                getFiliacao02={getFiliacao02}
                setFiliacao02={setFiliacao02}
                getFiliacao01={getFiliacao01}
                setFiliacao01={setFiliacao01}
                getNumberRG={getNumberRG}
                setNumberRG={setNumberRG}
                getIssuingBodyRG={getIssuingBodyRG}
                setIssuingBodyRG={setIssuingBodyRG}
                getUfRG={getUfRG}
                setUfRG={setUfRG}
                getCNH_Number={getCNH_Number}
                setCNH_Number={setCNH_Number}
                getCNH_ExpeditionDate={getCNH_ExpeditionDate}
                setCNH_ExpeditionDate={setCNH_ExpeditionDate}
                getCNH_UF={getCNH_UF}
                setCNH_UF={setCNH_UF}
                getSelectedMaritalStatus={getSelectedMaritalStatus}
                setSelectedMaritalStatus={setSelectedMaritalStatus}
                getNameSpouse={getNameSpouse}
                setNameSpouse={setNameSpouse}
                getEmailSpouse={getEmailSpouse}
                setEmailSpouse={setEmailSpouse}
                getCPFSpouse={getCPFSpouse}
                setCPFSpouse={setCPFSpouse}
                getBirthSpouse={getBirthSpouse}
                setBirthSpouse={setBirthSpouse}
                getRGSpouse={getRGSpouse}
                setRGSpouse={setRGSpouse}
                getIssuingAgencySpouse={getIssuingAgencySpouse}
                setIssuingAgencySpouse={setIssuingAgencySpouse}
                getRGUFSpouse={getRGUFSpouse}
                setRGUFSpouse={setRGUFSpouse}
                getNationalitySpouse={getNationalitySpouse}
                setNationalitySpouse={setNationalitySpouse}
                getNaturalityUFSpouse={getNaturalityUFSpouse}
                setNaturalityUFSpouse={setNaturalityUFSpouse}
                getNaturalityCitySpouse={getNaturalityCitySpouse}
                setNaturalityCitySpouse={setNaturalityCitySpouse}
                getOcupationSpouse={getOcupationSpouse}
                setOcupationSpouse={setOcupationSpouse}
                getPersonalIncomeSpouse={getPersonalIncomeSpouse}
                setPersonalIncomeSpouse={setPersonalIncomeSpouse}
                getFiliacao01Spouse={getFiliacao01Spouse}
                setFiliacao01Spouse={setFiliacao01Spouse}
                getFiliacao02Spouse={getFiliacao02Spouse}
                setFiliacao02Spouse={setFiliacao02Spouse}
                getCellPhoneSpouse={getCellPhoneSpouse}
                setCellPhoneSpouse={setCellPhoneSpouse}
                getCNH_NumberSpouse={getCNH_NumberSpouse}
                setCNH_NumberSpouse={setCNH_NumberSpouse}
                getCNH_ExpeditionDateSpouse={getCNH_ExpeditionDateSpouse}
                setCNH_ExpeditionDateSpouse={setCNH_ExpeditionDateSpouse}
                getCNH_UfSpouse={getCNH_UfSpouse}
                setCNH_UfSpouse={setCNH_UfSpouse}
              />}
              <Styled.SubContainerTitle>{item?.nome} - {item?.id}</Styled.SubContainerTitle>
              <Styled.Profile>
                <SvgCss xml={Profile} />
              </Styled.Profile>
              {item?.email?.map(email => <Styled.SubContainerText>Email: {'\n'}{(email?.descricao)}</Styled.SubContainerText>)}
              <Styled.SubContainerText>Data: {moment(item.dataDeCadastro).format("DD/MM/YYYY")}</Styled.SubContainerText>
              {item?.telefone?.map(phone => <Styled.SubContainerText>Telefone: {TextFormat.Telefone.FormatarTexto(phone.ddd !== undefined || null || "" ? phone.ddd + phone.numero : phone.numero)}</Styled.SubContainerText>)}
              <Styled.SubContainerText>Funil: {item.funilDescricao ? item.funilDescricao : "Não Classificado"}</Styled.SubContainerText>
              <Styled.SubContainerText>Sala de venda: {item.salaDeVendaDescricao ? item.salaDeVendaDescricao : "Não Classificado"}</Styled.SubContainerText>
              <Styled.SubContainerText>Canal: {item.areaDescricao ? item.areaDescricao : "Não Classificado"}</Styled.SubContainerText>
              <Styled.SubContainerText>Posição do Funil: {item.posicaoDoFunilDescricao ? item.posicaoDoFunilDescricao : "Não Classificado"}</Styled.SubContainerText>
              <Styled.SubContainerText>Tarefas: {item.statusDaTarefa}</Styled.SubContainerText>
              {item.dataDaVisita &&
              <Styled.ScheduledVisitContainer style={{backgroundColor: scheduleVisit() > 2 ? "#38991695" : scheduleVisit() == 0 ? "#99161690" : scheduleVisit() == 2 || scheduleVisit() == 1 ? "#E6FB0E80" : undefined}}>
                  <Styled.ScheduledVisitText>{`Visita Agendada: \n${moment(item.dataDaVisita).format('lll')}`}</Styled.ScheduledVisitText>
              </Styled.ScheduledVisitContainer>}
            </Styled.SubContainer>}
          />
            <Styled.ContainerSubmit>
              <Styled.Submit onPress={() => {setVisibleNewOpportunity(true)}} activeOpacity={0.8}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  <SvgCss xml={Plus} style={{marginLeft: '5%'}}/>
                  <Styled.TextSubmit>Criar Nova Oportunidade</Styled.TextSubmit>
                  {getVisibleNewOpportunity &&
                  <Modals.NewOpportunity
                    getLead={getLead}
                    setLead={setLead}
                    getCaptureLocation={getCaptureLocation}
                    onPressClose={() => {setVisibleNewOpportunity(false)}}
                    visible={getVisibleNewOpportunity}
                    getSaleFunnel={getSaleFunnel}
                    setVisibleNewOpportunity={setVisibleNewOpportunity}
                    getPermissionFunnelSales={getPermissionFunnelSales}
                  />}
                </View>
              </Styled.Submit>
            </Styled.ContainerSubmit>
      </>}
      {getLead?.length == 0 &&
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <Styled.SubContainerText style={{textAlign: 'center', marginTop: '50%'}}>{`Não existem Leads \n Crie uma nova oportunidade!`}</Styled.SubContainerText>
        <Styled.Submit onPress={() => {setVisibleNewOpportunity(true)}} activeOpacity={0.8}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <SvgCss xml={Plus} style={{marginLeft: '5%'}}/>
            <Styled.TextSubmit>Criar Nova Oportunidade</Styled.TextSubmit>
            {getVisibleNewOpportunity &&
            <Modals.NewOpportunity
              getLead={getLead}
              setLead={setLead}
              getCaptureLocation={getCaptureLocation}
              onPressClose={() => {setVisibleNewOpportunity(false)}}
              visible={getVisibleNewOpportunity}
              getSaleFunnel={getSaleFunnel}
              setVisibleNewOpportunity={setVisibleNewOpportunity}
              getPermissionFunnelSales={getPermissionFunnelSales}

            />}
          </View>
        </Styled.Submit>
      </View>}
      {getLead == null &&
      <View style={{marginTop: 100}}>
        <Styled.SubContainerText style={{textAlign: 'center', marginTop: '10%'}}>{`Aguarde, \nestamos trazendo os Leads...`}</Styled.SubContainerText>
        <Styled.Loading style={{height: ResponsiveHeight('10%')}}>
          <Lottie source={LoadingInformations} resizeMode={'contain'} autoPlay loop />
        </Styled.Loading>
      </View>}
    </Styled.Container>
  </LinearGradient>
  )
}