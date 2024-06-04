import styled from "styled-components/native";

import { ResponsiveHeight, ResponsiveWidth } from '../../Functions';

export const Touchable = styled.TouchableOpacity`
    border-color: #FFFFFF;
    height: ${ResponsiveHeight('4.5%')};
    border-radius: 11px;
    border-width: 1px;
`;

export const TextButton = styled.Text`
    color: #FFFFFF;
    font-family: 'AzeretMono-SemiBold';
    padding-left: 7px;
    font-size: 15px;
`;