import { useNavigation } from "@react-navigation/native"
import { baseUrl } from "../api/baseURL"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserInfoStore, useUserLoginStore } from "../store/userStore";

export const useUser = () => {
  const navigation = useNavigation();
  const {isLogin,setIsLogin} = useUserLoginStore();
  const {userInfo, setUserInfo} = useUserInfoStore();

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
      setIsLogin(true)
      await getUserInfo()
      navigation.reset({
        routes:[{
          name:'Tabs'
        }]
      })

    } catch (error) {
      console.log(error)
    }
  }

  const getUserInfo = async() => {
    try {
      const token = await AsyncStorage.getItem("accessToken")
      const response = await baseUrl.get(`/api/users/me`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      setUserInfo(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = async() => {
    try {
      const token = await AsyncStorage.getItem("accessToken")
      const refreshToken = await AsyncStorage.getItem("refreshToken")
      const response = await baseUrl.post(`/api/users/logout`,{
        refresh:refreshToken
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      setIsLogin(false)
      navigation.reset({
        routes:[{
          name:'Login'
        }]
      })
    } catch (error) {
      console.log(error)
    }
  }

  return{
    handleSignup,
    handleLogin,
    getUserInfo,
    handleLogout
  }
}