import { useNavigation } from "@react-navigation/native"
import { baseUrl } from "../api/baseURL"
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useUser = (email, userName, password) => {
  const navigation = useNavigation();

  const handleSignup = async(userInfo) => {
    try {
      const response = await baseUrl.post("/api/users/register",{
        email:userInfo.id,
        username:userInfo.userName,
        password:userInfo.password
      })
      console.log(response.data)
      navigation.reset({
        routes:[{
          name:'Login'
        }]
      })
    } catch (error) {
      console.log(error)
    }

  }

  const handleLogin = async(email,password) => {
    try {
      const response = await baseUrl.post("/api/users/login",{
        email:email,
        password:password
      })
      console.log(response.data);
      const {access, refresh} = response.data;
      await AsyncStorage.setItem("accessToken", access);
      await AsyncStorage.setItem("refreshToken",refresh)
      navigation.reset({
        routes:[{
          name:'Tabs'
        }]
      })
    } catch (error) {
      console.log(error)
    }
  }

  return{
    handleSignup,
    handleLogin
  }
}