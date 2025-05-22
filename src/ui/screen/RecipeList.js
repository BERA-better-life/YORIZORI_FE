import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { styled } from "styled-components"
import { colors } from "../styles/colors"
import { size } from "../styles/size"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MarginVertical from "../components/MarginVertical";
import { useCallback, useEffect, useRef, useState } from "react";
import { useUserLoginStore } from "../../store/userStore";
import GoToLoginButton from "../components/GoToLoginButton";
import { useRecipe } from "../../hooks/useRecipe";
import { useIngredients } from "../../hooks/useIngredients";
import { useLike } from "../../hooks/useLike";
import { useBookMark } from "../../hooks/useBookmark";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';



const RecipeList = ({route}) => {
  const navigation = useNavigation();
  const [showDropDown, setShowDropDown] = useState(false);
  const sortArray = ["짧은 조리시간순", "긴 조리시간순", "적은 필요재료순","많은 필요재료순","많은 좋아요순","적은 좋아요순"]
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
  const keywordArr = ["간식","도시락","다이어트","명절","손님접대","술안주","야식","영양식","이유식","일상","초스피드","해장","기타"]
  const typeArr = ["과자","국/탕","김치/젓갈/장류", "디저트","메인반찬","면/만두","밑반찬","밥/죽/떡","빵","샐러드","스프","양념/소스/잼","양식","찌개","차/음료/술","퓨전","기타"]
  const [keyword, setKeyword] = useState([])
  const [type, setType] = useState([])
  const animation = useRef(null);
  const [isFinishied, setIsFinishied] = useState(false);
  

  
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

  useFocusEffect(
    useCallback(() => {
    if(isLogin){handleSearchRecipeForUser(setRecipeList,"",[],[],setIsFinishied)}
    },[]),
)

  useEffect(() => {
    console.log(selectedSort)
  },[selectedSort, keyword, type])

  useEffect(() => {
    var sort = selectedSort === "짧은 조리시간순" ? "rcp_cooktime_asc" : selectedSort === "긴 조리시간순" ? "rcp_cooktime_desc" : selectedSort === "적은 필요재료순" ? "rcp_ingredient_cnt_asc" : selectedSort === "많은 필요재료순" ? "rcp_ingredient_cnt_desc" : selectedSort === "많은 좋아요순" ? "likes_desc" : "likes_asc"
    if(!isLogin){
      setIsFinishied(false);
      handleSearchRecipeForNonUser(route.params.ingredientsText, route.params.excludedIngredientsText,setRecipeList,"",sort, keyword, type, setIsFinishied)
    }else{
      setIsFinishied(false);
      handleSearchRecipeForUser(setRecipeList, sort, keyword, type, setIsFinishied)
    }
  },[selectedSort, type, keyword])

  

  return (
    <SafeAreaView style={{backgroundColor:colors.bgColor}}>
      {!isFinishied ? 
      <View style={{width: size.width,
        height: size.height,
        backgroundColor: 'rgba(255,255,255,.5)',
        position:'absolute',
        zIndex:3,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        top:0}}>
        <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
        }}
        
        source={require('../../../assets/loadingAni.json')}/>
        </View>
      
      :
      <></>
      }
      
      
      
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
            <ScrollView showsVerticalScrollIndicator={false}>
            {sortArray.map((el,index) => {
              return(
                <DropDownEl key={index} onPress={() => {setSelectedSort(prev => prev === el? "" : el);setShowDropDown(false)}}>
                  <DropDownText style={{color:selectedSort === el ? colors.pointRed : colors.fontMain}}>{el}</DropDownText>
                </DropDownEl>
              )
            })}
            </ScrollView>
          </DropDownBody>
          :<></>}
        </View>
        <MarginVertical margin={20}/>
        <ScrollView showsVerticalScrollIndicator={false}>
        <CategoryTitle>키워드별</CategoryTitle>
        <MarginVertical margin={8}/>
          <CategoryArea>
            {keywordArr.map((el,index)=> {
              return(
                <CategoryEl 
                  key={index} 
                  onPress={() => keyword.includes(el) ? setKeyword(keyword.filter((item) => item !== el)) : setKeyword(prev => [...prev, el])}
                  isSelected={keyword.includes(el)}
                >
                  <CategoryText isSelected={keyword.includes(el)}>{el}</CategoryText>
                </CategoryEl>
              )
            })}
          </CategoryArea>
          <MarginVertical margin={15}/>
        <CategoryTitle>레시피 타입별</CategoryTitle>
        <MarginVertical margin={8}/>
          <CategoryArea>
          {typeArr.map((el,index)=> {
              return(
                <CategoryEl 
                  key={index}
                  onPress={() => type.includes(el) ? setType(type.filter((item) => item !== el)) : setType(prev => [...prev, el])}
                  isSelected={type.includes(el)}>
                  <CategoryText isSelected={type.includes(el)}>{el}</CategoryText>
                </CategoryEl>
              )
            })}
          </CategoryArea>
          <MarginVertical margin={15}/>
          <RecipeArea>
            {recipeList.map((el,index) => {
              return(
                <RecipeEl key={index} onPress={() => navigation.navigate("DetailRecipe", {recipeId:el.rcp_number})} isLogin={isLogin}>
                  <RecipeImg>
                    {el.rcp_picture ?
                    <Image source={{ uri: el.rcp_picture}} style={{width:"100%", height:"95%", borderRadius:10}}/>:
                    <MaterialIcons name="image-not-supported" size={40} color="black" />
                    }
                  </RecipeImg>
                  <MarginVertical margin={10}/>
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
                  <MarginVertical margin={10}/>
                  <TagArea>
                    <View style={{flexDirection:'row', alignItems:'center', gap:5}}>
                      <MaterialIcons name="timer" size={24} color={colors.pointBlue} />
                      <Text style={{fontWeight:500, fontSize:15, color:colors.fontMain}}>{`${el.rcp_cooktime} M`}</Text>
                    </View>
                    <MarginVertical margin={5}/>
                    <View style={{flexDirection:'row', gap:5}}>
                      <View style={{backgroundColor:colors.pointOrange, padding:5, borderRadius:20, justifyContent:'center', alignItems:'center' }}><CategoryText style={{color:"#fff",fontSize:14}}>{`#${el.rcp_keyword}`}</CategoryText></View>
                      <View style={{backgroundColor:colors.pointOrange, padding:5, borderRadius:20, justifyContent:'center', alignItems:'center'}}><CategoryText style={{color:"#fff",fontSize:14}}>{`#${el.rcp_type}`}</CategoryText></View>
                    </View>
                  </TagArea>
                </RecipeEl>
              )
            })}
            <MarginVertical margin={180}/>
            </RecipeArea>
            
          </ScrollView>

      </Body>
    </SafeAreaView>
  )
}

export default RecipeList

const Body = styled.View`
  width:${size.width}px;
  height:${size.height}px;
  background-color:${colors.bgColor};
  padding:0 30px;
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
  height:${(props) => (props.isLogin ? 310 : 270)};
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
  height:50%;
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
  height:150px;
  background-color:#fff;
  border-radius:10px;
  position:absolute;
  right:0;
  z-index:2;
  top:30px;
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

const CategoryArea = styled.View`
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  gap:5px;
`

const CategoryEl = styled.TouchableOpacity`
  padding:10px;
  border-radius:20px;
  background-color:${props => props.isSelected ?  colors.pointRed :"" };
  border:${props => props.isSelected ? "none" : `1px solid ${colors.pointRed}` };
  
`

const CategoryText = styled.Text`
  font-size:16px;
  font-weight:600;
  color:${props => props.isSelected ? "#fff" : colors.pointRed};
`

const CategoryTitle = styled.Text`
  font-size:18px;
  font-weight:600;
  color:${colors.lightGray};
`

const TagArea = styled.View`

`
