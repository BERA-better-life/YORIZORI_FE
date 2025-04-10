import { createStackNavigator } from "@react-navigation/stack"
import BottomTabNavigation from "./BottomTabNavigation";


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
    </Stack.Navigator>
  )
}

export default StackNavigation