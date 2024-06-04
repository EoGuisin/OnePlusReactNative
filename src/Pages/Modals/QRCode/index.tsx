//#region React
import React, {useState, useEffect} from 'react';
import {Modal, TouchableOpacity, Text, View, FlatList, Linking} from 'react-native';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
//#endregion

//#region Icons
import {
  ArrowBack,
  Filter,
  Camera,
  Calendar,
} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Animation
import Lottie from 'lottie-react-native';
import {SwipeDown, SwipeUp, LoadingInformations} from '../../../Animation';
//#endregion

//#region Functions
import * as TextFormat from '../../../Themes/TextFormat';
import {ResponsiveHeight} from '../../../Functions';
//#endregion

//#region Services
import * as Controllers from '../../../Services/Controllers';
import { Object_ } from '../../../Services/Objects';
//#endregion

//#region Styled
import * as Component from '../../../Components';
import * as List from '../../../Data/List';
import * as Modals from '..';
import * as Styled from './styles';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
import {MotiTransitionProp, MotiView} from 'moti';
import {Easing} from 'react-native-reanimated';
import DatePicker from 'react-native-date-picker';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
//#endregion

export interface Props {
  visible: boolean;
}

export const QRCode = (props: Props) => {

  //#region Interface
  //#endregion

  //#region useState
  const [getVisibleFilter, setVisibleFilter] = useState<boolean>(false);
  const [getFirst, setFirst] = useState<boolean>(true);
  const [getGifts, setGifts] = useState<Array<Object_.ItemDoAlmoxarifadoDeBrinde> | undefined>(undefined);
  //#endregion

  //#region Variables
  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);
  //#endregion

  //#region Functions
  //#endregion

  //#region UseEffect
  useEffect(() => {
    // if(getFirst == true) {
    //   setFirst(false)
    // }
  }, []);
  //#endregion

  return (
    <Modal>
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'black' }}>
      <RNCamera
          style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
      </View>
    </Modal>
  );
};

QRCode.propTypes = {
  visible: PropTypes.bool,
};
