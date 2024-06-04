//#region React
import React from 'react';
import {Text} from 'react-native';
//#endregion

//#region Styled
import * as Styled from './styles'
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
//#endregion

export function ScreenFaleConosco()  {

  //#region Variables
  //#endregion

  //#region Function
  //#endregion

  return (
    <LinearGradient colors={['#26A77C', '#105B74']}>
      <Styled.Container>
        <Text>Fale Conosco</Text>
      </Styled.Container>
    </LinearGradient>
  );
}