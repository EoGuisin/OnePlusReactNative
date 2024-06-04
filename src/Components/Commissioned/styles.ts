import styled from "styled-components/native";

import { ResponsiveHeight, ResponsiveWidth } from '../../Functions';

export const Commissioned = styled.View`
  width: 95%;
  background-color: rgba(192, 227, 220, 0.3);
  align-self: center;
  border-radius: 20;
  padding-bottom: 8%;
  margin-top: 5%;
`;

export const TouchableContainer = styled.TouchableOpacity`
  width: ${ResponsiveWidth('80%')};
  height: ${ResponsiveHeight('4%')};
  border-bottom-width: 2px;
  align-self: center;
  border-color: #ffffff;
  margin-top: 3%;
`;

export const InputContainer = styled.View`
  width: ${ResponsiveWidth('80%')};
  height: ${ResponsiveHeight('4%')};
  border-bottom-width: 2px;
  align-self: center;
  border-color: #ffffff;
  margin-top: 3%;
`;

export const TextInput = styled.Text`
  font-family: 'AzeretMono-Medium';
  font-size: 12px;
  color: #ffffff;
  margin-top: 3%;
`;

export const Place = styled.Text`
  font-size: 16px;
  color: #ffffff;
  font-family: 'AzeretMono-Medium';
  margin-left: 5%;
  margin-top: 5%;
`;