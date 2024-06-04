//#region React
import React, {useState, useEffect} from 'react';
import {Platform, TouchableOpacity, View, Modal, SafeAreaView} from 'react-native';
//#endregion

//#region Styled
import { ToastMessage } from '../../../Components';
import * as Styled from './styles'
import * as Modals from '..';
//#endregion

//#region Services
import * as Controllers from '../../../Services/Controllers';
import { Object_ } from '../../../Services/Objects';
//#endregion


//#region Images
import {ArrowBack, FilterInformations} from '../../../Assets';
import { SvgCss } from 'react-native-svg';
//#endregion

//#region Reduxs
import {useSelector} from 'react-redux';
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
  setLead:(value: Array<Kanban>) => void;
  getLead: Kanban[] | undefined | null;
  setVisibleFilter:(value: boolean) => void;
  getSelectedSaleFunnel: Object_.Funil | undefined;
  setSelectedSaleFunnel:(value: Object_.Funil | undefined) => void;
  getOriginalLead: Kanban[];
  getPermissionFunnelSales: Permission[];
}
interface New {
  salaDeVenda: Object_.SalaDeVenda[],
  area: Object_.Area[],
  funil: Object_.Funil[],
}

interface Positions {
  id: number,
  descricao: string,
}

export const FilterSaleFunnel = (props: Props) => {

  //#region useState
  const [getVisibleFunnels, setVisibleFunnels] = useState<boolean>(false);
  const [getSaleFunnel, setSaleFunnel] = useState<Array<Object_.Funil>>([]);

  const [getVisibleSaleRooms, setVisibleSaleRooms] = useState<boolean>(false);
  const [getSalesRoom, setSalesRoom] = useState<Array<Object_.SalaDeVenda>>([]);
  const [getSelectedSaleRoom, setSelectedSaleRoom] = useState<Object_.SalaDeVenda | undefined>(undefined);

  const [getVisibleAreas, setVisibleAreas] = useState<boolean>(false);
  const [getAreas, setAreas] = useState<Array<Object_.Area>>([]);
  const [getSelectedAreas, setSelectedAreas] = useState<Object_.Area | undefined>(undefined);
  
  const [getVisibleFunnelPosition, setVisibleFunnelPosition] = useState<boolean>(false);
  const [getFunnelPosition, setFunnelPosition] = useState<Array<Object_.PosicaoDoFunil>>([]);
  const [getSelectedFunnelPosition, setSelectedFunnelPosition] = useState<Object_.PosicaoDoFunil | undefined>(undefined);

  const [getLoading, setLoading] = useState<boolean>(false);
  const [getShowToast, setShowToast] = useState<boolean>(false);
  const [getMessage1, setMessage1] = useState<string>("");
  const [getMessage2, setMessage2] = useState<string>("");
  //#endregion

  //#region variables
  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);
  //#endregion

  //#region Function
  async function SalesFunnel() {
    let Response = await Controllers.FunilDeVendas.Get(DataLogin?.token, SelectedCompany.id, undefined, undefined, false);
    if (Math.floor(Response.status / 100) === 2) {
      setSaleFunnel(Response.data)
      Agroup(Response.data);
    } else {
      console.log('ERROR', Response)
    }
  }

  function Agroup(filter: Object_.Funil[]) {
    let positions = filter[0].posicoesDoFunil
    setFunnelPosition(positions)
    let reduced: New | undefined = props.getPermissionFunnelSales?.reduce((GroupedList: New, Unity) => { 
      if (!GroupedList?.funil?.find((Item) => Item?.descricao == Unity?.funil?.descricao)) GroupedList?.funil?.push(Unity.funil);
      if (!GroupedList?.salaDeVenda?.find((Item) => Item?.descricao == Unity?.salaDeVenda?.descricao)) GroupedList?.salaDeVenda?.push(Unity.salaDeVenda);
      if (!GroupedList?.area?.find((Item) => Item?.descricao == Unity?.area?.descricao)) GroupedList?.area?.push(Unity.area);
      return GroupedList;
    }, {salaDeVenda: [], area: [], funil: [], posicoesDoFunil: []} as New);
    setSaleFunnel(reduced.funil)
    setSalesRoom(reduced.salaDeVenda);
    setAreas(reduced.area);
  }

  async function GetLead() {
    setLoading(true)
    let OriginalLeads = props.getOriginalLead
    let Leads = [...props.getLead || []]
    Leads = OriginalLeads
    if(getSelectedFunnelPosition) {
      Leads = Leads.filter(Item => Item.posicaoDoFunil == getSelectedFunnelPosition.id)
    }
    if(props.getSelectedSaleFunnel) {
      Leads = Leads.filter(data => data.funilDescricao?.includes(props.getSelectedSaleFunnel!.descricao))
    }
    if(getSelectedSaleRoom) {
      Leads = Leads.filter(data => data.salaDeVendaDescricao?.includes(getSelectedSaleRoom.descricao))
    }
    if(getSelectedAreas) {
      Leads = Leads.filter(data => data.areaDescricao?.includes(getSelectedAreas.descricao))
    }
    props.setLead(Leads)
    setLoading(false)
    props.setVisibleFilter(false)
  }

  function Toast() {
    setShowToast(false)
  }
  //#endregion

  //#region UseEffect
  useEffect(() => {
    SalesFunnel();
  }, []);
  //#endregion

  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
    <LinearGradient colors={['#26A77C', '#105B74']}>
      {getLoading &&
      <Modals.ModalLoading 
        transparent={true}
        visible={getLoading}
      />}
      <View style={{top: Platform.OS === "ios" ? 40 : undefined}}>
        <ToastMessage
          showToast={getShowToast}
          hideToast={setShowToast}
          function={Toast}
          message1={getMessage1}
          message2={getMessage2}
        />
      </View>
        <Styled.Container>
        <Styled.ContainerHeader style={{marginTop: Platform.OS === 'ios' ? '15%' : '5%', opacity: getShowToast ? 0 : 1}}>
            <TouchableOpacity activeOpacity={0.9} onPress={() => {props.setVisibleFilter(false); props.setSelectedSaleFunnel({} as Object_.Funil); setSelectedSaleRoom({} as Object_.SalaDeVenda); setSelectedAreas({} as Object_.Area)}}>
              <SvgCss xml={ArrowBack} />
            </TouchableOpacity>
            <Styled.TextHeader>Funis De Vendas</Styled.TextHeader>
          </Styled.ContainerHeader>
          <Styled.SubContainer>
            <Styled.TouchableContainer activeOpacity={0.9} onPress={() => {setVisibleFunnels(true)}}>
              <View style={{flexDirection: 'row'}}>
                <Styled.TextInput>Funil De Venda:</Styled.TextInput>
                <Styled.TextInput style={{marginLeft: '2%', width: "50%"}}>{props.getSelectedSaleFunnel?.descricao}</Styled.TextInput>
              </View>
              {getVisibleFunnels &&
              <Modals.MultipleSelections
                marginLeft="20%"
                title="Funil De Venda"
                search={true}
                visible={getVisibleFunnels}
                onPressClose={() => {setVisibleFunnels(false)}}
                // onChangeText={(event) => {SearchUnity(event)}}
                data={getSaleFunnel}
                renderItem={({item}) =>
                  <Styled.ItemContainer onPress={() => {
                    props.setSelectedSaleFunnel(item)
                    console.log(item)
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
            <Styled.TouchableContainer style={{marginBottom: '5%'}} activeOpacity={0.9} onPress={() => {setVisibleFunnelPosition(true)}}>
              <View style={{flexDirection: 'row'}}>
                <Styled.TextInput>Posição do Funil:</Styled.TextInput>
                <Styled.TextInput style={{marginLeft: '2%', width: "50%"}}>{getSelectedFunnelPosition?.descricao}</Styled.TextInput>
              </View>
              {getVisibleFunnelPosition &&
              <Modals.MultipleSelections
                marginLeft="15%"
                title="Posição do Funil"
                visible={getVisibleFunnelPosition}
                onPressClose={() => {setVisibleFunnelPosition(false)}}
                data={getFunnelPosition}
                renderItem={({item}) =>
                  <Styled.ItemContainer onPress={() => {
                    setSelectedFunnelPosition(item)
                    setVisibleFunnelPosition(false)
                  }}>
                    <Styled.Item>
                      <Styled.TextItem>{item?.descricao}</Styled.TextItem>
                    </Styled.Item>
                  </Styled.ItemContainer>
                }
              />}
            </Styled.TouchableContainer>
          </Styled.SubContainer>
          <Styled.ContainerSubmit>
              <Styled.Submit activeOpacity={0.8} onPress={() => {GetLead()}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  <SvgCss xml={FilterInformations} style={{marginLeft: '5%'}}/>
                  <Styled.TextSubmit>Filtrar informações</Styled.TextSubmit>
                </View>
              </Styled.Submit>
            </Styled.ContainerSubmit>
        </Styled.Container>
    </LinearGradient>
    </Modal>
  );
}