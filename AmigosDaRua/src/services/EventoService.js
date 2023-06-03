import api from "./api";

export async function createLocal(local, config){
  if(!local) return null
  try{
    const resultado = await api.post('/local', local,config)
    console.log(resultado.data)
    return resultado.data.id
  }catch(e){
    console.log(e)
  }
}

export async function createEvento(evento, config){
  if(!evento) return null
  try{
    const resultado = await api.post('/evento', evento, config)
    console.log(resultado.data)
    return resultado.data
  }catch(e){
    console.log(e)
  }
}