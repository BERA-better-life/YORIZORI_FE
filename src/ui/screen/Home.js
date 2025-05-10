import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native"
import { styled } from "styled-components"
import { colors } from "../styles/colors"
import { size } from "../styles/size"
import FontAwesome from '@expo/vector-icons/FontAwesome';

import logo from '../../../assets/logo.png';
import notification_icon from '../../../assets/notification_icon.png';
import cutlery_icon from '../../../assets/cutlery_icon.png';
import MarginVertical from "../components/MarginVertical";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBookMark } from "../../hooks/useBookmark";

const Home = () => {
  const ingredientsInfo = ['토마토','감자','우유','치즈','베이컨']
  const navigation = useNavigation();
  const {getBookmarksList} = useBookMark();
  const [bookmarkList,setBookmarkList] = useState([]);

  const getToken = async() => {
    const token = await AsyncStorage.getItem("accessToken")
    console.log(token)
  }

  useEffect(() => {
    getToken()
  }, [])

  useFocusEffect(
    useCallback(() => {
    getBookmarksList(setBookmarkList);
    }, []),
  )
  

  return (
    <SafeAreaView style={{backgroundColor:colors.bgColor}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <HomeBody>
        
        <MarginVertical margin={10}/>
        <Header>
          <LogoImg source={logo}/>
          <AlertIcon onPress={() => navigation.navigate("Notification")}>
            <Image source={notification_icon} style={{height:35, width:35}}/>
          </AlertIcon>
        </Header>
        <MarginVertical margin={25}/>
        <GoToRecipeArea>
          <Image source={cutlery_icon} style={{width:40, height:40}}/>
          <Text style={{flexGrow:1}}>레시피 검색하러 가기</Text>
          <ArrowIcon>
            <FontAwesome name="arrow-right" size={24} color={colors.pointRed} />
          </ArrowIcon>
        </GoToRecipeArea>
        <MarginVertical margin={30}/>
        <TitleSection>
          <Text>유통기한 마감 임박 재료</Text>
          <ArrowIcon>
            <FontAwesome name="arrow-right" size={24} color={colors.pointRed} />
          </ArrowIcon>
        </TitleSection>
        <MarginVertical margin={10}/>
        <IngredientsArea horizontal={true} showsHorizontalScrollIndicator={false}>
          {ingredientsInfo.map((el,index) =>{
            return(
              <IngredientEl key={index}>
                <Text style={{color:"#fff"}}>{el}</Text>
              </IngredientEl>
            )
          })}
        </IngredientsArea>
        <TitleSection>
          <Text>저장해놓은 레시피</Text>
          <ArrowIcon>
            <FontAwesome name="arrow-right" size={24} color={colors.pointRed} />
          </ArrowIcon>
        </TitleSection>
        <MarginVertical margin={10}/>
        <RecipesArea horizontal={true} showsHorizontalScrollIndicator={false}>
          {bookmarkList.map((el,index) => {
            return(
              <RecipeEl key={index}>
                <RecipeImg/>
                <MarginVertical margin={10}/>
                <Text style={{fontSize:15, textAlign:'center'}}>{el.recipe_title}</Text>
              </RecipeEl>
            )
          })}
        </RecipesArea>
        
      </HomeBody>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const HomeBody = styled.View`
  background-color:${colors.bgColor};
  width:${size.width}px;
  height:${size.height}px;
  padding:0 30px;
`

const Header = styled.View`
  width:100%;
  height:50px;
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
`

const LogoImg = styled.Image`
  object-fit:contain;
  width:90px;
  height:50px;
  
`

const AlertIcon = styled.TouchableOpacity`
  width:50px;
  height:50px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const GoToRecipeArea = styled.View`
  width:100%;
  height:90px;
  background-color:#fff;
  border-radius:15px;
  padding:10px 30px;
  display:flex;
  flex-direction:row;
  align-items:center;
  gap:20px;
`

const ArrowIcon = styled.TouchableOpacity`
  width:50px;
  height:50px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const Text = styled.Text`
  font-size:18px;
  color:${colors.fontMain};
  font-weight:600;
`

const IngredientEl = styled.View`
  width:80px;
  height:80px;
  border-radius:50%;
  background-color:${colors.pointOrange};
  display:flex;
  justify-content:center;
  align-items:center;
  margin-left:10px;
`

const RecipeEl = styled.TouchableOpacity`
  width:130px;
  height:190px;
  background-color:#fff;
  border-radius:10px;
  margin-left:15px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const RecipeImg = styled.Image`
  width:90%;
  height:70%;
  background-color:red;
`

const TitleSection = styled.View`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
`

const IngredientsArea = styled.ScrollView`
  height:0px;
  width:${size.width}px;
`

const RecipesArea = styled.ScrollView`
  width:${size.width}px;
  
`





