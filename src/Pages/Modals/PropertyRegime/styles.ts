import styled from "styled-components/native";

import { ResponsiveHeight, ResponsiveWidth } from '../../../Functions';

export const Container = styled.View`
    height: ${ResponsiveHeight('100%')};
`;

export const TextHeader = styled.Text`
    color: #FFFFFF;
    font-family: 'AzeretMono-Regular';
    font-size: 20px;
    width: 78%;
`;

export const ContainerHeader = styled.View`
    flex-direction: row;
    margin-left: 8%;
    align-items: center;
    justify-content: space-between;
`;

export const Item = styled.View`
    margin-bottom: 2%;
`;

export const ItemContainer = styled.TouchableOpacity`
    border-bottom-width: 2px;
    border-color: #FFFFFF;
    margin-top: 5.5%;
    width: 70%;
    align-items: center;
    align-self: center;
    justify-content: center;
    margin-bottom: 5%;
`;

export const TextItem = styled.Text`
    font-size: 20px;
    color: #FFFFFF;
    text-align: center;
    font-family: 'AzeretMono-Regular';
    margin-bottom: 2%;
`;

export const Flatlist = styled.FlatList`
    width: ${ResponsiveWidth('100%')};
    background-color: rgba(192, 227, 220, 0.3);
    padding-top: 2%;
    border-radius: 50px;
    margin-top: 7%;
    margin-bottom: 25%;
`;