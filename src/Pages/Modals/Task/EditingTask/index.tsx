//#region React
import React, {useState, useEffect} from 'react';
import {Modal, TouchableOpacity, Platform, View} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {useSelector} from 'react-redux';
//#endregion

//#region Icons
import {ArrowBack} from '../../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Services
import * as Controllers from '../../../../Services/Controllers';
import { Object_ } from '../../../../Services/Objects';
//#endregion

//#region Styled
import { ToastMessage } from '../../../../Components';
import * as Modals from '../..';
import * as Styled from './styles';
//#endregion

import {ResponsiveWidth} from '../../../../Functions';


//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker';
//#endregion

export interface Props {
  visible: boolean;
  onPressClose(): void;
  item: Object_.Lead;
  setVisibleEditingTask:(value: boolean) => void;
  getSaleFunnel: Array<Object_.Funil>;
  getEdit: Object_.Tarefa;
  getSelectedSaleFunnel: Object_.Funil | undefined;
  setLeadTask:(value: Array<Object_.Tarefa> | undefined) => void;
  getLeadTask: Array<Object_.Tarefa> | undefined;
}


export const EditingTask = (props: Props) => {
  //#region useState
  const [getEditedTask, setEditedTask] = useState<string | undefined>(undefined);
  const [getLoading, setLoading] = useState<boolean>(false);
  const [getDate] = useState<Date>(new Date());
  const [getFirst, setFirst] = useState<boolean>(true);
  const [getShowToast, setShowToast] = useState<boolean>(false);
  const [getMessage1, setMessage1] = useState<string>("");
  const [getMessage2, setMessage2] = useState<string>("");

  const [getTitle, setTitle] = useState<string | undefined>(undefined);

  const [getStartPrediction, setStartPrediction] = useState<string | undefined>(undefined);
  const [getVisibleStartPrediction, setVisibleStartPrediction] = useState<boolean>(false);

  const [getTerminationPrediction, setTerminationPrediction] = useState<string | undefined>(undefined);
  const [getVisibleTerminationPrediction, setVisibleTerminationPrediction] = useState<boolean>(false);

  const [getTerminationDate, setTerminationDate] = useState<string | undefined>(undefined);
  const [getVisibleTerminationDate, setVisibleTerminationDate] = useState<boolean>(false);

  const [getPriority, setPriority] = useState<Array<Object_.Prioridade> | undefined>(undefined);
  const [getSelectedPriority, setSelectedPriority] = useState<Object_.Prioridade | undefined>(undefined);
  const [getVisiblePriority, setVisiblePriority] = useState<boolean>(false);

  const [getResponsible, setResponsible] = useState<Array<Object_.Usuario> | undefined>(undefined);
  const [getSelectedResponsible, setSelectedResponsible] = useState<Object_.Usuario | undefined>(undefined);
  const [getVisibleResponsible, setVisibleResponsible] = useState<boolean>(false);

  const [getRequester, setRequester] = useState<Array<Object_.Usuario> | undefined>(undefined);
  const [getSelectedRequester, setSelectedRequester] = useState<Object_.Usuario | undefined>(undefined);
  const [getVisibleRequester, setVisibleRequester] = useState<boolean>(false);
  //#endregion

  //#region Variables
  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);
  //#endregion

  //#region Functions
  function Toast() {
    setShowToast(false)
  }

  async function EditingTask() {
    setLoading(true)
    let FunnelPosition = props.getSelectedSaleFunnel?.posicoesDoFunil?.filter((item) => item.descricao == props.item.keyField)[0]
    let Body = {
      numero: props.getEdit.numero,
      prioridade: getSelectedPriority === undefined ? props.getEdit.prioridade : getSelectedPriority,
      solicitante: getSelectedRequester === undefined ? props.getEdit.solicitante : getSelectedRequester,
      executor: getSelectedResponsible === undefined ? props.getEdit.executor : getSelectedResponsible,
      assunto: getTitle === undefined ? props.getEdit.assunto : getTitle,
      descricao: getEditedTask === undefined ? props.getEdit.descricao : getEditedTask,
      previsaoDeInicio: getStartPrediction === undefined ? props.getEdit.previsaoDeInicio : getStartPrediction,
      previsaoDeTermino: getTerminationPrediction === undefined ? props.getEdit.previsaoDeTermino : getTerminationPrediction,
      DataDeTermino: getTerminationDate === undefined ? props.getEdit.DataDeTermino : getTerminationDate,
      DataDoCancelamento: undefined,
      funil: props.getSelectedSaleFunnel !== undefined ? props.getSelectedSaleFunnel : {} as Object_.Funil,
      posicaoDoFunil: FunnelPosition ? FunnelPosition : {} as Object_.PosicaoDoFunil,
    }

    let arrBody = [Body]
    console.log(JSON.stringify(arrBody), props.item.id, DataLogin?.token)
    let Response = await Controllers.Lead.AlterarTarefas(DataLogin?.token, SelectedCompany?.id, props.item.id, arrBody)
    if(Math.floor(Response.status / 100) === 2) {
      let listTaks = [...props.getLeadTask || []];
      let TaskIndex = listTaks.findIndex(item => item.numero == Body.numero);
      listTaks[TaskIndex] = Body;
      props.setLeadTask(listTaks)
      setEditedTask(undefined)
      setTitle(undefined)
      setStartPrediction(undefined)
      setTerminationPrediction(undefined)
      setTerminationDate(undefined)
      setSelectedPriority(undefined)
      setSelectedResponsible(undefined)
      setSelectedRequester(undefined)
      setLoading(false)
      props.setVisibleEditingTask(false)
    } else {
      console.log('ERROR', Response)
      setLoading(false)
      setMessage1("Erro!"); setMessage2("Entre em contato com a equipe de desenvolvimento!"); setShowToast(true)
    }
  }

  async function Priority() {
    let Response = await Controllers.Prioridade.Get(DataLogin?.token)
    if(Response.status === 200) {
      setPriority(Response.data)
    }
  }

  async function Users() {
    let Response = await Controllers.Logon.Usuarios(DataLogin?.token, SelectedCompany?.id ?? 0, undefined, undefined, undefined)
    if(Response.status === 200) {
      setResponsible(Response.data)
      setRequester(Response.data)
    }
  }
  //#endregion

  //#region UseEffect
  useEffect(() => {
    if(getFirst === true) {
      Priority();
      Users();
      setFirst(false);
    }
  }, []);
  //#endregion

  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <Styled.Container>
          {getLoading &&
          <Modals.ModalLoading
            transparent={true}
            visible={getLoading}
          />}
          <ToastMessage
            showToast={getShowToast}
            hideToast={setShowToast}
            function={Toast}
            message1={getMessage1}
            message2={getMessage2}
          />
          <Styled.ContainerHeader style={{marginTop: Platform.OS === 'ios' ? '15%' : '5%', opacity: getShowToast ? 0 : 1}}>
            <TouchableOpacity activeOpacity={0.9} onPress={props.onPressClose}>
              <SvgCss xml={ArrowBack} />
            </TouchableOpacity>
            <Styled.TextHeader>Editando Tarefa</Styled.TextHeader>
          </Styled.ContainerHeader>
          <Styled.SubContainer style={{marginTop: '7%'}}>
            <Styled.InputContainer>
              <View style={{flexDirection: 'row'}}>
                <Styled.TextInput>Titulo:</Styled.TextInput>
                <Styled.Input keyboardType='default' style={{width: ResponsiveWidth('65%')}} onChangeText={async (value: string) => setTitle(value)}>{props.getEdit.assunto}</Styled.Input>
              </View>
            </Styled.InputContainer> 
          </Styled.SubContainer>
          <Styled.SubContainer>
            <Styled.TouchableContainer activeOpacity={0.9} onPress={() => {setVisibleStartPrediction(true)}}>
              <View style={{flexDirection: 'row'}}>
                <Styled.TextInput>Previsão de início:</Styled.TextInput>
                <Styled.TextInput style={{marginLeft: '2%', width: "75%"}}>{getStartPrediction === undefined ? moment(props.getEdit.previsaoDeInicio).format("DD/MM/YYYY") : moment(getStartPrediction).format("DD/MM/YYYY")}</Styled.TextInput>
              </View>
            </Styled.TouchableContainer>
            <DatePicker
              modal
              mode='date'
              open={getVisibleStartPrediction}
              date={getDate}
              onConfirm={(date) => {
                setStartPrediction(date.toISOString())
                setVisibleStartPrediction(false)
              }}
              onCancel={() => {
                setVisibleStartPrediction(false)
              }}
            />
          </Styled.SubContainer>
          <Styled.SubContainer>
            <Styled.TouchableContainer activeOpacity={0.9} onPress={() => {setVisibleTerminationPrediction(true)}}>
              <View style={{flexDirection: 'row'}}>
                <Styled.TextInput>Previsão de término:</Styled.TextInput>
                <Styled.TextInput style={{marginLeft: '2%', width: "75%"}}>{getTerminationPrediction === "" ? moment(props.getEdit.previsaoDeTermino).format("DD/MM/YYYY") : moment(getTerminationPrediction).format("DD/MM/YYYY")}</Styled.TextInput>
              </View>
            </Styled.TouchableContainer>
            <DatePicker
              modal
              mode='date'
              open={getVisibleTerminationPrediction}
              date={getDate}
              onConfirm={(date) => {
                setTerminationPrediction(date.toISOString())
                setVisibleTerminationPrediction(false)
              }}
              onCancel={() => {
                setVisibleTerminationPrediction(false)
              }}
            />
          </Styled.SubContainer>
          <Styled.SubContainer>
            <Styled.TouchableContainer activeOpacity={0.9} onPress={() => {setVisibleTerminationDate(true)}}>
              <View style={{flexDirection: 'row'}}>
                <Styled.TextInput>Data de término:</Styled.TextInput>
                <Styled.TextInput style={{marginLeft: '2%', width: "50%"}}>{getTerminationDate === "" ? moment(props.getEdit.DataDeTermino).format("DD/MM/YYYY") : moment(getTerminationDate).format("DD/MM/YYYY")}</Styled.TextInput>
              </View>
            </Styled.TouchableContainer>
            <DatePicker
              modal
              mode='date'
              open={getVisibleTerminationDate}
              date={getDate}
              onConfirm={(date) => {
                setTerminationDate(date.toISOString())
                setVisibleTerminationDate(false)
              }}
              onCancel={() => {
                setVisibleTerminationDate(false)
              }}
            />
          </Styled.SubContainer>
          <Styled.SubContainer style={{marginTop: '10%'}}>
            <Styled.TouchableContainer activeOpacity={0.9} onPress={() => {setVisiblePriority(true)}}>
              <View style={{flexDirection: 'row'}}>
                <Styled.TextInput>Prioridade:</Styled.TextInput>
                <Styled.TextInput style={{marginLeft: '2%', width: "75%"}}>{getSelectedPriority === undefined ? props.getEdit.prioridade?.descricao : getSelectedPriority?.descricao}</Styled.TextInput>
              </View>
            </Styled.TouchableContainer>
            {getVisiblePriority &&
            <Modals.MultipleSelections
              marginLeft="10%"
              title="Prioridade"
              visible={getVisiblePriority}
              onPressClose={() => {setVisiblePriority(false)}}
              data={getPriority}
              renderItem={({item}) =>
                <Styled.ItemContainer onPress={() => {
                  setSelectedPriority(item)
                  setVisiblePriority(false)
                }}>
                  <Styled.Item>
                    <Styled.TextItem>{item?.descricao}</Styled.TextItem>
                  </Styled.Item>
                </Styled.ItemContainer>
              }
            />}
          </Styled.SubContainer>
          <Styled.SubContainer>
            <Styled.TouchableContainer activeOpacity={0.9} onPress={() => {setVisibleRequester(true)}}>
              <View style={{flexDirection: 'row'}}>
                <Styled.TextInput>Solicitante:</Styled.TextInput>
                <Styled.TextInput style={{marginLeft: '2%', width: "75%"}}>{getSelectedRequester === undefined ? props.getEdit.solicitante?.nome : getSelectedRequester?.nome}</Styled.TextInput>
              </View>
            </Styled.TouchableContainer>
            {getVisibleRequester &&
            <Modals.MultipleSelections
              marginLeft="10%"
              title="Solicitante"
              visible={getVisibleRequester}
              search={true}
              onPressClose={() => {setVisibleRequester(false)}}
              data={getRequester}
              renderItem={({item}) =>
                <Styled.ItemContainer onPress={() => {
                  setSelectedRequester(item)
                  setVisibleRequester(false)
                }}>
                  <Styled.Item>
                    <Styled.TextItem>{item?.nome}</Styled.TextItem>
                  </Styled.Item>
                </Styled.ItemContainer>
              }
            />}
          </Styled.SubContainer>
          <Styled.SubContainer>
            <Styled.TouchableContainer activeOpacity={0.9} onPress={() => {setVisibleResponsible(true)}}>
              <View style={{flexDirection: 'row'}}>
                <Styled.TextInput>Responsável:</Styled.TextInput>
                <Styled.TextInput style={{marginLeft: '2%', width: "75%"}}>{getSelectedResponsible === undefined ? props.getEdit.executor?.nome : getSelectedResponsible?.nome}</Styled.TextInput>
              </View>
            </Styled.TouchableContainer>
            {getVisibleResponsible &&
            <Modals.MultipleSelections
              marginLeft="10%"
              title="Responsável"
              visible={getVisibleResponsible}
              onPressClose={() => {setVisibleResponsible(false)}}
              data={getResponsible}
              search={true}
              renderItem={({item}) =>
                <Styled.ItemContainer onPress={() => {
                  setSelectedResponsible(item)
                  setVisibleResponsible(false)
                }}>
                  <Styled.Item>
                    <Styled.TextItem>{item?.nome}</Styled.TextItem>
                  </Styled.Item>
                </Styled.ItemContainer>
              }
            />}
          </Styled.SubContainer>
          <Styled.SubContainerTask>
            <Styled.SubContainerInput
              multiline={true}
              placeholderTextColor='#FFFFFF'
              placeholder='Edite a Tarefa...'
              onChangeText={(value: string) => {setEditedTask(value)}}
            />
          </Styled.SubContainerTask>
          <Styled.ContainerSubmit>
            <Styled.Submit onPress={() => {EditingTask()}} activeOpacity={0.8}>
              <Styled.TextSubmit>Editar Tarefa</Styled.TextSubmit>
            </Styled.Submit>
          </Styled.ContainerSubmit>
        </Styled.Container>
      </LinearGradient>
    </Modal>
  );
};