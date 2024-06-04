//#region Native
import React from 'react';
import {View} from 'react-native';
//#endregion

//#region Component
import { ResponsiveWidth } from '../../Functions';
import * as Styled from './styles';
import {CNPJ, CPF} from '../../Themes/TextFormat';
//#endregion

interface Props {
  person: string | undefined;
  cpf_cnpj: string | undefined;
  value: string | undefined;
  title: string | undefined;
  onPress(): void;
}

export const Commissioned = (props: Props) => {
  return (
    <Styled.Commissioned>
      <Styled.Place>{props.title}</Styled.Place>
      <Styled.TouchableContainer activeOpacity={0.9} onPress={props.onPress}>
        <View style={{flexDirection: 'row'}}>
          <Styled.TextInput>Comissionados: {props.person}</Styled.TextInput>
          <Styled.TextInput style={{marginLeft: '2%', width: "65%"}}></Styled.TextInput>
        </View>
      </Styled.TouchableContainer>
      <Styled.InputContainer>
        <View style={{flexDirection: 'row'}}>
          <Styled.TextInput>CPF / CNPJ: {props.cpf_cnpj!?.length > 11 ? CNPJ.FormatarTexto(props.cpf_cnpj) : CPF.FormatarTexto(props.cpf_cnpj)}</Styled.TextInput>
          <Styled.TextInput style={{width: ResponsiveWidth('65%'), marginLeft:'2%', color: 'rgba(255, 255, 255, 0.7)'}}></Styled.TextInput>
        </View>
      </Styled.InputContainer>
      <Styled.InputContainer>
        <View style={{flexDirection: 'row'}}>
          <Styled.TextInput>Valor: {props.value}</Styled.TextInput>
          <Styled.TextInput style={{width: ResponsiveWidth('65%'), marginLeft:'2%', color: 'rgba(255, 255, 255, 0.7)'}}></Styled.TextInput>
        </View>
      </Styled.InputContainer>
    </Styled.Commissioned>
  );
};