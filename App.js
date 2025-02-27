import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddActivityScreen from './screens/AddActivityScreen';
import ActivityDetailScreen from './screens/ActivityDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Listagem">
        <Stack.Screen name="Listagem" component={HomeScreen} />
        <Stack.Screen name="Nova Atividade" component={AddActivityScreen} />
        <Stack.Screen name="Detalhes da Atividade" component={ActivityDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}