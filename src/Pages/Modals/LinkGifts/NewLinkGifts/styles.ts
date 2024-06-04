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
  marginHorizontal: 5%;
  padding: 5%;
  margin-top: 5%;
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
  margin-bottom: 80;
`;

export const TextSubmit = styled.Text`
  paddingHorizontal: 5%;
  text-align: center;
  color: #ffffff;
  font-family: 'AzeretMono-Semibold'
`;

export const ContainerLinkGifts = styled.View`
  border-width: 1;
  border-radius: 10px;
  margin-top: 3%;
  border-color: #FFFFFF;
  padding-left: 3%;
  padding-top: 3%;
  padding-bottom: 3%;
  width: 80%;
`;

export const LinkGiftsText = styled.Text`
  color: #ffffff;
  font-size: 13px;
  font-family: 'AzeretMono-Medium';
  margin-top: 2%;
  margin-left: 7%;
`;

export const LinkGiftsTextHeader = styled.Text`
  color: #ffffff;
  font-size: 15px;
  font-family: 'AzeretMono-SemiBold';
  margin-bottom: 2%;
`;

export const ContainerNoLinkGifts = styled.View`
  border-width: 1;
  border-radius: 10px;
  align-self: center;
  border-color: #FFFFFF;
  padding: 3%;
  margin-top: 3%;
  width: 90%;
`;
export const NoLinkGiftsText = styled.Text`
  color: #ffffff;
  font-size: 10px;
  font-family: 'AzeretMono-Regular';
  text-align: center;
  font-style: italic;
`;

export const TouchableContainer = styled.TouchableOpacity`
  width: ${ResponsiveWidth('80%')};
  height: ${ResponsiveHeight('4%')};
  border-bottom-width: 2px;
  align-self: center;
  border-color: #ffffff;
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