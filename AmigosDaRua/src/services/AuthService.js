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

