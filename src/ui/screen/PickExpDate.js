import { SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { styled } from "styled-components"
import { size } from "../styles/size"
import { colors } from "../styles/colors"
import dayjs from "dayjs";
import MarginVertical from "../components/MarginVertical";
import { useEffect, useState } from "react";
import Calendar from "../components/Calandar";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";



const PickExpDate = ({route}) => {
  const [currentDate, setCurrentDate] = useState(dayjs())
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const {ingredientName, ingredientId, setSelectedIngredientsList} = route.params

  useEffect(() => {
    console.log(selectedDate)
    setSelectedIngredientsList(prev => [...prev.filter((el) => el.ingredient_id !== ingredientId),{ingredient_id:ingredientId, ingredient_name:ingredientName, expiration_date:selectedDate.format("YYYY-MM-DD")}])
  }, [selectedDate])
  

  return (
    <SafeAreaView style={{backgroundColor:colors.bgColor}}>
      <Body>
        <Header>
          <TouchableOpacity style={{position:'absolute',left:0}} onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" size={24} color={colors.fontMain} />
          </TouchableOpacity>
          <HeaderText>나의 냉장고 재료 추가하기</HeaderText>
        </Header>
        <MarginVertical margin={60}/>
        <View style={{alignItems:'flex-start', width:"90%"}}>
          <View style={{flexDirection:'row', alignItems:'flex-start',justifyContent:'flex-start'}}>
            <CategoryTitle style={{color:colors.pointRed}}>{ingredientName}</CategoryTitle>
            <CategoryTitle>{"의 유통기한을"}</CategoryTitle>
          </View>
          <CategoryTitle>{"입력해주세요"}</CategoryTitle>
        </View>
        <MarginVertical margin={35}/>
        <CalandarArea>
          <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
        </CalandarArea>
        <View style={{position:'absolute', bottom:150}}>
          <Button text={"설정하기"} handleButton={() => navigation.goBack()} isValid={true}/>
        </View>
      </Body>
    </SafeAreaView>
  )
}

export default PickExpDate

const Body = styled.View`
  width:${size.width}px;
  height:${size.height}px;
  background-color:${colors.bgColor};
  padding:0 30px;
  display:flex;
  align-items:center;
`

const Header = styled.View`
  width:100%;
  height:50px;
  justify-content:center;
  align-items:center;
`

const HeaderText = styled.Text`
  color:${colors.lightGray};
  font-size:16px;
  font-weight:600;
`

const CategoryTitle = styled.Text`
  font-size:20px;
  font-weight:700;
  color:${colors.fontMain};
`

const CalandarArea = styled.View`

`

const DateEl = styled.TouchableOpacity`

`




