import { styled } from "styled-components"
import { colors } from "../styles/colors"
import MarginVertical from "./MarginVertical"
import { Image, ScrollView, Text, View } from "react-native"
import Feather from '@expo/vector-icons/Feather';
import IngredientEl from "./IngredientEl";
import { useIngredients } from "../../hooks/useIngredients";
import { use, useEffect, useState } from "react";
import { size } from "../styles/size";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const SearchIngredients = ({text, selectedIngredientsList, setSelectedIngredientsList, version, excludedIngredientsList, setExcludedIngredientsList, step}) => {
  const ingredientsList = ["미역","오트밀","참치액","간장","참기름","참치캔","깨"]
  const [searchInput, setSearchInput] = useState("");
  const {getAllIngredients} = useIngredients();
  const [allIngredientsList, setAllIngredientsList] = useState([])
  const [searchIngredientsList, setSearchIngredientsList] = useState([])

  useEffect(() => {
    getAllIngredients(setAllIngredientsList);
  }, [])


  const getSearchData = (searchInput) => {
    setSearchIngredientsList(allIngredientsList.filter((el) => el.ingredient_name.includes(searchInput)))
  }

  useEffect(() => {
    setSearchInput("")
    setSearchIngredientsList([])
    
    
  },[step])

  

  
  
  

  useEffect(() => {
    console.log(selectedIngredientsList)
  }, [selectedIngredientsList])
  

  return (
    <SearchBody>
      <Title>{`${text} 재료를\n선택해볼까요?`}</Title>
      <MarginVertical margin={15}/>
      <SearchBarArea>
        <SearchBar value={searchInput} onChange={(e) => setSearchInput(e.nativeEvent.text)}/>
        <SearchIcon onPress={() => getSearchData(searchInput)}>
          <Feather name="search" size={24} color={colors.pointRed} />
        </SearchIcon>
      </SearchBarArea>
      <MarginVertical margin={30}/>
        <View style={{flexDirection:'row', alignItems:'center', gap:5}}>
        <MaterialCommunityIcons name="basket-check" size={32} color={colors.pointRed} />
        <Text style={{fontSize:16, fontWeight:600, color:colors.fontMain}}>선택된 재료</Text>
        </View>
        <MarginVertical margin={10}/>
        {version === "select" || version === "freezer" ? 
        <View style={{flexDirection:'row', flexWrap:'wrap', gap:5}}>
        {selectedIngredientsList.map((el,index) => {
          return(
            <IngredientEl
              text={version === "freezer" ? el.ingredient_name : el} 
              id={el.ingredient_id} 
              key={index} 
              selectedIngredientsList={selectedIngredientsList} 
              setSelectedIngredientsList={setSelectedIngredientsList} 
              isTouchable={true} 
              setExcludedIngredientsList={setExcludedIngredientsList}
              excludedIngredientsList={excludedIngredientsList}
              version={version}/>
          )
        })}
        </View>
        : 
        <View style={{flexDirection:'row', flexWrap:'wrap', gap:5}}>
        {excludedIngredientsList.map((el,index) => {
          return(
            <IngredientEl
              text={el} 
              id={el.ingredient_id} 
              key={index} 
              selectedIngredientsList={selectedIngredientsList} 
              setSelectedIngredientsList={setSelectedIngredientsList} 
              isTouchable={true} 
              setExcludedIngredientsList={setExcludedIngredientsList}
              excludedIngredientsList={excludedIngredientsList}
              version={version}/>
          )
        })}
        </View>}
        <MarginVertical margin={15}/>
        <View style={{gap:7, flexDirection:'row', overflow:'hidden'}}>
        {new Array(20).fill("-").map((el,index) => {
          return(
            <View style={{width:size.width/40, height:1.5, backgroundColor:"rgba(20, 36, 72, 0.2)", borderRadius:40}} key={index}></View>
          )
        })}
        </View>
        <MarginVertical margin={15}/>
        <ScrollView style={{height: version === "select" || version === "exclude" ? 200 : 300}} showsVerticalScrollIndicator={false}>
        <IngredientsArea>
        {searchIngredientsList.map((el,index) => {
          return(
            <IngredientEl
              text={el.ingredient_name} 
              id={el.ingredient_id} 
              key={index} 
              selectedIngredientsList={selectedIngredientsList} 
              setSelectedIngredientsList={setSelectedIngredientsList} 
              isTouchable={true} 
              setExcludedIngredientsList={setExcludedIngredientsList}
              excludedIngredientsList={excludedIngredientsList}
              version={version}/>
          )
        })}
        <MarginVertical margin={80}/>
        </IngredientsArea>
        </ScrollView>
      
    </SearchBody>
  )
}

export default SearchIngredients


const SearchBody = styled.View`
  width:90%;
  
`

const Title = styled.Text`
  font-size:20px;
  color:${colors.fontMain};
  font-weight:700;
  line-height:26px;
`

const SearchBarArea = styled.View`
  display:flex;
  flex-direction:row;
  align-items:center;
`

const SearchBar = styled.TextInput`
  background-color:#fff;
  width:100%;
  height:50px;
  border-radius:10px;
  padding:10px 20px;
  font-weight:600;
  font-size:16px;
  color:${colors.fontMain};
`

const SearchIcon = styled.TouchableOpacity`
  position:absolute;
  right:20px;
`

const IngredientsArea = styled.View`
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  width:100%;
  
  gap:10px;
`


