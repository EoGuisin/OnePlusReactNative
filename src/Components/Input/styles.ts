import styled from 'styled-components/native';
import {Platform} from 'react-native';

export const Container = styled.View`
  width: 100%;
  align-self: center;
  margin-top: ${Platform.OS == 'android' ? -5 : 20};
`;

export const ContainerTexts = styled.View`
  width: 100%;
  align-self: center;
  flex-direction: row;
  align-items: center;
`;

export const TextPorcentage = styled.Text`
  color: white;
  font-family: 'AzeretMono-Medium';
  font-size: 14px;
`;

export const NameInput = styled.Text`
  color: white;
  font-family: 'AzeretMono-Medium';
  font-size: 14px;
  margin-right: 2;
`;

export const Input = styled.TextInput`
  color: white;
  font-family: 'AzeretMono-Medium';
  font-size: 14px;
  width: 60%;
`;

export const Margin = styled.View`
  color: white;
  border-color: white;
  border-top-width: 2;
  width: 100%;
  align-self: center;
  top: ${Platform.OS == 'android' ? -10 : 0};
`;