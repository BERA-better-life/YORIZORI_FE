import React, { useState } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components/native';
import { FlatList, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colors } from '../styles/colors';
import MarginVertical from './MarginVertical';

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  const startDay = startOfMonth.day(); // 0: 일 ~ 6: 토
  const daysInMonth = endOfMonth.date();

  // 날짜 배열 만들기 (앞의 빈칸 + 실제 날짜)
  const daysArray = [];
  for (let i = 0; i < startDay; i++) {
    daysArray.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => prev.subtract(1, 'month'));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => prev.add(1, 'month'));
  };

  return (
    <Container>
      {/* 상단 화살표 및 월 텍스트 */}
      <Header>
        <CalandarPicker>
          <ArrowButton onPress={goToPreviousMonth}>
            <FontAwesome name="arrow-left" size={24} color={colors.fontMain} />
          </ArrowButton>
          <Text style={{ color: colors.fontMain, fontSize: 16, fontWeight: '600' }}>
            {currentMonth.format('YYYY년 M월')}
          </Text>
          <ArrowButton onPress={goToNextMonth}>
            <FontAwesome name="arrow-right" size={24} color={colors.fontMain} />
          </ArrowButton>
        </CalandarPicker>
      </Header>

      {/* 요일 헤더 */}
      <MarginVertical margin={20} />
      <WeekRow>
        {['일', '월', '화', '수', '목', '금', '토'].map(day => (
          <WeekDay
            key={day}
            style={{
              color:
                day === '일'
                  ? colors.pointRed
                  : day === '토'
                  ? colors.pointBlue
                  : colors.fontMain,
            }}
          >
            {day}
          </WeekDay>
        ))}
      </WeekRow>

      {/* 날짜 그리드 */}
      <View
        style={{
          flexDirection: 'row',
          gap: 3,
          width: '100%',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <FlatList
          data={daysArray}
          keyExtractor={(_, index) => index.toString()}
          numColumns={7}
          scrollEnabled={false}
          renderItem={({ item }) => {
            const currentDate = item ? currentMonth.date(item) : null;
            const isSelected =
              item &&
              selectedDate &&
              selectedDate.format('YYYY-MM-DD') === currentDate.format('YYYY-MM-DD');

            return (
              <DateCell
                onPress={() => {
                  if (item) {
                    setSelectedDate(currentMonth.date(item));
                  }
                }}
                style={{
                  backgroundColor: isSelected ? colors.pointOrange : 'white',
                }}
              >
                <DateText style={{ color: isSelected ? 'white' : colors.fontMain }}>
                  {item ?? ''}
                </DateText>
              </DateCell>
            );
          }}
        />
      </View>
    </Container>
  );
};

export default Calendar;

const Container = styled.View`
  padding: 16px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const CalandarPicker = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

const ArrowButton = styled.TouchableOpacity``;

const WeekRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const WeekDay = styled.Text`
  width: 14.2%;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
`;

const DateCell = styled.TouchableOpacity`
  width: 11%;
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  margin: 5px;
`;

const DateText = styled.Text`
  font-size: 16px;
  font-weight: 500;
`;
