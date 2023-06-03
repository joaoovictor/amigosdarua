import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "./api"

export async function doLogin(email, senha){
  if(!email || !senha) return null
  try {
    const result = await api.post('/login', {email, senha})
    //console.log(result)
    return result.data
  }
  catch(error) {
    console.log(error)
    return null
  }
}

export async function getToken(){
  try{
    const usuarioLogado = await AsyncStorage.getItem("@user")
    const dadosParse = JSON.parse(usuarioLogado)
    const {token} = dadosParse
    return token
  }
  catch(e){
    console.log(e)
  }
}

export async function getUserId(){
  try{
    const usuarioLogado = await AsyncStorage.getItem("@user")
    const dadosParse = JSON.parse(usuarioLogado)
    const {id} = dadosParse
    return parseInt(id)
  }
  catch(e){
    console.log(e)
  }
}


