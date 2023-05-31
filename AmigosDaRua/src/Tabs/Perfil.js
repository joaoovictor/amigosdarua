import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import {SafeAreaView,View} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message'


export default function Perfil(){
  const navigation = useNavigation()
  return (
  <SafeAreaView style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
    <AntDesign name='logout' size={50} color="red" onPress={ async () => {
      try{
      await AsyncStorage.removeItem('token')

      navigation.replace('Login')
      Toast.show({
        type: 'success',
        text1: 'Sessão finalizada com sucesso!',
        position: 'bottom',
        visibilityTime: 3000
      });
    }catch(e){
      console.log(e)
    }
    }}/>
  </SafeAreaView>
  )
}