import React from 'react'
import { styled } from 'styled-components'
import { colors } from '../styles/colors'
import MarginVertical from './MarginVertical'
import { useNavigation } from '@react-navigation/native'

const RecipeEl = ({title, url, id}) => {
  const navigation = useNavigation();
  return (
    <RecipeElBody onPress={() => navigation.navigate("DetailRecipe", {recipeId:id})}>
      {/* source={require(url)} */}
      <RecipeImg source={{ uri: url}}/>
      <MarginVertical margin={10}/>
      <RecipeTitle>{title}</RecipeTitle>
    </RecipeElBody>
  )
}

export default RecipeEl

const RecipeElBody = styled.TouchableOpacity`
  width:140px;
  height:180px;
  background-color:#fff;
  border-radius:10px;
  margin-right:10px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const RecipeImg = styled.Image`
  width:90%;
  height:70%;
  border-radius:10px;
  resize-mode:contain;
`

const RecipeTitle = styled.Text`
  font-size:15px;
  color:${colors.fontMain};
  text-align:center;
  font-weight:500;
`