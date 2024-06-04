//#region React
import React, {useState, useEffect} from 'react';
import {Platform, TouchableOpacity, View, Modal} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
//#endregion

//#region Styled
import * as Styled from './styles';
import * as Modals from '..';
//#endregion

//#region Services
import * as Controllers from '../../../Services/Controllers';
import {Object_} from '../../../Services/Objects';
//#endregion

//#region Images
import {ArrowBack, FilterInformations} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Reduxs
import {Provider, useSelector} from 'react-redux';
//#endregion

//#region Externals Directorys
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker';
//#endregion
interface Gifts {
  leadId: number;
  leadNome: string;
  codigoDeValidacao: string;
  itemDoAlmoxarifado: Object_.ItemDoAlmoxarifadoDeBrinde;
  numeroDaNF: number;
  nf: Object_.Anexo;
}
interface Frequence {
  id: number;
  description: string;
}
export interface Props {
  visible: boolean;
  setVisibleFilter: (value: boolean) => void;
  getDateInitial: string;
  setDateInitial: (value: string) => void;
  getDateEnd: string;
  setDateEnd: (value: string) => void;
  setGifts: (value: Gifts[][]) => void;
  OriginalProviderLogin: Gifts[];
  getSelectedFrequence: Frequence;
  setSelectedFrequence: (value: Frequence) => void;
}

