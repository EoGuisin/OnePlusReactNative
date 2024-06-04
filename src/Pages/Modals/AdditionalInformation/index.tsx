//#region React
import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import {Modal, TouchableOpacity, Platform, View} from 'react-native';
import moment from 'moment';
//#endregion

//#region Icons
import {ArrowBack, Home} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Styled
import { TouchInput } from '../../../Components';
import * as Styled from './styles';
import * as Modals from '../../Modals';
import { Comission } from '../../Catalog/Menu/PagesMenu/VendaDireta';
//#endregion

//#region Services
import { Type } from '../PaymentPlan/Modals/viewModel';
import * as TextFormat from '../../../Themes/TextFormat';
import * as Controllers from '../../../Services/Controllers';
import { Object_ } from '../../../Services/Objects';
import { ToastMessage } from '../../../Components';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs'
//#endregion

//#region Reduxs
import {useSelector} from 'react-redux';
//#endregion

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

export const AdditionalInformation = (props: Props) => {

  //#region UseState
  const [getShowToast, setShowToast] = useState<boolean>(false);
  const [getMessage1, setMessage1] = useState<string>("");
  const [getMessage2, setMessage2] = useState<string>("");
  const [getLoading, setLoading] = useState<boolean>(false);

  const [getOpen, setOpen] = useState<boolean>(false);
  const [getVisibleCaptureLocation, setVisibleCaptureLocation] = useState<boolean>(false);
  const [getVisiblePurchasePurpose, setVisiblePurchasePurpose] = useState<boolean>(false);
  //#endregion

  //#region Variables
  const blurredColor = "rgba(255, 255, 255, 0.7)";
  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);
  //#endregion

  async function CaptureLocation() {
    let Response = await Controllers.LocalDeCaptacao.Get(DataLogin?.token, SelectedCompany?.id)
    if (Math.floor(Response.status / 100) === 2) {
      props.setCaptureLocation(Response.data)
    } else {
      console.log(`ERROR: ${Response.data}`)
    }
  }

  async function PurchasePurpose() {
    let Response = await Controllers.Venda.FinalidadesDeCompra(DataLogin?.token, SelectedCompany?.id)
    if (Math.floor(Response.status / 100) === 2) {
      props.setPurchasePurpose(Response.data)
    } else {
      console.log(`ERROR: ${Response.data}`)
    }
  }

  async function ValidatingData(): Promise<boolean> {
    if(props.getDocumentChecklist && props.getDocumentChecklist.length <= 0) {
      setMessage1(`O check list de cadastro anexado não é valida, selecione um novo arquivo`); setMessage2('Selecione um novo arquivo'); setShowToast(true)
      return false;
    }
    if(props.getProspectsList.length == 1 && !props.getProspectsList[0].cpf || props.getProspectsList[0].cpf == '') {
      setMessage1(`O proponente não foi preenchido`); setMessage2('O preenchimento do proponente é obrigatório'); setShowToast(true)
      return false;
    }
    if(props.getProspectsList.some((Item, Index) => {
      if (Item.documentoPessoal != undefined && Item.documentoPessoal.arquivo == '') {
        setMessage1(`O documento pessoal do ${Index + 1}º proponente não foi anexado`); setMessage2('Selecione um novo arquivo'); setShowToast(true)
        return true;
      } if (Item.cpf!?.length != 11) {
        setMessage1(`O CPF do ${Index + 1}º proponente é inválido`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
        return true;
      } if (!Item.cpf || Item.cpf == '') {
        setMessage1(`O CPF do ${Index + 1}º proponente não foi informado`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
        return true;
      } if (Item?.nome == undefined) {
        setMessage1(`O nome do ${Index + 1}º proponente não foi informado`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
        return true;
      } if (!Item.dataDeNascimento) {
        setMessage1(`A data de nascimento do ${Index + 1}º proponente não foi informada`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
        return true;
      } if (!Item.nacionalidade || Item.nacionalidade.descricao == '') {
        setMessage1(`A nacionalidade do ${Index + 1}º proponente não foi informada`); setMessage2('Tente selecionar novamente a opção desejada'); setShowToast(true)
        return true;
      } if (!Item.estadoCivil) {
        setMessage1(`O estado civil do ${Index + 1}º proponente não foi informado`); setMessage2('Tente selecionar novamente a opção desejada'); setShowToast(true)
        return true;
      } if (!Item?.emails![0]!?.descricao || Item?.emails!?.length == 0) {
        setMessage1(`O email do ${Index + 1}º proponente não foi informado`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
        return true;
      } if (!Item.telefones || Item.telefones?.length == 0) {
        setMessage1(`Nenhum telefone ou telefone incompleto foi informado para o ${Index + 1}º proponente`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
        return true;
      } if (!Item.ocupacao || Item.ocupacao.nome == '') {
        setMessage1(`A profissão do ${Index + 1}º proponente não foi informada`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
        return true;
      } if (!Item.dataDeNascimento) {
        setMessage1(`A data de nascimento do ${Index + 1}º proponente não foi informada`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
        return true;
      } if (!Item.rg || !Item.rg.orgaoEmissor || Item.rg.orgaoEmissor == '') {
        setMessage1(`O orgão emissor do RG do ${Index + 1}º proponente não foi informado`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
        return true;
      } if (!Item.rg || !Item.rg.uf || Item.rg.uf == '') {
        setMessage1(`A UF responsável pela emissão do RG do ${Index + 1}º proponente não foi informado`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
        return true;
      } if (!Item.rg || !Item.rg.numero || Item.rg.numero == '') {
        setMessage1(`O número responsável pela emissão do RG do ${Index + 1}º proponente não foi informada`); setMessage2('Tente selecionar novamente a opção desejada'); setShowToast(true)
        return true;
      } if (Item.endereco == undefined) {
        setMessage1(`O endereço do ${Index + 1}º proponente não foi informado`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
        return true;
      } if (!Item.endereco.cep || !Item.endereco.logradouro || !Item.endereco.bairro || !Item.endereco.cidade || !Item.endereco.uf) {
        setMessage1(`O endereço do ${Index + 1}º proponente possui campos não informados`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
        return true;
      }
      if(Item.estadoCivil === 2 || Item.estadoCivil === 7) {
        if(props.getDependentsList.some((Item, Index) => {
          if (Item?.documentoPessoal == undefined || Item?.documentoPessoal?.arquivo == '') {
            setMessage1(`O documento pessoal do ${Index + 1}º proponente não foi anexado`); setMessage2('Selecione um novo arquivo'); setShowToast(true)
            return true;
          } if (!Item?.cpf || Item?.cpf == '') {
            setMessage1(`O CPF do conjugê do ${Index + 1}º proponente não foi informado`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
            return true;
          } if (Item?.cpf!?.length != 11) {
            setMessage1(`O CPF do conjugê do ${Index + 1}º proponente é inválido`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
            return true;
          } if (!Item?.email || Item?.email == '') {
            setMessage1(`O email do conjugê do ${Index + 1}º proponente não foi informado`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
            return true;
          } if (!Item?.rg || !Item?.rg.numero || Item?.rg.numero == '') {
            setMessage1(`O RG do conjugê do ${Index + 1}º proponente não foi informado`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
            return true;
          } if (Item?.nome == undefined) {
            setMessage1(`O nome do conjugê do ${Index + 1}º proponente não foi informado`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
            return true;
          } if (!Item?.rg || !Item?.rg.orgaoEmissor || Item?.rg.orgaoEmissor == '') {
            setMessage1(`O orgão emissor do RG do conjugê do ${Index + 1}º proponente não foi informado`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
            return true;
          } if (!Item?.dataDeNascimento) {
            setMessage1(`A data de nascimento do conjugê do ${Index + 1}º proponente não foi informada`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
            return true;
          } if (!Item?.telefones || Item?.telefones?.length == 0) {
            setMessage1(`Nenhum telefone foi informado para o conjugê do ${Index + 1}º proponente`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
            return true;
          } if (!Item?.rg || !Item?.rg.uf || Item?.rg.uf == '') {
            setMessage1(`A UF responsável pela emissão do RG do conjugê do ${Index + 1}º proponente não foi informada`); setMessage2('Tente selecionar novamente a opção desejada e se persistir, entre em contato com a equipe de desenvolvimento'); setShowToast(true)
            return true;
          } if (!Item?.nacionalidade || Item?.nacionalidade.descricao == '') {
            setMessage1(`A nacionalidade do conjugê do ${Index + 1}º proponente não foi informada`); setMessage2('Tente selecionar novamente a opção desejada e se persistir, entre em contato com a equipe de desenvolvimento'); setShowToast(true)
            return true;
          } if (!Item?.ocupacao || Item?.ocupacao.nome == '') {
            setMessage1(`A profissão do conjugê do ${Index + 1}º proponente não foi informada`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
            return true;
          }
        }) == true)
        return false;
      }
    }) == true)
    return false;
    if(!props.getSelectedCentroDeCusto?.descricao || !props.getSelectedCentroDeCusto) {
      setMessage1('Informe o empreendimento'); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
      return false
    }
    if(!props.getSelectedUnity?.subLocalDescricao || !props.getSelectedUnity) {
      setMessage1('Informe a unidade'); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
      return false
    }
    if(!props.getSelectedSalesModel) {
      setMessage1('Informe o modelo de venda'); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
      return false
    }
    if ([...props.getTitulosDeEntrada.titulos.map((Item, Index) => {
      return { index: Index, anexo: props.getTitulosDeEntrada.anexo, titulo: Item, classificacao: props.getTitulosDeEntrada.titulo }
    }), ...props.getTitulosDeSinal.titulos.map((Item, Index) => {
      return { index: Index, anexo: props.getTitulosDeSinal.anexo, titulo: Item, classificacao: props.getTitulosDeSinal.titulo }
    }), ...props.getTitulosDeIntermediaria.titulos.map((Item, Index) => {
      return { index: Index, anexo: props.getTitulosDeIntermediaria.anexo, titulo: Item, classificacao: props.getTitulosDeIntermediaria.titulo }
    }), ...props.getTitulosDeSaldo.titulos.map((Item, Index) => {
      return { index: Index, anexo: props.getTitulosDeSaldo.anexo, titulo: Item, classificacao: props.getTitulosDeSaldo.titulo }
    })].some(Item => {
      if (Item.anexo && Item.anexo.arquivo == '') {
        setMessage1(`O anexo vinculado a lista de ${Item.classificacao} é inválida`); setMessage2('Selecione um novo arquivo'); setShowToast(true)
        return true;
      }
      if (!Item.titulo.quantidade || Item.titulo.quantidade <= 0) {
        setMessage1(`A quantidade de títulos informada no ${Item.index + 1}º item da lista de ${Item.classificacao} é inválida`); setMessage2('O valor deverá ser maior ou igual a 01'); setShowToast(true)
        return true;
      }
      if (!Item.titulo.vencimento) {
        setMessage1(`A vencimento do título informada no ${Item.index + 1}º item da lista de ${Item.classificacao} é inválida`); setMessage2('O valor deverá ser preenchido'); setShowToast(true)
        return true;
      }
      if (SelectedCompany?.id == 4 && (Item.classificacao == 'sinais' || Item.classificacao == 'saldos') && !(Item.titulo.meioDePagamento === 'Boleto' || Item.titulo.meioDePagamento === 'PIX' || Item.titulo.meioDePagamento === 'Reaproveitamento')) {
        setMessage1(`Meio de pagamento inválido`); setMessage2(`Somente será permitidos o meio de pagamento "Boleto", "PIX" e "Reaproveitamento" para o sinal e saldo`); setShowToast(true)
        return true;
      }
      if (Item.titulo.meioDePagamento == 'Cartão') {
        if (!Item.titulo.maquina || Item.titulo.maquina == '') {
          setMessage1(`A máquina no ${Item.index + 1}º item da lista de ${Item.classificacao} não foi informada`); setMessage2('Todos os campos referentes ao meio de pagamento são obrigatórios'); setShowToast(true)
          return true;
        }
        if (!Item.titulo.digitoCartao || Item.titulo.digitoCartao == '') {
          setMessage1(`O dígito do cartão no ${Item.index + 1}º item da lista de ${Item.classificacao} não foi informada`); setMessage2('Todos os campos referentes ao meio de pagamento são obrigatórios'); setShowToast(true)
          return true;
        }
        if (!Item.titulo.bandeira || Item.titulo.bandeira == '') {
          setMessage1(`A bandeira no ${Item.index + 1}º item da lista de ${Item.classificacao} não foi informada`); setMessage2('Todos os campos referentes ao meio de pagamento são obrigatórios'); setShowToast(true)
          return true;
        }
        if (!Item.titulo.operacao || Item.titulo.operacao == '') {
          setMessage1(`A operação no ${Item.index + 1}º item da lista de ${Item.classificacao} não foi informada`); setMessage2('Todos os campos referentes ao meio de pagamento são obrigatórios'); setShowToast(true)
          return true;
        }
        if (!Item.titulo.nsu || Item.titulo.nsu == '') {
          setMessage1(`O NSU no ${Item.index + 1}º item da lista de ${Item.classificacao} não foi informada`); setMessage2('Todos os campos referentes ao meio de pagamento são obrigatórios'); setShowToast(true)
          return true;
        }
      }
      if (Item.titulo.meioDePagamento == 'Cheque') {
        if (!Item.titulo.banco || Item.titulo.banco.key == '') {
          setMessage1(`O banco no ${Item.index + 1}º item da lista de ${Item.classificacao} não foi informada`); setMessage2('Todos os campos referentes ao meio de pagamento são obrigatórios'); setShowToast(true)
          return true;
        }
        if (!Item.titulo.agencia || Item.titulo.agencia == '') {
          setMessage1(`A agência do cartão no ${Item.index + 1}º item da lista de ${Item.classificacao} não foi informada`); setMessage2('Todos os campos referentes ao meio de pagamento são obrigatórios'); setShowToast(true)
          return true;
        }
        if (!Item.titulo.conta || Item.titulo.conta == '') {
          setMessage1(`A conta no ${Item.index + 1}º item da lista de ${Item.classificacao} não foi informada`); setMessage2('Todos os campos referentes ao meio de pagamento são obrigatórios'); setShowToast(true)
          return true;
        }
        if (!Item.titulo.digitoDaConta || Item.titulo.digitoDaConta == '') {
          setMessage1(`O dígito no ${Item.index + 1}º item da lista de ${Item.classificacao} não foi informada`); setMessage2('Todos os campos referentes ao meio de pagamento são obrigatórios'); setShowToast(true)
          return true;
        }
        if (!Item.titulo.titular || Item.titulo.titular == '') {
          setMessage1(`O titular no ${Item.index + 1}º item da lista de ${Item.classificacao} não foi informada`); setMessage2('Todos os campos referentes ao meio de pagamento são obrigatórios'); setShowToast(true)
          return true;
        }
        if (!Item.titulo.numeroCheque || Item.titulo.numeroCheque == '') {
          setMessage1(`O número no ${Item.index + 1}º item da lista de ${Item.classificacao} não foi informada`); setMessage2('Todos os campos referentes ao meio de pagamento são obrigatórios'); setShowToast(true)
          return true;
        }
      }
      if (Item.titulo.meioDePagamento == 'Depósito' || Item.titulo.meioDePagamento == 'PIX' || Item.titulo.meioDePagamento == 'Transferência') {
        if (!Item.titulo.numeroDaOperacao || Item.titulo.numeroDaOperacao == '') {
          setMessage1(`O número da operação no ${Item.index + 1}º item da lista de ${Item.classificacao} não foi informada`); setMessage2('Todos os campos referentes ao meio de pagamento são obrigatórios'); setShowToast(true)
          return true;
        }
      }
      return false;
    }) == true) {
      return false;
    }
    if (SelectedCompany?.id == 4 && TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(props.getTitulosDeEntrada.totalEsperado)) != TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(props.getTitulosDeEntrada.titulos.reduce((Acumulado, Atual) => Acumulado + Atual.valorTotal, 0) ?? 0))) {
      setMessage1(`O valor esperado para a entrada é diferente do total gerado`); setMessage2('O principal gerado de parelas deverá sempre ser igual ao total gerado'); setShowToast(true)
      return false;
    }
    if (SelectedCompany?.id == 4 && TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(props.getTitulosDeSinal.totalEsperado)) != TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(props.getTitulosDeSinal.titulos.reduce((Acumulado, Atual) => Acumulado + Atual.valorTotal, 0) ?? 0))) {
      setMessage1(`O valor esperado para o sinal é diferente do total gerado`); setMessage2('O principal gerado de parelas deverá sempre ser igual ao total gerado'); setShowToast(true)
      return false;
    }
    if (SelectedCompany?.id == 4 && TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(props.getTitulosDeSaldo.totalEsperado)) != TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(props.getTitulosDeSaldo.titulos.reduce((Acumulado, Atual) => Acumulado + Atual.valorTotal, 0) ?? 0))) {
      setMessage1(`O valor esperado para o saldo é diferente do total gerado`); setMessage2('O principal gerado de parelas deverá sempre ser igual ao total gerado'); setShowToast(true)
      return false;
    }
    if (props.getComissionControl.comissionados.find(Item => !Item.pessoa)) {
      setMessage1(`Nem todos os cargos foram definidos`); setMessage2('Se não selecionou a sala de vendas, selecione e em seguida clique no botão ao lado para consultar a estrutura de comissão'); setShowToast(true)
      return false;
    }
    if (props.getComissionControl.comissionados.length == 0) {
    setMessage1(`Estrutura de comissão não consultada`); setMessage2('Se não selecionou a sala de vendas, selecione e em seguida clique no botão ao lado para consultar a estrutura de comissão'); setShowToast(true)
      return false;
    }
    if (!props.getSelectedPurchasePurpose) {
      setMessage1(`Informe a finalidade da compra`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
      return false;
    }
    if (!props.getSelectedProposalDate) {
      setMessage1(`Informe a data da proposta`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
      return false;
    }
    return true
  }

  async function RegisterLeads(): Promise<Array<Object_.Lead> | undefined> {
    setLoading(true);
    let Leads = [] as Array<Object_.Lead>;
    for (let i = 0; i < props.getProspectsList.length; i++) {
      let Prospect = props.getProspectsList[i];
      let ObjectLead = {
        id: props.getProspectsList[i].id,
        cpf: Prospect.cpf,
        nome: Prospect.nome,
        dataDeNascimento: Prospect.dataDeNascimento,
        idade: Prospect.idade,
        naturalidade: Prospect.naturalidade,
        nacionalidade: Prospect.nacionalidade,
        emails: Prospect!?.emails,
        rg: Prospect.rg,
        cnh: Prospect.cnh,
        filiacao01: Prospect.filiacao01,
        filiacao02: Prospect.filiacao02,
        estadoCivil: Prospect.estadoCivil,
        certidaoDeCasamento: Prospect.certidaoDeCasamento,
        regimeDeCasamento: Prospect.regimeDeCasamento,
        ocupacao: Prospect.ocupacao,
        renda: Prospect.renda,
        dependentes: Prospect.dependentes,
        endereco: Prospect.endereco,
        telefones: Prospect.telefones,
        localDeCaptacao: props.getSelectedCaptureLocation,
        status: Prospect.status,
        alturadoItem: Prospect.alturadoItem,
        historicoDoFunil: Prospect.historicoDoFunil,
        atividades: Prospect.atividades,
        anotacoes: Prospect.anotacoes,
        emailsEnviados: Prospect.emailsEnviados,
        tarefas: Prospect.tarefas,
        formularios: Prospect.formularios,
        brindesOfertados: Prospect.brindesOfertados,
        historicoDoControleDeSala: Prospect.historicoDoControleDeSala,
        emSala: Prospect.emSala,
        keyField: Prospect.keyField,
        pjVinculado: Prospect.pjVinculado,
        documentoPessoal: Prospect.documentoPessoal,
        documentoEndereco: Prospect.documentoEndereco,
        documentoDeEstadoCivil: Prospect.documentoDeEstadoCivil,
      } as any /*Object_.Lead*/;
      
      console.log('LEAD ',JSON.stringify(ObjectLead));

      var Response = props.getProspectsList[i].id > 0 ? await Controllers.Lead.Put(DataLogin?.token, SelectedCompany?.id ?? 0, ObjectLead)
      : await Controllers.Lead.Post(DataLogin?.token, SelectedCompany?.id ?? 0, undefined, undefined, ObjectLead);
      if (Math.floor(Response.status / 100) == 2) {
        ObjectLead.id = Response.data.id;
        Leads.push(ObjectLead);
      } else {
        setLoading(false);
        console.log(Response)
        setMessage1("Erro!"); setMessage2("Falha ao cadastrar o(s) lead(s)!\nEntre em contato com a equipe de desenvolvimento!"); setShowToast(true)
        return undefined
      }
    }
    setMessage1("Sucesso!"); setMessage2("Lead(s) Cadastrado(s)\nCadastrando Prospect..."); setShowToast(true)
    console.log('passou Lead');
    return Leads;
  }

  async function RegisterProspect(Leads: Array<Object_.Lead>): Promise<Array<Object_.Prospect> | undefined>  {
    let Prospects = [] as Array<Object_.Prospect>;
        for (let i = 0; i < Leads.length; i++) {
          let Lead = Leads[i];
          let Response = await Controllers.Prospect.Post(DataLogin?.token, SelectedCompany?.id ?? 0, Lead, false);
          if (Math.floor(Response.status / 100) == 2) {
              Prospects.push({
                id: Lead.id,
                cpf: Lead.cpf,
                nome: Lead.nome,
                dataDeNascimento: Lead.dataDeNascimento,
                idade: Lead.idade,
                naturalidade: Lead.naturalidade,
                nacionalidade: Lead.nacionalidade,
                emails: Lead.emails,
                rg: Lead.rg,
                cnh: Lead.cnh,
                filiacao01: Lead.filiacao01,
                filiacao02: Lead.filiacao02,
                estadoCivil: Lead.estadoCivil,
                certidaoDeCasamento: Lead.certidaoDeCasamento,
                regimeDeCasamento: Lead.regimeDeCasamento,
                ocupacao: Lead.ocupacao,
                renda: Lead.renda,
                dependentes: Lead.dependentes,
                endereco: Lead.endereco,
                telefones: Lead.telefones,
                Lead: props.getSelectedCaptureLocation,
                status: Lead.status,
                historicoDoFunil: Lead.historicoDoFunil,
                atividades: Lead.atividades,
                anotacoes: Lead.anotacoes,
                emailsEnviados: Lead.emailsEnviados,
                tarefas: Lead.tarefas,
                formularios: Lead.formularios,
                brindesOfertados: Lead.brindesOfertados,
                historicoDoControleDeSala: Lead.historicoDoControleDeSala,
                emSala: Lead.emSala,
                keyField: Lead.keyField,
                pjVinculado: Lead.pjVinculado,
                documentoPessoal: Lead.documentoPessoal,
                documentoEndereco: Lead.documentoEndereco,
                documentoDeEstadoCivil: Lead.documentoDeEstadoCivil,
              } as any) // Object_.Prospect);
          } else {
            setLoading(false);
            setMessage1("Erro!"); setMessage2("Falha ao converter lead em prospect\nEntre em contato com a equipe de desenvolvimento!"); setShowToast(true)
            return undefined;
          }
        }
        setMessage1("Sucesso!"); setMessage2("Prospect(s) Cadastrado(s)\nCadastrando a proposta de venda..."); setShowToast(true)
        console.log('passou Prospect');
    return Prospects
  }

  async function RegisterSaleProposal(Prospects: Array<Object_.Prospect>): Promise<Object_.PropostaDeVenda | undefined>  {
    let Identificadores = (await Controllers.Identificador.Get(DataLogin?.token, SelectedCompany?.id ?? 0, '0, 1, 2, 3, 4, 5, 6, 7, 8, 9', false, props.getObjectIdentificador?.empresaId, props.getObjectIdentificador?.centroDeCustoSigla, props.getObjectIdentificador?.localId, props.getObjectIdentificador?.subLocalId, false, false, undefined, undefined, undefined, undefined)).data as Array<Object_.Identificador>;
    let ObjetoTabelaDeVenda = props.getSalesTableOriginal ?? ({} as Object_.TabelaDeVenda);
    ObjetoTabelaDeVenda.modeloDeVenda.modeloDeVendaExterno = props.getSelectedSalesModel;
    let titulosConsolidados = [] as Array<Object_.Titulo>;
    let titulos = [] as Array<Object_.Titulo>;
    
    props.getTitulosDeIntermediacao.titulos.forEach((Item, Index) => {
      for (let i = 0; i < Item.quantidade; i++) {
        titulos.push({
          classificacao: {
            id: 1,
            descricao: "Intermediação"
          },
          numero: !titulos.sort((a, b) => b.numero - a.numero).filter((_Item) => _Item.classificacao.id == 1)[0] ? 1 : (titulos.sort((a, b) => b.numero - a.numero).filter((_Item) => _Item.classificacao.id == 1)[0].numero + 1),
          numeroDeGeracao: titulos.length + 1,
          dataDeVencimento: dayjs(new Date(Item.vencimento), undefined, true).add(ObjetoTabelaDeVenda?.modeloDeVenda.descricao.toUpperCase().includes("Semestral".toUpperCase()) ? (i * 6) : i, ObjetoTabelaDeVenda?.modeloDeVenda.descricao.toUpperCase().includes("Anual".toUpperCase()) ? "years" : 'months').toDate(),
          grupo: Index,
          principal: TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(Item.valor)),
          juros: 0,
          correcao: 0,
          multa: 0,
          jurosPorAtraso: 0,
          correcaoPorAtraso: 0,
          acrescimoAvulso: 0,
          descontoAvulso: 0,
          descontoDeAntecipacao: 0,
          descontoDePontualidade: 0,
          formaDePagamento: Item.meioDePagamento,
          banco: Item.banco?.key,
          agencia: Item.agencia,
          conta: Item.conta,
          digitoDaConta: Item.digitoDaConta,
          titular: Item.titular,
          numeroCheque: Item.numeroCheque,
          maquina: Item.maquina,
          bandeira: Item.bandeira,
          digitoCartao: Item.digitoCartao,
          operacao: Item.operacao,
          nsu: Item.nsu,
          numeroDaOperacao: Item.numeroDaOperacao
        } as Object_.Titulo);
      }
    });
    props.getTitulosDeEntrada.titulos.sort((a, b) => b.valor - a.valor).sort((a, b) => dayjs(a.vencimento).add(a.quantidade - 1, 'months').toDate().getTime() - dayjs(b.vencimento).add(b.quantidade - 1, 'months').toDate().getTime()).forEach((Item, Index) => {
      for (let i = 0; i < Item.quantidade; i++) {
        let Principal = TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(Item.valor));
        if (props.getAjustarSaldoAoValorAVista == true && Item.teveAjuste && !!Item.valorUltimaParcela && Item.quantidade - 1 == i) {
          Principal = Item.valorUltimaParcela
        }
        titulos.push({
          classificacao: ObjetoTabelaDeVenda?.classificacoesDosTitulosDaTabelaDeVenda.find(Item => Item.classificacao.id == 3)?.classificacao,
          numero: !titulos.sort((a, b) => b.numero - a.numero).filter((_Item) => _Item.classificacao.id == 3)[0] ? 1 : (titulos.sort((a, b) => b.numero - a.numero).filter((_Item) => _Item.classificacao.id == 3)[0].numero + 1),
          numeroDeGeracao: titulos.filter(Item => Item.classificacao.id != 1).length + 1,
          dataDeVencimento: dayjs(new Date(Item.vencimento), undefined, true).add(ObjetoTabelaDeVenda?.modeloDeVenda.descricao.toUpperCase().includes("Semestral".toUpperCase()) ? (i * 6) : i, ObjetoTabelaDeVenda?.modeloDeVenda.descricao.toUpperCase().includes("Anual".toUpperCase()) ? "years" : 'months').toDate(),
          grupo: Index,
          principal: Principal,
          juros: 0,
          correcao: 0,
          multa: 0,
          jurosPorAtraso: 0,
          correcaoPorAtraso: 0,
          acrescimoAvulso: 0,
          descontoAvulso: 0,
          descontoDeAntecipacao: 0,
          descontoDePontualidade: 0,
          formaDePagamento: Item.meioDePagamento,
          banco: Item.banco?.key,
          agencia: Item.agencia,
          conta: Item.conta,
          digitoDaConta: Item.digitoDaConta,
          titular: Item.titular,
          numeroCheque: Item.numeroCheque,
          maquina: Item.maquina,
          bandeira: Item.bandeira,
          digitoCartao: Item.digitoCartao,
          operacao: Item.operacao,
          nsu: Item.nsu,
          numeroDaOperacao: Item.numeroDaOperacao
        } as Object_.Titulo);
      }
    });
    props.getTitulosDeSinal.titulos.sort((a, b) => b.valor - a.valor).sort((a, b) => dayjs(a.vencimento).add(a.quantidade - 1, 'months').toDate().getTime() - dayjs(b.vencimento).add(b.quantidade - 1, 'months').toDate().getTime()).forEach((Item, Index) => {
      for (let i = 0; i < Item.quantidade; i++) {
        let Principal = TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(Item.valor));
        if (props.getAjustarSaldoAoValorAVista == true && Item.teveAjuste && !!Item.valorUltimaParcela && Item.quantidade - 1 == i) {
          Principal = Item.valorUltimaParcela
        }
        titulos.push({
          classificacao: ObjetoTabelaDeVenda?.classificacoesDosTitulosDaTabelaDeVenda.find(Item => Item.classificacao.id == 2)?.classificacao,
          numero: !titulos.sort((a, b) => b.numero - a.numero).filter((_Item) => _Item.classificacao.id == 2)[0] ? 1 : (titulos.sort((a, b) => b.numero - a.numero).filter((_Item) => _Item.classificacao.id == 2)[0].numero + 1),
          numeroDeGeracao: titulos.filter(Item => Item.classificacao.id != 1).length + 1,
          dataDeVencimento: dayjs(new Date(Item.vencimento), undefined, true).add(ObjetoTabelaDeVenda?.modeloDeVenda.descricao.toUpperCase().includes("Semestral".toUpperCase()) ? (i * 6) : i, ObjetoTabelaDeVenda?.modeloDeVenda.descricao.toUpperCase().includes("Anual".toUpperCase()) ? "years" : 'months').toDate(),
          grupo: Index,
          principal: Principal,
          juros: 0,
          correcao: 0,
          multa: 0,
          jurosPorAtraso: 0,
          correcaoPorAtraso: 0,
          acrescimoAvulso: 0,
          descontoAvulso: 0,
          descontoDeAntecipacao: 0,
          descontoDePontualidade: 0,
          formaDePagamento: Item.meioDePagamento,
          banco: Item.banco?.key,
          agencia: Item.agencia,
          conta: Item.conta,
          digitoDaConta: Item.digitoDaConta,
          titular: Item.titular,
          numeroCheque: Item.numeroCheque,
          maquina: Item.maquina,
          bandeira: Item.bandeira,
          digitoCartao: Item.digitoCartao,
          operacao: Item.operacao,
          nsu: Item.nsu,
          numeroDaOperacao: Item.numeroDaOperacao
        } as Object_.Titulo);
      }
    });
    props.getTitulosDeSaldo.titulos.sort((a, b) => b.valor - a.valor).sort((a, b) => dayjs(a.vencimento).add(a.quantidade - 1, 'months').toDate().getTime() - dayjs(b.vencimento).add(b.quantidade - 1, 'months').toDate().getTime()).forEach((Item, Index) => {
      for (let i = 0; i < Item.quantidade; i++) {
        let Principal = TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(Item.valor));
        if (props.getAjustarSaldoAoValorAVista == true && Item.teveAjuste && !!Item.valorUltimaParcela && Item.quantidade - 1 == i) {
          Principal = Item.valorUltimaParcela
        }
        titulos.push({
          classificacao: ObjetoTabelaDeVenda?.classificacoesDosTitulosDaTabelaDeVenda.find(Item => Item.classificacao.id == 4)?.classificacao,
          numero: !titulos.sort((a, b) => b.numero - a.numero).filter((_Item) => _Item.classificacao.id == 4)[0] ? 1 : (titulos.sort((a, b) => b.numero - a.numero).filter((_Item) => _Item.classificacao.id == 4)[0].numero + 1),
          numeroDeGeracao: titulos.filter(Item => Item.classificacao.id != 1).length + 1,
          dataDeVencimento: dayjs(new Date(Item.vencimento), undefined, true).add(ObjetoTabelaDeVenda?.modeloDeVenda.descricao.toUpperCase().includes("Semestral".toUpperCase()) ? (i * 6) : i, ObjetoTabelaDeVenda?.modeloDeVenda.descricao.toUpperCase().includes("Anual".toUpperCase()) ? "years" : 'months').toDate(),
          grupo: Index,
          principal: Principal,
          juros: 0,
          correcao: 0,
          multa: 0,
          jurosPorAtraso: 0,
          correcaoPorAtraso: 0,
          acrescimoAvulso: 0,
          descontoAvulso: 0,
          descontoDeAntecipacao: 0,
          descontoDePontualidade: 0,
          formaDePagamento: Item.meioDePagamento,
          banco: Item.banco?.key,
          agencia: Item.agencia,
          conta: Item.conta,
          digitoDaConta: Item.digitoDaConta,
          titular: Item.titular,
          numeroCheque: Item.numeroCheque,
          maquina: Item.maquina,
          bandeira: Item.bandeira,
          digitoCartao: Item.digitoCartao,
          operacao: Item.operacao,
          nsu: Item.nsu,
          numeroDaOperacao: Item.numeroDaOperacao
        } as Object_.Titulo);
      }
    });
    props.getTitulosDeIntermediaria.titulos.sort((a, b) => b.valor - a.valor).sort((a, b) => dayjs(a.vencimento).add(a.quantidade - 1, 'months').toDate().getTime() - dayjs(b.vencimento).add(b.quantidade - 1, 'months').toDate().getTime()).forEach((Item, Index) => {
      for (let i = 0; i < Item.quantidade; i++) {
        let Principal = TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(Item.valor));
        if (props.getAjustarSaldoAoValorAVista == true && Item.teveAjuste && !!Item.valorUltimaParcela && Item.quantidade - 1 == i) {
          Principal = Item.valorUltimaParcela
        }
        titulos.push({
          classificacao: ObjetoTabelaDeVenda?.classificacoesDosTitulosDaTabelaDeVenda.find(Item => Item.classificacao.id == 11)?.classificacao,
          numero: !titulos.sort((a, b) => b.numero - a.numero).filter((_Item) => _Item.classificacao.id == 11)[0] ? 1 : (titulos.sort((a, b) => b.numero - a.numero).filter((_Item) => _Item.classificacao.id == 11)[0].numero + 1),
          numeroDeGeracao: titulos.filter(Item => Item.classificacao.id != 1).length + 1,
          dataDeVencimento: dayjs(new Date(Item.vencimento), undefined, true).add(ObjetoTabelaDeVenda?.modeloDeVenda.descricao.toUpperCase().includes("Semestral".toUpperCase()) ? (i * 6) : i, ObjetoTabelaDeVenda?.modeloDeVenda.descricao.toUpperCase().includes("Anual".toUpperCase()) ? "years" : 'months').toDate(),
          grupo: Index,
          principal: Principal,
          juros: 0,
          correcao: 0,
          multa: 0,
          jurosPorAtraso: 0,
          correcaoPorAtraso: 0,
          acrescimoAvulso: 0,
          descontoAvulso: 0,
          descontoDeAntecipacao: 0,
          descontoDePontualidade: 0,
          formaDePagamento: Item.meioDePagamento,
          banco: Item.banco?.key,
          agencia: Item.agencia,
          conta: Item.conta,
          digitoDaConta: Item.digitoDaConta,
          titular: Item.titular,
          numeroCheque: Item.numeroCheque,
          maquina: Item.maquina,
          bandeira: Item.bandeira,
          digitoCartao: Item.digitoCartao,
          operacao: Item.operacao,
          nsu: Item.nsu,
          numeroDaOperacao: Item.numeroDaOperacao
        } as Object_.Titulo);
      }
    });
    titulos.sort((a, b) => a.dataDeVencimento.getTime() - b.dataDeVencimento.getTime()).forEach((Item, Index) => {
      titulosConsolidados.push({
        ...Item,
        dataDeVencimento: new Date(Item.dataDeVencimento.getFullYear(), Item.dataDeVencimento.getMonth(), Item.dataDeVencimento.getDate()),
        numero: !titulosConsolidados.sort((a, b) => b.numero - a.numero).find((_Item) => _Item.classificacao.id == Item.classificacao.id) ? 1 :
          (titulosConsolidados.sort((a, b) => b.numero - a.numero).find((_Item) => _Item.classificacao.id == Item.classificacao.id && dayjs(_Item.dataDeVencimento).format("MM/YYYY") == dayjs(Item.dataDeVencimento).format("MM/YYYY"))
            ? (titulosConsolidados.sort((a, b) => b.numero - a.numero).filter((_Item) => _Item.classificacao.id == Item.classificacao.id && dayjs(_Item.dataDeVencimento).format("MM/YYYY") == dayjs(Item.dataDeVencimento).format("MM/YYYY"))[0].numero)
            : (titulosConsolidados.sort((a, b) => b.numero - a.numero).filter((_Item) => _Item.classificacao.id == Item.classificacao.id)[0].numero + 1)),
        numeroDeGeracao: (Item.classificacao.id == 1 ? titulosConsolidados.filter(Item => Item.classificacao.id == 1).length : titulosConsolidados.filter(Item => Item.classificacao.id != 1).length) + 1,
      });
    });

    let PropostaDeVenda = {
      contratoCEF: props.getComissionControl.contratoCEF,
      dataCadastro: new Date().toISOString(),
      respCadastroId: DataLogin?.pessoa?.id,
      respCadastroNome: DataLogin?.pessoa?.nome,
      empresa: props.getSelectedCentroDeCusto?.empresa,
      centroDeCusto: props.getSelectedCentroDeCusto,
      numero: 0,
      vendaVinculada: undefined,
      dataDaVenda: props.getSelectedProposalDate ? new Date(props.getSelectedProposalDate.getFullYear(), props.getSelectedProposalDate.getMonth(), props.getSelectedProposalDate.getDate()).toISOString() : new Date().toISOString(),
      finalidadeDaCompra: props.getSelectedPurchasePurpose?.id,
      canalDeDivulgacao: undefined,
      prospects: Prospects,
      modeloDeVenda: ObjetoTabelaDeVenda?.modeloDeVenda,
      identificador: { ...Identificadores[0], valorAVista: TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(Identificadores[0].valorAVista)) },
      taxaDeDesconto: props.getTaxaDeDescontoValorAVista,
      titulosDeCorretagem: [],
      titulosDeIntermediacao: titulosConsolidados.sort((a, b) => a.numero - b.numero).filter(Item => Item.classificacao.id == 1)
        .map((Item) => {
          return {
            id: Item.numero,
            vencimento: Item.dataDeVencimento,
            valor: Item.principal,
            formaDePagamento: Item.formaDePagamento,
            banco: Item.banco,
            agencia: Item.agencia,
            conta: Item.conta,
            digitoDaConta: Item.digitoDaConta,
            titular: Item.titular,
            numeroCheque: Item.numeroCheque,
            maquina: Item.maquina,
            bandeira: Item.bandeira,
            digitoCartao: Item.digitoCartao,
            operacao: Item.operacao,
            nsu: Item.nsu,
            numeroDaOperacao: Item.numeroDaOperacao
          } as Object_.TituloDeEntrada;
        }),
      titulosDeFinanciamento: [],
      titulosDeEntrada: titulosConsolidados.sort((a, b) => a.numero - b.numero).filter(Item => Item.classificacao.id == 3)
        .map((Item) => {
          return {
            id: Item.numero,
            vencimento: Item.dataDeVencimento,
            valor: Item.principal,
            formaDePagamento: Item.formaDePagamento,
            banco: Item.banco,
            agencia: Item.agencia,
            conta: Item.conta,
            digitoDaConta: Item.digitoDaConta,
            titular: Item.titular,
            numeroCheque: Item.numeroCheque,
            maquina: Item.maquina,
            bandeira: Item.bandeira,
            digitoCartao: Item.digitoCartao,
            operacao: Item.operacao,
            nsu: Item.nsu,
            numeroDaOperacao: Item.numeroDaOperacao
          } as Object_.TituloDeEntrada;
        }),
      titulosDeSinal: titulosConsolidados.sort((a, b) => a.numero - b.numero).filter(Item => Item.classificacao.id == 2)
        .map((Item) => {
          return {
            id: Item.numero,
            vencimento: Item.dataDeVencimento,
            valor: Item.principal,
            formaDePagamento: Item.formaDePagamento,
            banco: Item.banco,
            agencia: Item.agencia,
            conta: Item.conta,
            digitoDaConta: Item.digitoDaConta,
            titular: Item.titular,
            numeroCheque: Item.numeroCheque,
            maquina: Item.maquina,
            bandeira: Item.bandeira,
            digitoCartao: Item.digitoCartao,
            operacao: Item.operacao,
            nsu: Item.nsu,
            numeroDaOperacao: Item.numeroDaOperacao
          } as Object_.TituloDeSinal;
        }),
      titulosDeParcela: titulosConsolidados.sort((a, b) => a.numero - b.numero).filter(Item => Item.classificacao.id == 4)
        .map((Item) => {
          return {
            id: Item.numero,
            vencimento: Item.dataDeVencimento,
            valor: Item.principal,
            formaDePagamento: Item.formaDePagamento,
            banco: Item.banco,
            agencia: Item.agencia,
            conta: Item.conta,
            digitoDaConta: Item.digitoDaConta,
            titular: Item.titular,
            numeroCheque: Item.numeroCheque,
            maquina: Item.maquina,
            bandeira: Item.bandeira,
            digitoCartao: Item.digitoCartao,
            operacao: Item.operacao,
            nsu: Item.nsu,
            numeroDaOperacao: Item.numeroDaOperacao
          } as Object_.TituloDeParcela;
        }),
      titulosDeParcelaObra: [],
      titulosDeIntermediaria: titulosConsolidados.sort((a, b) => a.numero - b.numero).filter(Item => Item.classificacao.id == 11)
        .map((Item) => {
          return {
            id: Item.numero,
            vencimento: Item.dataDeVencimento,
            valor: Item.principal,
            formaDePagamento: Item.formaDePagamento,
            banco: Item.banco,
            agencia: Item.agencia,
            conta: Item.conta,
            digitoDaConta: Item.digitoDaConta,
            titular: Item.titular,
            numeroCheque: Item.numeroCheque,
            maquina: Item.maquina,
            bandeira: Item.bandeira,
            digitoCartao: Item.digitoCartao,
            operacao: Item.operacao,
            nsu: Item.nsu,
            numeroDaOperacao: Item.numeroDaOperacao
          } as Object_.TituloDeIntermediaria;
        }),
      titulosConsolidados: titulosConsolidados,
      salaDeVenda: `${props.getComissionControl.salaDeVendas?.cidade ?? ''} - ${props.getComissionControl.salaDeVendas?.uf ?? ''}`,
      salaDeVendaNome: !props.getComissionControl.salaDeVendas?.descricao || props.getComissionControl.salaDeVendas?.descricao == '' ? 'Não informado' : props.getComissionControl.salaDeVendas?.descricao,
      salaDeVendaObjeto: props.getComissionControl.salaDeVendas,
      estruturaDeComissao: props.getComissionControl.comissionados.filter(Item => Item.pessoa && (Item.pessoa.cpf.length == 11 || Item.pessoa.cpf.length == 14))
        .map(Item => {
          return {
            cpf: Item.pessoa?.cpf,
            nome: Item.pessoa?.nome,
            cargo: Item.pessoa?.cargo?.nome,
            pessoa: Item.pessoa,
            valorBase: TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(Item.valorBase ? Item.valorBase : (Identificadores[0].valorAVista * (1 - (props.getTaxaDeDescontoValorAVista ?? 0))))),
            percentual: Item.percentual,
            indireto: Item.indireto,
            sobreRecebimento: Item.sobreRecebimento,
            tipo: Item.tipo,
            valorFinal: TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(Item.valorBase ? Item.valorBase : ((Item.percentual ?? 0) * (Identificadores[0].valorAVista * (1 - (props.getTaxaDeDescontoValorAVista ?? 0)))))),
            pessoas: [],
            parcelamento: Item.parcelamento,
            salaDeVendas: props.getComissionControl.salaDeVendas,
            regraGeral: Item.regraGeral
          };
        }),
      _VendaGerada: undefined,
      _VendaCancelada: undefined,
      _ContratoImpresso: undefined
    } as Object_.PropostaDeVenda;

    console.log('VENDA' ,JSON.stringify(PropostaDeVenda));

    let Response = await Controllers.Venda.Post(DataLogin?.token, SelectedCompany?.id, PropostaDeVenda);
    if (Math.floor(Response.status / 100) == 2) {
      PropostaDeVenda.numero = Response.data.numero;
      PropostaDeVenda.vendaVinculada = Response.data.vendaVinculada;
      PropostaDeVenda._VendaGerada = true;
      setLoading(false);
      setMessage1("Sucesso"); setMessage2("Proposta de venda cadastrada e enviada!"); setShowToast(true);
      console.log('passou VENDA');
      return PropostaDeVenda;
    } else {
      setMessage1("Erro"); setMessage2("Falha ao enviar a proposta de venda\nEntre em contato com a equipe de desenvolvimento!!"); setShowToast(true);
      return undefined;
    }
  }

  function Toast() {
    setShowToast(false)
  }
  //#region UseEffect
  useEffect(() => {
    CaptureLocation();
    PurchasePurpose();
  }, []);
  //#endregion

  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <Styled.Container>
          <View style={{top: 40}}>
            <ToastMessage
              showToast={getShowToast}
              hideToast={setShowToast}
              function={Toast}
              message1={getMessage1}
              message2={getMessage2}
            />
          </View>
          <Styled.ContainerHeader style={{marginTop: Platform.OS === 'ios' ? '15%' : '5%'}}>
            <Styled.Number activeOpacity={0.9} onPress={() => {
              props.setVisibleAdditionalInformation(false);
              props.setVisibleComplementaryDocumentation(true);
            }}>
              <Styled.TextNumber>7</Styled.TextNumber>
            </Styled.Number>
            <Styled.TextHeader>Informações complementares</Styled.TextHeader>
            <TouchableOpacity onPress={props.goHome}>
              <SvgCss xml={Home} />
            </TouchableOpacity>
          </Styled.ContainerHeader>
          <Styled.SubContainer>
            <TouchInput
              key='collection location'
              onPress={() => {setVisibleCaptureLocation(true)}}
              colorWithNothingSelected={blurredColor}
              colorOptionalInput={blurredColor}
              selectedInput={props.getSelectedCaptureLocation?.descricao} titleInput='Local de Captação'
            />
            <TouchInput
              key='purpose of purchase'
              onPress={() => {setVisiblePurchasePurpose(true)}}
              selectedInput={props.getSelectedPurchasePurpose?.descricao} titleInput='Finalidade da Compra'
            />
            <TouchInput
              key='proposal date'
              onPress={() => {setOpen(true)}}
              selectedInput={moment(props.getSelectedProposalDate).format("DD/MM/YYYY")} titleInput='Data da Proposta'
            />
            {/*MODALS*/}
            <>
              <Modals.MultipleSelections
                marginLeft='15%'
                data={props.getCaptureLocation}
                title="Local de Captação"
                visible={getVisibleCaptureLocation}
                onPressClose={() => {setVisibleCaptureLocation(false)}}
                renderItem={({item}) => (
                  <Styled.ItemContainer onPress={() => {
                    props.setSelectedCaptureLocation(item)
                    setVisibleCaptureLocation(false)
                  }}>
                    <Styled.Item>
                      <Styled.TextItem>{item?.descricao}</Styled.TextItem>
                    </Styled.Item>
                  </Styled.ItemContainer>
                )}
              />
              <Modals.MultipleSelections
                marginLeft='13%'
                data={props.getPurchasePurpose}
                title="Finalidade da Compra"
                visible={getVisiblePurchasePurpose}
                onPressClose={() => {setVisiblePurchasePurpose(false)}}
                renderItem={({item}: any) => (
                  <Styled.ItemContainer onPress={() => {
                    props.setSelectedPurchasePurpose(item)
                    setVisiblePurchasePurpose(false)
                  }}>
                    <Styled.Item>
                      <Styled.TextItem>{item?.descricao}</Styled.TextItem>
                    </Styled.Item>
                  </Styled.ItemContainer>
                )}
              />
              <DatePicker
                modal
                mode='date'
                open={getOpen}
                maximumDate={props.getSelectedProposalDate}
                date={props.getSelectedProposalDate ? props.getSelectedProposalDate : new Date()}
                onConfirm={(date) => {
                  props.setSelectedProposalDate(date)
                  setOpen(false)
                }}
                onCancel={() => {
                  setOpen(false)
                }}
              />
            </>
          </Styled.SubContainer>
          <Styled.ContainerButton>
            <Styled.Submit 
              onPress={ async () => {
                if((await ValidatingData()) == true) {
                  let Leads = await RegisterLeads();
                  if (Leads && Leads.length > 0) {
                    let Prospects = await RegisterProspect(Leads);
                    if (Prospects && Prospects.length > 0) {
                      await RegisterSaleProposal(Prospects);
                      // if(SaleProposal) {
                      //   Files(SaleProposal)
                      // }
                    }
                  }
                }
              }}
              activeOpacity={0.9}>
                <Styled.TextSubmit>Enviar Proposta</Styled.TextSubmit>
              </Styled.Submit>
          </Styled.ContainerButton>
          <Modals.ModalLoading
            transparent={true}
            visible={getLoading}
          />
        </Styled.Container>
      </LinearGradient>
    </Modal>
  );
};
