import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import {WhiteHome, GreenHome, WhiteMenu, GreenMenu, WhiteConfig, GreenConfig, WhiteNotification, GreenNotification} from '../../Assets';

import {Home} from '../Catalog/Home';
import {Configuration} from '../Catalog/Configuration';
import {Notifications} from '../Catalog/Notification';
import {SvgCss} from 'react-native-svg';
import {Menu} from '../Catalog/Menu';
import {Login} from '../InitialPages/Login';

import { CreateAccount } from '../InitialPages/CreateAccount';
import { Welcome } from '../InitialPages/Welcome';
import { ForgotPassword } from '../InitialPages/ForgotPassword';
import { Provider } from '../Catalog/Home/Provider';

//#region Menu Screens
import {ScreenAcompanhamentoDeSala} from '../Catalog/Menu/PagesMenu/AcompanhamentoDeSala';
import {ScreenBordero} from '../Catalog/Menu/PagesMenu';
import {ScreenConfigDoFunil} from '../Catalog/Menu/PagesMenu';
import {ScreenControleDeComissao} from '../Catalog/Menu/PagesMenu';
import {ScreenControleDeSala} from '../Catalog/Menu/PagesMenu';
import {ScreenFaleConosco} from '../Catalog/Menu/PagesMenu';
import {ScreenFluxoDeSala} from '../Catalog/Menu/PagesMenu';
import {ScreenGestaoDeBrindes} from '../Catalog/Menu/PagesMenu';
import {ScreenGestaoDeComissao} from '../Catalog/Menu/PagesMenu';
import {ScreenGestaoDeLead} from '../Catalog/Menu/PagesMenu';
import {ScreenMeusContratos} from '../Catalog/Menu/PagesMenu';
import {ScreenOrganograma} from '../Catalog/Menu/PagesMenu';
import {ScreenPropostasPendentes} from '../Catalog/Menu/PagesMenu';
import {ScreenRDStation} from '../Catalog/Menu/PagesMenu';
import {ScreenVendaDireta} from '../Catalog/Menu/PagesMenu';
import {ScreenDisponibilidade} from '../Catalog/Menu/PagesMenu';
import {ScreenFunisDeVenda} from '../Catalog/Menu/PagesMenu';
//#endregion

const BottomTab = createBottomTabNavigator();
const NavigationMenu = createNativeStackNavigator();

export function Tabs() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? GreenHome : WhiteHome;
            } else if (route.name === 'MenuScreen') {
              iconName = focused ? GreenMenu : WhiteMenu;
            } else if (route.name === 'Settings') {
              iconName = focused ? GreenConfig : WhiteConfig;
            } else if (route.name === 'Notification') {
              iconName = focused ? GreenNotification : WhiteNotification;
            } else {return false}
            return <SvgCss xml={iconName} />
          },
          headerShown:false,
          tabBarStyle: {position:'absolute', backgroundColor:'rgba(192, 227, 220, 0.3)', height: 80, borderTopLeftRadius:40, borderTopRightRadius: 40, paddingTop: '7%', borderTopColor:'transparent', opacity: 0.8}
        })}>
        <BottomTab.Screen name="Home" component={Home} options={{tabBarLabel:""}} />
        <BottomTab.Screen name="MenuScreen" component={MenuScreen} options={{tabBarLabel:""}} />
        <BottomTab.Screen name="Settings" component={SettingScreen} options={{tabBarLabel:""}} />
        <BottomTab.Screen name="Notification" component={Notifications} options={{tabBarLabel:""}} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

function MenuScreen() {
  return (
    <NavigationMenu.Navigator>
      <NavigationMenu.Screen name='Menu' component={Menu} options={{headerShown: false}} />
      <NavigationMenu.Screen name='ScreenAcompanhamentoDeSala' component={ScreenAcompanhamentoDeSala} options={{headerShown: false}} />
      <NavigationMenu.Screen name='ScreenBordero' component={ScreenBordero} options={{headerShown: false}} />
      <NavigationMenu.Screen name='ScreenConfigDoFunil' component={ScreenConfigDoFunil} options={{headerShown: false}} />
      <NavigationMenu.Screen name='ScreenControleDeComissao' component={ScreenControleDeComissao} options={{headerShown: false}} />
      <NavigationMenu.Screen name='ScreenControleDeSala' component={ScreenControleDeSala} options={{headerShown: false}} />
      <NavigationMenu.Screen name='ScreenFaleConosco' component={ScreenFaleConosco} options={{headerShown: false}} />
      <NavigationMenu.Screen name='ScreenFluxoDeSala' component={ScreenFluxoDeSala} options={{headerShown: false}} />
      <NavigationMenu.Screen name='ScreenGestaoDeBrindes' component={ScreenGestaoDeBrindes} options={{headerShown: false}} />
      <NavigationMenu.Screen name='ScreenGestaoDeComissao' component={ScreenGestaoDeComissao} options={{headerShown: false}} />
      <NavigationMenu.Screen name='ScreenGestaoDeLead' component={ScreenGestaoDeLead} options={{headerShown: false}} />
      <NavigationMenu.Screen name='ScreenMeusContratos' component={ScreenMeusContratos} options={{headerShown: false}} />
      <NavigationMenu.Screen name='ScreenOrganograma' component={ScreenOrganograma} options={{headerShown: false}} />
      <NavigationMenu.Screen name='ScreenPropostasPendentes' component={ScreenPropostasPendentes} options={{headerShown: false}} />
      <NavigationMenu.Screen name='ScreenRDStation' component={ScreenRDStation} options={{headerShown: false}} />
      <NavigationMenu.Screen name='ScreenVendaDireta' component={ScreenVendaDireta} options={{headerShown: false}} />
      <NavigationMenu.Screen name='ScreenDisponibilidade' component={ScreenDisponibilidade} options={{headerShown: false}} />
      <NavigationMenu.Screen name='ScreenFunisDeVenda' component={ScreenFunisDeVenda} options={{headerShown: false}} />
    </NavigationMenu.Navigator>
  );
}

function SettingScreen() {
  return (
    <NavigationMenu.Navigator>
      <NavigationMenu.Screen name='Configuration' component={Configuration} options={{headerShown: false}} />
      <NavigationMenu.Screen name='Login' component={Login} options={{headerShown: false}} />
      <NavigationMenu.Screen name='CreateAccount' component={CreateAccount} options={{headerShown: false}} />
      <NavigationMenu.Screen name='Welcome' component={Welcome} options={{headerShown: false}} />
      <NavigationMenu.Screen name='ForgotPassword' component={ForgotPassword} options={{headerShown: false}} />
      <NavigationMenu.Screen name='Provider' component={Provider} options={{headerShown: false}} />
      <NavigationMenu.Screen name='Tabs' component={Tabs} options={{headerShown: false}} />
    </NavigationMenu.Navigator>
  );
}

function Routes() {
  return (
    <NavigationMenu.Navigator>
      <NavigationMenu.Screen name='Login' component={Login} options={{headerShown: false}} />
      <NavigationMenu.Screen name='CreateAccount' component={CreateAccount} options={{headerShown: false}} />
      <NavigationMenu.Screen name='Welcome' component={Welcome} options={{headerShown: false}} />
      <NavigationMenu.Screen name='ForgotPassword' component={ForgotPassword} options={{headerShown: false}} />
      <NavigationMenu.Screen name='Provider' component={Provider} options={{headerShown: false}} />
      <NavigationMenu.Screen name='Tabs' component={Tabs} options={{headerShown: false}} />
    </NavigationMenu.Navigator>
  );
}