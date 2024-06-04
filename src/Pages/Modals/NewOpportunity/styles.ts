import styled from 'styled-components/native';

import {ResponsiveHeight, ResponsiveWidth} from '../../../Functions';

export const Container = styled.View`
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
  margin-bottom: 20;
`;

export const TextNewOpportunity = styled.Text`
  color: #FFFFFF;
  font-family: 'AzeretMono-SemiBold';
  font-size: 20px;
  margin: 5%;
`;

export const SubContainer = styled.View`
  width: 95%;
  background-color: rgba(192, 227, 220, 0.3);
  padding: 10%;
  padding-top: 10%;
  justify-content: center;
  align-self: center;
  border-radius: 20;
  margin-top: 5%;
`;

export const InputContainer = styled.View`
  width: ${ResponsiveWidth('80%')};
  align-self: center;
  border-bottom-width: 2px;
  border-color: #ffffff;
  margin-top: 3%;
`;

export const Text = styled.Text`
  font-family: 'AzeretMono-Medium';
  font-size: 14px;
  color: #ffffff;
`;

export const Input = styled.TextInput`
  color: #ffffff;
  font-family: 'AzeretMono-Medium';
  font-size: 14px;
  margin-left: 2%;
`;

export const SwitchPhone = styled.Text`
  color: #FFFFFF;
  font-size: 10px;
  padding-right: 2%;
  margin-left: 20%;
`;

export const SwitchEmail = styled.Text`
  color: #FFFFFF;
  font-size: 10px;
  padding-left: 2%;
`;

export const TouchableContainer = styled.TouchableOpacity`
  width: ${ResponsiveWidth('80%')};
  height: ${ResponsiveHeight('4%')};
  border-bottom-width: 2px;
  align-self: center;
  border-color: #ffffff;
  margin-top: 3%;
`;

export const TextInput = styled.Text`
  font-family: 'AzeretMono-Medium';
  font-size: 14px;
  color: #ffffff;
  margin-top: 3%;
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
  font-size: 20px;
  color: #ffffff;
  text-align: center;
  font-family: 'AzeretMono-Regular';
  margin-bottom: 2%;
`;

export const ContainerSubmit = styled.View`
  justify-content: flex-end;
  flex: 1;
`;

export const Submit = styled.TouchableOpacity`
  border-color: #ffffff;
  border-width: 1;
  height: ${ResponsiveHeight('4.5%')};
  border-radius: 20px;
  background-color: #3bb273;
  align-self: center;
  justify-content: center;
  margin-bottom: 20%;
`;

export const TextSubmit = styled.Text`
  paddingHorizontal: 5%;
  text-align: center;
  color: #ffffff;
  font-family: 'AzeretMono-Semibold'
`;