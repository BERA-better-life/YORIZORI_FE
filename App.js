import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from './src/ui/styles/colors';
import Home from './src/ui/screen/Home';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
import IngredientReminder from './src/ui/components/Notification';
import { useIngredients } from './src/hooks/useIngredients';
import { useEffect, useState } from 'react';

export default function App() {
  return (
    <NavigationContainer>
      
    <View style={{backgroundColor:colors.bgColor,flex: 1}}>
      <StackNavigation/>
    </View>
    </NavigationContainer>
  );
}
