import { createStackNavigator } from "@react-navigation/stack"
import BottomTabNavigation from "./BottomTabNavigation";
import AddFreezerEl from "../ui/screen/AddFreezerEl";
import PickExpDate from "../ui/screen/PickExpDate";
import Login from "../ui/screen/Login";
import Signup from "../ui/screen/Signup";
import RecipeList from "../ui/screen/RecipeList";
import DetailRecipe from "../ui/screen/DetailRecipe";


const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown:false,
    }}
    initialRouteName='Login' 
    >
      <Stack.Screen name="Tabs" component={BottomTabNavigation}/>
      <Stack.Screen name="AddFreezerEl" component={AddFreezerEl}/>
      <Stack.Screen name="PickExpDate" component={PickExpDate}/>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Signup" component={Signup}/>
      <Stack.Screen name="RecipeList" component={RecipeList}/>
      <Stack.Screen name="DetailRecipe" component={DetailRecipe}/>
    </Stack.Navigator>
  )
}

export default StackNavigation