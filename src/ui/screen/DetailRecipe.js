import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native"
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

const DetailRecipe = () => {
  const navigation = useNavigation();
  const ingredientsArray = new Array(8).fill("토마토")
  const stepArray = ["토마토를 10분간 세척한다.","세척한 토마토를 8등분한다","썰어둔 토마토를 냄비에 넣고 15분간 끓인다", "쌀국수용 면을 10분간 끓는물에 삶는다", "조리된 토마토에 쌀국수용 육수를 섞는다", "만들어진 육수에 쌀국수면과 토핑을 넣어 완성한다"]

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
          <RecipeTitle>토마토 쌀국수</RecipeTitle>
          <ButtonArea>
            <ButtonEl>
              <Ionicons name="heart-outline" size={24} color={colors.pointRed} />
            </ButtonEl>
            <ButtonEl>
              <MaterialIcons name="save-alt" size={24} color={colors.fontMain} />
            </ButtonEl>
          </ButtonArea>
        </View>
        <MarginVertical margin={30}/>
        <ContentsEl>
          <CateogryText>재료</CateogryText>
          <View style={{flexDirection:'row', flexWrap:'wrap', gap:7}}>
            {ingredientsArray.map((el,index) => {
              return(
                <IngredientEl text={el} key={index}/>
              )
            })}
          </View>
        </ContentsEl>
        <MarginVertical margin={20}/>
        <ContentsEl>
          <CateogryText>소요시간</CateogryText>
          <CateogryText>30분</CateogryText>
        </ContentsEl>
        <MarginVertical margin={20}/>
        <CateogryText>조리과정</CateogryText>
        <MarginVertical margin={20}/>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {stepArray.map((el,index) => {
            return(
              <RecipeStepArea key={index}>
                <RecipeStepNum>
                  <RecipeStepText>{index+1}</RecipeStepText>
                </RecipeStepNum>
                <RecipeStepEl>
                  <RecipeStepImg>

                  </RecipeStepImg>
                  <RecipeContentsText>
                    {el}
                  </RecipeContentsText>
                </RecipeStepEl>
              </RecipeStepArea>
            )
          })}
        </ScrollView>
        <MarginVertical margin={20}/>
        <View style={{width:'100%', alignItems:'center'}}>
          <Button text={"다른 레시피 보러가기"} handleButton={() => navigation.goBack()}/>
        </View>
        </ScrollView>
        <MarginVertical margin={20}/>
      </Body>
    </SafeAreaView>
  )
}

export default DetailRecipe


const Body = styled.View`
  width:${size.width}px;
  min-height:${size.height}px;
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
  width:90%;
  height:240px;
`

const RecipeContentsText = styled.Text`
  color:${colors.fontMain};
  font-size:16px;
  font-weight:500;
`



