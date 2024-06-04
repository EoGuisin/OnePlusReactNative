import styled from 'styled-components/native';

import {ResponsiveHeight, ResponsiveWidth} from '../../../Functions';

export const Container = styled.View`
  height: ${ResponsiveHeight('100%')};
`;

export const TextHeader = styled.Text`
  color: #ffffff;
  font-family: 'AzeretMono-Regular';
  font-size: 20px;
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const ImageContainer = styled.View`
  flex: 1;
`;

export const Base = styled.View`
  flex: 0;
`;