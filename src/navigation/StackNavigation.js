import { createStackNavigator } from "@react-navigation/stack"
import BottomTabNavigation from "./BottomTabNavigation";
import AddFreezerEl from "../ui/screen/AddFreezerEl";
import PickExpDate from "../ui/screen/PickExpDate";


const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown:false,
    }}
    initialRouteName='Tabs' 
    >
      <Stack.Screen name="Tabs" component={BottomTabNavigation}/>
      <Stack.Screen name="AddFreezerEl" component={AddFreezerEl}/>
      <Stack.Screen name="PickExpDate" component={PickExpDate}/>
    </Stack.Navigator>
  )
}

export default StackNavigation