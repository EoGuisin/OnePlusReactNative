//#region React
import React, {useState, useEffect} from 'react';
import {Modal, TouchableOpacity, Platform, View, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {useSelector} from 'react-redux';
//#endregion

//#region Icons
import {ArrowBack, Plus, Edition, Flag} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Services
import * as Controllers from '../../../Services/Controllers';
import { Object_ } from '../../../Services/Objects';
//#endregion

//#region Styled
import * as Modals from '../';
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
}


export const Email = (props: Props) => {
  //#region useState
  const [getVisibleNewEmail, setVisibleNewEmail] = useState<boolean>(false);
  //#endregion

  //#region Variables
  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);
  //#endregion

  //#region UseEffect
  useEffect(() => {
  }, []);
  //#endregion

  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <Styled.Container>
          <Styled.ContainerHeader style={{marginTop: Platform.OS === 'ios' ? '15%' : '5%'}}>
            <TouchableOpacity activeOpacity={0.9} onPress={props.onPressClose}>
              <SvgCss xml={ArrowBack} />
            </TouchableOpacity>
            <Styled.TextHeader>Emails</Styled.TextHeader>
          </Styled.ContainerHeader>
          <Styled.SubContainer>
            {props.item?.emailsEnviados!?.length > 0 ?
            <ScrollView>
            {props.item?.emailsEnviados?.map(item =>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <SvgCss xml={Flag} style={{marginRight: '2%'}}/>
              <Styled.ContainerEmail>
                <Styled.AnotationText1 style={{marginTop: 0, fontSize: 15}}>{item.assunto}</Styled.AnotationText1>
                <Styled.AnotationText1>{item.descricao}</Styled.AnotationText1>
                <Styled.AnotationText2>Para: {item.para}</Styled.AnotationText2>
                <Styled.AnotationText2>{moment(item.dataDoEmail).format('DD [de] MMMM [de] YYYY [às] HH:MM')}</Styled.AnotationText2>
              </Styled.ContainerEmail>
            </View>)}
            </ScrollView> :
            <Styled.ContainerNoEmail>
              <Styled.NoEmailText>Não há emails enviados no momento.</Styled.NoEmailText>
            </Styled.ContainerNoEmail>
            }
          </Styled.SubContainer>
          <Styled.ContainerSubmit>
            <Styled.Submit onPress={() => {setVisibleNewEmail(true)}} activeOpacity={0.8}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <SvgCss xml={Plus} style={{marginLeft: '5%'}}/>
                <Styled.TextSubmit>Criar Email</Styled.TextSubmit>
              </View>
              {getVisibleNewEmail &&
              <Modals.NewEmail 
                onPressClose={() => {setVisibleNewEmail(false)}}
                visible={getVisibleNewEmail}
                item={props.item}
                getSaleFunnel={props.getSaleFunnel}
                setVisibleNewEmail={setVisibleNewEmail}
              />}
            </Styled.Submit>
          </Styled.ContainerSubmit>
        </Styled.Container>
      </LinearGradient>
    </Modal>
  );
};

Email.propTypes = {
  visible: PropTypes.bool,
  onPressClose: PropTypes.func,
  getLeadFunction: PropTypes.func,
  item: PropTypes.object,
  getSaleFunnel: PropTypes.object,
};
