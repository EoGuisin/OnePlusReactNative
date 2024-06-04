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
import { Kanban } from '../../Catalog/Menu/PagesMenu/FunisDeVenda/type';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
//#endregion

export interface Props {
  visible: boolean;
  onPressClose(): void;
  item: Object_.Lead;
  getSaleFunnel: Array<Object_.Funil>;
  setLeadAnotation:(value: Array<Object_.Anotacao>) => void;
  getLeadAnotation: Array<Object_.Anotacao> | undefined;
  salaDeVendaID: number;
  areaID: number;
  funilID: number;
  funilDescription: string;
  posicaoDoFunilID: number;
  posicaoDoFunilDescription: string;
}


export const Anotation = (props: Props) => {
  //#region useState
  const [getVisibleNewAnotation, setVisibleNewAnotation] = useState<boolean>(false);
  const [getVisibleEditingAnotation, setVisibleEditingAnotation] = useState<boolean>(false);
  const [getEdit, setEdit] = useState<Object_.Anotacao>({} as Object_.Anotacao);
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
            <Styled.TextHeader>Anotação</Styled.TextHeader>
          </Styled.ContainerHeader>
          <Styled.TextHistoric>Histórico</Styled.TextHistoric>
          <Styled.SubContainer>
            {props?.getLeadAnotation!?.length > 0 ?
            <ScrollView>
            {props.getLeadAnotation?.map(item =>
            <TouchableOpacity onPress={() => {console.log(item); setVisibleEditingAnotation(true), setEdit(item)}} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              {getVisibleEditingAnotation &&
              <Modals.EditingAnotation
                onPressClose={() => {setVisibleEditingAnotation(false)}}
                visible={getVisibleEditingAnotation}
                setVisibleEditingAnotation={setVisibleEditingAnotation}
                getSaleFunnel={props.getSaleFunnel}
                item={props.item}
                getEdit={getEdit}
                setLeadAnotation={props.setLeadAnotation}
                getLeadAnotation={props.getLeadAnotation}
                funilID={props.funilID}
                funilDescription={props.funilDescription}
                posicaoDoFunilID={props.posicaoDoFunilID}
                posicaoDoFunilDescription={props.posicaoDoFunilDescription}
              />}
              <SvgCss xml={Flag} style={{marginRight: '2%'}}/>
              <Styled.ContainerAnotation>
                <>
                  <SvgCss xml={Edition} style={{margin: '-2%', marginLeft: '-10%'}} />
                </>
                <Styled.AnotationText1>{item.descricao}</Styled.AnotationText1>
                <Styled.AnotationText2>{moment(item.dataDaAnotacao).format("DD/MM/YYYY")}</Styled.AnotationText2>
              </Styled.ContainerAnotation>
            </TouchableOpacity>)}
            </ScrollView> :
            <Styled.ContainerNoAnotation>
              <Styled.NoAnotationText>Não há anotações criadas no momento.</Styled.NoAnotationText>
            </Styled.ContainerNoAnotation>}
          </Styled.SubContainer>
          <Styled.ContainerSubmit>
            <Styled.Submit onPress={() => {setVisibleNewAnotation(true)}} activeOpacity={0.8}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <SvgCss xml={Plus} style={{marginLeft: '5%'}}/>
                <Styled.TextSubmit>Criar Anotação</Styled.TextSubmit>
              </View>
              {getVisibleNewAnotation &&
              <Modals.NewAnotation 
                onPressClose={() => {setVisibleNewAnotation(false)}}
                visible={getVisibleNewAnotation}
                item={props.item}
                setVisibleNewAnotation={setVisibleNewAnotation}
                getSaleFunnel={props.getSaleFunnel}
                setLeadAnotation={props.setLeadAnotation}
                getLeadAnotation={props.getLeadAnotation}
                funilID={props.funilID}
                posicaoDoFunilID={props.posicaoDoFunilID}
                areaID={props.areaID}
                salaDeVendaID={props.salaDeVendaID}
                funilDescription={props.funilDescription}
                posicaoDoFunilDescription={props.posicaoDoFunilDescription}
              />}
            </Styled.Submit>
          </Styled.ContainerSubmit>
        </Styled.Container>
      </LinearGradient>
    </Modal>
  );
};

Anotation.propTypes = {
  visible: PropTypes.bool,
  onPressClose: PropTypes.func,
  getLeadFunction: PropTypes.func,
  item: PropTypes.object,
  getSaleFunnel: PropTypes.object,
  setLeadAnotation: PropTypes.func,
  getLeadAnotation: PropTypes.array,
};
