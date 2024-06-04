import styled from "styled-components/native";

import { ResponsiveHeight, ResponsiveWidth } from '../../../Functions';

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
  marginHorizontal: 22%;
`;

export const SubContainer = styled.View`
  background-color: rgba(192, 227, 220, 0.3);
  border-radius: 20px;
  marginHorizontal: 5%;
  padding: 2%;
  margin-top: 5%;
  height: 65%;
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
  margin-bottom: 10%;
`;

export const TextSubmit = styled.Text`
  paddingHorizontal: 5%;
  text-align: center;
  color: #ffffff;
  font-family: 'AzeretMono-Semibold'
`;

export const TextHistoric = styled.Text`
  color: #FFFFFF;
  font-family: 'AzeretMono-SemiBold';
  font-size: 20px;
  margin-top: 7%;
  margin-left: 5%;
`;

export const ContainerAnotation = styled.View`
  border-width: 1;
  border-radius: 10px;
  margin-top: 3%;
  border-color: #FFFFFF;
  padding: 5%;
  padding-left: 10%;
  width: 90%;
`;

export const AnotationText1 = styled.Text`
  color: #ffffff;
  font-size: 11px;
  font-family: 'AzeretMono-Semibold';
  margin-top: 5%;
`;

export const AnotationText2 = styled.Text`
  color: #ffffff;
  font-size: 10px;
  font-family: 'AzeretMono-Regular';
  margin-top: 3%;
`;

export const ContainerNoAnotation = styled.View`
  border-width: 1;
  border-radius: 10px;
  align-self: center;
  border-color: #FFFFFF;
  padding: 3%;
  margin-top: 3%;
  width: 90%;
`;
export const NoAnotationText = styled.Text`
  color: #ffffff;
  font-size: 10px;
  font-family: 'AzeretMono-Regular';
  text-align: center;
  font-style: italic;
`;