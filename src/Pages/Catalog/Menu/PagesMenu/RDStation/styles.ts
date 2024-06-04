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

export const Profile = styled.TouchableOpacity`
  border-width: 2;
  border-radius: 100px;
  width: 50px;
  height: 50px;
  border-color: #000000;
`;