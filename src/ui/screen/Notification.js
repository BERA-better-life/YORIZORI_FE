
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import { styled } from 'styled-components'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colors } from '../styles/colors';
import { size } from '../styles/size';
import { useNavigation } from '@react-navigation/native';
import MarginVertical from '../components/MarginVertical';


const Notification = () => {
  const navigation = useNavigation();
  const notiArray = [["토마토",3],["쌀국수면",1],["새우", 0]]

  return (
    <SafeAreaView>
      <Body>
        <Header>
          <TouchableOpacity style={{position:'absolute', left:0}} onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" size={24} color={colors.fontMain} />
          </TouchableOpacity>
          <HeaderText>
            알림
          </HeaderText>
        </Header>
        <MarginVertical margin={30}/>
        <ScrollView showsVerticalScrollIndicator={false}>
          {notiArray.map((el,index) => {
            return(
              <NotiEl key={index}>
                <ValidCircle/>
                <View style={{marginLeft:30, gap:5}}>
                  <NotiTitle>유통기한 알림</NotiTitle>
                  <View style={{flexDirection:'row'}}>
                  <NotiText>{`${el[0]} 의 유통기한이 `}</NotiText>
                  <NotiText style={{color:colors.pointRed}}>{`${el[1]} `}</NotiText>
                  <NotiText>{`일 남았어요!`}</NotiText>
                  </View>
                </View>
              </NotiEl>
            )
          } )}
        </ScrollView>
      </Body>
    </SafeAreaView>
  )
}

export default Notification

const Body = styled.View`
  width:${size.width}px;
  min-height:${size.height}px;
  background-color:${colors.bgColor};
  padding:0 40px;
`

const Header = styled.View`
  width:100%;
  height:50px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const HeaderText = styled.Text`
  color:${colors.lightGray};
  font-size:16px;
  font-weight:600;  
`

const ValidCircle = styled.View`
  width:10px;
  height:10px;
  border-radius:50%;
  background-color:${colors.pointRed};
  position:absolute;
  left:20px;
`

const NotiEl = styled.View`
  width:100%;
  background-color:#fff;
  height:65px;
  padding:20px;
  display:flex;
  align-items:center;
  flex-direction:row;
  border-radius:10px;
  margin-bottom:15px;
`

const NotiTitle = styled.Text`
  color:${colors.fontMain};
  font-size:16px;
  font-weight:600;
`

const NotiText = styled.Text`
  color:${colors.fontMain};
  font-weight:600;
`

