import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native"
import { styled } from "styled-components"
import { colors } from "../styles/colors"
import { size } from "../styles/size"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MarginVertical from "../components/MarginVertical";
import { useState } from "react";


const RecipeList = () => {
  const navigation = useNavigation();
  const [showDropDown, setShowDropDown] = useState(false);
  const recipeArray = ["버섯수프", "토마토 스파게티", "닭볶음탕", "토마토달걀덮밥", "오이무침", "잔치국수"]
  const categoryArray = ["인기순", "난이도순", "재료순"]
  const [selectedSort, setSelectedSort] = useState("");

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
                <DropDownEl key={index} onPress={() => {setSelectedSort(el);setShowDropDown(false)}}>
                  <DropDownText>{el}</DropDownText>
                </DropDownEl>
              )
            })}
            
          </DropDownBody>
          :<></>}
        </View>
        <MarginVertical margin={20}/>
          <ScrollView showsVerticalScrollIndicator={false}>
          <RecipeArea>
            {recipeArray.map((el,index) => {
              return(
                <RecipeEl key={index}>
                  <RecipeImg>
                    <MaterialIcons name="image-not-supported" size={40} color="black" />
                  </RecipeImg>
                  <RecipeTitle>{el}</RecipeTitle>
                  <MarginVertical margin={10}/>
                  <ButtonArea>
                    <ButtonEl>
                      <Ionicons name="heart-sharp" size={24} color={colors.pointRed} />
                    </ButtonEl>
                    <ButtonEl>
                      <MaterialIcons name="save-alt" size={24} color={colors.fontMain} />
                    </ButtonEl>
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

const ButtonEl = styled.TouchableOpacity`

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
