import styled from "styled-components/native";

import { ResponsiveHeight, ResponsiveWidth } from '../../../Functions';

export const Container = styled.View`
  height: ${ResponsiveHeight('100%')};
`;

export const TextHeader = styled.Text`
  color: #FFFFFF;
  font-family: 'AzeretMono-Regular';
  font-size: 20px;
  marginHorizontal: 14%;
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
  height: ${ResponsiveHeight('75%')};
  background-color: rgba(192, 227, 220, 0.3);
  padding-top: 2%;
  align-self: center;
  border-radius: 20px;
  margin-top: 5%;
  paddingHorizontal: 4%;
`;

export const TextLegal = styled.Text`
  font-family: 'AzeretMono-SemiBold';
  font-size: 14px;
  color: #ffffff;
  margin-left: 5%;
  margin-top: 5%;
`;

export const TextCancelProponent = styled.Text`
  font-family: 'AzeretMono-SemiBold';
  font-size: 14px;
  color: #ffffff;
`;

export const Annex = styled.View`
  width: auto;
  height: auto;
  padding: 2%;
  border-color: #ffffff;
  border-width: 2;
  border-radius: 16px;
  marginVertical: 3%;
  marginHorizontal: 2%;
`;

export const ContainerImage = styled.TouchableOpacity`
  border-width: 1;
  border-color: '#FFFFFF';
  width: 50%;
  border-radius: 20;
  marginHorizontal: 12.2%;
  margin-top: 2;
`;

export const TextAnnex = styled.Text`
  font-family: 'AzeretMono-Medium';
  font-size: 11px;
  color: #ffffff;
  margin-top: 2%;
  padding-left: 40;
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
  font-size: 14px;
  color: #ffffff;
  margin-top: 3%;
`;

export const TextInputOptional = styled.Text`
  font-family: 'AzeretMono-Medium';
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 3%;
`;

export const Input = styled.TextInput`
  margin-top: 3%;
  color: #ffffff;
  font-family: 'AzeretMono-Medium';
  font-size: 14px;
  margin-left: 2%;
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

export const ClearFilterUF = styled.TouchableOpacity`
  width: 10%;
  margin-left: -1%;
  margin-top: 4%;
`;

export const FilterUF = styled.View`
  width: 10%;
  margin-left: -1%;
  margin-top: 4%;
`;

export const ClearFilterUFAddress = styled.TouchableOpacity`
  width: 10%;
  margin-left: 0%;
  margin-top: 4%;
`;

export const ClearFilterNationality = styled.TouchableOpacity`
  width: 8%;
  margin-top: 4%;
`;

export const ClearFilterUFProponent = styled.TouchableOpacity`
  width: 10%;
  margin-top: 4%;
`;

export const FilterUFProponent = styled.TouchableOpacity`
  width: 10%;
  margin-top: 4%;

`;

export const FilterNationality = styled.View`
  width: 6%;
  margin-left: 0.5%;
  margin-top: 4%;
`;

export const ClearFilterMaritalStatus = styled.TouchableOpacity`
  width: 10%;
  margin-left: 10%;
  margin-top: 4%;
`;

export const FilterMaritalStatus = styled.View`
  width: 10%;
  margin-left: 10%;
  margin-top: 4%;
`;

export const ClearFilterNaturalness = styled.TouchableOpacity`
  width: 10%;
  margin-top: 4%;
`;

export const FilterNaturalness = styled.View`
  width: 11%;
  margin-top: 4%;
`;

export const ClearFilterPropertyRegime = styled.TouchableOpacity`
  width: 7%;
  margin-top: 4%;
`;

export const FilterPropertyRegime = styled.View`
  width: 10%;
  margin-top: 4%;
`;

export const ContainerMaritalStatus = styled.View`
  margin-top: 4%;
`;

export const ContainerMarried = styled.View`
  margin-bottom: 10%;
  margin-top: -5%;
`;

export const TextSubtitle = styled.Text`
  font-family: 'AzeretMono-SemiBold';
  font-size: 18px;
  color: #ffffff;
  margin-left: 5%;
  margin-top: 5%;
`;

export const TextProponents = styled.Text`
  font-family: 'AzeretMono-SemiBold';
  font-size: 14px;
  color: #ffffff;
  margin-left: 5%;
  margin-top: 5%;
  margin-bottom: 10%;
  width: 70%;
`;

export const ContainerSwitch = styled.View`
  margin-top: -3%;
`;

export const Cancel = styled.TouchableOpacity`
`;

export const Submit = styled.TouchableOpacity`
  border-color: #FFFFFF;
  border-width: 1;
  width: ${ResponsiveWidth('39%')};
  height: ${ResponsiveHeight('4.5%')};
  border-radius: 20px;
  background-color: #3BB273;
  align-self: center;
  justify-content: center;
  margin-top: 2%;
`;

export const TextSubmit = styled.Text`
  text-align: center;
  color: #FFFFFF;
`;