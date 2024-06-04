//#region React
import React, {useState, useEffect} from 'react';
import {Modal, TouchableOpacity, Platform, View, ScrollView, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {useSelector} from 'react-redux';
//#endregion

//#region Icons
import {ArrowBack, Plus, Edition, Flag} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Services
import { Object_ } from '../../../Services/Objects';
//#endregion

//#region Styled
import * as Modals from '..';
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
  getSelectedSaleFunnel: Object_.Funil | undefined;
  setLeadTask:(value: Array<Object_.Tarefa> | undefined) => void;
  getLeadTask: Array<Object_.Tarefa> | undefined;
  salaDeVendaID: number;
  areaID: number;
}


export const Task = (props: Props) => {
  //#region useState
  const [getVisibleNewTask, setVisibleNewTask] = useState<boolean>(false);
  const [getVisibleEditingTask, setVisibleEditingTask] = useState<boolean>(false);
  const [getEdit, setEdit] = useState<Object_.Tarefa>({} as Object_.Tarefa);
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
            <Styled.TextHeader>Tarefas</Styled.TextHeader>
          </Styled.ContainerHeader>
          <Styled.TextHistoric>Histórico</Styled.TextHistoric>
          <Styled.SubContainer>
          {props.getLeadTask!?.length > 0 ?
            <FlatList 
              style={{marginBottom: '5%'}}
              showsVerticalScrollIndicator={false}
              data={props.getLeadTask}
              renderItem={({item}) => 
                <TouchableOpacity onPress={() => {{setVisibleEditingTask(true), setEdit(item)}}} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <SvgCss xml={Flag} style={{marginRight: '2%'}}/>
                <Styled.ContainerTask>
                  {getVisibleEditingTask &&
                  <Modals.EditingTask 
                    onPressClose={() => {setVisibleEditingTask(false)}}
                    visible={getVisibleEditingTask}
                    setVisibleEditingTask={setVisibleEditingTask}
                    getSaleFunnel={props.getSaleFunnel}
                    item={props.item}
                    getEdit={getEdit}
                    getSelectedSaleFunnel={props.getSelectedSaleFunnel}
                    setLeadTask={props.setLeadTask}
                    getLeadTask={props.getLeadTask}
                  />}
                    <SvgCss xml={Edition} style={{margin: '-2%', marginLeft: '-10%'}} />
                  <Styled.AnotationText1>{item.assunto}</Styled.AnotationText1>
                  <Styled.AnotationText1>{item.descricao}</Styled.AnotationText1>
                  <Styled.AnotationText2>{moment(item.previsaoDeInicio).format("DD/MM/YYYY")}</Styled.AnotationText2>
                </Styled.ContainerTask>
              </TouchableOpacity>
              }
            /> :
            <Styled.ContainerNoTasks>
              <Styled.NoTasksText>Não há tarefas criadas no momento.</Styled.NoTasksText>
            </Styled.ContainerNoTasks>}
          </Styled.SubContainer>
          <Styled.ContainerSubmit>
            <Styled.Submit onPress={() => {setVisibleNewTask(true)}} activeOpacity={0.8}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <SvgCss xml={Plus} style={{marginLeft: '5%'}}/>
                <Styled.TextSubmit>Criar Tarefa</Styled.TextSubmit>
              </View>
              {getVisibleNewTask &&
              <Modals.NewTask 
                onPressClose={() => {setVisibleNewTask(false)}}
                visible={getVisibleNewTask}
                item={props.item}
                setVisibleNewTask={setVisibleNewTask}
                getSaleFunnel={props.getSaleFunnel}
                getSelectedSaleFunnel={props.getSelectedSaleFunnel}
                setLeadTask={props.setLeadTask}
                getLeadTask={props.getLeadTask}
                areaID={props.areaID}
                salaDeVendaID={props.salaDeVendaID}
              />}
            </Styled.Submit>
          </Styled.ContainerSubmit>
        </Styled.Container>
      </LinearGradient>
    </Modal>
  );
};