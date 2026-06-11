/**
 * Navegação principal do aplicativo
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '@/types';
import { WelcomeScreen } from '@/screens/onboarding/WelcomeScreen';
import { CreateProfileScreen } from '@/screens/profile/CreateProfileScreen';
import { HomeScreen } from '@/screens/home/HomeScreen';
import { GameScreen } from '@/screens/game/GameScreen';
import { GameResultsScreen } from '@/screens/game/GameResultsScreen';
import { ProgressScreen } from '@/screens/progress/ProgressScreen';
import { SettingsScreen } from '@/screens/settings/SettingsScreen';
import { ParentDashboardScreen } from '@/screens/parent/ParentDashboardScreen';

// Placeholder screens - serão implementados depois
const PlaceholderScreen = () => null;

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

/**
 * Navegação por tabs (Home, Progress, Settings)
 */
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6B9D',
        tabBarInactiveTintColor: '#B2BEC3',
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color }) => null, // TODO: Add icon
        }}
      />
      <Tab.Screen
        name="ProgressTab"
        component={ProgressScreen}
        options={{
          tabBarLabel: 'Progresso',
          tabBarIcon: ({ color }) => null, // TODO: Add icon
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Ajustes',
          tabBarIcon: ({ color }) => null, // TODO: Add icon
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * Navegação principal com stack
 */
export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Onboarding" component={WelcomeScreen} />
      <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
      <Stack.Screen name="Home" component={MainTabs} />
      <Stack.Screen name="Game" component={GameScreen} />
      <Stack.Screen name="GameResults" component={GameResultsScreen} />
      <Stack.Screen name="Profile" component={PlaceholderScreen} />
      <Stack.Screen name="EditProfile" component={PlaceholderScreen} />
      <Stack.Screen name="Progress" component={ProgressScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="ParentDashboard" component={ParentDashboardScreen} />
      <Stack.Screen name="RewardShop" component={PlaceholderScreen} />
      <Stack.Screen name="DailyChallenge" component={PlaceholderScreen} />
    </Stack.Navigator>
  );
}

/**
 * Container de navegação
 */
export function AppNavigator() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
