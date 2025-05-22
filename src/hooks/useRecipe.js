import AsyncStorage from "@react-native-async-storage/async-storage"
import { baseUrl } from "../api/baseURL"
import { useNavigation } from "@react-navigation/native"

export const useRecipe = () => {
  const navigation = useNavigation();

  const handleSearchRecipeForUser = async(setRecipeList, sort, keyword, type, setIsFinishied) => {
    try {
      const token = await AsyncStorage.getItem("accessToken")
      const response = await baseUrl.post("/api/recipes/recommend/",{
        
        sort_by: sort,
        rcp_keyword: keyword,
        rcp_type: type
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(sort,keyword, type)
      console.log(response.data)
      setRecipeList(response.data)
      setIsFinishied(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearchRecipeForNonUser = async(ingredientsText, excludedIngredientsText,setRecipeList, version, sort,keyword,type, setIsFinishied) => {
    try {
      
      const token = await AsyncStorage.getItem("accessToken")
      const response = await baseUrl.post("/api/recipes/recommend/exclude/",{
        ingredients:ingredientsText,
        excluded_ingredients: excludedIngredientsText,
        sort_by: sort,
        rcp_keyword: keyword,
        rcp_type: type
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      if(version !== "cart"){
        navigation.navigate("RecipeList", {recipeList :response.data, ingredientsText:ingredientsText, excludedIngredientsText:excludedIngredientsText})
        setIsFinishied(true)
      }
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
