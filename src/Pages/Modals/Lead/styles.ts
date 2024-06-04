import styled from 'styled-components/native';

import {ResponsiveHeight, ResponsiveWidth} from '../../../Functions';

export const Container = styled.View`
  height: ${ResponsiveHeight('100%')};
`;

export const TextHeader = styled.Text`
  color: #ffffff;
  font-family: 'AzeretMono-Regular';
  font-size: 20px;
  width: 70%;
  text-align: center;
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  margin-left: 8%;
  align-items: center;
`;

export const ContainerIcons = styled.View`
  marginHorizontal: 20%;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 10%;
  shadowColor: "#000";
  shadowOffset: {
  	width: 2;
  	height: 0;
  };
  shadowOpacity: 0.25;
  shadowRadius: 5;
`;

export const SubContainer = styled.View`
  background-color: rgba(192, 227, 220, 0.3);
  border-radius: 20px;
  marginHorizontal: 5%;
  flex-direction: row;
  justify-content: space-between;
  padding: 5%;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 5%;
  margin-bottom: 15%;
`;

export const BorderSubContainer = styled.TouchableOpacity`
  border-width: 1.5;
  border-radius: 10px;
  padding: 2.5%;
  margin-top: 3%;
  width: 100%;
`;
export const NoClassification = styled.View`
  border-width: 1.5;
  border-radius: 10px;
  padding: 2.5%;
  margin-top: 3%;
  width: 100%;
`;

export const BorderSubContainerView = styled.View`
  border-width: 1.5;
  border-radius: 10px;
  padding: 2.5%;
  margin-top: 3%;
  width: 100%;
`;

export const SubContainerText = styled.Text`
  font-size: 13px;
  font-family: 'AzeretMono-SemiBold';
  text-align: center;
`;

export const Swipe = styled.TouchableOpacity`
  width: 45;
  height: 45;
`;

export const InputContainer = styled.View`
  width: ${ResponsiveWidth('80%')};
  height: ${ResponsiveHeight('4')};
  border-bottom-width: 2px;
  align-self: center;
  border-color: #ffffff;
  margin-top: 3%;
`;

export const TouchableContainer = styled.TouchableOpacity`
  width: ${ResponsiveWidth('80%')};
  height: ${ResponsiveHeight('4')};
  border-bottom-width: 2px;
  align-self: center;
  border-color: #ffffff;
  margin-top: 3%;
`;

export const Input = styled.TextInput`
  color: #ffffff;
  font-family: 'AzeretMono-Medium';
  font-size: 14px;
  margin-left: 2%;
`;

export const Text = styled.Text`
  font-family: 'AzeretMono-Medium';
  font-size: 14px;
  color: #ffffff;
  align-self: center;
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

export const TitleFunnelHistoryAndLevels = styled.TouchableOpacity`
  border-bottom-width: 2px;
  border-color: #ffffff;
  margin-top: 5.5%;
  align-items: center;
  align-self: center;
  justify-content: center;
  margin-bottom: 5%;
`;

export const TextFunnelHistoryAndLevels = styled.Text`
  font-size: 12px;
  color: #ffffff;
  text-align: center;
  font-family: 'AzeretMono-SemiBold';
  margin-bottom: 2%;
`;

export const Submit = styled.TouchableOpacity`
  border-color: #ffffff;
  border-width: 1;
  border-radius: 20px;
  margin-top: 5%;
  padding: 2%;
  padding-left: 5%;
  padding-right: 5%;
`;

export const TextSubmit = styled.Text`
  text-align: center;
  color: #ffffff;
  font-family: 'AzeretMono-Regular';
`;

export const ContainerNoHistory = styled.View`
  border-width: 1;
  border-radius: 10px;
  align-self: center;
  border-color: #FFFFFF;
  padding: 3%;
  width: 100%;
`;
export const TextNoHistory = styled.Text`
  color: #ffffff;
  font-size: 10px;
  font-family: 'AzeretMono-Regular';
  text-align: center;
  font-style: italic;
`;

export const Annex = styled.View`
  width: auto;
  height: auto;
  padding: 2%;
  border-color: #ffffff;
  border-width: 2;
  border-radius: 16px;
  marginVertical: 3%;
`;

export const TextLegal = styled.Text`
  font-family: 'AzeretMono-SemiBold';
  font-size: 14px;
  color: #ffffff;
`;

export const ViewPDF = styled.View`
  border-width: 1;
  border-color: '#FFFFFF';
  border-radius: 20;
  margin-top: 10;
  marginHorizontal: 13%;
  padding: 5%;
  align-items: center;
`;

export const ContainerImage = styled.TouchableOpacity`
  border-width: 1;
  border-color: '#FFFFF';
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
  width: ${ResponsiveWidth('67%')};
`;

export const Cancel = styled.TouchableOpacity`
  left: 50%;
`;

export const ContainerLegal = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-evenly;
`;