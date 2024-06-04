//#region Navigator
import {createAppContainer} from 'react-navigation';
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
//#endregion

//#region Catalog Screens
import { Login } from './Pages/InitialPages/Login';
import { CreateAccount } from './Pages/InitialPages/CreateAccount';
import { Welcome } from './Pages/InitialPages/Welcome';
import { ForgotPassword } from './Pages/InitialPages/ForgotPassword';
import { Tabs } from './Pages/BottomNavBar';
import { Provider } from './Pages/Catalog/Home/Provider';
//#endregion


export const Routes = createAppContainer(
  createStackNavigator(
    {
      Welcome: {
        screen: Welcome,
        navigationOptions: {
          title: 'Welcome',
          gestureEnabled: false,
        },
      },
      Login: {
        screen: Login,
        navigationOptions: {
          title: 'Login',
          gestureEnabled: false,
        },
      },
      CreateAccount: {
        screen: CreateAccount,
        navigationOptions: {
          title: 'CreateAccount',
          gestureEnabled: false,
        },
      },
      ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: {
          title: 'ForgotPassword',
          gestureEnabled: false,
        },
      },
      Provider: {
        screen: Provider,
        navigationOptions: {
          title: 'Provider',
          gestureEnabled: false,
        },
      },
      Tabs: {
        screen: Tabs,
        navigationOptions: {
          title: 'Tabs',
          gestureEnabled: false,
        },
      },
    },
    {
      initialRouteName: 'Welcome',
      headerMode: 'none',
      defaultNavigationOptions: {
        ...TransitionPresets.SlideFromRightIOS,
      },
    },
  ),
);