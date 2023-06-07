import React from 'react'
import {View, Image} from 'react-native'

export default function Avatar(props){
  return (
    <View style={{width: props.size, height: props.size, shadowRadius: 3,shadowOpacity: 0.2,shadowOffset: {width: -2, height: 4}, shadowColor: '#000', backgroundColor:'#fafafa00'}}>
      <Image source={props.image} resizeMode='cover' style={{flex: 1, overflow: 'hidden', width: props.size, height: props.size, borderRadius: 50}}/>
    </View>
  )
}