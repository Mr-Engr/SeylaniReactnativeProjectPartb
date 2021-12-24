import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ContextProvider from './src/context/context';
import Routes from './src/navigation/routes';

export default function App() {
  return (
  <ContextProvider>
      <Routes />
  </ContextProvider>
  )
}


