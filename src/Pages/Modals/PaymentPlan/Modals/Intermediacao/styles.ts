import styled from 'styled-components/native';

import {ResponsiveHeight, ResponsiveWidth} from '../../../../../Functions';

export const Container = styled.View`
  height: 100%;
`;

export const TextHeader = styled.Text`
  color: #ffffff;
  font-family: 'AzeretMono-Regular';
  font-size: 20px;
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  marginHorizontal: 8%;
  width: 52%;
  align-items: center;
  justify-content: space-between;
`;

export const ContainerTitle = styled.View`
  background-color: rgba(192, 227, 220, 0.3);
  border-radius: 20px;
  padding: 20px;
  margin: 10px;
`;

export const ContainerHeaderTitle = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

export const SubContainer = styled.View`
  width: 95%;
  background-color: rgba(192, 227, 220, 0.3);
  align-self: center;
  border-radius: 20;
  margin-top: 5%;
  paddingVertical: 3%;
`;

export const Annex = styled.View`
  width: ${ResponsiveWidth('89%')};
  align-items: center;
  align-self: center;
  border-color: #ffffff;
  border-width: 2;
  border-radius: 16px;
  paddingVertical: 2.5%;
`;

export const TextAnnex = styled.Text`
  font-family: 'AzeretMono-Medium';
  font-size: 11px;
  color: #ffffff;
  margin-top: 2%;
  width: ${ResponsiveWidth('63%')};
`;

export const Cancel = styled.TouchableOpacity`
  left: 25;
`;

export const ContainerImage = styled.TouchableOpacity`
  border-width: 1;
  border-color: '#FFFFF';
  width: 50%;
  border-radius: 20;
  marginHorizontal: 12.2%;
  background-color: red;
  margin-top: 2;
`;

export const InputContainer = styled.View`
  width: ${ResponsiveWidth('80%')};
  height: ${ResponsiveHeight('4%')};
  border-bottom-width: 2px;
  align-self: center;
  border-color: #ffffff;
  margin-top: 3%;
`;

export const Input = styled.TextInput`
  margin-top: 3%;
  color: #ffffff;
  font-family: 'AzeretMono-Medium';
  font-size: 14px;
  margin-left: 2%;
`;

export const TextInput = styled.Text`
  font-family: 'AzeretMono-Medium';
  font-size: 14px;
  color: #ffffff;
`;

export const Swipe = styled.TouchableOpacity`
  width: 50;
  height: 50;
  align-self: center;
  justify-content: center;
  margin-bottom: 5%;
`;

export const TouchableContainer = styled.TouchableOpacity`
  width: ${ResponsiveWidth('80%')};
  height: ${ResponsiveHeight('4%')};
  border-bottom-width: 2px;
  align-self: center;
  border-color: #ffffff;
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

export const Info = styled.Text`
  font-size: 11px;
  font-family: 'AzeretMono-Medium';
  color: #ffffff;
  margin-top: 3%;
`;

export const ContainerInfo = styled.View``;

export const ContainerNewTitle = styled.TouchableOpacity`
  align-self: center;
  flex-direction: row;
  margin-bottom: 15;
  margin-top: 5%;
`;

export const Submit = styled.TouchableOpacity`
  border-color: #ffffff;
  border-width: 1;
  width: ${ResponsiveWidth('39%')};
  height: ${ResponsiveHeight('4.5%')};
  border-radius: 20px;
  background-color: #3bb273;
  align-self: center;
  justify-content: center;
`;

export const TextSubmit = styled.Text`
  text-align: center;
  color: #ffffff;
`;
