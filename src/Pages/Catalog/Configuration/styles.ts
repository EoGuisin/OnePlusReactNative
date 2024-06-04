import styled from "styled-components/native";

import { ResponsiveHeight, ResponsiveWidth } from '../../../Functions';

export const Container = styled.View`
    width: ${ResponsiveWidth('100%')};
    height: ${ResponsiveHeight('100%')};
`;

export const Header = styled.View`
  justify-content: space-between;
  paddingHorizontal: 3%;
  flex-direction: row;
  height: ${ResponsiveHeight('10%')};
  width: ${ResponsiveWidth('100%')};
`;

export const Profile = styled.TouchableOpacity`
    border-width: 0.5;
    border-radius: 100px;
    width: 50px;
    height: 50px;
    border-color: #FFFFFF;
    justify-content: center;
    margin-left: 63%;
`;

export const TextProfile = styled.Text`
    text-align: center;
    font-family: 'AzeretMono-SemiBold';
    font-size: 20px;
    color: #FFFFFF;
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
  margin-top: 10%;
`;

export const TextSubmit = styled.Text`
  text-align: center;
  color: #FFFFFF;
`;