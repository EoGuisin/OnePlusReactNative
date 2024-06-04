//#region React
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  Platform,
  PermissionsAndroid,
} from 'react-native';
//#endregion

//#region Icons
import { Home, ArrowGoButton } from '../../../Assets';
import { SvgCss } from 'react-native-svg';
//#endregion

//#region Styled
import * as Styled from './styles';
import * as Modals from '../';
import { Annex } from '../../../Components';
import { Type } from '../PaymentPlan/Modals/viewModel';
import { Comission } from '../../Catalog/Menu/PagesMenu/VendaDireta';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
import {CameraOptions, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker'
import RNFetchBlob from 'rn-fetch-blob';
import { Object_ } from '../../../Services/Objects';
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

export const Files = (props: Props) => {

  //#region useState
  const [getVisibleImageFilesNegotiation, setVisibleImageFilesNegotiation] = useState<boolean>(false);
  const [getVisiblePDFFilesNegotiation, setVisiblePDFFilesNegotiation] = useState<boolean>(false);
  const [getVisibleImageFilesService, setVisibleImageFilesService] = useState<boolean>(false);
  const [getVisiblePDFFilesService, setVisiblePDFFilesService] = useState<boolean>(false);
  //#endregion

  //#region functions
  async function requestCameraPermissionNegotiation() {
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
        pickCameraFilesNegotiation();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async function pickCameraFilesNegotiation() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1}
    const result = await launchCamera(options);
    if(result?.assets) {
      props.setDocumentFilesNegotiation(result.assets[0].uri ? result.assets[0].uri : "")
      props.setPDForImageNegotiation(0)
    }
  }

  async function pickLibraryFilesNegotiation() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1}
    const result = await launchImageLibrary(options);
    if(result?.assets) {
      props.setDocumentFilesNegotiation(result.assets[0].uri ? result.assets[0].uri : "")
      props.setPDForImageNegotiation(0)
    }
  }

  async function pickDocumentPDFNegotiation() {
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
        props.setDocumentFilesNegotiation(data)
        props.setPDForImageNegotiation(1)
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

  async function requestCameraPermissionService() {
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
        pickCameraFilesService();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async function pickCameraFilesService() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1}
    const result = await launchCamera(options);
    if(result?.assets) {
      props.setDocumentFilesService(result.assets[0].uri ? result.assets[0].uri : "")
      props.setPDForImageService(0)
    }
  }
  
  async function pickLibraryFilesService() {
    const options: CameraOptions = {mediaType: 'photo', saveToPhotos: false, cameraType: 'back', quality: 1}
    const result = await launchImageLibrary(options);
    if(result?.assets) {
      props.setDocumentFilesService(result.assets[0].uri ? result.assets[0].uri : "")
      props.setPDForImageService(0)
    }
  }

  async function pickDocumentPDFService() {
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
        props.setDocumentFilesService(data)
        props.setPDForImageService(1)
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

  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <Styled.Container>
          <Styled.ContainerHeader style={{marginTop: Platform.OS === 'ios' ? '15%' : '5%'}}>
            <Styled.Number activeOpacity={0.9} onPress={() => {
              props.setVisibleNegotiationCard(false);
              props.setVisiblePaymentPlan(true);
            }}>
              <Styled.TextNumber>5</Styled.TextNumber>
            </Styled.Number>
            <Styled.TextHeader>Fichas</Styled.TextHeader>
            <TouchableOpacity onPress={props.goHome}>
              <SvgCss xml={Home} />
            </TouchableOpacity>
          </Styled.ContainerHeader>
          <Styled.SubContainer>
            <View>
              <Styled.TextSubtitle>Ficha de Negociação</Styled.TextSubtitle>
              <Modals.ViewImage
                marginLeft={"5%"}
                title="Imagem Selecionada"
                onPressClose={() => {setVisibleImageFilesNegotiation(false)}}
                visible={getVisibleImageFilesNegotiation}
                image={props.getDocumentFilesNegotiation}
              />
              <Modals.PdfViewer
                visible={getVisiblePDFFilesNegotiation}
                onPressClose={() => {setVisiblePDFFilesNegotiation(false)}}
                resource={props.getDocumentFilesNegotiation}
              />
              <Annex
                height='45%'
                viewImage={() => setVisibleImageFilesNegotiation(true)}
                viewPDF={() => setVisiblePDFFilesNegotiation(true)}
                PDForIMAGE={props.getPDForImageNegotiation}
                cancelTouch={() => props.setDocumentFilesNegotiation("")}
                library={() => pickLibraryFilesNegotiation()}
                pdf={() => pickDocumentPDFNegotiation()}
                camera={() => requestCameraPermissionNegotiation()}
                uri={props.getDocumentFilesNegotiation}
                title='Anexe a documentação pertinente'
                heightImage='100%'
                widthImage='100%'
                heightPdf={'110%'}
                widthPdf={'50%'}
                base64={false}
              />
            </View>
            <View>
              <Styled.TextSubtitle>Ficha de Atendimento</Styled.TextSubtitle>
              <Modals.ViewImage
                marginLeft={"5%"}
                title="Imagem Selecionada"
                onPressClose={() => {setVisibleImageFilesService(false)}}
                visible={getVisibleImageFilesService}
                image={props.getDocumentFilesService}
              />
              <Modals.PdfViewer
                visible={getVisiblePDFFilesService}
                onPressClose={() => {setVisiblePDFFilesService(false)}}
                resource={props.getDocumentFilesService}
              />
              <Annex
                height='45%'
                viewImage={() => setVisibleImageFilesService(true)}
                viewPDF={() => setVisiblePDFFilesService(true)}
                PDForIMAGE={props.getPDForImageService}
                cancelTouch={() => props.setDocumentFilesService("")}
                library={() => pickLibraryFilesService()}
                pdf={() => pickDocumentPDFService()}
                camera={() => requestCameraPermissionService()}
                uri={props.getDocumentFilesService}
                title='Anexe a documentação pertinente'
                heightImage='100%'
                widthImage='100%'
                heightPdf={'110%'}
                widthPdf={'50%'}
                base64={false}
              />
            </View>
          </Styled.SubContainer>
          <Styled.ContainerSubmit>
            <Styled.Submit onPress={async () => props.setVisibleComplementaryDocumentation(true)} activeOpacity={0.8}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Styled.TextSubmit>Prosseguir</Styled.TextSubmit>
                <SvgCss xml={ArrowGoButton} style={{marginLeft: '10%'}}/>
              </View>
            </Styled.Submit>
          </Styled.ContainerSubmit>
          {/*MODALS*/}
          <>
              <Modals.ComplementaryDocumentation
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
                visible={props.getVisibleComplementaryDocumentation}
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
