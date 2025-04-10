import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../ui/screen/Home";
import MyFridge from "../ui/screen/MyFridge";


const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {



  return (
    <Tab.Navigator screenOptions={({route}) => ({
      headerShown:false})}>
      <Tab.Screen name="HOME" component={Home} />
      {/* <Tab.Screen name="TODAY" component={Today}/>
      <Tab.Screen name="REPORT" component={Statistic}/>
      <Tab.Screen name="MY" component={MyPage} /> */}
      <Tab.Screen name="MyFridge" component={MyFridge}/>
    </Tab.Navigator>
  )
}

export default BottomTabNavigation