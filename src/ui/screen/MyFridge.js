import { Image, SafeAreaView, TouchableOpacity, View } from "react-native"
import { colors } from "../styles/colors"
import { styled } from "styled-components"
import { size } from "../styles/size"
import cart_icon from '../../../assets/cart_icon.png'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Button from "../components/Button"
import MarginVertical from "../components/MarginVertical"
import { useNavigation } from "@react-navigation/native"

const MyFridge = () => {
  const ingredientsArray = new Array(10).fill("")
  const navigation = useNavigation();


  return (
    <SafeAreaView style={{backgroundColor:colors.bgColor}}>
      <Body>
        <Header>
          <Text>나의 냉장고</Text>
        </Header>
        <MarginVertical margin={10}/>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <View style={{flexDirection:'row', alignItems:'center', gap:5}}>
            <Text style={{color:colors.fontMain, fontSize:20}}>장보기 추천받기</Text>
            <TouchableOpacity>
              <Image source={cart_icon} style={{width:32, height:32}}/>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <FontAwesome name="trash" size={32} color={colors.fontMain} />
          </TouchableOpacity>
        </View>
        <MarginVertical margin={20}/>
        <FridgeArea>
          <FridgeBody>
            <FridgeLeftHandle/>
            {ingredientsArray.map((el,index) => {
              return(
                <IngredientEl key={index}>
                  <IngredientText>{el}</IngredientText>
                </IngredientEl>
              )
            })}
          </FridgeBody>
          <FridgeBody>
            <FridgeRightHandle/>
            {ingredientsArray.map((el,index) => {
              return(
                <IngredientEl key={index}>
                  <IngredientText>{el}</IngredientText>
                </IngredientEl>
              )
            })}
          </FridgeBody>
        </FridgeArea>
        <MarginVertical margin={50}/>
        <View style={{alignItems:'center'}}>
          <Button text={"재료 추가하기"} handleButton={() => navigation.navigate("AddFreezerEl")}/>
        </View>
      </Body>
    </SafeAreaView>
  )
}

export default MyFridge


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

const Text = styled.Text`
  font-size:18px;
  font-weight:600;
  color:${colors.lightGray};
`
const FridgeArea = styled.View`
  display:flex;
  flex-direction:row;
  gap:20px;
`

const FridgeBody = styled.View`
  background-color:#E7E7E7;
  width:45%;
  height:390px;
  border-radius:15px;
  display:flex;
  justify-content:center;
  align-items:center;
  gap:10px;
  flex-direction:row;
  flex-wrap:wrap;
  padding:5px;
`

const FridgeLeftHandle = styled.View`
  background-color:${colors.pointRed};
  width:12px;
  height:40px;
  border-radius:10px;
  position:absolute;
  right:15px;
  z-index:2;
`

const FridgeRightHandle = styled.View`
  background-color:${colors.pointRed};
  width:12px;
  height:40px;
  border-radius:10px;
  position:absolute;
  left:15px;
  z-index:2;
`


const IngredientEl = styled.View`
  width:60px;
  padding:10px;
  background-color:#fff;
  border-radius:10px;
  margin-bottom:20px;
`

const IngredientText = styled.Text`

`



