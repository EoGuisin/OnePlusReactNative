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

export const CleanFilter = styled.TouchableOpacity`
    position: absolute;
    margin-left: 77%;
`;

export const TextClean = styled.Text`
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
    marginHorizontal: 40%;
`;

export const Enterprise = styled.View`
    width: ${ResponsiveWidth('95%')};
    align-self: center;
    height: ${ResponsiveHeight('7%')};
    border-radius: 22px;
    background-color: rgba(192, 227, 220, 0.3);
    margin-top: 10%;
    align-items: center;
    flex-direction: row;
`;

export const TextEnterprise = styled.Text`
    width: 90%;
    font-family: 'AzeretMono-SemiBold';
    font-size: 14px;
    text-align: center;
    color: #FFFFFF;
`;

export const ContainerFilter = styled.View`
    border-radius: 40px;
    background-color: rgba(192, 227, 220, 0.3);
    margin-top: 4%;
    height: ${ResponsiveHeight('63%')};
    width: ${ResponsiveWidth('95%')};
    align-self: center;
`;

export const TextInformationsFilter = styled.Text`
    font-family: 'AzeretMono-Medium';
    font-size: 20px;
    color: #FFFFFF;
    margin-top: 7%;
`;

export const Square = styled.TouchableOpacity`
    border-width: 2px;
    border-radius: 11px;
    width: ${ResponsiveWidth('11%')};
    height: ${ResponsiveHeight('5%')};
    margin-top: 1%;
    justify-content: center;
    margin-right: 2%;
`;

export const SquareContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;

export const TextSquare = styled.Text`
    font-family: 'AzeretMono-SemiBold';
    font-size: 12px;
    color: #FFFFFF;
    text-align: center;
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
  align-items: center;
  margin-top: 5%;
`;

export const TextSubmit = styled.Text`
  color: #FFFFFF;
  font-size: 21px;
`;