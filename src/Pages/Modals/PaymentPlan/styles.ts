import styled from "styled-components/native";

import { ResponsiveHeight, ResponsiveWidth } from '../../../Functions';

export const Container = styled.View`
  height: ${ResponsiveHeight('100%')};
`;

export const Flatlist = styled.FlatList`
    margin-top: 7%;
    border-radius: 50px;
    background: rgba(192, 227, 220, 0.3);
    width: 100%;
    margin-bottom: 25%;
`;

export const TextHeader = styled.Text`
    color: #FFFFFF;
    font-family: 'AzeretMono-Regular';
    font-size: 20px;
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  marginHorizontal: 5%;
`;

export const Number = styled.TouchableOpacity`
  border-radius: 100px;
  width: 35px;
  height: 35px;
  justify-content: center;
  align-items: center;
  border-color: white;
  border-width: 1px;
  /* background-color: #105b74; */
`;

export const TextNumber = styled.Text`
  font-family: 'AzeretMono-Medium';
  font-size: 20px;
  color: #ffffff;
`;

export const SubContainer = styled.View`
  width: 95%;
  background-color: rgba(192, 227, 220, 0.3);
  align-self: center;
  border-radius: 20;
  padding-bottom: 5%;
  margin-top: 5%;
  margin-bottom: 5%;
  paddingHorizontal: 5%;
`;

export const ContainerParcela = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5%;
  justify-content: space-around;
  top: 5%;
`;

export const TextParcela = styled.Text`
  font-family: 'AzeretMono-SemiBold';
  font-size: 14px;
  color: #ffffff;
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

export const ContainerSubmit = styled.View`
  justify-content: flex-end;
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
  margin-bottom: 10%;
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

export const TextSubmit = styled.Text`
  text-align: center;
  color: #ffffff;
`;
export const Payment = styled.TouchableOpacity`
  width: 95%;
  padding-top: 2%;
  background-color: rgba(192, 227, 220, 0.3);
  margin-top: 2%;
  padding-bottom: 2%;
  align-self: center;
  border-radius: 20;
  height: 60;
  justify-content: center;
`;

export const TextPayment = styled.Text`
  font-family: 'AzeretMono-SemiBold';
  font-size: 20px;
  color: #ffffff;
  text-align: center;
`;
