import { styled } from "styled-components"
import { colors } from "../styles/colors"
import MarginVertical from "./MarginVertical"
import { Image } from "react-native"
import Feather from '@expo/vector-icons/Feather';
import IngredientEl from "./IngredientEl";

const SearchIngredients = ({text}) => {
  const ingredientsList = ["미역","오트밀","참치액","간장","참기름","참치캔","깨"]

  return (
    <SearchBody>
      <Title>{`${text} 재료를\n선택해볼까요?`}</Title>
      <MarginVertical margin={15}/>
      <SearchBarArea>
        <SearchBar/>
        <SearchIcon>
          <Feather name="search" size={24} color={colors.pointRed} />
        </SearchIcon>
      </SearchBarArea>
      <MarginVertical margin={30}/>
      <IngredientsArea>
        {ingredientsList.map((el,index) => {
          return(
            <IngredientEl text={el} key={index}/>
          )
        })}
      </IngredientsArea>
    </SearchBody>
  )
}

export default SearchIngredients


const SearchBody = styled.View`
  width:90%;
  
`

const Title = styled.Text`
  font-size:20px;
  color:${colors.fontMain};
  font-weight:700;
  line-height:26px;
`

const SearchBarArea = styled.View`
  display:flex;
  flex-direction:row;
  align-items:center;
`

const SearchBar = styled.TextInput`
  background-color:#fff;
  width:100%;
  height:50px;
  border-radius:10px;
  padding:10px 20px;
`

const SearchIcon = styled.TouchableOpacity`
  position:absolute;
  right:20px;
`

const IngredientsArea = styled.View`
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  gap:10px;
`


