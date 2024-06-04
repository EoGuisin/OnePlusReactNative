//#region React
import React, {useEffect, useState} from 'react';
import {Keyboard, Pressable, KeyboardAvoidingView, View, Platform, Alert, BackHandler, Linking, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
//#endregion

//#region Components
import * as Styled from './styles';
import {ToastMessage, Picker, TextInputPattern, TextInputPassword, Switch, Button} from '../../../Components';
import * as Modal from '../../Modals';
//#endregion

//#region ViewModel
import viewModel from './ViewModel';
//#endregion

//#region Services
import {RequestUserPermission, NotificationListner} from '../../../pushNotification_Helper'
import * as Controllers from '../../../Services/Controllers';
import {Object_} from '../../../Services/Objects';
//#endregion

//#region Images
import {OnePlusBranca ,DigitalDevBranca, ArrowBack} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Externals Directorys
import AsyncStorage from '@react-native-async-storage/async-storage';
import VersionCheck from 'react-native-version-check';
import {getVersion} from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';
//#endregion

//#region Redux
import * as Actions from '../../../Redux/actionsList';
import { useDispatch } from 'react-redux';
//#endregion

//#region Functions
import {ResponsiveWidth} from '../../../Functions';
import * as TextFormat from '../../../Themes/TextFormat';
//#endregion

export const Login: React.FC<viewModel> = viewModel => {
  interface Gifts {
    leadId: number,
    leadNome: string,
    codigoDeValidacao: string,
    itemDoAlmoxarifado: Object_.ItemDoAlmoxarifadoDeBrinde,
    numeroDaNF: number,
    nf: Object_.Anexo
  }

  //#region UseState
  const [getResponseLogin, setResponseLogin] = useState<Object_.SignIn | undefined>(undefined);
  const [getCompanysWithAccess, setCompanysWithAccess] = useState<Object_.GrupoDeEmpresasPermissaoDeAcesso[]>([]);
  const [getOriginalCompanysWithAccess, setOriginalCompanysWithAccess] = useState<Object_.GrupoDeEmpresasPermissaoDeAcesso[]>([]);
  const [getVisibleModalSelectCompany, setVisibleModalSelectCompany] = useState<boolean>(false);
  const [getIsEnabled, setIsEnabled] = useState<boolean>(false);
  const [getSelected, setSelected] = useState<Object_.GrupoDeEmpresas | undefined>(undefined);
  const [getCPF, setCPF] = useState<string | null>("");
  const [getEmail, setEmail] = useState<string | null>("");
  const [getPassword, setPassword] = useState<string | null>("");
  const [getLoading, setLoading] = useState<boolean>(false);
  const [getViewPicker, setViewPicker] = useState<boolean>(false);
  const [getShowToast, setShowToast] = useState<boolean>(false);
  const [getMessage1, setMessage1] = useState<string>("");
  const [getMessage2, setMessage2] = useState<string>("");
  //#endregion

  //#region Variables
  const version = getVersion();
  const dispatch = useDispatch();
  //#endregion

  //#region Async Functions

  async function ValidatingData(): Promise<boolean> {
    if(getCPF === "" && getIsEnabled === false ) {
      setLoading(false)
      setMessage1("Campo vazio")
      setMessage2("Preencha o CPF.")
      setShowToast(true)
      return false;
    } else if (TextFormat.CPF.TextoValido(getCPF != null ? getCPF : "") === false  && getIsEnabled === false ) {
      setLoading(false)
      setMessage1("Campo vazio")
      setMessage2("Preencha um CPF válido.")
      setShowToast(true)
      return false
    } else if (TextFormat.Email.TextoValido(getEmail != null ? getEmail : "") === false  && getIsEnabled === true ) {
      setLoading(false)
      setMessage1("Campo vazio")
      setMessage2("Preencha um Email válido.")
      setShowToast(true)
      return false
    } else if (getEmail === "" && getIsEnabled === true ) {
      setLoading(false)
      setMessage1("Campo vazio")
      setMessage2("Preencha o Email.")
      setShowToast(true)
      return false
    } else if (getPassword === "") {
      setLoading(false)
      setMessage1("Campo vazio")
      setMessage2("Preencha a senha.")
      setShowToast(true)
      return false
    } else {
      setLoading(false)
      return true
    }
  }

  async function Login() {
    if ((await ValidatingData()) === true) {
      StoringData();
      setLoading(true)
      if(getCPF && getPassword) {
        // getIsEnabled === false ? TextFormat.CPF.DesformatarTexto(getCPF) : (getEmail)
        let Response = await Controllers.Logon.Get(TextFormat.CPF.DesformatarTexto(getCPF), getPassword)
        if (Math.floor(Response.status / 100) === 2) {
          setResponseLogin(Response.data)
          setOriginalCompanysWithAccess(Response.data.grupoDeEmpresasComPermissaoDeAcesso)
          setCompanysWithAccess(Response.data.grupoDeEmpresasComPermissaoDeAcesso)
          if(Response.data.grupoDeEmpresasComPermissaoDeAcesso?.length <= 2 || getSelected !== undefined) {
            if(Response.data.pessoa?.natureza === 9) {
              let ResponseGifts = await Controllers.Lead.BrindesGerados(Response.data.token, getSelected?.id, undefined, undefined, undefined, undefined, undefined)
              if (Math.floor(ResponseGifts.status / 100) === 2) {
                dispatch(Actions.ProviderLogin.AddToLoginProvider(ResponseGifts.data))
                var filterFaturado = ResponseGifts.data.filter(item => item.itemDoAlmoxarifado.status?.id === 5)
                function getTotalFaturado(total: any, item: Gifts) {
                  return total + item.itemDoAlmoxarifado.valorUnitario;
                }
                var filterRecebido = ResponseGifts.data.filter(item => item.itemDoAlmoxarifado.status?.id === 6)
                function getTotalRecebido(total: any, item: Gifts) {
                  return total + item.itemDoAlmoxarifado.valorUnitario;
                }
                var filterNaoUtilizado = ResponseGifts.data.filter(item => item.itemDoAlmoxarifado.status!?.id <= 3)
                function getTotalNaoUtilizado(total: any, item: Gifts) {
                  return total + item.itemDoAlmoxarifado.valorUnitario;
                }
                var filterFaturar = ResponseGifts.data.filter(item => item.itemDoAlmoxarifado.status!?.id === 4)
                function getTotalFaturar(total: any, item: Gifts) {
                  return total + item.itemDoAlmoxarifado.valorUnitario;
                }
                let Summary = [
                  {
                    id: 0,
                    label: 'Total a \nfaturar',
                    value: filterFaturar.reduce(getTotalFaturar, 0),
                    quantity: null,
                  },
                  {
                    id: 1,
                    label: 'Total \nRecebido',
                    value: filterRecebido.reduce(getTotalRecebido, 0),
                    quantity: null,
                  },
                  {
                    id: 2,
                    label: 'Total \nfaturado',
                    value: filterFaturado.reduce(getTotalFaturado, 0),
                    quantity: null,
                  },
                  {
                    id: 3,
                    label: 'Brindes não \nutilizados',
                    value: filterNaoUtilizado.reduce(getTotalNaoUtilizado, 0),
                    quantity: filterNaoUtilizado.length,
                  },
                ]
                dispatch(Actions.ProviderSummary.AddToSummaryProvider(Summary))
                viewModel.navigation.navigate("Provider")
              }
            } else {
              dispatch(Actions.DataLogin.AddToLoginData(Response.data))
              getSelected !== undefined ? dispatch(Actions.SelectCompany.SelectedCompany(getSelected)) : dispatch(Actions.SelectCompany.SelectedCompany(Response.data.grupoDeEmpresasComPermissaoDeAcesso[0].grupoDeEmpresas))
              setLoading(false);
              RequestUserPermission(Response.data);
              NotificationListner();
              viewModel.navigation.navigate("Tabs")
            }
          } else {
            setLoading(false)
            setViewPicker(true)
            setMessage1("Selecione a empresa que quer ter acesso")
            setMessage2("Seu perfil possui permissão para mais de uma empresa.")
            setShowToast(true)
          }
        } else {
          console.log(Response)
          setLoading(false)
          setMessage1("Erro")
          setMessage2("Senha e/ou Usuário incorreto.")
          setShowToast(true)
        }
      }
    }
  }

  async function NeedUpdate() {
    try {
      let updateNeeded = await VersionCheck.needUpdate();

      if(updateNeeded && updateNeeded.isNeeded)
      {
        Alert.alert(
          'Por favor atualize',
          'Você vai ter que atualizar seu aplicatico para a última versão para continuar usando.',
          [
            {
              text: 'Atualizar',
              onPress: () => {
                BackHandler.exitApp();
                Linking.openURL(updateNeeded.storeUrl);
              },
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error) {}
  }

  function SearchCompanyWithAccess(search: string) {
    let FilteredCompanyWithAccess = getOriginalCompanysWithAccess
    setCompanysWithAccess(FilteredCompanyWithAccess?.filter((data: Object_.GrupoDeEmpresasPermissaoDeAcesso) => {
      let normalizeString = data.grupoDeEmpresas!?.descricao.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      let filter = normalizeString.toUpperCase().includes(search.toUpperCase())
      return filter
    }))
  }

  function Toast() {
    setShowToast(false)
  }

  async function StoringData() {
    try {
      const cpf = await AsyncStorage.getItem('@One+_CPF');
      const password = await AsyncStorage.getItem('@One+_Password');
      if(cpf != null && getCPF != null && getPassword != null) {
        await AsyncStorage.removeItem('@One+_CPF');
        await AsyncStorage.removeItem('@One+_Password');
        await AsyncStorage.setItem('@One+_CPF', getCPF);
        await AsyncStorage.setItem('@One+_Password', getPassword);
      } else if (getCPF != null && getPassword != null){
        await AsyncStorage.setItem('@One+_CPF', getCPF);
        await AsyncStorage.setItem('@One+_Password', getPassword);
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  async function CatchingData() {
    try {
      const cpf = await AsyncStorage.getItem('@One+_CPF');
      const password = await AsyncStorage.getItem('@One+_Password');
      if(cpf != null) {
        setCPF(cpf)
      }
      if(password != null) {
        setPassword(password)
      }
    } catch (error) { console.log(error) }
  }
  //#endregion

  //#region UseEffect
  useEffect(() => {
    CatchingData();
    NeedUpdate();
  }, []);
  //#endregion

  console.log(getSelected?.id);
  console.log(getSelected?.icone);

  //#region TSX
  return (
    <Pressable android_disableSound={true} onPress={Keyboard.dismiss}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
      <SafeAreaView>
        <Styled.Container>
        <ToastMessage
          showToast={getShowToast}
          hideToast={setShowToast}
          function={Toast}
          message1={getMessage1}
          message2={getMessage2}
        />
        <KeyboardAvoidingView behavior = {Platform.OS === "ios" ? "padding" : "height"}>
          <Styled.ImagesContainer>
            {getSelected?.icone != undefined && getSelected?.id != 28 && getSelected?.id != 29 && getSelected?.id != 1 && getSelected?.id != 9 && getSelected?.id != 2 && getSelected?.id != 3 && getSelected?.id != 27 && getSelected?.id != 7 && getSelected?.id != 8 &&
            <SvgCss xml={getSelected.icone} width={210} height={210} style={{marginBottom: -300}} />}
            {getSelected?.icone == undefined || getSelected?.id == 28 || getSelected?.id == 29 || getSelected?.id == 1 || getSelected?.id == 9 || getSelected?.id == 2 || getSelected?.id == 3 || getSelected?.id == 27 || getSelected?.id == 7 || getSelected?.id == 8 ?
            <SvgCss xml={OnePlusBranca} width={210} height={210} style={{marginBottom: -300}} />: undefined}
          </Styled.ImagesContainer>
          {getViewPicker ?
            <Picker
              onPress={() => {setVisibleModalSelectCompany(true)}}
              itemDescricao={getSelected?.descricao}
              placeholder={"Selecione a empresa"}
              svgTriangle={true}
            /> :
          <Styled.FillVoid />}
            <Modal.SelectCompany
              onChangeText={(event) => SearchCompanyWithAccess(event)}
              visible={getVisibleModalSelectCompany}
              onPressClose={() => {setVisibleModalSelectCompany(false)}}
              data={getCompanysWithAccess}
              renderItem={(item) =>
                <Styled.GroupCompanyContainer onPress={() => {
                  setSelected(item.item.grupoDeEmpresas)
                  setVisibleModalSelectCompany(false)
                }}>
                  <Styled.GroupCompany>
                    <Styled.TextGroupCompany>{item.item?.grupoDeEmpresas?.descricao}</Styled.TextGroupCompany>
                  </Styled.GroupCompany>
                </Styled.GroupCompanyContainer> 
              }
            />
          {getIsEnabled === false &&
          <TextInputPattern marginTop={'15%'} placeholderTextColor="#FFFFFF" keyboardType='numeric' placeholder="Digite o CPF" value={getCPF} onChangeText={async (value: string) => { setCPF(TextFormat.CPF.FormatarTexto(value))}} />}
          {getIsEnabled === true &&
          <TextInputPattern marginTop={'15%'} placeholderTextColor="#FFFFFF" autoCapitalize={'none'} keyboardType='email-address' placeholder="Digite o Email" value={getEmail} onChangeText={async (value: string) => { setEmail(value)}} />}
          <TextInputPassword placeholderTextColor="#FFFFFF" placeholder="Digite a senha" value={getPassword} onChangeText={async (value: string) => {setPassword(value) }} />
          <Styled.ContainerForgotAndSwitch>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Styled.SwitchCPF style={{fontFamily:getIsEnabled === true ? 'AzeretMono-Medium' : 'AzeretMono-Black'}}>CPF</Styled.SwitchCPF>
                <Switch
                  size={30}
                  isEnabled={getIsEnabled}
                />
              <Styled.SwitchEmail style={{fontFamily:getIsEnabled === false ? 'AzeretMono-Medium' : 'AzeretMono-Black'}}>Email</Styled.SwitchEmail>
            </View>
            <Styled.ForgotPassword activeOpacity={0.9} onPress={() => viewModel.navigation.navigate("ForgotPassword")}>
              <Styled.TextForgotPassword>
                Esqueci minha senha
              </Styled.TextForgotPassword>
            </Styled.ForgotPassword>
          </Styled.ContainerForgotAndSwitch>
          <Button marginTopText={Platform.OS === 'ios' ? '0%' : '-6%'} marginTop={90} width={ResponsiveWidth('35%')} fontSize={16} alignItems={'center'} alignSelf={'center'} justifyContent={'center'}
            textButton="Entrar"
            onPress={() => {Login()}}
            loading={getLoading} 
          />
          <Styled.LoginContainer activeOpacity={0.9} onPress={() => viewModel.navigation.navigate("CreateAccount")}>
            <Styled.LoginText>Não tem uma conta? Cadastre-se já</Styled.LoginText>
          </Styled.LoginContainer>
          </KeyboardAvoidingView>
          <Styled.Version>Versão - {version}</Styled.Version>
          <Styled.DevelopedContainer>
            <Styled.Developed>Desenvoldido por </Styled.Developed>
            <SvgCss xml={DigitalDevBranca} style={{padding: 30}} />
          </Styled.DevelopedContainer>
          </Styled.Container>
        </SafeAreaView>
      </LinearGradient>
    </Pressable>
  );
  //#endregion
};