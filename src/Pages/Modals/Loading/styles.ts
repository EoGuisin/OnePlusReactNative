import styled from 'styled-components/native';

import {ResponsiveHeight, ResponsiveWidth} from '../../../Functions';

export const Container = styled.View`
  height: ${ResponsiveHeight('100%')};
  background-color: rgba(255, 255, 255, 0.4);
  justify-content: center;
`;

export const Loading = styled.View`
  width: 100;
  height: 100;
  align-self: center;
  margin-bottom: -7%;
`;