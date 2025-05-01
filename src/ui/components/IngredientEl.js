import { styled } from "styled-components"
import { colors } from "../styles/colors"


const IngredientEl = ({text}) => {
  return (
    <Body>
      <ElTitle>{text}</ElTitle>
    </Body>
  )
}

export default IngredientEl

const Body = styled.TouchableOpacity`
  background-color:${colors.pointOrange};
  height:35px;
  padding:10px;
  border-radius:20px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const ElTitle = styled.Text`
  color:#fff;
  font-size:16px;
  font-weight:600;
`