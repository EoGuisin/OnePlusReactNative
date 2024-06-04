import styled from 'styled-components/native';

import {ResponsiveWidth, ResponsiveHeight} from '../../../Functions';

export const Container = styled.View`
  height: 100%;
`;

export const TextHeader = styled.Text`
  color: #ffffff;
  font-family: 'AzeretMono-Regular';
  font-size: 20px;
  margin-right: 10%;
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  margin-left: 8%;
  align-items: center;
  justify-content: space-between;
`;

export const SubContainer = styled.View`
  width: 95%;
  background-color: rgba(192, 227, 220, 0.3);
  padding-top: 2%;
  padding-bottom: 2%;
  align-self: center;
  border-radius: 20;
  margin-top: 5%;
  height: 22%;
`;

export const ContainerSubmit = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const Submit = styled.TouchableOpacity`
  border-color: #ffffff;
  border-width: 1;
  width: ${ResponsiveWidth('39%')};
  height: ${ResponsiveHeight('4.5%')};
  border-radius: 20px;
  background-color: #3bb273;
  align-self: center;
  justify-content: center;
  margin-bottom: 10%;
`;

export const TextSubmit = styled.Text`
  text-align: center;
  color: #ffffff;
`;