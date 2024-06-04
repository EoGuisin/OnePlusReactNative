//#region React
import React, {useEffect} from 'react';
import {Platform, View, Alert, BackHandler, Linking} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
//#endregion

//#region Styled
import * as Styled from './styles';
import * as Components from '../../../Components';
//#endregion

//#region SVGs
import {OnePlusBranca, DigitalDevBranca} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Functions
import {ResponsiveWidth, ResponsiveHeight} from '../../../Functions';

//#endregion

//#region ViewModel
import viewModel from './ViewModel';
//#endregion

import VersionCheck from 'react-native-version-check';
import LinearGradient from 'react-native-linear-gradient';

export const Welcome: React.FC<viewModel> = viewModel => {

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

  //#region UseEffect
  useEffect(() => {
    NeedUpdate();
  }, []);
  //#endregion

  return (
    <LinearGradient colors={['#26A77C', '#105B74']}>
      <SafeAreaView>
        <Styled.Container>
        <SvgCss xml={OnePlusBranca} width={ResponsiveWidth('65%')} height={ResponsiveHeight('20%')} style={{alignSelf: 'center', marginTop: 60}} />
        <Styled.TextContainer>
          <Styled.Text1>Uma única plataforma, vários recursos.</Styled.Text1>
          <Styled.Text2>Somos especialistas em multipropriedade!</Styled.Text2>
        </Styled.TextContainer>
          <Styled.Welcome>Seja Bem Vindo!</Styled.Welcome>
          <View>
            <Components.Button justifyContent='center' svgPerson={true} loading={false} margin={25} marginTopText={Platform.OS === 'ios' ? '0%' : '-3%'} marginLeft={'15%'} width={ResponsiveWidth('60%')} textButton="Login" fontSize={14.5} onPress={() => {viewModel.navigation.navigate('Login')}} />
            <Components.Button svgPersonPlus={true} loading={false} marginLeft={'15%'} marginTopText={Platform.OS === 'ios' ? '1%' : '-1%'} width={ResponsiveWidth('60%')} textButton="Criar Conta" fontSize={14.5} onPress={() => { viewModel.navigation.navigate('CreateAccount')}} />
          </View>
            <Styled.DevelopedContainer>
              <Styled.Developed>Desenvoldido por</Styled.Developed>
              <SvgCss xml={DigitalDevBranca} height={ResponsiveHeight('2.5%')} />
          </Styled.DevelopedContainer>
        </Styled.Container>
      </SafeAreaView>
    </LinearGradient>
  );
}