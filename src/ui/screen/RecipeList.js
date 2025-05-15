import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native"
import { styled } from "styled-components"
import { colors } from "../styles/colors"
import { size } from "../styles/size"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MarginVertical from "../components/MarginVertical";
import { useCallback, useEffect, useState } from "react";
import { useUserLoginStore } from "../../store/userStore";
import GoToLoginButton from "../components/GoToLoginButton";
import { useRecipe } from "../../hooks/useRecipe";
import { useIngredients } from "../../hooks/useIngredients";
import { useLike } from "../../hooks/useLike";
import { useBookMark } from "../../hooks/useBookmark";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';



const RecipeList = ({route}) => {
  const navigation = useNavigation();
  const [showDropDown, setShowDropDown] = useState(false);
  const recipeArray = ["버섯수프", "토마토 스파게티", "닭볶음탕", "토마토달걀덮밥", "오이무침", "잔치국수"]
  const categoryArray = ["인기순", "시간순", "재료순"]
  const [selectedSort, setSelectedSort] = useState("");
  const {isLogin, setIsLogin} = useUserLoginStore();
  const [recipeList, setRecipeList] = useState(isLogin ? [] : route.params.recipeList)
  const {handleSearchRecipeForNonUser, handleSearchRecipeForUser} = useRecipe()
  const {getUserIngredients} = useIngredients();
  const [userIngredientsList, setUserIngredientsList] = useState([])
  const {getLikeList, handleLikeList} = useLike();
  const {getBookmarksList, handleBookmarksList} = useBookMark();
  const [likeList, setLikeList] = useState([])
  const [bookmarkList, setBookmarkList] = useState([])
  

  
  useEffect(() => {
    console.log(recipeList)
    console.log(isLogin)
    if(isLogin){
      getUserIngredients(setUserIngredientsList,"",false)
      
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
    getLikeList(setLikeList)
    getBookmarksList(setBookmarkList)
    }, []),
  )

  useEffect(() => {
    if(isLogin){handleSearchRecipeForUser(userIngredientsList.map((el) => el.ingredient_name).join(", "),setRecipeList)}
  },[userIngredientsList])

  useEffect(() => {
    console.log(selectedSort)
  },[selectedSort])

  useEffect(() => {
    if(!isLogin){
    if(selectedSort === "시간순"){
      handleSearchRecipeForNonUser(route.params.ingredientsText, route.params.excludedIngredientsText, setRecipeList,"", "rcp_cooktime_desc")
    }else if(selectedSort === "인기순"){
      setRecipeList(prev => prev.sort((a,b) => b.rcp_cooktime - a.rcp_cooktime))
    }else if(selectedSort === ""){
      setRecipeList(route.params.recipeList);
    }
    }
  },[selectedSort])

  

  return (
    <SafeAreaView style={{backgroundColor:colors.bgColor}}>
      <Body>
        <Header>
          <TouchableOpacity style={{position:'absolute', left:0}} onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" size={24} color={colors.fontMain} />
          </TouchableOpacity>
          <HeaderText>레시피 검색</HeaderText>
        </Header>
        <MarginVertical margin={30}/>
        <View style={{width:"100%", flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Title>검색된 레시피</Title>
          <TouchableOpacity onPress={() => setShowDropDown(prev => !prev)}>
            <FontAwesome5 name="filter" size={24} color={selectedSort === "" ? colors.fontMain : colors.pointRed} />
          </TouchableOpacity>
          {showDropDown ?
          <DropDownBody>
            {categoryArray.map((el,index) => {
              return(
                <DropDownEl key={index} onPress={() => {setSelectedSort(prev => prev.length === 0 ? el : "");setShowDropDown(false)}}>
                  <DropDownText style={{color:selectedSort === el ? colors.pointRed : colors.fontMain}}>{el}</DropDownText>
                </DropDownEl>
              )
            })}
            
          </DropDownBody>
          :<></>}
        </View>
        <MarginVertical margin={20}/>
          <ScrollView showsVerticalScrollIndicator={false}>
          <RecipeArea>
            {recipeList.map((el,index) => {
              return(
                <RecipeEl key={index} onPress={() => navigation.navigate("DetailRecipe", {recipeId:el.rcp_number})}>
                  <RecipeImg>
                    {el.rcp_picture ?
                    <Image source={{ uri: el.rcp_picture}} style={{width:"90%", height:"70%", borderRadius:10}}/>:
                    <MaterialIcons name="image-not-supported" size={40} color="black" />
                    }
                  </RecipeImg>
                  <RecipeTitle>{el.rcp_name}</RecipeTitle>
                  <MarginVertical margin={10}/>
                  <ButtonArea>
                    {isLogin ? 
                    <>
                    <ButtonEl >
                      <Ionicons name={likeList.some((item) => item.recipe_id === el.rcp_number) ? "heart-sharp":"heart-outline"} size={24} color={colors.pointRed} />
                    </ButtonEl>
                    <ButtonEl >
                    <MaterialCommunityIcons name={bookmarkList.some((item) => item.recipe_id === el.rcp_number) ? "plus-circle" : 'plus-circle-outline'} size={24} color={colors.fontMain} />
                    </ButtonEl>
                    </>
                    :<></>}
                  </ButtonArea>
                </RecipeEl>
              )
            })}
            </RecipeArea>
          </ScrollView>
        <MarginVertical margin={100}/>
      </Body>
    </SafeAreaView>
  )
}

export default RecipeList

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

const Title = styled.Text`
  color:${colors.fontMain};
  font-size:20px;
  font-weight:700;
`

const RecipeArea = styled.View`
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  gap:20px;
  justify-content:center;
`

const RecipeEl = styled.TouchableOpacity`
  width:45%;
  background-color:#fff;
  height:220px;
  border-radius:10px;
  padding: 15px;
`

const RecipeTitle = styled.Text`
  font-size:16px;
  font-weight:600;
  color:${colors.fontMain};
`

const RecipeImg = styled.View`
  width:100%;
  height:70%;
`

const ButtonArea = styled.View`
  display:flex;
  flex-direction:row;
  align-items:center;
  gap:5px;
`

const ButtonEl = styled.View`

`

const DropDownBody = styled.View`
  width:40%;
  background-color:#fff;
  border-radius:10px;
  position:absolute;
  right:0;
  bottom:-140px;
  z-index:2;
`

const DropDownEl = styled.TouchableOpacity`
  width:100%;
  height:45px;
  padding:10px 15px;
  display:flex;
  justify-content:center;
`

const DropDownText = styled.Text`
  font-size:16px;
  font-weight:500;
  color:${colors.fontMain};
`
