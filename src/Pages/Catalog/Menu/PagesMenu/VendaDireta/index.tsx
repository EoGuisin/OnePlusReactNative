//#region React
import React, { useState, useRef, useEffect} from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import dayjs from 'dayjs'
//#endregion

//#region Styled
import * as TextFormat from '../../../../../Themes/TextFormat';
import * as Styled from './styles';
import * as Modals from '../../../../Modals'
import { ToastMessage } from '../../../../../Components';
//#endregion

//#region ViewModel
import viewModel from './ViewModel';
//#endregion

//#region Services
import * as Controllers from '../../../../../Services/Controllers';
import { Type } from '../../../../Modals/PaymentPlan/Modals/viewModel';
import { Object_ } from '../../../../../Services/Objects';
//#endregion

//#region Redux
import { useSelector } from 'react-redux';
//#endregion

//#region Images
import { ArrowBack } from '../../../../../Assets';
import { SvgCss } from 'react-native-svg';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
//#endregion
export interface Comission {
  salaDeVendas: Object_.SalaDeVenda | undefined;
  comissionados: Array<Object_.Comissionado>;
  contratoCEF: string | undefined;
}

export function ScreenVendaDireta(viewModel: viewModel) {
  //#region Variables
  const scrollRef = useRef<any>();
  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);
  //#endregion

  
  const [getShowToast, setShowToast] = useState<boolean>(false);
  const [getMessage1, setMessage1] = useState<string>("");
  const [getMessage2, setMessage2] = useState<string>("");
  const [getLoading, setLoading] = useState<boolean>(false);

  const [getDocumentosDoContrato, setDocumentosDoContrato] = useState<Object_.Anexo[]>();
  const [getProposta, setProposta] = useState<Object_.PropostaDeVenda>();

  //#region Visibles boolean
  const [getVisibleChecklistRegistration, setVisibleChecklistRegistration] = useState<boolean>(false);
  const [getVisibleProponent, setVisibleProponent] = useState<boolean>(false);
  const [getVisibleProductData, setVisibleProductData] = useState<boolean>(false);
  const [getVisibleCommissionControl, setVisibleCommissionControl] = useState<boolean>(false);
  const [getVisiblePaymentPlan, setVisiblePaymentPlan] = useState<boolean>(false);
  const [getVisibleNegotiationCard, setVisibleNegotiationCard] = useState<boolean>(false);
  const [getVisibleComplementaryDocumentation, setVisibleComplementaryDocumentation] = useState<boolean>(false);
  const [getVisibleAdditionalInformation, setVisibleAdditionalInformation] = useState<boolean>(false);
  const [getVisibleContractDocuments, setVisibleContractDocuments] = useState<boolean>(false);
  const [getDoneSale, setDoneSale] = useState<boolean>(false);
  //#endregion

  //#region Checklist Registration
  const [getDocumentChecklist, setDocumentChecklist] = useState<string>("");
  const [getPDForImageChecklist, setPDForImageChecklist] = useState<number>();
  //#endregion

  //#region Proponent
  const [getCellPhone, setCellPhone] = useState<Object_.Telefone | undefined>();
  const [getComercialPhone, setComercialPhone] = useState<Object_.Telefone | undefined>();
  const [getCellPhoneSpouse, setCellPhoneSpouse] = useState<Object_.Telefone | undefined>();
  const [getComercialPhoneSpouse, setComercialPhoneSpouse] = useState<Object_.Telefone | undefined>();
  const [getProspectsList, setProspectsList] = useState<Array<Object_.Prospect>>([{nacionalidade: {id: 195, descricao: "Brasil", nacionalidade: "brasileiro(a)", masculino: "brasileiro", feminino: "brasileira"}} as Object_.Prospect]);
  const [getDependentsList, setDependentsList] = useState<Array<Object_.Dependente>>([{} as Object_.Dependente]);
  const [getIndexProspects, setIndexProspects] = useState<number>(0);
  //#endregion

  //#region ProductData
  const [getTaxaDeDescontoValorAVista, setTaxaDeDescontoValorAVista] = useState<number | undefined>();
  const [getSelectedSalesModel, setSelectedSalesModel] = useState<string>();
  const [getSalesTableOriginal, setSalesTableOriginal] = useState<Object_.TabelaDeVenda | undefined>();
  const [getSelectedCentroDeCusto, setSelectedCentroDeCusto] = useState<Object_.CentroDeCusto | undefined>();
  const [getSelectedUnity, setSelectedUnity] = useState<Object_.IdentificadorSintetico | undefined>();
  const [getIdentificador, setIdentificador] = useState<Array<Object_.Identificador> | undefined>(undefined);
  const [getCentroDeCusto, setCentroDeCusto] = useState<Array<Object_.CentroDeCusto> | undefined>(undefined);
  const [getSelectedPaymentMethod, setSelectedPaymentMethod] = useState<Object_.MeioDePagamento | undefined>();
  const [getObject_Identificador, setObject_Identificador] = useState<Object_.IdentificadorSintetico | undefined>(undefined);
  //#endregion

  //#region Payment Plan
  const [getModelosDeVenda, setModelosDeVenda] = useState<string[]>([]);
  const [getTitulosDeIntermediacao, setTitulosDeIntermediacao] = useState<Type.ViewModel>({ ajustarSaldoAoValorAVista: true, valorAVista: 0, percentualDoTotal: 0, exibirComponente: false, totalEsperado: 0, titulo: 'Intermediação', pv: undefined, jurosDeTabela: undefined, anexo: undefined, menorVencimento: new Date(), maiorVencimento: new Date(`12/31/${new Date().getFullYear() + 100}`), menorQuantidade: undefined, maiorQuantidade: undefined, titulos: [] });
  const [getTitulosDeIntermediaria, setTitulosDeIntermediaria] = useState<Type.ViewModel>({ ajustarSaldoAoValorAVista: true, valorAVista: 0, percentualDoTotal: 0, exibirComponente: false, totalEsperado: 0, titulo: 'Anual', pv: undefined, jurosDeTabela: undefined, anexo: undefined, menorVencimento: new Date(), maiorVencimento: new Date(`12/31/${new Date().getFullYear() + 100}`), menorQuantidade: undefined, maiorQuantidade: undefined, titulos: [] });
  const [getTitulosDeEntrada, setTitulosDeEntrada] = useState<Type.ViewModel>({ ajustarSaldoAoValorAVista: true, valorAVista: 0, percentualDoTotal: 0, exibirComponente: false, totalEsperado: 0, titulo: 'Entrada', pv: undefined, jurosDeTabela: undefined, anexo: undefined, menorVencimento: new Date(), maiorVencimento: new Date(`12/31/${new Date().getFullYear() + 100}`), menorQuantidade: undefined, maiorQuantidade: undefined, titulos: [] });
  const [getTitulosDeSinal, setTitulosDeSinal] = useState<Type.ViewModel>({ ajustarSaldoAoValorAVista: true, valorAVista: 0, percentualDoTotal: 0, exibirComponente: false, totalEsperado: 0, titulo: 'Sinal', pv: undefined, jurosDeTabela: undefined, anexo: undefined, menorVencimento: new Date(), maiorVencimento: new Date(`12/31/${new Date().getFullYear() + 100}`), menorQuantidade: undefined, maiorQuantidade: undefined, titulos: [] });
  const [getTitulosDeSaldo, setTitulosDeSaldo] = useState<Type.ViewModel>({ ajustarSaldoAoValorAVista: true, valorAVista: 0, percentualDoTotal: 0, exibirComponente: false, totalEsperado: 0, titulo: 'Saldo', pv: undefined, jurosDeTabela: undefined, anexo: undefined, menorVencimento: new Date(), maiorVencimento: new Date(`12/31/${new Date().getFullYear() + 100}`), menorQuantidade: undefined, maiorQuantidade: undefined, titulos: [] });
  const [getValorDescontadoTituloIntermediacao, setValorDescontadoTituloIntermediacao] = useState<number>(0);
  const [getValorDescontadoTituloEntrada, setValorDescontadoTituloEntrada] = useState<number>(0);
  const [getValorDescontadoTituloIntermediaria, setValorDescontadoTituloIntermediaria] = useState<number>(0);
  const [getValorDescontadoTituloSaldo, setValorDescontadoTituloSaldo] = useState<number>(0);
  const [getValorDescontadoTituloSinal, setValorDescontadoTituloSinal] = useState<number>(0);
  const [getAjustarSaldoAoValorAVista, setAjustarSaldoAoValorAVista] = useState<boolean>(SelectedCompany?.id == 4);
  //#endregion
    
  //#region CommissionControl
  const [getCommissioned, setCommissioned] = useState<Array<Object_.Comissionado>>([]);
  const [getCommissionedGAV, setCommissionedGAV] = useState<ComissionedGav[] | undefined>();
  const [getSaleRoom, setSaleRoom] = useState<Object_.SalaDeVenda | undefined>();
  const [getSalesRooms, setSalesRooms] = useState<Array<{ salaDeVendas: Object_.SalaDeVenda, comissionados: Array<Object_.Comissionado> }>>([]);
  const [getControleDeComissao, setControleDeComissao] = useState<Comission>({} as Comission);
  // const [getOrganogramas, setOrganogramas] = useState<Object_.Organograma[]>([]);
  //#endregion

  //#region Files
  const [getDocumentFilesNegotiation, setDocumentFilesNegotiation] = useState<string>("");
  const [getDocumentFilesService, setDocumentFilesService] = useState<string>("");
  const [getPDForImageNegotiation, setPDForImageNegotiation] = useState<number | undefined>();
  const [getPDForImageService, setPDForImageService] = useState<number | undefined>();
  //#endregion

  //#region Documents Complementary
  const [getDocumentComplementary, setDocumentComplementary] = useState<string>("");
  const [getPDForImageDocumentComplementary, setPDForImageDocumentComplementary] = useState<number>();
  //#endregion

  //#region Information Complementary
  const [getCaptureLocation, setCaptureLocation] = useState<Object_.LocalDeCaptacao[]>([]);
  const [getPurchasePurpose, setPurchasePurpose] = useState<Object_.FinalidadesDeCompra[]>([]);
  const [getSelectedProposalDate, setSelectedProposalDate] = useState<Date>(new Date());
  const [getSelectedCaptureLocation, setSelectedCaptureLocation] = useState<Object_.LocalDeCaptacao | undefined>();
  const [getSelectedPurchasePurpose, setSelectedPurchasePurpose] = useState<Object_.FinalidadesDeCompra>();
  //#endregion

  //#region Interface
  interface UF {
    initials: string,
    states: string,
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
  //#endregion

  //#region Functions
  async function ValidatingData(): Promise<boolean> {
    if(getDocumentChecklist && getDocumentChecklist.length <= 0) {
      setMessage1(`O check list de cadastro anexado não é valida, selecione um novo arquivo`); setMessage2('Selecione um novo arquivo'); setShowToast(true)
      return false;
    }
    if(getProspectsList.length == 1 && !getProspectsList[0].cpf || getProspectsList[0].cpf == '') {
      setMessage1(`O proponente não foi preenchido`); setMessage2('O preenchimento do proponente é obrigatório'); setShowToast(true)
      return false;
    }
    if(getProspectsList.some((Item, Index) => {
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
        if(getDependentsList.some((Item, Index) => {
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
    if(!getSelectedCentroDeCusto?.descricao || !getSelectedCentroDeCusto) {
      setMessage1('Informe o empreendimento'); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
      return false
    }
    if(!getSelectedUnity?.subLocalDescricao || !getSelectedUnity) {
      setMessage1('Informe a unidade'); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
      return false
    }
    if(!getSelectedSalesModel) {
      setMessage1('Informe o modelo de venda'); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
      return false
    }
    if ([...getTitulosDeEntrada.titulos.map((Item, Index) => {
      return { index: Index, anexo: getTitulosDeEntrada.anexo, titulo: Item, classificacao: getTitulosDeEntrada.titulo }
    }), ...getTitulosDeSinal.titulos.map((Item, Index) => {
      return { index: Index, anexo: getTitulosDeSinal.anexo, titulo: Item, classificacao: getTitulosDeSinal.titulo }
    }), ...getTitulosDeIntermediaria.titulos.map((Item, Index) => {
      return { index: Index, anexo: getTitulosDeIntermediaria.anexo, titulo: Item, classificacao: getTitulosDeIntermediaria.titulo }
    }), ...getTitulosDeSaldo.titulos.map((Item, Index) => {
      return { index: Index, anexo: getTitulosDeSaldo.anexo, titulo: Item, classificacao: getTitulosDeSaldo.titulo }
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
    if (SelectedCompany?.id == 4 && TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(getTitulosDeEntrada.totalEsperado)) != TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(getTitulosDeEntrada.titulos.reduce((Acumulado, Atual) => Acumulado + Atual.valorTotal, 0) ?? 0))) {
      setMessage1(`O valor esperado para a entrada é diferente do total gerado`); setMessage2('O principal gerado de parelas deverá sempre ser igual ao total gerado'); setShowToast(true)
      return false;
    }
    if (SelectedCompany?.id == 4 && TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(getTitulosDeSinal.totalEsperado)) != TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(getTitulosDeSinal.titulos.reduce((Acumulado, Atual) => Acumulado + Atual.valorTotal, 0) ?? 0))) {
      setMessage1(`O valor esperado para o sinal é diferente do total gerado`); setMessage2('O principal gerado de parelas deverá sempre ser igual ao total gerado'); setShowToast(true)
      return false;
    }
    if (SelectedCompany?.id == 4 && TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(getTitulosDeSaldo.totalEsperado)) != TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(getTitulosDeSaldo.titulos.reduce((Acumulado, Atual) => Acumulado + Atual.valorTotal, 0) ?? 0))) {
      setMessage1(`O valor esperado para o saldo é diferente do total gerado`); setMessage2('O principal gerado de parelas deverá sempre ser igual ao total gerado'); setShowToast(true)
      return false;
    }
    if (getControleDeComissao.salaDeVendas == undefined) {
      setMessage1(`Estrtutura de comissão não consultada`); setMessage2('Se não selecionou a sala de vendas, selecione para consultar a estrutura de comissãoo'); setShowToast(true)
      return false;
    }
    if (getControleDeComissao && getControleDeComissao.comissionados.find(Item => !Item.pessoa)) {
      setMessage1(`Nem todos os cargos foram definidos`); setMessage2('Se não selecionou a sala de vendas, selecione para consultar a estrutura de comissãoo'); setShowToast(true)
      return false;
    }
    if (!getSelectedPurchasePurpose) {
      setMessage1(`Informe a finalidade da compra`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
      return false;
    }
    if (!getSelectedProposalDate) {
      setMessage1(`Informe a data da proposta`); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
      return false;
    }
    return true
  }

  async function RegisterLeads(): Promise<Array<Object_.Lead> | undefined> {
    setLoading(true);
    let Leads = [] as Array<Object_.Lead>;
    for (let i = 0; i < getProspectsList.length; i++) {
      let Prospect = getProspectsList[i];
      let ObjectLead = {
        id: getProspectsList[i].id,
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
        localDeCaptacao: getSelectedCaptureLocation,
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

      var Response = getProspectsList[i].id > 0 ? await Controllers.Lead.Put(DataLogin?.token, SelectedCompany?.id ?? 0, ObjectLead)
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
                Lead: getSelectedCaptureLocation,
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
    let Identificadores = (await Controllers.Identificador.Get(DataLogin?.token, SelectedCompany?.id ?? 0, '0, 1, 2, 3, 4, 5, 6, 7, 8, 9', false, getObject_Identificador?.empresaId, getObject_Identificador?.centroDeCustoSigla, getObject_Identificador?.localId, getObject_Identificador?.subLocalId, false, false, undefined, undefined, undefined, undefined)).data as Array<Object_.Identificador>;
    let ObjetoTabelaDeVenda = getSalesTableOriginal ?? ({} as Object_.TabelaDeVenda);
    ObjetoTabelaDeVenda.modeloDeVenda.modeloDeVendaExterno = getSelectedSalesModel;
    let titulosConsolidados = [] as Array<Object_.Titulo>;
    let titulos = [] as Array<Object_.Titulo>;
    
    getTitulosDeIntermediacao.titulos.forEach((Item, Index) => {
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
    getTitulosDeEntrada.titulos.sort((a, b) => b.valor - a.valor).sort((a, b) => dayjs(a.vencimento).add(a.quantidade - 1, 'months').toDate().getTime() - dayjs(b.vencimento).add(b.quantidade - 1, 'months').toDate().getTime()).forEach((Item, Index) => {
      for (let i = 0; i < Item.quantidade; i++) {
        let Principal = TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(Item.valor));
        if (getAjustarSaldoAoValorAVista == true && Item.teveAjuste && !!Item.valorUltimaParcela && Item.quantidade - 1 == i) {
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
    getTitulosDeSinal.titulos.sort((a, b) => b.valor - a.valor).sort((a, b) => dayjs(a.vencimento).add(a.quantidade - 1, 'months').toDate().getTime() - dayjs(b.vencimento).add(b.quantidade - 1, 'months').toDate().getTime()).forEach((Item, Index) => {
      for (let i = 0; i < Item.quantidade; i++) {
        let Principal = TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(Item.valor));
        if (getAjustarSaldoAoValorAVista == true && Item.teveAjuste && !!Item.valorUltimaParcela && Item.quantidade - 1 == i) {
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
    getTitulosDeSaldo.titulos.sort((a, b) => b.valor - a.valor).sort((a, b) => dayjs(a.vencimento).add(a.quantidade - 1, 'months').toDate().getTime() - dayjs(b.vencimento).add(b.quantidade - 1, 'months').toDate().getTime()).forEach((Item, Index) => {
      for (let i = 0; i < Item.quantidade; i++) {
        let Principal = TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(Item.valor));
        if (getAjustarSaldoAoValorAVista == true && Item.teveAjuste && !!Item.valorUltimaParcela && Item.quantidade - 1 == i) {
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
    getTitulosDeIntermediaria.titulos.sort((a, b) => b.valor - a.valor).sort((a, b) => dayjs(a.vencimento).add(a.quantidade - 1, 'months').toDate().getTime() - dayjs(b.vencimento).add(b.quantidade - 1, 'months').toDate().getTime()).forEach((Item, Index) => {
      for (let i = 0; i < Item.quantidade; i++) {
        let Principal = TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(Item.valor));
        if (getAjustarSaldoAoValorAVista == true && Item.teveAjuste && !!Item.valorUltimaParcela && Item.quantidade - 1 == i) {
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
      contratoCEF: getControleDeComissao.contratoCEF,
      dataCadastro: new Date().toISOString(),
      respCadastroId: DataLogin?.pessoa?.id,
      respCadastroNome: DataLogin?.pessoa?.nome,
      empresa: getSelectedCentroDeCusto?.empresa,
      centroDeCusto: getSelectedCentroDeCusto,
      numero: 0,
      vendaVinculada: undefined,
      dataDaVenda: getSelectedProposalDate ? new Date(getSelectedProposalDate.getFullYear(), getSelectedProposalDate.getMonth(), getSelectedProposalDate.getDate()).toISOString() : new Date().toISOString(),
      finalidadeDaCompra: getSelectedPurchasePurpose?.id,
      canalDeDivulgacao: undefined,
      prospects: Prospects,
      modeloDeVenda: ObjetoTabelaDeVenda?.modeloDeVenda,
      identificador: { ...Identificadores[0], valorAVista: TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(Identificadores[0].valorAVista)) },
      taxaDeDesconto: getTaxaDeDescontoValorAVista,
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
      salaDeVenda: `${getControleDeComissao.salaDeVendas?.cidade ?? ''} - ${getControleDeComissao.salaDeVendas?.uf ?? ''}`,
      salaDeVendaNome: !getControleDeComissao.salaDeVendas?.descricao || getControleDeComissao.salaDeVendas?.descricao == '' ? 'Não informado' : getControleDeComissao.salaDeVendas?.descricao,
      salaDeVendaObjeto: getControleDeComissao.salaDeVendas,
      estruturaDeComissao: getControleDeComissao.comissionados.filter(Item => Item.pessoa && (Item.pessoa.cpf.length == 11 || Item.pessoa.cpf.length == 14))
        .map(Item => {
          return {
            cpf: Item.pessoa?.cpf,
            nome: Item.pessoa?.nome,
            cargo: Item.pessoa?.cargo?.nome,
            pessoa: Item.pessoa,
            valorBase: TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(Item.valorBase ? Item.valorBase : (Identificadores[0].valorAVista * (1 - (getTaxaDeDescontoValorAVista ?? 0))))),
            percentual: Item.percentual,
            indireto: Item.indireto,
            sobreRecebimento: Item.sobreRecebimento,
            tipo: Item.tipo,
            valorFinal: TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(Item.valorBase ? Item.valorBase : ((Item.percentual ?? 0) * (Identificadores[0].valorAVista * (1 - (getTaxaDeDescontoValorAVista ?? 0)))))),
            pessoas: [],
            parcelamento: Item.parcelamento,
            salaDeVendas: getControleDeComissao.salaDeVendas,
            regraGeral: Item.regraGeral
          };
        }),
      _VendaGerada: undefined,
      _VendaCancelada: undefined,
      _ContratoImpresso: undefined
    } as Object_.PropostaDeVenda;

    console.log('VENDA' ,JSON.stringify(PropostaDeVenda));
    console.log(DataLogin?.token, SelectedCompany?.id);
    
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
      setLoading(false);
      setMessage1("Erro"); setMessage2("Falha ao enviar a proposta de venda\nEntre em contato com a equipe de desenvolvimento!!"); setShowToast(true);
      return undefined;
    }
  }

  function NewPurpose() {
    setModelosDeVenda([]);
    setProspectsList([]);
    setDependentsList([])
    setSelectedUnity(undefined);
    setTitulosDeEntrada({
      ajustarSaldoAoValorAVista: getAjustarSaldoAoValorAVista,
      valorAVista: getTitulosDeEntrada.valorAVista,
      percentualDoTotal: getTitulosDeEntrada.percentualDoTotal,
      exibirComponente: false,
      totalEsperado: 0,
      titulo: 'Entrada',
      pv: undefined,
      jurosDeTabela: undefined,
      anexo: undefined,
      menorVencimento: new Date(),
      maiorVencimento: new Date(`12/31/${new Date().getFullYear() + 100}`),
      menorQuantidade: undefined,
      maiorQuantidade: undefined,
      titulos: []
    });
    setTitulosDeSinal({
      ajustarSaldoAoValorAVista: getAjustarSaldoAoValorAVista,
      valorAVista: getTitulosDeSinal.valorAVista,
      percentualDoTotal: getTitulosDeSinal.percentualDoTotal,
      exibirComponente: false,
      totalEsperado: 0,
      titulo: 'Sinal',
      pv: undefined,
      jurosDeTabela: undefined,
      anexo: undefined,
      menorVencimento: new Date(),
      maiorVencimento: new Date(`12/31/${new Date().getFullYear() + 100}`),
      menorQuantidade: undefined,
      maiorQuantidade: undefined,
      titulos: []
    });
    setTitulosDeIntermediaria({
      ajustarSaldoAoValorAVista: getAjustarSaldoAoValorAVista,
      valorAVista: getTitulosDeIntermediaria.valorAVista,
      percentualDoTotal: getTitulosDeIntermediaria.percentualDoTotal,
      exibirComponente: false,
      totalEsperado: 0,
      titulo: getTitulosDeIntermediaria.titulo,
      pv: undefined,
      jurosDeTabela: undefined,
      anexo: undefined,
      menorVencimento: new Date(),
      maiorVencimento: new Date(`12/31/${new Date().getFullYear() + 100}`),
      menorQuantidade: undefined,
      maiorQuantidade: undefined,
      titulos: []
    });
    setTitulosDeSaldo({
      ajustarSaldoAoValorAVista: getAjustarSaldoAoValorAVista,
      valorAVista: getTitulosDeSaldo.valorAVista,
      percentualDoTotal: getTitulosDeSaldo.percentualDoTotal,
      exibirComponente: false,
      totalEsperado: 0,
      titulo: 'Saldo',
      pv: undefined,
      jurosDeTabela: undefined,
      anexo: undefined,
      menorVencimento: new Date(),
      maiorVencimento: new Date(`12/31/${new Date().getFullYear() + 100}`),
      menorQuantidade: undefined,
      maiorQuantidade: undefined,
      titulos: []
    });
    setSelectedCentroDeCusto(undefined);
    setObject_Identificador(undefined);
    setControleDeComissao({
      salaDeVendas: undefined,
      comissionados: [],
      contratoCEF: undefined,
    });
    setComercialPhone(undefined);
    setCellPhoneSpouse(undefined);
    setCellPhone(undefined);
    setComercialPhone(undefined);
    setSaleRoom(undefined);
    setDocumentChecklist("");
    setDocumentComplementary("");
    setDocumentFilesService("");
    setDocumentFilesNegotiation("");
    setPurchasePurpose([]);
    setSelectedProposalDate(new Date());
    setProposta(undefined);
    setDoneSale(false);
    setDocumentosDoContrato([]);
    setMessage1(`Sucesso!`); setMessage2('Formulário limpo para nova proposta!'); setShowToast(true)
  }

  function Toast() {
    setShowToast(false)
  }
  //#endregion

  return (
    <LinearGradient colors={['#26A77C', '#105B74']}>
      <View style={{top: 40}}>
        <ToastMessage
          showToast={getShowToast}
          hideToast={setShowToast}
          function={Toast}
          message1={getMessage1}
          message2={getMessage2}
        />
      </View>
      <Styled.Container>
        <Styled.ContainerHeader style={{marginTop: '15%', opacity: getShowToast ? 0 : 1}}>
          <TouchableOpacity style={{flex: 1, left: 30}} activeOpacity={0.9} onPress={() => { viewModel.navigation.navigate('Menu') }}>
            <SvgCss xml={ArrowBack} />
          </TouchableOpacity>
          <Styled.TextHeader>Venda Direta</Styled.TextHeader>
        </Styled.ContainerHeader>
        <Styled.ItemsContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Styled.Items activeOpacity={0.9} onPress={() => { setVisibleChecklistRegistration(true) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Styled.Number>
                <Styled.TextNumber>1</Styled.TextNumber>
              </Styled.Number>
              <Styled.SubtitleContainer>
                <Styled.TextCardTitle>Checklist de cadastro</Styled.TextCardTitle>
                <Modals.ChecklistRegistration
                  getCaptureLocation={getCaptureLocation}
                  setCaptureLocation={setCaptureLocation}
                  getPurchasePurpose={getPurchasePurpose}
                  setPurchasePurpose={setPurchasePurpose}
                  getAjustarSaldoAoValorAVista={getAjustarSaldoAoValorAVista}
                  setAjustarSaldoAoValorAVista={setAjustarSaldoAoValorAVista}
                  getComissionControl={getControleDeComissao}
                  setComissionControl={setControleDeComissao}
                  getModelosDeVenda={getModelosDeVenda}
                  setModelosDeVenda={setModelosDeVenda}
                  getSalesRooms={getSalesRooms}
                  setSalesRooms={setSalesRooms}
                  goHome={async () => {
                    await setVisibleChecklistRegistration(false);
                  }}
                  getTaxaDeDescontoValorAVista={getTaxaDeDescontoValorAVista}
                  setTaxaDeDescontoValorAVista={setTaxaDeDescontoValorAVista}
                  visible={getVisibleChecklistRegistration}
                  getDocumentChecklist={getDocumentChecklist}
                  setDocumentChecklist={setDocumentChecklist}
                  getPDForImageChecklist={getPDForImageChecklist}
                  setPDForImageChecklist={setPDForImageChecklist}
                  getSaleRoom={getSaleRoom}
                  getCommissioned={getCommissioned}
                  setCommissioned={setCommissioned}
                  scrollRef={scrollRef}
                  setSaleRoom={setSaleRoom}
                  onPress={async () => {
                    setProspectsList([...getProspectsList, {nacionalidade: {id: 195, descricao: "Brasil", nacionalidade: "brasileiro(a)", masculino: "brasileiro", feminino: "brasileira"}} as Object_.Prospect]);
                    setIndexProspects(getIndexProspects + 1);
                    setDependentsList([...getDependentsList, {nacionalidade: {id: 195, descricao: "Brasil", nacionalidade: "brasileiro(a)", masculino: "brasileiro", feminino: "brasileira"}} as Object_.Dependente]);
                    scrollRef.current?.scrollTo({
                      y: 0,
                      animated: true,
                    });
                  }}
                  setVisibleProponent={setVisibleProponent}
                  getVisibleProponent={getVisibleProponent}
                  getIndexProspects={getIndexProspects}
                  setIndexProspects={setIndexProspects}
                  getProspectsList={getProspectsList}
                  setProspectsList={setProspectsList}
                  getDependentsList={getDependentsList}
                  setDependentsList={setDependentsList}
                  onPressBack={() => {
                    if(getIndexProspects === 0) {
                      setVisibleProponent(false)
                    } else {
                      setIndexProspects(getIndexProspects - 1)
                      try {
                        let cellPhone = getProspectsList[getIndexProspects - 1]?.telefones?.find((item: Object_.Telefone) => item.classificacao == 1);
                        setCellPhone({
                          classificacao: 1,
                          ddi: "55",
                          ddd: cellPhone?.ddd,
                          numero: cellPhone?.numero
                        } as Object_.Telefone);
                      } catch {}
                      try {
                        let comercialPhone = getProspectsList[getIndexProspects - 1]?.telefones?.find((item: Object_.Telefone) => item.classificacao == 2);
                        setComercialPhone({
                          classificacao: 2,
                          ddi: "55",
                          ddd: comercialPhone?.ddd,
                          numero: comercialPhone?.numero
                        } as Object_.Telefone); 
                      } catch {}
                    }
                  }}
                  getCellPhone={getCellPhone}
                  setCellPhone={setCellPhone}
                  getComercialPhone={getComercialPhone}
                  setComercialPhone={setComercialPhone}
                  getCellPhoneSpouse={getCellPhoneSpouse}
                  setCellPhoneSpouse={setCellPhoneSpouse}
                  getComercialPhoneSpouse={getComercialPhoneSpouse}
                  setComercialPhoneSpouse={setComercialPhoneSpouse}
                  setSelectedPaymentMethod={setSelectedPaymentMethod}
                  getSelectedPaymentMethod={getSelectedPaymentMethod}
                  getTitulosDeIntermediacao={getTitulosDeIntermediacao}
                  setTitulosDeIntermediacao={setTitulosDeIntermediacao}
                  getTitulosDeEntrada={getTitulosDeEntrada}
                  setTitulosDeEntrada={setTitulosDeEntrada}
                  getTitulosDeSinal={getTitulosDeSinal}
                  setTitulosDeSinal={setTitulosDeSinal}
                  getTitulosDeIntermediaria={getTitulosDeIntermediaria}
                  setTitulosDeIntermediaria={setTitulosDeIntermediaria}
                  getTitulosDeSaldo={getTitulosDeSaldo}
                  setTitulosDeSaldo={setTitulosDeSaldo}
                  getValorDescontadoTituloIntermediacao={getValorDescontadoTituloIntermediacao}
                  setValorDescontadoTituloIntermediacao={setValorDescontadoTituloIntermediacao}
                  getValorDescontadoTituloEntrada={getValorDescontadoTituloEntrada}
                  setValorDescontadoTituloEntrada={setValorDescontadoTituloEntrada}
                  getValorDescontadoTituloIntermediaria={getValorDescontadoTituloIntermediaria}
                  setValorDescontadoTituloIntermediaria={setValorDescontadoTituloIntermediaria}
                  getValorDescontadoTituloSaldo={getValorDescontadoTituloSaldo}
                  setValorDescontadoTituloSaldo={setValorDescontadoTituloSaldo}
                  getValorDescontadoTituloSinal={getValorDescontadoTituloSinal}
                  setValorDescontadoTituloSinal={setValorDescontadoTituloSinal}
                  getObjectIdentificador={getObject_Identificador}
                  setObjectIdentificador={setObject_Identificador}
                  getIdentificador={getIdentificador}
                  setIdentificador={setIdentificador}
                  getCentroDeCusto={getCentroDeCusto}
                  setCentroDeCusto={setCentroDeCusto}
                  getSelectedUnity={getSelectedUnity}
                  setSelectedUnity={setSelectedUnity}
                  getSelectedCentroDeCusto={getSelectedCentroDeCusto}
                  setSelectedCentroDeCusto={setSelectedCentroDeCusto}
                  getSalesTableOriginal={getSalesTableOriginal}
                  setSalesTableOriginal={setSalesTableOriginal}
                  getSelectedSalesModel={getSelectedSalesModel}
                  setSelectedSalesModel={setSelectedSalesModel}
                  getCommissionedGAV={getCommissionedGAV}
                  setCommissionedGAV={setCommissionedGAV}
                  getDocumentFilesNegotiation={getDocumentFilesNegotiation}
                  setDocumentFilesNegotiation={setDocumentFilesNegotiation}
                  getDocumentFilesService={getDocumentFilesService}
                  setDocumentFilesService={setDocumentFilesService}
                  getPDForImageNegotiation={getPDForImageNegotiation}
                  setPDForImageNegotiation={setPDForImageNegotiation}
                  getPDForImageService={getPDForImageService}
                  setPDForImageService={setPDForImageService}
                  getDocumentComplementary = {getDocumentComplementary}
                  setDocumentComplementary = {setDocumentComplementary}
                  getPDForImageDocumentComplementary = {getPDForImageDocumentComplementary}
                  setPDForImageDocumentComplementary = {setPDForImageDocumentComplementary}
                  getSelectedProposalDate={getSelectedProposalDate}
                  setSelectedProposalDate={setSelectedProposalDate}
                  getSelectedCaptureLocation={getSelectedCaptureLocation}
                  setSelectedCaptureLocation={setSelectedCaptureLocation}
                  getSelectedPurchasePurpose={getSelectedPurchasePurpose}
                  setSelectedPurchasePurpose={setSelectedPurchasePurpose}
                  getVisibleChecklistRegistration={getVisibleChecklistRegistration}
                  setVisibleChecklistRegistration={setVisibleChecklistRegistration}
                  getVisibleProductData={getVisibleProductData}
                  setVisibleProductData={setVisibleProductData}
                  getVisibleCommissionControl={getVisibleCommissionControl}
                  setVisibleCommissionControl={setVisibleCommissionControl}
                  getVisiblePaymentPlan={getVisiblePaymentPlan}
                  setVisiblePaymentPlan={setVisiblePaymentPlan}
                  getVisibleNegotiationCard={getVisibleNegotiationCard}
                  setVisibleNegotiationCard={setVisibleNegotiationCard}
                  getVisibleComplementaryDocumentation={getVisibleComplementaryDocumentation}
                  setVisibleComplementaryDocumentation={setVisibleComplementaryDocumentation}
                  getVisibleAdditionalInformation={getVisibleAdditionalInformation}
                  setVisibleAdditionalInformation={setVisibleAdditionalInformation}
                />
              </Styled.SubtitleContainer>
            </View>
          </Styled.Items>
          <Styled.Items activeOpacity={0.9} onPress={() => {setVisibleProponent(true)}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Styled.Number>
                <Styled.TextNumber>2</Styled.TextNumber>
              </Styled.Number>
              <Styled.SubtitleContainer>
                <Styled.TextCardTitle>Proponente(s)</Styled.TextCardTitle>
                <Modals.Proponent
                  getCaptureLocation={getCaptureLocation}
                  setCaptureLocation={setCaptureLocation}
                  getPurchasePurpose={getPurchasePurpose}
                  setPurchasePurpose={setPurchasePurpose}
                  getAjustarSaldoAoValorAVista={getAjustarSaldoAoValorAVista}
                  setAjustarSaldoAoValorAVista={setAjustarSaldoAoValorAVista}
                  getComissionControl={getControleDeComissao}
                  setComissionControl={setControleDeComissao}
                  getModelosDeVenda={getModelosDeVenda}
                  setModelosDeVenda={setModelosDeVenda}
                  getSalesRooms={getSalesRooms}
                  setSalesRooms={setSalesRooms}
                  goHome={async () => {
                    await setVisibleProponent(false);
                    await setVisibleChecklistRegistration(false);
                  }}
                  getTaxaDeDescontoValorAVista={getTaxaDeDescontoValorAVista}
                  setTaxaDeDescontoValorAVista={setTaxaDeDescontoValorAVista}
                  visible={getVisibleProponent}
                  getDocumentChecklist={getDocumentChecklist}
                  setDocumentChecklist={setDocumentChecklist}
                  getPDForImageChecklist={getPDForImageChecklist}
                  setPDForImageChecklist={setPDForImageChecklist}
                  getSaleRoom={getSaleRoom}
                  getCommissioned={getCommissioned}
                  setCommissioned={setCommissioned}
                  scrollRef={scrollRef}
                  setSaleRoom={setSaleRoom}
                  onPress={async () => {
                    setProspectsList([...getProspectsList, {nacionalidade: {id: 195, descricao: "Brasil", nacionalidade: "brasileiro(a)", masculino: "brasileiro", feminino: "brasileira"}} as Object_.Prospect]);
                    setIndexProspects(getIndexProspects + 1);
                    setDependentsList([...getDependentsList, {nacionalidade: {id: 195, descricao: "Brasil", nacionalidade: "brasileiro(a)", masculino: "brasileiro", feminino: "brasileira"}} as Object_.Dependente]);
                    scrollRef.current?.scrollTo({
                      y: 0,
                      animated: true,
                    });
                  }}
                  setVisibleProponent={setVisibleProponent}
                  getVisibleProponent={getVisibleProponent}
                  getIndexProspects={getIndexProspects}
                  setIndexProspects={setIndexProspects}
                  getProspectsList={getProspectsList}
                  setProspectsList={setProspectsList}
                  getDependentsList={getDependentsList}
                  setDependentsList={setDependentsList}
                  onPressBack={() => {
                    if(getIndexProspects === 0) {
                      setVisibleProponent(false)
                      setVisibleChecklistRegistration(true)
                    } else {
                      setIndexProspects(getIndexProspects - 1)
                      try {
                        let cellPhone = getProspectsList[getIndexProspects - 1]?.telefones?.find((item: Object_.Telefone) => item.classificacao == 1);
                        setCellPhone({
                          classificacao: 1,
                          ddi: "55",
                          ddd: cellPhone?.ddd,
                          numero: cellPhone?.numero
                        } as Object_.Telefone);
                      } catch {}
                      try {
                        let comercialPhone = getProspectsList[getIndexProspects - 1]?.telefones?.find((item: Object_.Telefone) => item.classificacao == 2);
                        setComercialPhone({
                          classificacao: 2,
                          ddi: "55",
                          ddd: comercialPhone?.ddd,
                          numero: comercialPhone?.numero
                        } as Object_.Telefone); 
                      } catch {}
                    }
                  }}
                  getCellPhone={getCellPhone}
                  setCellPhone={setCellPhone}
                  getComercialPhone={getComercialPhone}
                  setComercialPhone={setComercialPhone}
                  getCellPhoneSpouse={getCellPhoneSpouse}
                  setCellPhoneSpouse={setCellPhoneSpouse}
                  getComercialPhoneSpouse={getComercialPhoneSpouse}
                  setComercialPhoneSpouse={setComercialPhoneSpouse}
                  setSelectedPaymentMethod={setSelectedPaymentMethod}
                  getSelectedPaymentMethod={getSelectedPaymentMethod}
                  getTitulosDeIntermediacao={getTitulosDeIntermediacao}
                  setTitulosDeIntermediacao={setTitulosDeIntermediacao}
                  getTitulosDeEntrada={getTitulosDeEntrada}
                  setTitulosDeEntrada={setTitulosDeEntrada}
                  getTitulosDeSinal={getTitulosDeSinal}
                  setTitulosDeSinal={setTitulosDeSinal}
                  getTitulosDeIntermediaria={getTitulosDeIntermediaria}
                  setTitulosDeIntermediaria={setTitulosDeIntermediaria}
                  getTitulosDeSaldo={getTitulosDeSaldo}
                  setTitulosDeSaldo={setTitulosDeSaldo}
                  getValorDescontadoTituloIntermediacao={getValorDescontadoTituloIntermediacao}
                  setValorDescontadoTituloIntermediacao={setValorDescontadoTituloIntermediacao}
                  getValorDescontadoTituloEntrada={getValorDescontadoTituloEntrada}
                  setValorDescontadoTituloEntrada={setValorDescontadoTituloEntrada}
                  getValorDescontadoTituloIntermediaria={getValorDescontadoTituloIntermediaria}
                  setValorDescontadoTituloIntermediaria={setValorDescontadoTituloIntermediaria}
                  getValorDescontadoTituloSaldo={getValorDescontadoTituloSaldo}
                  setValorDescontadoTituloSaldo={setValorDescontadoTituloSaldo}
                  getValorDescontadoTituloSinal={getValorDescontadoTituloSinal}
                  setValorDescontadoTituloSinal={setValorDescontadoTituloSinal}
                  getObjectIdentificador={getObject_Identificador}
                  setObjectIdentificador={setObject_Identificador}
                  getIdentificador={getIdentificador}
                  setIdentificador={setIdentificador}
                  getCentroDeCusto={getCentroDeCusto}
                  setCentroDeCusto={setCentroDeCusto}
                  getSelectedUnity={getSelectedUnity}
                  setSelectedUnity={setSelectedUnity}
                  getSelectedCentroDeCusto={getSelectedCentroDeCusto}
                  setSelectedCentroDeCusto={setSelectedCentroDeCusto}
                  getSalesTableOriginal={getSalesTableOriginal}
                  setSalesTableOriginal={setSalesTableOriginal}
                  getSelectedSalesModel={getSelectedSalesModel}
                  setSelectedSalesModel={setSelectedSalesModel}
                  getCommissionedGAV={getCommissionedGAV}
                  setCommissionedGAV={setCommissionedGAV}
                  getDocumentFilesNegotiation={getDocumentFilesNegotiation}
                  setDocumentFilesNegotiation={setDocumentFilesNegotiation}
                  getDocumentFilesService={getDocumentFilesService}
                  setDocumentFilesService={setDocumentFilesService}
                  getPDForImageNegotiation={getPDForImageNegotiation}
                  setPDForImageNegotiation={setPDForImageNegotiation}
                  getPDForImageService={getPDForImageService}
                  setPDForImageService={setPDForImageService}
                  getDocumentComplementary = {getDocumentComplementary}
                  setDocumentComplementary = {setDocumentComplementary}
                  getPDForImageDocumentComplementary = {getPDForImageDocumentComplementary}
                  setPDForImageDocumentComplementary = {setPDForImageDocumentComplementary}
                  getSelectedProposalDate={getSelectedProposalDate}
                  setSelectedProposalDate={setSelectedProposalDate}
                  getSelectedCaptureLocation={getSelectedCaptureLocation}
                  setSelectedCaptureLocation={setSelectedCaptureLocation}
                  getSelectedPurchasePurpose={getSelectedPurchasePurpose}
                  setSelectedPurchasePurpose={setSelectedPurchasePurpose}
                  getVisibleChecklistRegistration={getVisibleChecklistRegistration}
                  setVisibleChecklistRegistration={setVisibleChecklistRegistration}
                  getVisibleProductData={getVisibleProductData}
                  setVisibleProductData={setVisibleProductData}
                  getVisibleCommissionControl={getVisibleCommissionControl}
                  setVisibleCommissionControl={setVisibleCommissionControl}
                  getVisiblePaymentPlan={getVisiblePaymentPlan}
                  setVisiblePaymentPlan={setVisiblePaymentPlan}
                  getVisibleNegotiationCard={getVisibleNegotiationCard}
                  setVisibleNegotiationCard={setVisibleNegotiationCard}
                  getVisibleComplementaryDocumentation={getVisibleComplementaryDocumentation}
                  setVisibleComplementaryDocumentation={setVisibleComplementaryDocumentation}
                  getVisibleAdditionalInformation={getVisibleAdditionalInformation}
                  setVisibleAdditionalInformation={setVisibleAdditionalInformation}
                />
              </Styled.SubtitleContainer>
            </View>
          </Styled.Items>
          <Styled.Items activeOpacity={0.9} onPress={() => { setVisibleProductData(true) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Styled.Number>
                <Styled.TextNumber>3</Styled.TextNumber>
              </Styled.Number>
              <Styled.SubtitleContainer>
                <Styled.TextCardTitle>Dados do produto</Styled.TextCardTitle>
                <Modals.ProductData
                  getCaptureLocation={getCaptureLocation}
                  setCaptureLocation={setCaptureLocation}
                  getPurchasePurpose={getPurchasePurpose}
                  setPurchasePurpose={setPurchasePurpose}
                  getAjustarSaldoAoValorAVista={getAjustarSaldoAoValorAVista}
                  setAjustarSaldoAoValorAVista={setAjustarSaldoAoValorAVista}
                  getComissionControl={getControleDeComissao}
                  setComissionControl={setControleDeComissao}
                  getModelosDeVenda={getModelosDeVenda}
                  setModelosDeVenda={setModelosDeVenda}
                  getSalesRooms={getSalesRooms}
                  setSalesRooms={setSalesRooms}
                  goHome={async () => {
                    await setVisibleProductData(false);
                    await setVisibleProponent(false);
                    await setVisibleChecklistRegistration(false);
                  }}
                  getTaxaDeDescontoValorAVista={getTaxaDeDescontoValorAVista}
                  setTaxaDeDescontoValorAVista={setTaxaDeDescontoValorAVista}
                  visible={getVisibleProductData}
                  getDocumentChecklist={getDocumentChecklist}
                  setDocumentChecklist={setDocumentChecklist}
                  getPDForImageChecklist={getPDForImageChecklist}
                  setPDForImageChecklist={setPDForImageChecklist}
                  getSaleRoom={getSaleRoom}
                  getCommissioned={getCommissioned}
                  setCommissioned={setCommissioned}
                  scrollRef={scrollRef}
                  setSaleRoom={setSaleRoom}
                  onPress={async () => {
                    setProspectsList([...getProspectsList, {nacionalidade: {id: 195, descricao: "Brasil", nacionalidade: "brasileiro(a)", masculino: "brasileiro", feminino: "brasileira"}} as Object_.Prospect]);
                    setIndexProspects(getIndexProspects + 1);
                    setDependentsList([...getDependentsList, {nacionalidade: {id: 195, descricao: "Brasil", nacionalidade: "brasileiro(a)", masculino: "brasileiro", feminino: "brasileira"}} as Object_.Dependente]);
                    scrollRef.current?.scrollTo({
                      y: 0,
                      animated: true,
                    });
                  }}
                  setVisibleProponent={setVisibleProponent}
                  getVisibleProponent={getVisibleProponent}
                  getIndexProspects={getIndexProspects}
                  setIndexProspects={setIndexProspects}
                  getProspectsList={getProspectsList}
                  setProspectsList={setProspectsList}
                  getDependentsList={getDependentsList}
                  setDependentsList={setDependentsList}
                  onPressBack={() => {
                    if(getIndexProspects === 0) {
                      setVisibleProponent(false)
                    } else {
                      setIndexProspects(getIndexProspects - 1)
                      try {
                        let cellPhone = getProspectsList[getIndexProspects - 1]?.telefones?.find((item: Object_.Telefone) => item.classificacao == 1);
                        setCellPhone({
                          classificacao: 1,
                          ddi: "55",
                          ddd: cellPhone?.ddd,
                          numero: cellPhone?.numero
                        } as Object_.Telefone);
                      } catch {}
                      try {
                        let comercialPhone = getProspectsList[getIndexProspects - 1]?.telefones?.find((item: Object_.Telefone) => item.classificacao == 2);
                        setComercialPhone({
                          classificacao: 2,
                          ddi: "55",
                          ddd: comercialPhone?.ddd,
                          numero: comercialPhone?.numero
                        } as Object_.Telefone); 
                      } catch {}
                    }
                  }}
                  getCellPhone={getCellPhone}
                  setCellPhone={setCellPhone}
                  getComercialPhone={getComercialPhone}
                  setComercialPhone={setComercialPhone}
                  getCellPhoneSpouse={getCellPhoneSpouse}
                  setCellPhoneSpouse={setCellPhoneSpouse}
                  getComercialPhoneSpouse={getComercialPhoneSpouse}
                  setComercialPhoneSpouse={setComercialPhoneSpouse}
                  setSelectedPaymentMethod={setSelectedPaymentMethod}
                  getSelectedPaymentMethod={getSelectedPaymentMethod}
                  getTitulosDeIntermediacao={getTitulosDeIntermediacao}
                  setTitulosDeIntermediacao={setTitulosDeIntermediacao}
                  getTitulosDeEntrada={getTitulosDeEntrada}
                  setTitulosDeEntrada={setTitulosDeEntrada}
                  getTitulosDeSinal={getTitulosDeSinal}
                  setTitulosDeSinal={setTitulosDeSinal}
                  getTitulosDeIntermediaria={getTitulosDeIntermediaria}
                  setTitulosDeIntermediaria={setTitulosDeIntermediaria}
                  getTitulosDeSaldo={getTitulosDeSaldo}
                  setTitulosDeSaldo={setTitulosDeSaldo}
                  getValorDescontadoTituloIntermediacao={getValorDescontadoTituloIntermediacao}
                  setValorDescontadoTituloIntermediacao={setValorDescontadoTituloIntermediacao}
                  getValorDescontadoTituloEntrada={getValorDescontadoTituloEntrada}
                  setValorDescontadoTituloEntrada={setValorDescontadoTituloEntrada}
                  getValorDescontadoTituloIntermediaria={getValorDescontadoTituloIntermediaria}
                  setValorDescontadoTituloIntermediaria={setValorDescontadoTituloIntermediaria}
                  getValorDescontadoTituloSaldo={getValorDescontadoTituloSaldo}
                  setValorDescontadoTituloSaldo={setValorDescontadoTituloSaldo}
                  getValorDescontadoTituloSinal={getValorDescontadoTituloSinal}
                  setValorDescontadoTituloSinal={setValorDescontadoTituloSinal}
                  getObjectIdentificador={getObject_Identificador}
                  setObjectIdentificador={setObject_Identificador}
                  getIdentificador={getIdentificador}
                  setIdentificador={setIdentificador}
                  getCentroDeCusto={getCentroDeCusto}
                  setCentroDeCusto={setCentroDeCusto}
                  getSelectedUnity={getSelectedUnity}
                  setSelectedUnity={setSelectedUnity}
                  getSelectedCentroDeCusto={getSelectedCentroDeCusto}
                  setSelectedCentroDeCusto={setSelectedCentroDeCusto}
                  getSalesTableOriginal={getSalesTableOriginal}
                  setSalesTableOriginal={setSalesTableOriginal}
                  getSelectedSalesModel={getSelectedSalesModel}
                  setSelectedSalesModel={setSelectedSalesModel}
                  getCommissionedGAV={getCommissionedGAV}
                  setCommissionedGAV={setCommissionedGAV}
                  getDocumentFilesNegotiation={getDocumentFilesNegotiation}
                  setDocumentFilesNegotiation={setDocumentFilesNegotiation}
                  getDocumentFilesService={getDocumentFilesService}
                  setDocumentFilesService={setDocumentFilesService}
                  getPDForImageNegotiation={getPDForImageNegotiation}
                  setPDForImageNegotiation={setPDForImageNegotiation}
                  getPDForImageService={getPDForImageService}
                  setPDForImageService={setPDForImageService}
                  getDocumentComplementary = {getDocumentComplementary}
                  setDocumentComplementary = {setDocumentComplementary}
                  getPDForImageDocumentComplementary = {getPDForImageDocumentComplementary}
                  setPDForImageDocumentComplementary = {setPDForImageDocumentComplementary}
                  getSelectedProposalDate={getSelectedProposalDate}
                  setSelectedProposalDate={setSelectedProposalDate}
                  getSelectedCaptureLocation={getSelectedCaptureLocation}
                  setSelectedCaptureLocation={setSelectedCaptureLocation}
                  getSelectedPurchasePurpose={getSelectedPurchasePurpose}
                  setSelectedPurchasePurpose={setSelectedPurchasePurpose}
                  getVisibleChecklistRegistration={getVisibleChecklistRegistration}
                  setVisibleChecklistRegistration={setVisibleChecklistRegistration}
                  getVisibleProductData={getVisibleProductData}
                  setVisibleProductData={setVisibleProductData}
                  getVisibleCommissionControl={getVisibleCommissionControl}
                  setVisibleCommissionControl={setVisibleCommissionControl}
                  getVisiblePaymentPlan={getVisiblePaymentPlan}
                  setVisiblePaymentPlan={setVisiblePaymentPlan}
                  getVisibleNegotiationCard={getVisibleNegotiationCard}
                  setVisibleNegotiationCard={setVisibleNegotiationCard}
                  getVisibleComplementaryDocumentation={getVisibleComplementaryDocumentation}
                  setVisibleComplementaryDocumentation={setVisibleComplementaryDocumentation}
                  getVisibleAdditionalInformation={getVisibleAdditionalInformation}
                  setVisibleAdditionalInformation={setVisibleAdditionalInformation}
                />
              </Styled.SubtitleContainer>
            </View>
          </Styled.Items>
          <Styled.Items activeOpacity={0.9} onPress={() => {
            if(getSelectedCentroDeCusto && getSelectedUnity) setVisibleCommissionControl(true)
            else setMessage1("Informação!"); setMessage2(`Para liberar este campo, é preciso que seja informado os campos: "Empreendimento" e "Unidade"`); setShowToast(true)
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Styled.Number>
                <Styled.TextNumber>4</Styled.TextNumber>
              </Styled.Number>
              <Styled.SubtitleContainer>
                <Styled.TextCardTitle>Controle de Comissão</Styled.TextCardTitle>
                <Modals.CommissionControl
                  getCaptureLocation={getCaptureLocation}
                  setCaptureLocation={setCaptureLocation}
                  getPurchasePurpose={getPurchasePurpose}
                  setPurchasePurpose={setPurchasePurpose}
                  getAjustarSaldoAoValorAVista={getAjustarSaldoAoValorAVista}
                  setAjustarSaldoAoValorAVista={setAjustarSaldoAoValorAVista}
                  getComissionControl={getControleDeComissao}
                  setComissionControl={setControleDeComissao}
                  getModelosDeVenda={getModelosDeVenda}
                  setModelosDeVenda={setModelosDeVenda}
                  getSalesRooms={getSalesRooms}
                  setSalesRooms={setSalesRooms}
                  goHome={async () => {
                    await setVisibleCommissionControl(false);
                    await setVisibleProductData(false);
                    await setVisibleProponent(false);
                    await setVisibleChecklistRegistration(false);
                  }}
                  getTaxaDeDescontoValorAVista={getTaxaDeDescontoValorAVista}
                  setTaxaDeDescontoValorAVista={setTaxaDeDescontoValorAVista}
                  visible={getVisibleCommissionControl}
                  getDocumentChecklist={getDocumentChecklist}
                  setDocumentChecklist={setDocumentChecklist}
                  getPDForImageChecklist={getPDForImageChecklist}
                  setPDForImageChecklist={setPDForImageChecklist}
                  getSaleRoom={getSaleRoom}
                  getCommissioned={getCommissioned}
                  setCommissioned={setCommissioned}
                  scrollRef={scrollRef}
                  setSaleRoom={setSaleRoom}
                  onPress={async () => {
                    setProspectsList([...getProspectsList, {nacionalidade: {id: 195, descricao: "Brasil", nacionalidade: "brasileiro(a)", masculino: "brasileiro", feminino: "brasileira"}} as Object_.Prospect]);
                    setIndexProspects(getIndexProspects + 1);
                    setDependentsList([...getDependentsList, {nacionalidade: {id: 195, descricao: "Brasil", nacionalidade: "brasileiro(a)", masculino: "brasileiro", feminino: "brasileira"}} as Object_.Dependente]);
                    scrollRef.current?.scrollTo({
                      y: 0,
                      animated: true,
                    });
                  }}
                  setVisibleProponent={setVisibleProponent}
                  getVisibleProponent={getVisibleProponent}
                  getIndexProspects={getIndexProspects}
                  setIndexProspects={setIndexProspects}
                  getProspectsList={getProspectsList}
                  setProspectsList={setProspectsList}
                  getDependentsList={getDependentsList}
                  setDependentsList={setDependentsList}
                  onPressBack={() => {
                    if(getIndexProspects === 0) {
                      setVisibleProponent(false)
                    } else {
                      setIndexProspects(getIndexProspects - 1)
                      try {
                        let cellPhone = getProspectsList[getIndexProspects - 1]?.telefones?.find((item: Object_.Telefone) => item.classificacao == 1);
                        setCellPhone({
                          classificacao: 1,
                          ddi: "55",
                          ddd: cellPhone?.ddd,
                          numero: cellPhone?.numero
                        } as Object_.Telefone);
                      } catch {}
                      try {
                        let comercialPhone = getProspectsList[getIndexProspects - 1]?.telefones?.find((item: Object_.Telefone) => item.classificacao == 2);
                        setComercialPhone({
                          classificacao: 2,
                          ddi: "55",
                          ddd: comercialPhone?.ddd,
                          numero: comercialPhone?.numero
                        } as Object_.Telefone); 
                      } catch {}
                    }
                  }}
                  getCellPhone={getCellPhone}
                  setCellPhone={setCellPhone}
                  getComercialPhone={getComercialPhone}
                  setComercialPhone={setComercialPhone}
                  getCellPhoneSpouse={getCellPhoneSpouse}
                  setCellPhoneSpouse={setCellPhoneSpouse}
                  getComercialPhoneSpouse={getComercialPhoneSpouse}
                  setComercialPhoneSpouse={setComercialPhoneSpouse}
                  setSelectedPaymentMethod={setSelectedPaymentMethod}
                  getSelectedPaymentMethod={getSelectedPaymentMethod}
                  getTitulosDeIntermediacao={getTitulosDeIntermediacao}
                  setTitulosDeIntermediacao={setTitulosDeIntermediacao}
                  getTitulosDeEntrada={getTitulosDeEntrada}
                  setTitulosDeEntrada={setTitulosDeEntrada}
                  getTitulosDeSinal={getTitulosDeSinal}
                  setTitulosDeSinal={setTitulosDeSinal}
                  getTitulosDeIntermediaria={getTitulosDeIntermediaria}
                  setTitulosDeIntermediaria={setTitulosDeIntermediaria}
                  getTitulosDeSaldo={getTitulosDeSaldo}
                  setTitulosDeSaldo={setTitulosDeSaldo}
                  getValorDescontadoTituloIntermediacao={getValorDescontadoTituloIntermediacao}
                  setValorDescontadoTituloIntermediacao={setValorDescontadoTituloIntermediacao}
                  getValorDescontadoTituloEntrada={getValorDescontadoTituloEntrada}
                  setValorDescontadoTituloEntrada={setValorDescontadoTituloEntrada}
                  getValorDescontadoTituloIntermediaria={getValorDescontadoTituloIntermediaria}
                  setValorDescontadoTituloIntermediaria={setValorDescontadoTituloIntermediaria}
                  getValorDescontadoTituloSaldo={getValorDescontadoTituloSaldo}
                  setValorDescontadoTituloSaldo={setValorDescontadoTituloSaldo}
                  getValorDescontadoTituloSinal={getValorDescontadoTituloSinal}
                  setValorDescontadoTituloSinal={setValorDescontadoTituloSinal}
                  getObjectIdentificador={getObject_Identificador}
                  setObjectIdentificador={setObject_Identificador}
                  getIdentificador={getIdentificador}
                  setIdentificador={setIdentificador}
                  getCentroDeCusto={getCentroDeCusto}
                  setCentroDeCusto={setCentroDeCusto}
                  getSelectedUnity={getSelectedUnity}
                  setSelectedUnity={setSelectedUnity}
                  getSelectedCentroDeCusto={getSelectedCentroDeCusto}
                  setSelectedCentroDeCusto={setSelectedCentroDeCusto}
                  getSalesTableOriginal={getSalesTableOriginal}
                  setSalesTableOriginal={setSalesTableOriginal}
                  getSelectedSalesModel={getSelectedSalesModel}
                  setSelectedSalesModel={setSelectedSalesModel}
                  getCommissionedGAV={getCommissionedGAV}
                  setCommissionedGAV={setCommissionedGAV}
                  getDocumentFilesNegotiation={getDocumentFilesNegotiation}
                  setDocumentFilesNegotiation={setDocumentFilesNegotiation}
                  getDocumentFilesService={getDocumentFilesService}
                  setDocumentFilesService={setDocumentFilesService}
                  getPDForImageNegotiation={getPDForImageNegotiation}
                  setPDForImageNegotiation={setPDForImageNegotiation}
                  getPDForImageService={getPDForImageService}
                  setPDForImageService={setPDForImageService}
                  getDocumentComplementary = {getDocumentComplementary}
                  setDocumentComplementary = {setDocumentComplementary}
                  getPDForImageDocumentComplementary = {getPDForImageDocumentComplementary}
                  setPDForImageDocumentComplementary = {setPDForImageDocumentComplementary}
                  getSelectedProposalDate={getSelectedProposalDate}
                  setSelectedProposalDate={setSelectedProposalDate}
                  getSelectedCaptureLocation={getSelectedCaptureLocation}
                  setSelectedCaptureLocation={setSelectedCaptureLocation}
                  getSelectedPurchasePurpose={getSelectedPurchasePurpose}
                  setSelectedPurchasePurpose={setSelectedPurchasePurpose}
                  getVisibleChecklistRegistration={getVisibleChecklistRegistration}
                  setVisibleChecklistRegistration={setVisibleChecklistRegistration}
                  getVisibleProductData={getVisibleProductData}
                  setVisibleProductData={setVisibleProductData}
                  getVisibleCommissionControl={getVisibleCommissionControl}
                  setVisibleCommissionControl={setVisibleCommissionControl}
                  getVisiblePaymentPlan={getVisiblePaymentPlan}
                  setVisiblePaymentPlan={setVisiblePaymentPlan}
                  getVisibleNegotiationCard={getVisibleNegotiationCard}
                  setVisibleNegotiationCard={setVisibleNegotiationCard}
                  getVisibleComplementaryDocumentation={getVisibleComplementaryDocumentation}
                  setVisibleComplementaryDocumentation={setVisibleComplementaryDocumentation}
                  getVisibleAdditionalInformation={getVisibleAdditionalInformation}
                  setVisibleAdditionalInformation={setVisibleAdditionalInformation}
                />
              </Styled.SubtitleContainer>
            </View>
          </Styled.Items>
          <Styled.Items activeOpacity={0.9} onPress={() => {
            if(getSelectedCentroDeCusto && getSelectedUnity && getControleDeComissao.comissionados) setVisiblePaymentPlan(true)
            else setMessage1("Informação!"); setMessage2(`Para liberar este campo, é preciso que seja informado os campos: "Empreendimento", "Unidade" e "Sala de vendas" (este além de selecionado é necessário que seja consultado a estrutura de comissão, principalmente quando alterado a "Unidade" ou "Desconto")`); setShowToast(true)
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Styled.Number>
                <Styled.TextNumber>5</Styled.TextNumber>
              </Styled.Number>
              <Styled.SubtitleContainer>
                <Styled.TextCardTitle>Plano de Pagamento</Styled.TextCardTitle>
                <Modals.PaymentPlan
                  getCaptureLocation={getCaptureLocation}
                  setCaptureLocation={setCaptureLocation}
                  getPurchasePurpose={getPurchasePurpose}
                  setPurchasePurpose={setPurchasePurpose}
                  getAjustarSaldoAoValorAVista={getAjustarSaldoAoValorAVista}
                  setAjustarSaldoAoValorAVista={setAjustarSaldoAoValorAVista}
                  getComissionControl={getControleDeComissao}
                  setComissionControl={setControleDeComissao}
                  getModelosDeVenda={getModelosDeVenda}
                  setModelosDeVenda={setModelosDeVenda}
                  getSalesRooms={getSalesRooms}
                  setSalesRooms={setSalesRooms}
                  goHome={async () => {
                    await setVisiblePaymentPlan(false);
                    await setVisibleCommissionControl(false);
                    await setVisibleProductData(false);
                    await setVisibleProponent(false);
                    await setVisibleChecklistRegistration(false);
                  }}
                  getTaxaDeDescontoValorAVista={getTaxaDeDescontoValorAVista}
                  setTaxaDeDescontoValorAVista={setTaxaDeDescontoValorAVista}
                  visible={getVisiblePaymentPlan}
                  getDocumentChecklist={getDocumentChecklist}
                  setDocumentChecklist={setDocumentChecklist}
                  getPDForImageChecklist={getPDForImageChecklist}
                  setPDForImageChecklist={setPDForImageChecklist}
                  getSaleRoom={getSaleRoom}
                  getCommissioned={getCommissioned}
                  setCommissioned={setCommissioned}
                  scrollRef={scrollRef}
                  setSaleRoom={setSaleRoom}
                  onPress={async () => {
                    setProspectsList([...getProspectsList, {nacionalidade: {id: 195, descricao: "Brasil", nacionalidade: "brasileiro(a)", masculino: "brasileiro", feminino: "brasileira"}} as Object_.Prospect]);
                    setIndexProspects(getIndexProspects + 1);
                    setDependentsList([...getDependentsList, {nacionalidade: {id: 195, descricao: "Brasil", nacionalidade: "brasileiro(a)", masculino: "brasileiro", feminino: "brasileira"}} as Object_.Dependente]);
                    scrollRef.current?.scrollTo({
                      y: 0,
                      animated: true,
                    });
                  }}
                  setVisibleProponent={setVisibleProponent}
                  getVisibleProponent={getVisibleProponent}
                  getIndexProspects={getIndexProspects}
                  setIndexProspects={setIndexProspects}
                  getProspectsList={getProspectsList}
                  setProspectsList={setProspectsList}
                  getDependentsList={getDependentsList}
                  setDependentsList={setDependentsList}
                  onPressBack={() => {
                    if(getIndexProspects === 0) {
                      setVisibleProponent(false)
                    } else {
                      setIndexProspects(getIndexProspects - 1)
                      try {
                        let cellPhone = getProspectsList[getIndexProspects - 1]?.telefones?.find((item: Object_.Telefone) => item.classificacao == 1);
                        setCellPhone({
                          classificacao: 1,
                          ddi: "55",
                          ddd: cellPhone?.ddd,
                          numero: cellPhone?.numero
                        } as Object_.Telefone);
                      } catch {}
                      try {
                        let comercialPhone = getProspectsList[getIndexProspects - 1]?.telefones?.find((item: Object_.Telefone) => item.classificacao == 2);
                        setComercialPhone({
                          classificacao: 2,
                          ddi: "55",
                          ddd: comercialPhone?.ddd,
                          numero: comercialPhone?.numero
                        } as Object_.Telefone); 
                      } catch {}
                    }
                  }}
                  getCellPhone={getCellPhone}
                  setCellPhone={setCellPhone}
                  getComercialPhone={getComercialPhone}
                  setComercialPhone={setComercialPhone}
                  getCellPhoneSpouse={getCellPhoneSpouse}
                  setCellPhoneSpouse={setCellPhoneSpouse}
                  getComercialPhoneSpouse={getComercialPhoneSpouse}
                  setComercialPhoneSpouse={setComercialPhoneSpouse}
                  setSelectedPaymentMethod={setSelectedPaymentMethod}
                  getSelectedPaymentMethod={getSelectedPaymentMethod}
                  getTitulosDeIntermediacao={getTitulosDeIntermediacao}
                  setTitulosDeIntermediacao={setTitulosDeIntermediacao}
                  getTitulosDeEntrada={getTitulosDeEntrada}
                  setTitulosDeEntrada={setTitulosDeEntrada}
                  getTitulosDeSinal={getTitulosDeSinal}
                  setTitulosDeSinal={setTitulosDeSinal}
                  getTitulosDeIntermediaria={getTitulosDeIntermediaria}
                  setTitulosDeIntermediaria={setTitulosDeIntermediaria}
                  getTitulosDeSaldo={getTitulosDeSaldo}
                  setTitulosDeSaldo={setTitulosDeSaldo}
                  getValorDescontadoTituloIntermediacao={getValorDescontadoTituloIntermediacao}
                  setValorDescontadoTituloIntermediacao={setValorDescontadoTituloIntermediacao}
                  getValorDescontadoTituloEntrada={getValorDescontadoTituloEntrada}
                  setValorDescontadoTituloEntrada={setValorDescontadoTituloEntrada}
                  getValorDescontadoTituloIntermediaria={getValorDescontadoTituloIntermediaria}
                  setValorDescontadoTituloIntermediaria={setValorDescontadoTituloIntermediaria}
                  getValorDescontadoTituloSaldo={getValorDescontadoTituloSaldo}
                  setValorDescontadoTituloSaldo={setValorDescontadoTituloSaldo}
                  getValorDescontadoTituloSinal={getValorDescontadoTituloSinal}
                  setValorDescontadoTituloSinal={setValorDescontadoTituloSinal}
                  getObjectIdentificador={getObject_Identificador}
                  setObjectIdentificador={setObject_Identificador}
                  getIdentificador={getIdentificador}
                  setIdentificador={setIdentificador}
                  getCentroDeCusto={getCentroDeCusto}
                  setCentroDeCusto={setCentroDeCusto}
                  getSelectedUnity={getSelectedUnity}
                  setSelectedUnity={setSelectedUnity}
                  getSelectedCentroDeCusto={getSelectedCentroDeCusto}
                  setSelectedCentroDeCusto={setSelectedCentroDeCusto}
                  getSalesTableOriginal={getSalesTableOriginal}
                  setSalesTableOriginal={setSalesTableOriginal}
                  getSelectedSalesModel={getSelectedSalesModel}
                  setSelectedSalesModel={setSelectedSalesModel}
                  getCommissionedGAV={getCommissionedGAV}
                  setCommissionedGAV={setCommissionedGAV}
                  getDocumentFilesNegotiation={getDocumentFilesNegotiation}
                  setDocumentFilesNegotiation={setDocumentFilesNegotiation}
                  getDocumentFilesService={getDocumentFilesService}
                  setDocumentFilesService={setDocumentFilesService}
                  getPDForImageNegotiation={getPDForImageNegotiation}
                  setPDForImageNegotiation={setPDForImageNegotiation}
                  getPDForImageService={getPDForImageService}
                  setPDForImageService={setPDForImageService}
                  getDocumentComplementary = {getDocumentComplementary}
                  setDocumentComplementary = {setDocumentComplementary}
                  getPDForImageDocumentComplementary = {getPDForImageDocumentComplementary}
                  setPDForImageDocumentComplementary = {setPDForImageDocumentComplementary}
                  getSelectedProposalDate={getSelectedProposalDate}
                  setSelectedProposalDate={setSelectedProposalDate}
                  getSelectedCaptureLocation={getSelectedCaptureLocation}
                  setSelectedCaptureLocation={setSelectedCaptureLocation}
                  getSelectedPurchasePurpose={getSelectedPurchasePurpose}
                  setSelectedPurchasePurpose={setSelectedPurchasePurpose}
                  getVisibleChecklistRegistration={getVisibleChecklistRegistration}
                  setVisibleChecklistRegistration={setVisibleChecklistRegistration}
                  getVisibleProductData={getVisibleProductData}
                  setVisibleProductData={setVisibleProductData}
                  getVisibleCommissionControl={getVisibleCommissionControl}
                  setVisibleCommissionControl={setVisibleCommissionControl}
                  getVisiblePaymentPlan={getVisiblePaymentPlan}
                  setVisiblePaymentPlan={setVisiblePaymentPlan}
                  getVisibleNegotiationCard={getVisibleNegotiationCard}
                  setVisibleNegotiationCard={setVisibleNegotiationCard}
                  getVisibleComplementaryDocumentation={getVisibleComplementaryDocumentation}
                  setVisibleComplementaryDocumentation={setVisibleComplementaryDocumentation}
                  getVisibleAdditionalInformation={getVisibleAdditionalInformation}
                  setVisibleAdditionalInformation={setVisibleAdditionalInformation}
                />
              </Styled.SubtitleContainer>
            </View>
          </Styled.Items>
          <Styled.Items activeOpacity={0.9} onPress={() => { setVisibleNegotiationCard(true) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Styled.Number>
                <Styled.TextNumber>6</Styled.TextNumber>
              </Styled.Number>
              <Styled.SubtitleContainer>
                <Styled.TextCardTitle>Fichas</Styled.TextCardTitle>
                <Modals.Files
                  getCaptureLocation={getCaptureLocation}
                  setCaptureLocation={setCaptureLocation}
                  getPurchasePurpose={getPurchasePurpose}
                  setPurchasePurpose={setPurchasePurpose}
                  getAjustarSaldoAoValorAVista={getAjustarSaldoAoValorAVista}
                  setAjustarSaldoAoValorAVista={setAjustarSaldoAoValorAVista}
                  getComissionControl={getControleDeComissao}
                  setComissionControl={setControleDeComissao}
                  getModelosDeVenda={getModelosDeVenda}
                  setModelosDeVenda={setModelosDeVenda}
                  getSalesRooms={getSalesRooms}
                  setSalesRooms={setSalesRooms}
                  goHome={async () => {
                    await setVisibleNegotiationCard(false);
                    await setVisibleCommissionControl(false);
                    await setVisiblePaymentPlan(false);
                    await setVisibleProductData(false);
                    await setVisibleProponent(false);
                    await setVisibleChecklistRegistration(false);
                  }}
                  getTaxaDeDescontoValorAVista={getTaxaDeDescontoValorAVista}
                  setTaxaDeDescontoValorAVista={setTaxaDeDescontoValorAVista}
                  visible={getVisibleNegotiationCard}
                  getDocumentChecklist={getDocumentChecklist}
                  setDocumentChecklist={setDocumentChecklist}
                  getPDForImageChecklist={getPDForImageChecklist}
                  setPDForImageChecklist={setPDForImageChecklist}
                  getSaleRoom={getSaleRoom}
                  getCommissioned={getCommissioned}
                  setCommissioned={setCommissioned}
                  scrollRef={scrollRef}
                  setSaleRoom={setSaleRoom}
                  onPress={async () => {
                    setProspectsList([...getProspectsList, {nacionalidade: {id: 195, descricao: "Brasil", nacionalidade: "brasileiro(a)", masculino: "brasileiro", feminino: "brasileira"}} as Object_.Prospect]);
                    setIndexProspects(getIndexProspects + 1);
                    setDependentsList([...getDependentsList, {nacionalidade: {id: 195, descricao: "Brasil", nacionalidade: "brasileiro(a)", masculino: "brasileiro", feminino: "brasileira"}} as Object_.Dependente]);
                    scrollRef.current?.scrollTo({
                      y: 0,
                      animated: true,
                    });
                  }}
                  setVisibleProponent={setVisibleProponent}
                  getVisibleProponent={getVisibleProponent}
                  getIndexProspects={getIndexProspects}
                  setIndexProspects={setIndexProspects}
                  getProspectsList={getProspectsList}
                  setProspectsList={setProspectsList}
                  getDependentsList={getDependentsList}
                  setDependentsList={setDependentsList}
                  onPressBack={() => {
                    if(getIndexProspects === 0) {
                      setVisibleProponent(false)
                    } else {
                      setIndexProspects(getIndexProspects - 1)
                      try {
                        let cellPhone = getProspectsList[getIndexProspects - 1]?.telefones?.find((item: Object_.Telefone) => item.classificacao == 1);
                        setCellPhone({
                          classificacao: 1,
                          ddi: "55",
                          ddd: cellPhone?.ddd,
                          numero: cellPhone?.numero
                        } as Object_.Telefone);
                      } catch {}
                      try {
                        let comercialPhone = getProspectsList[getIndexProspects - 1]?.telefones?.find((item: Object_.Telefone) => item.classificacao == 2);
                        setComercialPhone({
                          classificacao: 2,
                          ddi: "55",
                          ddd: comercialPhone?.ddd,
                          numero: comercialPhone?.numero
                        } as Object_.Telefone); 
                      } catch {}
                    }
                  }}
                  getCellPhone={getCellPhone}
                  setCellPhone={setCellPhone}
                  getComercialPhone={getComercialPhone}
                  setComercialPhone={setComercialPhone}
                  getCellPhoneSpouse={getCellPhoneSpouse}
                  setCellPhoneSpouse={setCellPhoneSpouse}
                  getComercialPhoneSpouse={getComercialPhoneSpouse}
                  setComercialPhoneSpouse={setComercialPhoneSpouse}
                  setSelectedPaymentMethod={setSelectedPaymentMethod}
                  getSelectedPaymentMethod={getSelectedPaymentMethod}
                  getTitulosDeIntermediacao={getTitulosDeIntermediacao}
                  setTitulosDeIntermediacao={setTitulosDeIntermediacao}
                  getTitulosDeEntrada={getTitulosDeEntrada}
                  setTitulosDeEntrada={setTitulosDeEntrada}
                  getTitulosDeSinal={getTitulosDeSinal}
                  setTitulosDeSinal={setTitulosDeSinal}
                  getTitulosDeIntermediaria={getTitulosDeIntermediaria}
                  setTitulosDeIntermediaria={setTitulosDeIntermediaria}
                  getTitulosDeSaldo={getTitulosDeSaldo}
                  setTitulosDeSaldo={setTitulosDeSaldo}
                  getValorDescontadoTituloIntermediacao={getValorDescontadoTituloIntermediacao}
                  setValorDescontadoTituloIntermediacao={setValorDescontadoTituloIntermediacao}
                  getValorDescontadoTituloEntrada={getValorDescontadoTituloEntrada}
                  setValorDescontadoTituloEntrada={setValorDescontadoTituloEntrada}
                  getValorDescontadoTituloIntermediaria={getValorDescontadoTituloIntermediaria}
                  setValorDescontadoTituloIntermediaria={setValorDescontadoTituloIntermediaria}
                  getValorDescontadoTituloSaldo={getValorDescontadoTituloSaldo}
                  setValorDescontadoTituloSaldo={setValorDescontadoTituloSaldo}
                  getValorDescontadoTituloSinal={getValorDescontadoTituloSinal}
                  setValorDescontadoTituloSinal={setValorDescontadoTituloSinal}
                  getObjectIdentificador={getObject_Identificador}
                  setObjectIdentificador={setObject_Identificador}
                  getIdentificador={getIdentificador}
                  setIdentificador={setIdentificador}
                  getCentroDeCusto={getCentroDeCusto}
                  setCentroDeCusto={setCentroDeCusto}
                  getSelectedUnity={getSelectedUnity}
                  setSelectedUnity={setSelectedUnity}
                  getSelectedCentroDeCusto={getSelectedCentroDeCusto}
                  setSelectedCentroDeCusto={setSelectedCentroDeCusto}
                  getSalesTableOriginal={getSalesTableOriginal}
                  setSalesTableOriginal={setSalesTableOriginal}
                  getSelectedSalesModel={getSelectedSalesModel}
                  setSelectedSalesModel={setSelectedSalesModel}
                  getCommissionedGAV={getCommissionedGAV}
                  setCommissionedGAV={setCommissionedGAV}
                  getDocumentFilesNegotiation={getDocumentFilesNegotiation}
                  setDocumentFilesNegotiation={setDocumentFilesNegotiation}
                  getDocumentFilesService={getDocumentFilesService}
                  setDocumentFilesService={setDocumentFilesService}
                  getPDForImageNegotiation={getPDForImageNegotiation}
                  setPDForImageNegotiation={setPDForImageNegotiation}
                  getPDForImageService={getPDForImageService}
                  setPDForImageService={setPDForImageService}
                  getDocumentComplementary = {getDocumentComplementary}
                  setDocumentComplementary = {setDocumentComplementary}
                  getPDForImageDocumentComplementary = {getPDForImageDocumentComplementary}
                  setPDForImageDocumentComplementary = {setPDForImageDocumentComplementary}
                  getSelectedProposalDate={getSelectedProposalDate}
                  setSelectedProposalDate={setSelectedProposalDate}
                  getSelectedCaptureLocation={getSelectedCaptureLocation}
                  setSelectedCaptureLocation={setSelectedCaptureLocation}
                  getSelectedPurchasePurpose={getSelectedPurchasePurpose}
                  setSelectedPurchasePurpose={setSelectedPurchasePurpose}
                  getVisibleChecklistRegistration={getVisibleChecklistRegistration}
                  setVisibleChecklistRegistration={setVisibleChecklistRegistration}
                  getVisibleProductData={getVisibleProductData}
                  setVisibleProductData={setVisibleProductData}
                  getVisibleCommissionControl={getVisibleCommissionControl}
                  setVisibleCommissionControl={setVisibleCommissionControl}
                  getVisiblePaymentPlan={getVisiblePaymentPlan}
                  setVisiblePaymentPlan={setVisiblePaymentPlan}
                  getVisibleNegotiationCard={getVisibleNegotiationCard}
                  setVisibleNegotiationCard={setVisibleNegotiationCard}
                  getVisibleComplementaryDocumentation={getVisibleComplementaryDocumentation}
                  setVisibleComplementaryDocumentation={setVisibleComplementaryDocumentation}
                  getVisibleAdditionalInformation={getVisibleAdditionalInformation}
                  setVisibleAdditionalInformation={setVisibleAdditionalInformation}
                />
              </Styled.SubtitleContainer>
            </View>
          </Styled.Items>
          <Styled.Items activeOpacity={0.9} onPress={() => { setVisibleComplementaryDocumentation(true) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Styled.Number>
                <Styled.TextNumber>7</Styled.TextNumber>
              </Styled.Number>
              <Styled.SubtitleContainer>
                <Styled.TextCardTitle>Documentação complementar</Styled.TextCardTitle>
                <Modals.ComplementaryDocumentation
                  getCaptureLocation={getCaptureLocation}
                  setCaptureLocation={setCaptureLocation}
                  getPurchasePurpose={getPurchasePurpose}
                  setPurchasePurpose={setPurchasePurpose}
                  getAjustarSaldoAoValorAVista={getAjustarSaldoAoValorAVista}
                  setAjustarSaldoAoValorAVista={setAjustarSaldoAoValorAVista}
                  getComissionControl={getControleDeComissao}
                  setComissionControl={setControleDeComissao}
                  getModelosDeVenda={getModelosDeVenda}
                  setModelosDeVenda={setModelosDeVenda}
                  getSalesRooms={getSalesRooms}
                  setSalesRooms={setSalesRooms}
                  goHome={async () => {
                    await setVisibleComplementaryDocumentation(false);
                    await setVisibleNegotiationCard(false);
                    await setVisibleCommissionControl(false);
                    await setVisiblePaymentPlan(false);
                    await setVisibleProductData(false);
                    await setVisibleProponent(false);
                    await setVisibleChecklistRegistration(false);
                  }}
                  getTaxaDeDescontoValorAVista={getTaxaDeDescontoValorAVista}
                  setTaxaDeDescontoValorAVista={setTaxaDeDescontoValorAVista}
                  visible={getVisibleComplementaryDocumentation}
                  getDocumentChecklist={getDocumentChecklist}
                  setDocumentChecklist={setDocumentChecklist}
                  getPDForImageChecklist={getPDForImageChecklist}
                  setPDForImageChecklist={setPDForImageChecklist}
                  getSaleRoom={getSaleRoom}
                  getCommissioned={getCommissioned}
                  setCommissioned={setCommissioned}
                  scrollRef={scrollRef}
                  setSaleRoom={setSaleRoom}
                  onPress={async () => {
                    setProspectsList([...getProspectsList, {nacionalidade: {id: 195, descricao: "Brasil", nacionalidade: "brasileiro(a)", masculino: "brasileiro", feminino: "brasileira"}} as Object_.Prospect]);
                    setIndexProspects(getIndexProspects + 1);
                    setDependentsList([...getDependentsList, {nacionalidade: {id: 195, descricao: "Brasil", nacionalidade: "brasileiro(a)", masculino: "brasileiro", feminino: "brasileira"}} as Object_.Dependente]);
                    scrollRef.current?.scrollTo({
                      y: 0,
                      animated: true,
                    });
                  }}
                  setVisibleProponent={setVisibleProponent}
                  getVisibleProponent={getVisibleProponent}
                  getIndexProspects={getIndexProspects}
                  setIndexProspects={setIndexProspects}
                  getProspectsList={getProspectsList}
                  setProspectsList={setProspectsList}
                  getDependentsList={getDependentsList}
                  setDependentsList={setDependentsList}
                  onPressBack={() => {
                    if(getIndexProspects === 0) {
                      setVisibleProponent(false)
                    } else {
                      setIndexProspects(getIndexProspects - 1)
                      try {
                        let cellPhone = getProspectsList[getIndexProspects - 1]?.telefones?.find((item: Object_.Telefone) => item.classificacao == 1);
                        setCellPhone({
                          classificacao: 1,
                          ddi: "55",
                          ddd: cellPhone?.ddd,
                          numero: cellPhone?.numero
                        } as Object_.Telefone);
                      } catch {}
                      try {
                        let comercialPhone = getProspectsList[getIndexProspects - 1]?.telefones?.find((item: Object_.Telefone) => item.classificacao == 2);
                        setComercialPhone({
                          classificacao: 2,
                          ddi: "55",
                          ddd: comercialPhone?.ddd,
                          numero: comercialPhone?.numero
                        } as Object_.Telefone); 
                      } catch {}
                    }
                  }}
                  getCellPhone={getCellPhone}
                  setCellPhone={setCellPhone}
                  getComercialPhone={getComercialPhone}
                  setComercialPhone={setComercialPhone}
                  getCellPhoneSpouse={getCellPhoneSpouse}
                  setCellPhoneSpouse={setCellPhoneSpouse}
                  getComercialPhoneSpouse={getComercialPhoneSpouse}
                  setComercialPhoneSpouse={setComercialPhoneSpouse}
                  setSelectedPaymentMethod={setSelectedPaymentMethod}
                  getSelectedPaymentMethod={getSelectedPaymentMethod}
                  getTitulosDeIntermediacao={getTitulosDeIntermediacao}
                  setTitulosDeIntermediacao={setTitulosDeIntermediacao}
                  getTitulosDeEntrada={getTitulosDeEntrada}
                  setTitulosDeEntrada={setTitulosDeEntrada}
                  getTitulosDeSinal={getTitulosDeSinal}
                  setTitulosDeSinal={setTitulosDeSinal}
                  getTitulosDeIntermediaria={getTitulosDeIntermediaria}
                  setTitulosDeIntermediaria={setTitulosDeIntermediaria}
                  getTitulosDeSaldo={getTitulosDeSaldo}
                  setTitulosDeSaldo={setTitulosDeSaldo}
                  getValorDescontadoTituloIntermediacao={getValorDescontadoTituloIntermediacao}
                  setValorDescontadoTituloIntermediacao={setValorDescontadoTituloIntermediacao}
                  getValorDescontadoTituloEntrada={getValorDescontadoTituloEntrada}
                  setValorDescontadoTituloEntrada={setValorDescontadoTituloEntrada}
                  getValorDescontadoTituloIntermediaria={getValorDescontadoTituloIntermediaria}
                  setValorDescontadoTituloIntermediaria={setValorDescontadoTituloIntermediaria}
                  getValorDescontadoTituloSaldo={getValorDescontadoTituloSaldo}
                  setValorDescontadoTituloSaldo={setValorDescontadoTituloSaldo}
                  getValorDescontadoTituloSinal={getValorDescontadoTituloSinal}
                  setValorDescontadoTituloSinal={setValorDescontadoTituloSinal}
                  getObjectIdentificador={getObject_Identificador}
                  setObjectIdentificador={setObject_Identificador}
                  getIdentificador={getIdentificador}
                  setIdentificador={setIdentificador}
                  getCentroDeCusto={getCentroDeCusto}
                  setCentroDeCusto={setCentroDeCusto}
                  getSelectedUnity={getSelectedUnity}
                  setSelectedUnity={setSelectedUnity}
                  getSelectedCentroDeCusto={getSelectedCentroDeCusto}
                  setSelectedCentroDeCusto={setSelectedCentroDeCusto}
                  getSalesTableOriginal={getSalesTableOriginal}
                  setSalesTableOriginal={setSalesTableOriginal}
                  getSelectedSalesModel={getSelectedSalesModel}
                  setSelectedSalesModel={setSelectedSalesModel}
                  getCommissionedGAV={getCommissionedGAV}
                  setCommissionedGAV={setCommissionedGAV}
                  getDocumentFilesNegotiation={getDocumentFilesNegotiation}
                  setDocumentFilesNegotiation={setDocumentFilesNegotiation}
                  getDocumentFilesService={getDocumentFilesService}
                  setDocumentFilesService={setDocumentFilesService}
                  getPDForImageNegotiation={getPDForImageNegotiation}
                  setPDForImageNegotiation={setPDForImageNegotiation}
                  getPDForImageService={getPDForImageService}
                  setPDForImageService={setPDForImageService}
                  getDocumentComplementary = {getDocumentComplementary}
                  setDocumentComplementary = {setDocumentComplementary}
                  getPDForImageDocumentComplementary = {getPDForImageDocumentComplementary}
                  setPDForImageDocumentComplementary = {setPDForImageDocumentComplementary}
                  getSelectedProposalDate={getSelectedProposalDate}
                  setSelectedProposalDate={setSelectedProposalDate}
                  getSelectedCaptureLocation={getSelectedCaptureLocation}
                  setSelectedCaptureLocation={setSelectedCaptureLocation}
                  getSelectedPurchasePurpose={getSelectedPurchasePurpose}
                  setSelectedPurchasePurpose={setSelectedPurchasePurpose}
                  getVisibleChecklistRegistration={getVisibleChecklistRegistration}
                  setVisibleChecklistRegistration={setVisibleChecklistRegistration}
                  getVisibleProductData={getVisibleProductData}
                  setVisibleProductData={setVisibleProductData}
                  getVisibleCommissionControl={getVisibleCommissionControl}
                  setVisibleCommissionControl={setVisibleCommissionControl}
                  getVisiblePaymentPlan={getVisiblePaymentPlan}
                  setVisiblePaymentPlan={setVisiblePaymentPlan}
                  getVisibleNegotiationCard={getVisibleNegotiationCard}
                  setVisibleNegotiationCard={setVisibleNegotiationCard}
                  getVisibleComplementaryDocumentation={getVisibleComplementaryDocumentation}
                  setVisibleComplementaryDocumentation={setVisibleComplementaryDocumentation}
                  getVisibleAdditionalInformation={getVisibleAdditionalInformation}
                  setVisibleAdditionalInformation={setVisibleAdditionalInformation}
                />
              </Styled.SubtitleContainer>
            </View>
          </Styled.Items>
          <Styled.Items activeOpacity={0.9} onPress={() => { setVisibleAdditionalInformation(true) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Styled.Number>
                <Styled.TextNumber>8</Styled.TextNumber>
              </Styled.Number>
              <Styled.SubtitleContainer>
                <Styled.TextCardTitle>Informações complementares</Styled.TextCardTitle>
                <Modals.AdditionalInformation
                  getCaptureLocation={getCaptureLocation}
                  setCaptureLocation={setCaptureLocation}
                  getPurchasePurpose={getPurchasePurpose}
                  setPurchasePurpose={setPurchasePurpose}
                  getAjustarSaldoAoValorAVista={getAjustarSaldoAoValorAVista}
                  setAjustarSaldoAoValorAVista={setAjustarSaldoAoValorAVista}
                  getComissionControl={getControleDeComissao}
                  setComissionControl={setControleDeComissao}
                  getModelosDeVenda={getModelosDeVenda}
                  setModelosDeVenda={setModelosDeVenda}
                  getSalesRooms={getSalesRooms}
                  setSalesRooms={setSalesRooms}
                  goHome={async () => {
                    await setVisibleAdditionalInformation(false);
                    await setVisibleComplementaryDocumentation(false);
                    await setVisibleNegotiationCard(false);
                    await setVisibleCommissionControl(false);
                    await setVisiblePaymentPlan(false);
                    await setVisibleProductData(false);
                    await setVisibleProponent(false);
                    await setVisibleChecklistRegistration(false);
                  }}
                  getTaxaDeDescontoValorAVista={getTaxaDeDescontoValorAVista}
                  setTaxaDeDescontoValorAVista={setTaxaDeDescontoValorAVista}
                  visible={getVisibleAdditionalInformation}
                  getDocumentChecklist={getDocumentChecklist}
                  setDocumentChecklist={setDocumentChecklist}
                  getPDForImageChecklist={getPDForImageChecklist}
                  setPDForImageChecklist={setPDForImageChecklist}
                  getSaleRoom={getSaleRoom}
                  getCommissioned={getCommissioned}
                  setCommissioned={setCommissioned}
                  scrollRef={scrollRef}
                  setSaleRoom={setSaleRoom}
                  onPress={async () => {
                    setProspectsList([...getProspectsList, {nacionalidade: {id: 195, descricao: "Brasil", nacionalidade: "brasileiro(a)", masculino: "brasileiro", feminino: "brasileira"}} as Object_.Prospect]);
                    setIndexProspects(getIndexProspects + 1);
                    setDependentsList([...getDependentsList, {nacionalidade: {id: 195, descricao: "Brasil", nacionalidade: "brasileiro(a)", masculino: "brasileiro", feminino: "brasileira"}} as Object_.Dependente]);
                    scrollRef.current?.scrollTo({
                      y: 0,
                      animated: true,
                    });
                  }}
                  setVisibleProponent={setVisibleProponent}
                  getVisibleProponent={getVisibleProponent}
                  getIndexProspects={getIndexProspects}
                  setIndexProspects={setIndexProspects}
                  getProspectsList={getProspectsList}
                  setProspectsList={setProspectsList}
                  getDependentsList={getDependentsList}
                  setDependentsList={setDependentsList}
                  onPressBack={() => {
                    if(getIndexProspects === 0) {
                      setVisibleProponent(false)
                    } else {
                      setIndexProspects(getIndexProspects - 1)
                      try {
                        let cellPhone = getProspectsList[getIndexProspects - 1]?.telefones?.find((item: Object_.Telefone) => item.classificacao == 1);
                        setCellPhone({
                          classificacao: 1,
                          ddi: "55",
                          ddd: cellPhone?.ddd,
                          numero: cellPhone?.numero
                        } as Object_.Telefone);
                      } catch {}
                      try {
                        let comercialPhone = getProspectsList[getIndexProspects - 1]?.telefones?.find((item: Object_.Telefone) => item.classificacao == 2);
                        setComercialPhone({
                          classificacao: 2,
                          ddi: "55",
                          ddd: comercialPhone?.ddd,
                          numero: comercialPhone?.numero
                        } as Object_.Telefone); 
                      } catch {}
                    }
                  }}
                  getCellPhone={getCellPhone}
                  setCellPhone={setCellPhone}
                  getComercialPhone={getComercialPhone}
                  setComercialPhone={setComercialPhone}
                  getCellPhoneSpouse={getCellPhoneSpouse}
                  setCellPhoneSpouse={setCellPhoneSpouse}
                  getComercialPhoneSpouse={getComercialPhoneSpouse}
                  setComercialPhoneSpouse={setComercialPhoneSpouse}
                  setSelectedPaymentMethod={setSelectedPaymentMethod}
                  getSelectedPaymentMethod={getSelectedPaymentMethod}
                  getTitulosDeIntermediacao={getTitulosDeIntermediacao}
                  setTitulosDeIntermediacao={setTitulosDeIntermediacao}
                  getTitulosDeEntrada={getTitulosDeEntrada}
                  setTitulosDeEntrada={setTitulosDeEntrada}
                  getTitulosDeSinal={getTitulosDeSinal}
                  setTitulosDeSinal={setTitulosDeSinal}
                  getTitulosDeIntermediaria={getTitulosDeIntermediaria}
                  setTitulosDeIntermediaria={setTitulosDeIntermediaria}
                  getTitulosDeSaldo={getTitulosDeSaldo}
                  setTitulosDeSaldo={setTitulosDeSaldo}
                  getValorDescontadoTituloIntermediacao={getValorDescontadoTituloIntermediacao}
                  setValorDescontadoTituloIntermediacao={setValorDescontadoTituloIntermediacao}
                  getValorDescontadoTituloEntrada={getValorDescontadoTituloEntrada}
                  setValorDescontadoTituloEntrada={setValorDescontadoTituloEntrada}
                  getValorDescontadoTituloIntermediaria={getValorDescontadoTituloIntermediaria}
                  setValorDescontadoTituloIntermediaria={setValorDescontadoTituloIntermediaria}
                  getValorDescontadoTituloSaldo={getValorDescontadoTituloSaldo}
                  setValorDescontadoTituloSaldo={setValorDescontadoTituloSaldo}
                  getValorDescontadoTituloSinal={getValorDescontadoTituloSinal}
                  setValorDescontadoTituloSinal={setValorDescontadoTituloSinal}
                  getObjectIdentificador={getObject_Identificador}
                  setObjectIdentificador={setObject_Identificador}
                  getIdentificador={getIdentificador}
                  setIdentificador={setIdentificador}
                  getCentroDeCusto={getCentroDeCusto}
                  setCentroDeCusto={setCentroDeCusto}
                  getSelectedUnity={getSelectedUnity}
                  setSelectedUnity={setSelectedUnity}
                  getSelectedCentroDeCusto={getSelectedCentroDeCusto}
                  setSelectedCentroDeCusto={setSelectedCentroDeCusto}
                  getSalesTableOriginal={getSalesTableOriginal}
                  setSalesTableOriginal={setSalesTableOriginal}
                  getSelectedSalesModel={getSelectedSalesModel}
                  setSelectedSalesModel={setSelectedSalesModel}
                  getCommissionedGAV={getCommissionedGAV}
                  setCommissionedGAV={setCommissionedGAV}
                  getDocumentFilesNegotiation={getDocumentFilesNegotiation}
                  setDocumentFilesNegotiation={setDocumentFilesNegotiation}
                  getDocumentFilesService={getDocumentFilesService}
                  setDocumentFilesService={setDocumentFilesService}
                  getPDForImageNegotiation={getPDForImageNegotiation}
                  setPDForImageNegotiation={setPDForImageNegotiation}
                  getPDForImageService={getPDForImageService}
                  setPDForImageService={setPDForImageService}
                  getDocumentComplementary = {getDocumentComplementary}
                  setDocumentComplementary = {setDocumentComplementary}
                  getPDForImageDocumentComplementary = {getPDForImageDocumentComplementary}
                  setPDForImageDocumentComplementary = {setPDForImageDocumentComplementary}
                  getSelectedProposalDate={getSelectedProposalDate}
                  setSelectedProposalDate={setSelectedProposalDate}
                  getSelectedCaptureLocation={getSelectedCaptureLocation}
                  setSelectedCaptureLocation={setSelectedCaptureLocation}
                  getSelectedPurchasePurpose={getSelectedPurchasePurpose}
                  setSelectedPurchasePurpose={setSelectedPurchasePurpose}
                  getVisibleChecklistRegistration={getVisibleChecklistRegistration}
                  setVisibleChecklistRegistration={setVisibleChecklistRegistration}
                  getVisibleProductData={getVisibleProductData}
                  setVisibleProductData={setVisibleProductData}
                  getVisibleCommissionControl={getVisibleCommissionControl}
                  setVisibleCommissionControl={setVisibleCommissionControl}
                  getVisiblePaymentPlan={getVisiblePaymentPlan}
                  setVisiblePaymentPlan={setVisiblePaymentPlan}
                  getVisibleNegotiationCard={getVisibleNegotiationCard}
                  setVisibleNegotiationCard={setVisibleNegotiationCard}
                  getVisibleComplementaryDocumentation={getVisibleComplementaryDocumentation}
                  setVisibleComplementaryDocumentation={setVisibleComplementaryDocumentation}
                  getVisibleAdditionalInformation={getVisibleAdditionalInformation}
                  setVisibleAdditionalInformation={setVisibleAdditionalInformation}
                />
              </Styled.SubtitleContainer>
            </View>
          </Styled.Items>

          {getDoneSale && <Styled.Items activeOpacity={0.9} onPress={() => { setVisibleContractDocuments(true) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Styled.Number>
                <Styled.TextNumber>9</Styled.TextNumber>
              </Styled.Number>
              <Styled.SubtitleContainer>
                <Styled.TextCardTitle>Documentos de Contrato</Styled.TextCardTitle>
                <Modals.ContractDocuments
                  visible={getVisibleContractDocuments}
                  onPressClose={() => { setVisibleContractDocuments(false) }}
                  getDocuments={getDocumentosDoContrato}
                  setDocuments={setDocumentosDoContrato}
                  getProposta={getProposta}
                  getProspects={getProspectsList}
                  getTitulosDeEntrada={getTitulosDeEntrada}
                  getTitulosDeIntermediaria={getTitulosDeIntermediaria}
                  getTitulosDeSaldo={getTitulosDeSaldo}
                  getTitulosDeSinal={getTitulosDeSinal}
                />
              </Styled.SubtitleContainer>
            </View>
          </Styled.Items>}
          </ScrollView>
        </Styled.ItemsContainer>
        <Styled.ContainerButtons>
          <Styled.NewProposal 
            onPress={() => {
              NewPurpose();
            }}
            activeOpacity={0.8}
          >
            <Styled.TextNewProposal>Nova Proposta +</Styled.TextNewProposal>
          </Styled.NewProposal>
          {<Styled.Submit 
            onPress={ async () => {
              if((await ValidatingData()) == true) {
                let Leads = await RegisterLeads();
                if (Leads && Leads.length > 0) {
                  let Prospects = await RegisterProspect(Leads);
                  if (Prospects && Prospects.length > 0) {
                    let SaleProposal = await RegisterSaleProposal(Prospects);
                    if(SaleProposal) {
                      console.log(SaleProposal);
                      setProposta(SaleProposal);
                      let DocumentosDoContrato = [...getDocumentosDoContrato!?.filter(Item => Item.classificacao == 2 && Item.descricao != '_Documentos unificados') ?? []];
                      console.log(0);
                      (await Controllers.Venda.ModelosDeContrato(DataLogin?.token, SelectedCompany?.id ?? 0, SaleProposal.empresa!?.id, SaleProposal.centroDeCusto!?.sigla, undefined, false))?.data?.map(Item => {
                        Item.classificacao = 1
                        DocumentosDoContrato!?.push(Item);
                        console.log(1);
                      });
                      console.log(2);
                      DocumentosDoContrato!?.push({
                        classificacao: 2,
                        arquivo: '',
                        descricao: `_Documentos unificados`,
                        extensao: '',
                      } as Object_.Anexo);
                      console.log('DOCUMENTOS', DocumentosDoContrato.sort((a, b) => a.descricao > b.descricao ? 1 : -1));
                      setDocumentosDoContrato(DocumentosDoContrato.sort((a, b) => a.descricao > b.descricao ? 1 : -1));
                      setDoneSale(true);
                      return;
                    }
                  }
                }
              }
            }}
          activeOpacity={0.8}>
            <Styled.TextSubmit>Enviar Proposta</Styled.TextSubmit>
          </Styled.Submit>}
          <Modals.ModalLoading
            transparent={true}
            visible={getLoading}
          />
        </Styled.ContainerButtons>
      </Styled.Container>
    </LinearGradient>
  );
}