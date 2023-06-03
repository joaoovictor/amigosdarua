import React from "react";
import { View, Text, ImageBackground} from "react-native";
import Avatar from "./Avatar";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
export default function CardEvento(props){
  
  function formataData(dataInicio){
    const date = new Date(dataInicio)
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
    
  }
  
  return(
    <View style={{backgroundColor:'#F2F2F2',borderColor: "#FFC9264A", borderWidth: 2, borderStyle: 'solid', shadowRadius: 3,shadowOpacity: 0.2,shadowOffset: {width: -2, height: 4}, shadowColor: '#000', borderRadius: 20, height: 349, minWidth: 367, padding: 13, marginBottom: 20}}>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <Avatar size={52} image={props.image}/>
          <View style={{maxWidth: 281, marginLeft: 10}}>
            <Text style={{fontFamily: 'Poppins_500Medium', fontSize: 14, color: '#00101E'}}>{props.nomeEvento}</Text>
            <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 12, color: '#00101E'}}>{props.resp}</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <ImageBackground source={props.banner} resizeMode="cover" style={{flex: 1}}/>
        </View>
        <View style={{flex: 1, justifyContent: 'space-evenly'}}>
          <View style={{flexDirection: 'row',  alignItems: 'center'}}>
            <EvilIcons name="location" color="#0073D8" size={20}/>
            <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 12, color: '#00101E'}}>{props.endereco}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <EvilIcons name="clock" color="#0073D8" size={20}/>
            <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 12, color: '#00101E'}}>{formataData(props.horarioInicio)} às {formataData(props.horarioFinal)}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons name="target" color="#0073D8" size={19}/>
            <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 12, color: '#00101E'}}>{props.tipoEvento}</Text>
          </View>
          
        </View>
      </View>
    </View>
  )
}