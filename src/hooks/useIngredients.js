import AsyncStorage from "@react-native-async-storage/async-storage"
import { baseUrl } from "../api/baseURL"

export const useIngredients = () => {

  const getUserIngredients = async(setIngredientsList) => {
    try {
      const token = await AsyncStorage.getItem("accessToken")
      const response = await baseUrl.get("/api/ingredients/user-ingredients",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      setIngredientsList(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const addUserIngredients = async(ingredientsId, expDate) => {
    try {
      const token = await AsyncStorage.getItem("accessToken")
      const response = await baseUrl.post("/api/ingredients/user-ingredients",{
        ingredients_id:ingredientsId,
        expiration_date:expDate
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteUserIngredients = async(ingredientsId) => {
    try {
      const token = await AsyncStorage.getItem("accessToken")
      const response = await baseUrl.delete(`/api/ingredients/user-ingredients/${ingredientsId}`,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getCartRecommend = async(setIngredients) => {
    try {
      const token = await AsyncStorage.getItem("accessToken")
      const response = await baseUrl.get(`/api/shopping/recommend-ingredients`,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      setIngredients(response.data.recommended_ingredients)
    } catch (error) {
      console.log(error)
    }
  }

  
  return {
    addUserIngredients,
    getUserIngredients,
    deleteUserIngredients,
    getCartRecommend
  }
}
