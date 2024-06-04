import styled from "styled-components/native";

import { ResponsiveHeight, ResponsiveWidth } from '../../../../Functions';

export const Container = styled.View`
    width: ${ResponsiveWidth('100%')};
    height: ${ResponsiveHeight('100%')};
`;

export const TextHeader = styled.Text`
  color: #FFFFFF;
  font-family: 'AzeretMono-Regular';
  font-size: 20px;
  flex: 1;
  text-align: center;
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  margin-left: 8%;
  align-items: center;
  justify-content: space-between;
  marginHorizontal: 15%;
`;

export const SubContainer = styled.View`
  background-color: rgba(192, 227, 220, 0.3);
  border-radius: 20px;
  padding: 3%;
  margin-top: 3%;
  marginHorizontal: 5%;
`;

export const SubContainerTask = styled.View`
  background-color: rgba(192, 227, 220, 0.3);
  border-radius: 20px;
  padding: 2%;
  align-items: center;
  margin-top: 5%;
  height: 55%;
`;

export const InputContainer = styled.View`
  height: ${ResponsiveHeight('4')};
  border-bottom-width: 2px;
  border-color: #ffffff;
  top: -5;
  marginHorizontal: 3%;
`;

export const TouchableContainer = styled.TouchableOpacity`
  height: ${ResponsiveHeight('4')};
  border-bottom-width: 2px;
  border-color: #ffffff;
  top: -5;
  marginHorizontal: 3%;
`;

export const Input = styled.TextInput`
  color: #ffffff;
  font-family: 'AzeretMono-Medium';
  font-size: 14px;
  margin-left: 2%;
  height: 100%;
`;

export const TextInput = styled.Text`
  font-family: 'AzeretMono-Medium';
  font-size: 12px;
  color: #ffffff;
  margin-top: 3%;
`;

export const ContainerSubmit = styled.View`
  justify-content: flex-end;
  flex: 1;
`;

export const Submit = styled.TouchableOpacity`
  border-color: #ffffff;
  border-width: 1;
  height: ${ResponsiveHeight('4.5%')};
  border-radius: 10px;
  background-color: #3bb273;
  paddingHorizontal: 3%;
  align-self: center;
  justify-content: center;
  margin-bottom: 10%;
`;

export const TextSubmit = styled.Text`
  paddingHorizontal: 5%;
  text-align: center;
  color: #ffffff;
  font-family: 'AzeretMono-Semibold'
`;

export const Item = styled.View`
  margin-bottom: 2%;
`;

export const ItemContainer = styled.TouchableOpacity`
  border-bottom-width: 2px;
  border-color: #ffffff;
  margin-top: 5.5%;
  width: 70%;
  align-items: center;
  align-self: center;
  justify-content: center;
  margin-bottom: 5%;
`;

export const TextItem = styled.Text`
  font-size: 15px;
  color: #ffffff;
  text-align: center;
  font-family: 'AzeretMono-Regular';
  margin-bottom: 2%;
`;

export const SubContainerInput = styled.TextInput`
  padding: 4%;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  color: #ffffff;
  font-family: 'AzeretMono-Regular';
  font-size: 14px;
`;