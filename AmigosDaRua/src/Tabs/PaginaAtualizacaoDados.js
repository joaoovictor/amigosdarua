import { SafeAreaView, TextInput, View } from "react-native";
import { Logo, TextCreate } from '../../styles';
import Linha from "../components/Linha";
import { useEffect, useState } from "react";
import api from "../services/api";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PaginaAtualizacaoDados(){
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")
  const [userId, setUserId] = useState("")

  useEffect(() => {
    async function getKey(){
      try{
        const data = await AsyncStorage.getItem('@user')
        const parse = JSON.parse(data)
        setUserId(parse.id)
      }catch(e){
        console.log(e)
      }
    }

    getKey()


      const dados = () => {api.get(`/usuario/${userId}`)
      .then((info) => {
        console.log(info.data.email)
        setEmail(info.data.email)
        setTelefone(JSON.stringify(info.data.telefone))
      }).catch((e) => {
        console.log(e)
      })
      }
      dados()
  }, [])

  

  async function updateUser(){
    const obj = {
      email: email,
      telefone: parseInt(telefone)
    }

    console.log(obj)

    api.put(`/usuario/${userId}`, obj)
    .then(() => {
      Toast.show({
        type: 'success',
        text1: 'Dados atualizados com sucesso',
        position: 'bottom',
        visibilityTime: 3000
      });
    }).catch((e) => {
      console.log(e)
      Toast.show({
        type: 'error',
        text1: 'Erro ao atualizar os dados',
        text2: 'Verifique os dados e tente novamente',
        position: 'bottom',
        visibilityTime: 3000
      });
    })
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',justifyContent: 'center'}}>
          <View>
            <Logo style={{color: '#00101E', fontSize: 21}}>Editar dados</Logo>
          </View>
          <View style={{position: 'absolute', right: 10}}>
            <TextCreate onPress={updateUser}>Salvar</TextCreate>
          </View>
        </View>
        <View style={{flex: 8}}>
          <View>
            <Linha /> 
            <TextInput style={{padding: 20, fontFamily: 'Poppins_500Medium'}} placeholder="Digite o novo email" value={email} onChangeText={setEmail} />
          </View>
          <View>
            <Linha /> 
            <TextInput style={{padding: 20,  fontFamily: 'Poppins_500Medium'}} placeholder="Digite o novo telefone" value={telefone} onChangeText={setTelefone}/>
            <Linha />
          </View>
        </View>
    </SafeAreaView>
  )
}