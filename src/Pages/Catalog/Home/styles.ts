import styled from "styled-components/native";

import { ResponsiveHeight, ResponsiveWidth } from '../../../Functions';

export const Container = styled.View`
    width: ${ResponsiveWidth('100%')};
    height: ${ResponsiveHeight('100%')};
`;

export const Header = styled.View`
  justify-content: space-between;
  paddingHorizontal: 3%;
  flex-direction: row;
  height: ${ResponsiveHeight('10%')};
  width: ${ResponsiveWidth('100%')};
`;

export const Profile = styled.TouchableOpacity`
    border-width: 0.5;
    border-radius: 100px;
    width: 50px;
    height: 50px;
    border-color: #FFFFFF;
    justify-content: center;
`;

export const TextProfile = styled.Text`
    text-align: center;
    font-family: 'AzeretMono-SemiBold';
    font-size: 20px;
    color: #FFFFFF;
`;

export const FavoritesContainer = styled.View`
    margin: 4%;
    margin-top: -5%;
    margin-bottom: -32%;
`;

export const TextFavorites = styled.Text`
    font-family: 'AzeretMono-Medium';
    font-size: 15px;
    color: #FFFFFF;
`;

export const Favorites = styled.FlatList`
    width: ${ResponsiveWidth('27%')};
    margin-right: 6%;
    height: ${ResponsiveHeight('12%')};
    background-color: rgba(192, 227,220, 0.3);
    marginVertical: 2%;
    border-radius: 20px;
`;

export const HighlightsContainer = styled.View`
    margin: 4%;
`;

export const TextHighlights = styled.Text`
    font-family: 'AzeretMono-Medium';
    font-size: 15px;
    color: #FFFFFF;
    margin-bottom: 2%;
`;

export const Highlights = styled.View`
    width: 100%;
    height: ${ResponsiveHeight('13%')};
    background-color: rgba(192, 227,220, 0.3);
    marginVertical: 2%;
    justify-content: center;
    border-radius: 20px;
`;

export const OverviewContainer = styled.View`
    marginHorizontal: 4%;
    margin-bottom: 530;
`;

export const TextOverview = styled.Text`
    font-family: 'AzeretMono-Medium';
    font-size: 15px;
    color: #FFFFFF;
`;

export const ContainerNoOverview = styled.View`
  border-width: 1;
  border-radius: 10px;
  align-self: center;
  border-color: #FFFFFF;
  padding: 3%;
  margin-top: 30%;
  width: 90%;
`;
export const TextNoOverview = styled.Text`
  color: #ffffff;
  font-size: 10px;
  font-family: 'AzeretMono-Regular';
  text-align: center;
  font-style: italic;
`;

export const Overview = styled.View`
    width: 100%;
    background-color: rgba(192, 227,220, 0.3);
    justify-content: center;
    border-radius: 20px;
    margin-top: 3%;
    paddingVertical: 1.5%
`;

export const Loading = styled.View`
    width: 100%;
    justify-content: center;
    border-radius: 20px;
    margin-top: 30%;
`;

export const SvgOverview = styled.View`
    border-radius: 100px;
    width: 35px;
    height: 35px;
    justify-content: center;
    align-items: center;
    background-color: #105B74;
    margin-left: 2%;
`;

export const Card = styled.TouchableOpacity`
    width: 29%;
    height: 100%;
    background-color: rgba(192, 227,220, 0.3);
    marginVertical: 2%;
    border-radius: 20px;
    margin-right: 4.2%;
`;

export const TextCard = styled.Text`
    font-family: 'AzeretMono-Medium';
    font-size: 10px;
    margin: 7%;
    margin-top: 13%;
    color: #FFFFFF;
`;

export const MenuCardContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    height: 25%;
`;

export const MenuCard = styled.TouchableOpacity`
    width: 31%;
    height: 160%;
    background-color: rgba(192, 227,220, 0.3);
    marginVertical: 2%;
    border-radius: 11px;
    margin-right: 4.2%;
`;

export const TextMenuCard = styled.Text`
    font-family: 'AzeretMono-Medium';
    font-size: 11px;
    margin: 7%;
    margin-top: 13%;
    color: #FFFFFF;
`;