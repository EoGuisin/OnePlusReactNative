//#region React
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, View, FlatList, Platform} from 'react-native';
//#endregion

//#region Navigation 
import { useFocusEffect } from '@react-navigation/native';
//#endregion

//#region Styled
import * as Styled from './styles'
import { ToastMessage } from '../../../Components';
//#endregion

//#region Images & Icons
import {Highlights01, Highlights02, Highlights03, OnePlusBranca} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Services
import * as Controllers from '../../../Services/Controllers';
import { ResponsiveHeight } from '../../../Functions';
import { Object_ } from '../../../Services/Objects';
import { Rooms } from '../Menu'
//#endregion

//#region ViewModel
import viewModel from './ViewModel';
//#endregion

//#region Redux
import { useSelector } from 'react-redux';
//#endregion

import Lottie from 'lottie-react-native';
import { LoadingInformations } from '../../../Animation';

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
//#endregion

export const Home: React.FC<viewModel> = (viewModel) => {
  //#region Variables
  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);
  const Highlights = [
    {image: Highlights01},
    {image: Highlights03},
    {image: Highlights02},
  ]
  //#endregion
  console.log(DataLogin.token)
  //#region useState
  const [getShowToast, setShowToast] = useState<boolean>(false);
  const [getMessage1, setMessage1] = useState<string>("");
  const [getMessage2, setMessage2] = useState<string>("");
  const [getSummaryBoard, setSummaryBoard] = useState<Array<Object_.QuadroResumo> | null>();
  const [getFavorite, setFavorite] = useState<Rooms | undefined>();
  //#endregion

  //#region Functions
  function Toast() {
    setShowToast(false)
  }
  
  async function SummaryBoard() {
    let Response = await Controllers.Menu.QuadroResumo(DataLogin?.token, SelectedCompany?.id );
    if (Math.floor(Response.status / 100) === 2) {
      setSummaryBoard(Response.data);
    } else {
      console.log(Response)
      setSummaryBoard(null)
      setMessage1("Erro"); setMessage2('Não foi possível trazer o quadro de resumo.'); setShowToast(true)
    }
  }

  async function HandleFetchData() {
    const Response = await AsyncStorage.getItem("@OnePlus:Favorites");
    const Data = Response ? JSON.parse(Response) : {};
    setFavorite(Data);
  }
  //#endregion

  //#region UseEffect
  useEffect(() => {
    SummaryBoard();
  }, []);
  //#endregion

  //#region useFocusEffect
  useFocusEffect(useCallback(() => {
    HandleFetchData();
  }, []));
  //#endregion

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
        <Styled.Header style={{opacity: getShowToast ? 0 : 1}}>
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
            setMessage1('Informação'); setMessage2('Função em desenvolvimento.'); setShowToast(true)
          }}>
            <Styled.TextProfile>{DataLogin?.pessoa?.nome?.split("")[0].toLocaleUpperCase()}{DataLogin?.pessoa?.nome?.split(" ")[1][0].toLocaleUpperCase()}</Styled.TextProfile>
          </Styled.Profile>
        </Styled.Header>

        {/*Favorites*/}
        <Styled.FavoritesContainer>
          <Styled.TextFavorites style={{opacity: getShowToast ? 0 : 1}}>Favoritos</Styled.TextFavorites>
          {getFavorite !== undefined &&
            <Styled.MenuCardContainer>
              <Styled.MenuCard activeOpacity={0.8} onPress={() => {
                setMessage1('Informação'); setMessage2('Função em desenvolvimento.'); setShowToast(true)
              }}>
                <Styled.TextMenuCard></Styled.TextMenuCard>
              </Styled.MenuCard>
            </Styled.MenuCardContainer>
          }
        </Styled.FavoritesContainer>
        {/*Highlights*/}
        <Styled.HighlightsContainer>
          <Styled.TextHighlights>Destaques</Styled.TextHighlights>
          <FlatList 
            data={Highlights}
            keyExtractor={(item) => item.image}
            renderItem={({item: {image}}) => (
              <SvgCss xml={image} style={{marginLeft: 10}} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            snapToInterval={205}
          />
        </Styled.HighlightsContainer>
        <Styled.OverviewContainer>
          <Styled.TextOverview>Visão geral</Styled.TextOverview>
            {getSummaryBoard?.length == 0 &&
              <Styled.ContainerNoOverview>
                <Styled.TextNoOverview>Não há visão geral no momento.</Styled.TextNoOverview>
              </Styled.ContainerNoOverview>}
            {getSummaryBoard === null && 
              <Styled.ContainerNoOverview>
                <Styled.TextNoOverview>Erro! Não foi possível trazer o quadro de resumo.</Styled.TextNoOverview>
              </Styled.ContainerNoOverview>}
          <ScrollView showsVerticalScrollIndicator={false}>
          {getSummaryBoard === undefined &&
          <View>
            <Styled.TextNoOverview>{`Aguarde. \ntrazendo a visão geral...`}</Styled.TextNoOverview>
            <Styled.Loading style={{height: ResponsiveHeight('6.5%')}}>
              <Lottie source={LoadingInformations} resizeMode={'contain'} autoPlay loop />
            </Styled.Loading>
          </View>}
          {getSummaryBoard?.map((item) =>
          <Styled.Overview>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Styled.SvgOverview>
                <SvgCss xml={item.icone} height={item.titulo === "Propostas Confirmadas" ? "15" : "24"} />
              </Styled.SvgOverview>
              <View style={{flexDirection:'column', marginLeft:'5%'}}>
                  <Styled.TextOverview>{item.valor}</Styled.TextOverview>
                <Styled.TextOverview>{item.titulo}</Styled.TextOverview>
              </View>
            </View>
          </Styled.Overview>)}
          </ScrollView>
        </Styled.OverviewContainer>
      </Styled.Container>
      </SafeAreaView>
    </LinearGradient>
  );
}
