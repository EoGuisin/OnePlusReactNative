import styled from 'styled-components/native';

import {ResponsiveHeight, ResponsiveWidth} from '../../../Functions';

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
  color: #ffffff;
  font-family: 'AzeretMono-Regular';
  font-size: 15px;
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
  background-color: 'rgba(192, 227, 220, 0.3)';
  border-radius: 20;
  marginHorizontal: 3%;
  paddingVertical: 5%;
  paddingHorizontal: 4%;
  padding-top: -5%;
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

export const ContainerButton = styled.View`
  justify-content: flex-end;
  flex: 1;
`;

export const Submit = styled.TouchableOpacity`
  border-color: #FFFFFF;
  border-width: 1;
  width: 40%;
  height: 8%;
  border-radius: 20px;
  background-color: #3BB273;
  justify-content: center;
  margin-bottom: 10%;
  align-self: center;
`;

export const TextSubmit = styled.Text`
  text-align: center;
  color: #FFFFFF;
`;