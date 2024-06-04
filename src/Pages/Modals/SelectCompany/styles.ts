import styled from "styled-components/native";

import { ResponsiveHeight, ResponsiveWidth } from '../../../Functions';

export const Container = styled.View`
    height: ${ResponsiveHeight('100%')};
`;

export const Flatlist = styled.FlatList`
    margin-top: 7%;
    border-radius: 50px;
    background: rgba(192, 227, 220, 0.3);
    width: ${ResponsiveWidth("95%")};
    align-self: center;
    margin-bottom: 7.5%;
`;

export const ContainerLoading = styled.View`
    margin-top: 7%;
    border-radius: 50px;
    background: rgba(192, 227, 220, 0.3);
    width: ${ResponsiveWidth("95%")};
    height: 70%;
    align-self: center;
    margin-bottom: 7.5%;
`;

export const ContainerNoPossible = styled.View`
  border-width: 1;
  border-radius: 10px;
  align-self: center;
  border-color: #FFFFFF;
  padding: 3%;
  margin-top: 50%;
  width: 90%;
`;

export const NoPossibleText = styled.Text`
  color: #ffffff;
  font-size: 15px;
  font-family: 'AzeretMono-Regular';
  text-align: center;
  font-style: italic;
`;

export const TextLoading = styled.Text`
  color: #FFFFFF;
  font-size: 13px;
  font-family: 'AzeretMono-SemiBold';
  margin-top: 2.5%;
  text-align: center;
  margin-top: 20%;
`;
export const Loading = styled.View`
    width: 100%;
    justify-content: center;
    border-radius: 20px;
`;

export const Button = styled.TouchableOpacity`
    border-top-width: 2;
    border-left-width: 2;
    border-right-width: 2;
    height: ${ResponsiveHeight('5%')};
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    border-color: #26A77C;
`;

export const TextHeader = styled.Text`
    color: #FFFFFF;
    font-family: 'AzeretMono-Regular';
    font-size: 20px;
`;

export const ContainerHeader = styled.View`
    flex-direction: row;
    margin-left: 8%;
    align-items: center;
    justify-content: space-between;
    marginHorizontal: 37%;
`;

export const Input = styled.TextInput`
    align-self: center;
    border-bottom-width: 2px;
    border-color: #FFFFFF;
    margin-top: 8%;
    height: ${ResponsiveHeight("5%")};
    width: ${ResponsiveWidth("50%")};
    font-family: 'AzeretMono-Regular';
    font-size: 18px;
    color: #FFFFFF;
`;

export const InputSquareContainer = styled.View`
    width: ${ResponsiveWidth('95%')};
    align-self: center;
    height: ${ResponsiveHeight('7%')};
    border-radius: 22px;
    background-color: rgba(192, 227, 220, 0.3);
    margin-top: 10%;
    align-items: center;
    flex-direction: row;
`;

export const InputSquare = styled.TextInput`
    width: 100%;
    font-family: 'AzeretMono-SemiBold';
    font-size: 18px;
    text-align: center;
    color: #FFFFFF;
`;