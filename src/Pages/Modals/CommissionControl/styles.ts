import styled from 'styled-components/native';

import {ResponsiveHeight, ResponsiveWidth} from '../../../Functions';

export const Container = styled.View`
  height: ${ResponsiveHeight('100%')};
`;

export const Commissioned = styled.View`
  width: 95%;
  background-color: rgba(192, 227, 220, 0.3);
  align-self: center;
  border-radius: 20;
  padding-bottom: 8%;
  margin-top: 5%;
`;

export const TextHeader = styled.Text`
  color: #ffffff;
  font-family: 'AzeretMono-Regular';
  font-size: 20px;
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  marginHorizontal: 3%;
`;

export const Number = styled.TouchableOpacity`
  border-radius: 100px;
  width: 35px;
  height: 35px;
  justify-content: center;
  align-items: center;
  border-color: white;
  border-width: 1px;
  /* background-color: #105b74; */
`;

export const TextNumber = styled.Text`
  font-family: 'AzeretMono-Medium';
  font-size: 20px;
  color: #ffffff;
`;

export const SubContainer = styled.View`
  width: 95%;
  background-color: rgba(192, 227, 220, 0.3);
  align-self: center;
  border-radius: 20;
  padding-bottom: 8%;
  margin-top: 5%;
`;

export const InputContainer = styled.View`
  width: ${ResponsiveWidth('80%')};
  height: ${ResponsiveHeight('4%')};
  border-bottom-width: 2px;
  align-self: center;
  border-color: #ffffff;
  margin-top: 3%;
`;

export const TextInput = styled.Text`
  font-family: 'AzeretMono-Medium';
  font-size: 12px;
  color: #ffffff;
  margin-top: 3%;
`;

export const Input = styled.TextInput`
  margin-top: 3%;
  color: #ffffff;
  font-family: 'AzeretMono-Medium';
  font-size: 14px;
  margin-left: 2%;
`;

export const TouchableContainer = styled.TouchableOpacity`
  width: ${ResponsiveWidth('80%')};
  height: ${ResponsiveHeight('4%')};
  border-bottom-width: 2px;
  align-self: center;
  border-color: #ffffff;
  margin-top: 3%;
`;

export const ViewContainer = styled.View`
  width: ${ResponsiveWidth('80%')};
  height: ${ResponsiveHeight('4%')};
  border-bottom-width: 2px;
  align-self: center;
  border-color: #ffffff;
  margin-top: 3%;
`;

export const Item = styled.View`
  margin-bottom: 2%;
`;

export const ItemContainer = styled.TouchableOpacity`
  border-bottom-width: 2px;
  border-color: #ffffff;
  margin-top: 5.5%;
  width: 70%;
  align-items: center;
  align-self: center;
  justify-content: center;
  margin-bottom: 5%;
`;

export const TextItem = styled.Text`
  font-size: 15px;
  color: #ffffff;
  text-align: center;
  font-family: 'AzeretMono-Regular';
  margin-bottom: 2%;
`;

export const Place = styled.Text`
  font-size: 16px;
  color: #ffffff;
  font-family: 'AzeretMono-Medium';
  margin-left: 5%;
  margin-top: 5%;
`;

export const Loading = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  border-radius: 20px;
  margin-top: 30%;
`;

export const ContainerNoStructure = styled.View`
  border-width: 1;
  border-radius: 10px;
  align-self: center;
  border-color: #ffffff;
  padding: 3%;
  margin-top: 15%;
  width: 90%;
`;
export const TextNoStructure = styled.Text`
  color: #ffffff;
  top: 40;
  font-size: 10px;
  font-family: 'AzeretMono-Regular';
  text-align: center;
  font-style: italic;
`;

export const ContainerSubmit = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const Submit = styled.TouchableOpacity`
  border-color: #ffffff;
  border-width: 1;
  width: ${ResponsiveWidth('39%')};
  height: ${ResponsiveHeight('4.5%')};
  border-radius: 20px;
  background-color: #3bb273;
  align-self: center;
  justify-content: center;
  margin-bottom: 10%;
`;

export const Search = styled.TouchableOpacity`
  border-color: #ffffff;
  border-width: 1;
  width: ${ResponsiveWidth('30%')};
  height: ${ResponsiveHeight('4.5%')};
  border-radius: 20px;
  background-color: #3bb273;
  align-self: center;
  justify-content: center;
  margin: 5px;
`;

export const TextSubmit = styled.Text`
  text-align: center;
  color: #ffffff;
`;
