import {Text, View, Pressable, BackHandler, ScrollView, Alert, Image} from 'react-native';

import React, {useState, useEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import styles from './Styles.js';
import { Ionicons } from '@expo/vector-icons';
import {MMKVwithEncryption} from "./App";
import Order from "./Order";
import POsAwaitingApproval from "./POsAwaitingApproval";
import { useAndroidBackHandler, AndroidBackHandler } from "react-navigation-backhandler";
import PODashboard from "./PODashboard";

const Dashboard = () => {

    const [pendingOrders, setPendingOrders] = useState([]);
    const [yetToLoadPendingOrders, setYetToLoadPendingOrders] = useState(true);
    const [approvedOrders, setApprovedOrders] = useState([]);
    const [rejectedOrders, setRejectedOrders] = useState([]);
    const [approvedByMeOrders, setApprovedByMeOrders] = useState([]);
    const [rejectedByMeOrders, setRejectedByMeOrders] = useState([]);
    const [token, setToken] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [logOutConfirmationVisible, setLogOutConfirmationVisible] = useState(false);

    const navigation = useNavigation();

    const isFocused = useIsFocused();

    useAndroidBackHandler(() => {
        Alert.alert(
            'Log out?',
            'You will need to log back in.',
            [
                {
                    text: "Stay logged in", style: 'cancel', onPress: () => {
                    }
                },
                {
                    text: 'Log out',
                    style: {color: 'rgb(255,0,0)'},
                    // If the user confirmed, then we dispatch the action we blocked earlier
                    // This will continue the action that had triggered the removal of the screen
                    onPress: () => navigation.goBack()
                },
            ],
            {cancelable: true,}
        );
        return true;
    })

    useEffect(() => {
        if (isFocused) {
            navigation.setOptions({
                headerLeft: () => (
                    <Pressable onPress={() => {
                        Alert.alert(
                            'Log out?',
                            'You will need to log back in.',
                            [
                                {
                                    text: "Stay logged in", style: 'cancel', onPress: () => {
                                    }
                                },
                                {
                                    text: 'Log out',
                                    style: {color: 'rgb(255,0,0)'},
                                    // If the user confirmed, then we dispatch the action we blocked earlier
                                    // This will continue the action that had triggered the removal of the screen
                                    onPress: () => navigation.goBack()
                                },
                            ],
                            {cancelable: true,}
                        );
                    }}>
                        <Ionicons name="ios-arrow-back" size={24} color='white' style={styles.topLeftIcon}/>
                    </Pressable>
                )
            })

            /*
                    navigation.addListener('beforeRemove', (e) => {
                        e.prevent
                        // Prompt the user before leaving the screen
                        Alert.alert(
                            'Log out?',
                            'You will need to log back in.',
                            [
                                {
                                    text: "Stay logged in", style: 'cancel', onPress: () => {
                                    }
                                },
                                {
                                    text: 'Log out',
                                    style: 'destructive',
                                    // If the user confirmed, then we dispatch the action we blocked earlier
                                    // This will continue the action that had triggered the removal of the screen
                                    onPress: () => navigation.goBack()
                                },
                            ]
                        );
                    })

             */
        }

    }, [isFocused]);


    const retrieveData = (key) => {
        try {
            let value = MMKVwithEncryption.getString(key);
            if (value !== null) {
                return value
            } else {
                console.log('String not found.');
            }
        } catch (error) {
            console.log('Error retrieving string: ', error);
        }
    };
    const storeData = (key, value) => {
        try {
            MMKVwithEncryption.setString(key, value);
            //console.log('String stored successfully.');
        } catch (error) {
            console.log('Error storing string: ', error);
        }
    };


    /*
    function retrieveToken() {
        try {
            let tempToken = retrieveData('Token');
            setToken(tempToken);
        } catch (error) {
            console.error('Error retrieving Token: ', error);
        }
    }

     */





    function navigateToPODashboard() {
        /*
        (async () => {
            await AsyncStorage.removeItem('Orders');
        })();

         */
        navigation.navigate('PO Dashboard');
    }


    return (
        <ScrollView style={[styles.lightBackgroundColor, {flexGrow: 1}]}>
            <View style={styles.pageContainer}>
                <View style={[styles.standardPage, styles.lightBackgroundColor]}>
                    <View style={[styles.dashboardRow]}>
                        <Pressable onPress={navigateToPODashboard} style={[styles.dashboardButtonSmall, {zIndex: 0.5}]}>
                        <View >

                                <Image source={require('./assets/orders.png')} style={{height: 70, resizeMode: 'contain', alignSelf: 'center'}}/>
                                <Text style={[styles.dashboardButtonTextSmall, {alignSelf: 'center'}]}>Purchase Order Approval</Text>

                        </View>
                        </Pressable>
                        <View style={styles.dashboardButtonSmall}>
                            <Pressable>
                                <Image source={require('./assets/warehouse.png')} style={{height: 70, resizeMode: 'contain', alignSelf: 'center'}}/>
                                <Text style={[styles.dashboardButtonTextSmall, {alignSelf: 'center'}]}>Warehouse</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>

        )


}

Dashboard.options = ({navigation}) => {
    return({

        //headerBackgroundContainerStyle: {backgroundColor: styles.darkBlueBackgroundColor.backgroundColor},
        headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name='ios-arrow-back' size={24} color='white' style={styles.topLeftIcon}/>
            </Pressable>

        ),

    })
}

export default Dashboard;