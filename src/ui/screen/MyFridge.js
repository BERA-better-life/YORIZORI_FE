import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native"
import { colors } from "../styles/colors"
import { styled } from "styled-components"
import { size } from "../styles/size"
import cart_icon from '../../../assets/cart_icon.png'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Button from "../components/Button"
import MarginVertical from "../components/MarginVertical"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { useCallback, useEffect, useState } from "react"
import { useIngredients } from "../../hooks/useIngredients"
import dayjs from "dayjs"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const MyFridge = () => {
  const ingredientsArray = new Array(10).fill("")
  const navigation = useNavigation();
  const {getUserIngredients} = useIngredients();
  const [ingredientsList, setIngredientsList] = useState([]);
  const [rightFreezerList, setRightFreezerList] = useState([]);
  const [leftFreezerList, setLeftFreezerList] = useState([]);
  const today = dayjs().startOf('day');
  const [deleteList, setDeleteList] = useState([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const handleButton = () => {
    if(isDeleteMode){

    }else{
      navigation.navigate("AddFreezerEl")
    }
  }
  

  useFocusEffect(
    useCallback(() => {
    getUserIngredients(setIngredientsList)
    }, []),
  )

  useEffect(() => {
    setLeftFreezerList(ingredientsList.filter((el) => {
      const targetDate = dayjs(el.expiration_date).startOf('day');
      const daysLeft = targetDate.diff(today, 'day');
      return daysLeft > 3 
    }))
    setRightFreezerList(ingredientsList.filter((el) => {
      const targetDate = dayjs(el.expiration_date).startOf('day');
      const daysLeft = targetDate.diff(today, 'day');
      return daysLeft <= 3 
    }))
  }, [ingredientsList])

  


  return (
    <SafeAreaView style={{backgroundColor:colors.bgColor}}>
      <Body>
        <Header>
          <Text>나의 냉장고</Text>
        </Header>
        <MarginVertical margin={10}/>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <View style={{flexDirection:'row', alignItems:'center', gap:5}}>
            <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() => navigation.navigate("MarketRecommand")}>
            <Text style={{color:colors.fontMain, fontSize:20}}>장보기 추천받기</Text>
            <Image source={cart_icon} style={{width:32, height:32}}/>
            </TouchableOpacity> 
          </View>
          <TouchableOpacity onPress={() => setIsDeleteMode(prev => !prev)}>
            <FontAwesome name="trash" size={32} color={colors.fontMain} />
          </TouchableOpacity>
        </View>
        <MarginVertical margin={20}/>
        <FridgeArea>
          <FridgeBody>
            <ScrollView showsVerticalScrollIndicator={false}>
            
            {leftFreezerList.map((el,index) => {
              return(
                <IngredientEl key={index}>
                  {isDeleteMode ? 
                  <TouchableOpacity style={{width:120}} onPress={() => setDeleteList(prev => deleteList.includes(el.ingredient_id) ? deleteList.filter((item) => item !== el.ingredient_id) : [...prev, el.ingredient_id])}>
                    <AntDesign name={deleteList.includes(el.ingredient_id) ? "closecircle" : "closecircleo"} size={24} color={colors.pointBlue} style={{position:'absolute', top:-30, left:0}}/>
                  </TouchableOpacity>
                  :<></>}
                  <IngredientText>{el.ingredient_name}</IngredientText>
                  <MarginVertical margin={5}/>
                  <ExpText>{el.expiration_date.slice(2)}</ExpText>
                </IngredientEl>
              )
            })}
            </ScrollView>
            <FridgeLeftHandle/>
          </FridgeBody>
          <FridgeBody>
            <ScrollView showsVerticalScrollIndicator={false}>
            
            {rightFreezerList.map((el,index) => {
              return(
                <IngredientEl key={index}>
                  {isDeleteMode ? 
                  <TouchableOpacity style={{width:120, zIndex:3}} onPress={() => setDeleteList(prev => deleteList.includes(el.ingredient_id) ? deleteList.filter((item) => item !== el.ingredient_id) : [...prev, el.ingredient_id])}>
                    <AntDesign name={deleteList.includes(el.ingredient_id) ? "closecircle" : "closecircleo"} size={24} color={colors.pointBlue} style={{position:'absolute', top:-30, left:0, zIndex:3}}/>
                  </TouchableOpacity>
                  :<></>}
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <MaterialCommunityIcons name="exclamation-thick" size={24} color={colors.pointRed} />
                    <IngredientText>{el.ingredient_name}</IngredientText>
                  </View>
                  <MarginVertical margin={5}/>
                  <ExpText style={{color:colors.pointRed}}>{el.expiration_date.slice(2)}</ExpText>
                </IngredientEl>
              )
            })}
            </ScrollView>
            <FridgeRightHandle/>
          </FridgeBody>
        </FridgeArea>
        <MarginVertical margin={50}/>
        <View style={{alignItems:'center'}}>
          <Button text={isDeleteMode ? "재료 삭제하기":"재료 추가하기"} handleButton={() => handleButton} isValid={true}/>
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
  flex-direction:row;
  flex-wrap:wrap;
  padding:10px 5px;
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
  padding:10px;
  background-color:#fff;
  border-radius:20px;
  margin-bottom:20px;
  margin-left:30px;
  width:90px;
  display:flex;
  justify-content:center;
  align-items:center;
  margin-top:10px;
  
`

const IngredientText = styled.Text`
  text-align:center;
  font-size:14px;
  font-weight:600;
  color:${colors.fontMain};
`

const ExpText = styled.Text`
  font-size:12px;
  font-weight:600;
`



