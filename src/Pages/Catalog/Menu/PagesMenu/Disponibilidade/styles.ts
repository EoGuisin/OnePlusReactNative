import styled from "styled-components/native";

import { ResponsiveHeight, ResponsiveWidth } from '../../../../../Functions';

export const Container = styled.View`
    width: 100%;
    height: ${ResponsiveHeight('100%')};
`;

export const TextHeader = styled.Text`
  color: #FFFFFF;
  font-family: 'AzeretMono-Regular';
  font-size: 20px;
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const DisponibilityContainer = styled.View`
    width: 100%;
    height: ${ResponsiveHeight('10%')};
    flex-direction: row;
`;

export const TextTitle = styled.Text`
    font-family: 'AzeretMono-SemiBold';
    font-size: 19px;
    color: #FFFFFF;
    margin-left: 7%;
    margin-top: 3%;
`;

export const TextDisponibility = styled.Text`
    font-size: 9px;
    align-self: center;
    margin-top: 7%;
    text-align: center;
    font-family: 'AzeretMono-SemiBold';
`;

export const CardContainer = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
`;

export const Card = styled.TouchableOpacity`
    width: ${ResponsiveWidth('22%')};
    border-radius: 10px;
    background-color: rgba(192, 227, 220, 0.3);
    margin-top: 3.5%;
`;

export const AllotmentsContainer = styled.View`
    height: ${ResponsiveHeight('50%')};
    margin-top: 3%;
`;

export const Allotments = styled.View`
    margin-top: 2%;
    background-color: rgba(192, 227, 220, 0.3);
    marginHorizontal: 3.5%;
    border-radius: 5px;
    border-width: 0.2px;
    border-color: #FFFFFF;
`;

export const TextUnity = styled.Text`
    font-size: 14px;
    font-family: 'AzeretMono-SemiBold';
    color: #FFFFFF;
    margin-left: 2%;
    margin-top: 1%;
    width: ${ResponsiveWidth('70%')};
    
`;

export const FilterContainer = styled.TouchableOpacity`
    width: ${ResponsiveWidth('94%')};
    align-self: center;
    height: ${ResponsiveHeight('7%')};
    border-radius: 22px;
    background-color: rgba(192, 227, 220, 0.3);
    margin-top: 3.5%;
    align-items: center;
    justify-content: center;
`;

export const TextFilter = styled.Text`
    font-family: 'AzeretMono-Light';
    font-size: 17px;
    color: #FFFFFF;
`;

export const EnterprisesFiltered = styled.TouchableOpacity`
    border-color: #FFFFFF;
    border-bottom-width: 2px;
    margin-top: 5%;
    margin-bottom: 5%;
    width: ${ResponsiveWidth('80%')};
    align-self: center;
`;

export const TextEnterprises = styled.Text`
    font-family: 'AzeretMono-Light';
    color: #FFFFFF;
    text-align: center;
    margin-bottom: 5%;
    font-size: 15px;
`;

export const Proposal = styled.TouchableOpacity`
    width: ${ResponsiveWidth('30%')};
    height: ${ResponsiveHeight('3.5%')};
    align-self: center;
    background-color: #3BB273;
    border-radius: 11px;
    justify-content: center;
`;

export const ReservationButton = styled.TouchableOpacity`
    width: ${ResponsiveWidth('30%')};
    height: ${ResponsiveHeight('3.5%')};
    background-color: #D46060;
    margin-right: 15%;
    border-radius: 11px;
    justify-content: center;
    align-items: center;
`;

export const Reservated = styled.TouchableOpacity`
    width: ${ResponsiveWidth('38%')};
    height: ${ResponsiveHeight('3.5%')};
    align-self: center;
    background-color: #105B74;
    margin-right: 15%;
    border-radius: 11px;
    justify-content: center;
`;

export const Sold = styled.View`
    width: ${ResponsiveWidth('30%')};
    height: ${ResponsiveHeight('3.5%')};
    align-self: center;
    background-color: #105B74;
    border-radius: 11px;
    justify-content: center;
    margin-top: 5%;
`;

export const TextTouchable = styled.Text`
    font-size: 12px;
    font-family: 'AzeretMono-SemiBold';
    text-align: center;
    color: #FFFFFF;
`;

export const ContainerReserva = styled.View`
    height: 82.4%;
    margin-top: 2%;
`;

export const RealtorReservation = styled.View`
    margin-top: 2%;
    background-color: rgba(192, 227, 220, 0.3);
    marginHorizontal: 3.5%;
    border-radius: 5px;
    border-width: 0.5px;
    border-color: #FFFFFF;
`;

export const Cancel = styled.TouchableOpacity`
    width: ${ResponsiveWidth('30%')};
    height: ${ResponsiveHeight('3.5%')};
    align-self: center;
    background-color: #105B74;
    border-radius: 11px;
    justify-content: center;
`;

export const ContainerButton = styled.View`
    flex-direction:row;
    padding-top: 4%;
    justify-content: space-between;
    marginHorizontal: 10%
`;

