import styled from "styled-components/native";

import { ResponsiveHeight, ResponsiveWidth } from '../../../Functions';

export const Container = styled.View`
  height: 100%;
  width: 100%;
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
  width: ${ResponsiveWidth('95%')};
  background-color: rgba(192, 227, 220, 0.3);
  align-self: center;
  border-radius: 20;
  margin-top: 5%;
  padding-top: 5%;
  height: ${ResponsiveHeight('70%')};
`;

export const TextSubtitle = styled.Text`
  font-family: 'AzeretMono-SemiBold';
  font-size: 18px;
  color: #ffffff;
  margin-left: 5%;
`;

export const ContainerSubmit = styled.View`
  flex: 1;
  justify-content: flex-end;
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

export const TextSubmit = styled.Text`
  text-align: center;
  color: #ffffff;
`;