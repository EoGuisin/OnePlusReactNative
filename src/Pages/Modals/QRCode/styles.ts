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

export const QRCode = styled.TouchableOpacity`
  align-self: center;
  background-color: #3BB273;
  border-radius: 11px;
  justify-content: center;
  marginHorizontal: 0.5%;
  border-width: 1;
  border-color: #FFFFFF;
  flex: 1;
`;

export const Billing = styled.TouchableOpacity`
  align-self: center;
  background-color: #105B74;
  border-radius: 11px;
  justify-content: center;
  align-items: center;
  marginHorizontal: 0.5%;
  border-width: 1;
  border-color: #FFFFFF;
  flex: 1;
`;

export const TextButton = styled.Text`
  color: #FFFFFF;
  margin: 4%;
  font-family: 'AzeretMono-SemiBold';
  font-size: 13px;
`;

export const WrapperButtons = styled.View`
  flex-direction: row;
  marginHorizontal: 4%;
  margin-bottom: 10%;
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
  width: 95%;
  background-color: rgba(192, 227, 220, 0.3);
  padding: 2.5%;
  align-self: center;
  border-radius: 10px;
  flex: 3;
  margin-top: 5%;
`;

export const SubContainerText = styled.Text`
  color: #FFFFFF;
`;

export const Loading = styled.View`
  width: 100%;
  height: 100%;
`;