export const FilterGifts = (props: Props) => {
  //#region useState
  const getDate = new Date();
  const [getOpenInitial, setOpenInitial] = useState<boolean>(false);
  const [getOpenEnd, setOpenEnd] = useState<boolean>(false);
  const [getVisibleFrequence, setVisibleFrequence] = useState<boolean>(false);
  const [getVisibleClient, setVisibleClient] = useState<boolean>(false);
  const [getSelectedClient, setSelectedClient] = useState<string>("");
  const [getGift, setGift] = useState<string[]>([]);
  const [getOriginalGift, setOriginalGift] = useState<string[]>([]);
  const [getVisibleGift, setVisibleGift] = useState<boolean>(false);
  const [getSelectedGift, setSelectedGift] = useState<string>("");
  //#endregion

  //#region Interfaces

  interface CombineGifts {
    mensal: any;
  }
  //#endregion

  //#region variables
  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);
  const ProviderLogin: Array<Gifts> = useSelector((state: any) => state.ProviderLogin);
  const [getClient, setClient] = useState<Gifts[]>(ProviderLogin);
  const frequence = [
    {
      id: 0,
      description: 'Mensal',
    },
    {
      id: 1,
      description: 'Trimestral',
    },
    {
      id: 2,
      description: 'Semestral',
    },
    {
      id: 3,
      description: 'Anual',
    },
  ];
  //#endregion

  //#region Function
  function SearchClient(search: string) {
    let Filtered = JSON.parse(JSON.stringify(ProviderLogin));
    setClient(Filtered.filter((data: Gifts) => data.leadNome?.toUpperCase().includes(search.toUpperCase())));
  }

  function SearchGift(search: string) {
    let Filtered = JSON.parse(JSON.stringify(getOriginalGift));
    setGift(Filtered.filter((data: string) => data?.toUpperCase().includes(search.toUpperCase())));
  }

  function UniqGift() {
    let Gift = ProviderLogin.map(item => item.itemDoAlmoxarifado.brinde.descricao);
    setGift([...new Set(Gift)]);
    setOriginalGift([...new Set(Gift)]);
    setVisibleGift(true);
  }

  function Filter() {
    let arrGifts: Gifts[] = JSON.parse(JSON.stringify(ProviderLogin));
    if(getSelectedClient != "") arrGifts = arrGifts.filter(item => item.leadNome.includes(getSelectedClient))
    if(getSelectedGift != "") arrGifts = arrGifts.filter(item => item.itemDoAlmoxarifado.brinde.descricao.includes(getSelectedGift))
    if(props.getDateInitial != "" && props.getDateEnd != "") arrGifts = arrGifts.filter(item => item.itemDoAlmoxarifado.dataCadastro >= props.getDateInitial && item.itemDoAlmoxarifado.dataCadastro <= props.getDateEnd)
    if (props.getSelectedFrequence.id === 0) {
      const monthly = arrGifts?.reduce((monthly: any /*Gifts[]*/, Unity: Gifts) => {
        monthly[moment(Unity.itemDoAlmoxarifado.dataCadastro).format('M')] = monthly[moment(Unity.itemDoAlmoxarifado.dataCadastro).format('M')] || [];
        monthly[moment(Unity.itemDoAlmoxarifado.dataCadastro).format('M')]?.push(Unity);
          return monthly;
        }, []);
      let arrMonthly: Gifts[][] = Object.values(monthly);
      props.setGifts(arrMonthly);
      props.setVisibleFilter(false)
    } else if (props.getSelectedFrequence.id === 1) {
      arrGifts.map(item => {
        switch (parseInt(moment(item.itemDoAlmoxarifado.dataCadastro).format('M'))) {
          case 1:
            let newDate1 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(0, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate1
            break;
          case 2:
            let newDate2 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(1, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate2
            break;
          case 3:
            let newDate3 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(2, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate3
            break;
          case 4:
            let newDate4 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(0, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate4
            break;
          case 5:
            let newDate5 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(1, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate5
            break;
          case 6:
            let newDate6 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(2, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate6
            break;
          case 7:
            let newDate7 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(0, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate7
            break;
          case 8:
            let newDate8 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(1, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate8
            break;
          case 9:
            let newDate9 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(2, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate9
            break;
          case 10:
            let newDate10 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(0, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate10
            break;
          case 11:
            let newDate11 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(1, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate11
            break;
          case 12:
            let newDate12 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(2, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate12
            break;
        }
        return item
      })
      const quarterly = arrGifts?.reduce((quarterly: any /*Gifts[]*/, Unity: Gifts) => {
        quarterly[moment(Unity.itemDoAlmoxarifado.dataCadastro).format('M')] = quarterly[moment(Unity.itemDoAlmoxarifado.dataCadastro).format('M')] || [];
        quarterly[moment(Unity.itemDoAlmoxarifado.dataCadastro).format('M')]?.push(Unity);
          return quarterly;
        }, []);
      let arrMonthly: Gifts[][] = Object.values(quarterly);
      props.setGifts(arrMonthly);
      props.setVisibleFilter(false)
    } else if (props.getSelectedFrequence.id === 2) {
      arrGifts.map(item => {
        switch (parseInt(moment(item.itemDoAlmoxarifado.dataCadastro).format('M'))) {
          case 1:
            let newDate1 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(0, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate1
            break;
          case 2:
            let newDate2 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(1, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate2
            break;
          case 3:
            let newDate3 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(2, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate3
            break;
          case 4:
            let newDate4 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(3, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate4
            break;
          case 5:
            let newDate5 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(4, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate5
            break;
          case 6:
            let newDate6 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(5, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate6
            break;
          case 7:
            let newDate7 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(0, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate7
            break;
          case 8:
            let newDate8 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(1, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate8
            break;
          case 9:
            let newDate9 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(2, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate9
            break;
          case 10:
            let newDate10 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(3, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate10
            break;
          case 11:
            let newDate11 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(4, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate11
            break;
          case 12:
            let newDate12 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(5, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate12
            break;
        }
        return item
      })
      const semester = arrGifts?.reduce((semester: any /*Gifts[]*/, Unity: Gifts) => {
        semester[moment(Unity.itemDoAlmoxarifado.dataCadastro).format('M')] = semester[moment(Unity.itemDoAlmoxarifado.dataCadastro).format('M')] || [];
        semester[moment(Unity.itemDoAlmoxarifado.dataCadastro).format('M')]?.push(Unity);
          return semester;
        }, []);
      let arrMonthly: Gifts[][] = Object.values(semester);
      props.setGifts(arrMonthly);
      props.setVisibleFilter(false)
    } else if (props.getSelectedFrequence.id === 3) {
      arrGifts.map(item => {
        switch (parseInt(moment(item.itemDoAlmoxarifado.dataCadastro).format('M'))) {
          case 1:
            let newDate1 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(0, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate1
            break;
          case 2:
            let newDate2 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(1, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate2
            break;
          case 3:
            let newDate3 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(2, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate3
            break;
          case 4:
            let newDate4 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(3, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate4
            break;
          case 5:
            let newDate5 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(4, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate5
            break;
          case 6:
            let newDate6 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(5, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate6
            break;
          case 7:
            let newDate7 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(0, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate7
            break;
          case 8:
            let newDate8 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(7, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate8
            break;
          case 9:
            let newDate9 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(8, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate9
            break;
          case 10:
            let newDate10 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(9, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate10
            break;
          case 11:
            let newDate11 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(10, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate11
            break;
          case 12:
            let newDate12 = moment(item.itemDoAlmoxarifado.dataCadastro).subtract(11, 'months').toISOString();
            item.itemDoAlmoxarifado.dataCadastro = newDate12
            break;
        }
        return item
      })
      const yearly = arrGifts?.reduce((yearly: any /*Gifts[]*/, Unity: Gifts) => {
        yearly[moment(Unity.itemDoAlmoxarifado.dataCadastro).format('M')] = yearly[moment(Unity.itemDoAlmoxarifado.dataCadastro).format('M')] || [];
        yearly[moment(Unity.itemDoAlmoxarifado.dataCadastro).format('M')]?.push(Unity);
          return yearly;
        }, []);
      let arrMonthly: Gifts[][] = Object.values(yearly);
      props.setGifts(arrMonthly);
      props.setVisibleFilter(false)
    }
  }
  //#endregion

  //#region UseEffect
  useEffect(() => {}, []);
  //#endregion

  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <Styled.Container>
          <Styled.ContainerHeader
            style={{marginTop: Platform.OS === 'ios' ? '15%' : '5%'}}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => props.setVisibleFilter(false)}>
              <SvgCss xml={ArrowBack} />
            </TouchableOpacity>
            <Styled.TextHeader>Filtro</Styled.TextHeader>
          </Styled.ContainerHeader>
          <Styled.SubContainer>
            <Styled.TouchableContainer
              activeOpacity={0.9}
              onPress={() => {
                setVisibleFrequence(true);
              }}>
              <View style={{flexDirection: 'row'}}>
                <Styled.TextInput>Frequência:</Styled.TextInput>
                <Styled.TextInput style={{marginLeft: '2%', width: '50%'}}>
                  {props.getSelectedFrequence.description}
                </Styled.TextInput>
              </View>
              <Modals.MultipleSelections
                marginLeft="10%"
                title="Frequência"
                visible={getVisibleFrequence}
                onPressClose={() => {
                  setVisibleFrequence(false);
                }}
                data={frequence}
                renderItem={({item}) => (
                  <Styled.ItemContainer
                    onPress={() => {
                      props.setSelectedFrequence(item);
                      setVisibleFrequence(false);
                    }}>
                    <Styled.Item>
                      <Styled.TextItem>{item?.description}</Styled.TextItem>
                    </Styled.Item>
                  </Styled.ItemContainer>
                )}
              />
            </Styled.TouchableContainer>
            <Styled.TouchableContainer
              activeOpacity={0.9}
              onPress={() => {
                setVisibleClient(true);
              }}>
              <View style={{flexDirection: 'row'}}>
                <Styled.TextInput>Cliente:</Styled.TextInput>
                <Styled.TextInput style={{marginLeft: '2%', width: '70%'}}>
                  {getSelectedClient}
                </Styled.TextInput>
              </View>
              <Modals.MultipleSelections
                marginLeft="10%"
                title="Clientes"
                search={true}
                visible={getVisibleClient}
                onPressClose={() => {
                  setVisibleClient(false);
                }}
                onChangeText={event => {
                  SearchClient(event);
                }}
                data={getClient}
                renderItem={({item}) => (
                  <Styled.ItemContainer
                    onPress={() => {
                      setSelectedClient(item?.leadNome);
                      setVisibleClient(false);
                    }}>
                    <Styled.Item>
                      <Styled.TextItem>{item?.leadNome}</Styled.TextItem>
                    </Styled.Item>
                  </Styled.ItemContainer>
                )}
              />
            </Styled.TouchableContainer>
            <Styled.TouchableContainer
              activeOpacity={0.9}
              onPress={() => {
                UniqGift();
              }}>
              <View style={{flexDirection: 'row'}}>
                <Styled.TextInput>Brinde:</Styled.TextInput>
                <Styled.TextInput style={{marginLeft: '2%', width: '50%'}}>
                  {getSelectedGift}
                </Styled.TextInput>
              </View>
              <Modals.MultipleSelections
                marginLeft="10%"
                title="Brindes"
                search={true}
                visible={getVisibleGift}
                onPressClose={() => {
                  setVisibleGift(false);
                }}
                onChangeText={event => {
                  SearchGift(event);
                }}
                data={getGift}
                renderItem={({item}) => (
                  <Styled.ItemContainer
                    onPress={() => {
                      setSelectedGift(item);
                      setVisibleGift(false);
                    }}>
                    <Styled.Item>
                      <Styled.TextItem>{item}</Styled.TextItem>
                    </Styled.Item>
                  </Styled.ItemContainer>
                )}
              />
            </Styled.TouchableContainer>
            <Styled.TouchableContainer
              activeOpacity={0.9}
              onPress={() => {
                setOpenInitial(true);
              }}>
              <View style={{flexDirection: 'row'}}>
                <Styled.TextInput>Data de início:</Styled.TextInput>
                <Styled.TextInput style={{marginLeft: '2%', width: '50%'}}>
                  {props.getDateInitial === ''
                    ? ''
                    : moment(props.getDateInitial).format('DD/MM/YYYY')}
                </Styled.TextInput>
              </View>
              <DatePicker
                modal
                mode="date"
                open={getOpenInitial}
                date={getDate}
                onConfirm={date => {
                  let Date = moment(date).subtract(3, 'hour');
                  props.setDateInitial(Date.toISOString());
                  setOpenInitial(false);
                }}
                onCancel={() => {
                  setOpenInitial(false);
                }}
              />
            </Styled.TouchableContainer>
            <Styled.TouchableContainer
              style={{marginBottom: '5%'}}
              activeOpacity={0.9}
              onPress={() => {
                setOpenEnd(true);
              }}>
              <View style={{flexDirection: 'row'}}>
                <Styled.TextInput>Data de término:</Styled.TextInput>
                <Styled.TextInput style={{marginLeft: '2%', width: '50%'}}>
                  {props.getDateEnd === ''
                    ? ''
                    : moment(props.getDateEnd).format('DD/MM/YYYY')}
                </Styled.TextInput>
              </View>
              <DatePicker
                modal
                mode="date"
                open={getOpenEnd}
                date={getDate}
                onConfirm={date => {
                  let Date = moment(date).subtract(3, 'hour');
                  props.setDateEnd(Date.toISOString());
                  setOpenEnd(false);
                }}
                onCancel={() => {
                  setOpenEnd(false);
                }}
              />
            </Styled.TouchableContainer>
          </Styled.SubContainer>
          <Styled.ContainerSubmit>
            <Styled.Submit
              activeOpacity={0.8}
              onPress={() => {
                Filter();
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <SvgCss xml={FilterInformations} style={{marginLeft: '5%'}} />
                <Styled.TextSubmit>Filtrar informações</Styled.TextSubmit>
              </View>
            </Styled.Submit>
          </Styled.ContainerSubmit>
        </Styled.Container>
      </LinearGradient>
    </Modal>
  );
};

FilterGifts.propTypes = {
  visible: PropTypes.bool,
  setVisibleFilter: PropTypes.func,
  getDateInitial: PropTypes.string,
  setDateInitial: PropTypes.func,
  getDateEnd: PropTypes.string,
  setDateEnd: PropTypes.func,
  setGifts: PropTypes.func,
  OriginalProviderLogin: PropTypes.array,
  getSelectedFrequence: PropTypes.object,
  setSelectedFrequence: PropTypes.func,
};
