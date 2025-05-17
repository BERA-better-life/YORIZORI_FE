import { styled } from "styled-components"
import { colors } from "../styles/colors"


const IngredientEl = ({text, id, selectedIngredientsList, setSelectedIngredientsList, isTouchable, version, excludedIngredientsList, setExcludedIngredientsList}) => {
  return (
    <>
    {isTouchable ?
    <Body 
      onPress={() => 
      {if(version === "freezer"){
        selectedIngredientsList.filter((el) => el.ingredient_id === id)?.length === 1 ? setSelectedIngredientsList(prev => prev.filter((el) => el.ingredient_id !== id)) 
        : setSelectedIngredientsList(prev => [...prev, {ingredient_id:id, ingredient_name:text}])
      }else if(version === "select"){
        selectedIngredientsList.includes(text) ? setSelectedIngredientsList(prev => prev.filter((el) => el !== text)) : setSelectedIngredientsList(prev => [...prev, text])
      }else if(version === "exclude"){
        excludedIngredientsList.includes(text) ? setExcludedIngredientsList(prev => prev.filter((el) => el !== text)) : setExcludedIngredientsList(prev => [...prev, text])
      }
      }}
      
      isSelected={version === "exclude" ? excludedIngredientsList.filter((el) => el === text)?.length === 1 : version === "select" ? selectedIngredientsList.filter((el) => el === text)?.length === 1 : selectedIngredientsList.filter((el) => el.ingredient_id === id)?.length === 1}
      >
      <ElTitle isSelected={version === "exclude" ? excludedIngredientsList.filter((el) => el === text)?.length === 1 : version === "select" ? selectedIngredientsList.filter((el) => el === text)?.length === 1 : selectedIngredientsList.filter((el) => el.ingredient_id === id)?.length === 1}>{text}</ElTitle>
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