import AsyncStorage from "@react-native-async-storage/async-storage"
import { baseUrl } from "../api/baseURL"

export const useNotification = () => {

  const handleNotification = async() => {
    try {
      const token = await AsyncStorage.getItem("accessToken")
      const response = await baseUrl.post("/api/expiration/notify",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      
    } catch (error) {
      console.log(error)
    }
  }

  return {
    handleNotification
  }
}
