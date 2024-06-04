//#region React
import React, {useEffect, useState, SetStateAction, Dispatch} from 'react';
import {Modal, TouchableOpacity, View, Platform, SafeAreaView} from 'react-native';
//#endregion

//#region Icons
import {ArrowGoButton, Home} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Functions
import * as TextFormat from '../../../Themes/TextFormat';
//#endregion

//#region Reduxs
import {useSelector} from 'react-redux';
//#endregion

//#region Services
import * as Controllers from '../../../Services/Controllers';
import { Object_ } from '../../../Services/Objects';
//#endregion

//#region Styled
import { ToastMessage, Input, TouchInput } from '../../../Components';
import * as Styled from './styles';
import * as Modals from '../../Modals';
import { Type } from '../PaymentPlan/Modals/viewModel';
import { Comission } from '../../Catalog/Menu/PagesMenu/VendaDireta';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
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
}

export const ProductData = (props: Props) => {
  //#region variables
  const blurredColor = "rgba(255, 255, 255, 0.7)";
  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);
  //#endregion

  //#region useState
  const [getOriginalIdentificador, setOriginalIdentificador] = useState<Array<Object_.Identificador>>();
  const [getLoading, setLoading] = useState<boolean>(false);
  const [getVisibleModalEnterprises, setVisibleModalEnterprises] = useState<boolean>(false);
  const [getVisibleModalUnity, setVisibleModalUnity] = useState<boolean>(false);
  const [getOriginalCentroDeCusto, setOriginalCentroDeCusto] = useState<Array<Object_.CentroDeCusto>>();
  const [getShowToast, setShowToast] = useState<boolean>(false);
  const [getMessage1, setMessage1] = useState<string>("");
  const [getMessage2, setMessage2] = useState<string>("");
  //#endregion

  //#region functions
  async function CentroDeCusto() {
    let Response = await Controllers.CentroDeCusto.Get(DataLogin?.token, SelectedCompany?.id, undefined, undefined)
    if (Math.floor(Response.status / 100) === 2) {
      props.setCentroDeCusto(Response.data);
      setOriginalCentroDeCusto(Response.data);
    } else {
      console.log('ERRO', Response)
    }
  }

  async function Identificador(item: Object_.CentroDeCusto) {
    setLoading(true)
    props.setSelectedCentroDeCusto(item)
    if (props.getSalesTableOriginal) {
      {
        props.getSalesTableOriginal.classificacoesDosTitulosDaTabelaDeVenda.sort((a, b) => {
          if ((SelectedCompany?.id == 4 && a.classificacao.id == 2 ? 3.5 : a.classificacao.id ?? 0) > (SelectedCompany?.id == 4 && b.classificacao.id == 2 ? 3.5 : b.classificacao.id ?? 0)) return 1;
          if ((SelectedCompany?.id == 4 && a.classificacao.id == 2 ? 3.5 : a.classificacao.id ?? 0) < (SelectedCompany?.id == 4 && b.classificacao.id == 2 ? 3.5 : b.classificacao.id ?? 0)) return -1;
          return 0;
        }).forEach(ClassificacaoDosTitulosDaTabelaDeVenda => {
          if (ClassificacaoDosTitulosDaTabelaDeVenda?.condicoesDaTabelaDeVenda.find(_Item => _Item.descricao == props.getSelectedSalesModel)) {
            let setTitulos: | React.Dispatch<React.SetStateAction<Type.ViewModel>> | undefined;
            let CondicaoDaTabelaDeVenda = ClassificacaoDosTitulosDaTabelaDeVenda?.condicoesDaTabelaDeVenda.find(_Item => _Item.descricao == props.getSelectedSalesModel);
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
            if (setTitulos) setTitulos({
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
        });
      }
    }
    let Response = await Controllers.Identificador.Get(DataLogin?.token, SelectedCompany?.id, "0,2", true, item?.empresa.id, item?.sigla, undefined, undefined, false, false, undefined, undefined, undefined, undefined)
    if (Math.floor(Response.status / 100) === 2) {
      props.setIdentificador(Response.data);
      setOriginalIdentificador(Response.data);
      props.setSelectedUnity(undefined);
      props.setSelectedSalesModel(undefined);
      setLoading(false);
    } else {
      console.log("ERRO", Response)
      setLoading(false);
    }
  }

  async function SalesTable(item: Object_.IdentificadorSintetico) {
    setLoading(true);
    let Identificador = { ...item };
    Identificador.valorAVista = (Identificador.valorAVista ?? 0) * (1 - (props.getTaxaDeDescontoValorAVista ?? 0));
    props.setSelectedUnity(Identificador);
    props.setObjectIdentificador(item)
    let ResponseSalasDeVendas = (await Controllers.SalaDeVendas.Get(DataLogin?.token, SelectedCompany?.id, true, item?.empresaId, item?.centroDeCustoSigla)).data.map((Item) => {
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
            cep: Item.cep,
        } as Object_.SalaDeVenda,
        comissionados: [],
      }
    }).sort((a, b) => a.salaDeVendas.descricao > b.salaDeVendas.descricao ? 1 : -1);
    props.setSalesRooms(ResponseSalasDeVendas);
    setLoading(false);
    // let ResponseOrganograma = await Controllers.Organograma.Get(DataLogin?.token, SelectedCompany?.id ?? 0, false);
    // if (Math.floor(ResponseOrganograma.status / 100) == 2) {
    //   props.setOrganogramas(ResponseOrganograma.data);
    // }
  }

  function Toast() {
    setShowToast(false)
  }

  async function ValidatingData(): Promise<boolean> {
    if(!props.getSelectedCentroDeCusto?.descricao || !props.getSelectedCentroDeCusto) {
      setMessage1('Informe o empreendimento'); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
      return false
    }
    if(!props.getSelectedUnity?.subLocalDescricao || !props.getSelectedUnity) {
      setMessage1('Informe a unidade'); setMessage2('Todos os campos com o título não ofuscado são obrigatórios'); setShowToast(true)
      return false
    }
    return true
  }

  function SearchEnterprises(search: string) {
    let Filtered =  JSON.parse(JSON.stringify(getOriginalCentroDeCusto));
    props.setCentroDeCusto(Filtered.filter((data: Object_.CentroDeCusto) => data?.descricao?.includes(search.toUpperCase())));
  }

  function SearchUnity(search: string) {
    let Filtered =  JSON.parse(JSON.stringify(getOriginalIdentificador));
    props.setIdentificador(Filtered.filter((data: Object_.IdentificadorSintetico) => data.subLocalDescricao?.includes(search.toUpperCase())));
  }
  //#endregion

  //#region UseEffect
  useEffect(() => {
    CentroDeCusto();
  }, []);
  //#endregion

  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <SafeAreaView>
          <Styled.Container>
            <View style={{top: Platform.OS === 'ios' ? -5 : undefined}}>
              <ToastMessage
                showToast={getShowToast}
                hideToast={setShowToast}
                function={Toast}
                message1={getMessage1}
                message2={getMessage2}
              />
            </View>
            <Styled.ContainerHeader style={{ marginTop: Platform.OS === 'ios' ? '5%' : '5%', opacity: getShowToast ? 0 : 1}}>
              <Styled.Number activeOpacity={0.9} onPress={() => {
                props.setVisibleProductData(false);
                props.setVisibleProponent(true);
              }}>
                <Styled.TextNumber>2</Styled.TextNumber>
              </Styled.Number>
              <Styled.TextHeader>Dados do produto</Styled.TextHeader>
              <TouchableOpacity onPress={props.goHome}>
                <SvgCss xml={Home} />
              </TouchableOpacity>
            </Styled.ContainerHeader>
            <Styled.SubContainer>
            <TouchInput
              key='Empreendimento'
              onPress={() => {setVisibleModalEnterprises(true)}}
              selectedInput={props.getSelectedCentroDeCusto ? `${props.getSelectedCentroDeCusto?.descricao.substring(0, 15)}...` : ""} titleInput='Empreendimento'
            />
            <TouchInput
              key='Unidade'
              onPress={() => {setVisibleModalUnity(true)}}
              selectedInput={props.getSelectedUnity?.subLocalDescricao} titleInput='Unidade'
            />
            <Input
              key='Preço da unidade'
              value={props.getSelectedUnity?.subLocalDescricao ? TextFormat.Moeda.FormatarTexto(props.getSelectedUnity.valorAVista) : TextFormat.Moeda.FormatarTexto(0)}
              titleInput='Preço da unidade' placeholder={TextFormat.Moeda.FormatarTexto(0)} editable={false} placeholderTextColor={blurredColor} colorWithNothing={blurredColor}
            />
            <Input
              key='Valor de negociação'
              value={props.getSelectedUnity?.subLocalDescricao ? TextFormat.Moeda.FormatarTexto(props.getSelectedUnity.valorAVista * (1 - (props.getTaxaDeDescontoValorAVista ?? 0))) : TextFormat.Moeda.FormatarTexto(0)}
              titleInput='Valor de negociação' placeholder={TextFormat.Moeda.FormatarTexto(0)} editable={false} placeholderTextColor={blurredColor} colorWithNothing={blurredColor}
            />
            <Input
              key='Desconto'
              onChangeText={(text) => {
                let Valor = TextFormat.Numero.DesformatarTextoParaDecimal(text);
                if (Valor > 1 || Valor < 0) Valor = 0;
                props.setTaxaDeDescontoValorAVista(Valor);
                if (props.getObjectIdentificador) {
                  let Identificador = { ...props.getObjectIdentificador };
                  Identificador.valorAVista = (Identificador.valorAVista ?? 0) * (1 - (Valor ?? 0));
                  // setControleDeComissao({ ...getControleDeComissao, Identificador: Identificador, EstruturaConsultada: false });
                }
              }} value={TextFormat.Numero.FormatarTextoParaDecimal(props.getTaxaDeDescontoValorAVista ?? 0)} porcentage={true} titleInput='Desconto' placeholder={TextFormat.Moeda.FormatarTexto(0)} placeholderTextColor={blurredColor} colorWithNothing={blurredColor}
            />
            <Input
              key='Valor do Desconto'
              value={props.getObjectIdentificador?.subLocalDescricao ? TextFormat.Moeda.FormatarTexto(props.getObjectIdentificador.valorAVista * (props.getTaxaDeDescontoValorAVista ?? 0)) : TextFormat.Moeda.FormatarTexto(0)}
              titleInput='Valor do Desconto' placeholder={TextFormat.Moeda.FormatarTexto(0)} editable={false} placeholderTextColor={blurredColor} colorWithNothing={blurredColor}
            />
            </Styled.SubContainer>
            <Styled.ContainerSubmit>
              <Styled.Submit onPress={async () => {
                if((await ValidatingData()) == true) props.setVisibleCommissionControl(true)
              }} activeOpacity={0.8}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  <Styled.TextSubmit>Prosseguir</Styled.TextSubmit>
                  <SvgCss xml={ArrowGoButton} style={{marginLeft: '10%'}}/>
                </View>
              </Styled.Submit>
              {/*MODALS*/}
              <>
                <Modals.FilterEnterprises
                  loading={getLoading}
                  visible={getVisibleModalEnterprises}
                  visible2={getLoading}
                  data={props.getCentroDeCusto}
                  onChangeText={(event) => SearchEnterprises(event)}
                  onPressClose={async () => {setVisibleModalEnterprises(false)}}
                  renderItem={({item}) =>
                    <View>
                      <Styled.EnterprisesFiltered 
                        activeOpacity={0.5} 
                        onPress={ async () => {await Identificador(item); setVisibleModalEnterprises(false)}}>
                          <Styled.TextEnterprises>{item.descricao}</Styled.TextEnterprises>
                      </Styled.EnterprisesFiltered>
                    </View>
                  }
                />
                <Modals.MultipleSelections
                  loading={getLoading}
                  visible2={getLoading}
                  marginLeft="23%"
                  title="Unidade"
                  search={true}
                  visible={getVisibleModalUnity}
                  onPressClose={() => {setVisibleModalUnity(false)}}
                  onChangeText={(event) => {SearchUnity(event)}}
                  data={props.getIdentificador}
                  renderItem={({item}) => (
                    <Styled.ItemContainer onPress={ async () => {
                      await SalesTable(item);
                      setVisibleModalUnity(false);
                    }}>
                      <Styled.Item>
                        <Styled.TextItem>{item?.subLocalDescricao}</Styled.TextItem>
                      </Styled.Item>
                    </Styled.ItemContainer>
                  )}
                />
                
                <Modals.CommissionControl
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
                  visible={props.getVisibleCommissionControl}
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
            </Styled.ContainerSubmit>
          </Styled.Container>
        </SafeAreaView>
      </LinearGradient>
    </Modal>
  );
};