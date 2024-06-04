//#region React
import React, {useState} from 'react';
import {Platform, ScrollView, View} from 'react-native';
//#endregion

//#region Styled
import * as Styled from './styles'
import { ToastMessage } from '../../../Components';
//#endregion

//#region Services
import { Object_ } from '../../../Services/Objects';
//#endregion

//#region Images & Logos
import { 
  ConfigDoFunil,
  Bordero,
  Organograma,
  RDStation,
  FluxoDeSala,
  ControleDeComissao,
  Disponibilidade,
  VendaDireta,
  GestaoDeBrindes,
  GestaoDeLead,
  WhiteConfig,
  FaleConosco,
  GeradorDeDocumentos,
  MeusContratos,
  OnePlusBranca,
} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region ViewModel
import viewModel from './ViewModel';
//#endregion

//#region Redux
import { useSelector } from 'react-redux';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
//#endregion

  //#region Interface
  export interface Rooms {
    id: string,
    sala: string,
    icon: any,
    checked: boolean,
  }
  //#endregion
  

export const Menu: React.FC<viewModel> = (viewModel) => {
  //#region useState
  const [getIsFavorite, setIsFavorite] = useState(false);
  const [getFavorite, setFavorite] = useState<string|null>(null);
  const [getShowToast, setShowToast] = useState<boolean>(false);
  const [getMessage1, setMessage1] = useState<string>("");
  const [getMessage2, setMessage2] = useState<string>("");
  //#endregion

  //#region Variables
  const DataLogin: Object_.SignIn = useSelector((state:any) => state.DataLogin)
  const SelectedCompany = useSelector((state:any) => state.SelectedCompany)
  //#endregion
  
  //#region Function
  async function addFavorite(itemObject_: Rooms) {
    const Response = await AsyncStorage.getItem("@OnePlus:Favorites");
    const PreviousData = Response ? JSON.parse(Response) : {}
    const Data = {...PreviousData, itemObject_};
    await AsyncStorage.setItem("@OnePlus:Favorites", JSON.stringify(Data));
  }

  function Toast() {
    setShowToast(false)
  }
  //#endregion


  //#region TSX
  return (
    <LinearGradient colors={['#26A77C', '#105B74']} style={{height:'100%'}}>
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
            <Styled.TextMenu>Menu</Styled.TextMenu>
            <Styled.Profile activeOpacity={0.9} onPress={() => {
              setMessage1("Informação"); setMessage2("Função em desenvolvimento."); setShowToast(true)
            }}>
              <Styled.TextProfile>{DataLogin?.pessoa?.nome?.split("")[0].toLocaleUpperCase()}{DataLogin?.pessoa?.nome?.split(" ")[1][0].toLocaleUpperCase()}</Styled.TextProfile>
            </Styled.Profile>
          </Styled.Header>
          <ScrollView>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', }}>
              {DataLogin?.grupoDeEmpresasComPermissaoDeAcesso.filter(item => item.grupoDeEmpresas.id === SelectedCompany?.id).map(item => item.modulosDeAcesso.map(item => item.id != "CONF" && item.id !=  "CONFU" && item.id != "ACMSL" && item.id != "CTRSL" &&<Styled.MenuCard activeOpacity={0.5} onPress={() => {
                  item.id === "ORGRM" ||
                  item.id === "GEDOC" ||
                  item.id === "FLXSL" ||
                  item.id === "BRDRO" ||
                  item.id === "CTRCO" ||
                  item.id === "GSTBR" ||
                  item.id === "MECTR" ||
                  item.id === "GSTLD" ||
                  item.id === "FLATD" ||
                  item.id === "ATEND" ||
                  item.id === "PAGTO" ||
                  item.id === "SERAS" ? (
                    setMessage1("Informação"), setMessage2(`${item.descricao}\nFunção em desenvolvimento!`), setShowToast(true)
                  )
                  : item.id === "DISPO" ? viewModel.navigation.navigate("ScreenDisponibilidade")
                  : item.id === "VENDA" ? viewModel.navigation.navigate("ScreenVendaDireta")
                  : item.id === "FUNIS"? viewModel.navigation.navigate("ScreenFunisDeVenda")
                  // : item.id === "RDSTN" ? viewModel.navigation.navigate("ScreenRDStation")
                  : undefined
                }}>
                  <Styled.TextMenuCard>{item.id === "ATEND" || item.id === "PAGTO" || item.id === "SERAS" ? item.descricao : item.descricao}</Styled.TextMenuCard>
                  <SvgCss xml={
                    item.id === "CONF" ? WhiteConfig
                    : item.id === "GEDOC" ? GeradorDeDocumentos
                    : item.id === "ORGRM" ? Organograma
                    : item.id === "RDSTN" ? RDStation
                    : item.id === "FLXSL" ? FluxoDeSala
                    : item.id === "BRDRO" ? Bordero
                    : item.id === "CTRCO" ? ControleDeComissao
                    : item.id === "GSTBR" ? GestaoDeBrindes
                    : item.id === "MECTR" ? MeusContratos
                    : item.id === "GSTLD" ? GestaoDeLead
                    : item.id === "FLATD" ? FaleConosco
                    : item.id === "ATEND" ? null
                    : item.id === "PAGTO" ? null
                    : item.id === "SERAS" ? null
                    : item.id === "DISPO" ? Disponibilidade
                    : item.id === "VENDA" ? VendaDireta
                    : item.id === "FUNIS" ? ConfigDoFunil
                    : null
                  } style={{alignSelf: 'center', margin: '15%'}} />
                </Styled.MenuCard>))}
            </View>
          </ScrollView>
        </Styled.Container>
      </SafeAreaView>
    </LinearGradient>
  );
}
//#endregion
