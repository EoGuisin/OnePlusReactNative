//#region React
import React, {useState} from 'react';
import {Modal, TouchableOpacity, Platform, View} from 'react-native';
import {useSelector} from 'react-redux';
//#endregion

//#region Icons
import {ArrowBack, Plus} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Functions
import * as TextFormat from '../../../Themes/TextFormat';
import {ResponsiveWidth} from '../../../Functions';
//#endregion

//#region Services
import * as Controllers from '../../../Services/Controllers';
import { Object_ } from '../../../Services/Objects';
//#endregion

//#region Styled
import { ToastMessage } from '../../../Components';
import * as Modals from '../../Modals';
import * as Styled from './styles';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
import { Kanban } from '../../Catalog/Menu/PagesMenu/FunisDeVenda/type';
//#endregion
interface Permission {
  usuario : {
    id: number,
    nome: string,
    cargo: {
      id: number,
      nome: string
    },
    email: {
      classificacao: number,
      descricao: string
    }
  },
  salaDeVenda: {
    id: number, 
    descricao: string
  }, 
  area: {
    id: number,
    descricao: string
  },
  funil: Object_.Funil
}
export interface Props {
  visible: boolean;
  onPressClose(): void;
  getSaleFunnel: Array<Object_.Funil>;
  getCaptureLocation: Array<Object_.LocalDeCaptacao>;
  setVisibleNewOpportunity(value: boolean): void;
  setLead(value: Array<Kanban>): void;
  getLead: Array<Kanban> | undefined | null,
  getPermissionFunnelSales: Permission[];
}

interface New {
  salaDeVenda: Object_.SalaDeVenda[],
  area: Object_.Area[],
  funil: Object_.Funil[],
}

