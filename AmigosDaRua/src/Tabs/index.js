import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Perfil from "./Perfil";
import Eventos from "./Eventos"
import Ionicons from 'react-native-vector-icons/Ionicons'
import CadastroEventos from "./CadastroEventos";

const Tab = createBottomTabNavigator()

const screenOptions = {
  tabBarStyle: {
    backgroundColor: "#FAFAFA"
  },
  tabBarActiveTintColor: "#0073D8",
  tabBarInactiveTintColor: "#FFD555"
}

const tabs = [
  {
    name: 'Eventos',
    component: Eventos,
    icon: 'md-pin',
    size: 28
  },
  {
    name: 'Novo evento',
    component: CadastroEventos,
    icon: 'add-circle-sharp' ,
    size: 35
  },
  {
    name: 'Perfil',
    component: Perfil,
    icon: 'person-circle-outline' ,
    size: 28
  },
]

export default function Tabs() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={tab.icon} size={tab.size} color={color} />
            )
          }}
        />
      ))
      }
    </Tab.Navigator>
  )
}