//#region React
import React, {Dispatch, SetStateAction, useState} from 'react';
import {
  Modal,
  TouchableOpacity,
  Platform,
  View,
  ScrollView,
} from 'react-native';
//#endregion

//#region Icons
import {ArrowGoButton, Home} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Functions
import { Object_ } from '../../../Services/Objects';
import * as TextFormat from '../../../Themes/TextFormat';
import { CalculosFinanceiros } from '../../../Functions';
//#endregion

//#region Reduxs
import {useSelector} from 'react-redux';
//#endregion

//#region Styled
import * as Modals from '..';
import { Type } from './Modals/viewModel';
import * as Styled from './styles';
import {Input, ToastMessage, TouchInput, Switch} from '../../../Components';
import { Comission } from '../../Catalog/Menu/PagesMenu/VendaDireta';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
import dayjs from 'dayjs'
//#endregion

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

export const PaymentPlan = (props: Props) => {

  const blurredColor = "rgba(255, 255, 255, 0.7)";
  const [getArrayTitles, setArrayTitles] = useState<(Type.ViewModel | undefined)[]>([]);

  const [getVisibleModalSalesTable, setVisibleModalSalesTable] = useState<boolean>(false);
  const [getVisibleModalEntry, setVisibleModalEntry] = useState<boolean>(false);
  const [getVisibleModalSignal, setVisibleModalSignal] = useState<boolean>(false);
  const [getVisibleModalPortion, setVisibleModalPortion] = useState<boolean>(false);
  const [getVisibleModalYearly, setVisibleModalYearly] = useState<boolean>(false);
  const [getVisibleModalIntermediacao, setVisibleModalIntermediacao] = useState<boolean>(false);
  const [getShowToast, setShowToast] = useState<boolean>(false);
  const [getMessage1, setMessage1] = useState<string>("");
  const [getMessage2, setMessage2] = useState<string>("");
  
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);

  async function ValidatingData(): Promise<boolean> {
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
    return true;
  }

  async function TogetherInformation(item: string) {
    props.setSelectedSalesModel(item);
    if (props.getSalesTableOriginal) {
      {
        props.getSalesTableOriginal?.classificacoesDosTitulosDaTabelaDeVenda.sort((a, b) => {
          if ((SelectedCompany?.id == 4 && a.classificacao.id == 2 ? 3.5 : a.classificacao.id ?? 0) > (SelectedCompany?.id == 4 && b.classificacao.id == 2 ? 3.5 : b.classificacao.id ?? 0)) return 1;
          if ((SelectedCompany?.id == 4 && a.classificacao.id == 2 ? 3.5 : a.classificacao.id ?? 0) < (SelectedCompany?.id == 4 && b.classificacao.id == 2 ? 3.5 : b.classificacao.id ?? 0)) return -1;
          return 0;
        }).forEach(ClassificacaoDosTitulosDaTabelaDeVenda => {
          if (ClassificacaoDosTitulosDaTabelaDeVenda?.condicoesDaTabelaDeVenda.find(_Item => _Item.descricao == item)) {
            let setTitulos: | Dispatch<SetStateAction<Type.ViewModel>> | undefined;
            let CondicaoDaTabelaDeVenda = ClassificacaoDosTitulosDaTabelaDeVenda?.condicoesDaTabelaDeVenda.find(_Item => _Item.descricao == item);
            switch (CondicaoDaTabelaDeVenda?.classificacao.id) {
              case 2:
                setTitulos = props.setTitulosDeSinal;
                break;
              case 3:
                setTitulos = props.setTitulosDeEntrada;
                break;
              case 4:
                setTitulos = props.setTitulosDeSaldo;
                break;
              case 11:
                setTitulos = props.setTitulosDeIntermediaria;
                break;
            }
            if (setTitulos) {
              setTitulos({
                ajustarSaldoAoValorAVista: props.getAjustarSaldoAoValorAVista,
                valorAVista: props.getTitulosDeEntrada.valorAVista,
                percentualDoTotal: props.getTitulosDeEntrada.percentualDoTotal,
                exibirComponente: false,
                totalEsperado: 0,
                titulo: CondicaoDaTabelaDeVenda?.classificacao.descricao ?? '',
                pv: undefined,
                jurosDeTabela: undefined,
                anexo: undefined,
                menorVencimento: new Date(),
                maiorVencimento: new Date(`12/31/${new Date().getFullYear() + 100}`),
                menorQuantidade: undefined,
                maiorQuantidade: undefined,
                titulos: []
              });
            }
          }
        });
      }
    }
    setTimeout(() => {
      for (let i = 1; i <= 14; i++) {
        let getTitulos: | Type.ViewModel | undefined;
        let setTitulos: | Dispatch<SetStateAction<Type.ViewModel>> | undefined;
        switch (i) {
          case 2:
            getTitulos = props.getTitulosDeSinal;
            setTitulos = props.setTitulosDeSinal;
            break;
          case 3:
            getTitulos = props.getTitulosDeEntrada;
            setTitulos = props.setTitulosDeEntrada;
            break;
          case 4:
            getTitulos = props.getTitulosDeSaldo;
            setTitulos = props.setTitulosDeSaldo;
            break;
          case 11:
            getTitulos = props.getTitulosDeIntermediaria;
            setTitulos = props.setTitulosDeIntermediaria;
            break;
        }

        if (getTitulos && setTitulos) {
          getTitulos.exibirComponente = false;
          getTitulos.titulos = [];
          setTitulos({ ...getTitulos });
        }
      }
      if (props.getSalesTableOriginal) {
        let PrimeiroVencimento: Date | undefined = undefined;
        props.getSalesTableOriginal.classificacoesDosTitulosDaTabelaDeVenda.sort((a, b) => {
          if ((SelectedCompany?.id == 4 && a.classificacao.id == 2 ? 3.5 : a.classificacao.id ?? 0) > (SelectedCompany?.id == 4 && b.classificacao.id == 2 ? 3.5 : b.classificacao.id ?? 0)) return 1;
          if ((SelectedCompany?.id == 4 && a.classificacao.id == 2 ? 3.5 : a.classificacao.id ?? 0) < (SelectedCompany?.id == 4 && b.classificacao.id == 2 ? 3.5 : b.classificacao.id ?? 0)) return -1;
          return 0;
        }).forEach(ClassificacaoDosTitulosDaTabelaDeVenda => {
          if (ClassificacaoDosTitulosDaTabelaDeVenda?.condicoesDaTabelaDeVenda.find(_Item => _Item.descricao == item)) {
            let getTitulos: | Type.ViewModel | undefined
            let setTitulos: | Dispatch<SetStateAction<Type.ViewModel>> | undefined
            let CondicaoDaTabelaDeVenda = ClassificacaoDosTitulosDaTabelaDeVenda?.condicoesDaTabelaDeVenda.find(_Item => _Item.descricao == item)

            switch (CondicaoDaTabelaDeVenda?.classificacao.id) {
              case 2:
                getTitulos = props.getTitulosDeSinal;
                setTitulos = props.setTitulosDeSinal;
                break;
              case 3:
                getTitulos = props.getTitulosDeEntrada;
                setTitulos = props.setTitulosDeEntrada;
                break;
              case 4:
                getTitulos = props.getTitulosDeSaldo;
                setTitulos = props.setTitulosDeSaldo;
                break;
              case 11:
                getTitulos = props.getTitulosDeIntermediaria;
                setTitulos = props.setTitulosDeIntermediaria;
                break;
            }
            if (getTitulos && setTitulos) {
              getTitulos.titulo = CondicaoDaTabelaDeVenda?.classificacao.descricao ?? "";
              PrimeiroVencimento = PrimeiroVencimento ? dayjs(PrimeiroVencimento).add(CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0, 'months').toDate() : (CondicaoDaTabelaDeVenda?.classificacao.id == 11 ? dayjs((dayjs((props.getTitulosDeIntermediacao.exibirComponente == true && props.getTitulosDeIntermediacao.titulos && props.getTitulosDeIntermediacao.titulos.length > 0)
                ? (() => {
                  let UltimoTitulo = props.getTitulosDeIntermediacao.titulos.sort((a, b) => b.valor - a.valor).sort((a, b) => dayjs(b.vencimento).add(b.quantidade, 'months').toDate().getTime() - dayjs(a.vencimento).add(a.quantidade, 'months').toDate().getTime())[0];
                  return dayjs(UltimoTitulo?.vencimento).add(UltimoTitulo?.quantidade, 'months').toDate();
                })()
                : props.getSelectedProposalDate))).add(1, 'years').toDate() : dayjs((dayjs((props.getTitulosDeIntermediacao.exibirComponente == true && props.getTitulosDeIntermediacao.titulos && props.getTitulosDeIntermediacao.titulos.length > 0)
                  ? (() => {
                    let UltimoTitulo = props.getTitulosDeIntermediacao.titulos.sort((a, b) => b.valor - a.valor).sort((a, b) => dayjs(b.vencimento).add(b.quantidade, 'months').toDate().getTime() - dayjs(a.vencimento).add(a.quantidade, 'months').toDate().getTime())[0];
                    return dayjs(UltimoTitulo?.vencimento).add(UltimoTitulo?.quantidade, 'months').toDate();
                  })()
                  : ((CondicaoDaTabelaDeVenda?.primeiroVencimento || new Date()) <= new Date() ? new Date() : CondicaoDaTabelaDeVenda?.primeiroVencimento)))).add(CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0, 'months').toDate());
              getTitulos.valorAVista = props.getObjectIdentificador?.valorAVista;
              getTitulos.percentualDoTotal = TextFormat.Numero.DesformatarTextoParaDecimal(TextFormat.Numero.FormatarTextoParaDecimal((
                (CondicaoDaTabelaDeVenda?.jurosDeTabela ?? 0) == 0 || CondicaoDaTabelaDeVenda?.sistemaDeAmortizacao != 1
                  ? TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto((CondicaoDaTabelaDeVenda?.valorTotal ?? 0) / (CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0))) * (CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0)
                  : TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(CalculosFinanceiros.PV(CondicaoDaTabelaDeVenda?.jurosDeTabela ?? 0, CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0, (CondicaoDaTabelaDeVenda?.valorTotal ?? 0) / (CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0))))) / (props.getObjectIdentificador?.valorAVista ?? 0)
              ));
              getTitulos.totalEsperado = (CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0) * TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(
                (CondicaoDaTabelaDeVenda?.jurosDeTabela ?? 0) == 0 || CondicaoDaTabelaDeVenda?.sistemaDeAmortizacao != 1
                  ? (CondicaoDaTabelaDeVenda?.valorTotal ?? 0) / (CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0)
                  : CalculosFinanceiros.PV(CondicaoDaTabelaDeVenda?.jurosDeTabela ?? 0, CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0, (CondicaoDaTabelaDeVenda?.valorTotal ?? 0) / (CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0)) / (CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0)
              ));
              getTitulos.totalEsperadoBase = (CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0) * TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(
                (CondicaoDaTabelaDeVenda?.jurosDeTabela ?? 0) == 0 || CondicaoDaTabelaDeVenda?.sistemaDeAmortizacao != 1
                  ? (CondicaoDaTabelaDeVenda?.valorTotal ?? 0) / (CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0)
                  : CalculosFinanceiros.PV(CondicaoDaTabelaDeVenda?.jurosDeTabela ?? 0, CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0, (CondicaoDaTabelaDeVenda?.valorTotal ?? 0) / (CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0)) / (CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0)
              ));
              if (CondicaoDaTabelaDeVenda?.classificacao.id == 14) { }
              else {
                getTitulos.menorQuantidade = 0;
                getTitulos.maiorQuantidade = CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 1;
                getTitulos.pv = SelectedCompany?.id == 6 && CondicaoDaTabelaDeVenda?.classificacao.id == 4 ? -CalculosFinanceiros.PV(props.getSalesTableOriginal!?.modeloDeVenda.jurosDeTabela, CondicaoDaTabelaDeVenda.qtdeDeTitulos, CondicaoDaTabelaDeVenda.principal) : undefined;
                getTitulos.jurosDeTabela = props.getSalesTableOriginal?.modeloDeVenda.jurosDeTabela;

                let Principal = TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto((CondicaoDaTabelaDeVenda?.jurosDeTabela ?? 0) == 0 || CondicaoDaTabelaDeVenda?.sistemaDeAmortizacao != 1 ? (CondicaoDaTabelaDeVenda?.valorTotal ?? 0) / (CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0)
                  : CalculosFinanceiros.PV(CondicaoDaTabelaDeVenda?.jurosDeTabela ?? 0, CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0, (CondicaoDaTabelaDeVenda?.valorTotal ?? 0) / (CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0)) / (CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0)));
                getTitulos.titulos = [
                  {
                    quantidade: CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0,
                    valor: Principal,
                    valorJuros: ((CondicaoDaTabelaDeVenda?.jurosDeTabela ?? 0) == 0 || CondicaoDaTabelaDeVenda?.sistemaDeAmortizacao != 1) ? Principal : TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(-CalculosFinanceiros.PMT(CondicaoDaTabelaDeVenda?.jurosDeTabela ?? 0, CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0, Principal * (CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0), 0, 0))),
                    valorTotal: Principal * (CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0),
                    valorTotalJuros: TextFormat.Moeda.DesformatarTexto(TextFormat.Moeda.FormatarTexto(((CondicaoDaTabelaDeVenda?.jurosDeTabela ?? 0) == 0 || CondicaoDaTabelaDeVenda?.sistemaDeAmortizacao != 1) ? (Principal * (CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0)) : -CalculosFinanceiros.PMT(CondicaoDaTabelaDeVenda?.jurosDeTabela ?? 0, CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0, Principal * (CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0), 0, 0))) * (CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0),
                    juros: CondicaoDaTabelaDeVenda?.jurosDeTabela ?? 0,
                    periodicidadeDosJuros: ClassificacaoDosTitulosDaTabelaDeVenda.classificacao.id == 11 ? 12 : 1,
                    sistemaDeAmortizacao: CondicaoDaTabelaDeVenda?.sistemaDeAmortizacao,
                    exibirCalendarioVencimento: false,
                    vencimento: CondicaoDaTabelaDeVenda?.classificacao.id == 11 ? dayjs(props.getSelectedProposalDate).add(1, 'years').toDate() : dayjs(PrimeiroVencimento).add(-(CondicaoDaTabelaDeVenda?.qtdeDeTitulos ?? 0), 'months').toDate(), //new Date(((CondicaoDaTabelaDeVenda?.primeiroVencimento || new Date()) <= new Date() ? new Date() : CondicaoDaTabelaDeVenda?.primeiroVencimento) ?? new Date()),
                    meioDePagamento: 'Boleto',
                    detalharMeioDePagamento: false,
                    banco: undefined,
                    agencia: undefined,
                    conta: undefined,
                    digitoDaConta: undefined,
                    titular: undefined,
                    numeroCheque: undefined,
                    maquina: undefined,
                    bandeira: undefined,
                    digitoCartao: undefined,
                    operacao: undefined,
                    nsu: undefined,
                    numeroDaOperacao: undefined
                  } as Type.Title
                ];
              }
              getTitulos.totalEsperadoBaseJuros = getTitulos.titulos.reduce((acumulado, atual) => acumulado + atual.quantidade, 0) * getTitulos.titulos.reduce((acumulado, atual) => acumulado + atual.valorJuros, 0);

              const valorEsperadoComArredondamento = parseFloat((getTitulos.percentualDoTotal * getTitulos.valorAVista!).toFixed(3));
              getTitulos.totalEsperado = valorEsperadoComArredondamento;
              getTitulos.totalEsperadoBase = valorEsperadoComArredondamento;
              getTitulos.totalEsperadoJuros = valorEsperadoComArredondamento;
              getTitulos.totalEsperadoBaseJuros = valorEsperadoComArredondamento;
              getTitulos.titulos[0].valorTotal = valorEsperadoComArredondamento;
              getTitulos.titulos[0].valor = getTitulos.titulos[0].valorTotal / getTitulos.titulos[0].quantidade;

              getTitulos.exibirComponente = true;
              setTitulos(getTitulos);
            }
          }
        });
      }
    }, 250);
  }

  function Toast() {
    setShowToast(false)
  }

  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <Styled.Container>
          <View style={{top: Platform.OS === 'ios' ? 35 : undefined}}>
            <ToastMessage
              showToast={getShowToast}
              hideToast={setShowToast}
              function={Toast}
              message1={getMessage1}
              message2={getMessage2}
            />
          </View>
          <Styled.ContainerHeader style={{marginTop: Platform.OS === 'ios' ? '15%' : '5%', opacity: getShowToast ? 0 : 1}}>
            <Styled.Number activeOpacity={0.9} onPress={() => {
              props.setVisiblePaymentPlan(false);
              props.setVisibleCommissionControl(true);
            }}>
              <Styled.TextNumber>4</Styled.TextNumber>
            </Styled.Number>
            <Styled.TextHeader>Plano de pagamento</Styled.TextHeader>
            <TouchableOpacity onPress={props.goHome}>
              <SvgCss xml={Home} />
            </TouchableOpacity>
          </Styled.ContainerHeader>
          <Styled.SubContainer>
          <TouchInput
            key='Modelo de Venda'
            onPress={() => {setVisibleModalSalesTable(true)}}
            selectedInput={props.getSelectedSalesModel?.substring(0, 20)} titleInput='Modelo de Venda'
          />
          <Styled.ContainerParcela>
            <Styled.TextParcela>{`Ajustar a última parcela?`}</Styled.TextParcela>
            <Switch
              size={25}
              onPress={() => {props.setAjustarSaldoAoValorAVista(previous => !previous)}}
              isEnabled={props.getAjustarSaldoAoValorAVista}
            />
          </Styled.ContainerParcela>
          </Styled.SubContainer>
          <ScrollView>
          {props.getSelectedSalesModel &&
          <>
            <View style={{height: 'auto', width: 'auto'}}>
              {props.getTitulosDeEntrada?.exibirComponente == true &&
                <Styled.Payment activeOpacity={0.5} onPress={() => {setVisibleModalEntry(true)}}>
                  <Styled.TextPayment>$ {props.getTitulosDeEntrada.titulo}</Styled.TextPayment>
                  <Modals.Entry
                    visible={getVisibleModalEntry}
                    getTitulosDeEntrada={props.getTitulosDeEntrada}
                    setTitulosDeEntrada={props.setTitulosDeEntrada}
                    getValorDescontadoTituloEntrada={props.getValorDescontadoTituloEntrada}
                    setValorDescontadoTituloEntrada={props.setValorDescontadoTituloEntrada}
                    setAjustarSaldoAoValorAVista={props.setAjustarSaldoAoValorAVista}
                    getAjustarSaldoAoValorAVista={props.getAjustarSaldoAoValorAVista}
                    setVisibleModalEntry={setVisibleModalEntry}
                  />
                </Styled.Payment>}
              {props.getTitulosDeSinal?.exibirComponente == true &&
                <Styled.Payment activeOpacity={0.5} onPress={() => {setVisibleModalSignal(true)}}>
                  <Styled.TextPayment>$ {props.getTitulosDeSinal.titulo}</Styled.TextPayment>
                  <Modals.Signal
                    visible={getVisibleModalSignal}
                    getTitulosDeSinal={props.getTitulosDeSinal}
                    setTitulosDeSinal={props.setTitulosDeSinal}
                    getValorDescontadoTituloSinal={props.getValorDescontadoTituloSinal}
                    setValorDescontadoTituloSinal={props.setValorDescontadoTituloSinal}
                    setAjustarSaldoAoValorAVista={props.setAjustarSaldoAoValorAVista}
                    getAjustarSaldoAoValorAVista={props.getAjustarSaldoAoValorAVista}
                    setVisibleModalSignal={setVisibleModalSignal}
                  />
                </Styled.Payment>}
              {props.getTitulosDeSaldo?.exibirComponente == true &&
                <Styled.Payment activeOpacity={0.5} onPress={() => {setVisibleModalPortion(true)}}>
                  <Styled.TextPayment>$ {props.getTitulosDeSaldo.titulo}</Styled.TextPayment>
                  <Modals.Portion
                    visible={getVisibleModalPortion}
                    getTitulosDeSaldo={props.getTitulosDeSaldo}
                    setTitulosDeSaldo={props.setTitulosDeSaldo}
                    getValorDescontadoTituloSaldo={props.getValorDescontadoTituloSaldo}
                    setValorDescontadoTituloSaldo={props.setValorDescontadoTituloSaldo}
                    setAjustarSaldoAoValorAVista={props.setAjustarSaldoAoValorAVista}
                    getAjustarSaldoAoValorAVista={props.getAjustarSaldoAoValorAVista}
                    setVisibleModalPortion={setVisibleModalPortion}
                  />
                </Styled.Payment>}
              {props.getTitulosDeIntermediaria?.exibirComponente == true &&
                <Styled.Payment activeOpacity={0.5} onPress={() => {setVisibleModalYearly(true)}}>
                  <Styled.TextPayment>$ {props.getTitulosDeIntermediaria.titulo}</Styled.TextPayment>
                  <Modals.Yearly
                    visible={getVisibleModalYearly}
                    getTitulosDeIntermediaria={props.getTitulosDeIntermediaria}
                    setTitulosDeIntermediaria={props.setTitulosDeIntermediaria}
                    getValorDescontadoTituloIntermediaria={props.getValorDescontadoTituloIntermediaria}
                    setValorDescontadoTituloIntermediaria={props.setValorDescontadoTituloIntermediaria}
                    setAjustarSaldoAoValorAVista={props.setAjustarSaldoAoValorAVista}
                    getAjustarSaldoAoValorAVista={props.getAjustarSaldoAoValorAVista}
                    setVisibleModalYearly={setVisibleModalYearly}
                  />
                </Styled.Payment>}
              {props.getTitulosDeIntermediacao?.exibirComponente == true &&
                <Styled.Payment activeOpacity={0.5} onPress={() => {setVisibleModalIntermediacao(true)}}>
                  <Styled.TextPayment>$ {props.getTitulosDeIntermediacao.titulo}</Styled.TextPayment>
                  <Modals.Intermediacao
                    visible={getVisibleModalIntermediacao}
                    getTitulosDeIntermediacao={props.getTitulosDeIntermediacao}
                    setTitulosDeIntermediacao={props.setTitulosDeIntermediacao}
                    getValorDescontadoTituloIntermediacao={props.getValorDescontadoTituloIntermediacao}
                    setValorDescontadoTituloIntermediacao={props.setValorDescontadoTituloIntermediacao}
                    setAjustarSaldoAoValorAVista={props.setAjustarSaldoAoValorAVista}
                    getAjustarSaldoAoValorAVista={props.getAjustarSaldoAoValorAVista}
                    setVisibleModalIntermediacao={setVisibleModalIntermediacao}
                  />
                </Styled.Payment>}
            </View>
            <Styled.SubContainer>
              <Input
                key='Preço da unidade'
                placeholderTextColor={blurredColor} colorWithNothing={blurredColor}
                value={props.getObjectIdentificador?.subLocalDescricao ? TextFormat.Moeda.FormatarTexto(props.getObjectIdentificador.valorAVista) : TextFormat.Moeda.FormatarTexto(0)} titleInput='Preço da unidade' placeholder="Nome e Sobrenome" editable={false}
              />
              <Input
                key='Valor de negociação'
                placeholderTextColor={blurredColor} colorWithNothing={blurredColor}
                value={props.getObjectIdentificador?.subLocalDescricao ? TextFormat.Moeda.FormatarTexto(props.getObjectIdentificador.valorAVista * (1 - (props.getTaxaDeDescontoValorAVista ?? 0))) : TextFormat.Moeda.FormatarTexto(0)} titleInput='Valor de negociação' placeholder="Nome e Sobrenome" editable={false}
              />
              <Input
                key='Valor da intermediação'
                placeholderTextColor={blurredColor} colorWithNothing={blurredColor}
                value={props.getObjectIdentificador ? TextFormat.Moeda.FormatarTexto(
                  props.getComissionControl.comissionados.filter((Item) => Item.indireto == false).reduce((Acumulado, Atual) => Acumulado + (Atual.valorBase ? Atual.valorBase : ((Atual.percentual ?? 0) * (props.getObjectIdentificador!?.valorAVista * (1 - (props.getTaxaDeDescontoValorAVista ?? 0))))), 0)
                ) : undefined} titleInput='Valor da intermediação' placeholder={TextFormat.Moeda.FormatarTexto(0)} editable={false}
              />
              <Input
                key='Valor da proposta'
                placeholderTextColor={blurredColor} colorWithNothing={blurredColor}
                value={
                  props.getObjectIdentificador ? TextFormat.Moeda.FormatarTexto(
                    (props.getTitulosDeEntrada.titulos.reduce((Acumulado, Atual) => {
                      if (Atual.teveAjuste && !!Atual.valorUltimaParcela) return Acumulado + (Atual.valorUltimaParcela + (Atual.valor * (Atual.quantidade - 1)))
                      return Acumulado + Atual.valorTotal
                    }, 0)) + (props.getValorDescontadoTituloEntrada ?? 0)
                    + (props.getTitulosDeSinal.titulos.reduce((Acumulado, Atual) => {
                      if (Atual.teveAjuste && !!Atual.valorUltimaParcela) return Acumulado + (Atual.valorUltimaParcela + (Atual.valor * (Atual.quantidade - 1)))
                      return Acumulado + Atual.valorTotal
                    }, 0)) + (props.getValorDescontadoTituloSinal ?? 0)
                    + (props.getTitulosDeIntermediaria.titulos.reduce((Acumulado, Atual) => {
                      if (Atual.teveAjuste && !!Atual.valorUltimaParcela) return Acumulado + (Atual.valorUltimaParcela + (Atual.valor * (Atual.quantidade - 1)))
                      return Acumulado + Atual.valorTotal
                    }, 0)) + (props.getValorDescontadoTituloIntermediaria ?? 0)
                    + (props.getTitulosDeSaldo.titulos.reduce((Acumulado, Atual) => {
                      if (Atual.teveAjuste && !!Atual.valorUltimaParcela) return Acumulado + (Atual.valorUltimaParcela + (Atual.valor * (Atual.quantidade - 1)))
                      return Acumulado + Atual.valorTotal
                    }, 0)) + (props.getValorDescontadoTituloSaldo ?? 0)
                  ) : undefined
                } titleInput='Valor da proposta' placeholder="Nome e Sobrenome" editable={false}
              />
              <Input
                key='Desconto aplicado'
                placeholderTextColor={blurredColor} colorWithNothing={blurredColor}
                value={(() => {
                  if (!props.getObjectIdentificador) return TextFormat.Moeda.FormatarTexto(0);
                  let ValorDaProposta = (props.getObjectIdentificador.valorAVista * (1 - (props.getTaxaDeDescontoValorAVista ?? 0)) - props.getComissionControl.comissionados.filter((Item) => Item.indireto == false).reduce((Acumulado, Atual) => Acumulado + (Atual.valorBase ? Atual.valorBase : ((Atual.percentual ?? 0) * (props.getObjectIdentificador!?.valorAVista * (1 - (props.getTaxaDeDescontoValorAVista ?? 0))))), 0))
                  let ValorGerado = (props.getTitulosDeEntrada.titulos.reduce((Acumulado, Atual) => {
                    if (Atual.teveAjuste && !!Atual.valorUltimaParcela) return Acumulado + (Atual.valorUltimaParcela + (Atual.valor * (Atual.quantidade - 1)))
                    return Acumulado + Atual.valorTotal
                  }, 0)
                    + (props.getTitulosDeSinal.titulos.reduce((Acumulado, Atual) => {
                      if (Atual.teveAjuste && !!Atual.valorUltimaParcela) return Acumulado + (Atual.valorUltimaParcela + (Atual.valor * (Atual.quantidade - 1)))
                      return Acumulado + Atual.valorTotal
                    }, 0)
                      + (props.getTitulosDeIntermediaria.titulos.reduce((Acumulado, Atual) => {
                        if (Atual.teveAjuste && !!Atual.valorUltimaParcela) return Acumulado + (Atual.valorUltimaParcela + (Atual.valor * (Atual.quantidade - 1)))
                        return Acumulado + Atual.valorTotal
                      }, 0)
                        + (props.getTitulosDeSaldo.titulos.reduce((Acumulado, Atual) => {
                          if (Atual.teveAjuste && !!Atual.valorUltimaParcela) return Acumulado + (Atual.valorUltimaParcela + (Atual.valor * (Atual.quantidade - 1)))
                          return Acumulado + Atual.valorTotal
                        }, 0)))));
                  if (ValorDaProposta > ValorGerado) return TextFormat.Moeda.FormatarTexto(Math.abs(ValorDaProposta - ValorGerado));
                  else return TextFormat.Moeda.FormatarTexto(0);
                })()} titleInput='Desconto aplicado' placeholder="Nome e Sobrenome" editable={false}
              />
              <Input
                key='Acréscimo aplicado'
                placeholderTextColor={blurredColor} colorWithNothing={blurredColor}
                value={(() => {
                  if (!props.getObjectIdentificador) return TextFormat.Moeda.FormatarTexto(0);
                  let ValorDaProposta = (props.getObjectIdentificador.valorAVista * (1 - (props.getTaxaDeDescontoValorAVista ?? 0)) - props.getComissionControl.comissionados.filter((Item) => Item.indireto == false).reduce((Acumulado, Atual) => Acumulado + (Atual.valorBase ? Atual.valorBase : ((Atual.percentual ?? 0) * (props.getObjectIdentificador!?.valorAVista * (1 - (props.getTaxaDeDescontoValorAVista ?? 0))))), 0))
                  let ValorGerado = (props.getTitulosDeEntrada.titulos.reduce((Acumulado, Atual) => Acumulado + Atual.valorTotal, 0) ?? 0)
                    + (props.getTitulosDeSinal.titulos.reduce((Acumulado, Atual) => Acumulado + Atual.valorTotal, 0) ?? 0)
                    + (props.getTitulosDeIntermediaria.titulos.reduce((Acumulado, Atual) => Acumulado + Atual.valorTotal, 0) ?? 0)
                    + (props.getTitulosDeSaldo.titulos.reduce((Acumulado, Atual) => Acumulado + Atual.valorTotal, 0) ?? 0);
                  if (ValorDaProposta < ValorGerado) return TextFormat.Moeda.FormatarTexto(Math.abs(ValorDaProposta - ValorGerado));
                  else return TextFormat.Moeda.FormatarTexto(0);
                })()} titleInput='Acréscimo aplicado' placeholder="Nome e Sobrenome" editable={false}
              />
              <Input
                key='Primeira prestação'
                placeholderTextColor={blurredColor} colorWithNothing={blurredColor}
                value={(() => {
                  let PrimeiroTitulo = [...props.getTitulosDeEntrada.titulos, ...props.getTitulosDeSinal.titulos, ...props.getTitulosDeSaldo.titulos, ...props.getTitulosDeIntermediacao.titulos].sort((a, b) => b.valor - a.valor).sort((a, b) => dayjs(a.vencimento).add(a.quantidade, 'months').toDate().getTime() - dayjs(b.vencimento).add(b.quantidade, 'months').toDate().getTime())[0];
                  let UltimoTitulo = [...props.getTitulosDeEntrada.titulos, ...props.getTitulosDeSinal.titulos, ...props.getTitulosDeSaldo.titulos, ...props.getTitulosDeIntermediacao.titulos].sort((a, b) => b.valor - a.valor).sort((a, b) => dayjs(b.vencimento).add(b.quantidade, 'months').toDate().getTime() - dayjs(a.vencimento).add(a.quantidade, 'months').toDate().getTime())[0];
                  return dayjs(PrimeiroTitulo?.vencimento).format('DD/MM/YYYY');
                })()} titleInput='Primeira prestação' placeholder="Nome e Sobrenome" editable={false}
              />
              <Input
                key='Última prestação'
                placeholderTextColor={blurredColor} colorWithNothing={blurredColor}
                value={(() => {
                  let PrimeiroTitulo = [...props.getTitulosDeEntrada.titulos, ...props.getTitulosDeSinal.titulos, ...props.getTitulosDeSaldo.titulos, ...props.getTitulosDeIntermediacao.titulos].sort((a, b) => b.valor - a.valor).sort((a, b) => dayjs(a.vencimento).add(a.quantidade, 'months').toDate().getTime() - dayjs(b.vencimento).add(b.quantidade, 'months').toDate().getTime())[0];
                  let UltimoTitulo = [...props.getTitulosDeEntrada.titulos, ...props.getTitulosDeSinal.titulos, ...props.getTitulosDeSaldo.titulos, ...props.getTitulosDeIntermediacao.titulos].sort((a, b) => b.valor - a.valor).sort((a, b) => dayjs(b.vencimento).add(b.quantidade, 'months').toDate().getTime() - dayjs(a.vencimento).add(a.quantidade, 'months').toDate().getTime())[0];
                  return `${dayjs(UltimoTitulo?.vencimento).add(UltimoTitulo?.quantidade, 'months').format('DD/MM/YYYY')} (${dayjs(UltimoTitulo?.vencimento).add(UltimoTitulo?.quantidade, 'months').diff(PrimeiroTitulo?.vencimento, 'months')} mese${dayjs(UltimoTitulo?.vencimento).add(UltimoTitulo?.quantidade, 'months').diff(PrimeiroTitulo?.vencimento, 'months') > 0 ? "s" : ""})`;
                })()} titleInput='Última prestação' placeholder="Nome e Sobrenome" editable={false}
              />
              <Input
                key='Valor do contrato'
                placeholderTextColor={blurredColor} colorWithNothing={blurredColor}
                value={props.getObjectIdentificador ? TextFormat.Moeda.FormatarTexto(
                  props.getComissionControl.comissionados.filter((Item) => Item.indireto == false).reduce((Acumulado, Atual) => Acumulado + (Atual.valorBase ? Atual.valorBase : ((Atual.percentual ?? 0) * (props.getObjectIdentificador!?.valorAVista * (1 - (props.getTaxaDeDescontoValorAVista ?? 0))))), 0)
                  + (props.getTitulosDeEntrada.titulos.reduce((Acumulado, Atual) => {
                    return Acumulado + Atual.valorTotal
                  }, 0))
                  + (props.getTitulosDeSinal.titulos.reduce((Acumulado, Atual) => {
                    return Acumulado + Atual.valorTotal
                  }, 0))
                  + (props.getTitulosDeIntermediaria.titulos.reduce((Acumulado, Atual) => {
                    return Acumulado + Atual.valorTotal
                  }, 0))
                  + (props.getTitulosDeSaldo.titulos.reduce((Acumulado, Atual) => {
                    return Acumulado + Atual.valorTotal
                  }, 0))
                ) : undefined
                } titleInput='Valor do contrato' placeholder="Nome e Sobrenome" editable={false}
              />
              <Input
                key='Total a ser pago'
                placeholderTextColor={blurredColor} colorWithNothing={blurredColor}
                value={
                  props.getObjectIdentificador ? TextFormat.Moeda.FormatarTexto(
                    props.getComissionControl.comissionados.filter((Item) => Item.indireto == false).reduce((Acumulado, Atual) => Acumulado + (Atual.valorBase ? Atual.valorBase : ((Atual.percentual ?? 0) * (props.getObjectIdentificador!?.valorAVista * (1 - (props.getTaxaDeDescontoValorAVista ?? 0))))), 0)
                    + (props.getTitulosDeEntrada.titulos.reduce((Acumulado, Atual) => {
                      return Acumulado + (Atual.sistemaDeAmortizacao == 1 ? Atual.valorTotalJuros : Atual.valorTotal)
                    }, 0))
                    + (props.getTitulosDeSinal.titulos.reduce((Acumulado, Atual) => {
                      return Acumulado + (Atual.sistemaDeAmortizacao == 1 ? Atual.valorTotalJuros : Atual.valorTotal)
                    }, 0))
                    + (props.getTitulosDeIntermediaria.titulos.reduce((Acumulado, Atual) => {
                      return Acumulado + (Atual.sistemaDeAmortizacao == 1 ? Atual.valorTotalJuros : Atual.valorTotal)
                    }, 0))
                    + (props.getTitulosDeSaldo.titulos.reduce((Acumulado, Atual) => {
                      return Acumulado + (Atual.sistemaDeAmortizacao == 1 ? Atual.valorTotalJuros : Atual.valorTotal)
                    }, 0))
                  ) : undefined
                } titleInput='Total a ser pago' placeholder="Nome e Sobrenome" editable={false}
              />
            </Styled.SubContainer>
            </>}
          </ScrollView>
          <Styled.ContainerSubmit>
            <Styled.Submit onPress={async() => { if( (await ValidatingData()) == true ) {
              props.setVisibleNegotiationCard(true);
            }}} activeOpacity={0.8}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Styled.TextSubmit>Prosseguir</Styled.TextSubmit>
                <SvgCss xml={ArrowGoButton} style={{marginLeft: '10%'}}/>
              </View>
            </Styled.Submit>
          </Styled.ContainerSubmit>

          
          {/*MODALS*/}
          <>
            <Modals.MultipleSelections
              marginLeft="10%"
              title="Modelo de Venda"
              search={true}
              visible={getVisibleModalSalesTable}
              onPressClose={() => {setVisibleModalSalesTable(false)}}
              data={props.getModelosDeVenda}
              renderItem={({item}) =>
                <Styled.ItemContainer onPress={async () => {
                  await TogetherInformation(item);
                  setVisibleModalSalesTable(false);
                  const view = [
                    props.getTitulosDeEntrada?.exibirComponente == true ? props.getTitulosDeEntrada : undefined,
                    props.getTitulosDeSinal?.exibirComponente == true ? props.getTitulosDeSinal : undefined,
                    props.getTitulosDeSaldo?.exibirComponente == true ? props.getTitulosDeSaldo : undefined,
                    props.getTitulosDeIntermediaria?.exibirComponente == true ? props.getTitulosDeIntermediaria : undefined,
                    props.getTitulosDeIntermediacao?.exibirComponente == true ? props.getTitulosDeIntermediacao : undefined,
                  ].filter(item => item != undefined);
                  setArrayTitles(view);
                  }}>
                  <Styled.Item>
                    <Styled.TextItem>{item}</Styled.TextItem>
                  </Styled.Item>
                </Styled.ItemContainer>}
            />
            <Modals.Files
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
              visible={props.getVisibleNegotiationCard}
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