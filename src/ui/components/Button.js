import { TouchableOpacity } from "react-native"
import { styled } from "styled-components"
import { colors } from "../styles/colors"


const Button = ({text, handleButton, width}) => {
  return (
    <ButtonBody onPress={handleButton} style={{width:width? width : 230}}>
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