import React, { useCallback, useEffect, useState } from 'react'
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import { styled } from 'styled-components'
import { size } from '../styles/size'
import { colors } from '../styles/colors'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import cartImg from '../../../assets/cartImg.png';
import IngredientEl from '../components/IngredientEl'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import RecipeEl from '../components/RecipeEl'
import MarginVertical from '../components/MarginVertical'
import { useIngredients } from '../../hooks/useIngredients'
import { useRecipe } from '../../hooks/useRecipe'


const MarketRecommand = () => {
  const navigation = useNavigation();
  const recipeArray = new Array(5).fill(false);
  const {getCartRecommend} = useIngredients();
  const [ingredients, setIngredients] = useState([]);
  const {handleSearchRecipeForNonUser} = useRecipe();
  const [recipeList, setRecipeList] = useState([]);

  useFocusEffect(
    useCallback(() => {
    getCartRecommend(setIngredients)
    }, []),
  )

  useEffect(() => {
    handleSearchRecipeForNonUser(ingredients.join(", "),"",setRecipeList,"cart")
  }, [ingredients])
  
  

  return (
    <SafeAreaView style={{backgroundColor:colors.bgColor}}>
      <Body>
        <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
        <TouchableOpacity style={{position:'absolute',left:0}} onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" size={24} color={colors.fontMain} />
          </TouchableOpacity>
        <Text style={{color:colors.lightGray}}>장보기 추천</Text>
        </Header>
        <MarginVertical margin={10}/>
        <Title>{"요리조리 님의 냉장고를 기반으로\n장 볼 재료들을 추천해드릴게요!"}</Title>
        <MarketArea>
          <Image source={cartImg} style={{width:380,height:380, position:'absolute', top:0}}/>
          <View style={{flexDirection:'row', flexWrap:'wrap', width:300, height:300, justifyContent:'center',alignItems:'center', gap:10, marginTop:170}}>
          {ingredients.map((el,index) => {
            return(
              <IngredientEl text={el} key={index} isTouchable={false}/>
            )
          })}
          </View>
        </MarketArea>
        <Text style={{color:colors.fontMain, marginTop:-70}}>{"추천 재료들을 구입하면\n이런 요리들을 해볼 수 있어요!"}</Text>
        <MarginVertical margin={20}/>
        <RecipeArea>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {recipeList.map((el,index) => {
              return(
                <RecipeEl key={index} title={el.rcp_name} url={el.rcp_picture} id={el.rcp_number}/>
              )
            })}
          </ScrollView>
        </RecipeArea>
        <MarginVertical margin={150}/>
        </ScrollView>
      </Body>
    </SafeAreaView>
  )
}

export default MarketRecommand

const Body = styled.View`
  width:${size.width}px;
  height:${size.height}px;
  padding:0 30px;
  background-color:${colors.bgColor};
`

const Header = styled.View`
  width:100%;
  height:50px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const Title = styled.Text`
font-size:20px;
  font-weight:700;
  color:${colors.fontMain};
`

const Text = styled.Text`
  font-size:16px;
  font-weight:700;
`

const MarketArea = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
`

const RecipeArea = styled.View`
  
`

