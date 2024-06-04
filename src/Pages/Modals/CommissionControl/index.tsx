//#region React
import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import {
  Modal,
  TouchableOpacity,
  Platform,
  View,
  FlatList,
} from 'react-native';
//#endregion

//#region Icons
import {ArrowGoButton, Home} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Styled
import { Commissioned, ToastMessage } from '../../../Components';
import * as Modals from '../../Modals';
import * as Styled from './styles';
import { Type } from '../PaymentPlan/Modals/viewModel';
import { Comission } from '../../Catalog/Menu/PagesMenu/VendaDireta';
//#endregion

//#region Services
import * as Controllers from '../../../Services/Controllers';
import { Object_ } from '../../../Services/Objects';
//#endregion

//#region Functions
import * as TextFormat from '../../../Themes/TextFormat';
import {ResponsiveWidth} from '../../../Functions';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
import { pmt } from 'financial';
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

export const CommissionControl = (props: Props) => {

  //#region useState
  const [getLoading, setLoading] = useState<boolean>(false);  
  const [getLoad, setLoad] = useState<boolean>(false);
  const [getVisibleModalCommissioned, setVisibleModalCommissioned] = useState<boolean>(false);
  const [getPerson, setPerson] = useState<Array<Object_.Pessoa>>();
  const [getVisibleModalSalesRoom, setVisibleModalSalesRoom] = useState<boolean>(false);
  const [getIdLinked, setIdLinked] = useState<string>("");
  const [getShowToast, setShowToast] = useState<boolean>(false);
  const [getMessage1, setMessage1] = useState<string>("");
  const [getMessage2, setMessage2] = useState<string>("");
  //#endregion

  //#region variables
  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);
  //#endregion

  function Toast() {
    setShowToast(false)
  }

  async function CommissionStructure(saleRoom: Object_.SalaDeVenda) {
    setLoading(true);
    var Response = await Controllers.Comissao.EstruturaDeComissao(DataLogin?.token, SelectedCompany?.id ?? 0, props.getObjectIdentificador?.empresaId ?? 0, props.getObjectIdentificador?.centroDeCustoSigla ?? "", props.getObjectIdentificador?.localId ?? 0, props.getObjectIdentificador?.subLocalId ?? 0, saleRoom.id, props.getProspectsList[0]?.id, props.getObjectIdentificador?.valorAVista);
    if (Math.floor(Response.status / 100) === 2) {
      let comission = {
        salaDeVendas: saleRoom,
        comissionados: Response.data.comissionados,
      } as Comission;
      props.setComissionControl!(comission);
      let ResponseSalasDeVendas = (await Controllers.SalaDeVendas.Get(DataLogin?.token, SelectedCompany?.id, true, props.getObjectIdentificador?.empresaId, props.getObjectIdentificador?.centroDeCustoSigla)).data.map((Item) => {
        return {
          salaDeVendas: {
              id: Item.id,
              descricao: Item.descricao,
              observacao: Item.observacao,
              logradouro: Item.logradouro,
              numero: Item.numero,
              complemento: Item.complemento,
              bairro: Item.bairro,
              cidade: Item.cidade,
              uf: Item.uf,
              cep: Item.cep
          } as Object_.SalaDeVenda,
          comissionados: [],
        }
      }).sort((a, b) => a.salaDeVendas.descricao > b.salaDeVendas.descricao ? 1 : -1);
      props.setSalesRooms(ResponseSalasDeVendas);
      try {
        let Resultado = await Controllers.TabelaDeVenda.Get(DataLogin?.token, SelectedCompany?.id ?? 0, props.getObjectIdentificador?.empresaId ?? 0, props.getObjectIdentificador?.centroDeCustoSigla ?? "" , props.getObjectIdentificador?.localId ?? 0, props.getObjectIdentificador?.subLocalId ?? 0,
          TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto((() => {
            if (props.getObjectIdentificador) {
              switch (SelectedCompany?.id) {
                case 6:
                  return props.getObjectIdentificador.valorAVista;
                case 26:
                  return props.getObjectIdentificador.valorAVista;
                default:
                  return (props.getObjectIdentificador.valorAVista * (1 - (props.getTaxaDeDescontoValorAVista ?? 0)) - comission.comissionados.filter((Item) => Item.indireto == false).reduce((Acumulado, Atual) => Acumulado + (Atual.valorBase ? Atual.valorBase : ((Atual.percentual ?? 0) * (props.getObjectIdentificador!?.valorAVista * (1 - (props.getTaxaDeDescontoValorAVista ?? 0))))), 0));
                }
            }
            else {
              return undefined;
            }
          })())));
        if (Math.floor(Resultado.status / 100) == 2) {
          let CondicoesDaTabelaDeVenda = [] as Array<string>;
          Resultado.data.classificacoesDosTitulosDaTabelaDeVenda.forEach(Classificacao => {
            Classificacao.condicoesDaTabelaDeVenda.forEach(Condicao => {
              if (!CondicoesDaTabelaDeVenda.find(Item => Item == Condicao.descricao)) CondicoesDaTabelaDeVenda.push(Condicao.descricao);
            })
          });
          let JurosDeTabela = 0;
          if (props.getObjectIdentificador && (SelectedCompany?.id == 26 || SelectedCompany?.id == 6)) {
            if (props.getObjectIdentificador.centroDeCustoSigla == "RAIZA") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "BELGO") JurosDeTabela += 0.083 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1529") JurosDeTabela += 0.8 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1538") JurosDeTabela += 0.8 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1539") JurosDeTabela += 0.8 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1610") JurosDeTabela += 0.8 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1635") JurosDeTabela += 0.6 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "NORPA") JurosDeTabela += 0.6 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "CIDFL") JurosDeTabela += 0.4153 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0049") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0065") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0124") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0145") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0170") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0189") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0259") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0287") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0290") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0326") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0374") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0379") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0386") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0404") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0429") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0440") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0473") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0631") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0737") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0738") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0746") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0758") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0790") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0999") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1009") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1014") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1042") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1044") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1051") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1458") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1463") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1476") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1489") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1512") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1521") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1526") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1533") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1536") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1554") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1618") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1734") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1785") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1790") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0648") JurosDeTabela += 0.78 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1029") JurosDeTabela += 0.78 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1030") JurosDeTabela += 0.78 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1031") JurosDeTabela += 0.78 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1794") JurosDeTabela += 0.6 / 100;
            Resultado.data.classificacoesDosTitulosDaTabelaDeVenda.forEach((Classificacao) => {
              Classificacao.condicoesDaTabelaDeVenda.forEach((Condicao) => {
                if (Condicao.classificacao.id == 4) {
                  let Entrada = 0;
                  Resultado.data.classificacoesDosTitulosDaTabelaDeVenda.forEach((_Classificacao) => {
                    _Classificacao.condicoesDaTabelaDeVenda.forEach((_Condicao) => {
                      if (_Condicao.classificacao.id != 4 && _Condicao.descricao == Condicao.descricao) {
                        Entrada += _Condicao.valorTotal ?? 0;
                      }
                    });
                  });
                  Condicao.valorTotal = pmt(JurosDeTabela, Condicao.qtdeDeTitulos, props.getObjectIdentificador!?.valorAVista - Entrada) * Condicao.qtdeDeTitulos;
                  Condicao.principal = pmt(JurosDeTabela, Condicao.qtdeDeTitulos, props.getObjectIdentificador!?.valorAVista - Entrada);
                  Condicao.jurosDeTabela = JurosDeTabela;
                }
              });
            });
          }
          props.setSalesTableOriginal(Resultado.data)
          props.setModelosDeVenda(CondicoesDaTabelaDeVenda.sort((a, b) => a.localeCompare(b)));
        } else { }
      } catch { }
      setVisibleModalSalesRoom(false);
      setLoading(false);
    } else {
      console.log('ERROR ESTRUTURA DE COMISSAO', Response);
      setLoading(false);
      setMessage1("Erro!"); setMessage2("Entre em contato com a equipe de desenvolvimento!"); setShowToast(true)
    }
  }

  async function SearchId() {
    setLoad(true);
    let Response = await Controllers.Venda.GavComissao(DataLogin?.token, SelectedCompany?.id, getIdLinked);
    if (Math.floor(Response.status / 100) == 2) {
      let arrGav = {
        salaDeVendas: {
          id: -1,
          descricao: Response.data[0].descricao,
          observacao: "",
          logradouro: "",
          numero: "",
          complemento: "",
          bairro: "",
          cidade: Response.data[0].cidade,
          uf: "",
          cep: "",
        },
        comissionados: [
            {
                desabilitarSelecao: false,
                cpf: Response.data[0].liner?.cpf ?? "",
                nome: Response.data[0].liner?.descricao ?? " ",
                cargo: "Liner",
                pessoa: {
                    id: -1,
                    cpf: Response.data[0].liner?.cpf ?? "",
                    nome: Response.data[0].liner?.descricao ?? "",
                    status: undefined,
                    natureza: 0,
                    dataDeNascimento: new Date(),
                    emails: [],
                    salasDeVenda: undefined,
                    documentoPessoal: undefined,
                    rg: undefined,
                    creci: undefined,
                    estadoCivil: undefined,
                    documentoDeEstadoCivil: undefined,
                    regimeDeBens: undefined,
                    cargo: {
                        id: -1,
                        nome: "Liner",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    },
                    cargos: [{
                        id: -1,
                        nome: "Liner",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    }],
                    ocupacao: undefined,
                    necessarioAssinaturaDoConjuge: false,
                    conjuge: undefined,
                    endereco: undefined,
                    documentoEndereco: undefined,
                    telefones: undefined,
                    tokenDeNotificacao: undefined,
                    pjVinculado: undefined,
                    liderResponsavel: undefined,
                    nacionalidade: undefined,
                    obervacao: undefined
                },
                pessoas: [{
                    id: -1,
                    cpf: Response.data[0].liner?.cpf ?? "",
                    nome: Response.data[0].liner?.descricao ?? " ",
                    status: undefined,
                    natureza: 0,
                    dataDeNascimento: new Date(),
                    emails: [],
                    salasDeVenda: undefined,
                    documentoPessoal: undefined,
                    rg: undefined,
                    creci: undefined,
                    estadoCivil: undefined,
                    documentoDeEstadoCivil: undefined,
                    regimeDeBens: undefined,
                    cargo: {
                        id: -1,
                        nome: "Liner",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    },
                    cargos: [{
                        id: -1,
                        nome: "Liner",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    }],
                    ocupacao: undefined,
                    necessarioAssinaturaDoConjuge: false,
                    conjuge: undefined,
                    endereco: undefined,
                    documentoEndereco: undefined,
                    telefones: undefined,
                    tokenDeNotificacao: undefined,
                    pjVinculado: undefined,
                    liderResponsavel: undefined,
                    nacionalidade: undefined,
                    obervacao: undefined
                }],
                valorBase: 0,
                percentual: 0,
                valorFinal: 0,
                indireto: true,
                sobreRecebimento: true,
                parcelamento: 1,
                tipo: 1,
                salaDeVendas: undefined,
                regraGeral: undefined
            },
            {
                desabilitarSelecao: false,
                cpf: Response.data[0].closer?.cpf ?? "",
                nome: Response.data[0].closer?.descricao ?? " ",
                cargo: "Closer",
                pessoa: {
                    id: -1,
                    cpf: Response.data[0].closer?.cpf ?? "",
                    nome: Response.data[0].closer?.descricao ?? " ",
                    status: undefined,
                    natureza: 0,
                    dataDeNascimento: new Date(),
                    emails: [],
                    salasDeVenda: undefined,
                    documentoPessoal: undefined,
                    rg: undefined,
                    creci: undefined,
                    estadoCivil: undefined,
                    documentoDeEstadoCivil: undefined,
                    regimeDeBens: undefined,
                    cargo: {
                        id: -1,
                        nome: "Closer",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    },
                    cargos: [{
                        id: -1,
                        nome: "Closer",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    }],
                    ocupacao: undefined,
                    necessarioAssinaturaDoConjuge: false,
                    conjuge: undefined,
                    endereco: undefined,
                    documentoEndereco: undefined,
                    telefones: undefined,
                    tokenDeNotificacao: undefined,
                    pjVinculado: undefined,
                    liderResponsavel: undefined,
                    nacionalidade: undefined,
                    obervacao: undefined
                },
                pessoas: [{
                    id: -1,
                    cpf: Response.data[0].closer?.cpf ?? "",
                    nome: Response.data[0].closer?.descricao ?? " ",
                    status: undefined,
                    natureza: 0,
                    dataDeNascimento: new Date(),
                    emails: [],
                    salasDeVenda: undefined,
                    documentoPessoal: undefined,
                    rg: undefined,
                    creci: undefined,
                    estadoCivil: undefined,
                    documentoDeEstadoCivil: undefined,
                    regimeDeBens: undefined,
                    cargo: {
                        id: -1,
                        nome: "Closer",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    },
                    cargos: [{
                        id: -1,
                        nome: "Closer",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    }],
                    ocupacao: undefined,
                    necessarioAssinaturaDoConjuge: false,
                    conjuge: undefined,
                    endereco: undefined,
                    documentoEndereco: undefined,
                    telefones: undefined,
                    tokenDeNotificacao: undefined,
                    pjVinculado: undefined,
                    liderResponsavel: undefined,
                    nacionalidade: undefined,
                    obervacao: undefined
                }],
                valorBase: 0,
                percentual: 0,
                valorFinal: 0,
                indireto: true,
                sobreRecebimento: true,
                parcelamento: 1,
                tipo: 1,
                salaDeVendas: undefined,
                regraGeral: undefined
            },
            {
                desabilitarSelecao: false,
                cpf: Response.data[0].pep?.cpf ?? "",
                nome: Response.data[0].pep?.descricao ?? " ",
                cargo: "PEP",
                pessoa: {
                    id: -1,
                    cpf: Response.data[0].pep?.cpf ?? "",
                    nome: Response.data[0].pep?.descricao ?? " ",
                    status: undefined,
                    natureza: 0,
                    dataDeNascimento: new Date(),
                    emails: [],
                    salasDeVenda: undefined,
                    documentoPessoal: undefined,
                    rg: undefined,
                    creci: undefined,
                    estadoCivil: undefined,
                    documentoDeEstadoCivil: undefined,
                    regimeDeBens: undefined,
                    cargo: {
                        id: -1,
                        nome: "PEP",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    },
                    cargos: [{
                        id: -1,
                        nome: "PEP",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    }],
                    ocupacao: undefined,
                    necessarioAssinaturaDoConjuge: false,
                    conjuge: undefined,
                    endereco: undefined,
                    documentoEndereco: undefined,
                    telefones: undefined,
                    tokenDeNotificacao: undefined,
                    pjVinculado: undefined,
                    liderResponsavel: undefined,
                    nacionalidade: undefined,
                    obervacao: undefined
                },
                pessoas: [{
                    id: -1,
                    cpf: Response.data[0].pep?.cpf ?? "",
                    nome: Response.data[0].pep?.descricao ?? " ",
                    status: undefined,
                    natureza: 0,
                    dataDeNascimento: new Date(),
                    emails: [],
                    salasDeVenda: undefined,
                    documentoPessoal: undefined,
                    rg: undefined,
                    creci: undefined,
                    estadoCivil: undefined,
                    documentoDeEstadoCivil: undefined,
                    regimeDeBens: undefined,
                    cargo: {
                        id: -1,
                        nome: "PEP",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    },
                    cargos: [{
                        id: -1,
                        nome: "PEP",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    }],
                    ocupacao: undefined,
                    necessarioAssinaturaDoConjuge: false,
                    conjuge: undefined,
                    endereco: undefined,
                    documentoEndereco: undefined,
                    telefones: undefined,
                    tokenDeNotificacao: undefined,
                    pjVinculado: undefined,
                    liderResponsavel: undefined,
                    nacionalidade: undefined,
                    obervacao: undefined
                }],
                valorBase: 0,
                percentual: 0,
                valorFinal: 0,
                indireto: true,
                sobreRecebimento: true,
                parcelamento: 1,
                tipo: 1,
                salaDeVendas: undefined,
                regraGeral: undefined
            },
            {
                desabilitarSelecao: false,
                cpf: Response.data[0].subGerenteDeSala?.cpf ?? "",
                nome: Response.data[0].subGerenteDeSala?.descricao ?? " ",
                cargo: "Sub gerente",
                pessoa: {
                    id: -1,
                    cpf: Response.data[0].subGerenteDeSala?.cpf ?? "",
                    nome: Response.data[0].subGerenteDeSala?.descricao ?? " ",
                    status: undefined,
                    natureza: 0,
                    dataDeNascimento: new Date(),
                    emails: [],
                    salasDeVenda: undefined,
                    documentoPessoal: undefined,
                    rg: undefined,
                    creci: undefined,
                    estadoCivil: undefined,
                    documentoDeEstadoCivil: undefined,
                    regimeDeBens: undefined,
                    cargo: {
                        id: -1,
                        nome: "Sub gerente",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    },
                    cargos: [{
                        id: -1,
                        nome: "Sub gerente",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    }],
                    ocupacao: undefined,
                    necessarioAssinaturaDoConjuge: false,
                    conjuge: undefined,
                    endereco: undefined,
                    documentoEndereco: undefined,
                    telefones: undefined,
                    tokenDeNotificacao: undefined,
                    pjVinculado: undefined,
                    liderResponsavel: undefined,
                    nacionalidade: undefined,
                    obervacao: undefined
                },
                pessoas: [{
                    id: -1,
                    cpf: Response.data[0].subGerenteDeSala?.cpf ?? "",
                    nome: Response.data[0].subGerenteDeSala?.descricao ?? " ",
                    status: undefined,
                    natureza: 0,
                    dataDeNascimento: new Date(),
                    emails: [],
                    salasDeVenda: undefined,
                    documentoPessoal: undefined,
                    rg: undefined,
                    creci: undefined,
                    estadoCivil: undefined,
                    documentoDeEstadoCivil: undefined,
                    regimeDeBens: undefined,
                    cargo: {
                        id: -1,
                        nome: "Sub gerente",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    },
                    cargos: [{
                        id: -1,
                        nome: "Sub gerente",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    }],
                    ocupacao: undefined,
                    necessarioAssinaturaDoConjuge: false,
                    conjuge: undefined,
                    endereco: undefined,
                    documentoEndereco: undefined,
                    telefones: undefined,
                    tokenDeNotificacao: undefined,
                    pjVinculado: undefined,
                    liderResponsavel: undefined,
                    nacionalidade: undefined,
                    obervacao: undefined
                }],
                valorBase: 0,
                percentual: 0,
                valorFinal: 0,
                indireto: true,
                sobreRecebimento: true,
                parcelamento: 1,
                tipo: 1,
                salaDeVendas: undefined,
                regraGeral: undefined
            },
            {
                desabilitarSelecao: false,
                cpf: Response.data[0].gerenteDeSala?.cpf ?? "",
                nome: Response.data[0].gerenteDeSala?.descricao ?? " ",
                cargo: "Gerente",
                pessoa: {
                    id: -1,
                    cpf: Response.data[0].gerenteDeSala?.cpf ?? "",
                    nome: Response.data[0].gerenteDeSala?.descricao ?? " ",
                    status: undefined,
                    natureza: 0,
                    dataDeNascimento: new Date(),
                    emails: [],
                    salasDeVenda: undefined,
                    documentoPessoal: undefined,
                    rg: undefined,
                    creci: undefined,
                    estadoCivil: undefined,
                    documentoDeEstadoCivil: undefined,
                    regimeDeBens: undefined,
                    cargo: {
                        id: -1,
                        nome: "Gerente",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    },
                    cargos: [{
                        id: -1,
                        nome: "Gerente",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    }],
                    ocupacao: undefined,
                    necessarioAssinaturaDoConjuge: false,
                    conjuge: undefined,
                    endereco: undefined,
                    documentoEndereco: undefined,
                    telefones: undefined,
                    tokenDeNotificacao: undefined,
                    pjVinculado: undefined,
                    liderResponsavel: undefined,
                    nacionalidade: undefined,
                    obervacao: undefined
                },
                pessoas: [{
                    id: -1,
                    cpf: Response.data[0].gerenteDeSala?.cpf ?? "",
                    nome: Response.data[0].gerenteDeSala?.descricao ?? " ",
                    status: undefined,
                    natureza: 0,
                    dataDeNascimento: new Date(),
                    emails: [],
                    salasDeVenda: undefined,
                    documentoPessoal: undefined,
                    rg: undefined,
                    creci: undefined,
                    estadoCivil: undefined,
                    documentoDeEstadoCivil: undefined,
                    regimeDeBens: undefined,
                    cargo: {
                        id: -1,
                        nome: "Gerente",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    },
                    cargos: [{
                        id: -1,
                        nome: "Gerente",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    }],
                    ocupacao: undefined,
                    necessarioAssinaturaDoConjuge: false,
                    conjuge: undefined,
                    endereco: undefined,
                    documentoEndereco: undefined,
                    telefones: undefined,
                    tokenDeNotificacao: undefined,
                    pjVinculado: undefined,
                    liderResponsavel: undefined,
                    nacionalidade: undefined,
                    obervacao: undefined
                }],
                valorBase: 0,
                percentual: 0,
                valorFinal: 0,
                indireto: true,
                sobreRecebimento: true,
                parcelamento: 1,
                tipo: 1,
                salaDeVendas: undefined,
                regraGeral: undefined
            },
            {
                desabilitarSelecao: false,
                cpf: Response.data[0].promotor?.cpf ?? "",
                nome: Response.data[0].promotor?.descricao ?? " ",
                cargo: "Captador/Promotor",
                pessoa: {
                    id: -1,
                    cpf: Response.data[0].promotor?.cpf ?? "",
                    nome: Response.data[0].promotor?.descricao ?? " ",
                    status: undefined,
                    natureza: 0,
                    dataDeNascimento: new Date(),
                    emails: [],
                    salasDeVenda: undefined,
                    documentoPessoal: undefined,
                    rg: undefined,
                    creci: undefined,
                    estadoCivil: undefined,
                    documentoDeEstadoCivil: undefined,
                    regimeDeBens: undefined,
                    cargo: {
                        id: -1,
                        nome: "Captador/Promotor",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    },
                    cargos: [{
                        id: -1,
                        nome: "Captador/Promotor",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    }],
                    ocupacao: undefined,
                    necessarioAssinaturaDoConjuge: false,
                    conjuge: undefined,
                    endereco: undefined,
                    documentoEndereco: undefined,
                    telefones: undefined,
                    tokenDeNotificacao: undefined,
                    pjVinculado: undefined,
                    liderResponsavel: undefined,
                    nacionalidade: undefined,
                    obervacao: undefined
                },
                pessoas: [{
                    id: -1,
                    cpf: Response.data[0].promotor?.cpf ?? "",
                    nome: Response.data[0].promotor?.descricao ?? " ",
                    status: undefined,
                    natureza: 0,
                    dataDeNascimento: new Date(),
                    emails: [],
                    salasDeVenda: undefined,
                    documentoPessoal: undefined,
                    rg: undefined,
                    creci: undefined,
                    estadoCivil: undefined,
                    documentoDeEstadoCivil: undefined,
                    regimeDeBens: undefined,
                    cargo: {
                        id: -1,
                        nome: "Captador/Promotor",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    },
                    cargos: [{
                        id: -1,
                        nome: "Captador/Promotor",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    }],
                    ocupacao: undefined,
                    necessarioAssinaturaDoConjuge: false,
                    conjuge: undefined,
                    endereco: undefined,
                    documentoEndereco: undefined,
                    telefones: undefined,
                    tokenDeNotificacao: undefined,
                    pjVinculado: undefined,
                    liderResponsavel: undefined,
                    nacionalidade: undefined,
                    obervacao: undefined
                }],
                valorBase: 0,
                percentual: 0,
                valorFinal: 0,
                indireto: true,
                sobreRecebimento: true,
                parcelamento: 1,
                tipo: 1,
                salaDeVendas: undefined,
                regraGeral: undefined
            },
            {
                desabilitarSelecao: false,
                cpf: Response.data[0].assessorTlmkt?.cpf ?? "",
                nome: Response.data[0].assessorTlmkt?.descricao ?? " ",
                cargo: "Assessor Tlmkt",
                pessoa: {
                    id: -1,
                    cpf: Response.data[0].assessorTlmkt?.cpf ?? "",
                    nome: Response.data[0].assessorTlmkt?.descricao ?? " ",
                    status: undefined,
                    natureza: 0,
                    dataDeNascimento: new Date(),
                    emails: [],
                    salasDeVenda: undefined,
                    documentoPessoal: undefined,
                    rg: undefined,
                    creci: undefined,
                    estadoCivil: undefined,
                    documentoDeEstadoCivil: undefined,
                    regimeDeBens: undefined,
                    cargo: {
                        id: -1,
                        nome: "Assessor Tlmkt",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    },
                    cargos: [{
                        id: -1,
                        nome: "Assessor Tlmkt",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    }],
                    ocupacao: undefined,
                    necessarioAssinaturaDoConjuge: false,
                    conjuge: undefined,
                    endereco: undefined,
                    documentoEndereco: undefined,
                    telefones: undefined,
                    tokenDeNotificacao: undefined,
                    pjVinculado: undefined,
                    liderResponsavel: undefined,
                    nacionalidade: undefined,
                    obervacao: undefined
                },
                pessoas: [{
                    id: -1,
                    cpf: Response.data[0].assessorTlmkt?.cpf ?? "",
                    nome: Response.data[0].assessorTlmkt?.descricao ?? " ",
                    status: undefined,
                    natureza: 0,
                    dataDeNascimento: new Date(),
                    emails: [],
                    salasDeVenda: undefined,
                    documentoPessoal: undefined,
                    rg: undefined,
                    creci: undefined,
                    estadoCivil: undefined,
                    documentoDeEstadoCivil: undefined,
                    regimeDeBens: undefined,
                    cargo: {
                        id: -1,
                        nome: "Assessor Tlmkt",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    },
                    cargos: [{
                        id: -1,
                        nome: "Assessor Tlmkt",
                        dataDeInicio: undefined,
                        dataDeTermino: undefined
                    }],
                    ocupacao: undefined,
                    necessarioAssinaturaDoConjuge: false,
                    conjuge: undefined,
                    endereco: undefined,
                    documentoEndereco: undefined,
                    telefones: undefined,
                    tokenDeNotificacao: undefined,
                    pjVinculado: undefined,
                    liderResponsavel: undefined,
                    nacionalidade: undefined,
                    obervacao: undefined
                }],
                valorBase: 0,
                percentual: 0,
                valorFinal: 0,
                indireto: true,
                sobreRecebimento: true,
                parcelamento: 1,
                tipo: 1,
                salaDeVendas: undefined,
                regraGeral: undefined
            },
        ]!?.filter((Item) => Item.nome != " "),
        contratoCEF: getIdLinked,
      } as any;
      props.setComissionControl!(arrGav);
      try {
        let Resultado = await Controllers.TabelaDeVenda.Get(DataLogin?.token, SelectedCompany?.id ?? 0, props.getObjectIdentificador?.empresaId ?? 0, props.getObjectIdentificador?.centroDeCustoSigla ?? "" , props.getObjectIdentificador?.localId ?? 0, props.getObjectIdentificador?.subLocalId ?? 0,
          TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto((() => {
            if (props.getObjectIdentificador) {
              switch (SelectedCompany?.id) {
                case 6:
                  return props.getObjectIdentificador.valorAVista;
                case 26:
                  return props.getObjectIdentificador.valorAVista;
                default:
                  return (props.getObjectIdentificador.valorAVista * (1 - (props.getTaxaDeDescontoValorAVista ?? 0)) - arrGav.comissionados.filter((Item: Object_.Comissionado) => Item.indireto == false).reduce((Acumulado: number, Atual: Object_.Comissionado) => Acumulado + (Atual.valorBase ? Atual.valorBase : ((Atual.percentual ?? 0) * (props.getObjectIdentificador!?.valorAVista * (1 - (props.getTaxaDeDescontoValorAVista ?? 0))))), 0));
                }
            }
            else {
              return undefined;
            }
          })())));
        if (Math.floor(Resultado.status / 100) == 2) {
          let CondicoesDaTabelaDeVenda = [] as Array<string>;
          Resultado.data.classificacoesDosTitulosDaTabelaDeVenda.forEach(Classificacao => {
            Classificacao.condicoesDaTabelaDeVenda.forEach(Condicao => {
              if (!CondicoesDaTabelaDeVenda.find(Item => Item == Condicao.descricao)) CondicoesDaTabelaDeVenda.push(Condicao.descricao);
            })
          });
          let JurosDeTabela = 0;
          if (props.getObjectIdentificador && (SelectedCompany?.id == 26 || SelectedCompany?.id == 6)) {
            if (props.getObjectIdentificador.centroDeCustoSigla == "RAIZA") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "BELGO") JurosDeTabela += 0.083 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1529") JurosDeTabela += 0.8 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1538") JurosDeTabela += 0.8 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1539") JurosDeTabela += 0.8 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1610") JurosDeTabela += 0.8 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1635") JurosDeTabela += 0.6 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "NORPA") JurosDeTabela += 0.6 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "CIDFL") JurosDeTabela += 0.4153 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0049") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0065") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0124") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0145") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0170") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0189") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0259") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0287") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0290") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0326") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0374") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0379") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0386") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0404") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0429") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0440") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0473") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0631") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0737") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0738") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0746") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0758") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0790") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0999") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1009") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1014") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1042") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1044") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1051") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1458") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1463") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1476") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1489") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1512") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1521") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1526") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1533") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1536") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1554") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1618") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1734") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1785") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1790") JurosDeTabela += 0.7 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "0648") JurosDeTabela += 0.78 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1029") JurosDeTabela += 0.78 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1030") JurosDeTabela += 0.78 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1031") JurosDeTabela += 0.78 / 100;
            if (props.getObjectIdentificador.centroDeCustoSigla == "1794") JurosDeTabela += 0.6 / 100;
            Resultado.data.classificacoesDosTitulosDaTabelaDeVenda.forEach((Classificacao) => {
              Classificacao.condicoesDaTabelaDeVenda.forEach((Condicao) => {
                if (Condicao.classificacao.id == 4) {
                  let Entrada = 0;
                  Resultado.data.classificacoesDosTitulosDaTabelaDeVenda.forEach((_Classificacao) => {
                    _Classificacao.condicoesDaTabelaDeVenda.forEach((_Condicao) => {
                      if (_Condicao.classificacao.id != 4 && _Condicao.descricao == Condicao.descricao) {
                        Entrada += _Condicao.valorTotal ?? 0;
                      }
                    });
                  });
                  Condicao.valorTotal = pmt(JurosDeTabela, Condicao.qtdeDeTitulos, props.getObjectIdentificador!?.valorAVista - Entrada) * Condicao.qtdeDeTitulos;
                  Condicao.principal = pmt(JurosDeTabela, Condicao.qtdeDeTitulos, props.getObjectIdentificador!?.valorAVista - Entrada);
                  Condicao.jurosDeTabela = JurosDeTabela;
                }
              });
            });
          }
          props.setSalesTableOriginal(Resultado.data)
          props.setModelosDeVenda(CondicoesDaTabelaDeVenda.sort((a, b) => a.localeCompare(b)));
        } else { }
      } catch { }
      setLoad(false);
    } else {
      setMessage1("Erro!"); setMessage2("Não foi possível trazer os IDs. Entre em contato com a equipe de desenvolvimento!"); setShowToast(true)
      setLoad(false);
    }
  }

  async function ValidatingData(): Promise<boolean> {
    if (props.getComissionControl.comissionados.find(Item => !Item.pessoa)) {
      setMessage1(`Nem todos os cargos foram definidos`); setMessage2('Se não selecionou a sala de vendas, selecione e em seguida clique no botão ao lado para consultar a estrutura de comissão'); setShowToast(true)
      return false;
    }
    if (props.getComissionControl.comissionados.length == 0) {
    setMessage1(`Estrutura de comissão não consultada`); setMessage2('Se não selecionou a sala de vendas, selecione e em seguida clique no botão ao lado para consultar a estrutura de comissão'); setShowToast(true)
      return false;
    }
    return true
  }
  

  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <Modals.ModalLoading transparent={true} visible={getLoad} />
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
          <Styled.ContainerHeader style={{marginTop: Platform.OS === 'ios' ? '15%' : '5%', opacity: getShowToast ? 0 : 1}}>
            <Styled.Number activeOpacity={0.9} onPress={async () => {
              props.setVisibleCommissionControl(false);
              props.setVisibleProductData(true);
            }}>
              <Styled.TextNumber>3</Styled.TextNumber>
            </Styled.Number>
            <Styled.TextHeader>Controle de comissão</Styled.TextHeader>
            <TouchableOpacity onPress={props.goHome}>
              <SvgCss xml={Home} />
            </TouchableOpacity>
          </Styled.ContainerHeader>
          
            {SelectedCompany?.id != 4 && (SelectedCompany?.id != 27  || DataLogin?.pessoa?.id != 1) &&
            <>
              <Styled.SubContainer>
                <Styled.TouchableContainer activeOpacity={0.9} onPress={() => {setVisibleModalSalesRoom(true)}}>
                  <View style={{flexDirection: 'row'}}>
                    <Styled.TextInput>Sala de Vendas:</Styled.TextInput>
                    <Styled.TextInput style={{marginLeft: '2%', width: "75%"}}>{props.getComissionControl!?.salaDeVendas ? `${props.getComissionControl!?.salaDeVendas!?.descricao?.substring(0, 20)}...` : "Selecione"}</Styled.TextInput>
                  </View>
                  <Modals.MultipleSelections
                    loading={getLoading}
                    visible2={getLoading}
                    marginLeft="12%"
                    title="Sala de Vendas"
                    visible={getVisibleModalSalesRoom}
                    onPressClose={() => {setVisibleModalSalesRoom(false)}}
                    data={props.getSalesRooms}
                    renderItem={({item}) =>
                      <Styled.ItemContainer onPress={async () => {
                        await CommissionStructure(item.salaDeVendas);
                        props.setSaleRoom(item);
                      }}>
                        <Styled.Item>
                          <Styled.TextItem>{item?.salaDeVendas.descricao}</Styled.TextItem>
                        </Styled.Item>
                      </Styled.ItemContainer>}
                  />
                </Styled.TouchableContainer>
              </Styled.SubContainer>
                
              <FlatList
                style={{marginBottom: '10%', marginTop: '5%'}}
                data={props.getComissionControl?.comissionados}
                renderItem={({item}) =>
                <Styled.Commissioned>
                    <Styled.Place>{item?.cargo}</Styled.Place>
                    <Styled.TouchableContainer activeOpacity={0.9} onPress={() => {
                      setVisibleModalCommissioned(true);
                      setPerson(item?.pessoas);
                    }}>
                      <View style={{flexDirection: 'row'}}>
                        <Styled.TextInput>Comissionados:</Styled.TextInput>
                        <Styled.TextInput style={{marginLeft: '2%', width: "65%"}}>{item.pessoa?.nome}</Styled.TextInput>
                      </View>
                      <Modals.MultipleSelections
                        marginLeft="12%"
                        title="Comissionados"
                        search={true}
                        visible={getVisibleModalCommissioned}
                        onPressClose={() => {setVisibleModalCommissioned(false)}}
                        data={getPerson}
                        renderItem={(person) => (
                          <Styled.ItemContainer onPress={ async () => {
                            item.pessoa = person.item
                            setVisibleModalCommissioned(false);
                          }}>
                            <Styled.Item>
                              <Styled.TextItem>{person?.item.nome}</Styled.TextItem>
                            </Styled.Item>
                          </Styled.ItemContainer>
                        )}
                      />
                    </Styled.TouchableContainer>
                    <Styled.InputContainer>
                      <View style={{flexDirection: 'row'}}>
                        <Styled.TextInput>CPF / CNPJ:</Styled.TextInput>
                        <Styled.TextInput style={{width: ResponsiveWidth('65%'), marginLeft:'2%', color: 'rgba(255, 255, 255, 0.7)'}}>{item.pessoa?.cpf!?.length > 11 ? TextFormat.CNPJ.FormatarTexto(item.pessoa?.cpf) : TextFormat.CNPJ.FormatarTexto(item.pessoa?.cpf)}</Styled.TextInput>
                      </View>
                    </Styled.InputContainer>
                    <Styled.InputContainer>
                      <View style={{flexDirection: 'row'}}>
                        <Styled.TextInput>Valor:</Styled.TextInput>
                        <Styled.TextInput style={{width: ResponsiveWidth('65%'), marginLeft:'2%', color: 'rgba(255, 255, 255, 0.7)'}}>{TextFormat.Moeda.FormatarTexto(item.valorFinal)}</Styled.TextInput>
                      </View>
                    </Styled.InputContainer>
                  </Styled.Commissioned>
                }
              />
            </>}


            {SelectedCompany.id == 4 &&
            <>
              <Styled.SubContainer>
                <Styled.ViewContainer>
                  <View style={{flexDirection: 'row'}}>
                    <Styled.TextInput>Id vinc.:</Styled.TextInput>
                    <Styled.Input
                      style={{width: ResponsiveWidth('65%'), height: Platform.OS == 'android' ? 40 : undefined, top: Platform.OS == 'android' ? -10 : undefined}}
                      onChangeText={async (value: string) => {
                        setIdLinked(value);
                      }}
                    >{getIdLinked}</Styled.Input>
                  </View>
                </Styled.ViewContainer>
              </Styled.SubContainer>
              <Styled.Search 
                onPress={ async () => {SearchId()}}
                activeOpacity={0.8}>
                  <Styled.TextSubmit>Buscar</Styled.TextSubmit>
              </Styled.Search>
              <FlatList
                style={{marginBottom: '25%'}}
                data={props.getComissionControl?.comissionados}
                renderItem={({item}) => 
                <>
                  <Modals.MultipleSelections
                    marginLeft="12%"
                    title="Comissionados"
                    search={true}
                    visible={getVisibleModalCommissioned}
                    onPressClose={() => {setVisibleModalCommissioned(false)}}
                    data={getPerson}
                    renderItem={(person) => (
                      <Styled.ItemContainer onPress={ async () => {
                        item.pessoa = person.item
                        setVisibleModalCommissioned(false);
                      }}>
                        <Styled.Item>
                          <Styled.TextItem>{person?.item.nome}</Styled.TextItem>
                        </Styled.Item>
                      </Styled.ItemContainer>
                    )}
                  />
                  <Commissioned
                    title={item.cargo}
                    cpf_cnpj={item.pessoa?.cpf!?.length > 11 ? TextFormat.CNPJ.FormatarTexto(item.pessoa?.cpf) : TextFormat.CNPJ.FormatarTexto(item.pessoa?.cpf)}
                    person={item.pessoa?.nome}
                    value={TextFormat.Moeda.FormatarTexto(item?.valorBase ? item?.valorBase : ((item?.percentual ?? 0) * (props.getSelectedUnity?.valorAVista ?? 0)))}
                    onPress={() => {
                      setPerson(item.pessoas);
                      setVisibleModalCommissioned(true);
                    }}
                  />
                </>
                }
              />
            </>}


            {SelectedCompany.id == 27 && DataLogin?.pessoa?.id == 1 &&
            <>
              <Styled.SubContainer>
                <Styled.TouchableContainer activeOpacity={0.9} onPress={() => {setVisibleModalSalesRoom(true)}}>
                  <View style={{flexDirection: 'row'}}>
                    <Styled.TextInput>Sala de Vendas:</Styled.TextInput>
                    <Styled.TextInput style={{marginLeft: '2%', width: "75%"}}>{props.getComissionControl!?.salaDeVendas ? `${props.getComissionControl!?.salaDeVendas!?.descricao?.substring(0, 20)}...` : "Selecione"}</Styled.TextInput>
                  </View>
                  <Modals.MultipleSelections
                    loading={getLoading}
                    visible2={getLoading}
                    marginLeft="12%"
                    title="Sala de Vendas"
                    visible={getVisibleModalSalesRoom}
                    onPressClose={() => {setVisibleModalSalesRoom(false)}}
                    data={props.getSalesRooms}
                    renderItem={({item}) =>
                      <Styled.ItemContainer onPress={async () => {
                        await CommissionStructure(item.salaDeVendas);
                        props.setSaleRoom(item);
                      }}>
                        <Styled.Item>
                          <Styled.TextItem>{item?.salaDeVendas.descricao}</Styled.TextItem>
                        </Styled.Item>
                      </Styled.ItemContainer>}
                  />
                </Styled.TouchableContainer>
              </Styled.SubContainer>
            </>}


            {props.getComissionControl.comissionados &&
              <Styled.ContainerSubmit>
              <Styled.Submit onPress={async () => {
                if((await ValidatingData()) == true) props.setVisiblePaymentPlan(true) 
              }} activeOpacity={0.8}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  <Styled.TextSubmit>Prosseguir</Styled.TextSubmit>
                  <SvgCss xml={ArrowGoButton} style={{marginLeft: '10%'}}/>
                </View>
              </Styled.Submit>
            </Styled.ContainerSubmit>}

            {/*MODALS*/}
            <>
              <Modals.PaymentPlan 
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
                visible={props.getVisiblePaymentPlan}
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
      </LinearGradient>
    </Modal>
  );
};