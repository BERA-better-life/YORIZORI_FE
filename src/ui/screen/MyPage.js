import React from 'react'
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import { styled } from 'styled-components'
import { colors } from '../styles/colors'
import { size } from '../styles/size'

import logo from '../../../assets/logo.png'
import MarginVertical from '../components/MarginVertical'
import Ionicons from '@expo/vector-icons/Ionicons';
import RecipeEl from '../components/RecipeEl'


const MyPage = () => {
  const info = [["냉장고 재료","10개"],["저장한 레시피","3개"],["유통기한 임박 재료", "2개"]]
  const recipes = new Array(5).fill(true)

  return (
    <SafeAreaView style={{backgroundColor:colors.bgColor}}>
      <Body>
        <Header>
          <Text style={{color:colors.lightGray}}>마이페이지</Text>
        </Header>
        <Image source={logo} style={{width:80,height:40, resizeMode:'contain'}}/>
        <ProfileArea>
          <Text style={{color:colors.fontMain}}>안녕하세요!</Text>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Name style={{color:colors.pointRed}}>요리</Name>
            <Name style={{color:colors.pointBlue}}>조리</Name>
            <Name> 님</Name>
          </View>
        </ProfileArea>
        <MarginVertical margin={20}/>
        <InfoArea>
          {info.map((el,index) => {
            return(
              <InfoEl key={index}>
                <View style={{padding:5, backgroundColor:'#fff', borderRadius:10, width:'100%'}}>
                  <Text style={{color:colors.pointRed, textAlign:'center', fontSize:16}}>{el[0]}</Text>
                </View>
                <MarginVertical margin={27}/>
                <Name style={{color:"#fff"}}>{el[1]}</Name>
              </InfoEl>
            )
          })}
        </InfoArea>
        <MarginVertical margin={30}/>
        <LikeRecipeArea>
          <View style={{flexDirection:'row'}}>
          <Ionicons name="heart-sharp" size={24} color={colors.pointRed} />
          <LikeRecipeTitle>요리조리 님이 좋아한 레시피</LikeRecipeTitle>
          
          </View>
          <MarginVertical margin={13}/>
          <LikeRecipes>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {recipes.map((el,index) => {
              return(
                <RecipeEl key={index}>
                  
                </RecipeEl>
              )
            })}
            </ScrollView>
          </LikeRecipes>
        </LikeRecipeArea>
        <TouchableOpacity style={{position:'absolute',bottom:180, left:30}}>
          <Text style={{color:colors.fontMain}}>로그아웃</Text>
        </TouchableOpacity>
      </Body>
    </SafeAreaView>
  )
}

export default MyPage

const Body = styled.View`
  background-color:${colors.bgColor};
  width:${size.width}px;
  height:${size.height}px;
  padding:0 30px;
`

const Header = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
  height:50px;
`

const ProfileArea = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
`

const Name = styled.Text`
  font-size:20px;
  font-weight:700;
  color:${colors.fontMain};
`

const Text = styled.Text`
  font-size:16px;
  font-weight:700;
`

const InfoArea = styled.View`
  width:100%;
  background-color:${colors.pointRed};
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:flex-start;
  border-radius:10px;
  padding: 30px 20px;
  gap:10px;
`

const InfoEl = styled.View`
  width:33%;
  display:flex;
  justify-content:center;
  align-items:center;
  
`

const LikeRecipeArea = styled.View`
  width:100%;
`

const LikeRecipeTitle = styled.Text`
  font-size:20px;
  color:${colors.fontMain};
  font-weight:700;
`

const LikeRecipes = styled.View`
  width:100%;
  display:flex;

`
