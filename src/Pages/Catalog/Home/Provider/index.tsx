//#region React
import React, {useEffect, useState} from 'react';
import {Keyboard, Pressable, FlatList, View, Platform, ScrollView} from 'react-native';
import moment from 'moment';
//#endregion

//#region Components
import * as Styled from './styles';
import * as Component from '../../../../Components';
import * as Modals from '../../../Modals';
//#endregion

//#region ViewModel
import viewModel from './ViewModel';
//#endregion

//#region Services
import * as Controllers from '../../../../Services/Controllers';
import {Object_} from '../../../../Services/Objects';
//#endregion

//#region Assets
import {OnePlusBranca, Profile} from '../../../../Assets';
import {SvgCss} from 'react-native-svg';
import { LoadingInformations } from '../../../../Animation';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
import {getStatusBarHeight} from 'react-native-status-bar-height';
//#endregion

//#region Redux
import { useSelector } from 'react-redux';
//#endregion

//#region Functions
import { ResponsiveHeight } from '../../../../Functions';
import * as TextFormat from '../../../../Themes/TextFormat';
//#endregion

export const Provider: React.FC<viewModel> = viewModel => {
  interface Gifts {
    leadId: number,
    leadNome: string,
    codigoDeValidacao: string,
    itemDoAlmoxarifado: Object_.ItemDoAlmoxarifadoDeBrinde,
    numeroDaNF: number,
    nf: Object_.Anexo
  }
  interface Summary {
    label: string,
    value: number,
    id: number,
    quantity: null | number,
  }

  //#region UseState
  const [getVisibleGifts, setVisibleGifts] = useState<boolean>(false);
  const [getFirst, setFirst] = useState<boolean>(true);
  
  const [getOriginalProviderLogin, setOriginalProviderLogin] = useState<Gifts[]>([]);
  //#endregion

  //#region Variables
  const ProviderLogin: Array<Gifts> = useSelector((state:any) => state.ProviderLogin);
  const ProviderSummary: Array<Summary> = useSelector((state:any) => state.ProviderSummary);
  //#endregion

  //#region UseEffect
  useEffect(() => {
    if(getFirst) {
      setFirst(false)
      setOriginalProviderLogin(ProviderLogin)
    }
  }, []);
  //#endregion

  //#region TSX
  return (
    <View>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <Styled.Container>
          <Styled.Header>
            <SvgCss 
              xml={OnePlusBranca} 
              width={118}
              height={60}
            />
            <Styled.Profile activeOpacity={0.9} onPress={() => {}}>
              <SvgCss xml={Profile} style={{alignSelf: 'center'}} />
            </Styled.Profile>
          </Styled.Header>
          <View style={{marginHorizontal: '5%'}}>
          <FlatList 
            style={{marginTop: '5%', height: '10%'}}
            data={ProviderSummary}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) =>
              <Styled.SubContainer_1 activeOpacity={1}>
                <Styled.SubContainerText style={{fontSize: 15, right: item.id !== 3 ? 30 : 10}}>{item?.label}</Styled.SubContainerText>
                {item.quantity != null &&
                  <Styled.SubContainerText style={{fontSize: 16, right: 30, marginTop: 10}}>{item.quantity}</Styled.SubContainerText>}
                <Styled.SubContainerText style={{fontSize: 16, marginTop: item.id !== 3 ? 40 : 10}}>{item?.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Styled.SubContainerText>
              </Styled.SubContainer_1>
            }
          />
          <Styled.Title>Histórico de brindes...</Styled.Title>
          <ScrollView style={{height: '60%'}} showsVerticalScrollIndicator={false}>
          {ProviderLogin.map((item) => item.itemDoAlmoxarifado.status?.id === 4 &&
              <Styled.SubContainer_2 activeOpacity={1}>
                <Styled.SubContainerText_2>Cliente: {item.leadNome}</Styled.SubContainerText_2>
                <Styled.SubContainerText_2>Brinde: {item.itemDoAlmoxarifado.brinde.descricao}</Styled.SubContainerText_2>
                <Styled.SubContainerText_2>Data: {moment(item.itemDoAlmoxarifado.dataCadastro).format("DD/MM/YYYY")}</Styled.SubContainerText_2>
                <Styled.SubContainerText_2>Horário: {moment(item.itemDoAlmoxarifado.dataCadastro).format("HH:mm")}</Styled.SubContainerText_2>
                <Styled.SubContainerText_2>Total: {item.itemDoAlmoxarifado.valorUnitario.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Styled.SubContainerText_2>
              </Styled.SubContainer_2>
            )}
          </ScrollView>
          <Styled.ContainerSubmit>
            <Styled.Submit onPress={() => {setVisibleGifts(true)}} activeOpacity={0.8}>
                <Styled.TextSubmit>Consultar brindes</Styled.TextSubmit>
                <Modals.Gifts
                  onPressClose={() => {setVisibleGifts(false)}}
                  visible={getVisibleGifts}
                  OriginalProviderLogin={getOriginalProviderLogin}
                />
            </Styled.Submit>
          </Styled.ContainerSubmit>
          </View>
        </Styled.Container>
      </LinearGradient>
    </View>
  );
  //#endregion
};