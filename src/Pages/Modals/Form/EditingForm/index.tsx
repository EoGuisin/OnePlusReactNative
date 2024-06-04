//#region React
import React, {useEffect, useState} from 'react';
import {Modal, TouchableOpacity, Platform, View} from 'react-native';
import {useSelector} from 'react-redux';
import 'moment/locale/pt-br'
import moment from 'moment';
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
import {Switch, ToastMessage} from '../../../../Components';
import * as Modals from '../../../Modals';
import * as Styled from './styles';
//#endregion

//#region Externals Directorys
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';
//#endregion

export interface Props {
  visible: boolean;
  onPressClose(): void;
  item: Object_.Perguntas;
  funil: number;
  getText: string;
  setText:(value: string) => void;
  getDate: string;
  setDate:(value: string) => void;
  getYesOrNo: boolean;
  setYesOrNo:(value: boolean) => void;
  getHour: string;
  setHour:(value: string) => void;
  getForm: Object_.Formulario[] | undefined;
  lead: Object_.Lead;
}


export const EditingForm = (props: Props) => {
  //#region Variables
  const [date] = useState<Date>(new Date());
  const [getOpenDate, setOpenDate] = useState<boolean>();
  const [getOpenHour, setOpenHour] = useState<boolean>();
  const [getLoading, setLoading] = useState<boolean>();

  const [getShowToast, setShowToast] = useState<boolean>(false);
  const [getMessage1, setMessage1] = useState<string>("");
  const [getMessage2, setMessage2] = useState<string>("");

  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);
  //#endregion

  async function Update() {
    setLoading(true)
    let classification = props.item.classificacao.id;
    let response = props.lead.formularios!?.length > 0 ? {
      classificacao: props.item.classificacao,
      id: props.item.id,
      obrigatorio: props.item.obrigatorio,
      resposta: classification == 1 || classification == 2 ? props.getText : classification == 3 ? props.getYesOrNo : classification == 4 ? props.getDate : classification == 5 ? props.getHour : undefined,
      titulo: props.item.titulo,
    } : {
      id: props.getForm![0]?.id,
      descricao: props.getForm![0]?.descricao,
      perguntas: [{
        classificacao: props.item.classificacao,
        id: props.item.id,
        obrigatorio: props.item.obrigatorio,
        resposta: classification == 1 || classification == 2 ? props.getText : classification == 3 ? props.getYesOrNo : classification == 4 ? props.getDate : classification == 5 ? props.getHour : undefined,
        titulo: props.item.titulo,
      }],
    };
    let form = [...props.lead.formularios || [], response]
    let body = {
      dataDeCadastro: props.lead?.dataDeCadastro,
      id: props.lead?.id,
      cpf: props.lead?.cpf,
      nome: props.lead?.nome,
      dataDeNascimento: props.lead?.dataDeNascimento,
      idade: props.lead?.idade,
      naturalidade: props.lead?.naturalidade,
      nacionalidade: props.lead?.nacionalidade,
      sexo: props.lead?.sexo,
      emails: props.lead?.emails,
      fotoDoLead: props.lead?.fotoDoLead,
      documentoPessoal: props.lead?.documentoPessoal,
      rg: props.lead?.rg,
      cnh: props.lead?.cnh,
      filiacao01: props.lead?.filiacao01,
      filiacao02: props.lead?.filiacao02,
      estadoCivil: props.lead?.estadoCivil,
      certidaoDeCasamento: props.lead?.certidaoDeCasamento,
      regimeDeCasamento: props.lead?.regimeDeCasamento,
      ocupacao: props.lead?.ocupacao,
      renda: props.lead?.renda,
      dadosDosVeiculos: props.lead?.dadosDosVeiculos,
      dependentes: props.lead?.dependentes,
      endereco: props.lead?.endereco,
      documentoEndereco: props.lead?.documentoEndereco,
      telefones: props.lead?.telefones,
      localDeCaptacao: props.lead?.localDeCaptacao,
      status: props.lead?.status,
      alturaDoItem: props.lead?.alturaDoItem,
      historicoDoFunil: props.lead?.historicoDoFunil,
      atividades: props.lead?.atividades,
      anotacoes: props.lead?.anotacoes,
      emailsEnviados: props.lead?.emailsEnviados,
      tarefas: props.lead?.tarefas,
      formularios: form,
      brindesOfertados: props.lead?.brindesOfertados,
      historicoDoControleDeSala: props.lead?.historicoDoControleDeSala,
      emSala: props.lead?.emSala,
      keyField: props.lead?.keyField,
      corDoCard: props.lead?.corDoCard,
      agendamentosDeVisitas: props.lead?.agendamentosDeVisitas,
      qualificado: props.lead.qualificado,
      oportunidade: props.lead.oportunidade,
      motivoDeDesqualificacao: props.lead?.motivoDeDesqualificacao,
      pjVinculado: props.lead?.pjVinculado,
    } as Object_.Lead;
    console.log(JSON.stringify(body), DataLogin?.token, SelectedCompany?.id)
    let Response = await Controllers.Lead.Put(DataLogin?.token, SelectedCompany?.id, body);
    if (Math.floor(Response.status / 100) === 2) {
      setLoading(false)
      setMessage1("Sucesso!"); setMessage2("Atualização realizada!"); setShowToast(true);
    } else {
      setLoading(false)
      setMessage1("Erro!"); setMessage2("Entre em contato com a equipe de desenvolvimento!"); setShowToast(true)
    }
  }

  async function YerOrNo() {
    if(props.getYesOrNo === true) {
      props.setYesOrNo(false)
    } else {
      props.setYesOrNo(true)
    }
  }

  function Toast() {
    setShowToast(false)
  }
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
            <TouchableOpacity activeOpacity={0.9} onPress={props.onPressClose}>
              <SvgCss xml={ArrowBack} />
            </TouchableOpacity>
            <Styled.TextHeader>Formulário</Styled.TextHeader>
          </Styled.ContainerHeader>
            <Styled.SubContainer>
              <Styled.ViewForm>
                <Styled.ContainerForm>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Styled.Title>{props.item?.classificacao?.descricao}</Styled.Title>
                    <Styled.AnotationText2>{props.item.obrigatorio ? '*' : ''}Obrigatório: {props.item.obrigatorio ? 'Sim' : 'Não'}</Styled.AnotationText2>
                  </View>
                  <Styled.AnotationText1>Título: {props.item?.titulo}</Styled.AnotationText1>
                  {props.item?.classificacao?.id == 1 || props.item?.classificacao?.id == 2 ?
                    <>
                      <Styled.AnotationText1>Resposta</Styled.AnotationText1>
                      <Styled.Response
                        multiline
                        onChangeText={(value: string) => props.setText(value)}
                        value={props.item.resposta}
                        editable={true}
                      />
                    </> : undefined}
                  {props.item?.classificacao?.id == 3 &&
                    <Styled.YerOrNo>
                      <Styled.AnotationText1 style={{marginTop: 0, fontFamily: !props.getYesOrNo ? 'AzeretMono-Black' : 'AzeretMono-Medium'}}>Sim</Styled.AnotationText1>
                      <View style={{marginHorizontal: 10}}>
                        <Switch
                          size={25}
                          isEnabled={props.getYesOrNo}
                          onPress={() => YerOrNo()}
                        />
                      </View>
                      <Styled.AnotationText1 style={{marginTop: 0, fontFamily: props.getYesOrNo ? 'AzeretMono-Black' : 'AzeretMono-Medium'}}>Não</Styled.AnotationText1>
                    </Styled.YerOrNo>}
                  {props.item?.classificacao?.id == 4 &&
                    <View>
                      <DatePicker
                        modal
                        mode='date'
                        open={getOpenDate}
                        date={date}
                        onConfirm={(date) => {
                          props.setDate(date.toISOString())
                          setOpenDate(false)
                        }}
                        onCancel={() => {
                          setOpenDate(false)
                        }}
                      />
                      <Styled.SelectDateAndHour onPress={() => setOpenDate(true)}>
                        <Styled.TextDateAndHour>Selecione a Data</Styled.TextDateAndHour>
                      </Styled.SelectDateAndHour>
                      <Styled.AnotationText1>Data: {props.getDate ? moment(props.getDate).format("DD/MM/YYYY") : 'selecione a data'}</Styled.AnotationText1>
                    </View>}
                  {props.item?.classificacao?.id == 5 &&
                    <View>
                      <DatePicker
                        modal
                        mode='time'
                        open={getOpenHour}
                        date={date}
                        onConfirm={(date) => {
                          props.setHour(date.toISOString())
                          setOpenHour(false)
                        }}
                        onCancel={() => {
                          setOpenHour(false)
                        }}
                      />
                      <Styled.SelectDateAndHour onPress={() => setOpenHour(true)}>
                        <Styled.TextDateAndHour>Selecione a Hora</Styled.TextDateAndHour>
                      </Styled.SelectDateAndHour>
                      <Styled.AnotationText1>Hora: {props.getHour ? moment(props.getHour).format("LT") : 'selecione a hora'}</Styled.AnotationText1>
                    </View>}
                </Styled.ContainerForm>
              </Styled.ViewForm>
            </Styled.SubContainer>
            <Styled.ContainerSubmit>
            <Styled.Submit onPress={async () => {Update()}} activeOpacity={0.8}>
              <Styled.TextSubmit>Atualizar</Styled.TextSubmit>
            </Styled.Submit>
          </Styled.ContainerSubmit>
        </Styled.Container>
      </LinearGradient>
    </Modal>
  );
};