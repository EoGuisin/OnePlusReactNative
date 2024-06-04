import styled from "styled-components/native";

import {ResponsiveHeight} from '../../../Functions';

export const Container = styled.View`
    width: 100%;
    height: 100%;
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
  flex: 1
`;

export const ContainerForm = styled.View`
  border-width: 1;
  border-radius: 10px;
  margin-top: 3%;
  border-color: #FFFFFF;
  padding: 5%;
  padding-left: 5%;
  width: 90%;
`;

export const AnotationText1 = styled.Text`
  color: #ffffff;
  font-size: 12px;
  font-family: 'AzeretMono-SemiBold';
  margin-top: 5%;
`;

export const AnotationText2 = styled.Text`
  color: #ffffff;
  font-size: 10px;
  font-family: 'AzeretMono-SemiBold';
  margin-top: -10;
`;

export const Title = styled.Text`
  color: #ffffff;
  font-size: 15px;
  font-family: 'AzeretMono-SemiBold';
  margin-top: -10;
`;

export const YerOrNo = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const SelectDateAndHour = styled.TouchableOpacity`
  border-color: #ffffff;
  border-width: 1;
  height: auto;
  margin-top: 5;
  width: auto;
  border-radius: 10px;
  background-color: rgba(16, 91, 116, 0.6);
`;

export const ContainerSubmit = styled.View`
  justify-content: flex-end;
  margin-top: 20;
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

export const Response = styled.TextInput`
  color: #ffffff;
  font-size: 12px;
  font-family: 'AzeretMono-SemiBold';
  margin-top: 5%;
  border-bottom-width: 1;
  border-bottom-color: #ffffff;
`;

export const TouchContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ViewForm = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TextDateAndHour = styled.Text`
  color: #ffffff;
  font-size: 10px;
  font-family: 'AzeretMono-SemiBold';
  text-align: center;
  paddingVertical: 5;
`;
