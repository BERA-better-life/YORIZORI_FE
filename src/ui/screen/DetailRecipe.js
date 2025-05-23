import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native"
import { styled } from "styled-components"
import { colors } from "../styles/colors"
import { size } from "../styles/size"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MarginVertical from "../components/MarginVertical";
import IngredientEl from "../components/IngredientEl";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { useRecipe } from "../../hooks/useRecipe";
import { useBookMark } from "../../hooks/useBookmark";
import { useLike } from "../../hooks/useLike";
import { useUserLoginStore } from "../../store/userStore";
import GoToLoginButton from "../components/GoToLoginButton";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const DetailRecipe = ({route}) => {
  const navigation = useNavigation();
  const ingredientsArray = new Array(8).fill("토마토")
  const stepArray = ["토마토를 10분간 세척한다.","세척한 토마토를 8등분한다","썰어둔 토마토를 냄비에 넣고 15분간 끓인다", "쌀국수용 면을 10분간 끓는물에 삶는다", "조리된 토마토에 쌀국수용 육수를 섞는다", "만들어진 육수에 쌀국수면과 토핑을 넣어 완성한다"]
  const {recipeId} = route.params;
  const {getDetailRecipe} = useRecipe();
  const [recipeInfo, setRecipeInfo] = useState([])
  const withoutLabels =/\[[^\]]+\]/g
  const {handleBookmarksList, getBookmarksList} = useBookMark();
  const {handleLikeList, getLikeList} = useLike();
  const {isLogin, setIsLogin} = useUserLoginStore();
  const [likeList, setLikeList] = useState([])
  const [isLike, setIsLike] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkList, setBookmarkList] = useState([]);

  useEffect(() => {
    getDetailRecipe(recipeId, setRecipeInfo);
    getLikeList(setLikeList);
    getBookmarksList(setBookmarkList);
  }, []);

  // 2) likeList or recipeInfo 바뀔 때만 isLike 재계산
  useEffect(() => {
    const id = recipeInfo[0]?.rcp_number;
    setIsLike(likeList.some(el => el.recipe_id === id));
  }, [likeList, recipeInfo]);

  useEffect(() => {
    const id = recipeInfo[0]?.rcp_number;
    setIsBookmarked(bookmarkList.some(el => el.recipe_id === id));
  }, [bookmarkList, recipeInfo]);

  
  

  

  

  
  

  return (
    <SafeAreaView style={{backgroundColor:colors.bgColor}}>
      <Body>
        <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <TouchableOpacity style={{position:'absolute', left:0}} onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" size={24} color={colors.fontMain} />
          </TouchableOpacity>
          <HeaderText>
            레시피 상세
          </HeaderText>
        </Header>
        <MarginVertical margin={30}/>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <RecipeTitle>{recipeInfo[0]?.rcp_name}</RecipeTitle>
          <ButtonArea>
            {isLogin ?
            <>
            <ButtonEl onPress={() => {handleLikeList(recipeInfo[0].rcp_number);setIsLike(prev => !prev)}}>
              <Ionicons name={!isLike?"heart-outline":"heart-sharp"} size={24} color={colors.pointRed} />
            </ButtonEl>
            <ButtonEl onPress={() => {handleBookmarksList(recipeInfo[0].rcp_number);setIsBookmarked(prev => !prev)}}>
              <MaterialCommunityIcons name={isBookmarked ? "plus-circle" : 'plus-circle-outline'} size={24} color={colors.fontMain} />
            </ButtonEl>
            </>
            :<CateogryText style={{textAlign:'right'}}>{"레시피를 저장하려면\n로그인이 필요해요"}</CateogryText>}
          </ButtonArea>
        </View>
        <MarginVertical margin={30}/>
        <ContentsEl>
          <CateogryText>재료</CateogryText>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{flexDirection:'row', flexWrap:'wrap', gap:7}}>
            {recipeInfo[0]?.rcp_ingredient.replace(withoutLabels,'').split('|').map(item => item.trim()).filter(item => item.length > 0).map((el,index) => {
              return(
                <IngredientEl text={el} key={index}/>
              )
            })}
          </View>
          </ScrollView>
        </ContentsEl>
        <MarginVertical margin={20}/>
        <ContentsEl style={{alignItems:'center'}}>
          <CateogryText>소요시간</CateogryText>
          <View style={{backgroundColor:colors.pointOrange, padding:10, borderRadius:20}}>
            <CateogryText style={{color:"#fff"}}>{recipeInfo[0]?.rcp_cooktime}분</CateogryText>
          </View>
        </ContentsEl>
        <MarginVertical margin={20}/>
        <ContentsEl style={{alignItems:'center'}}>
          <CateogryText>키워드</CateogryText>
          <View style={{backgroundColor:colors.pointOrange, padding:10, borderRadius:20}}>
            <CateogryText style={{color:"#fff"}}>{recipeInfo[0]?.rcp_keyword}</CateogryText>
          </View>
        </ContentsEl>
        <MarginVertical margin={20}/>
        <ContentsEl style={{alignItems:'center'}}>
          <CateogryText>레시피 타입</CateogryText>
          <View style={{backgroundColor:colors.pointOrange, padding:10, borderRadius:20}}>
            <CateogryText style={{color:"#fff"}}>{recipeInfo[0]?.rcp_type}</CateogryText>
          </View>
        </ContentsEl>
        <MarginVertical margin={30}/>
        <CateogryText style={{textAlign:'center', fontSize:20}}>조리과정</CateogryText>
        <MarginVertical margin={20}/>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {recipeInfo[0]?.steps.map((el,index) => {
            return(
              <RecipeStepArea key={index}>
                <RecipeStepNum>
                  <RecipeStepText>{index+1}</RecipeStepText>
                </RecipeStepNum>
                <RecipeStepEl>
                  <RecipeStepImg>
                    <Image source={{uri:el?.image_url}} style={{width:'100%', height:"100%", borderRadius:10}}/>
                  </RecipeStepImg>
                  <MarginVertical margin={5}/>
                  <RecipeContentsText>
                    {el?.instruction}
                  </RecipeContentsText>
                </RecipeStepEl>
              </RecipeStepArea>
            )
          })}
        </ScrollView>
        <MarginVertical margin={20}/>
        <View style={{width:'100%', alignItems:'center'}}>
          <Button text={"다른 레시피 보러가기"} handleButton={() => navigation.goBack()} isValid={true}/>
        </View>
        </ScrollView>
        <MarginVertical margin={100}/>
      </Body>
    </SafeAreaView>
  )
}

