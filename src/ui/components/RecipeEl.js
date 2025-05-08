import React from 'react'
import { styled } from 'styled-components'

const RecipeEl = () => {
  return (
    <RecipeElBody></RecipeElBody>
  )
}

export default RecipeEl

const RecipeElBody = styled.TouchableOpacity`
  width:140px;
  height:180px;
  background-color:#fff;
  border-radius:10px;
  margin-right:10px;
`