import React, { useEffect, useState } from 'react'
import {View, SafeAreaView, Text, ScrollView} from 'react-native'
import Avatar from '../components/Avatar';
import image from '../../assets/dog.jpg'
import pato from '../../assets/pato.jpg'
import gato from '../../assets/gato.jpg'
import sapo from '../../assets/sapo.jpg'
import coala from '../../assets/coala.jpg'
import cachorro from '../../assets/dog.jpg'
import { Logo } from '../../styles';
import CardEvento from '../components/CardEvento';
import banner from '../../assets/banner.png'
import api from '../services/api';

const eventosExemplo = [
   {
    "id": 1,
    "nome": "João Silva",
    "titulo": "Celebração dos 30 anos",
    "data": "10 de junho de 2023",
    "horaInicio": "19:00",
    "horafim": "23:00",
    "endereco": "Rua Principal, 123",
    "tipoEvento": "Outros"
  },
   {
    "id": 2,
    "nome": "José Costa",
    "titulo": "Inovação e Futuro Digital",
    "data": "15 de setembro de 2023",
    "horaInicio": "09:00",
    "horafim": "18:00",
    "endereco": "Centro de Convenções, Avenida das Tecnologias, 456",
    "tipoEvento": "Outros"
  },
   {
    "id": 3,
    "nome": "WhindersonNu",
    "titulo": "Expressões Criativas",
    "data": "25 de julho de 2023",
    "horaInicio": "14:00",
    "horafim": "20:00",
    "endereco": "Galeria de Arte Moderna, Praça das Artes, 789",
    "tipoEvento": "Outros"
  },
   {
    "id": 4,
    "nome": "Larissa Feitosa",
    "titulo": "Segredos da Cozinha",
    "data": "5 de agosto de 2023",
    "horaInicio": "16:00",
    "horafim": "19:00",
    "endereco": "Espaço Gourmet, Rua dos Chefs, 321",
    "tipoEvento": "Outros"
  },
  {
    "id": 5,
    "nome": "Malcom",
    "titulo": "Noite de Improvisação",
    "data": "18 de outubro de 2023",
    "horaInicio": "20:30",
    "horafim": "23:30",
    "endereco": "Teatro Municipal, Avenida das Artes, 567",
    "tipoEvento": "Outros"
  }
]


export default function Eventos(props){
  const [eventos, setEventos] = useState([])
  
  useEffect(() => {

    fetchData()
    
  }, [eventos])
  
  const fetchData = async () => {
    try{
      const response = await api.get('/evento/disponivel', {params: {
        size: 8
      }})
      const jsonData = await response.data._embedded.getEventoModelList
      setEventos(jsonData)
    }catch(e){
      console.log(e) }
  }

  return (
  <SafeAreaView style={{flex: 1}}>
    <View style={{flex: 1,flexDirection: 'row', alignItems: 'center'}}>
      <View style={{marginLeft: 20}}>
        <Avatar size={50}  image={image} />
      </View>
      <View style={{flex: 1, marginRight: 60}}>
        <Logo>amigosdarua</Logo>
      </View>
    </View>
    <View style={{flex: 8, marginTop: 10}}>
        <ScrollView indicatorStyle='white' style={{padding: 15}} >
        {eventosExemplo.map((item, i) => {
            return <CardEvento key={item.id}  resp={item.nome} image={pato} nomeEvento={item.titulo}  banner={banner} tipoEvento={item.tipoEvento} horarioInicio={item.horaInicio} horarioFinal={item.horafim} endereco={item.endereco}/>
          })} 

        </ScrollView>
    </View>
  </SafeAreaView>
  )
}