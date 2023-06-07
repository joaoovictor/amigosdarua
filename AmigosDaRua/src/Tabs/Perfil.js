import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import {SafeAreaView,View, Text,  FlatList} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message'
import Avatar from '../components/Avatar';
import coala from '../../assets/coala.jpg'
import Feather from 'react-native-vector-icons/Feather'
import Linha from '../components/Linha';
import { SubtitleText } from '../../styles';





export default function Perfil(){
  const navigation = useNavigation()
  
  const getMyKey = async () => {
      try{
        const data = await AsyncStorage.getItem('@user')
        return data
        console.log(data)
      }catch(e){
        console.log(e)
      }
  }
  
getMyKey()

  return (
    <SafeAreaView style={{alignItems: 'center', flex: 1}}>
      <View style={{width: '85%',flexDirection: 'row', alignItems: 'center', flex: 1,justifyContent: 'space-between'}}>
        <View>
          <Avatar size={90}  image={coala} />
        </View>
        <View>
            <Feather name='log-out' size={32} color="#E06469" onPress={ async () => {
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
      </View>
      <View style={{flex: 8, width: '100%', marginTop: 40}}>
        <Linha style={{}}/>
        <View style={{padding: 15, flexDirection:'row', alignItems: 'center'}}>
          <AntDesign name='key' size={20} color="#FFD555"/>
          <SubtitleText style={{textAlign: 'left', marginLeft: 10}} onPress={() => {
            navigation.navigate('EditarDados')
          }}>Editar Dados</SubtitleText>
        </View>
        <Linha/>
        <View style={{padding: 15, flexDirection:'row'}}>
          <AntDesign name='form' size={20} color="#FFD555" ></AntDesign>
          <SubtitleText style={{textAlign: 'left', marginLeft: 10}}>Trocar senha</SubtitleText>
        </View>
        <Linha/>
      </View>
    </SafeAreaView>
  )
}