import React, {useEffect, useState} from 'react'
import { SafeAreaView, View, TextInput, StyleSheet} from 'react-native'
import { Logo, TextCreate, SubtitleText } from '../../styles'
import Linha from '../components/Linha'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { apiKeyGoogle } from '../services/api'
import DateTimePicker from '@react-native-community/datetimepicker';
import { createEvento, createLocal } from '../services/EventoService'
import { getToken, getUserId } from '../services/AuthService'
import Toast from 'react-native-toast-message'
import { useNavigation } from "@react-navigation/native";

export default function CadastroEventos(){
    const navigation = useNavigation()
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [local, setLocal] = useState("")
    const [nomeEvento, setNomeEvento] = useState("")
    const [dataInicio, setDataInicio] = useState(new Date())
    const [dataFim, setDataFim] = useState(new Date())
    const [data, setData] = useState(new Date())
    const [token, setToken] = useState("")
    const [userId, setUserId] = useState(0)
    function clearFields(){
      setLat(0)
      setLng(0)
      setLocal("")
      setNomeEvento("")
      setDataInicio(new Date())
      setDataFim(new Date())
      setData(new Date())
    }


    useEffect(() => {
      getToken().then((info) => {
        setToken(info)
      })
  
      getUserId().then((info) => {
        setUserId(info)
      })
    }, [])
    
    
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    async function createEvent(){
      let horaInicioo = new Date(data)
      horaInicioo.setHours(dataInicio.getHours());
      horaInicioo.setMinutes(dataInicio.getMinutes());
      horaInicioo.setSeconds(dataInicio.getSeconds());

      let horaFimm = new Date(data)
      horaFimm.setHours(dataFim.getHours());
      horaFimm.setMinutes(dataFim.getMinutes());
      horaFimm.setSeconds(dataFim.getSeconds());
      const idLocal = await createLocal({
        nome: local,
        latitude: lat,
        longitude: lng
      }, config)
      const result = await createEvento({
        nome: nomeEvento,
        horaInicio: horaInicioo,
        horaFim: horaFimm,
        tipo: "OUTROS",
        idUsuario: userId,
        idLocal: idLocal
      }, config)

      if(result){
        navigation.navigate('Eventos') 
        Toast.show({
          type: 'success',
          text1: 'Evento cadastrado com sucesso',
          position: 'bottom',
          visibilityTime: 3000
        });

        clearFields()
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
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',justifyContent: 'center'}}>
          <View>
            <Logo style={{color: '#00101E', fontSize: 21}}>Novo Evento</Logo>
          </View>
          <View style={{position: 'absolute', right: 10}}>
            <TextCreate onPress={createEvent}>Criar Evento</TextCreate>
          </View>
        </View>
        <View style={{flex: 8}}>
        <Linha/>
          <View style={stylesIn.viewInput}>
            <EvilIcons name='comment' color='#FFD555' size={25}/>
            <TextInput style={stylesIn.input}  placeholder='Digite o titulo do evento' value={nomeEvento} onChangeText={setNomeEvento}/>
          </View>
          <Linha/>
          <View  style={stylesIn.viewInput}>
            <EvilIcons name='location' color='#FFD555' size={25}/>
                <GooglePlacesAutocomplete
                placeholder="Selecione a localização do evento"
                query={{key: apiKeyGoogle}}
                onPress={(data, details) => {
                  setLat(details.geometry.location.lat)
                  setLng(details.geometry.location.lng)
                  setLocal(data.description)
                }}
                fetchDetails={true}
                onFail={error => console.log(error)}
                onNotFound={() => console.log('Sem resultados')}
                styles={
                  {
                  textInput: {
                    paddingRight: 20,
                    backgroundColor: '#F2F2F2',
                    fontFamily:  'Poppins_600SemiBold',
                    paddingVertical: 0,
                    fontSize: 14,
                    height: 14
                  }, 

                  textInputContainer: {
                    backgroundColor: '#F2F2F2',

                  },
                  
                    row: {
                      backgroundColor: '#FaFaFa',
                    }
                  }
                }
              />
        
          </View>
          <Linha/>
          <View style={stylesIn.viewInput}>
            <EvilIcons name='calendar' color='#FFD555' size={25}/>
            <SubtitleText style={{fontSize: 14}}>Selecione a data do evento</SubtitleText>
            <DateTimePicker 
            mode='date'
            locale="pt-BR"  
            is24Hour={true}
            value={data} 
            onChange={(event, selectedDate) => {
              setData(selectedDate)
            }} />
          </View>
          <Linha/>
          <View style={stylesIn.viewInput}>
            <EvilIcons name='clock' color='#FFD555' size={25}/>
            <SubtitleText style={{fontSize: 14}}>Selecione o horário de início do evento</SubtitleText>
            <DateTimePicker 
            mode='time'  
            locale="pt-BR" 
            is24Hour={true}
            value={dataInicio} 
            onChange={(event, selectedDate) => {
              setDataInicio(selectedDate)
            }} />
          </View>
          <Linha/>
          <View style={stylesIn.viewInput}>
            <EvilIcons name='clock' color='#FFD555' size={25}/>
            <SubtitleText style={{fontSize: 14}}>Selecione o horário de início do evento</SubtitleText>
            <DateTimePicker 
            mode='time'
            locale="pt-BR"  
            is24Hour={true}
            value={dataFim} 
            onChange={(event, selectedDate) => {
              
              setDataFim(selectedDate)
            }} />
          </View>
          <Linha/>
          <View style={stylesIn.viewInput}>
            <MaterialCommunityIcons name="target" color="#FFD555" size={22}/>
            <TextInput style={stylesIn.input}  placeholder='Selecione o objetivo do evento'/>
          </View>
          <Linha/>
        </View>
      </SafeAreaView>
    )
  }

const stylesIn = StyleSheet.create({
  input: {
    fontFamily:  'Poppins_600SemiBold',
    fontSize: 14,
    
  },

  viewInput: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  }
})                                             