export default DetailRecipe


const Body = styled.View`
  width:${size.width}px;
  height:${size.height}px;
  background-color:${colors.bgColor};
  padding:0 40px;
`

const Header = styled.View`
  width:100%;
  height:50px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const HeaderText = styled.Text`
  color:${colors.lightGray};
  font-size:16px;
  font-weight:600;  
`

const RecipeTitle = styled.Text`
  font-size:24px;
  font-weight:700;
  color:${colors.fontMain};
`

const ButtonArea = styled.View`
  display:flex;
  flex-direction:row;
  align-items:center;
  gap:5px;
`

const ContentsEl = styled.View`
  display:flex;
  flex-direction:row;
  align-items:flex-start;
  gap:15px;
  
`

const ButtonEl = styled.TouchableOpacity`

`

const CateogryText = styled.Text`
  font-size:16px;
  font-weight:600;
  color:${colors.fontMain};
`

const RecipeStepArea = styled.View`
  display:flex;
  align-items:center;
  gap: 10px;
`

const RecipeStepNum = styled.TouchableOpacity`
  width:35px;
  height:35px;
  background-color:${colors.pointRed};
  border-radius:50%;
  display:flex;
  justify-content:center;
  align-items:center;
`

const RecipeStepText = styled.Text`
  color:#fff;
  font-weight:600;
  font-size:16px;
`

const RecipeStepEl = styled.View`
  width:150px;
  background-color:#fff;
  border-radius:10px;
  padding: 20px;
  margin-left:15px;
`

const RecipeStepImg = styled.View`
  width:100%;
  height:140px;

`

const RecipeContentsText = styled.Text`
  color:${colors.fontMain};
  font-size:16px;
  font-weight:500;
`



