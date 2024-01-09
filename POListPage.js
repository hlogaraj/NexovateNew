import {
    Text,
    View,
    Platform,
    SafeAreaView,
    ScrollView,
    Dimensions,
    TextInput,
    Animated,
    Pressable,
    FlatList,
    Button,
    ActivityIndicator,
    Modal, Alert
} from 'react-native';
import React, {useEffect, useState} from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import styles from './Styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Order from './Order.js';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'

const POListPage = ({route}) => {

    const [orders, setOrders] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [allBranchPlants, setAllBranchPlants] = useState([]);
    const [allCompanies, setAllCompanies] = useState([]);
    const [allOrderType, setAllOrderType] = useState(['OP', 'OD']);

    const [orderCompany, setOrderCompany] = useState(null);
    const [orderBranch, setOrderBranch] = useState(null);
    const [orderType, setOrderType] = useState(null);

    const navigation = useNavigation();
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [approveModalVisible, setApproveModalVisible] = useState(false);
    const [rejectModalVisible, setRejectModalVisible] = useState(false);

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
        if (!isLoaded) {
            (async () => {
                await retrieveOrders();
                //await getAllCompanies();
            })();
        }
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={() => toggleFilterModal()}>
                    <Ionicons name="funnel-outline" size={24} color='white' style={styles.topRightIcon}/>
                </Pressable>
                )
        })
    }, []);

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
                        console.log('gePOList failed with status ' + response.status);
                        console.log(JSON.stringify(response));
                    }
                    if (response.ok) {
                        storePOResponse(response);
                        retrieveOrders();
                        setIsLoaded(true);
                    }
                })
                .catch(error => {
                    console.error("gePOList failed: ", error);
                })
        } catch (error) {
            console.error('gePOList error: ', error);
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

    const ApproveRejectButtons = (props) => {
        //console.log(props.orNo);
        //let tempOrderNumber = props.orderNumber;
        //console.log(tempOrderNumber);
        return(
            //swiped row -> confirmation container, approve/reject buttons
            <View style={styles.approveRejectRow}>
                <Pressable style={[styles.approveRejectButton, styles.greenBackground, { width: 100, height: '100%',}]} onPress={() => createApproveConfirmationModal(props.orderNumber, props.orderType)}>
                        <Text style={{color: 'white', fontWeight: 500,}}>APPROVE</Text>
                </Pressable>
                <Pressable style={[styles.approveRejectButton, styles.redBackground, {width: 100, height: '100%',}]} onPress={() => createRejectConfirmationModal(props.orderNumber, props.orderType)}>
                        <Text style={{color: 'white', fontWeight: 500,}}>REJECT</Text>
                </Pressable>
            </View>
        )
    }
    const renderOrderBox = ({item}) => {

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
        //let tempOrderNumber = item.OrderNumber;
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
                        <ApproveRejectButtons orderNumber={item.OrderNumber} orderType={item.OrTy}></ApproveRejectButtons>
                    </View>
                </ScrollView>
            </View>

        )
    }

    function handleNavigateToDashboard () {
        navigation.navigate('MainApp');
    }


    const getAllCompanies = async () => {
        try {
            let retries = 0;
            //console.log(order._OrderNumber);
            //console.log(order._OrTy);
            //console.log(order);
            const body = {};
            const token = await retrieveData('Token');

            await fetch('https://jdeps.nexovate.com:7077/jderest/v3/orchestrator/ORCH_NX_CompanyMasterSearch', {
                method: 'GET',
                headers: {
                    'jde-AIS-Auth': token,
                    'Content-Type':'application/json',
                },
            })
                .then((response) => {
                    //console.log('HandleFilterOrderCompanies');
                    if (response != undefined) {
                        if (!response.ok) {
                            console.log("Error fetching companies: " + response.json());
                        }
                        if (response.ok) {
                            //console.log('HandleFilterOrderCompanies');
                            let keys1 = Object.keys(response);
                            console.log(keys1);
                            /*
                            console.log(response.status);
                            console.log(response.type);
                            console.log('BodyInit: ' + response._bodyInit);
                            console.log('BodyInit available keys: ' + Object.keys(response._bodyInit));
                            console.log('BodyInit._data: ' + response._bodyInit._data);
                            console.log('BodyInit._data available keys: ' + Object.keys(response._bodyInit._data));
                            //console.log('BodyInit._data.__collector: ' + response._bodyInit._data.__collector);
                            console.log('BodyInit._data.__collector type: ' + typeof(response._bodyInit._data.__collector));
                            console.log('__collector keys: ' + Object.keys(response._bodyInit._data.__collector));
                            console.log('__collector as a string: ' + JSON.stringify(response._bodyInit._data.__collector, null, 4));
                            console.log('BodyBlob available keys: ' + Object.keys(response._bodyBlob));
                            console.log('BodyBlob data: ' + response._bodyBlob._data);
                            console.log('BodyBlob data as a string: ' + JSON.stringify(response._bodyBlob._data, null, 4));

                             */
                            let type = JSON.stringify(response.type, null, 4);
                            let status = JSON.stringify(response.status, null, 4);
                            let ok = JSON.stringify(response.ok, null, 4);
                            let statusText = JSON.stringify(response.statusText, null, 4);
                            let headers = JSON.stringify(response.headers, null, 4);
                            let url = JSON.stringify(response.url, null, 4);
                            let bodyUsed = JSON.stringify(response.bodyUsed, null, 4);
                            let _bodyInit = JSON.stringify(response._bodyInit, null, 4)
                            let _bodyBlob = JSON.stringify(response._bodyBlob, null, 4)


                            console.log('type: ' + type + ', status: ' + status + ', statusText: ' + statusText);
                            console.log('headers: ' + headers)
                            console.log('_bodyInit: ' + _bodyInit);
                            console.log('_bodyBlob: ' + _bodyBlob);
                            //console.log(data.CompanyMaster);
                            /*
                            for (let i=0; i < keys1.length; i++ ) {
                                //console.log(keys1[i]);
                                let key = keys1[i]
                                console.log(key + ": " + response[key])
                                let keys2 = Object.keys(response.key)
                                for (let i=0; i < keys2.length; i++) {
                                    console.log(keys2[i]);
                                }
                                //let key = bodyBlobKeys[i];
                                //console.log(keys1[i] + ': ' + response.keys1[i])

                            }

                             */


                            //console.log('Response status: ' + response.status);
                            //console.log('response.CompanyMaster: ' + CompanyMaster);
                            //console.log(response.statusText);
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                })

        } catch (error) {
            console.error('Error retrieving selected order details: ', error);
        }

    }
    const ApproveModal = () => {
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={approveModalVisible}
                onShow={() => {
                    setTimeout(() => {
                        setApproveModalVisible(false);
                        navigation.navigate('Queued for Approval');
                    }, 3000);
                }}
                onRequestClose={() => {
                    setApproveModalVisible(!approveModalVisible);
                }}
                onDismiss={() => {
                    setApproveModalVisible(!approveModalVisible);
                }}>
                <View style={styles.inLineNoteCenteredView}
                      onTouchStart={() => {
                          setApproveModalVisible(!approveModalVisible);
                      }}>
                    <View style={styles.modalView}>
                        <Text style={styles.approveModalText}>Order Approved</Text>
                    </View>
                </View>
            </Modal>
        )
    }

    const RejectModal = () => {
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={rejectModalVisible}
                onShow={() => {
                    setTimeout(() => {
                        setRejectModalVisible(false);
                        navigation.navigate('Queued for Approval');
                    }, 3000);
                }}
                onRequestClose={() => {
                    setRejectModalVisible(!rejectModalVisible);
                }}
                onDismiss={() => {
                    setRejectModalVisible(!rejectModalVisible);
                }}>
                <View style={styles.inLineNoteCenteredView}
                      onTouchStart={() => {
                          setRejectModalVisible(!rejectModalVisible);
                      }}>
                    <View style={styles.modalView}>
                        <Text style={styles.approveModalText}>Order Rejected</Text>
                    </View>
                </View>
            </Modal>
        )
    }

    function createApproveConfirmationModal (orderNumber, orderType) {
        console.log(orderNumber);
        console.log(orderType);
        //console.log(orTy);//*************************************************************
        Alert.alert(null, 'Approve this order?', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => approveOrder(orderNumber, orderType)},

            ], {cancelable: true},
        );
    };

    const createRejectConfirmationModal = (orderNumber, orderType) => {
        Alert.alert(null, 'Reject this order?', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => rejectOrder(orderNumber, orderType)},

            ], {cancelable: true},
        );
    }

    const FilterModal = () => {
        return(
            <Modal
                animationType={'none'}
                transparent={true}
                visible={filterModalVisible}
                onRequestClose={() => {
                    setFilterModalVisible(!filterModalVisible);
                }}
            >
                <View>
                    <Pressable style={{backgroundColor: 'rgba(0,0,0,0)', height: 60}} onPress={toggleFilterModal}/>
                    <View style={styles.filterModalOuterContainer}>
                        <View style={styles.filterModalInnerContainer}>
                            <SelectDropdown
                                data={allOrderType}
                                onSelect={(selectedItem, index) => {
                                setOrderType(selectedItem);
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return (selectedItem.Codes + '-' + selectedItem.Description);
                                }}
                                rowTextForSelection={(item, index) => {
                                    return (item.Codes + '-' + item.Description);
                                }}
                                defaultButtonText={'Select order type'}
                                search
                                searchPlaceHolder={'Search order types'}
                                renderSearchInputLeftIcon={() => {
                                    return <Ionicons name='search-outline' size={24}/>
                                }}
                                buttonStyle={styles.filterModalDropdown}
                                buttonTextStyle={styles.dropdownText}
                            />
                            <SelectDropdown
                                data={allCompanies}
                                onSelect={(selectedItem, index) => {
                                    setOrderCompany(selectedItem);
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem.Name;
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item.CompanyCode + '-' + item.Name;
                                }}
                                defaultButtonText={'Select order company'}
                                search
                                searchPlaceHolder={'Search companies'}
                                renderSearchInputLeftIcon={() => {
                                    return <Ionicons name='search-outline' size={24}/>
                                }}
                                buttonStyle={styles.filterModalDropdown}
                                buttonTextStyle={styles.dropdownText}
                            />
                            <SelectDropdown
                                data={allBranchPlants}
                                onSelect={(selectedItem, index) => {
                                    setOrderBranch(selectedItem);
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return (selectedItem.BranchPlant + '-' + selectedItem.Description);
                                }}
                                rowTextForSelection={(item, index) => {
                                    return (item.BranchPlant + '-' + item.Description);
                                }}
                                defaultButtonText={'Select order branch'}
                                search
                                searchPlaceHolder={'Search branches'}
                                renderSearchInputLeftIcon={() => {
                                    return <Ionicons name='search-outline' size={24}/>
                                }}
                                buttonStyle={styles.filterModalDropdown}
                                buttonTextStyle={styles.dropdownText}
                            />
                            <View style={styles.filterModalSubmitRow}>
                                <View style={[styles.filterModalResetButton]}>
                                    <Pressable style={{borderWidth: 0,}}>
                                        <Text style={styles.lightGrayColor}>Reset</Text>
                                    </Pressable>
                                </View>
                                <View style={[styles.filterModalSubmitButton]}>
                                    <Pressable style={{borderWidth: 0}}>
                                        <Text style={{color: 'white', fontWeight: 'bold',}}>Submit</Text>
                                    </Pressable>
                                </View>

                            </View>
                        </View>

                    </View>

                    <Pressable style={{backgroundColor: 'rgba(0,0,0,0)', height: 300}} onPress={toggleFilterModal}/>
                </View>
            </Modal>
        )
    }


    const toggleFilterModal = () => {
        setFilterModalVisible(!filterModalVisible);
    }
    function filterOrder(orNo, orTy) {
        console.log(orNo);
        console.log(orders.length);
        let tempOrders = orders.filter((order)=> order.OrderNumber !== orNo);
        setOrders(tempOrders);
        /*
        (async () => {
            await storeData('Orders', JSON.stringify(orders));
            //await getAllCompanies();
        })();

         */
        console.log(orders.length);
    }

    async function approveOrder(orderNumber, orderType) {
        filterOrder(orderNumber, orderType);
        setApproveModalVisible(true);//*******************************************************************would move this to after successful API response
        //setApproveModalVisible(true);//**********************temporarily bypassing API call for UI testing
        /*
        const orderNumber = order.OrderNumber;
        //console.log(orderNumber);
        const orderType = order.OrTy;

        //console.log(orderType)
        const approvalData = {
            'OrderNo' : orderNumber,
            'OrderType' : orderType,
        }

        let token = await retrieveData('Token');

        await fetch('https://jdeps.nexovate.com:7077/jderest/v3/orchestrator/ORCH_NX_ApprovePurchaseOrders', {
            method: 'POST',
            headers: {
                'jde-AIS-Auth': token,
                'Content-Type':'application/json',
                'Access-Control-Allow-Credentials' : 'true',
            },
            body: JSON.stringify(approvalData),
        })
            .then((response) => {
                if (response != undefined) {
                    if (!response.ok) {
                        throw new Error('Request failed with status ' + response.status);
                        console.log('Request failed with status: ' + response.status);
                    }
                    if (response.ok) {
                        console.log('Order approved');
                        setApproveModalVisible(true);
                    }
                }
            })
            .catch(error => {

            })
        console.log(approvalData);

         */
    }

    async function rejectOrder(orderNumber, orderType) {
       filterOrder(orderNumber, orderType);
        //setRejectModalVisible(true);
        const remark = 'Reject Header'
        const rejectionData = {
            'OrderNo' : orderNumber,
            'OrderType' : orderType,
            'Remark' : remark,
        }
        console.log(rejectionData);
        setRejectModalVisible(true);//***************************would move to after successful API response
    }

    return (
        <View style={[styles.pageContainer, styles.lightBackgroundColor]}>
            <FilterModal/>
            <ApproveModal/>
            <RejectModal/>
            <View style={[styles.standardPage, styles.lightBackgroundColor]}>
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

