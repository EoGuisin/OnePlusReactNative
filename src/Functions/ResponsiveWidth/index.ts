import { Dimensions, PixelRatio } from 'react-native';

  /** Sobre essa função //**
   * Calcula a largura dos elementos com base na densidade de pixels do dispositivo usado
   * @param {string} widthPercent Valor em (%) da largura desejada.
  **/
  const widthPercentageToDP = (widthPercent: string) => {
    const screenWidth = Dimensions.get('window').width;
    return PixelRatio.roundToNearestPixel(screenWidth * parseFloat(widthPercent) / 100);
  };

export default widthPercentageToDP;