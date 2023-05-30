import React, {useState} from "react"
import {View, StyleSheet, SafeAreaView, Image, Text} from 'react-native'
import {MainButton, TextButton ,Input, Logo, SubtitleText, TitleText, YellowSubtitle } from "../../styles"
import { doLogin } from "../services/AuthService"
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function login(){
    const result = await doLogin(email, passoword)
    if(result){
      navigation.replace('Tabs')
    }
  }

  return (
    <SafeAreaView style={stylesLogin.mainView}>
      <View style={stylesLogin.contentView}>
        <View style={{flex: 4, justifyContent: 'space-around'}}>
          <Logo>amigosdarua</Logo>
          <Image source={require('../../assets/lock.png')} style={{alignSelf: 'center'}}/>
          <View>
          <TitleText>Realize seu login!</TitleText>
          <SubtitleText>Keep It Safe!</SubtitleText>
          </View>
          
        </View>
       
        <View style={{width: '90%', flex: 4, justifyContent: 'space-evenly'}}>
          <Input placeholder="Email" secureTextEntry={false} onChangeText={setEmail} />
          <Input placeholder="Senha" secureTextEntry={true} onChangeText={setPassword} />
          <MainButton onPress={() => navigation.replace('Tabs')}> 
            <TextButton>Login</TextButton>
          </MainButton>
          <YellowSubtitle>Esqueceu sua senha?</YellowSubtitle>
        </View>
      </View>

      <View style={stylesLogin.secondView}>
          <SubtitleText>Não possuí conta? <YellowSubtitle>Registrar-se</YellowSubtitle></SubtitleText>
      </View>
    </SafeAreaView>
  )
}

const stylesLogin = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#F2F2F2'
  },
  contentView: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  secondView: {
    flex: 2,
    justifyContent: 'flex-end'
  }
})