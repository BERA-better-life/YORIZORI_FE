import AsyncStorage from "@react-native-async-storage/async-storage"
import { baseUrl } from "../api/baseURL"

export const useLike = () => {
  
  const getLikeList = async(setLikeList) => {
    try {
      const token = await AsyncStorage.getItem("accessToken")
      const response = await baseUrl.get("/api/favorite/likes",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      setLikeList(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  //좋아요 추가 및 삭제 모두 같은 api사용(토글형식)
  const handleLikeList = async(recipeNum) => {
    try {
      const token = await AsyncStorage.getItem("accessToken")
      const response = await baseUrl.post(`/api/favorite/likes/${recipeNum}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }


  return{
    getLikeList,
    handleLikeList
  }
}