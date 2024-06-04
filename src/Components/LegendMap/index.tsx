import React from 'react';
import * as Styled from './styles';
import {ScrollView, View} from 'react-native';

//#region Services
import { Object_ } from '../../Services/Objects';
//#endregion

interface Props {
  getStatus: string[];
  getAvailable: Object_.Lotes[];
  getSold: Object_.Lotes[];
  getReserved: Object_.Lotes[];
  getProposal: Object_.Lotes[];
  getSettled: Object_.Lotes[];
  getCarrying: Object_.Lotes[];
  getOnSale: Object_.Lotes[];
  getSuspendedSale: Object_.Lotes[];
  getOutOfSale: Object_.Lotes[];
  getInAgreement: Object_.Lotes[];
  getReplacement: Object_.Lotes[];
}

export function LegendMap(props: Props) {
  //#region sum of the area of allotments
  function sumArea(item: Object_.Lotes[]) {
    let sum = 0;
    for (var i = 0; i < item.length; i++) {
      sum += item[i]?.dadosUau?.area;
    }
    return Math.trunc(sum);
  }
  //#endregion

  //#region sum of the value of allotments
  function sumValue(item: Object_.Lotes[]) {
    let sum = 0;
    for (var i = 0; i < item.length; i++) {
      sum += item[i].dadosUau.valorAVista;
    }
    return sum;
  }
  //#endregion

  return (
    <ScrollView style={{marginBottom: '30%', width: '90%'}} showsVerticalScrollIndicator={false}>
      {props.getStatus?.includes(props.getAvailable[0]?.dadosUau?.status?.toString()) && (
        <Styled.ContainerLegend style={{marginTop: '7%'}}>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Status:</Styled.TextTitleLegend>
            <View style={{flexDirection: 'row'}}>
              <Styled.Color style={{backgroundColor: 'green'}} />
              <Styled.TextTitleLegendResponse>
                Disponível
              </Styled.TextTitleLegendResponse>
            </View>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Área(m²):</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: '30%'}}>
              {sumArea(props.getAvailable)} m²
            </Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Quantidade:</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: '30%'}}>
              {props.getAvailable?.length}
            </Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Valor(R$):</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: sumValue(props.getAvailable) > 0 ? undefined : '30%'}}>{sumValue(props.getAvailable).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
        </Styled.ContainerLegend>
      )}
      {props.getStatus?.includes(props.getSold[0]?.dadosUau?.status?.toString()) && (
        <Styled.ContainerLegend style={{marginTop: '7%'}}>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Status:</Styled.TextTitleLegend>
            <View style={{flexDirection: 'row'}}>
              <Styled.Color style={{backgroundColor: 'red'}} />
              <Styled.TextTitleLegendResponse>
                Vendido
              </Styled.TextTitleLegendResponse>
            </View>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Área(m²):</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: '30%'}}>
              {sumArea(props.getSold)} m²
            </Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Quantidade:</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: '30%'}}>
              {props.getSold?.length}
            </Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Valor(R$):</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: sumValue(props.getSold) > 0 ? undefined : '30%'}}>{sumValue(props.getSold).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
        </Styled.ContainerLegend>
      )}
      {props.getStatus?.includes(props.getReserved[0]?.dadosUau?.status?.toString()) && (
        <Styled.ContainerLegend style={{marginTop: '7%'}}>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Status:</Styled.TextTitleLegend>
            <View style={{flexDirection: 'row'}}>
              <Styled.Color style={{backgroundColor: 'yellow'}} />
              <Styled.TextTitleLegendResponse>
                Reservado
              </Styled.TextTitleLegendResponse>
            </View>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Área(m²):</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: '30%'}}>
              {sumArea(props.getReserved)} m²
            </Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Quantidade:</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: '30%'}}>
              {props.getReserved?.length}
            </Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Valor(R$):</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: sumValue(props.getReserved) > 0 ? undefined : '30%'}}>{sumValue(props.getReserved).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
        </Styled.ContainerLegend>
      )}
      {props.getStatus?.includes(props.getProposal[0]?.dadosUau?.status?.toString()) && (
        <Styled.ContainerLegend style={{marginTop: '7%'}}>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Status:</Styled.TextTitleLegend>
            <View style={{flexDirection: 'row'}}>
              <Styled.Color style={{backgroundColor: 'darkorange'}} />
              <Styled.TextTitleLegendResponse>
                Proposta
              </Styled.TextTitleLegendResponse>
            </View>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Área(m²):</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: '30%'}}>
              {sumArea(props.getProposal)} m²
            </Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Quantidade:</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: '30%'}}>
              {props.getProposal?.length}
            </Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Valor(R$):</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: sumValue(props.getProposal) > 0 ? undefined : '30%'}}>{sumValue(props.getProposal).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
        </Styled.ContainerLegend>
      )}
      {props.getStatus?.includes(props.getSettled[0]?.dadosUau?.status?.toString()) && (
        <Styled.ContainerLegend style={{marginTop: '7%'}}>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Status:</Styled.TextTitleLegend>
            <View style={{flexDirection: 'row'}}>
              <Styled.Color style={{backgroundColor: '#7757A4'}} />
              <Styled.TextTitleLegendResponse>
                Quitado
              </Styled.TextTitleLegendResponse>
            </View>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Área(m²):</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: '30%'}}>
              {sumArea(props.getSettled)} m²
            </Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Quantidade:</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: '30%'}}>
              {props.getSettled?.length}
            </Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Valor(R$):</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: sumValue(props.getSettled) > 0 ? undefined : '30%'}}>{sumValue(props.getSettled).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
        </Styled.ContainerLegend>
      )}
      {props.getStatus?.includes(props.getCarrying[0]?.dadosUau?.status?.toString()) && (
        <Styled.ContainerLegend style={{marginTop: '7%'}}>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Status:</Styled.TextTitleLegend>
            <View style={{flexDirection: 'row'}}>
              <Styled.Color style={{backgroundColor: 'gray'}} />
              <Styled.TextTitleLegendResponse>
                Escriturado
              </Styled.TextTitleLegendResponse>
            </View>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Área(m²):</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: '30%'}}>
              {sumArea(props.getCarrying)} m²
            </Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Quantidade:</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: '30%'}}>
              {props.getCarrying?.length}
            </Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Valor(R$):</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: sumValue(props.getCarrying) > 0 ? undefined : '30%'}}>{sumValue(props.getCarrying).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
        </Styled.ContainerLegend>
      )}
      {props.getStatus?.includes(props.getOnSale[0]?.dadosUau?.status?.toString()) && (
        <Styled.ContainerLegend style={{marginTop: '7%'}}>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Status:</Styled.TextTitleLegend>
            <View style={{flexDirection: 'row'}}>
              <Styled.Color style={{backgroundColor: 'black'}} />
              <Styled.TextTitleLegendResponse>
                Em Venda
              </Styled.TextTitleLegendResponse>
            </View>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Área(m²):</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: '30%'}}>
              {sumArea(props.getOnSale)} m²
            </Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Quantidade:</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: '30%'}}>
              {props.getOnSale?.length}
            </Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Valor(R$):</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: sumValue(props.getOnSale) > 0 ? undefined : '30%'}}>{sumValue(props.getOnSale).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
        </Styled.ContainerLegend>
      )}
      {props.getStatus?.includes(props.getSuspendedSale[0]?.dadosUau?.status?.toString()) && (
        <Styled.ContainerLegend style={{marginTop: '7%'}}>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Status:</Styled.TextTitleLegend>
            <View style={{flexDirection: 'row'}}>
              <Styled.Color style={{backgroundColor: 'darkcyan'}} />
              <Styled.TextTitleLegendResponse>
                Suspenso venda
              </Styled.TextTitleLegendResponse>
            </View>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Área(m²):</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: '30%'}}>
              {sumArea(props.getSuspendedSale)} m²
            </Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Quantidade:</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: '30%'}}>
              {props.getSuspendedSale?.length}
            </Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Valor(R$):</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: sumValue(props.getSuspendedSale) > 0 ? undefined : '30%'}}>{sumValue(props.getSuspendedSale).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
        </Styled.ContainerLegend>
      )}
      {props.getStatus?.includes(props.getOutOfSale[0]?.dadosUau?.status?.toString()) && (
        <Styled.ContainerLegend style={{marginTop: '7%'}}>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Status:</Styled.TextTitleLegend>
            <View style={{flexDirection: 'row'}}>
              <Styled.Color style={{backgroundColor: '#D7D5D2'}} />
              <Styled.TextTitleLegendResponse>
                Fora de venda
              </Styled.TextTitleLegendResponse>
            </View>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Área(m²):</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: '30%'}}>
              {sumArea(props.getOutOfSale)} m²
            </Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Quantidade:</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: '30%'}}>
              {props.getOutOfSale.length}
            </Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Valor(R$):</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: sumValue(props.getOutOfSale) > 0 ? undefined : '30%'}}>{sumValue(props.getOutOfSale).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
        </Styled.ContainerLegend>
      )}
      {props.getStatus?.includes(props.getInAgreement[0]?.dadosUau?.status?.toString()) && (
        <Styled.ContainerLegend style={{marginTop: '7%'}}>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Status:</Styled.TextTitleLegend>
            <View style={{flexDirection: 'row'}}>
              <Styled.Color style={{backgroundColor: 'pink'}} />
              <Styled.TextTitleLegendResponse>
                Em acerto
              </Styled.TextTitleLegendResponse>
            </View>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Área(m²):</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: '30%'}}>
              {sumArea(props.getInAgreement)} m²
            </Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Quantidade:</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: '30%'}}>
              {props.getInAgreement.length}
            </Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Valor(R$):</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: sumValue(props.getInAgreement) > 0 ? undefined : '30%'}}>{sumValue(props.getInAgreement).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
        </Styled.ContainerLegend>
      )}
      {props.getStatus?.includes(props.getReplacement[0]?.dadosUau?.status?.toString()) && (
        <Styled.ContainerLegend style={{marginTop: '7%'}}>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Status:</Styled.TextTitleLegend>
            <View style={{flexDirection: 'row'}}>
              <Styled.Color style={{backgroundColor: 'darkblue'}} />
              <Styled.TextTitleLegendResponse>
                Dação
              </Styled.TextTitleLegendResponse>
            </View>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Área(m²):</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: '30%'}}>
              {sumArea(props.getReplacement)} m²
            </Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Quantidade:</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: '30%'}}>
              {props.getReplacement?.length}
            </Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
          <Styled.Wrapper>
            <Styled.TextTitleLegend>Valor(R$):</Styled.TextTitleLegend>
            <Styled.TextTitleLegendResponse style={{width: sumValue(props.getReplacement) > 0 ? undefined : '30%'}}>{sumValue(props.getReplacement).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Styled.TextTitleLegendResponse>
          </Styled.Wrapper>
        </Styled.ContainerLegend>
      )}
    </ScrollView>
  );
}
