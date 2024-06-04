import styled from "styled-components/native";

import { ResponsiveHeight, ResponsiveWidth } from '../../Functions';

export const Input = styled.TextInput`
    align-self: center;
    border-bottom-width: 2px;
    margin-top: 6%;
    margin-left: 15%;
    border-color: #FFFFFF;
    paddingVertical: 1%;
    width: ${ResponsiveWidth("70%")};
    font-family: 'AzeretMono-Medium';
    color: #FFFFFF;
`;