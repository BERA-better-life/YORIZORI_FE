import AsyncStorage from "@react-native-async-storage/async-storage"
import { baseUrl } from "../api/baseURL"

export const useRecipe = () => {

  const handleSearchRecipeForUser = async(ingredientsText,sortMethod) => {
    try {
      const token = await AsyncStorage.getItem("accessToken")
      const response = await baseUrl.post("/api/recipes/recommend/",{
        ingredients:ingredientsText,
        sort_by:sortMethod
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearchRecipeForNonUser = async(ingredientsText, excludedIngredientsText,setRecipeList) => {
    try {
      const token = await AsyncStorage.getItem("accessToken")
      const response = await baseUrl.post("/api/recipes/recommend/exclude/",{
        ingredients:ingredientsText,
        excluded_ingredients: excludedIngredientsText
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      setRecipeList(response.data)
    } catch (error) {
      
    }
  }

  const getDetailRecipe = async(recipeNum, setRecipeInfo) => {
    try {
      const token = await AsyncStorage.getItem("accessToken")
      const response = await baseUrl.get(`/api/recipes/recipe/${recipeNum}/`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      setRecipeInfo([response.data])
    } catch (error) {
      console.log(error)
    }
  }
  

  return {
    handleSearchRecipeForNonUser,
    handleSearchRecipeForUser,
    getDetailRecipe
  }
}
