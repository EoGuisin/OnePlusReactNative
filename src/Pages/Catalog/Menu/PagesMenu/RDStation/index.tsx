//#region React
import React from 'react';
import {View, Platform, TouchableOpacity, Alert, Image} from 'react-native';
import viewModel from './ViewModel';
//#endregion

//#region Styled
import * as Styled from './styles';
//#endregion

//#region Images
import {ArrowBack} from '../../../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
//#endregion

export function ScreenRDStation(viewModel: viewModel) {
  //#region Variables
  //#endregion

  //#region Function
  //#endregion



  return (
    <LinearGradient colors={['#26A77C', '#105B74']}>
      <Styled.Container>
      </Styled.Container>
    </LinearGradient>
  );
}

// const tyles = MapboxGL.StyleSheet.create({
//   circles: {
//     visibility: 'visible',
//     circleRadius: 40,
//     circleColor: '#A9A9A9',
//     circleStrokeColor: '#A9A9A9',
//     circleStrokeWidth: 5,
//     circleOpacity: 0.0,
//   },
// });
