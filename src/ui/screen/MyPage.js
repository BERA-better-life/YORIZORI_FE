import React, { useCallback, useState } from 'react'
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import { styled } from 'styled-components'
import { colors } from '../styles/colors'
import { size } from '../styles/size'

import logo from '../../../assets/logo.png'
import MarginVertical from '../components/MarginVertical'
import Ionicons from '@expo/vector-icons/Ionicons';
import RecipeEl from '../components/RecipeEl'
import { useFocusEffect } from '@react-navigation/native'
import { useLike } from '../../hooks/useLike'
import { useUserInfoStore, useUserLoginStore } from '../../store/userStore'
import { useIngredients } from '../../hooks/useIngredients'
import { useBookMark } from '../../hooks/useBookmark'
import GoToLoginButton from '../components/GoToLoginButton'
import { useUser } from '../../hooks/useUser'


const MyPage = () => {
  const info = ["냉장고 재료","저장한 레시피","유통기한 임박 재료"]
  const recipes = new Array(5).fill(true)
  const {getLikeList} = useLike();
  const [likeList,setLikeList] = useState([])
  const {userInfo, setUserInfo} = useUserInfoStore();
  const {getUserIngredients} = useIngredients();
  const {getBookmarksList} = useBookMark();
  const {isLogin} = useUserLoginStore();
  const [ingredientsList, setIngredientsList] = useState([])
  const [expIngredientsList, setExpIngredientsList] = useState([])
  const [bookmarkList, setBookmarkList] = useState([]);
  const {handleLogout} = useUser();
  

  useFocusEffect(
    useCallback(() => {
    getLikeList(setLikeList)
    getUserIngredients(setIngredientsList, setExpIngredientsList, true)
    getBookmarksList(setBookmarkList)
    }, []),
  )
  

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
            {userInfo.username ?
            <>
            <Name style={{color:colors.pointRed}}>{userInfo.username.slice(0,Math.floor(userInfo.username.length/2))}</Name>
            <Name style={{color:colors.pointBlue}}>{userInfo.username.slice(Math.floor(userInfo.username.length/2))}</Name>
            <Name> 님</Name>
            </>
            :
            <Name>로그인이 필요해요</Name>
            }
          </View>
        </ProfileArea>
        <MarginVertical margin={20}/>
        {isLogin ?
        <InfoArea>
          {info.map((el,index) => {
            return(
              <InfoEl key={index}>
                <View style={{padding:5, backgroundColor:'#fff', borderRadius:10, width:'100%'}}>
                  <Text style={{color:colors.pointRed, textAlign:'center', fontSize:index !== 2 ? 16 : 14}}>{el}</Text>
                </View>
                <MarginVertical margin={27}/>
                <Name style={{color:"#fff"}}>{index === 0 ? ingredientsList?.length : index === 1 ? bookmarkList?.length : expIngredientsList?.length}개</Name>
              </InfoEl>
            )
          })}
        </InfoArea>
        :
        <InfoArea>
          <Text style={{fontSize:20, color:"#fff", fontWeight:600}}>로그인이 필요해요!</Text>
        </InfoArea>
        }
        <MarginVertical margin={30}/>
        <LikeRecipeArea>
          <View style={{flexDirection:'row'}}>
          <Ionicons name="heart-sharp" size={24} color={colors.pointRed} />
          <LikeRecipeTitle>{userInfo.username ? `${userInfo.username} 님이 좋아한 레시피` : "로그인이 필요해요"}</LikeRecipeTitle>
          
          </View>
          <MarginVertical margin={13}/>
          {!isLogin ? <View style={{width:"100%", display:'flex', justifyContent:'center',alignItems:'center'}}><GoToLoginButton/></View>
          :
          <LikeRecipes>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {likeList.map((el,index) => {
              return(
                <RecipeEl key={index} title={el.recipe_title} url={el.recipe_image}>
                  
                </RecipeEl>
              )
            })}
            </ScrollView>
          </LikeRecipes>
            }
        </LikeRecipeArea>
        {isLogin ?
        <TouchableOpacity style={{position:'absolute',bottom:180, left:30}} onPress={() => handleLogout()}>
          <Text style={{color:colors.fontMain}}>로그아웃</Text>
        </TouchableOpacity>
        :<></>}
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
