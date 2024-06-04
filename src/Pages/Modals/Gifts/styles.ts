import styled from 'styled-components/native';

import {ResponsiveHeight, ResponsiveWidth} from '../../../Functions';

export const Container = styled.View`
  width: ${ResponsiveWidth('100%')};
  height: ${ResponsiveHeight('100%')};
`;

export const TextHeader = styled.Text`
  color: #FFFFFF;
  font-family: 'AzeretMono-Regular';
  font-size: 20px;
  flex: 1;
  text-align: center;
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  margin-left: 8%;
  align-items: center;
  justify-content: space-between;
  marginHorizontal: 22%;
`;

export const TextList = styled.Text`
  color: #FFFFFF;
  font-family: 'AzeretMono-SemiBold';
  font-size: 20px;
`;

export const WrapperButtons = styled.View`
  flex-direction: row;
  marginHorizontal: 4%;
  /* background-color: red; */
  margin-bottom: 40;
  flex: 1;
`;

export const QRCode = styled.TouchableOpacity`
  background-color: #3BB273;
  border-radius: 11px;
  marginHorizontal: 0.5%;
  border-width: 1;
  border-color: #FFFFFF;
  justify-content: center;
  flex: 1;
  height: ${ResponsiveHeight('4.5%')};
  align-self: flex-end;
`;

export const Invoicing = styled.TouchableOpacity`
  background-color: #105B74;
  border-radius: 11px;
  align-items: center;
  justify-content: center;
  marginHorizontal: 0.5%;
  border-width: 1;
  border-color: #FFFFFF;
  flex: 1;
  height: ${ResponsiveHeight('4.5%')};
  align-self: flex-end;
`;

export const TextButton = styled.Text`
  color: #FFFFFF;
  margin: 4%;
  font-family: 'AzeretMono-SemiBold';
  font-size: 13px;
`;


export const SubContainer = styled.View`
  width: 95%;
  background-color: rgba(192, 227, 220, 0.3);
  padding: 3%;
  align-self: center;
  border-radius: 20px;
  margin-top: 5%;
`;

export const SubContainerFlatlist = styled.TouchableOpacity`
`;

export const SubContainerText = styled.Text`
  color: #FFFFFF;
`;

export const InsideTotal = styled.Text`
  color: #FFFFFF;
  margin-left: 10%;
  font-family: 'AzeretMono-Medium';
  font-size: 14px;
`;

export const InsideClientText = styled.Text`
  color: #FFFFFF;
  font-family: 'AzeretMono-SemiBold';
  font-size: 14px;
  margin-top: 2%;
`;

export const Loading = styled.View`
  width: 100%;
  height: 100%;
`;

export const ContainerClient = styled.TouchableOpacity`
  border-width: 1;
  border-radius: 20px;
  margin-top: 3%;
  border-color: #FFFFFF;
  padding: 3%;
  padding-left: 3%;
  width: 90%;
`;