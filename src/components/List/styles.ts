import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const ButtonArea = styled.View`
  flex-direction: row;
`;

export const Button = styled.TouchableOpacity`
  padding: 5px;
  border: 1px solid #666;
  border-radius: 8px;
  margin: 4px 4px;
`;

export const ButtonText = styled.Text``;

export const SectionHeader = styled.View`
  width: 100%;
  margin: 5px 10px;
  border: 1px solid #eee;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
`;

export const SectionText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #999;
`;

export const ItemContainer = styled.View`
  width: 100%;

  margin: 5px 15px;
  height: 40px;
`;

export const ItemText = styled.Text``;
