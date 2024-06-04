import styled from "styled-components/native";

import { ResponsiveHeight, ResponsiveWidth } from '../../../Functions';

export const Container = styled.View`
  height: ${ResponsiveHeight('100%')};
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
  marginHorizontal: 10%;
`;

export const Submit = styled.TouchableOpacity`
  height: ${ResponsiveHeight('4.5%')};
`;

export const SubmitCancelButton = styled.TouchableOpacity`
  height: 50%;
  background-color: #105B74;
  justify-content: center;
  width: 30%;
  border-color: #FFFFFF;
  border-width: 1;
  border-radius: 10px;
`;

export const SubmitReservationButton = styled.TouchableOpacity`
  height: 50%;
  background-color: #3BB273;
  justify-content: center;
  width: 30%;
  border-color: #FFFFFF;
  border-width: 1;
  border-radius: 10px;
`;

export const ContainerButtons = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 2%;
`;

export const TextSubmit = styled.Text`
  color: #ffffff;
  font-family: 'AzeretMono-SemiBold';
  font-size: 13px;
  align-self: center;
`;

export const TextTitleLegend = styled.Text`
  color: #FFFFFF;
  font-family: 'AzeretMono-Regular';
  font-size: 16;
`;

export const ContainerLegend = styled.View`
  border-width: 0.5;
  margin-top: 5%;
  marginHorizontal: 3.5%;
  border-radius: 5px;
  border-color: #FFFFFF;
`;

export const Color = styled.View`
  width: 20;
  height: 20;
  border-radius: 50;
  margin-left: 35%;
  margin-right: 3%;
`;

export const TextTitleLegendResponse = styled.Text`
  color: #FFFFFF;
  font-family: 'AzeretMono-Regular';
  font-size: 15;
  text-align: center;
`;

export const TextHeaderModal = styled.Text`
  font-family: 'AzeretMono-Medium';
  font-size: 15;
  text-align: center;
  margin-right: 10%;
`;

export const ButtonHeaderModal = styled.TouchableOpacity`
  border-bottom-width: 1;;
  padding-bottom: 2%;
`;

export const ContainerVisualization = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 20%;
`;

export const TextTitleVisualization = styled.Text`
  text-align: center;
  color: #FFFFFF;
  margin-top: 5%;
  font-family: 'AzeretMono-Medium';
  font-size: 15;
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

export const TextDescription = styled.Text`
  font-size: 16px;
  color: #ffffff;
  font-family: 'AzeretMono-SemiBold';
`;

export const TextDescriptionHeaderModal = styled.Text`
  font-size: 18px;
  color: #ffffff;
  font-family: 'AzeretMono-SemiBold';
`;

export const TextDescriptionTitle = styled.Text`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.75);
  font-family: 'AzeretMono-Regular';
  margin-left: 10%;
`;
export const ContainerInformation = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 7%;
  margin-top: 2%;
`;