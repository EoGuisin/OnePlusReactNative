//#region React
import React, {useState, SetStateAction, Dispatch} from 'react';
import {Modal, TouchableOpacity, Platform, View, ScrollView, SafeAreaView, PermissionsAndroid, FlatList} from 'react-native';
import moment from 'moment';
import dayjs from 'dayjs';
//#endregion

//#region Icons
import {ArrowBack, More, CancelTitle, ArrowGoButton} from '../../../../../Assets';
import { SvgCss } from 'react-native-svg';
//#endregion

//#region Animation
import Lottie from 'lottie-react-native';
import {SwipeDown, SwipeUp} from '../../../../../Animation';
//#endregion

//#region Functions
import { CalculosFinanceiros } from '../../../../../Functions';
import * as TextFormat from '../../../../../Themes/TextFormat';
import {ResponsiveWidth} from '../../../../../Functions';
//#endregion

//#region Styled
import { ToastMessage, Input, TouchInput, Annex } from '../../../../../Components';
import * as List from '../../../../../Data/List';
import * as Modals from '../../..';
import * as Styled from './styles';
import { Object_ } from '../../../../../Services/Objects';
import { Type } from '../viewModel';
//#endregion

//#region Externals Directorys
import {MotiTransitionProp, MotiView} from 'moti';
import {Easing} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {CameraOptions, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import DocumentPicker from 'react-native-document-picker'
import RNFetchBlob from 'rn-fetch-blob';
import {useDebouncedCallback} from 'use-debounce';
//#endregion

interface Props {
  visible: boolean;
  getTitulosDeSinal: Type.ViewModel,
  setTitulosDeSinal: Dispatch<SetStateAction<Type.ViewModel>>,
  getValorDescontadoTituloSinal: number;
  setValorDescontadoTituloSinal: Dispatch<SetStateAction<number>>,
  getAjustarSaldoAoValorAVista: boolean;
  setAjustarSaldoAoValorAVista: Dispatch<SetStateAction<boolean>>;
  setVisibleModalSignal:(value: boolean) => void,
}

dayjs.extend(require('dayjs/plugin/customParseFormat'));

export const Signal = (props: Props, Type: Type.ViewModel) => {
  //#region useState
  const [getDate] = useState<Date>(new Date());
  const [getOpen, setOpen] = useState<boolean>(false);
  const [getVisibleImage, setVisibleImage] = useState<boolean>(false);
  const [getVisiblePDF, setVisiblePDF] = useState<boolean>(false);
  const [getVisibleModalPaymentMethod, setVisibleModalPaymentMethod] = useState<boolean>(false);
  const [getVisibleModalCardMachine, setVisibleModalCardMachine] = useState<boolean>(false);
  const [getVisibleModalFlag, setVisibleModalFlag] = useState<boolean>(false);
  const [getVisibleModalOperation, setVisibleModalOperation] = useState<boolean>(false);
  const [getVisibleModalBank, setVisibleModalBank] = useState<boolean>(false);
  const [getSwipe, setSwipe] = useState<boolean>(false);
  const [getTitleIndex, setTitleIndex] = useState<number>(0);
  const [getShowToast, setShowToast] = useState<boolean>(false);
  const [getMessage1, setMessage1] = useState<string>("");
  const [getMessage2, setMessage2] = useState<string>("");
  const [getValorDesconto, setValorDesconto] = useState<number>(0);
  //#endregion

  //#region Variables
  const transition: MotiTransitionProp = {
    type: 'timing',
    duration: 200,
    easing: Easing.out(Easing.ease),
  };
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);
  //#endregion

  //#region Functions
  async function requestCameraPermission() {
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
        pickImageFromCamera()
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async function pickImageFromCamera() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchCamera(options);
    if (result?.assets) {
      let annex = {
        classificacao: 1,
        arquivo: result.assets[0].base64 ? result.assets[0].base64 : "",
        descricao: `14. Comp de pagamento (${props.getTitulosDeSinal.titulo.toLowerCase()})`,
        extensao: "jpg",
      }
      props.setTitulosDeSinal((prevState: Type.ViewModel) => {
        return({...prevState, anexo: annex});
      })
    }
  }

  async function pickImageFromGalery() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1, includeBase64: true}
    const result = await launchImageLibrary(options);
    if (result?.assets) {
      let annex = {
        classificacao: 1,
        arquivo: result.assets[0].base64 ? result.assets[0].base64 : "",
        descricao: `14. Comp de pagamento (${props.getTitulosDeSinal.titulo.toLowerCase()})`,
        extensao: "jpg",
      }
      props.setTitulosDeSinal((prevState: Type.ViewModel) => {
        return({...prevState, anexo: annex});
      })
    }
  }

  async function DocumentPDF() {
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
        let annex = {
          classificacao: 1,
          arquivo: data,
          descricao: `14. Comp de pagamento (${props.getTitulosDeSinal.titulo.toLowerCase()})`,
          extensao: "pdf",
        }
        props.setTitulosDeSinal((prevState: Type.ViewModel) => {
          return({...prevState, anexo: annex});
        })
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

  const calcularDescontoMaximo = () => {
    switch (SelectedCompany?.id) {
      case 4:
        if (props.getTitulosDeSinal.titulo == "Entrada") return 0;
        else return 15;
      default:
        return 100;
    }
  }

  const considerar2CasasDecimais = (value: number) => {
    if (!value.toString().includes('.')) return value;
    const index = value.toString().indexOf('.');
    return parseFloat(value.toString().substring(0, index + 3));
  }

  const hookSetViewModel = (viewModel: Type.ViewModel) => {
    props.setTitulosDeSinal((prevState: Type.ViewModel) => {
      return({...prevState, titulos: [...viewModel.titulos]});
    })
  }

  const debounceUltimaParcela = useDebouncedCallback((titulo: Type.Title) => {
    let valorTotalTitulos = considerar2CasasDecimais(props.getTitulosDeSinal.titulos.reduce((Acumulado, Atual) => {
        if (Atual.teveAjuste && !!Atual.valorUltimaParcela) return Acumulado + (Atual.valorUltimaParcela + (Atual.valor * (Atual.quantidade - 1)))
        return Acumulado + Atual.valorTotal
    }, 0))
    let totalCalculadoTitulo = considerar2CasasDecimais(titulo.quantidade * titulo.valor)
    if (titulo.valorTotal && (totalCalculadoTitulo != considerar2CasasDecimais(titulo.valorTotal))) { // Caso de arredondamento de centavos
        titulo.valorUltimaParcela = considerar2CasasDecimais((titulo.valorTotal - totalCalculadoTitulo) + titulo.valor)
        titulo.teveAjuste = true
    }
    else {
        titulo.valorUltimaParcela = undefined
        titulo.teveAjuste = false
    }
    hookSetViewModel({ ...props.getTitulosDeSinal, titulos: [...props.getTitulosDeSinal.titulos] })
  }, 500);

  const calcularDesconto = (valueNumber: number) => {
    if (props.getTitulosDeSinal.totalEsperadoBase) {
      let titulo = props.getTitulosDeSinal.titulos.find((Item) => Item.valorTotal !== 0)
      if (!titulo) return;
      props.getTitulosDeSinal.totalEsperado = considerar2CasasDecimais(props.getTitulosDeSinal.totalEsperadoBase - (props.getTitulosDeSinal.totalEsperadoBase * (valueNumber !== 0 ? (valueNumber / 100) : 0)))
      props.setValorDescontadoTituloSinal(props.getTitulosDeSinal.totalEsperadoBase - props.getTitulosDeSinal.totalEsperado)
      let totalEsperadoJuros
      if (props.getTitulosDeSinal.totalEsperadoBaseJuros) {
          totalEsperadoJuros = considerar2CasasDecimais(props.getTitulosDeSinal.totalEsperadoBaseJuros - (props.getTitulosDeSinal.totalEsperadoBaseJuros * (valueNumber !== 0 ? (valueNumber / 100) : 0)))
      }
      props.getTitulosDeSinal.totalEsperadoJuros = totalEsperadoJuros ?? props.getTitulosDeSinal.totalEsperado
      if (props.getTitulosDeSinal.titulos.length === 1) {
          titulo.valorTotal = props.getTitulosDeSinal.totalEsperado!
          titulo.valorTotalJuros = totalEsperadoJuros ?? props.getTitulosDeSinal.totalEsperado!
      } else {
          const indexTitulo = props.getTitulosDeSinal.titulos.findIndex((Item) => Item === titulo)
          titulo.valorTotal = considerar2CasasDecimais(props.getTitulosDeSinal.totalEsperado! - props.getTitulosDeSinal.titulos.reduce((Acumulado, Atual, idx) => Acumulado + (idx === indexTitulo ? 0 : Atual.valorTotal), 0))
          titulo.valorTotalJuros = totalEsperadoJuros ?? considerar2CasasDecimais(props.getTitulosDeSinal.totalEsperado! - props.getTitulosDeSinal.titulos.reduce((Acumulado, Atual, idx) => Acumulado + (idx === indexTitulo ? 0 : Atual.valorTotalJuros), 0))
      }
      titulo.valor = considerar2CasasDecimais(titulo.valorTotal / titulo.quantidade)
      titulo.valorJuros = considerar2CasasDecimais(titulo.valorTotalJuros / titulo.quantidade)
      hookSetViewModel({ ...props.getTitulosDeSinal, titulos: props.getTitulosDeSinal.titulos })
      debounceUltimaParcela(titulo);
    }
  }

  const debouncedCalcularDesconto = useDebouncedCallback((valueNumber: number) => {
    calcularDesconto(valueNumber)
  }, 500);

  function Desconto(value: string) {
    let number = Number(value);
    if (number > calcularDescontoMaximo()) {
      setMessage1("Desconto inválido"); setMessage2(`O desconto máximo permitido é de ${calcularDescontoMaximo()}%`); setShowToast(true)
      return;
    }
    if (value) value = calcularDescontoMaximo().toString();
    setValorDesconto(number);
    debouncedCalcularDesconto(number);
  }

  function Quantidade(value: string, Item: Type.Title) {
    let UltimoTitulo = [...props.getTitulosDeSinal.titulos].sort((a, b) => b.valor - a.valor).sort((a, b) => dayjs(a.vencimento).add(a.quantidade - 1, 'months').toDate().getTime() - dayjs(b.vencimento).add(b.quantidade - 1, 'months').toDate().getTime())[props.getTitulosDeSinal.titulos.length - 1];
    if (UltimoTitulo.teveAjuste && !!UltimoTitulo.valorUltimaParcela && props.getAjustarSaldoAoValorAVista) {
      let totalCalculado = considerar2CasasDecimais(UltimoTitulo.quantidade * UltimoTitulo.valor)
      if (UltimoTitulo.valorTotal && (totalCalculado != UltimoTitulo.valorTotal)) { // Caso de arredondamento de centavos
        UltimoTitulo.valorUltimaParcela = considerar2CasasDecimais((UltimoTitulo.valorTotal - totalCalculado) + UltimoTitulo.valor)
        UltimoTitulo.teveAjuste = true
      }
      else {
        UltimoTitulo.valorUltimaParcela = undefined
        UltimoTitulo.teveAjuste = false
      }
    }
    let Qtde = Number(value);
    Item.quantidade = Qtde;
    if (Item.valorTotal == 0 || !Item.valorTotal) {
      Item.valorTotal = Qtde === 0 ? 0 : considerar2CasasDecimais((props.getTitulosDeSinal.totalEsperado ?? 0) - props.getTitulosDeSinal.titulos.reduce((Acumulado, Atual, index) => {
        if (Atual === Item) return Acumulado;
        if (Atual.teveAjuste && !!Atual.valorUltimaParcela) return Acumulado + (Atual.valorUltimaParcela + (Atual.valor * (Atual.quantidade - 1)))
        return Acumulado + Atual.valorTotal
      }, 0))
    }
    Item.valor = considerar2CasasDecimais(SelectedCompany?.id == 6 ? CalculosFinanceiros.PMT(props.getTitulosDeSinal.jurosDeTabela ?? 0, Qtde, props.getTitulosDeSinal.pv ?? 0, 0, 0) : Item.valorTotal / Item.quantidade !== Infinity ? Item.valorTotal / Item.quantidade : 0);
    if (Item.sistemaDeAmortizacao === 1 && Item.juros > 0) {
      Item.valorJuros = considerar2CasasDecimais(- CalculosFinanceiros.PMT(Item.juros, props.getTitulosDeSinal.titulos.reduce((Acumulado, Atual) => Acumulado + Atual.quantidade, 0), props.getTitulosDeSinal.titulos.reduce((Acumulado, Atual) => Acumulado + Atual.valorTotal, 0), 0, 0));
      Item.valorTotalJuros = considerar2CasasDecimais(Qtde === 0 ? 0 : Item.valorJuros * Item.quantidade);
    }
    let totalCalculado = considerar2CasasDecimais(Item.quantidade * Item.valor);
    if (Item.valorTotal && !isNaN(totalCalculado) && (totalCalculado != Item.valorTotal)) { // Caso de arredondamento de centavos
      Item.valorUltimaParcela = considerar2CasasDecimais((Item.valorTotal - totalCalculado) + Item.valor)
      Item.teveAjuste = true
    }
    else {
      Item.valorUltimaParcela = undefined
      Item.teveAjuste = false
    }
    hookSetViewModel({ ...props.getTitulosDeSinal, titulos: [...props.getTitulosDeSinal.titulos] });
    const qtdeTotal = props.getTitulosDeSinal.titulos.reduce((acumulado, atual) => acumulado + atual.quantidade, 0);
    if (props.getTitulosDeSinal.maiorQuantidade && qtdeTotal > props.getTitulosDeSinal.maiorQuantidade) {
      setMessage1("Será necessária aprovação."); setMessage2("Quantidade de parcelas é superior ao definido no modelo de venda."); setShowToast(true)
    }
  }

  function Principal(value: string, Item: Type.Title) {
    let Valor = TextFormat.Moeda.DesformatarTexto(value);
    Item.valor = Valor;
    Item.valorTotal = considerar2CasasDecimais(Item.valor * Item.quantidade);
    if (Item.sistemaDeAmortizacao === 1 && Item.juros > 0) {
        Item.valorJuros = considerar2CasasDecimais(- CalculosFinanceiros.PMT(Item.juros, Item.quantidade, Valor * Item.quantidade, 0, 0))
        Item.valorTotalJuros = considerar2CasasDecimais(Item.valorJuros * Item.quantidade);
    }
    debounceUltimaParcela(Item);
    hookSetViewModel({ ...props.getTitulosDeSinal, titulos: [...props.getTitulosDeSinal.titulos] });
  }

  function Parcela(value: string, Item: Type.Title) {
    Item.valorJuros = TextFormat.Moeda.DesformatarTexto(value);
    Item.valorTotalJuros = considerar2CasasDecimais(Item.valorJuros * Item.quantidade);
    Item.valor = considerar2CasasDecimais(-CalculosFinanceiros.PV(Item.juros, Item.quantidade, Item.valorJuros) / Item.quantidade);
    Item.valorTotal = considerar2CasasDecimais(Item.valor * Item.quantidade);
    if (props.getAjustarSaldoAoValorAVista == true) debounceUltimaParcela(Item);
    hookSetViewModel({ ...props.getTitulosDeSinal, titulos: [...props.getTitulosDeSinal.titulos] });
  }

  function Total(value: string, Item: Type.Title) {
    Item.valorTotalJuros = TextFormat.Moeda.DesformatarTexto(value);
    Item.valorJuros = considerar2CasasDecimais(Item.valorTotalJuros / Item.quantidade);
    if (Item.sistemaDeAmortizacao == 1 && Item.juros > 0) {
      Item.valor = considerar2CasasDecimais(-CalculosFinanceiros.PV(Item.juros, Item.quantidade, Item.valorJuros) / Item.quantidade);
      Item.valorTotal = considerar2CasasDecimais(Item.valor * Item.quantidade);
    }
    else {
      Item.valor = Item.valorJuros;
      Item.valorTotal = Item.valorTotalJuros;
    }
    if (props.getAjustarSaldoAoValorAVista == true) debounceUltimaParcela(Item);
    hookSetViewModel({ ...props.getTitulosDeSinal, titulos: [...props.getTitulosDeSinal.titulos] });
  }

  function Maturity(date: Date, Item: Type.Title) {
    let dataSelecionada = dayjs(date!).toDate();
    if (SelectedCompany?.id == 4 && (Item.meioDePagamento = "Reaproveitamento")) {
        if (dataSelecionada.getDate() < 5) {
          dataSelecionada = dayjs(dataSelecionada).add(5 - dataSelecionada.getDate(), 'days').toDate();
          setMessage1("Data inválida"); setMessage2("Para este empreendimento, apenas serão aceitas datas com vencimento para o dia 05 ou 15"); setShowToast(true)
        }
        else if (dataSelecionada.getDate() < 15 && dataSelecionada.getDate() != 5) {
          dataSelecionada = dayjs(dataSelecionada).add(15 - dataSelecionada.getDate(), 'days').toDate();
          setMessage1("Data inválida"); setMessage2("Para este empreendimento, apenas serão aceitas datas com vencimento para o dia 05 ou 15"); setShowToast(true)
        }
        else if (dataSelecionada.getDate() < 32 && dataSelecionada.getDate() != 5 && dataSelecionada.getDate() != 15) {
          dataSelecionada = dayjs(dataSelecionada).add(1, 'months').add(5 - dataSelecionada.getDate(), 'days').toDate();
          setMessage1("Data inválida"); setMessage2("Para este empreendimento, apenas serão aceitas datas com vencimento para o dia 05 ou 15"); setShowToast(true)
        }
    }
    let Titulos = [...props.getTitulosDeSinal.titulos];
    Item.vencimento = dataSelecionada;
    debounceUltimaParcela(Item);
    hookSetViewModel({ ...props.getTitulosDeSinal, titulos: [...Titulos] });
  }

  function DeleteTitle(index: number) {
    if(props.getTitulosDeSinal.titulos.length == 1) {
      setMessage1("Não foi possível deletar!"); setMessage2("É necessário pelo menos um titulo."); setShowToast(true)
    } else {
      props.getTitulosDeSinal.titulos.splice(index, 1);
    }
    props.setTitulosDeSinal(props.getTitulosDeSinal)
  }

  function NewTitle() {
    if (props.getTitulosDeSinal.titulos && props.getTitulosDeSinal.titulos.length > 0) {
      const Titulo = Object.assign({}, props.getTitulosDeSinal.titulos[0]);
      const novoTitulo = {
        quantidade: 0,
        valor: 0,
        valorJuros: 0,
        valorTotal: 0,
        valorTotalJuros: 0,
        juros: Titulo.juros,
        periodicidadeDosJuros: Titulo.periodicidadeDosJuros,
        sistemaDeAmortizacao: Titulo.sistemaDeAmortizacao,
        exibirCalendarioVencimento: false,
        vencimento: new Date(),
        meioDePagamento: "Boleto",
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
        numeroDaOperacao: undefined,
        dataDeAdiçãoALista: new Date()
      } as Type.Title
      hookSetViewModel({ ...props.getTitulosDeSinal, titulos: [...props.getTitulosDeSinal.titulos, novoTitulo] });
    }
  }

  function DigitoCartao(value: string, index: number) {
    let TitleList = [... props.getTitulosDeSinal.titulos];
    TitleList[index].digitoCartao = value;
    props.setTitulosDeSinal((prevState: Type.ViewModel) => {
      return({...prevState, titulos: [...TitleList]});
    })
  }

  function NSU(value: string, index: number) {
    let TitleList = [... props.getTitulosDeSinal.titulos];
    TitleList[index].nsu = value;
    props.setTitulosDeSinal((prevState: Type.ViewModel) => {
      return({...prevState, titulos: [...TitleList]});
    })
  }

  function Toast() {
    setShowToast(false)
  }
  //#endregion

  console.log(JSON.stringify(props.getTitulosDeSinal.titulos))

  return (
      <Modal animationType="slide" transparent={false} visible={props.visible}>
          <LinearGradient colors={['#26A77C', '#105B74']}>
            <SafeAreaView>
                  <Styled.Container>
                    <View style={{top: -10}}>
                      <ToastMessage
                        showToast={getShowToast}
                        hideToast={setShowToast}
                        function={Toast}
                        message1={getMessage1}
                        message2={getMessage2}
                      />
                    </View>
                      <Styled.ContainerHeader style={{ marginTop: Platform.OS === 'ios' ? '5%' : '10%', opacity: getShowToast ? 0 : 1}}>
                          <TouchableOpacity activeOpacity={0.9} onPress={() => props.setVisibleModalSignal(false)}>
                              <SvgCss xml={ArrowBack} />
                          </TouchableOpacity>
                          <Styled.TextHeader>{props.getTitulosDeSinal.titulo}</Styled.TextHeader>
                      </Styled.ContainerHeader>
                        <Styled.SubContainer>
                        <Modals.ViewImage
                          marginLeft={"5%"}
                          title="Imagem Selecionada"
                          onPressClose={() => {setVisibleImage(false)}}
                          visible={getVisibleImage}
                          image={props.getTitulosDeSinal.anexo?.arquivo}
                        />
                        <Modals.PdfViewer
                          visible={getVisiblePDF}
                          onPressClose={() => {setVisiblePDF(false)}}
                          resource={props.getTitulosDeSinal.anexo?.arquivo}
                        />
                        <Annex
                          viewImage={() => setVisibleImage(true)}
                          viewPDF={() => setVisiblePDF(true)}
                          PDForIMAGE={props.getTitulosDeSinal.anexo?.extensao == 'pdf' ? 1 : 0}
                          cancelTouch={() => {
                            props.setTitulosDeSinal((prevState: Type.ViewModel) => {
                              return({...prevState, anexo: undefined});
                            })
                          }}
                          library={() => pickImageFromGalery()}
                          pdf={() => DocumentPDF()}
                          camera={() => requestCameraPermission()}
                          uri={props.getTitulosDeSinal.anexo?.arquivo}
                          title='Anexe o comprovante de pagamento'
                          base64={true}
                          heightImage={100}
                          widthImage={200}
                          heightPdf={100}
                          widthPdf={170}
                        />
                        </Styled.SubContainer>
                        
                        <ScrollView style={{marginTop: 10}}>
                          {props.getTitulosDeSinal.titulos.map((item, index) => 
                            <Styled.ContainerTitle>
                              <Styled.ContainerHeaderTitle>
                                <TouchableOpacity style={{width: '10%', flex: 2}} onPress={() => DeleteTitle(index)}>
                                  <SvgCss xml={CancelTitle} height={15} width={15} />
                                </TouchableOpacity>
                                <Styled.TextInput style={{flex: 3}}>{index + 1}º Titulo</Styled.TextInput>
                              </Styled.ContainerHeaderTitle>
                              {SelectedCompany?.id != 26 &&
                              <Input
                                key='Desconto'
                                onChangeText={(text) => Desconto(text)}
                                nameInput={getValorDesconto} titleInput='Desconto' keyboardType='number-pad'
                              />}
                              <Input
                                key='Quantidade'
                                onChangeText={(text) => Quantidade(text, item)}
                                value={TextFormat.Numero.FormatarTextoParaInteiro(item?.quantidade)} titleInput='Quantidade' keyboardType='number-pad'
                              />
                              <Input
                                key='Principal'
                                onChangeText={(text) => Principal(text, item)}
                                value={TextFormat.Moeda.FormatarTexto(item?.valor)} titleInput='Principal' keyboardType='number-pad'
                              />
                              {item.sistemaDeAmortizacao === 1 && item.juros > 0 &&
                              <Input
                                key='Parcela'
                                onChangeText={(text) => Parcela(text, item)}
                                value={TextFormat.Moeda.FormatarTexto(item.valorJuros)} titleInput='Parcela' keyboardType='number-pad'
                              />}
                              <Input
                                key='Total'
                                onChangeText={(text) => Total(text, item)}
                                value={item.sistemaDeAmortizacao == 1 && item.juros > 0 ? TextFormat.Moeda.FormatarTexto(item.valorTotalJuros || 0) : TextFormat.Moeda.FormatarTexto(item.valorTotal || 0)} titleInput='Total' keyboardType='number-pad'
                              />
                              <TouchInput 
                                key='Vencimento'
                                onPress={() => {setOpen(true)}}
                                colorWithNothingSelected={undefined}
                                selectedInput={item?.vencimento ? moment(item?.vencimento).format("DD/MM/YYYY") : "00/00/0000"} titleInput='Vencimento'
                              />
                              <DatePicker
                                modal
                                mode='date'
                                maximumDate={props.getTitulosDeSinal.maiorVencimento}
                                minimumDate={props.getTitulosDeSinal.menorVencimento}
                                open={getOpen}
                                date={getDate}
                                onConfirm={(date) => {
                                  Maturity(date, item)
                                  setOpen(false)
                                }}
                                onCancel={() => {
                                  setOpen(false)
                                }}
                              />
                              <TouchInput 
                                key='Meio de Pagamento'
                                onPress={() => {setVisibleModalPaymentMethod(true)}}
                                colorWithNothingSelected={undefined}
                                selectedInput={item?.meioDePagamento} titleInput='Meio de Pagamento'
                              />
                              <Modals.MultipleSelections
                                marginLeft="10%"
                                title="Meio de Pagamento"
                                search={true}
                                visible={getVisibleModalPaymentMethod}
                                onPressClose={() => {setVisibleModalPaymentMethod(false)}}
                                onChangeText={(event) => {(event)}}
                                data={List.PaymentMethod}
                                renderItem={(Item) =>
                                <Styled.ItemContainer onPress={() => {
                                  let Titulos = [...props.getTitulosDeSinal.titulos];
                                  if (item.meioDePagamento != Item.item.value) {
                                      item.meioDePagamento = Item.item.value;
                                      item.detalharMeioDePagamento = true;
                                      item.banco = undefined;
                                      item.agencia = undefined;
                                      item.conta = undefined;
                                      item.digitoDaConta = undefined;
                                      item.titular = undefined;
                                      item.numeroCheque = undefined;
                                      item.maquina = undefined;
                                      item.bandeira = undefined;
                                      item.digitoCartao = undefined;
                                      item.operacao = undefined;
                                      item.nsu = undefined;
                                      item.numeroDaOperacao = undefined;
                                  }
                                  if (Item.item.key === "Dinheiro" || Item.item.key === "PIX") Item.item.vencimento = new Date();
                                  hookSetViewModel({ ...props.getTitulosDeSinal, titulos: [...Titulos] });
                                  setVisibleModalPaymentMethod(false)
                                }}>
                                  <Styled.Item>
                                    <Styled.TextItem>{Item.item?.value}</Styled.TextItem>
                                  </Styled.Item>
                                </Styled.ItemContainer>}
                              />
                              {item?.meioDePagamento == "Cartão" &&
                              <View>
                                <TouchInput 
                                  key='Maquina'
                                  onPress={() => {setVisibleModalCardMachine(true)}}
                                  selectedInput={item?.maquina} titleInput='Máquina'
                                />
                                <Input
                                  key='Digito do Cartao'
                                  onChangeText={(text) => DigitoCartao(text, index)}
                                  value={item?.digitoCartao} titleInput='Dígito do cartão' keyboardType='number-pad'
                                />
                                <TouchInput 
                                  key='Bandeira'
                                  onPress={() => {setVisibleModalFlag(true)}}
                                  selectedInput={item?.bandeira} titleInput='Bandeira'
                                />
                                <TouchInput 
                                  key='Operacao'
                                  onPress={() => {setVisibleModalOperation(true)}}
                                  selectedInput={item?.operacao} titleInput='Operação'
                                />
                                <Input
                                  key='NSU'
                                  onChangeText={(text) => NSU(text, index)}
                                  value={item?.nsu} titleInput='NSU' keyboardType='number-pad'
                                />
                              </View>}
                              {item?.meioDePagamento == "Cheque" &&
                              <View>
                                <TouchInput 
                                  key='bank'
                                  onPress={() => {setVisibleModalBank(true)}}
                                  colorWithNothingSelected={undefined}
                                  selectedInput={item?.banco?.value} titleInput='Banco'
                                />
                                <Input
                                  key='Agencia'
                                  onChangeText={(text) => item.agencia = text}
                                  nameInput={item?.agencia} titleInput='Agência' keyboardType='default'
                                />
                                <Input
                                  key='Conta'
                                  onChangeText={(text) => item.conta = text}
                                  nameInput={item?.conta} titleInput='Conta' keyboardType='default'
                                />
                                <Input
                                  key='Digito'
                                  onChangeText={(text) => item.digitoDaConta = text}
                                  nameInput={item?.digitoDaConta} titleInput='Dígito' keyboardType='number-pad'
                                />
                                <Input
                                  key='Titular'
                                  onChangeText={(text) => item.titular = text}
                                  nameInput={item?.titular} titleInput='Titular' keyboardType='default'
                                />
                                <Input
                                  key='Numero'
                                  onChangeText={(text) => item.numeroCheque = text}
                                  nameInput={item?.numeroCheque} titleInput='Número' keyboardType='default'
                                />
                              </View>}
                              {(item?.meioDePagamento === "Depósito" || item?.meioDePagamento === "PIX" || item?.meioDePagamento === "Transferência") &&
                              <View>
                                <Input
                                  key='Número da operacao'
                                  onChangeText={(text) => item.numeroDaOperacao = text}
                                  value={item.numeroDaOperacao} titleInput='Nº da operação:' keyboardType='default'
                                />
                              </View>}
                            </Styled.ContainerTitle>
                          )}
                        </ScrollView>
                        <Styled.ContainerNewTitle activeOpacity={0.5} onPress={() => NewTitle()}>
                            <SvgCss xml={More} style={{marginRight: '5%', marginTop: '4%'}} />
                            <Styled.TextInput style={{marginTop: '5%'}}>Deseja adicionar um novo título?</Styled.TextInput>
                        </Styled.ContainerNewTitle>
                        <Styled.ContainerInfo>
                        {SelectedCompany?.id != 26 && props.getTitulosDeSinal && props.getTitulosDeSinal.titulos.length > 0 &&
                          <View style={{marginLeft: '5%'}}>
                            <Styled.Info>* Taxa de juros aplicada de {(props.getTitulosDeSinal.titulos[0].juros * 100).toFixed(2).replace(".", ",")}%</Styled.Info>
                            <Styled.Info>* Amortização {props.getTitulosDeSinal.titulos[0].sistemaDeAmortizacao == 0 ? "Gradiente" : (props.getTitulosDeSinal.titulos[0].sistemaDeAmortizacao == 1 ? "Price" : (props.getTitulosDeSinal.titulos[0].sistemaDeAmortizacao == 2 ? "SAC" : "Simples"))}</Styled.Info>
                          </View>}
                          {props.getTitulosDeSinal.titulos && props.getTitulosDeSinal.titulos.length > 0 && 
                          <View style={{marginLeft: '5%'}}>
                            <Styled.Info>
                            * Segundo o modelo de vendas, o valor esperado seria de {TextFormat.Moeda.FormatarTexto(considerar2CasasDecimais(props.getTitulosDeSinal.totalEsperado ?? 0))}.
                            O total gerado foi de {TextFormat.Moeda.FormatarTexto(considerar2CasasDecimais(props.getTitulosDeSinal.titulos.reduce((Acumulado, Atual) => Acumulado + Atual.valorTotal, 0)))}.
                            {(considerar2CasasDecimais(props.getTitulosDeSinal.totalEsperado ?? 0) == considerar2CasasDecimais(props.getTitulosDeSinal.titulos.reduce((Acumulado, Atual) => Acumulado + Atual.valorTotal, 0)) ? "" :
                                (considerar2CasasDecimais(props.getTitulosDeSinal.totalEsperado ?? 0) <= considerar2CasasDecimais(props.getTitulosDeSinal.titulos.reduce((Acumulado, Atual) => Acumulado + Atual.valorTotal, 0))
                                    ? ` Logo, seguindo o modelo de vendas seria necessário ainda descontar ${TextFormat.Moeda.FormatarTexto(considerar2CasasDecimais(props.getTitulosDeSinal.titulos.reduce((Acumulado, Atual) => Acumulado + Atual.valorTotal, 0) - (props.getTitulosDeSinal.totalEsperado ?? 0)))}.`
                                    : ` Logo, seguindo o modelo de vendas seria necessário ainda distribuir ${TextFormat.Moeda.FormatarTexto(considerar2CasasDecimais(props.getTitulosDeSinal.totalEsperado ?? 0) - considerar2CasasDecimais(props.getTitulosDeSinal.titulos.reduce((Acumulado, Atual) => Acumulado + Atual.valorTotal, 0)))}.`)
                            )}
                            </Styled.Info>
                          </View>}
                          {(props.getAjustarSaldoAoValorAVista == true && (considerar2CasasDecimais(props.getTitulosDeSinal.totalEsperado ?? 0) != considerar2CasasDecimais(props.getTitulosDeSinal.titulos.reduce((Acumulado, Atual) => Acumulado + Atual.valorTotal, 0)))) &&
                          <View>
                            {props.getTitulosDeSinal.titulos && props.getTitulosDeSinal.titulos.length > 0 &&
                            <Styled.Info>
                              {(() => {
                                  let UltimoTitulo = [...props.getTitulosDeSinal.titulos].sort((a, b) => b.valor - a.valor).sort((a, b) => dayjs(a.vencimento).add(a.quantidade - 1, 'months').toDate().getTime() - dayjs(b.vencimento).add(b.quantidade - 1, 'months').toDate().getTime())[props.getTitulosDeSinal.titulos.length - 1];
                                  let Parcela = considerar2CasasDecimais(props.getTitulosDeSinal.titulos.reduce((Acumulado, Atual) => Acumulado + Atual.quantidade, 0));
                                  let Vencimento = dayjs(UltimoTitulo.vencimento).add(UltimoTitulo.quantidade - 1, 'months').toDate();
                                  let Valor = Math.abs(considerar2CasasDecimais(UltimoTitulo.valor + considerar2CasasDecimais(props.getTitulosDeSinal.totalEsperado ?? 0) - props.getTitulosDeSinal.titulos.reduce((Acumulado, Atual) => Acumulado + Atual.valorTotal, 0)));
                                  return `Como a opção "Ajustar a última parcela?" foi marcada, o valor da parcela de nº ${TextFormat.Numero.FormatarTextoParaInteiro(Parcela)} cujo o vencimento se dará em ${dayjs(Vencimento).format("DD/MM/YYYY")} será de ${TextFormat.Moeda.FormatarTexto(Valor ?? 0)} afim de atender ao valor esperado de ${TextFormat.Moeda.FormatarTexto(props.getTitulosDeSinal.totalEsperado ?? 0)}`;
                              })()}
                            </Styled.Info>}
                          </View>}
                        </Styled.ContainerInfo>
                      {/*MODALS*/}
                      {<>
                        <Modals.MultipleSelections
                          marginLeft="22%"
                          title="Operação"
                          visible={getVisibleModalOperation}
                          onPressClose={() => {setVisibleModalOperation(false)}}
                          data={List.Operation}
                          renderItem={(item) =>
                            <Styled.ItemContainer onPress={() => {
                              setVisibleModalOperation(false);
                              let TitleList = [... props.getTitulosDeSinal.titulos];
                              TitleList[getTitleIndex].operacao = item?.item.value;
                              let EhDiaUtil = require('eh-dia-util');
                              let Vencimento = new Date(TitleList[getTitleIndex].vencimento);
                              switch (item?.item.value) {
                                case "Débito":
                                  Vencimento.setDate(Vencimento.getDate() + 1);
                                  while (EhDiaUtil(Vencimento) == false) {
                                      Vencimento.setDate(Vencimento.getDate() + 1);
                                  }
                                  TitleList[getTitleIndex].vencimento = Vencimento;
                                  break;
                                case "Crédito à vista":
                                  Vencimento.setDate(Vencimento.getDate() + 30);
                                  TitleList[getTitleIndex].vencimento = Vencimento;
                                  break;
                                case "Crédito Parcelado":
                                  Vencimento.setDate(Vencimento.getDate() + 30);
                                  TitleList[getTitleIndex].vencimento = Vencimento;
                                  break;
                              }
                              props.setTitulosDeSinal((prevState: Type.ViewModel) => {
                                return({...prevState, titulos: [...TitleList]});
                              })
                            }}>
                              <Styled.Item>
                                <Styled.TextItem>{item?.item.value}</Styled.TextItem>
                              </Styled.Item>
                            </Styled.ItemContainer>}
                        />
                        <Modals.MultipleSelections
                          marginLeft="22%"
                          title="Bandeira"
                          visible={getVisibleModalFlag}
                          onPressClose={() => {setVisibleModalFlag(false)}}
                          data={List.Flag}
                          renderItem={(item) =>
                            <Styled.ItemContainer onPress={() => {
                              setVisibleModalFlag(false);
                              let TitleList = [... props.getTitulosDeSinal.titulos];
                              TitleList[getTitleIndex].bandeira = item?.item.value;
                              props.setTitulosDeSinal((prevState: Type.ViewModel) => {
                                return({...prevState, titulos: [...TitleList]});
                              })
                            }}>
                              <Styled.Item>
                                <Styled.TextItem>{item?.item.value}</Styled.TextItem>
                              </Styled.Item>
                            </Styled.ItemContainer>}
                        />
                        <Modals.MultipleSelections
                          marginLeft="22%"
                          title="Máquina"
                          visible={getVisibleModalCardMachine}
                          onPressClose={() => {setVisibleModalCardMachine(false)}}
                          data={List.CardMachine}
                          renderItem={(item) =>
                            <Styled.ItemContainer onPress={() => {
                              setVisibleModalCardMachine(false);
                              let TitleList = [... props.getTitulosDeSinal.titulos];
                              TitleList[getTitleIndex].maquina = item?.item.value;
                              props.setTitulosDeSinal((prevState: Type.ViewModel) => {
                                return({...prevState, titulos: [...TitleList]});
                              })
                            }}>
                              <Styled.Item>
                                <Styled.TextItem>{item?.item.value}</Styled.TextItem>
                              </Styled.Item>
                            </Styled.ItemContainer>}
                        />
                        <Modals.MultipleSelections
                          marginLeft="22%"
                          title="Banco"
                          visible={getVisibleModalBank}
                          onPressClose={() => {setVisibleModalBank(false)}}
                          data={List.Bank}
                          renderItem={(item) =>
                            <Styled.ItemContainer onPress={() => {
                              setVisibleModalBank(false);
                              let TitleList = [... props.getTitulosDeSinal.titulos];
                              TitleList[getTitleIndex].banco = item?.item;
                              props.setTitulosDeSinal((prevState: Type.ViewModel) => {
                                return({...prevState, titulos: [...TitleList]});
                              })
                            }}>
                              <Styled.Item>
                                <Styled.TextItem>{item?.item?.value}</Styled.TextItem>
                              </Styled.Item>
                            </Styled.ItemContainer>}
                        />
                      </>}
                  </Styled.Container>
                  </SafeAreaView>
            </LinearGradient>
      </Modal>
  );
};