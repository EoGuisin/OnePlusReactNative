import styled from "styled-components/native";

import { ResponsiveHeight, ResponsiveWidth } from '../../../../../Functions';

export const Container = styled.View`
    width: ${ResponsiveWidth('100%')};
    height: ${ResponsiveHeight('100%')};
    margin-top: 10%;
`;