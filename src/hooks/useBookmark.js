import AsyncStorage from "@react-native-async-storage/async-storage"
import { baseUrl } from "../api/baseURL"

export const useBookMark = () => {
  const getBookmarksList = async(setBookmarkList) => {
    try {
      const token = await AsyncStorage.getItem("accessToken")
      const response = await baseUrl.get("/api/favorite/bookmarks",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      setBookmarkList(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  //즐겨찾기 추가 및 삭제 모두 같은 api 사용(토글형식)
  const handleBookmarksList = async(recipeNum) => {
    try {
      const token = await AsyncStorage.getItem("accessToken")
      const response = await baseUrl.post(`/api/favorite/bookmarks/${recipeNum}`,{},{
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
    getBookmarksList,
    handleBookmarksList
  }
}