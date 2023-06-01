import React, {useState, useEffect} from "react"
import {View, StyleSheet, SafeAreaView, Image, Text} from 'react-native'
import {MainButton, TextButton ,Input, Logo, SubtitleText, TitleText, YellowSubtitle } from "../../styles"
import { doLogin } from "../services/AuthService"
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message'
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function Login() {
  const navigation = useNavigation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function verificarLogin(){
      const usuario = await AsyncStorage.getItem('@user')
      if(usuario){
        const parse = JSON.parse(usuario)
      const {token} = parse
      if(token){
        navigation.replace('Tabs')
      }
      setCarregando(false)
      } 
      
    }
    verificarLogin()
  },[])

  async function login(){
    const result = await doLogin(email, password)
    if(result){
      const { token } = result
      const { idUsuario } = result
      const tokenDecodificado = jwtDecode(token.token)
      const usuario = {
        id:idUsuario,
        email: tokenDecodificado.sub,
        token: token.token
      }
      AsyncStorage.setItem('@user', JSON.stringify(usuario))
      navigation.replace('Tabs')
    } else {
      Toast.show({
        type: 'error',
        text1: 'Erro ao realizar o login',
        text2: 'Verifique suas credencias e tente novamente',
        position: 'bottom',
        visibilityTime: 3000
      });
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
          <Input placeholder="Email" value={email} secureTextEntry={false} onChangeText={setEmail} />
          <Input placeholder="Senha" value={password} secureTextEntry={true} onChangeText={setPassword} />
          <MainButton onPress={login}> 
            <TextButton>Login</TextButton>
          </MainButton>
          <YellowSubtitle>Esqueceu sua senha?</YellowSubtitle>
        </View>
      </View>

      <View style={stylesLogin.secondView}>
          <SubtitleText>Não possuí conta? <YellowSubtitle onPress={() => navigation.navigate('Cadastro')}>Registrar-se</YellowSubtitle></SubtitleText>
      </View>
    </SafeAreaView>
    
  )
}

const stylesLogin = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
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