export const Sell = styled.TouchableOpacity`
    width: ${ResponsiveWidth('30%')};
    height: ${ResponsiveHeight('3.5%')};
    align-self: center;
    background-color: #3BB273;
    border-radius: 11px;
    justify-content: center;
`;

export const Input = styled.TextInput`
    align-self: center;
    margin-top: 3.5%;
    font-family: 'AzeretMono-SemiBold';
    font-size: 15px;
    color: #FFFFFF;
    width: ${ResponsiveWidth('94%')};
    height: ${ResponsiveHeight('7%')};
    border-radius: 22px;
    background-color: rgba(192, 227, 220, 0.3);
    flex-direction: row;
`;

export const Profile = styled.View`
    width: 14%;
    height: 35%;
    border-radius: 10;
    margin-left: 84%;
    margin-top: 2%;
    border-width: 1px;
    border-color: #FFFFFF;
    align-items: center;
`;

export const ProfileContainer = styled.View`
    margin-top: 1.5%;

`;

export const ContainerEstoque = styled.View`
    height: 79%;
`;

export const ContainerEspelhoDigital = styled.View`
    margin-bottom: 80
`;

export const LabelContainer = styled.View`
    width: ${ResponsiveWidth('95%')};
    align-self: center;
    height: ${ResponsiveHeight('7%')};
    border-radius: 22px;
    background-color: rgba(192, 227, 220, 0.3);
    margin-top: 3.5%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const TextLabel = styled.Text`
    font-family: 'AzeretMono-Semibold';
    font-size: 11px;
    color: #FFFFFF;
    text-align: center;
`;

export const Label = styled.View`
    height: ${ResponsiveWidth('3%')};
    width: ${ResponsiveWidth('3%')};
    background-color: red;
    border-radius: 100px;
    margin-top: 1%;
    margin-right: 3%;
`;

export const InputSquareContainer = styled.View`
    width: ${ResponsiveWidth('95%')};
    align-self: center;
    height: ${ResponsiveHeight('7%')};
    border-radius: 22px;
    background-color: rgba(192, 227, 220, 0.3);
    margin-top: 10%;
    align-items: center;
    flex-direction: row;
`;

export const InputSquare = styled.TextInput`
    width: 100%;
    font-family: 'AzeretMono-SemiBold';
    font-size: 18px;
    color: #FFFFFF;
    padding-left: 10%;
`;


export const Block = styled.View`
    margin-top: 5%;
    background-color: rgba(192, 227, 220, 0.3);
    marginHorizontal: 3%;
    border-radius: 5px;
    border-width: 0.5px;
    border-color: #FFFFFF;
`;

export const Square = styled.View`
    margin-top: 2%;
    paddingHorizontal: 1%;
    margin-right: 8.5%;
    border-radius: 10px;
    border-width: 2px;
    border-color: #FFFFFF;
    height: ${ResponsiveHeight('4.5%')};
    justify-content: center;
    align-items: center;
`;

export const TextSquare = styled.Text`
    justify-content: center;
    font-family: 'AzeretMono-SemiBold';
    color: #FFFFFF;
    font-size: 16px;
`;

export const TextSearch = styled.Text`
    justify-content: center;
    font-family: 'AzeretMono-SemiBold';
    color: #FFFFFF;
    font-size: 18px;
    margin-left: 10%;
`;

export const ContainerSquare = styled.View`
    width: ${ResponsiveHeight('40%')};
    margin-left: 5%;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 4%;
`;

export const ArrowDownDigitalMirror = styled.TouchableOpacity`
    margin-top: 5%;
    width: 10%;
    height: 100%;
    align-items: center;
`;

export const TextBlock = styled.Text`
    margin-left: 5%;
    margin-top: 2%;
    font-family: 'AzeretMono-SemiBold';
    color: #FFFFFF;
    font-size: 17px;
    margin-bottom: 3%;
`;

export const ContainerDisponibilidade = styled.View`
    height: 82.5%;
`;

export const WrapperButtons = styled.View`
    flex-direction: row;
    padding: 5%;
    justify-content: space-evenly;
`;

export const FilterEnterprise = styled.TouchableOpacity`
    width: 20%;
    height: 80%;
`;

export const FilterEstoque = styled.View`
    width: ${ResponsiveWidth('75%')};
    align-self: center;
    height: ${ResponsiveHeight('7%')};
    border-radius: 22px;
    background-color: rgba(192, 227, 220, 0.3);
    margin-top: 5%;
    margin-left: 3.5%;
    align-items: center;
    flex-direction: row;
`;

export const FilterAllotments = styled.TouchableOpacity`
    height: ${ResponsiveHeight('7%')};
    width: ${ResponsiveWidth('15%')};
    align-items: center;
    margin-top: 5.5%;
    margin-left: 3%;
`;

export const ContainerBlock = styled.View`
    margin-bottom: 80;
    margin-top: 1%;
`;

export const Loading = styled.View`
  width: 100%;
  height: 100%;
`;

export const SubContainerText = styled.Text`
  color: #FFFFFF;
  font-size: 13px;
  font-family: 'AzeretMono-SemiBold';
  margin-top: 2.5%;
`;