//#region React
import React, {useEffect, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, Pressable, Platform} from 'react-native';
//#endregion

//#region ViewModel
import viewModel from './ViewModel'
//#endregion

//#region Components
import * as Styled from './styles';
import { ToastMessage, Picker, TextInputPattern, TextInputPassword, Button } from '../../../Components';
import * as Modal from '../../Modals';
//#endregion

//#region Services
import * as Controllers from '../../../Services/Controllers';
import {Object_} from '../../../Services/Objects';
//#endregion

//#region Images & Icons
import {OnePlusBranca, DigitalDevBranca, LogomarcaCosentinoOriginal, LogomarcaGAVResortsOriginal, LogomarcaEvianOriginal, LogomarcaHarmoniaUrbanismoOriginal, LogomarcaPattroOriginal, LogomarcaSilvaBrancoOriginal, LogomarcaTrinusCOOriginal} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Functions
import {ResponsiveWidth, ResponsiveHeight} from '../../../Functions';
import * as TextFormat from '../../../Themes/TextFormat';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
//#endregion

export const CreateAccount: React.FC<viewModel> = viewModel => {
  //#region UseState
  const [getCPF, setCPF] = useState<string>("");
  const [getName, setName] = useState<string>("");
  const [getEmail, setEmail] = useState<string>("");
  const [getPassword, setPassword] = useState<string>("");
  const [getLoading, setLoading] = useState<boolean>(false);
  const [getSelected, setSelected] = useState<Object_.GrupoDeEmpresas>();
  const [getListGroupCompany, setListGroupCompany] = useState<Array<Object_.GrupoDeEmpresas>>([]);
  const [getErrorGroupCompany, setErrorGroupCompany] = useState<string>("No Error");
  const [getOriginalListGroupCompany, setOriginalListGroupCompany] = useState<Array<Object_.GrupoDeEmpresas>>([]);
  const [getVisibleModalSelectCompany, setVisibleModalSelectCompany] = useState<boolean>(false);
  const [getShowToast, setShowToast] = useState<boolean>(false);
  const [getMessage1, setMessage1] = useState<string>("");
  const [getMessage2, setMessage2] = useState<string>("");
  //#endregion

  //#region Async Functions
  async function GroupOfCompanys() {
    let Response = await Controllers.Empresa.GruposDeEmpresas('NzAyNjEyMzExNDYkYzI5ekpHNWxkRE15',false,undefined,);
    if (Math.floor(Response.status / 100) === 2) {
      setListGroupCompany(Response.data)
      setOriginalListGroupCompany(Response.data)
    } else {
      setErrorGroupCompany("Error")
    }
  }

  async function ValidatingData(): Promise<boolean> {
    if (getName === "") {
      setLoading(false)
      setMessage1("Campo Vazio")
      setMessage2("Preencha o nome.")
      setShowToast(true)
      return false;
    }else if(getCPF === "") {
      setLoading(false)
      setMessage1("Campo Vazio")
      setMessage2("Preencha o CPF.")
      setShowToast(true)
      return false;
    } else if (TextFormat.CPF.TextoValido(getCPF) === false) {
      setLoading(false)
      setMessage1("Campo Vazio")
      setMessage2("Preencha um CPF válido.")
      setShowToast(true)
      return false
    } else if (TextFormat.Email.TextoValido(getEmail) === false) {
      setLoading(false)
      setMessage1("Campo Vazio")
      setMessage2("Preencha um Email válido.")
      setShowToast(true)
      return false
    } else if (getEmail === "") {
      setLoading(false)
      setMessage1("Campo Vazio")
      setMessage2("Preencha um Email.")
      setShowToast(true)
      return false
    } else if (getPassword === "") {
      setLoading(false)
      setMessage1("Campo Vazio")
      setMessage2("Preencha a senha.")
      setShowToast(true)
      return false
    } else {
      setLoading(false)
      return true
    }
  }

  async function Create() {
    if ((await ValidatingData()) === true) {
    setLoading(true)
    let cpfUnformatted = TextFormat.CPF.DesformatarTexto(getCPF)
      let Body = {
        id: 0,
        nome: getName,
        cargos: [] as Array<Object_.Cargo>,
        cpf: cpfUnformatted,
        emails: [{classificacao: 1, descricao: getEmail}],
        senha: getPassword,
        tokenDeNotificacao: "",
        empresasPermitidas: getSelected?.empresas,
      } as Object_.Usuario
      console.log('NzAyNjEyMzExNDYkYzI5ekpHNWxkRE15', getSelected?.id, Body)
      let Response = await Controllers.Logon.Post('NzAyNjEyMzExNDYkYzI5ekpHNWxkRE15', getSelected?.id, Body)
      if(Math.floor(Response.status / 100) === 2) {
        setLoading(false)
        setMessage1("Sucesso")
        setMessage2("Cadastrado com sucesso.")
        setShowToast(true)
        viewModel.navigation.navigate("Login")
      } else {
        setLoading(false)
        setMessage1("Erro")
        setMessage2("Entre em contato com a equipe de desenvolvimento.")
        setShowToast(true)
      }
    }
  }

  function Search(search: any) {
    let FilteredCompanies = JSON.parse(JSON.stringify(getOriginalListGroupCompany))
    setListGroupCompany(FilteredCompanies.filter((data: { descricao: string | any[]; }) => data.descricao.includes(search)))
  }

  function Toast() {
    setShowToast(false)
  }
  //#endregion

  //#region UseEffect
  useEffect(() => {
    GroupOfCompanys();
  }, []);
  //#endregion

  return (
    <Pressable android_disableSound={true} onPress={Keyboard.dismiss}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <SafeAreaView>
          <ToastMessage
            showToast={getShowToast}
            hideToast={setShowToast}
            function={Toast}
            message1={getMessage1}
            message2={getMessage2}
          />
        <Styled.Container>
        <KeyboardAvoidingView behavior='position'>
          <Styled.ImagesContainer>
            {getSelected?.icone !== undefined && getSelected?.descricao !== "Cosentino" &&
            <SvgCss xml={getSelected.icone} width={210} height={210} style={{marginBottom: -300}}/>}
            {getSelected?.icone === undefined || getSelected?.descricao === "Cosentino" &&
            <SvgCss xml={OnePlusBranca} width={210} height={210} style={{marginBottom: -300}} />}
          </Styled.ImagesContainer>
          <Picker
            onPress={() => {setVisibleModalSelectCompany(true)}}
            itemDescricao={getSelected?.descricao}
            placeholder={"Selecione a empresa"} 
            svgTriangle={true}
          />
            <Modal.SelectCompany
              onChangeText={(event) => Search(event)}
              visible={getVisibleModalSelectCompany}
              onPressClose={() => {setVisibleModalSelectCompany(false)}}
              data={getListGroupCompany}
              getErrorGroupCompany={getErrorGroupCompany}
              renderItem={(item) => (
                <Styled.GroupCompanyContainer onPress={() => {
                  setVisibleModalSelectCompany(false)
                  setSelected(item.item)}}>
                 <Styled.GroupCompany>
                    <Styled.TextGroupCompany>{item.item.descricao}</Styled.TextGroupCompany>
                  </Styled.GroupCompany>
                </Styled.GroupCompanyContainer>
              )}
            />
            <TextInputPattern marginTop={'12%'} placeholderTextColor="#FFFFFF" placeholder="Digite o Nome" value={getName} onChangeText={async (value: string) => { setName(value)}}/>
            <TextInputPattern marginTop={'6%'} placeholderTextColor="#FFFFFF" keyboardType='numeric' placeholder="Digite o CPF" value={getCPF} onChangeText={async (value: string) => { setCPF(TextFormat.CPF.FormatarTexto(value))}} />
            <TextInputPattern marginTop={'6%'} autoCapitalize='none' placeholderTextColor="#FFFFFF" keyboardType='email-address' placeholder="Digite o Email" value={getEmail} onChangeText={async (value: string) => { setEmail(value)}}/>
            <TextInputPassword placeholderTextColor="#FFFFFF" placeholder="Digite a senha" value={getPassword} onChangeText={async (value: string) => { setPassword(value)}}/>
            <Button loading={getLoading} onPress={() => {Create()}} marginTop={45} width={ResponsiveWidth('39%')} marginTopText={Platform.OS === 'ios' ? '0%' : '-5%'} textButton="Criar Conta" fontSize={16} alignItems={'center'} alignSelf={'center'} justifyContent={'center'} />
            <Styled.AlreadyRegistered activeOpacity={0.9} onPress={() => {viewModel.navigation.navigate('Login')}}>
              <Styled.AlreadyRegisteredText>Já é cadastrado? Entre com sua conta</Styled.AlreadyRegisteredText>
            </Styled.AlreadyRegistered>
            </KeyboardAvoidingView>
            <Styled.DevelopedContainer>
              <Styled.Developed>Desenvoldido por</Styled.Developed>
              <SvgCss xml={DigitalDevBranca} height={ResponsiveHeight('2.5%')} />
            </Styled.DevelopedContainer>
          </Styled.Container>
        </SafeAreaView>
      </LinearGradient>
    </Pressable>
  );
}