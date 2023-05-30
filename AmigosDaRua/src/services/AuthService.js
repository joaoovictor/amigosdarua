import api from "./api"

export async function doLogin(email, password){
  if(!email || !senha) return null
  try {
    const result = await api.post('/login', {email, password})
    console.log(resultado)
    return result.data
  }
  catch(error) {
    console.log(error)
    return null
  }
}