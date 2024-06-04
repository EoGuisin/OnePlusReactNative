import styled from 'styled-components/native';

export const Container = styled.View`
  width: 95%;
  align-self: center;
  border-color: #ffffff;
  border-width: 2;
  border-radius: 16px;
  marginVertical: 5%;
  padding: 3%;
  padding-bottom: 5%;
`;

export const Title = styled.Text`
  font-family: 'AzeretMono-Medium';
  font-size: 11px;
  color: #ffffff;
  margin-left: 15%;
  text-align: center;
`;

export const Wrapper = styled.View`
  padding-top: 5%;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const WrapperLeft = styled.View`
  flex-direction: column;
`;

export const WrapperTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ViewPDF = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  border-color: #FFFFFF;
  border-width: 1px;
`;
export const ViewImage = styled.TouchableOpacity`
  height: 110%;
  width: 50%;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  border-color: #FFFFFF;
  border-width: 1px;
`;

export const TextPDF = styled.Text`
  font-family: 'AzeretMono-Medium';
  font-size: 13px;
  color: #ffffff;
`;

export const ImageTouch = styled.TouchableOpacity`
  height: 90%;
  flex: 1;
  top: -15;
  marginHorizontal: 20;
`;