import styled from "styled-components/native";

import { ResponsiveHeight, ResponsiveWidth } from '../../../Functions';

export const Container = styled.View`
  height: ${ResponsiveHeight('100%')};
`;

export const TextHeader = styled.Text`
  color: #ffffff;
  font-family: 'AzeretMono-Regular';
  font-size: 20px;
  margin-left: 2%;
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  marginHorizontal: 8%;
  align-items: center;
`;

export const SubContainer = styled.View`
  width: ${ResponsiveWidth('95%')};
  background-color: rgba(192, 227, 220, 0.3);
  align-self: center;
  border-radius: 20;
  margin-top: 5%;
  height: ${ResponsiveHeight('80%')};
  justify-content: space-between;
  padding-top: 10%;
  padding-bottom: 12%;
  padding: 5%;
`;

export const ConfirmModal = styled.View`
  align-items: center;
  padding: 5%;
`;

export const ConfirmText = styled.Text`
  font-family: 'AzeretMono-Medium';
  font-size: 16px;
  color: #ffffff;
  margin-bottom: 10px;
`;

export const InputContainer = styled.TouchableOpacity`
  border-bottom-width: 2px;
  border-color: #ffffff;
  flex: 2;
`;

export const TextInput = styled.Text`
  font-family: 'AzeretMono-Medium';
  font-size: 14px;
  color: #ffffff;
`;

export const SubmitSignatureButton = styled.TouchableOpacity`
  background-color: #3BB273;
  justify-content: center;
  padding: 10px;
  margin-top: 5px;
  border-color: #FFFFFF;
  border-width: 1;
  border-radius: 15px;
`;