import { StatusBar } from 'expo-status-bar';
import { View} from 'react-native';
import React from 'react';
import LogInPage from './LogInPage.js';
import Dashboard from './Dashboard.js';
import POListPage from './POListPage.js';
import OrderPage from './OrderPage.js';
import styles from './Styles.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import {MMKVStorage} from './MMKVStorage.js';

const Stack = createStackNavigator();
const NestedStack = createStackNavigator();


const MainApp = () => {
  return(
      <NestedStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: styles.darkBlueBackgroundColor.backgroundColor,
          //paddingLeft: -10,
        },
        headerTintColor: '#ffffff',
        headerTitleAlign: 'center',
      }}>
        <NestedStack.Screen name="Dashboard" component={Dashboard}  />
        <NestedStack.Screen name="Queued for Approval" component={POListPage} options = {POListPage.options}/>
        <NestedStack.Screen name="Order Page" component={OrderPage} />
      </NestedStack.Navigator>
  )
}


const App = () => {
  return (
      <View style={[styles.appContainer, styles.lightBackgroundColor]}>
        <StatusBar backgroundColor={styles.darkBlueColor.color} barStyle={"light-content"}/>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Login" component={LogInPage} />
            <Stack.Screen name="MainApp" component ={MainApp}/>
          </Stack.Navigator>
        </NavigationContainer>
      </View>

  );

}


export default App;
