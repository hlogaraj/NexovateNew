import { StatusBar } from 'expo-status-bar';
import {Image, View, Text} from 'react-native';
import React from 'react';
import LogInPage from './LogInPage.js';
import PODashboard from './PODashboard.js';
import POsAwaitingApproval from './POsAwaitingApproval.js';
import POsApproved from "./POsApproved";
import POsRejected from "./POsRejected";
import OrderPage from './OrderPage.js';
import Dashboard from './Dashboard.js';
import styles from './Styles.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {MMKVLoader, MMKVStorage} from 'react-native-mmkv-storage';
import useState from 'react';

const MMKVwithEncryption = new MMKVLoader()
    .withEncryption()
    .initialize();

//const Stack = createStackNavigator();
const NavigationStack = createStackNavigator();

const App = () => {
  return (
      <View style={[styles.appContainer, styles.lightBackgroundColor]}>
        <StatusBar backgroundColor={styles.darkBlueColor.color} style={'light'}/>
          <View style={styles.logoBar}>
              <Image source={require('./assets/splash.png')} style={{height: 50, resizeMode: 'contain', flex: 1}}/>
              <Text style={[styles.logoText, {flex: 1}]}>Nexovate</Text>
          </View>
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
                <NavigationStack.Screen name="Home" component={Dashboard} />
                <NavigationStack.Screen name="PO Dashboard" component={PODashboard}  />
                <NavigationStack.Screen name="Queued for Approval" component={POsAwaitingApproval} options = {POsAwaitingApproval.options}/>
                <NavigationStack.Screen name="Approved Orders" component={POsApproved} options = {POsApproved.options}/>
                <NavigationStack.Screen name="Rejected Orders" component = {POsRejected} options = {POsRejected.options}/>
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

export {MMKVwithEncryption};
