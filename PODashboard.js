import {Text, View, Pressable, BackHandler, ScrollView, Alert} from 'react-native';

import React, {useState, useEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import styles from './Styles.js';
import { Ionicons } from '@expo/vector-icons';
import {MMKVwithEncryption} from "./App";
import Order from "./Order";
import POsAwaitingApproval from "./POsAwaitingApproval";
import { useAndroidBackHandler, AndroidBackHandler } from "react-navigation-backhandler";

const PODashboard = () => {

    const [pendingOrders, setPendingOrders] = useState([]);
    const [approvedOrders, setApprovedOrders] = useState([]);
    const [rejectedOrders, setRejectedOrders] = useState([]);
    const [yetToLoadPendingOrders, setYetToLoadPendingOrders] = useState(true);
    const [yetToLoadApprovedOrders, setYetToLoadApprovedOrders] = useState(true);
    const [yetToLoadRejectedOrders, setYetToLoadRejectedOrders] = useState(true);
    const [approvedByMeOrders, setApprovedByMeOrders] = useState([]);
    const [rejectedByMeOrders, setRejectedByMeOrders] = useState([]);
    const [token, setToken] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [logOutConfirmationVisible, setLogOutConfirmationVisible] = useState(false);

    const navigation = useNavigation();

    const isFocused = useIsFocused();


    useEffect(() => {
        if (isFocused) {
            MMKVwithEncryption.setString('PendingOrders', '');
            MMKVwithEncryption.setString('ApprovedOrders', '');
            MMKVwithEncryption.setString('RejectedOrders', '');
            setYetToLoadPendingOrders(true);
            setYetToLoadApprovedOrders(true);
            console.log('resetting pending orders');
            (async () => {
                await retrievePendingOrders();
                await retrieveApprovedOrders();
                await retrieveRejectedOrders();
            })();
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
        //console.log(tempToken);
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
                            setYetToLoadPendingOrders(false);
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
            if (pendingOrders && pendingOrders.length > 0 && yetToLoadPendingOrders) {
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

    async function storeApprovedOrders(response) {
        try {
            let parsedResponse = await response.json();
            parsedResponse = parsedResponse.InquireApprovedOrders;
            setApprovedOrders(parsedResponse);
            //console.log(parsedResponse);
            let stringifiedResponse = JSON.stringify((parsedResponse));
            storeData('Approved Orders', stringifiedResponse);
            let orderList = await parsedResponse.map((purchaseOrder) => new Order(purchaseOrder));
            storeData('ApprovedOrders', stringifiedResponse);
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

    async function getApprovedOrders() {
        let tempToken = MMKVwithEncryption.getString('Token')
        //console.log(tempToken);
        try {
            fetch('https://jdeps.nexovate.com:7077/jderest/v3/orchestrator/ORCH_NX_InquireApprovedOrders', {
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
                        setYetToLoadApprovedOrders(false);
                        storeApprovedOrders(response);
                        retrieveApprovedOrders();
                    }
                })
                .catch(error => {
                    console.error("gePOList failed: ", error);
                })
        } catch (error) {
            console.error('gePOList error: ', error);
        }

    }

    async function retrieveApprovedOrders() {
        try {
            const approvedOrders = MMKVwithEncryption.getString('ApprovedOrders');
            if (approvedOrders && approvedOrders.length > 0 && yetToLoadApprovedOrders) {
                let parsedOrderList = await JSON.parse(approvedOrders);
                let newOrders = await parsedOrderList.map((orderData) => new Order(orderData));
                setApprovedOrders(newOrders);
                //setIsLoaded(true);
            } else {
                await getApprovedOrders();
                //console.log(orders);
            }
        } catch (error) {
            //console.error('Error retrieving OrderList: ', error);
        }
    }

    async function storeRejectedOrders(response) {
        try {
            let parsedResponse = await response.json();
            parsedResponse = parsedResponse.RejecOrderList;
            setRejectedOrders(parsedResponse);
            //console.log(parsedResponse);
            let stringifiedResponse = JSON.stringify((parsedResponse));
            storeData('Rejected Orders', stringifiedResponse);
            let orderList = await parsedResponse.map((purchaseOrder) => new Order(purchaseOrder));
            storeData('RejectedOrders', stringifiedResponse);
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

    async function getRejectedOrders() {
        let tempToken = MMKVwithEncryption.getString('Token')
        //console.log(tempToken);
        try {
            fetch('https://jdeps.nexovate.com:7077/jderest/v3/orchestrator/ORCH_NX_InquireRejectOrders', {
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
                        setYetToLoadRejectedOrders(false);
                        storeRejectedOrders(response);
                        retrieveRejectedOrders();
                    }
                })
                .catch(error => {
                    console.error("gePOList failed: ", error);
                })
        } catch (error) {
            console.error('gePOList error: ', error);
        }

    }

    async function retrieveRejectedOrders() {
        try {
            const rejectedOrders = MMKVwithEncryption.getString('RejectedOrders');
            if (rejectedOrders && rejectedOrders.length > 0 && yetToLoadRejectedOrders) {
                let parsedOrderList = await JSON.parse(rejectedOrders);
                let newOrders = await parsedOrderList.map((orderData) => new Order(orderData));
                setRejectedOrders(newOrders);
                //setIsLoaded(true);
            } else {
                await getRejectedOrders();
                //console.log(orders);
            }
        } catch (error) {
            //console.error('Error retrieving OrderList: ', error);
        }
    }

    function navigateToPendingOrders() {
        /*
        (async () => {
            await AsyncStorage.removeItem('Orders');
        })();

         */
        navigation.navigate('Queued for Approval');
    }

    function navigateToApprovedOrders() {
        navigation.navigate('Approved Orders');
    }

    function navigateToRejectedOrders() {
        navigation.navigate('Rejected Orders');
    }


    return (
        <ScrollView>
            <View style={styles.pageContainer}>
                <View style={[styles.standardPage, styles.lightBackgroundColor]}>
                    <View style={[styles.dashboardBanner, styles.lightBrightBlueBackgroundColor]}>
                        <Pressable onPress={navigateToPendingOrders} style={styles.dashboardBanner}>
                            <Text style={[styles.dashboardButtonTextLarge, styles.darkBlueColor,]}>{(pendingOrders.length > 0) ? pendingOrders.length : ' '}</Text>
                            <View style={styles.dashboardButton}>
                                <Ionicons name="receipt-outline" size={24} color='black' style={styles.topRightIcon}/>
                                <Text style={styles.dashboardButtonTextSmall}>POs Awaiting Approval</Text>
                            </View>
                        </Pressable>
                    </View>
                    <View style={[styles.dashboardBanner, styles.lightBrightBlueBackgroundColor]}>
                        <Pressable onPress={navigateToApprovedOrders} style={styles.dashboardBanner}>
                            <Text style={[styles.dashboardButtonTextLarge, styles.darkBlueColor,]}>{(approvedOrders.length > 0) ? approvedOrders.length : ' '}</Text>
                            <View style={styles.dashboardButton}>
                                <Ionicons name="checkmark-circle-outline" size={24} color='black' style={styles.topRightIcon}/>
                                <Text style={styles.dashboardButtonTextSmall}>Approved Orders</Text>
                            </View>
                        </Pressable>
                    </View>
                    <View style={[styles.dashboardBanner, styles.lightBrightBlueBackgroundColor]}>
                        <Pressable onPress={navigateToRejectedOrders} style={styles.dashboardBanner}>
                            <Text style={[styles.dashboardButtonTextLarge, styles.darkBlueColor,]}>{(rejectedOrders.length > 0) ? rejectedOrders.length : ' '}</Text>
                            <View style={styles.dashboardButton}>
                                <Ionicons name="close-circle-outline" size={24} color='black' style={styles.topRightIcon}/>
                                <Text style={styles.dashboardButtonTextSmall}>Rejected Orders</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScrollView>

    )
}

PODashboard.options = ({navigation}) => {
    return({

        //headerBackgroundContainerStyle: {backgroundColor: styles.darkBlueBackgroundColor.backgroundColor},
        headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name='ios-arrow-back' size={24} color='white' style={styles.topLeftIcon}/>
            </Pressable>
        )
    })
}

export default PODashboard;