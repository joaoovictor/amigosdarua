import api from "./api"



export async function doPost(endpoint, param){
  try{
    const resultado = await api.post(endpoint, param)
    return resultado.data
  }catch(e){
    console.log(e)
  }
}

export async function createPessoaFisica(pessoaFisica){
  if (!pessoaFisica) return null
  const resultado = await doPost('/pessoafisica', pessoaFisica)
  console.log(resultado)
  return resultado
}

export async function createPessoaJuridica(pessoaJuridica){
  if (!pessoaJuridica) return null
  const resultado = await doPost('/pessoajuridica', pessoaJuridica)
  console.log(resultado)
  return resultado
}