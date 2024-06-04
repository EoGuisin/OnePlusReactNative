import styled from "styled-components/native";

import { ResponsiveHeight, ResponsiveWidth } from '../../../Functions';

export const Container = styled.View`
    width: ${ResponsiveWidth('100%')};
    height: ${ResponsiveHeight('100%')};
    padding-top: 20px;
`;

export const ImagesContainer = styled.View`
    align-items: center;
    margin-top: 3%;
`;

export const GroupCompanyContainer = styled.TouchableOpacity`
    margin-bottom: 2%;
`;

export const TextGroupCompany = styled.Text`
    font-size: 20px;
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

export const AlreadyRegistered = styled.TouchableOpacity`
    align-self: center;
`;

export const AlreadyRegisteredText = styled.Text`
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
    margin-top: 15%;
`;

export const Developed = styled.Text`
    color: #FFFFFF;
    font-size: 12px;
    font-family: 'AzeretMono-SemiBold';
`;