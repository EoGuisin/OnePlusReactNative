//#region React
import React, {useEffect, useState} from 'react';
import {Platform, Text} from 'react-native';
//#endregion

//#region Styled
import * as Styled from './styles'
import { ToastMessage } from '../../../Components';
//#endregion

//#region Images
import {SvgCss} from 'react-native-svg';
import {OnePlusBranca} from '../../../Assets';
//#endregion

//#region ViewModel
import viewModel from './ViewModel';
//#endregion

//#region Redux
import { useSelector } from 'react-redux';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
//#endregion

export const Notifications: React.FC<viewModel> = (viewModel) => {
  //#region Variables
  const [getShowToast, setShowToast] = useState<boolean>(false);
  const [getMessage1, setMessage1] = useState<string>("");
  const [getMessage2, setMessage2] = useState<string>("");
  const SelectedCompany = useSelector((state:any) => state.SelectedCompany);
  const DataLogin = useSelector((state:any) => state.DataLogin);

  const [getNofitication, setNofitication] = useState<any>([]);
  //#endregion

  //#region functions
  function Toast() {
    setShowToast(false)
  }

  async function CatchingData() {
    try {
      AsyncStorage.getItem("@One+_Notification").then(res => {
        if(res) {
          setNofitication(JSON.parse(res) || "[]");
          console.log('res', JSON.parse(res || "[]"));
        }
      }).catch(err => console.log(err));
    }catch(err) {console.log(err)}
  }
  
  //#endregion
  useEffect(() => {
    CatchingData();
  });

  return (
    <LinearGradient colors={['#26A77C', '#105B74']}>
      <SafeAreaView>
        <ToastMessage
          showToast={getShowToast}
          hideToast={setShowToast}
          function={Toast}
          message1={getMessage1}
          message2={getMessage2}
        />
      <Styled.Container style={{marginTop: Platform.OS === 'ios' ? 0 : '5%'}}>
        <Styled.Header>
          {SelectedCompany?.icone != undefined && SelectedCompany?.id != 28 && SelectedCompany?.id != 29 && SelectedCompany?.id != 1 && SelectedCompany?.id != 9 && SelectedCompany?.id != 2 && SelectedCompany?.id != 3 && SelectedCompany?.id != 27 && SelectedCompany?.id != 7 && SelectedCompany?.id != 8 &&
          <SvgCss
            xml={SelectedCompany?.icone}
            width={SelectedCompany?.id === 4 && 8 ? 60 : SelectedCompany?.id === 5 && 6 && 10 && 11 ? 70 : SelectedCompany?.id === 6 ? 80 : 70}
            height={SelectedCompany?.id === 4 && 10 ? 110 : SelectedCompany?.id === 5 && 6 && 8 && 10 && 11 ? 120 : SelectedCompany?.id === 6 ? 95 : 120}
            style={{marginTop: SelectedCompany?.id === 6 ? 10 : -25, marginRight: SelectedCompany?.id === 4 ? '3%' : SelectedCompany?.id === 5 ? '1.5%' : SelectedCompany?.id === 8 ? '3.5%' : SelectedCompany?.id === 11 ? '2%' : undefined}}
          />}
          {SelectedCompany?.icone == undefined || SelectedCompany?.id == 28 || SelectedCompany?.id == 29 || SelectedCompany?.id == 1 || SelectedCompany?.id == 9 || SelectedCompany?.id == 2 || SelectedCompany?.id == 3 || SelectedCompany?.id == 27 || SelectedCompany?.id == 7 || SelectedCompany?.id == 8 ?
          <SvgCss xml={OnePlusBranca} width={70} height={60} style={{marginBottom: -40}} />: undefined}
          <Styled.Profile activeOpacity={0.9} onPress={() => {
            // setMessage1("Informação"); setMessage2("Função em desenvolvimento."); setShowToast(true)
          }}>
            <Styled.TextProfile>{DataLogin?.pessoa?.nome?.split("")[0].toLocaleUpperCase()}{DataLogin?.pessoa?.nome?.split(" ")[1][0].toLocaleUpperCase()}</Styled.TextProfile>
          </Styled.Profile>
        </Styled.Header>
        {/* <Styled.Information>
          <Styled.TextInformation>Informação!</Styled.TextInformation>
          <Styled.TextInformation>Função em desenvolvimento.</Styled.TextInformation>
        </Styled.Information> */}
        {getNofitication.map((item: any) => 
        <Styled.SubContainer>
          <Text>{item?.title}</Text>
          <Text>{item?.body}</Text>
        </Styled.SubContainer>
        )}
      </Styled.Container>
      </SafeAreaView>
    </LinearGradient>
  );
}
