//#region React
import React, {useEffect, useState} from 'react';
import {Modal, TouchableOpacity, Platform, FlatList, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import moment from 'moment';
//#endregion

//#region Icons
import {ArrowBack} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Services
import * as Controllers from '../../../Services/Controllers';
import { Object_ } from '../../../Services/Objects';
//#endregion

//#region Styled
import * as Modals from '../../Modals';
import {Switch, ToastMessage} from '../../../Components';
import * as Styled from './styles';
//#endregion

//#region Externals Directorys
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';
//#endregion

interface Props {
  visible: boolean;
  item: Object_.Lead;
  getSaleFunnel: Array<Object_.Funil>;
  getResponse: Object_.Perguntas[] | undefined;
  setResponse: (value: Object_.Perguntas[] | undefined) => void;
  getForm: Object_.Formulario[] | undefined;
  setForm: (value: Object_.Formulario[] | undefined) => void;
  setVisibleForm: (value: boolean) => void;
  salaDeVendaID: number;
  areaID: number;
  funilID: number;
}

export const Form = (props: Props) => {
  //#region Variables
  const [date] = useState<Date>(new Date());
  const [getOpenDate, setOpenDate] = useState<boolean>();
  const [getOpenHour, setOpenHour] = useState<boolean>();
  const [getLoading, setLoading] = useState<boolean>();
  const [getFunctionForm, setFunctionForm] = useState<number>(0);
  const [getYerNo, setYerNo] = useState<boolean>(false);
  const [getShowToast, setShowToast] = useState<boolean>(false);
  const [getMessage1, setMessage1] = useState<string>("");
  const [getMessage2, setMessage2] = useState<string>("");
  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);
  //#endregion

  //#region Functions
  async function CatchingForm() {
    setFunctionForm(1)
    let funil = props.funilID;
    let Response = await Controllers.Formulario.Get(DataLogin?.token, SelectedCompany?.id, funil)
    if (Math.floor(Response.status / 100) === 2) {
      props.setForm(Response.data)
    } else {
      console.error(Response)
    }
  }

  async function YerOrNo(item: Object_.Perguntas, index: number) {
    if(getYerNo == true) {
      setYerNo(false);
    } else {
      setYerNo(true);
    }
    item.resposta = getYerNo;
    if(props.getResponse!?.length > 0) {
      props.getResponse![index]?.resposta
      props.setResponse(props.getResponse)
    } else {
      props.getForm![0]?.perguntas[index].resposta
      props.setForm(props.getForm)
    }
  }

  async function ValidatingData() {
    if(props.getResponse!?.length > 0) {
      if (props.getResponse?.some((Item) => {
        if(Item.classificacao.id == 3 && !Item.resposta) {
          Item.resposta = false
        }
        if(Item.classificacao.id != 3) {
          if(Item.obrigatorio && !Item.resposta) {
            setMessage1("Campo obrigatório!"); setMessage2(`A pergunta '${Item.titulo}' é obrigatória. Todos os campos com * são obrigatórios.`); setShowToast(true)
            return true;
          }
        }
        return false;
      }) == true) {
        return false;
      }
    } else {
      if (props.getForm![0]?.perguntas?.some((Item) => {
        if(Item.classificacao.id == 3 && !Item.resposta) {
          Item.resposta = false
        }
        if(Item.classificacao.id != 3) {
          if(Item.obrigatorio && !Item.resposta) {
            setMessage1("Campo obrigatório!"); setMessage2(`A pergunta '${Item.titulo}' é obrigatória. Todos os campos com * são obrigatórios.`); setShowToast(true)
            return true;
          }
        }
        return false;
      }) == true) {
        return false;
      }
    }
    return true;
  }

  async function Update() {
    setLoading(true)
    let body = {
      dataDeCadastro: props.item?.dataDeCadastro,
      id: props.item?.id,
      cpf: props.item?.cpf,
      nome: props.item?.nome,
      dataDeNascimento: props.item?.dataDeNascimento,
      idade: props.item?.idade,
      naturalidade: props.item?.naturalidade,
      nacionalidade: props.item?.nacionalidade,
      sexo: props.item?.sexo,
      emails: props.item?.emails,
      fotoDoLead: props.item?.fotoDoLead,
      documentoPessoal: props.item?.documentoPessoal,
      rg: props.item?.rg,
      cnh: props.item?.cnh,
      filiacao01: props.item?.filiacao01,
      filiacao02: props.item?.filiacao02,
      estadoCivil: props.item?.estadoCivil,
      certidaoDeCasamento: props.item?.certidaoDeCasamento,
      regimeDeCasamento: props.item?.regimeDeCasamento,
      ocupacao: props.item?.ocupacao,
      renda: props.item?.renda,
      dadosDosVeiculos: props.item?.dadosDosVeiculos,
      dependentes: props.item?.dependentes,
      endereco: props.item?.endereco,
      documentoEndereco: props.item?.documentoEndereco,
      telefones: props.item?.telefones,
      localDeCaptacao: props.item?.localDeCaptacao,
      status: props.item?.status,
      alturaDoItem: props.item?.alturaDoItem,
      historicoDoFunil: props.item?.historicoDoFunil,
      atividades: props.item?.atividades,
      anotacoes: props.item?.anotacoes,
      emailsEnviados: props.item?.emailsEnviados,
      tarefas: props.item?.tarefas,
      formularios: props.getResponse!?.length > 0 ? [{
        descricao: props.getForm![0]?.descricao,
        id: props.getForm![0]?.id,
        perguntas: props.getResponse,
      }] : props.getForm,
      brindesOfertados: props.item?.brindesOfertados,
      historicoDoControleDeSala: props.item?.historicoDoControleDeSala,
      emSala: props.item?.emSala,
      keyField: props.item?.keyField,
      corDoCard: props.item?.corDoCard,
      agendamentosDeVisitas: props.item?.agendamentosDeVisitas,
      qualificado: props.item.qualificado,
      oportunidade: props.item.oportunidade,
      motivoDeDesqualificacao: props.item?.motivoDeDesqualificacao,
      pjVinculado: props.item?.pjVinculado,
    } as Object_.Lead;
    let Response = await Controllers.Lead.Put(DataLogin?.token, SelectedCompany?.id, body);
    if (Math.floor(Response.status / 100) === 2) {
      setLoading(false)
      setMessage1("Sucesso!"); setMessage2("Atualização realizada!"); setShowToast(true);
    } else {
      setLoading(false)
      setMessage1("Erro Atualização do Formulário!"); setMessage2("Entre em contato com a equipe de desenvolvimento!"); setShowToast(true)
    }
  }

  function Toast() {
    setShowToast(false)
  }
  //#endregion

  //#region UseEffect
  useEffect(() => {
    if(getFunctionForm == 0) {
      CatchingForm()
    }
  }, []);
  //#endregion

  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <Styled.Container>
          <View style={{top: Platform.OS === "ios" ? 40 : undefined}}>
            <ToastMessage
              showToast={getShowToast}
              hideToast={setShowToast}
              function={Toast}
              message1={getMessage1}
              message2={getMessage2}
            />
          </View>
          {getLoading &&
          <Modals.ModalLoading 
            transparent={true}
            visible={getLoading}
          />}
          <Styled.ContainerHeader style={{marginTop: Platform.OS === 'ios' ? '15%' : '5%', opacity: getShowToast ? 0 : 1}}>
            <TouchableOpacity activeOpacity={0.9} onPress={() => {props.setVisibleForm(false); setFunctionForm(0)}}>
              <SvgCss xml={ArrowBack} />
            </TouchableOpacity>
            <Styled.TextHeader>Formulário</Styled.TextHeader>
          </Styled.ContainerHeader>
          <Styled.SubContainer>
            {props.getForm && !props.getResponse &&
            <>
            <Styled.Title style={{marginTop: 10, textAlign: 'center'}}>Preenchimento do Formulário</Styled.Title>
            <FlatList
              data={props.getForm![0]?.perguntas}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => (
              <Styled.ViewForm>
                <Styled.ContainerForm>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Styled.Title>{item.classificacao?.descricao}</Styled.Title>
                    <Styled.AnotationText2>{item.obrigatorio ? '*' : ''}Obrigatório: {item.obrigatorio ? 'Sim' : 'Não'}</Styled.AnotationText2>
                  </View>
                  <Styled.AnotationText1>Título: {item?.titulo}</Styled.AnotationText1>
                  {item?.classificacao?.id == 1 || item?.classificacao?.id == 2 ?
                    <>
                      <Styled.AnotationText1>Resposta</Styled.AnotationText1>
                      <Styled.Response
                        multiline
                        onChangeText={(value: string) => {
                          item.resposta = value;
                          if(props.getResponse!?.length > 0) {
                            props.getResponse![index].resposta
                            props.setResponse(props.getResponse)
                          } else {
                            props.getForm![0].perguntas[index].resposta
                            props.setForm(props.getForm)
                          }
                        }}
                        value={item.resposta}
                        editable={true}
                      />
                    </> : undefined}
                  {item?.classificacao?.id == 3 &&
                    <Styled.YerOrNo>
                      <Styled.AnotationText1 style={{marginTop: 0, fontFamily: !item.resposta ? 'AzeretMono-Black' : 'AzeretMono-Medium'}}>Não</Styled.AnotationText1>
                      <View style={{marginHorizontal: 10}}>
                        <Switch
                          size={25}
                          isEnabled={item.resposta}
                          onPress={() => {
                            YerOrNo(item, index);
                          }}
                        />
                      </View>
                      <Styled.AnotationText1 style={{marginTop: 0, fontFamily: item.resposta ? 'AzeretMono-Black' : 'AzeretMono-Medium'}}>Sim</Styled.AnotationText1>
                    </Styled.YerOrNo>}
                  {item?.classificacao?.id == 4 &&
                    <View>
                      <DatePicker
                        modal
                        mode='date'
                        open={getOpenDate}
                        date={date}
                        onConfirm={(Date) => {
                          item.resposta = Date.toISOString();
                          if(props.getResponse!?.length > 0) {
                            props.getResponse![index].resposta
                            props.setResponse(props.getResponse)
                          } else {
                            props.getForm![0].perguntas[index].resposta
                            props.setForm(props.getForm)
                          }
                          setOpenDate(false)
                        }}
                        onCancel={() => {
                          setOpenDate(false)
                        }}
                      />
                      <Styled.SelectDateAndHour onPress={() => setOpenDate(true)}>
                        <Styled.TextDateAndHour>Selecione a Data</Styled.TextDateAndHour>
                      </Styled.SelectDateAndHour>
                      <Styled.AnotationText1>Data: {item.resposta ? moment(item.resposta).format("DD/MM/YYYY") : 'selecione a data'}</Styled.AnotationText1>
                    </View>}
                  {item?.classificacao?.id == 5 &&
                    <View>
                      <DatePicker
                        modal
                        mode='time'
                        open={getOpenHour}
                        date={date}
                        onConfirm={(Hour) => {
                          item.resposta = Hour.toISOString();
                          if(props.getResponse!?.length > 0) {
                            props.getResponse![index].resposta
                            props.setResponse(props.getResponse)
                          } else {
                            props.getForm![0].perguntas[index].resposta
                            props.setForm(props.getForm)
                          }
                          setOpenHour(false)
                        }}
                        onCancel={() => {
                          setOpenHour(false)
                        }}
                      />
                      <Styled.SelectDateAndHour onPress={() => setOpenHour(true)}>
                        <Styled.TextDateAndHour>Selecione a Hora</Styled.TextDateAndHour>
                      </Styled.SelectDateAndHour>
                      <Styled.AnotationText1>Hora: {item.resposta ? moment(item.resposta).format("LT") : 'selecione a hora'}</Styled.AnotationText1>
                    </View>}
                </Styled.ContainerForm>
              </Styled.ViewForm>
              )}
            />
            </>}
            {props.getResponse!?.length > 0 &&
            <>
            <Styled.Title style={{marginTop: 10, textAlign: 'center'}}>Alteração do Formulário</Styled.Title>
            <FlatList
              data={props.getResponse}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => (
              <Styled.ViewForm>
                <Styled.ContainerForm>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Styled.Title>{item.classificacao?.descricao}</Styled.Title>
                    <Styled.AnotationText2>{item.obrigatorio ? '*' : ''}Obrigatório: {item.obrigatorio ? 'Sim' : 'Não'}</Styled.AnotationText2>
                  </View>
                  <Styled.AnotationText1>Título: {item?.titulo}</Styled.AnotationText1>
                  {item?.classificacao?.id == 1 || item?.classificacao?.id == 2 ?
                    <>
                      <Styled.AnotationText1>Resposta</Styled.AnotationText1>
                      <Styled.Response
                        multiline
                        onChangeText={(value: string) => {
                          item.resposta = value;
                          if(props.getResponse!?.length > 0) {
                            props.getResponse![index].resposta
                            props.setResponse(props.getResponse)
                          } else {
                            props.getForm![0].perguntas[index].resposta
                            props.setForm(props.getForm)
                          }
                        }}
                        editable={true}
                      >{item.resposta}</Styled.Response>
                    </> : undefined}
                  {item?.classificacao?.id == 3 &&
                    <Styled.YerOrNo>
                      <Styled.AnotationText1 style={{marginTop: 0, fontFamily: !item.resposta ? 'AzeretMono-Black' : 'AzeretMono-Medium'}}>Não</Styled.AnotationText1>
                      <View style={{marginHorizontal: 10}}>
                        <Switch
                          size={25}
                          isEnabled={item.resposta}
                          onPress={() => {
                            YerOrNo(item, index);
                          }}
                        />
                      </View>
                      <Styled.AnotationText1 style={{marginTop: 0, fontFamily: item.resposta ? 'AzeretMono-Black' : 'AzeretMono-Medium'}}>Sim</Styled.AnotationText1>
                    </Styled.YerOrNo>}
                  {item?.classificacao?.id == 4 &&
                    <View>
                      <DatePicker
                        modal
                        mode='date'
                        open={getOpenDate}
                        date={date}
                        onConfirm={(Date) => {
                          item.resposta = Date.toISOString();
                          if(props.getResponse!?.length > 0) {
                            props.getResponse![index].resposta
                            props.setResponse(props.getResponse)
                          } else {
                            props.getForm![0].perguntas[index].resposta
                            props.setForm(props.getForm)
                          }
                          setOpenDate(false)
                        }}
                        onCancel={() => {
                          setOpenDate(false)
                        }}
                      />
                      <Styled.SelectDateAndHour onPress={() => setOpenDate(true)}>
                        <Styled.TextDateAndHour>Selecione a Data</Styled.TextDateAndHour>
                      </Styled.SelectDateAndHour>
                      <Styled.AnotationText1>Data: {item.resposta ? moment(item.resposta).format("DD/MM/YYYY") : 'selecione a data'}</Styled.AnotationText1>
                    </View>}
                  {item?.classificacao?.id == 5 &&
                    <View>
                      <DatePicker
                        modal
                        mode='time'
                        open={getOpenHour}
                        date={date}
                        onConfirm={(Hour) => {
                          item.resposta = Hour.toISOString();
                          if(props.getResponse!?.length > 0) {
                            props.getResponse![index].resposta
                            props.setResponse(props.getResponse)
                          } else {
                            props.getForm![0].perguntas[index].resposta
                            props.setForm(props.getForm)
                          }
                          setOpenHour(false)
                        }}
                        onCancel={() => {
                          setOpenHour(false)
                        }}
                      />
                      <Styled.SelectDateAndHour onPress={() => setOpenHour(true)}>
                        <Styled.TextDateAndHour>Selecione a Hora</Styled.TextDateAndHour>
                      </Styled.SelectDateAndHour>
                      <Styled.AnotationText1>Hora: {item.resposta ? moment(item.resposta).format("LT") : 'selecione a hora'}</Styled.AnotationText1>
                    </View>}
                </Styled.ContainerForm>
              </Styled.ViewForm>
              )}
            />
            </>}
          </Styled.SubContainer>
          <Styled.ContainerSubmit>
            <Styled.Submit onPress={async () => { if((await ValidatingData()) == true) Update() }} activeOpacity={0.8}>
              <Styled.TextSubmit>Atualizar</Styled.TextSubmit>
            </Styled.Submit>
          </Styled.ContainerSubmit>
        </Styled.Container>
      </LinearGradient>
    </Modal>
  );
};