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
export default function Eventos(props){
  const [eventos, setEventos] = useState([])

  useEffect(() => {
    api.get('/eventos')
    .then((info) => {
      setEventos(info)
    }).catch((e) => {
      
    })
  }, [])
  
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
          {/* <CardEvento resp="João Silva" image={pato} nomeEvento="Evento Beneficiente - Entrega de cestas" banner={banner}/>
          <CardEvento resp="João Silva" image={coala} nomeEvento="Evento Beneficiente - Entrega de cestas" banner={banner}/>
          <CardEvento resp="João Silva" image={sapo} nomeEvento="Evento Beneficiente - Entrega de cestas" banner={banner}/> */}
          {eventos.map((item, i) => {
            return <CardEvento resp={item.usuario.nome} image={pato} nomeEvento="Evento Beneficiente - Entrega de cestas" banner={banner}/>
          })}
        </ScrollView>
    </View>
  </SafeAreaView>
  )
}