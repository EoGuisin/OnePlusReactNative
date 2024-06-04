import styled from "styled-components/native";

import { ResponsiveHeight, ResponsiveWidth } from '../../../Functions';

export const Container = styled.View`
    width: ${ResponsiveWidth('100%')};
    height: ${ResponsiveHeight('100%')};
    justify-content: space-between;
`;

export const Welcome = styled.Text`
    text-align: center;
    font-size: 23px;
    color: #FFFFFF;
    font-family: 'AzeretMono-Medium';
    margin-right: 13%;
    margin-bottom: -10%;
`;

export const TextContainer = styled.View`
    marginHorizontal: 25px;
`;

export const Text1 = styled.Text`
    width: 290px;
    padding: 3%;
    padding-top: -6px;
    font-size: 15px;
    color: #FFFFFF;
    margin-left: 20px;
    font-family: 'AzeretMono-SemiBold';
`;

export const Text2 = styled.Text`
    text-align: right;
    padding: 5%;
    font-size: 15px;
    color: #FFFFFF;
    margin-right: 20px;
    margin-bottom: 40;
    font-family: 'AzeretMono-SemiBold';
`;

export const DevelopedContainer = styled.View`
    width: ${ResponsiveWidth('100%')};
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 15%;
`;

export const Developed = styled.Text`
    color: #FFFFFF;
    font-size: 12px;
    font-family: 'AzeretMono-SemiBold';
`;