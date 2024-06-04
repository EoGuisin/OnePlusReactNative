import styled from "styled-components/native";

import { ResponsiveHeight, ResponsiveWidth } from '../../../Functions';

export const Container = styled.View`
    width: ${ResponsiveWidth('100%')};
    height: ${ResponsiveHeight('100%')};
`;

export const TextHeader = styled.Text`
    color: #FFFFFF;
    font-family: 'AzeretMono-Regular';
    font-size: 20px;
`;

export const ContainerHeader = styled.View`
    flex-direction: row;
    margin-top: 5%;
    margin-left: 8%;
    align-items: center;
    justify-content: space-between;
    marginHorizontal: 22.5%;
`;

export const GreenContainer = styled.View`
    margin-top: 7%;
    border-radius: 50px;
    background: rgba(192, 227, 220, 0.3);
    width: ${ResponsiveWidth('95%')};
    align-self: center;
    height: ${ResponsiveHeight('78%')};
`;