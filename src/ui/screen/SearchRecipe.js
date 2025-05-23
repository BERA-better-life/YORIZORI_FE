
import { SafeAreaView, View } from 'react-native'
import { styled } from 'styled-components'
import { size } from '../styles/size'
import { colors } from '../styles/colors'
import SearchIngredients from '../components/SearchIngredients'
import Button from '../components/Button'
import MarginVertical from '../components/MarginVertical'
import { use, useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useRecipe } from '../../hooks/useRecipe'

const SearchRecipe = () => {
  const [step, setStep] = useState(1);
  const navigation = useNavigation();
  const [selectedIngredientsList, setSelectedIngredientsList] = useState([])
  const [excludedIngredientsList, setExcludedIngredientsList] = useState([])
  const [recipeList, setRecipeList] = useState([])
  const {handleSearchRecipeForNonUser} = useRecipe();

  useEffect(() => {
    console.log(selectedIngredientsList, excludedIngredientsList)
  }, [selectedIngredientsList, excludedIngredientsList])

  useFocusEffect(
    useCallback(() => {
    setSelectedIngredientsList([])
    setExcludedIngredientsList([])
    setStep(1)
    }, []),
  )
  

  
  const handleNextButton = () => {
    if(step === 1)setStep(2)
    else{
      handleSearchRecipeForNonUser(selectedIngredientsList.join(", "), excludedIngredientsList.join(", "), setRecipeList)
    }
  }

  useEffect(() => {
    
  }, [])
  


  return (
    <SafeAreaView style={{backgroundColor:colors.bgColor}}>
      <Body>
        <Header>
          <HeaderText>레시피 검색</HeaderText>
        </Header>
        <MarginVertical margin={60}/>
        <StepArea>
          <StepEl style={{backgroundColor:step === 1? colors.pointRed : "#fff",}}>
            <StepText style={{color:step !== 1? colors.pointRed : "#fff"}}>1</StepText>
          </StepEl>
          <View style={{width:10, height:2, backgroundColor:colors.pointRed}}></View>
          <StepEl style={{backgroundColor:step === 2? colors.pointRed : "#fff",}}>
            <StepText style={{color:step !== 2? colors.pointRed : "#fff",}}>2</StepText>
          </StepEl>
        </StepArea>
        <MarginVertical margin={25}/>
        <SearchIngredients text={step === 1 ? "원하는" : "제외하고 싶은"} version={step===1?"select" : "exclude"} setSelectedIngredientsList={setSelectedIngredientsList} setExcludedIngredientsList={setExcludedIngredientsList} selectedIngredientsList={selectedIngredientsList} excludedIngredientsList={excludedIngredientsList} step={step}/>
        <View style={{position:'absolute', bottom:200, width:size.width, alignItems:'center'}}>
          <Button text={step === 1 ? "다음단계로" : "검색하기"} handleButton={handleNextButton} isValid={step === 1 && selectedIngredientsList.length > 0 ? true : step === 2 ? true : false }/>
        </View>
      </Body>
    </SafeAreaView>
  )
}

export default SearchRecipe

const Body = styled.View`
  width:${size.width}px;
  height:${size.height}px;
  background-color:${colors.bgColor};
  
  padding: 0 40px;
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



const StepArea = styled.View`
  display:flex;
  flex-direction:row;
  align-items:center;
  gap:5px;
  `

const StepEl = styled.View`
  width:40px;
  height:40px;
  border-radius:10px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const StepText = styled.Text`
  color:#fff;
  font-size:20px;
  font-weight:600;
`

const Title = styled.Text`

`