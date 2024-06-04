import styled from "styled-components/native";

import { ResponsiveHeight, ResponsiveWidth } from '../../../Functions';

export const Container = styled.View`
    width: ${ResponsiveWidth('100%')};
    height: ${ResponsiveHeight('100%')};
    padding-top: -1%;
`;

export const ImagesContainer = styled.View`
    align-items: center;
    margin-top: 2%;
`;

export const ForgotPassword = styled.TouchableOpacity`
    color: #FFFFFF;
    width: ${ResponsiveWidth("35%")};
`;

export const TextForgotPassword = styled.Text`
    color: #FFFFFF;
    font-size: 9px;
    font-family: 'AzeretMono-SemiBold';
`;

export const ContainerForgotAndSwitch = styled.View`
    justify-content: space-between;
    align-items: center;
    align-self: center;
    flex-direction: row;
    width: ${ResponsiveWidth("73%")};
    margin-top: 1%;
`;

export const SwitchCPF = styled.Text`
    color: #FFFFFF;
    font-size: 9px;
    padding-right: 5px;
`;

export const SwitchEmail = styled.Text`
    color: #FFFFFF;
    font-size: 9px;
    padding-left: 5px;
`;


export const GroupCompanyContainer = styled.TouchableOpacity`
    margin-bottom: 3%;
`;

export const TextGroupCompany = styled.Text`
    font-size: 19px;
    color: #FFFFFF;
    text-align: center;
    font-family: 'AzeretMono-Regular';
    margin-bottom: 5%;
`;

export const GroupCompany = styled.View`
    border-bottom-width: 2px;
    border-color: #FFFFFF;
    margin-top: 5.5%;
    width: 70%;
    align-items: center;
    align-self: center;
    justify-content: center;
`;

export const LoginContainer = styled.TouchableOpacity`
    align-self: center;
`;

export const LoginText = styled.Text`
    font-family: 'AzeretMono-SemiBold';
    color: #FFFFFF;
    font-size: 10px;
    margin-top: 6px;
`;

export const DevelopedContainer = styled.View`
    width: ${ResponsiveWidth('100%')};
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const Developed = styled.Text`
    color: #FFFFFF;
    font-size: 12px;
    font-family: 'AzeretMono-SemiBold';
`;

export const FillVoid = styled.View`
    align-self: center;
    margin-top: 60%;
    text-align: center;
    border-color: #FFFFFF;
    paddingHorizontal: 2%;
    align-items: center;
    justify-content: center;
`;

export const Version = styled.Text`
  font-family: 'AzeretMono-Medium';
  font-size: 12px;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 10%;
`;