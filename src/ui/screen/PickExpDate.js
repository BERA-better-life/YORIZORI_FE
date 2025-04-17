import { SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { styled } from "styled-components"
import { size } from "../styles/size"
import { colors } from "../styles/colors"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import dayjs from "dayjs";
import MarginVertical from "../components/MarginVertical";
import { useState } from "react";


const PickExpDate = () => {
  const [currentDate, setCurrentDate] = useState(dayjs())

  return (
    <SafeAreaView style={{backgroundColor:colors.bgColor}}>
      <Body>
        <Header>
          <TouchableOpacity style={{position:'absolute',left:0}} onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" size={24} color={colors.fontMain} />
          </TouchableOpacity>
          <HeaderText>나의 냉장고 재료 추가하기</HeaderText>
        </Header>
        <View style={{alignItems:'flex-start', width:"100%"}}>
          <View style={{flexDirection:'row', alignItems:'flex-start',justifyContent:'flex-start'}}>
            <CategoryTitle style={{color:colors.pointRed}}>토마토 </CategoryTitle>
            <CategoryTitle>{"의 유통기한을"}</CategoryTitle>
          </View>
          <CategoryTitle>{"입력해주세요"}</CategoryTitle>
        </View>
        <MarginVertical margin={35}/>
        <CalandarArea>
          <CalandarPicker>
            <ArrowButton onPress={() => setCurrentDate(prev => prev.subtract(1,'month'))}>
              <FontAwesome name="arrow-left" size={24} color={colors.fontMain} />
            </ArrowButton>
            <Text style={{color:colors.fontMain, fontSize:16, fontWeight:600}}>{currentDate.format("YYYY년 M월")}</Text>
            <ArrowButton onPress={() => setCurrentDate(prev => prev.add(1,'month'))}>
              <FontAwesome name="arrow-right" size={24} color={colors.fontMain} />
            </ArrowButton>
          </CalandarPicker>
        </CalandarArea>
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

const CalandarPicker = styled.View`
  display:flex;
  flex-direction:row;
  align-items:center;
  gap:20px;
`

const ArrowButton = styled.TouchableOpacity`

`


