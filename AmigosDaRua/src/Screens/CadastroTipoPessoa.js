import React, {useEffect, useState} from 'react'
import {View, SafeAreaView, Text} from 'react-native'
import { Input, Logo, MainButton, SubtitleText, TextButton, TitleText } from '../../styles'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DateTimePicker from '@react-native-community/datetimepicker';
import { createPessoaFisica, createPessoaJuridica } from '../services/TipoPessoaService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'
import { useNavigation } from "@react-navigation/native";
import { format } from 'date-fns';

export function CadastroPj(props){

  return (
    <View style={{justifyContent: 'space-evenly', flex: '1'}}>
      <Input placeholder="CNPJ" value={props.cnpjProps}  onChangeText={props.setCnpjProps} />
      <Input placeholder="Nome Fantasia" value={props.nmFantasiaProps}  onChangeText={props.setNmFantasiaProps} />
      <Input placeholder="Inscrição estadual" value={props.insMunicipalProps}  onChangeText={props.setInsMunicipalProps} />
      <Input placeholder="Ramo da atividade" value={props.ramoAtividadeProps}  onChangeText={props.setRamoAtividadeProps} />
    </View>
  )
}

export function CadastroPf(props){
  
  
  
  return (
    <View style={{justifyContent: 'space-evenly', flex: '1'}}>
      <Input placeholder="RG" value={props.rgProps}  onChangeText={props.setRgProps} />
      <Input placeholder="CPF" value={props.cpfProps}  onChangeText={props.setCpfProps} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <SubtitleText style={{fontSize: 14}}>Selecione sua data de nascimento: </SubtitleText>
          <DateTimePicker 
          mode='date'  
          value={new Date()} 
          onChange={(event, selectedDate) => {
            const formattedDate = format(selectedDate, 'yyyy-MM-dd');
            console.log(formattedDate)
            props.setDataNascimentoProps(formattedDate)
          }}
           />
      </View>
    </View>
  )
}

export default function CadastroTipoPessoa(props){
    const navigation = useNavigation()
    const [isPf, setPf] = useState(false)
    const [isPj, setPj] = useState(false)
    const [rg, setRg] = useState("")
    const [cpf, setCpf] = useState("")
    const [insMunicipal, setInsMunicipal] = useState("")
    const [nmFantasia, setNmFantasia] = useState("")
    const [ramoAtividade, setRamoAtivodade] = useState("")
    const [cnpj, setCnpj] = useState("")
    const [idUserr, setIdUserr] = useState(); 
    const [dataNascimentoGlobal, setDataNascimentoGlobal] = useState("")


    useEffect(() => {
      AsyncStorage.getItem("@idUsuarioCadastrado")
      .then((info) => {
        const id = info
        console.log(id)
        setIdUserr(id)
      }).catch((e) => {
        
      }, [])
    }, [])
      
    async function createPf(){
      
      const pessoaFisica = {
        rg: rg,
        cpf: cpf,
        dataNascimento: dataNascimentoGlobal,
        idUsuario: idUserr,
      }
      const result = await createPessoaFisica(pessoaFisica)
      if(result){
        navigation.replace('Login')
        Toast.show({
          type: 'success',
          text1: 'Seu cadastro foi realizado com sucesso!',
          text2: 'Você já pode realizar seu login.',
          position: 'bottom',
          visibilityTime: 3000
        });
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

    async function createPj(){
      const pessoaJuridica = {
        cnpj: cnpj,
        nomeFantasia: nmFantasia,
        inscricaoMunicipal: insMunicipal,
        ramoAtividade: ramoAtividade,
        idUsuario: idUserr
      }
      const result = await createPessoaJuridica(pessoaJuridica)
      if(result){
        navigation.replace('Login')
        Toast.show({
          type: 'success',
          text1: 'Seu cadastro foi realizado com sucesso!',
          text2: 'Você já pode realizar seu login.',
          position: 'bottom',
          visibilityTime: 3000
        });
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
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <View style={{flex: 2, justifyContent: 'space-around'}}>
        <Logo>amigosdarua</Logo>
        <TitleText>Você é uma pessoa física ou jurídica?</TitleText>
      </View>

      <View style={{flex: 7, width: '90%'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', flex: 2, alignItems: 'center'}}>
          <View style={{alignItems: 'center'}}>
            <BouncyCheckbox
            isChecked={isPf}
            disableBuiltInState
            fillColor='#0073D8'
            innerIconStyle={{
              borderRadius: 4, // to make it a little round increase the value accordingly
            }}
            iconStyle={{
              borderRadius: 4, 
            }}
            style={{marginLeft: 18}}
            onPress={() => {
              setPf(!isPf) 
              setPj(false)
            }} />
            <SubtitleText>Pessoa Física</SubtitleText>
          </View>
          <View style={{alignItems: 'center'}}>
            <BouncyCheckbox 
            isChecked={isPj}
            disableBuiltInState
            fillColor='#0073D8'
            innerIconStyle={{
              borderRadius: 4, // to make it a little round increase the value accordingly
            }}
            iconStyle={{
              borderRadius: 4, 
            }}
            style={{marginLeft: 17}}
            onPress={() => {
              setPj(!isPj)
              setPf(false)
            }}
            />
            <SubtitleText>Pessoa Jurídica</SubtitleText>
          </View>
        </View>
        <View style={{flex: 7}}>
          {isPj ?  
          <CadastroPj 
          cnpjProps={cnpj} 
          setCnpjProps={setCnpj} 
          nmFantasiaProps={nmFantasia} 
          setNmFantasiaProps={setNmFantasia} 
          insMunicipalProps={insMunicipal} 
          setInsMunicipalProps={setInsMunicipal}
          ramoAtividadeProps={ramoAtividade}
          setRamoAtividadeProps={setRamoAtivodade} /> 
          :  
          <CadastroPf 
          setDataNascimentoProps={setDataNascimentoGlobal} 
          rgProps={rg} 
          setRgProps={setRg} 
          cpfProps={cpf} 
          setCpfProps={setCpf}/>}
        </View>
        <View style={{flex: 1}}>
          <MainButton onPress={isPf ? createPf : createPj}>
            <TextButton>Cadastrar</TextButton>
          </MainButton>
        </View>
      </View>
      <View style={{flex: 2}}>
      
      </View>
    </SafeAreaView>
     )                                               
}