export const NewOpportunity = (props: Props) => {

  //#region useState
  const [getLoading, setLoading] = useState<boolean>(false);
  const [getVisibleFunnels, setVisibleFunnels] = useState<boolean>(false);
  const [getSalesFunnel, setSalesFunnel] = useState<Array<Object_.Funil>>([]);
  const [getSelectedSaleFunnel, setSelectedSaleFunnel] = useState<Object_.Funil>({} as Object_.Funil);
  const [getVisibleSaleRooms, setVisibleSaleRooms] = useState<boolean>(false);
  const [getSalesRoom, setSalesRoom] = useState<Array<Object_.SalaDeVenda>>([]);
  const [getSelectedSaleRoom, setSelectedSaleRoom] = useState<Object_.SalaDeVenda>({} as Object_.SalaDeVenda);
  const [getVisibleAreas, setVisibleAreas] = useState<boolean>(false);
  const [getAreas, setAreas] = useState<Array<Object_.Area>>([]);
  const [getSelectedAreas, setSelectedAreas] = useState<Object_.AreaNoHistoricoDoFunil>({} as Object_.AreaNoHistoricoDoFunil);
  const [getVisibleCaptureLocation, setVisibleCaptureLocation] = useState<boolean>(false);
  const [getSelectedCaptureLocation, setSelectedCaptureLocation] = useState<Object_.LocalDeCaptacao>();
  const [getName, setName] = useState<string>("");
  const [getPhone, setPhone] = useState<string>("");
  const [getEmail, setEmail] = useState<string>("");
  const [getShowToast, setShowToast] = useState<boolean>(false);
  const [getMessage1, setMessage1] = useState<string>("");
  const [getMessage2, setMessage2] = useState<string>("");
  //#endregion

  //#region variables
  const today = new Date();
  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);
  //#endregion

  function Toast() {
    setShowToast(false)
  }

  async function CreateNewLead(): Promise<Object_.Lead> {
    setLoading(true)
    let body = {
      dataDeCadastro: today.toISOString(),
      id: 0,
      cpf: "",
      nome: getName,
      dataDeNascimento: "",
      idade: 0,
      naturalidade: undefined,
      nacionalidade: undefined,
      sexo: 0,
      emails: getEmail != "" ? [{
        classificacao: 0,
        descricao: getEmail,
      }] : undefined,
      fotoDoLead: undefined,
      documentoPessoal: undefined,
      rg: undefined,
      cnh: undefined,
      filiacao01: "",
      filiacao02: "",
      estadoCivil: 0,
      certidaoDeCasamento: undefined,
      regimeDeCasamento: undefined,
      ocupacao: undefined,
      renda: 0,
      dadosDosVeiculos: undefined,
      dependentes: undefined,
      endereco: undefined,
      documentoEndereco: undefined,
      telefones: getPhone != "" ? [{
        classificacao: 1,
        ddd: TextFormat.Telefone.ObterDDD(getPhone),
        ddi: "55",
        numero: TextFormat.Telefone.ObterNumero(getPhone),
        observacao: "",
      }] : undefined,
      localDeCaptacao: getSelectedCaptureLocation,
      status: 0,
      alturaDoItem: 0,
      historicoDoFunil: undefined,
      atividades: undefined,
      anotacoes: undefined,
      emailsEnviados: undefined,
      tarefas: undefined,
      formularios:undefined,
      brindesOfertados: undefined,
      historicoDoControleDeSala: undefined,
      emSala: false,
      keyField: "",
      corDoCard: "",
      agendamentosDeVisitas: undefined,
      qualificado: true,
      motivoDeDesqualificacao: undefined,
      pjVinculado: undefined,
    } as Object_.Lead;
    console.log(JSON.stringify(body))
    let Response = await Controllers.Lead.Post(DataLogin?.token, SelectedCompany?.id, getSelectedSaleRoom?.id, getSelectedAreas?.id, body, getSelectedSaleFunnel?.id, SelectedCompany?.id == 5 ? props.getSaleFunnel[0].posicoesDoFunil[1].id : undefined);
    if (Math.floor(Response.status / 100) === 2) {
      let ResponseGetLead = await Controllers.Lead.Get(DataLogin?.token, SelectedCompany?.id, true, undefined, undefined, undefined, undefined, undefined, undefined, undefined, false, undefined, undefined, undefined, true);
      if (Math.floor(ResponseGetLead.status / 100) === 2) {
        if(SelectedCompany?.id == 5) {
          let filter = ResponseGetLead.data?.filter(Item => Item.posicaoDoFunil == 1 || Item.posicaoDoFunil == 2 || Item.posicaoDoFunil == 3 || Item.posicaoDoFunil == 4)
          props.setLead(filter)
        } else {
          props.setLead(ResponseGetLead.data)
        }
        setSelectedSaleFunnel({} as Object_.Funil)
        setSelectedSaleRoom({} as Object_.SalaDeVendaNoHistoricoDoFunil)
        setSelectedAreas({} as Object_.AreaNoHistoricoDoFunil)
        setSelectedCaptureLocation(undefined)
        setName("")
        setPhone("")
        setEmail("")
        setLoading(false)
        props.setVisibleNewOpportunity(false)
        setMessage1("Sucesso!"); setMessage2("Lead criado com sucesso e lista atualizada!"); setShowToast(true)
      }
    } else {
      setLoading(false)
      console.log(Response)
      setMessage1("Erro!"); setMessage2("Não foi possivel criar o Lead. Entre em contato com a equipe de desenvolvimento!"); setShowToast(true)
    }
    return {} as Object_.Lead;
  }

  function Agroup() {
    let reduced: New | undefined = props.getPermissionFunnelSales?.reduce((GroupedList: New, Unity) => { 
      if (!GroupedList?.funil?.find((Item) => Item?.descricao == Unity?.funil?.descricao)) GroupedList?.funil?.push(Unity.funil);
      if (!GroupedList?.salaDeVenda?.find((Item) => Item?.descricao == Unity?.salaDeVenda?.descricao)) GroupedList?.salaDeVenda?.push(Unity.salaDeVenda);
      if (!GroupedList?.area?.find((Item) => Item?.descricao == Unity?.area?.descricao)) GroupedList?.area?.push(Unity.area);
      return GroupedList;
    }, {salaDeVenda: [], area: [], funil: []} as New);
    setSalesFunnel(reduced.funil)
    setSalesRoom(reduced.salaDeVenda);
    setAreas(reduced.area);
  }
  //#endregion

  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        {getLoading && 
        <Modals.ModalLoading
          transparent={true}
          visible={getLoading}
        />}
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
          <Styled.ContainerHeader style={{marginTop: Platform.OS === 'ios' ? '15%' : '5%', opacity: getShowToast ? 0 : 1}}>
            <TouchableOpacity activeOpacity={0.9} onPress={props.onPressClose}>
              <SvgCss xml={ArrowBack} />
            </TouchableOpacity>
            <Styled.TextHeader>Funis De Vendas</Styled.TextHeader>
          </Styled.ContainerHeader>
          <Styled.TextNewOpportunity>Nova Oportunidade</Styled.TextNewOpportunity>
          <Styled.SubContainer>
            <Styled.InputContainer style={{marginTop: 0}}>
              <View style={{flexDirection: 'row', top: Platform.OS === 'android' ? 10 : -5}}>
                <Styled.Text style={{top: Platform.OS === 'ios' ? 10 : 0}}>Nome:</Styled.Text>
                <Styled.Input keyboardType='name-phone-pad' style={{width: ResponsiveWidth('65%'), paddingTop: Platform.OS === 'android' ? 0 : '3%'}} onChangeText={async (value: string) => {
                  setName(value);
                }}></Styled.Input>
              </View>
            </Styled.InputContainer> 
            <Styled.InputContainer>
              <View style={{flexDirection: 'row', top: Platform.OS === 'android' ? 10 : -5}}>
                <Styled.Text style={{top: Platform.OS === 'ios' ? 10 : 0}}>Email:</Styled.Text>
                <Styled.Input value={getEmail} keyboardType='email-address' style={{width: ResponsiveWidth('65%'), paddingTop: Platform.OS === 'android' ? 0 : '3%'}} onChangeText={async (value: string) => {
                  setEmail(value);
                }}></Styled.Input>
              </View>
            </Styled.InputContainer>
            <Styled.InputContainer>
              <View style={{flexDirection: 'row', top: Platform.OS === 'android' ? 10 : -5}}>
                <Styled.Text style={{top: Platform.OS === 'ios' ? 10 : 0}}>Telefone:</Styled.Text>
                <Styled.Input value={getPhone} keyboardType='phone-pad' style={{width: ResponsiveWidth('65%'), paddingTop: Platform.OS === 'android' ? 0 : '3%'}} onChangeText={async (value: string) => {
                  setPhone(value.length == 11 ? TextFormat.Telefone.FormatarTexto(value) : value);
                }}></Styled.Input>
              </View>
            </Styled.InputContainer>
            <Styled.TouchableContainer activeOpacity={0.9} onPress={() => {setVisibleFunnels(true); Agroup()}}>
              <View style={{flexDirection: 'row'}}>
                <Styled.TextInput>Funil De Venda:</Styled.TextInput>
                <Styled.TextInput style={{marginLeft: '2%', width: "50%"}}>{getSelectedSaleFunnel?.descricao}</Styled.TextInput>
              </View>
              {getVisibleFunnels &&
              <Modals.MultipleSelections
                marginLeft="20%"
                title="Funil De Venda"
                search={true}
                visible={getVisibleFunnels}
                onPressClose={() => {setVisibleFunnels(false)}}
                // onChangeText={(event) => {SearchUnity(event)}}
                data={getSalesFunnel}
                renderItem={({item}) =>
                  <Styled.ItemContainer onPress={() => {
                    setSelectedSaleFunnel(item)
                    setVisibleFunnels(false)
                  }}>
                    <Styled.Item>
                      <Styled.TextItem>{item?.descricao}</Styled.TextItem>
                    </Styled.Item>
                  </Styled.ItemContainer>}
              />}
            </Styled.TouchableContainer>
            <Styled.TouchableContainer activeOpacity={0.9} onPress={() => {setVisibleSaleRooms(true)}}>
              <View style={{flexDirection: 'row'}}>
                <Styled.TextInput>Sala De Venda:</Styled.TextInput>
                <Styled.TextInput style={{marginLeft: '2%', width: "50%"}}>{getSelectedSaleRoom?.descricao}</Styled.TextInput>
              </View>
              {getVisibleSaleRooms &&
              <Modals.MultipleSelections
                marginLeft="20%"
                title="Sala De Venda"
                search={true}
                visible={getVisibleSaleRooms}
                onPressClose={() => {setVisibleSaleRooms(false)}}
                // onChangeText={(event) => {SearchUnity(event)}}
                data={getSalesRoom}
                renderItem={({item}) => 
                  <Styled.ItemContainer onPress={() => {
                    setSelectedSaleRoom(item);
                    setVisibleSaleRooms(false);
                  }}>
                    <Styled.Item>
                      <Styled.TextItem>{item?.descricao}</Styled.TextItem>
                    </Styled.Item>
                  </Styled.ItemContainer>}
              />}
            </Styled.TouchableContainer>
            <Styled.TouchableContainer activeOpacity={0.9} onPress={() => {setVisibleAreas(true)}}>
              <View style={{flexDirection: 'row'}}>
                <Styled.TextInput>Canal:</Styled.TextInput>
                <Styled.TextInput style={{marginLeft: '2%', width: "50%"}}>{getSelectedAreas?.descricao}</Styled.TextInput>
              </View>
              {getVisibleAreas &&
              <Modals.MultipleSelections
                marginLeft="30%"
                title="Canal"
                search={true}
                visible={getVisibleAreas}
                onPressClose={() => {setVisibleAreas(false)}}
                // onChangeText={(event) => {SearchUnity(event)}}
                data={getAreas}
                renderItem={({item}) =>
                  <Styled.ItemContainer onPress={() => {
                    setSelectedAreas(item)
                    setVisibleAreas(false)
                  }}>
                    <Styled.Item>
                      <Styled.TextItem>{item?.descricao}</Styled.TextItem>
                    </Styled.Item>
                  </Styled.ItemContainer>
                }
              />}
            </Styled.TouchableContainer>
            <Styled.TouchableContainer activeOpacity={0.9} onPress={() => {setVisibleCaptureLocation(true)}}>
            <View style={{flexDirection: 'row'}}>
              <Styled.TextInput>Local de Captação:</Styled.TextInput>
              {getVisibleCaptureLocation &&
              <Modals.MultipleSelections
                marginLeft="15%"
                data={props.getCaptureLocation}
                title="Local de Captação"
                visible={getVisibleCaptureLocation}
                onPressClose={() => {setVisibleCaptureLocation(false)}}
                renderItem={({item}) => (
                  <Styled.ItemContainer onPress={() => {
                    setSelectedCaptureLocation(item)
                    setVisibleCaptureLocation(false)
                  }}>
                    <Styled.Item>
                      <Styled.TextItem>{item?.descricao}</Styled.TextItem>
                    </Styled.Item>
                  </Styled.ItemContainer>
                )}
              />}
              <Styled.TextInput style={{marginLeft: '2%'}}>{getSelectedCaptureLocation?.descricao}</Styled.TextInput>
            </View>
          </Styled.TouchableContainer>
          </Styled.SubContainer>
          <Styled.ContainerSubmit>
            <Styled.Submit onPress={async () => { await CreateNewLead(); /*LinkLead(Response)*/}} activeOpacity={0.8}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <SvgCss xml={Plus} style={{marginLeft: '5%'}}/>
                <Styled.TextSubmit>Criar</Styled.TextSubmit>
              </View>
            </Styled.Submit>
          </Styled.ContainerSubmit>
        </Styled.Container>
      </LinearGradient>
    </Modal>
  );
};