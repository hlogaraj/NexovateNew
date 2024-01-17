import { StatusBar } from 'expo-status-bar';
import {Image, View, Text, Modal, Pressable} from 'react-native';
import React, {useEffect, useRef} from 'react';
import LogInPage from './LogInPage.js';
import PODashboard from './PODashboard.js';
import POsAwaitingApproval from './POsAwaitingApproval.js';
import POsApproved from "./POsApproved";
import POsRejected from "./POsRejected";
import OrderPage from './OrderPage.js';
import Dashboard from './Dashboard.js';
import {FilterModal, LogoBar, SideMenu} from "./CustomModals";
import styles from './Styles.js';
import {NavigationContainer, NavigationContext, useNavigation, useRoute} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {MMKVLoader, MMKVStorage} from 'react-native-mmkv-storage';
import useState from 'react';
import {Ionicons} from "@expo/vector-icons";
import {MMKVwithEncryption} from "./Globals";

import { Provider } from 'react-redux';
import store from './redux/Store';
import { useSelector , useDispatch } from 'react-redux';




//const Stack = createStackNavigator();
const NavigationStack = createStackNavigator();



const App = () => {

    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const sideMenuOpen = useSelector((state) => state.sideMenu.sideMenuOpen);

    const dispatch = useDispatch();

    function closeSideMenu() {
        dispatch({type: 'CLOSESIDEMENU'});
    }

    return (

        <View style={[styles.appContainer, styles.lightBackgroundColor]}>
            <StatusBar backgroundColor={styles.lightBackgroundColor.backgroundColor} style={'dark'}/>
            <Modal
                animationType={'none'}
                transparent={true}
                visible={sideMenuOpen}
                onRequestClose={() => {
                    dispatch({type: 'CLOSESIDEMENU'});
                }}
            >
                <View style={{width: '100%', alignItems: 'stretch', flexGrow: 1, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,.5)', justifyContent: 'flex-start', }}>
                    <SideMenu/>
                    <Pressable style={{backgroundColor: 'rgba(0,0,0,0)', width: '33%'}} onPress={closeSideMenu}/>
                </View>
            </Modal>
            {isLoggedIn ? <LogoBar/> : null}
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
                    <NavigationStack.Screen name="Home" component={Dashboard} options = {Dashboard.options}/>
                    <NavigationStack.Screen name="PO Dashboard" component={PODashboard} options = {PODashboard.options} />
                    <NavigationStack.Screen name="Queued for Approval" component={POsAwaitingApproval} options = {POsAwaitingApproval.options}/>
                    <NavigationStack.Screen name="Approved Orders" component={POsApproved} options = {POsApproved.options}/>
                    <NavigationStack.Screen name="Rejected Orders" component = {POsRejected} options = {POsRejected.options}/>
                    <NavigationStack.Screen name="Order Page" component={OrderPage} />
                </NavigationStack.Navigator>
            </NavigationContainer>
        </View>

    );

}

const WrappedApp = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    )
}

/*          <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Login" component={LogInPage} />
            <Stack.Screen name="MainApp" component ={MainApp}/>
          </Stack.Navigator>


 */

export default WrappedApp;


