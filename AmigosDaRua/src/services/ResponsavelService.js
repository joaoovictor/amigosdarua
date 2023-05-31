import api from "./api"

export async function createResponsavel(usuario){
  if(!usuario) return null

  try{
    const resultado = await api.post('/registrar', usuario)
    console.log(resultado.data)
    return resultado.data
  } catch(error){
    console.log(error)
    return null
  }
}