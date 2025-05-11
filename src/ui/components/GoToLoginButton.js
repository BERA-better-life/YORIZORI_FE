import React from 'react'
import { styled } from 'styled-components'
import { colors } from '../styles/colors'
import { useNavigation } from '@react-navigation/native'
import { size } from '../styles/size'
import MarginVertical from './MarginVertical'

const GoToLoginButton = () => {
  const navigation = useNavigation();
  return (
    <Body>
      <Title>로그인시 사용 가능한 기능이에요!</Title>
      <MarginVertical margin={20}/>
    <ButtonBody onPress={() => navigation.reset({
      routes:[{
        name:'Login'
      }]
    })}>
      <ButtonText>로그인하기</ButtonText>
    </ButtonBody>
    </Body>
  )
}

export default GoToLoginButton

const Body = styled.View`
  width:${size.width-60}px;
  height:200px;
  padding:30px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const Title = styled.Text`
  font-size:20px;
  color:${colors.fontMain};
  font-weight:500;
`

const ButtonBody = styled.TouchableOpacity`
  background-color:#fff;
  border-radius:10px;
  width:70%;
  height:40px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const ButtonText = styled.Text`
  font-size:16px;
  font-weight:600;
  color:${colors.pointRed};
`