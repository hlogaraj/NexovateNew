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

//const Stack = createStackNavigator();
const NavigationStack = createStackNavigator();

const App = () => {
  return (
      <View style={[styles.appContainer, styles.lightBackgroundColor]}>
        <StatusBar backgroundColor={styles.darkBlueColor.color} style={'light'}/>
        <NavigationContainer>
            <NavigationStack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: styles.darkBlueBackgroundColor.backgroundColor,
                    //paddingLeft: -10,
                },
                headerTintColor: '#ffffff',
                headerTitleAlign: 'center',
            }}>
                <NavigationStack.Screen name="Login" component={LogInPage} options = {{headerShown: false}}/>
                <NavigationStack.Screen name="Dashboard" component={Dashboard}  />
                <NavigationStack.Screen name="Queued for Approval" component={POListPage} options = {POListPage.options}/>
                <NavigationStack.Screen name="Order Page" component={OrderPage} />
            </NavigationStack.Navigator>
        </NavigationContainer>
      </View>
  );

}

/*          <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Login" component={LogInPage} />
            <Stack.Screen name="MainApp" component ={MainApp}/>
          </Stack.Navigator>

 */

export default App;
