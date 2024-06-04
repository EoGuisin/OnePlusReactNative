import styled from 'styled-components/native';

import {ResponsiveHeight, ResponsiveWidth} from '../../../../../Functions';

export const Container = styled.View`
  width: ${ResponsiveWidth('100%')};
  height: ${ResponsiveHeight('100%')};
`;

export const TextHeader = styled.Text`
  color: #FFFFFF;
  font-family: 'AzeretMono-Regular';
  font-size: 20px;
  flex: 2;
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TextTitle = styled.Text`
  font-family: 'AzeretMono-SemiBold';
  font-size: 19px;
  color: #ffffff;
  margin-left: 7%;
  margin-top: 3%;
`;

export const CardContainer = styled.View`
  flex-direction: row;
  margin-left: 3.5%;
`;

export const Card = styled.TouchableOpacity`
  width: ${ResponsiveWidth('22%')};
  border-radius: 10px;
  background-color: rgba(192, 227, 220, 0.3);
  margin-top: 3.5%;
  margin-right: 7;
`;

export const TextDisponibility = styled.Text`
  font-size: 10px;
  align-self: center;
  margin-top: 12%;
  font-family: 'AzeretMono-SemiBold';
`;

export const TextCardTitle = styled.Text`
  font-family: 'AzeretMono-Medium';
  font-size: 15px;
  color: #ffffff;
`;

export const TextCard = styled.Text`
  font-family: 'AzeretMono-Medium';
  font-size: 14px;
  color: #ffffff;
  align-self: center;
`;

export const Items = styled.TouchableOpacity`
  width: 95%;
  background-color: rgba(192, 227, 220, 0.3);
  justify-content: center;
  align-self: center;
  border-radius: 20px;
  margin-top: 3%;
  height: ${ResponsiveHeight('6.5%')};
`;

export const ItemsContainer = styled.View`
  width: 100%;
  border-radius: 2;
  align-self: center;
  padding-top: 2%;
  padding-bottom: 5%;
  justify-content: flex-start;
  height: 70%;
`;

export const Number = styled.View`
  border-radius: 100px;
  width: 35px;
  height: 35px;
  justify-content: center;
  align-items: center;
  background-color: #105b74;
  border-color: white;
  border-width: 1px;
  margin-left: 5%;
`;

export const TextNumber = styled.Text`
  font-family: 'AzeretMono-Medium';
  font-size: 20px;
  color: #ffffff;
`;

export const LegalContainer = styled.View`
  margin-left: 5%;
  flex-direction: row;
  margin-top: 1.5%;
`;

export const SubtitleContainer = styled.View`
  margin-left: 5%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ContainerButtons = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  height: 70%;
`;

export const NewProposal = styled.TouchableOpacity`
  border-color: #FFFFFF;
  border-width: 1;
  width: 40%;
  height: 8%;
  border-radius: 20px;
  background-color: #105B74;
  justify-content: center;
`;

export const TextNewProposal = styled.Text`
  text-align: center;
  color: #FFFFFF;
`;

export const Submit = styled.TouchableOpacity`
  border-color: #FFFFFF;
  border-width: 1;
  width: 40%;
  height: 8%;
  border-radius: 20px;
  background-color: #3BB273;
  justify-content: center;
`;

export const TextSubmit = styled.Text`
  text-align: center;
  color: #FFFFFF;
`;