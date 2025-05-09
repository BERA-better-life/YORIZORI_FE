import { TouchableOpacity } from "react-native"
import { styled } from "styled-components"
import { colors } from "../styles/colors"


const Button = ({text, handleButton, width, isValid}) => {
  return (
    <ButtonBody onPress={() => isValid ? handleButton() : ""} style={{width:width? width : 230, backgroundColor:isValid ? "#FF7667" : "rgba(255,118,103,.5)"}}>
      <ButtonText>{text}</ButtonText>
    </ButtonBody>
  )
}

export default Button


const ButtonBody = styled.TouchableOpacity`
  background-color:${colors.pointRed};
  width:230px;
  height:65px;
  border-radius:20px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const ButtonText = styled.Text`
  color:#fff;
  font-size:20px;
  font-weight:700;
`