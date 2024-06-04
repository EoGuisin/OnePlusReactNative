import styled from 'styled-components/native';

import {ResponsiveHeight, ResponsiveWidth} from '../../../Functions';

export const Container = styled.View`
  width: ${ResponsiveWidth('100%')};
  height: ${ResponsiveHeight('85%')};
`;

export const Header = styled.View`
  justify-content: space-between;
  paddingHorizontal: 3%;
  flex-direction: row;
  height: ${ResponsiveHeight('10%')};
  width: ${ResponsiveWidth('100%')};
  position: static;
`;

export const Profile = styled.TouchableOpacity`
  border-width: 0.5;
  border-radius: 100px;
  width: 50px;
  height: 50px;
  border-color: #ffffff;
  justify-content: center;
`;

export const TextProfile = styled.Text`
  text-align: center;
  font-family: 'AzeretMono-SemiBold';
  font-size: 20px;
  color: #ffffff;
`;

export const ImagesContainer = styled.View`
`;

export const TextMenu = styled.Text`
  font-family: 'AzeretMono-Medium';
  font-size: 25px;
  text-align: center;
  color: #ffffff;
  margin-right: 5%;
  margin-top: 5%;
`;

export const TextMenuCard = styled.Text`
  font-family: 'AzeretMono-Medium';
  font-size: 10px;
  text-align: center;
  margin-top: 13%;
  color: #ffffff;
`;

export const MenuCard = styled.TouchableOpacity`
  width: ${ResponsiveWidth('28%')};
  height: ${ResponsiveHeight('12%')};
  border-radius: 10px;
  background-color: rgba(192, 227, 220, 0.3);
  margin-top: 3.5%;
  marginHorizontal: 2%;
`;

export const MenuCardContainer = styled.View``;
