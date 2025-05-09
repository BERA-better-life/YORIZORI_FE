import { Image, SafeAreaView, Text, View } from "react-native"
import { styled } from "styled-components"
import { size } from "../styles/size"
import { colors } from "../styles/colors"
import logo from '../../../assets/logo.png';
import Button from "../components/Button";
import MarginVertical from "../components/MarginVertical";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../hooks/useUser";
import { useEffect, useState } from "react";


const Signup = () => {
  const navigation = useNavigation();
  const placeholderArray = ["이메일을 입력해주세요","영문, 숫자 포함 8~16글자","비밀번호 확인","닉네임을 입력해주세요"]
  const {handleSignup} = useUser()
  const [userInfo, setUserInfo] = useState({id:"", password:"", password2:"", userName:""});
  const [isValid, setIsValid] = useState(false)
  const emailReg = /^[A-Za-z0-9]+([._%+\-][A-Za-z0-9]+)*@[A-Za-z0-9\-]+(\.[A-Za-z0-9\-]+)*\.[A-Za-z]{2,}$/
  const pwReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/



  useEffect(() => {
    if(emailReg.test(userInfo.id) && pwReg.test(userInfo.password) && userInfo.password === userInfo.password2 && userInfo.userName.length > 0 && userInfo.id.length>0 && userInfo.password.length>0){
      setIsValid(true)
    }else{
      setIsValid(false)
    }
    console.log(isValid)
  }, [userInfo])
  

  return (
    <SafeAreaView style={{backgroundColor:colors.bgColor}}>
      <Body>
        <Image source={logo} style={{width:"45%", resizeMode:'contain'}}/>
        <Title>회원가입</Title>
        <MarginVertical margin={20}/>
        <InputArea>
          {placeholderArray.map((el,index) => {
            return(
            <View style={{width:'70%', justifyContent:'center', alignItems:'center'}} key={index}>
              <InputBox
                placeholder={el}
                value={index === 0 ? userInfo.id : index === 1 ? userInfo.password : index === 2 ? userInfo.password2 : userInfo.userName}
                onChangeText={(text) => {index === 0 ? setUserInfo(prev => ({...prev, id:text}))
                : index === 1 ? setUserInfo(prev => ({...prev, password:text})) 
                : index === 2 ? setUserInfo(prev => ({...prev, password2:text})) 
                : setUserInfo(prev => ({...prev, userName:text})) }}  
                secureTextEntry={index === 1 || index === 2 ? true : false}
              />
              {index === 0 && emailReg.test(userInfo.id) || index === 1 && pwReg.test(userInfo.password) || index === 2 && userInfo.password === userInfo.password2 && userInfo.password.length>0 || index === 3 &&  userInfo.userName.length > 0 ? 
              <ValidCircle/>
              :
              <></>
              }
            </View>
            )
          })}
        </InputArea>
        <MarginVertical margin={15}/>
        <View style={{flexDirection:'row', width:"70%"}}>
          <Text style={{color:colors.lightGray}}>이미 회원이신가요? </Text>
          <GoToSignUp onPress={() => navigation.navigate("Login")}>
            <GoToSignUpText>로그인 하러가기</GoToSignUpText>
          </GoToSignUp>
        </View>
        <MarginVertical margin={55}/>
        <View style={{width:'100%', justifyContent:'center', alignItems:'center'}}>
          <Button text={"회원가입하기"} width={"70%"} handleButton={() => handleSignup(userInfo)} isValid={isValid}/>
        </View>
      </Body>
    </SafeAreaView>
  )
}

export default Signup

const Body = styled.View`
  width:${size.width}px;
  height:${size.height}px;
  background-color:${colors.bgColor};
  display:flex;
  justify-content:center;
  align-items:center;
  margin-top:-50px;
`

const Title = styled.Text`
  font-size:24px;
  color:${colors.fontMain};
  font-weight:700;
  margin-top:-55px;
`

const InputArea = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
  gap:15px;
  width:100%;
  
`

const InputBox = styled.TextInput`
  width:100%;
  height:60px;
  border-radius:15px;
  background-color:#fff;
  padding:10px 20px;
  color:${colors.fontMain};
  font-size:16px;
  font-weight:600;
`

const ValidCircle = styled.View`
  width:10px;
  height:10px;
  border-radius:50%;
  background-color:${colors.pointRed};
  position:absolute;
  right:20px;
`

const GoToSignUp = styled.TouchableOpacity`

`

const GoToSignUpText = styled.Text`
  font-weight:500;
  color:${colors.fontMain};
`
