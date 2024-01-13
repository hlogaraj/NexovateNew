import {Text, View, Pressable, BackHandler, ScrollView} from 'react-native';

import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import styles from './Styles.js';
import { Ionicons } from '@expo/vector-icons';
import {MMKVwithEncryption} from "./App";
import Order from "./Order";

const Dashboard = () => {

    const [pendingOrders, setPendingOrders] = useState([]);
    const [approvedOrders, setApprovedOrders] = useState([]);
    const [rejectedOrders, setRejectedOrders] = useState([]);
    const [approvedByMeOrders, setApprovedByMeOrders] = useState([]);
    const [rejectedByMeOrders, setRejectedByMeOrders] = useState([]);
    const [token, setToken] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const navigation = useNavigation();



    useEffect(() => {
        (async () => {
            await retrievePendingOrders();
        })();
    }, []);


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

    async function storePendingOrders(response) {
        try {
            let parsedResponse = await response.json();
            parsedResponse = parsedResponse.PurchaseOrders;
            setPendingOrders(parsedResponse);
            //console.log(parsedResponse);
            let stringifiedResponse = JSON.stringify((parsedResponse));
            storeData('PO_Data', stringifiedResponse);
            let orderList = await parsedResponse.map((purchaseOrder) => new Order(purchaseOrder));
            storeData('PendingOrders', stringifiedResponse);
        } catch (error) {
            console.error('Error storing PO Data: ', error);
        }
    }
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

    async function getPendingOrders() {
        let tempToken = MMKVwithEncryption.getString('Token')
        console.log(tempToken);
            try {
                fetch('https://jdeps.nexovate.com:7077/jderest/v3/orchestrator/ORCH_NX_GetPurchaseApproval', {
                    method: 'GET',
                    headers: {
                        'Jde-Ais-Auth': tempToken,
                    }
                })
                    .then((response) => {
                        if (!response.ok) {
                            console.log('gePOList failed with status ' + response.status);
                            console.log(JSON.stringify(response));
                        }
                        if (response.ok) {
                            storePendingOrders(response);
                            retrievePendingOrders();
                        }
                    })
                    .catch(error => {
                        console.error("gePOList failed: ", error);
                    })
            } catch (error) {
                console.error('gePOList error: ', error);
            }

    }

    async function retrievePendingOrders() {
        try {
            const pendingOrders = MMKVwithEncryption.getString('PendingOrders');
            if (pendingOrders) {
                let parsedOrderList = await JSON.parse(pendingOrders);
                let newOrders = await parsedOrderList.map((orderData) => new Order(orderData));
                setPendingOrders(newOrders);
                //setIsLoaded(true);
            } else {
                await getPendingOrders();
                //console.log(orders);
            }
        } catch (error) {
            //console.error('Error retrieving OrderList: ', error);
        }
    }


    function navigateToPOListPage() {
        /*
        (async () => {
            await AsyncStorage.removeItem('Orders');
        })();

         */
        navigation.navigate('Queued for Approval');
    }



    return (
        <ScrollView>
            <View style={styles.pageContainer}>
                <View style={[styles.standardPage, styles.lightBackgroundColor]}>
                    <View style={[styles.dashboardBanner, styles.brightBlueBackgroundColor]}>
                        <Pressable onPress={navigateToPOListPage} style={styles.dashboardBanner}>
                            <Text style={[styles.dashboardButtonTextLarge, styles.darkBlueColor,]}>{(pendingOrders.length > 0) ? pendingOrders.length : ' '}</Text>
                            <View style={styles.dashboardButton}>
                                <Ionicons name="receipt-outline" size={24} color='black' style={styles.topRightIcon}/>
                                <Text style={styles.dashboardButtonTextSmall}>Awaiting Approval</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScrollView>

    )
}

export default Dashboard;