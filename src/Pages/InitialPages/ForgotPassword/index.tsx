//#region React
import React, {useState} from 'react';
import { TouchableOpacity, Pressable, Keyboard, Platform, View} from 'react-native';
//#endregion

//#region ViewModel
import viewModel from './ViewModel';
//#endregion

//#region Components
import * as Styled from './styles';
import { ToastMessage, TextInputPattern, Button} from '../../../Components';
//#endregion

//#region Services
import * as Controllers from '../../../Services/Controllers';
//#endregion

//#region Functions
import {ResponsiveWidth} from '../../../Functions';
import * as TextFormat from '../../../Themes/TextFormat';
//#endregion

//#region Images Icons
import { SvgCss } from 'react-native-svg';
import { ArrowBack, Padlock } from '../../../Assets';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {getStatusBarHeight} from 'react-native-status-bar-height';
//#endregion

export const ForgotPassword: React.FC<viewModel> = viewModel => {
  //#region UseState
  const [getCPF, setCPF] = useState<string>('');
  const [getLoading, setLoading] = useState<boolean>(false);
  const [getShowToast, setShowToast] = useState<boolean>(false);
  const [getMessage1, setMessage1] = useState<string>("");
  const [getMessage2, setMessage2] = useState<string>("");
  //#endregion

  //#region Async Functions
  async function ValidatingCPF(): Promise<boolean> {
    setLoading(true)
    if (getCPF == '') {
      setLoading(false)
      setMessage1("Campo vazio")
      setMessage2("Preencha um CPF.")
      setShowToast(true)
      return false;
    } else if (TextFormat.CPF.TextoValido(getCPF) === false) {
      setLoading(false)
      setMessage1("Campo vazio")
      setMessage2("Preencha um CPF válido.")
      setShowToast(true)
      return false;
    } else {
      setLoading(true)
      return true;
    }
  }

  async function NewPasswordRequest() {
    if ((await ValidatingCPF()) === true) {
      setLoading(true)
      let Response = await Controllers.Logon.NovaSenha(TextFormat.CPF.DesformatarTexto(getCPF), "NzAyNjEyMzExNDYkYzI5ekpHNWxkRE15");
      if (Math.floor(Response.status / 100) === 2) {
        setLoading(false)
        setMessage1("Campo vazio")
        setMessage2(`Foi enviada um email para. ${Response.data.destinatario}`)
        setShowToast(true)
      } else {
        setLoading(false)
        setMessage1("Erro")
        setMessage2("Não foi possível enviar um email, entre em contato com a equipe de desenvolvimento.")
        setShowToast(true)
      }
    }
  }

  function Toast() {
    setShowToast(false)
  }
  //#endregion

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
            <Styled.ContainerHeader>
              <TouchableOpacity style={{opacity: getShowToast ? 0 : 1}} activeOpacity={0.9} onPress={() => {viewModel.navigation.goBack()}}>
                <SvgCss xml={ArrowBack} />
              </TouchableOpacity>
              <Styled.TextHeader style={{opacity: getShowToast ? 0 : 1}}>Redefinir senha</Styled.TextHeader>
            </Styled.ContainerHeader>
            <Styled.GreenContainer>
              <SvgCss xml={Padlock} style={{alignSelf:'center', marginTop: '15%'}} />
              <TextInputPattern
                marginTop={'25%'}
                placeholderTextColor="#FFFFFF"
                keyboardType="numeric"
                placeholder="Digite o CPF"
                value={getCPF}
                textAlign={'center'}
                onChangeText={async (value: string) => {setCPF(TextFormat.CPF.FormatarTexto(value))}}
              />
              <Button
                loading={getLoading}
                onPress={() => {NewPasswordRequest()}} 
                marginTop={115} 
                width={ResponsiveWidth('39%')}
                textButton="Enviar" 
                fontSize={16} 
                alignItems={'center'} 
                alignSelf={'center'} 
                justifyContent={'center'}
                marginTopText={Platform.OS === 'ios' ? '0%' : '-5%'} 
              />
            </Styled.GreenContainer>
          </Styled.Container>
        </SafeAreaView>
      </LinearGradient>
    </Pressable>
  );
};
