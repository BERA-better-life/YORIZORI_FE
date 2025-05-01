import { SafeAreaView, TouchableOpacity, View } from "react-native"
import { colors } from "../styles/colors"
import { styled } from "styled-components"
import { size } from "../styles/size"
import SearchIngredients from "../components/SearchIngredients"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MarginVertical from "../components/MarginVertical"
import Button from "../components/Button"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import Ionicons from '@expo/vector-icons/Ionicons';

const AddFreezerEl = () => {
  const [step, setStep] = useState(1)
  const navigation = useNavigation();
  const data = [['미역','2025년 4월 15일까지'],['오트밀','2026년 3월 1일까지'],["참치액","유통기한 입력 안함"]]

  const handleNextButton = () => {
    if(step === 1)setStep(prev => prev+1)
    else{
      navigation.reset({
        routes:[{
          name:'Tabs'
        }]
      })
    }
  }
  return (
    <SafeAreaView style={{backgroundColor:colors.bgColor}}>
      <Body>
        <Header>
          <TouchableOpacity style={{position:'absolute',left:0}} onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" size={24} color={colors.fontMain} />
          </TouchableOpacity>
          <HeaderText>나의 냉장고 재료 추가하기</HeaderText>
        </Header>
        {step === 1 ?
        <>
          <MarginVertical margin={60}/>
          <SearchIngredients text={"냉장고에 추가하고 싶은"}/>
        </>
        :
        <>
        <MarginVertical margin={60}/>
        <View style={{width:'90%'}}>
          <CategoryTitle>{"추가할 재료들의 유통기한을\n설정해볼까요?"}</CategoryTitle>
        </View>
        <MarginVertical margin={40}/>
        <Step2Area>
          {data.map((el,index) =>{
            return(
              <ExpirationDateEl key={index}>
                <View style={{gap:5}}>
                  <IngredientTitle>{el[0]}</IngredientTitle>
                  <ExpirationText>{el[1]}</ExpirationText>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("PickExpDate")}>
                  <Ionicons name="settings-sharp" size={24} color={colors.pointRed} />
                </TouchableOpacity>
              </ExpirationDateEl>
            )
          })}
        </Step2Area>
        </>}
        <View style={{position:'absolute',bottom:150}}>
          <Button text={step===1 ? "다음단계로":"추가하기"} handleButton={handleNextButton}/>
        </View>
      </Body>
      
    </SafeAreaView>
  )
}

export default AddFreezerEl

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

const Step2Area = styled.View`
  display:flex;
  gap:15px;
  width:100%;
  align-items:center;
`

const ExpirationDateEl = styled.View`
  background-color:#fff;
  width:80%;
  border-radius:15px;
  padding:15px 20px;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
`

const IngredientTitle = styled.Text`
  font-size:16px;
  color:${colors.fontMain};
  font-weight:600;
`

const ExpirationText = styled.Text`
  font-size:14px;
  color:${colors.pointRed};
  font-weight:600;
`
