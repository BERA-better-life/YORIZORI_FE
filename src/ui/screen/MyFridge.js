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
import { useUserLoginStore } from "../../store/userStore"
import GoToLoginButton from "../components/GoToLoginButton"


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
  const {deleteUserIngredients} = useIngredients();
  const {isLogin} = useUserLoginStore();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleButton = async () => {
    if (isDeleteMode) {
      try {
        // 1) 삭제 요청
        await deleteUserIngredients(deleteList);
  
        // 2) 삭제 모드 해제 및 선택 리스트 초기화
        setIsDeleteMode(false);
        setDeleteList([]);
  
        // 3) 다시 목록 불러오기 (새로고침 효과)
        await getUserIngredients(setIngredientsList);
      } catch (error) {
        console.error('삭제 중 에러:', error);
      }
    } else {
      navigation.navigate("AddFreezerEl");
    }
  };

  const InfoModal = () => {
    return(
      <View style={{backgroundColor:"#fff", padding:20, borderRadius:10, position:'absolute', width:'70%', top:40,right:0, zIndex:3, gap:15}}>
        <Text style={{textAlign:'center'}}>재료 옆 표시가 어떤 의미를 가지는지 알려드릴게요!</Text>
        {["red","orange","yellow","blue"].map((el,index) => {
          return(
            <View style={{flexDirection:'row', gap:7, alignItems:'center'}} key={index}>
              <AlertCircle style={{backgroundColor:el === "red" ? colors.pointRed : el === "orange" ? colors.pointOrange : el === "yellow" ? "#FFDB49" : colors.pointBlue}}/>
              <Text style={{fontSize:16, color:colors.fontMain}}>{el === "red" ? "재료의 유통기한이 3일 이내로 남은 경우" : el === "orange" ? "재료의 유통기한이 7일 이내로 남은 경우" : el === "yellow" ? "재료의 유통기한이 한달 이내로 남은 경우" : "재료의 유통기한이 한달보다 많이 남은 경우"}</Text>
            </View>
          )
        })}
      </View>
    )
  }
  
  

  useFocusEffect(
    useCallback(() => {
    if(isLogin){
    getUserIngredients(setIngredientsList)
    }
    }, [isDeleteMode]),
  )


  useFocusEffect(
    useCallback(() => {
      
      setIsDeleteMode(false);
      setDeleteList([])
    },[])
  )

  useEffect(() => {
    setLeftFreezerList(ingredientsList.filter((el) => {
      const targetDate = dayjs(el.expiration_date).startOf('day');
      const daysLeft = targetDate.diff(today, 'day');
      return daysLeft > 3 || !el.expiration_date
    }))
    setRightFreezerList(ingredientsList.filter((el) => {
      const targetDate = dayjs(el.expiration_date).startOf('day');
      const daysLeft = targetDate.diff(today, 'day');
      return daysLeft <= 3 
    }))
    
  }, [ingredientsList])



  useEffect(() => {
    console.log(deleteList)
  },[deleteList])
  
  const checkExpToColor = (date) => {
    if(!date)return null
    const target = dayjs(date).startOf('day');
    const daysLeft = target.diff(today, 'day');
    return daysLeft > 30 ? colors.pointBlue : daysLeft > 7 ? "#FFDB49" : colors.pointOrange

  }


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
          <View style={{flexDirection:'row', gap:10}}>
          <TouchableOpacity onPress={() => setIsOpenModal(prev => !prev)}>
            <FontAwesome name="question-circle" size={32} color={colors.pointBlue} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsDeleteMode(prev => !prev)}>
            <FontAwesome name="trash" size={32} color={isDeleteMode ? colors.pointBlue : colors.fontMain} />
          </TouchableOpacity>
          </View>
          {isOpenModal ? <InfoModal/> : <></>}
        </View>
        
        <MarginVertical margin={20}/>
        <FridgeArea>
          <FridgeBody>
            <ScrollView showsVerticalScrollIndicator={false}>
            
            {leftFreezerList.map((el,index) => {
              return(
                <IngredientEl key={index}>
                  {isDeleteMode ? 
                  <TouchableOpacity style={{width:120}} onPress={() => setDeleteList(prev => deleteList.includes(el.user_ingredient_id) ? deleteList.filter((item) => item !== el.user_ingredient_id) : [...prev, el.user_ingredient_id])}>
                    <AntDesign name={deleteList.includes(el.user_ingredient_id) ? "closecircle" : "closecircleo"} size={24} color={colors.pointBlue} style={{position:'absolute', top:-30, left:0}}/>
                  </TouchableOpacity>
                  :<></>}
                  <View style={{flexDirection:'row', gap:7, alignItems:'center'}}>
                    <AlertCircle style={{backgroundColor:checkExpToColor(el.expiration_date)}} />
                    <IngredientText>{el.ingredient_name}</IngredientText>
                  </View>
                  <MarginVertical margin={5}/>
                  <ExpText>{el.expiration_date ? el.expiration_date.slice(2) : "유통기한\n지정X"}</ExpText>
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
                  <TouchableOpacity style={{width:120, zIndex:3}} onPress={() => setDeleteList(prev => deleteList.includes(el.user_ingredient_id) ? deleteList.filter((item) => item !== el.user_ingredient_id) : [...prev, el.user_ingredient_id])}>
                    <AntDesign name={deleteList.includes(el.user_ingredient_id) ? "closecircle" : "closecircleo"} size={24} color={colors.pointBlue} style={{position:'absolute', top:-30, left:0, zIndex:3}}/>
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
          <Button text={isDeleteMode ? "재료 삭제하기":"재료 추가하기"} handleButton={() => handleButton()} isValid={true}/>
        </View>
      </Body>
      {isLogin ? <></> :
      <View style={{position:'absolute', top:0, left:0}}>
        <View style={{width:size.width, height:size.height, backgroundColor:"#fff", opacity:.7, position:'absolute', top:0, left:0, zIndex:9, display:"flex",
        justifyContent:"center", alignItems:"center"}}>
          
        </View>
        <View style={{zIndex:10, width:size.width, height:size.height, display:'flex', justifyContent:'center', alignItems:'center'}}>
        <GoToLoginButton/>
        </View>
      </View>}
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
  color:${colors.lightGray};
  text-align:center;
`

const AlertCircle = styled.View`
  width:12px;
  height:12px;
  border-radius:50%;
`


