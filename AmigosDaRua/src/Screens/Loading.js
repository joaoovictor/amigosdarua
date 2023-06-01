import React from "react";
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';

export default function Loading(){
  return (
    <SafeAreaView style={{backgroundColor: '#F2F2F2', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#0073D8" />
    </SafeAreaView>
  )
}