import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from  "./Login";
import Cadastro from "./Cadastro";
import Tabs from "../Tabs";
import Toast from 'react-native-toast-message'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CadastroTipoPessoa from "./CadastroTipoPessoa";
import CadastroEventos from "../Tabs/CadastroEventos";
import PaginaAtualizacaoDados from "../Tabs/PaginaAtualizacaoDados";
const Tab = createNativeStackNavigator();

export default function Rotas(){
  return(
 
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Login" component={Login} options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="Tabs" component={Tabs} options={{ headerShown: false }}
        />
         <Tab.Screen 
          name="Cadastro" component={Cadastro} options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="CadastroTipoPessoa" component={CadastroTipoPessoa} options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="CadastroEvento" component={CadastroEventos} options={{ headerShown: false }}
        />
         <Tab.Screen 
          name="EditarDados" component={PaginaAtualizacaoDados} options={{ headerShown: false }}
        />
      </Tab.Navigator>
      <Toast/>
    </NavigationContainer>
  
   
  )
}

const stylesLogin = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  mainView: {
    flex: 1,
    backgroundColor: '#F2F2F2'
  },
  contentView: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  secondView: {
    flex: 2,
    justifyContent: 'flex-end'
  }
})