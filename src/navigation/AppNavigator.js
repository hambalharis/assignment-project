import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Posts from '../screens/Posts';
import PostDetails from '../screens/PostDetails';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const openConfig = {
    animation: 'timing',
    config: {
      stiffness: 1000,
      damping: 50,
      mass: 3,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Posts"
        screenOptions={{
          headerTitleAlign: 'center',
          transitionSpec: {
            open: openConfig,
            close: openConfig,
          },
        }}>
        <Stack.Screen name="Posts" component={Posts} />
        <Stack.Screen name="PostDetails" component={PostDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
