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

export const Information = styled.View`
    border-radius: 10;
    border-width: 1;
    border-color: #FFFFFF;
    width: 80%;
    height: 10%;
    align-self: center;
    background-color: #105B74;
`;

export const TextInformation = styled.Text`
    font-size: 15px;
    text-align: center;
    font-family: 'AzeretMono-SemiBold';
    color: #FFFFFF;
    margin-top: 4%;
`;

export const SubContainer = styled.View`
  width: 95%;
  background-color: rgba(192, 227, 220, 0.3);
  align-self: center;
  border-radius: 20;
  margin-top: 5%;
  padding: 7%;
`;