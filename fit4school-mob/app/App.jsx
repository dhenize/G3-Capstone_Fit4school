import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Logout from './screens/landing';  // i-adjust ang path base sa structure mo
import SignupScreen from './screens/signup';  // i-adjust ang path base sa structure mo

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="landing">
        <Stack.Screen 
          name="landing" 
          component={Logout} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="signup" 
          component={SignupScreen} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}