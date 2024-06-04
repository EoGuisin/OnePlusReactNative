import styled from 'styled-components/native';

import {ResponsiveHeight, ResponsiveWidth} from '../../../Functions';

export const Container = styled.View`
  height: ${ResponsiveHeight('100%')};
`;

export const TextHeader = styled.Text`
  color: #ffffff;
  font-family: 'AzeretMono-Regular';
  font-size: 20px;
  width: 100%;
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  margin-left: 8%;
  align-items: center;
  justify-content: space-between;
`;

export const ImageContainer = styled.View`
  height: ${ResponsiveHeight('75%')};
  width: ${ResponsiveWidth('100%')};
  border-width: 3px;
  border-radius: 50px;
  border-color: #FFFFFF;
  align-self: center;
  margin-top: 10%;

`;