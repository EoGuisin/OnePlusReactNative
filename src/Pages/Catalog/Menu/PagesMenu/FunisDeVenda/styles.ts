import styled from "styled-components/native";

import { ResponsiveHeight, ResponsiveWidth } from '../../../../../Functions';

export const Container = styled.View`
    width: ${ResponsiveWidth('100%')};
    height: ${ResponsiveHeight('100%')};
`;

export const TextHeader = styled.Text`
  color: #FFFFFF;
  font-family: 'AzeretMono-Regular';
  font-size: 20px;
  text-align: center;
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  margin-left: 8%;
  align-items: center;
  justify-content: space-between;
  marginHorizontal: 22%;
`;

export const TextLead = styled.Text`
  color: #FFFFFF;
  font-family: 'AzeretMono-SemiBold';
  font-size: 20px;
`;

export const SubContainer = styled.TouchableOpacity`
  width: 95%;
  background-color: rgba(192, 227, 220, 0.3);
  padding: 5%;
  align-self: center;
  border-radius: 20;
  margin-top: 10;
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
  font-size: 15px;
  color: #ffffff;
  text-align: center;
  font-family: 'AzeretMono-Regular';
  margin-bottom: 2%;
`;

export const ContainerSubmit = styled.View`
`;

export const Loading = styled.View`
  width: 100%;
  height: 100%;
`;

export const Submit = styled.TouchableOpacity`
  border-color: #ffffff;
  border-width: 1;
  height: ${ResponsiveHeight('4.5%')};
  border-radius: 20px;
  background-color: #3bb273;
  align-self: center;
  justify-content: center;
  margin-bottom: 100;
`;

export const TextSubmit = styled.Text`
  paddingHorizontal: 5%;
  text-align: center;
  color: #ffffff;
  font-family: 'AzeretMono-Semibold'
`;

export const SubContainerText = styled.Text`
  color: #FFFFFF;
  font-size: 13px;
  font-family: 'AzeretMono-SemiBold';
  margin-top: 3%;
`;

export const ScheduledVisitContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  border-radius: 10px;
`;

export const ScheduledVisitText = styled.Text`
  color: #FFFFFF;
  font-size: 13px;
  text-align: center;
  font-family: 'AzeretMono-SemiBold';
  margin: 5px;
`;

export const SubContainerTitle = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  font-family: 'AzeretMono-SemiBold';
  margin-right: 20%;
`;

export const Profile = styled.View`
  border-radius: 100;
  position: absolute;
  align-self: flex-end;
  border-width: 1px;
  border-color: #FFFFFF;
  align-items: center;
  justify-content: center;
  padding: 5%;
  top: 10%;
  right: 5%;
`;

export const InputSquareContainer = styled.View`
  width: ${ResponsiveWidth('95%')};
  align-self: center;
  height: ${ResponsiveHeight('7%')};
  border-radius: 22px;
  background-color: rgba(192, 227, 220, 0.3);
  margin-top: 2%;
  margin-bottom: 10;
  align-items: center;
  flex-direction: row;
`;

export const InputSquare = styled.TextInput`
  width: 100%;
  font-family: 'AzeretMono-SemiBold';
  font-size: 18px;
  text-align: center;
  color: #ffffff;
`;