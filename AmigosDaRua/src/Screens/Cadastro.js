import React, {useState} from "react"
import {View, StyleSheet, SafeAreaView, Image, Text} from 'react-native'
import {Input, Logo, MainButton, SubtitleText, TextButton, TitleText} from "../../styles"
import { useNavigation } from "@react-navigation/native";
import { createResponsavel } from "../services/ResponsavelService"
import Toast from 'react-native-toast-message'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Cadastro(){
  const [email, setEmail] = useState("")
  const [nome, setNome] = useState("")
  const [senha, setSenha] = useState("")
  const [telefone, setTelefone] = useState()
  const [dados, setDados] = useState({})
  const navigation = useNavigation()



  async function createResp(){
    const result = await createResponsavel({
      nome: nome,
      email: email,
      telefone: telefone,
      senha: senha
    })

    if(result){
      AsyncStorage.setItem('@idUsuarioCadastrado', JSON.stringify(result.id))
      
      navigation.replace('CadastroTipoPessoa') 
    } else {
      Toast.show({
        type: 'error',
        text1: 'Erro ao realizar o cadastro',
        text2: 'Verifique suas credencias e tente novamente',
        position: 'bottom',
        visibilityTime: 3000
      });
    }
  }

  return (
    <SafeAreaView style={StylesCadastro.mainView}>
      <View style={StylesCadastro.logoView}>
        <Logo style={{marginTop: 20}}>amigosdarua</Logo>
      </View>
      
      <View style={StylesCadastro.contentView}>
        <Image source={require('../../assets/avatar.png')} style={{alignSelf: 'center'}}/>
        <TitleText>Crie sua conta!</TitleText>
        <SubtitleText>É prático e rápido!</SubtitleText>
        <Input placeholder="Nome completo" value={nome} secureTextEntry={false} onChangeText={setNome} />
        <Input placeholder="Telefone" value={telefone} secureTextEntry={false} onChangeText={setTelefone} />
        <Input placeholder="Email" value={email} secureTextEntry={false} onChangeText={setEmail} />
        <Input placeholder="Senha" value={senha} secureTextEntry={true} onChangeText={setSenha} />
        <MainButton onPress={createResp}>
          <TextButton>Continuar</TextButton>
        </MainButton>
      </View>
    </SafeAreaView>
  )
}

const StylesCadastro = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center'
  },
  logoView: {
    flex: 0
  },
  contentView: {
    flex: 9,
    width: '90%',
    justifyContent: 'space-evenly'
  }
})