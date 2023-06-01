import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import {SafeAreaView,View, Text,  FlatList} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message'
import Avatar from '../components/Avatar';

const image = {uri: 'https://www.asiamediajournal.com/wp-content/uploads/2022/10/Dog-Cool-PFP.jpg'}




export default function Perfil(){
  const navigation = useNavigation()
  
  const getMyKey = async () => {
      try{
        const data = await AsyncStorage.getItem('@user')
        console.log(data)
      }catch(e){
        console.log(e)
      }
  }
  
getMyKey()

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
    <AntDesign name='logout' size={50} color="red" onPress={ async () => {
      try{
      await AsyncStorage.removeItem('@user')

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
    </View>
  )
}