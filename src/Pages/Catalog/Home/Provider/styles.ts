import styled from "styled-components/native";

import { ResponsiveHeight, ResponsiveWidth } from '../../../../Functions';

export const Container = styled.View`
    width: ${ResponsiveWidth('100%')};
    height: ${ResponsiveHeight('100%')};
`;

export const Header = styled.View`
    flex-direction: row;
    margin-top: 12%;
    marginHorizontal: 5%;
    justify-content: space-between;
`;

export const Profile = styled.TouchableOpacity`
    border-width: 2px;
    border-radius: 100px;
    width: 50px;
    height: 50px;
    border-color: #FFFFFF;
    justify-content: center;
`;

export const Title = styled.Text`
  color: #FFFFFF;
  font-family: 'AzeretMono-SemiBold';
  font-size: 16px;
  margin: 2%;
  margin-top: 5%;
`;

export const SubContainer_1 = styled.TouchableOpacity`
  background-color: rgba(192, 227, 220, 0.3);
  border-radius: 20px;
  border-width: 1px;
  border-color: #FFFFFF;
  padding: 10px;
  margin-right: 20px;
  min-width: 180px;
  max-width: 200px;
`;

export const SubContainer_2 = styled.TouchableOpacity`
  background-color: rgba(192, 227, 220, 0.3);
  border-radius: 20px;
  border-width: 1px;
  border-color: #FFFFFF;
  padding: 3%;
  margin-top: 10px;
`;

export const SubContainerText = styled.Text`
  color: #FFFFFF;
  font-family: 'AzeretMono-SemiBold';
  align-self: center;
`;

export const SubContainerText_2 = styled.Text`
  color: #FFFFFF;
  font-family: 'AzeretMono-SemiBold';
  font-size: 14px;
  margin-top: 5px;
`;

export const ContainerSubmit = styled.View`
  justify-content: flex-end;
`;

export const Submit = styled.TouchableOpacity`
  border-color: #ffffff;
  border-width: 1;
  height: ${ResponsiveHeight('4.5%')};
  border-radius: 10px;
  background-color: #3bb273;
  align-self: center;
  justify-content: center;
  margin-top: 3%;
`;

export const TextSubmit = styled.Text`
  paddingHorizontal: 5%;
  text-align: center;
  color: #ffffff;
  font-family: 'AzeretMono-Semibold'
`;