import AsyncStorage from "@react-native-async-storage/async-storage"
import { baseUrl } from "../api/baseURL"
import dayjs from "dayjs"

export const useIngredients = () => {
  const today = dayjs().startOf('day')

  const getAllIngredients = async(setAllIngredientsList) => {
    try {
      const allIngredientsList = JSON.parse(await AsyncStorage.getItem("allIngredientsList"))
      if(!allIngredientsList){
      const response = await baseUrl.get("/api/ingredients/all")
      console.log(response.data)
      await AsyncStorage.setItem("allIngredientsList", JSON.stringify(response.data));
      allIngredientsList = response.data
      console.log("!")
      }
      setAllIngredientsList(allIngredientsList)
      
    } catch (error) {
      console.log(error)
    }
  }

  const getUserIngredients = async(setIngredientsList, setExpIngredientsList, isExp) => {
    try {
      const token = await AsyncStorage.getItem("accessToken")
      const response = await baseUrl.get("/api/ingredients/user-ingredients",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      setIngredientsList(response.data)
      if(isExp){
        const expIngredientsList = response.data.filter((el) => {
          const targetDate = dayjs(el.expiration_date).startOf('day');
          const daysLeft = targetDate.diff(today, 'day');
          console.log(targetDate.diff(today, 'day'))
          return daysLeft >= 0 && daysLeft <= 3
        })
        console.log("exp",expIngredientsList)
        setExpIngredientsList(expIngredientsList)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addUserIngredients = async(ingredientsId, expDate) => {
    try {
      const token = await AsyncStorage.getItem("accessToken")
      const response = await baseUrl.post("/api/ingredients/user-ingredients",{
        ingredient_id:ingredientsId,
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
    getAllIngredients,
    addUserIngredients,
    getUserIngredients,
    deleteUserIngredients,
    getCartRecommend
  }
}
