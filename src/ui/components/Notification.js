import React, { useEffect, useRef } from 'react';
import { Button, View, Text } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// 1) 알림 핸들러 설정 (포그라운드에서도 화면에 보이도록)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function IngredientReminder({ userIngredients }) {
  const notificationId = useRef(null);

  // 2) 권한 요청
  useEffect(() => {
    (async () => {
      // if (Constants.isDevice) {    <= 이 줄을 주석 처리
        setTimeout(async () => {
        const { status: existing } = await Notifications.getPermissionsAsync();
        let finalStatus = existing;
        if (existing !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        console.log('권한 상태=', finalStatus);
        if (finalStatus !== 'granted') {
          alert('알림 권한이 필요합니다!');
        }
      }, 10000);
        // }                            <= 그리고 이 줄도 주석 처리
    })();
  }, []);
  
  
  // 3) userIngredients 바뀔 때마다 스케줄 갱신
  useEffect(() => {
    // 기존에 예약해둔 알림이 있으면 취소
    if (notificationId.current) {
      Notifications.cancelScheduledNotificationAsync(notificationId.current);
      notificationId.current = null;
    }

    // 배열에 요소가 있으면, 아침 9시에 반복 예약
    if (userIngredients.length > 0) {
      (async () => {
        setTimeout(async () => {
        const id = await Notifications.scheduleNotificationAsync({
          content: {
            title: '🚨 유통기한 임박 재료 알림',
            body: `${userIngredients.join(" ")}의 유통기한이 3일 남았어요!`,
            data: { type: 'INGREDIENT_REMINDER' },
          },
          trigger: {
            seconds: 30,
            repeats: true,
          },
        });
        notificationId.current = id;
        }, 10000);
      })();
    }
  }, [userIngredients]);

  // (테스트용) 즉시 알림 보내보기
  const onTest = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '테스트 알림',
        body: '5초 뒤에 뜨는 알림입니다.',
      },
      trigger: { seconds: 20 },
    });
  };

  return (
    <View >
      
    </View>
  );
}
