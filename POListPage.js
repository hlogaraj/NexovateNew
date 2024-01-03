import {Text, View, Platform, SafeAreaView, ScrollView, Dimensions, TextInput, Animated, Pressable, FlatList, Button, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import styles from './Styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Order from './Order.js';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const POListPage = () => {

    const [orders, setOrders] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [allBranchPlants, setAllBranchPlants] = useState([]);
    const [allCompanies, setAllCompanies] = useState([]);
    const [allOrderType, setAllOrderType] = useState(['OP', 'OD']);
    const navigation = useNavigation();

    const screenWidth = Dimensions.get('window').width;

    const retrieveData = async (key) => {
        try {
            let value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return value
            } else {
                console.log('String not found.');
            }
        } catch (error) {
            console.log('Error retrieving string: ', error);
        }
    };
    const storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
            //console.log('String stored successfully.');
        } catch (error) {
            console.log('Error storing string: ', error);
        }
    };

    useEffect(() => {
        retrieveOrders();
    }, [orders]);

    async function storePOResponse(response) {
        try {
            let parsedResponse = await response.json();
            parsedResponse = parsedResponse.PurchaseOrders;
            let stringifiedResponse = JSON.stringify((parsedResponse));
            await storeData('PO_Data', stringifiedResponse);
            let orderList = await parsedResponse.map((purchaseOrder) => new Order(purchaseOrder));
            await (storeData('Orders', stringifiedResponse));
        } catch (error) {
            console.error('Error storing PO Data: ', error);
        }
    }

    async function retrieveOrders() {
        try {
            const storedOrderList = await AsyncStorage.getItem('Orders');
            if (storedOrderList) {
                let parsedOrderList = await JSON.parse(storedOrderList);
                let orders = await parsedOrderList.map((orderData) => new Order(orderData));
                setOrders(orders);
                setIsLoaded(true);
            } else {
                await getPOList();
                console.log(orders);
            }
        } catch (error) {
            //console.error('Error retrieving OrderList: ', error);
        }
    }

    async function getPOList() {
        const token = await retrieveData('Token');

        try {
            fetch('https://jdeps.nexovate.com:7077/jderest/v3/orchestrator/ORCH_NX_GetPurchaseApproval', {
                method: 'GET',
                headers: {
                    'Jde-Ais-Auth': token
                }
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Request failed with status ' + response.status);
                    }
                    if (response.ok) {
                        storePOResponse(response);
                        retrieveOrders();
                        setIsLoaded(true);
                    }
                })
                .catch(error => {
                    console.error("API call failed: ", error);
                })
        } catch (error) {
            console.error('Purchase Approval error: ', error);
        }
    }

    async function navigateToOrderPage(order) {
        try {
            let stringifiedOrder = JSON.stringify(order);
            await AsyncStorage.setItem('selectedOrder', stringifiedOrder);
            navigation.navigate('Order Page');
        } catch (error) {
            //console.log('Error saving order information: ', error);
        }
    }

    /*
    const renderApproveReject = (
        progress: Animated.AnimatedInterpolation,
        dragAnimatedValue: Animated.AnimatedInterpolation
    ) => {

        let opacity = dragAnimatedValue.interpolate({
            inputRange: [-150, 0],
            outputRange: [1,0],
            extrapolate: 'clamp',
        });

        return (
            //swiped row -> confirmation container, approve/reject buttons
            <View style={styles.approveRejectRow}>
                <Pressable style={[styles.approveRejectButton, styles.greenBackground, { width: 100, height: '100%',}]}>
                    <Animated.View>
                        <Text style={{color: 'black', fontWeight: 500,}}>APPROVE</Text>
                    </Animated.View>
                </Pressable>
                <Pressable style={[styles.approveRejectButton, styles.redBackground, {opacity, width: 100, height: '100%',}]}>
                    <Animated.View >
                        <Text style={{color: 'white', fontWeight: 500,}}>REJECT</Text>
                    </Animated.View>
                </Pressable>
            </View>
        )
    }


     */

    const ApproveReject = () => {
        return(
            //swiped row -> confirmation container, approve/reject buttons
            <View style={styles.approveRejectRow}>
                <Pressable style={[styles.approveRejectButton, styles.greenBackground, { width: 100, height: '100%',}]}>
                        <Text style={{color: 'black', fontWeight: 500,}}>APPROVE</Text>
                </Pressable>
                <Pressable style={[styles.approveRejectButton, styles.redBackground, {width: 100, height: '100%',}]}>
                        <Text style={{color: 'white', fontWeight: 500,}}>REJECT</Text>
                </Pressable>
            </View>
        )
    }
    const renderOrderBox = ({ item }) => {

        const shadowStyle = Platform.select({
            ios: {
                shadowOffset: {width: 0, height: 2},
                shadowColor: 'black',
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
            },
            default: {
                //default shadow style here
            },
        });


        return (
            <View style={{width: '100%', height: 140}}>
                <ScrollView
                    horizontal={true}
                    decelerationRate={'fast'}
                    snapToInterval={screenWidth - 60}
                    snapToAlignment={'center'}
                    contentInset={{
                        top: 0,
                        left: 10,
                        bottom: 0,
                        right: 10,
                    }}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={[styles.orderBox, styles.standardBox]}>
                        <Pressable onPress={() => navigateToOrderPage(item)} style={{width: '100%', flex: 1, flexDirection: 'row',}}>

                            <View
                                style = {{width: '50%',}}>
                                <Text style={[styles.extraExtraLineHeight, styles.bigFont]}>{item.Originator}</Text>
                                <Text style={[styles.lightGrayColor,styles.extraExtraLineHeight]}>{item.SupplierName}</Text>
                                <Text style={[styles.extraExtraLineHeight, styles.bolder]}>{item.OrderNumber}-{item.OrTy}-{item.OrderCo}</Text>

                            </View>
                            <View
                                style = {{width: '50%', alignItems: 'flex-end',}}>
                                <Text style={[styles.extraExtraLineHeight, styles.bolder, styles.bigFont]}>{item.DaysOld} Days</Text>
                                <Text style={[styles.extraExtraLineHeight, styles.lightGrayColor]}>{item.OrderAmount} {item.CurCod}</Text>
                                <Text style={[styles.extraExtraLineHeight, styles.lightGrayColor]}>{item.OrderDate}</Text>
                            </View>
                        </Pressable>
                    </View>
                    <View style={styles.approveRejectBox}>
                        <ApproveReject></ApproveReject>
                    </View>
                </ScrollView>
            </View>

        )
    }

    function handleNavigateToDashboard () {
        navigation.navigate('MainApp');
    }


    const getAllFilters = async () => {
        try {
            let retries = 0;
            //console.log(order._OrderNumber);
            //console.log(order._OrTy);
            //console.log(order);
            const body = {};

            //console.log(orderData);
            const token = await retrieveData('Token');

            await fetch('https://jdeps.nexovate.com:7077/jderest/v3/orchestrator/ORCH_NX_CompanyMasterSearch', {
                method: 'GET',
                headers: {
                    'jde-AIS-Auth': token,
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Credentials' : 'true',
                },
            })
                .then((response) => {
                    //console.log('HandleFilterOrderCompanies');
                    if (response != undefined) {
                        if (!response.ok) {
                            throw new Error('Request failed with status ' + response.status);
                        }
                        if (response.ok) {
                            //console.log('HandleFilterOrderCompanies');
                            console.log(response.json().CompanyMaster);
                        }
                    }
                })
                .catch(error => {
                })

        } catch (error) {
            console.error('Error retrieving selected order details: ', error);
        }

    }


    const FilterPage = () => {
        return (
            <View style={styles.standardBox} onPress={() => {console.log('handlecompanies')}}>
                <Pressable onPress={() => {console.log('handlecompanies')}}>
                    <Ionicons name="search" size={100} color="#555" style={styles.searchButton} />
                </Pressable>
            </View>

        )
    }

    return (
        <View style={[styles.pageContainer, styles.lightBackgroundColor]}>

            <View style={[styles.standardPage, styles.lightBackgroundColor]}>

                <Pressable onPress={getAllFilters}>
                    <Ionicons name="search" size={100} color="#555" style={styles.searchButton} />
                </Pressable>
                {isLoaded ?
                    <SafeAreaView style={{flex: 1}}>
                        {isLoaded ? <FlatList
                                data={orders}
                                renderItem={renderOrderBox}
                                keyExtractor={(item) => item._OrderNumber.toString()}
                            /> :
                            <ActivityIndicator size = 'large'/>}
                    </SafeAreaView>
                    :
                    <SafeAreaView style={{flex: 1, flexDirection: 'row', alignItems: 'center', alignSelf: 'center', alignContent: 'center'}}>
                        <ActivityIndicator size = 'large'/>
                        <Text style = {[styles.bigFont, {padding: 10}]}>Loading</Text>
                    </SafeAreaView>
                }
            </View>

        </View>
    )
};

POListPage.options = ({navigation}) => {
    return({
        headerStyle: {
            backgroundColor: styles.darkBlueBackgroundColor.backgroundColor,
            //paddingLeft: -10,
        },
        headerTintColor: '#ffffff',
        headerTitleAlign: 'center',
        headerTitle: 'Queued for Approval',
        //headerBackgroundContainerStyle: {backgroundColor: styles.darkBlueBackgroundColor.backgroundColor},
        headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name='ios-arrow-back' size={24} color='white' style={styles.topLeftIcon}/>
            </Pressable>
        )
    })
}

export default POListPage;