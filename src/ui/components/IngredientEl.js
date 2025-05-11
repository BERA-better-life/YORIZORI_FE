import { styled } from "styled-components"
import { colors } from "../styles/colors"


const IngredientEl = ({text, id, selectedIngredientsList, setSelectedIngredientsList, isTouchable}) => {
  return (
    <>
    {isTouchable ?
    <Body 
      onPress={() => selectedIngredientsList.includes(id) ? setSelectedIngredientsList(prev => prev.filter((el) => el !== id)) : setSelectedIngredientsList(prev => [...prev, id])}
      isSelected={selectedIngredientsList.includes(id)}
      >
      <ElTitle isSelected={selectedIngredientsList.includes(id)}>{text}</ElTitle>
    </Body>
    :
    <NotTouchableBody>
      <ElTitle style={{color:"#fff"}}>{text}</ElTitle>
    </NotTouchableBody>
    }
    </>
  )
}

export default IngredientEl

const Body = styled.TouchableOpacity`
  background-color:${(props) => props.isSelected ? colors.pointOrange : ""};
  height:35px;
  padding:8px;
  border-radius:20px;
  display:flex;
  justify-content:center;
  align-items:center;
  border: ${(props) => props.isSelected ? "none" : "1.5px solid #FFAC4A"}
`

const NotTouchableBody = styled.View`
  background-color:${colors.pointOrange};
  height:35px;
  padding:8px;
  border-radius:20px;
  display:flex;
  justify-content:center;
  align-items:center;
 
`

const ElTitle = styled.Text`
  color:${(props) => props.isSelected ? "#fff" : colors.pointOrange};
  font-size:16px;
  font-weight:600;
`