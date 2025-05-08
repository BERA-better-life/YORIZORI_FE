import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../ui/screen/Home";
import MyFridge from "../ui/screen/MyFridge";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, View } from "react-native";
import { colors } from "../ui/styles/colors";
import SearchRecipe from "../ui/screen/SearchRecipe";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MyPage from "../ui/screen/MyPage";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {



  return (
    <Tab.Navigator screenOptions={({route}) => ({
      headerShown:false,
      tabBarShowLabel:false,
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === "HOME") {
          return <View>
          <Entypo name="home" size={32} color={focused ? colors.pointRed : 'white'} />
        </View>;
        } else if (route.name === "MyFridge") {
          return <View><MaterialCommunityIcons name="fridge" size={32} color={focused ? colors.pointRed : 'white'}/></View>;
        } else if (route.name === "Search"){
          return <View><FontAwesome name="search" size={32} color={focused ? colors.pointRed : 'white'} /></View>
        } else if (route.name === "MyPage"){
          return <View><MaterialIcons name="person" size={32} color={focused ? colors.pointRed : 'white'}  /></View>
        }
        return null;
      },
      tabBarItemStyle: {
        height: 100,
      },      
      safeAreaInsets: {
        bottom: 0, // 👈 이거 없으면 iPhone에서 짤림
      },
      tabBarStyle: {
        backgroundColor: '#CDE9FF',
        height: 100,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        borderTopWidth: 0,
        paddingTop:20
      },})}
      >
      <Tab.Screen name="HOME" component={Home} />
      {/* <Tab.Screen name="TODAY" component={Today}/>
      <Tab.Screen name="REPORT" component={Statistic}/>
      <Tab.Screen name="MY" component={MyPage} /> */}
      <Tab.Screen name="MyFridge" component={MyFridge}/>
      <Tab.Screen name="Search" component={SearchRecipe}/>
      <Tab.Screen name="MyPage" component={MyPage}/>
    </Tab.Navigator>
  )
}

export default BottomTabNavigation