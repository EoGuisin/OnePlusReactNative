import { Dimensions, PixelRatio } from 'react-native';

  /** Sobre essa função //**
   * Calcula a altura dos elementos com base na densidade de pixels do dispositivo usado
   * @param {string} heightPercent Valor em (%) da altura desejada.
  **/
  const heightPercentageToDP = (heightPercent: string) => {
    const screenHeight = Dimensions.get('window').height;
  return PixelRatio.roundToNearestPixel(screenHeight * parseFloat(heightPercent) / 100);
  };

export default heightPercentageToDP;