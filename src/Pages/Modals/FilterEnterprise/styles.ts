import styled from "styled-components/native";

import { ResponsiveHeight, ResponsiveWidth } from '../../../Functions';

export const Container = styled.View`
    height: ${ResponsiveHeight('100%')};
    width: ${ResponsiveWidth('100%')};
`;

export const TextHeader = styled.Text`
    color: #FFFFFF;
    font-family: 'AzeretMono-Regular';
    font-size: 20px;
`;

export const ContainerHeader = styled.View`
    flex-direction: row;
    margin-top: 15%;
    margin-left: 8%;
    align-items: center;
    justify-content: space-between;
    marginHorizontal: 24%;
`;

export const ViewContainerEnterprises = styled.View`
    height: ${ResponsiveHeight('70%')};
    border-radius: 22px;
`;

export const TextFilter = styled.Text`
    font-family: 'AzeretMono-Light';
    font-size: 20px;
    color: #FFFFFF;
`;

export const EnterprisesFiltered = styled.TouchableOpacity`
    border-color: #FFFFFF;
    border-bottom-width: 2px;
    margin-top: 10%;
    width: ${ResponsiveWidth('80%')};
    align-self: center;
`;

export const TextEnterprises = styled.Text`
    font-family: 'AzeretMono-Light';
    color: #FFFFFF;
    align-self: center;
    font-size: 15px;
`;

export const InputSearchContainer = styled.View`
    width: ${ResponsiveWidth('95%')};
    align-self: center;
    height: ${ResponsiveHeight('7%')};
    border-radius: 22px;
    background-color: rgba(192, 227, 220, 0.3);
    margin-top: 10%;
    align-items: center;
    flex-direction: row;
`;

export const InputSearch = styled.TextInput`
    width: 100%;
    font-family: 'AzeretMono-SemiBold';
    font-size: 18px;
    text-align: center;
    color: #FFFFFF;
`;

export const Flatlist = styled.FlatList`
    margin-top: 7%;
    border-radius: 50px;
    background: rgba(192, 227, 220, 0.3);
    width: ${ResponsiveWidth('95%')};
    align-self: center;
    margin-bottom: 7.5%;
`;

export const Loading = styled.View`
    width: 100;
    height: 100;
    align-self: center;
    margin-bottom: -7%;
`;