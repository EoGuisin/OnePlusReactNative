//#region React
import React, {useState} from 'react';
import {Modal, TouchableOpacity, Platform, View} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/pt-br'
import {useSelector} from 'react-redux';
//#endregion

//#region Icons
import {ArrowBack, Plus} from '../../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Services
import * as Controllers from '../../../../Services/Controllers';
import { Object_ } from '../../../../Services/Objects';
//#endregion

//#region Styled
import * as Modals from '../../';
import * as Styled from './styles';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
//#endregion

export interface Props {
  visible: boolean;
  onPressClose(): void;
  item: Object_.Lead;
  getSaleFunnel: Array<Object_.Funil>;
  setLeadLinkGifts:(value: Array<Object_.ItemDoAlmoxarifadoDeBrinde>) => void;
  getLeadLinkGifts: Array<Object_.ItemDoAlmoxarifadoDeBrinde> | undefined;
  getWarehouse: Array<Object_.ItemDoAlmoxarifadoDeBrinde> | undefined
}


export const NewLinkGifts = (props: Props) => {
  //#region useState
  const [getSelectedGift, setSelectedGift] = useState<Object_.ItemDoAlmoxarifadoDeBrinde>({} as Object_.ItemDoAlmoxarifadoDeBrinde);
  const [getVisibleWarehouse, setVisibleWarehouse] = useState<boolean>(false);
  const [getLoading, setLoading] = useState<boolean>(false);
  //#endregion

  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);

  async function LinkGifts() {
    setLoading(true);
    let Response = await Controllers.Lead.NovoBrinde(DataLogin?.token, SelectedCompany?.id, props.item?.id, getSelectedGift)
    if(Math.floor(Response.status / 100) === 2) {
      let listGifts = [...props.getLeadLinkGifts || []]
      listGifts.push(Response.data)
      props.setLeadLinkGifts(listGifts)
      setLoading(false)
    } else {
      console.log('fudeu')
      setLoading(false)
    }
  }

  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <Styled.Container>
          <Styled.ContainerHeader style={{marginTop: Platform.OS === 'ios' ? '15%' : '5%'}}>
            <TouchableOpacity activeOpacity={0.9} onPress={props.onPressClose}>
              <SvgCss xml={ArrowBack} />
            </TouchableOpacity>
            <Styled.TextHeader>Vincular Brinde</Styled.TextHeader>
          </Styled.ContainerHeader>
          <Styled.SubContainer>
            <Styled.TouchableContainer activeOpacity={0.9} onPress={() => {setVisibleWarehouse(true)}}>
              <View style={{flexDirection: 'row'}}>
                <Styled.TextInput>Selecionar Brinde:</Styled.TextInput>
                <Styled.TextInput style={{marginLeft: '2%', width: "50%"}}>{getSelectedGift?.brinde?.descricao}</Styled.TextInput>
              </View>
              {getVisibleWarehouse && 
              <Modals.MultipleSelections
                marginLeft="10%"
                title="Selecionar Brinde"
                search={false}
                visible={getVisibleWarehouse}
                onPressClose={() => {setVisibleWarehouse(false)}}
                data={props.getWarehouse}
                renderItem={({item}) =>
                  <Styled.ItemContainer onPress={() => {
                    setSelectedGift(item)
                    setVisibleWarehouse(false)
                  }}>
                    <Styled.Item>
                      <Styled.TextItem>{item?.brinde?.descricao}</Styled.TextItem>
                    </Styled.Item>
                  </Styled.ItemContainer>}
              />}
            </Styled.TouchableContainer>
          </Styled.SubContainer>
          <Styled.ContainerSubmit>
            <Styled.Submit onPress={() => {LinkGifts()}} activeOpacity={0.8}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <SvgCss xml={Plus} style={{marginLeft: '5%'}}/>
                <Styled.TextSubmit>Vincular</Styled.TextSubmit>
              </View>
              {getLoading &&
              <Modals.ModalLoading 
                transparent={true}
                visible={getLoading}
              />}
            </Styled.Submit>
          </Styled.ContainerSubmit>
        </Styled.Container>
      </LinearGradient>
    </Modal>
  );
};

NewLinkGifts.propTypes = {
  visible: PropTypes.bool,
  onPressClose: PropTypes.func,
  getLeadFunction: PropTypes.func,
  item: PropTypes.object,
  getSaleFunnel: PropTypes.object,
  setLeadLinkGifts: PropTypes.func,
  getLeadLinkGifts: PropTypes.array,
  getWarehouse: PropTypes.array,
};
