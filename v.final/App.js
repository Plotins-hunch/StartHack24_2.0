import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LandingPage from './LandingPage';
import Chat from './Chat';
import Data from './Data';
import TestGPT from './TestGPT';



// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Data" component={Data} />
        <Tab.Screen name="LandigPage" component={LandingPage} />
        <Tab.Screen name="Chat" component={TestGPT} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}