import React, {useEffect, useState} from 'react';
import {Text, View, TextInput, Pressable, FlatList, Button, Platform, Switch, ScrollView, SafeAreaView, Animated, ActivityIndicator, Alert, Modal } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {useNavigation} from "@react-navigation/native";
import styles from './Styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Order from './Order.js';
import NoteEntry from './NoteEntry.js';

const OrderPage = () => {

    const [order, setOrder] = useState([]);
    const [orderInfo, setOrderInfo] = useState([]);
    const [orderDetail, setOrderDetail] = useState([]);
    const [currentTab, setCurrentTab] = useState('Order');
    const [isDomestic, setIsDomestic] = useState(false);
    const [headerNotes, setHeaderNotes] = useState('');
    const [itemNotes, setItemNotes] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [noteModalVisible, setNoteModalVisible] = useState(false);
    const [approveModalVisible, setApproveModalVisible] = useState(false);
    const [noteConfirmationVisible, setNoteConfirmationVisible] = useState(false);
    const [inlineNoteConfVisible, setInlineNoteConfVisible] = useState(false);


    const navigation = useNavigation();

    function navigateToDashboard() {
        navigation.navigate('MainApp');
    }


    useEffect(() => {
        retrieveOrder()
    }, [isLoaded])

    useEffect(() => {
        //console.log('storeOrder executed');
        GetOrderDetail();
    }, [order]);

    useEffect(() => {
        if (order) {
            navigation.setOptions({
                headerStyle: {
                    backgroundColor: styles.darkBlueBackgroundColor.backgroundColor,
                    //paddingLeft: -10,
                },
                headerTintColor: '#ffffff',
                headerTitleAlign: 'center',
                headerTitle: order._OrderNumber + '-' + order._OrTy + '-' + order._OrderCo,
                //headerBackgroundContainerStyle: {backgroundColor: styles.darkBlueBackgroundColor.backgroundColor},
                headerLeft: () => (
                    <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons name='ios-arrow-back' size={24} color='white' style={styles.topLeftIcon}/>
                    </Pressable>
                )
            });
        }
    }, [order, navigation, isLoaded, noteConfirmationVisible])

    async function retrieveData(key) {
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
    async function storeData(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
            //console.log('String stored successfully.');
        } catch (error) {
            console.log('Error storing string: ', error);
        }
    };

    async function storeOrderDetails(response) {
        try {
            const parsedResponse = await response.json();
            await setOrderInfo(parsedResponse);
            const parsedOrderDetail = orderInfo.OrderDetail;
            await setOrderDetail(parsedOrderDetail);
            //await console.log(JSON.stringify(orderInfo));
            setIsLoaded(true);

        } catch (error) {
            console.log('Error storing order details: ', error);
        }
    }

    const GetOrderDetail = async () => {
        try {
            const orderData = {
                'OrderNumber' : order._OrderNumber,
                'OrderType' : order._OrTy,
            }

            const token = await retrieveData('Token');

            await fetch('https://jdeps.nexovate.com:7077/jderest/v3/orchestrator/ORCH_NX_PO_Approval_OrderDetail', {
                method: 'POST',
                headers: {
                    'jde-AIS-Auth': token,
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Credentials' : 'true',
                },
                body: JSON.stringify(orderData),
            })
                .then((response) => {
                    if (response != undefined) {
                        if (!response.ok) {
                            throw new Error('Request failed with status ' + response.status);
                        }
                        if (response.ok) {
                            storeOrderDetails(response);
                            setIsLoaded(true);
                        }
                    }
                })
                .catch(error => {
                })

        } catch (error) {
            console.error('Error retrieving selected order details: ', error);
        }
    }

    async function retrieveOrder() {
        try {
            const storedOrder = await AsyncStorage.getItem('selectedOrder');
            const token = await retrieveData('Token');
            //console.log(token);
            //console.log(JSON.stringify(token));
            if (storedOrder) {
                //console.log(storedOrder);
                const parsedOrder = await JSON.parse(storedOrder);
                await setOrder(parsedOrder);
                //await console.log(parsedOrder);
                //await console.log(order);

            }
        } catch (error) {
            console.error('Error retrieving selected order: ', error);
        }
    };

    async function addHeaderAttachment(text) {
        const documentNo = '4915';//******************************************PLACEHOLDER
        console.log(documentNo);
        const orderType = order._OrTy;
        console.log(orderType);
        const orderCompany = order._OrderCo;
        console.log(orderCompany);
        const orderSuffix = orderInfo?.OrderDetail?.[0]?.OrdSuf;
        if (orderSuffix !== undefined) {
            // You can use orderSuf here
            console.log(orderSuffix);
        } else {
            // Handle the case where "OrdSuf" or its parent properties are not found
            console.error("OrdSuf is not found in the orderInfo object.");
        }
        const attachmentName = 'Attachment ORCH 3';//*****************************PLACEHOLDER
        console.log(attachmentName);
        const attachmentString = text;
        console.log(orderSuffix);
        console.log(text);

        const token = await retrieveData('Token');

        const attachmentData = {
            'DocumentNo' : documentNo,
            'OrderType' : orderType,
            'OrderCompany' : orderCompany,
            'OrderSuffix' : orderSuffix,
            'AttachmentName' : attachmentName,
            'AttachmentString' : attachmentString,
        }

        await fetch('https://jdeps.nexovate.com:7077/jderest/v3/orchestrator/ORCH_NX_AddHeaderAttachment_Text', {
            method: 'POST',
            headers: {
                'jde-AIS-Auth': token,
                'Content-Type':'application/json',
                'Access-Control-Allow-Credentials' : 'true',
            },
            body: JSON.stringify(attachmentData),
        })
            .then((response) => {
                if (response != undefined) {
                    if (!response.ok) {
                        throw new Error('Request failed with status ' + response.status);
                    }
                    if (response.ok) {
                        console.log(attachmentData);
                        setNoteConfirmationVisible(true);
                    }
                }
            })
            .catch(error => {
            })
    }

    async function addItemAttachment(index, text) {
        const itemIndex = index.index;
        console.log(itemIndex);
        const documentNo = '4915';//******************************************PLACEHOLDER
        console.log(documentNo);
        const orderType = order._OrTy;
        console.log(orderType);
        const orderCompany = order._OrderCo;
        console.log(orderCompany);
        const orderSuffix = orderInfo?.OrderDetail?.[itemIndex]?.OrdSuf;
        if (orderSuffix !== undefined) {
            // You can use orderSuf here
            console.log(orderSuffix);
        } else {
            // Handle the case where "OrdSuf" or its parent properties are not found
            console.error("OrdSuf is not found in the orderInfo object.");
        }
        const orderLine = orderInfo?.OrderDetail?.[itemIndex]?.Line;
        if(orderLine !== undefined) {
            console.log(orderLine);
        } else {
            console.error("Order line is not found in the orderInfo object.")
        }
        const attachmentName = 'Attachment ORCH 3';//*****************************PLACEHOLDER
        console.log(attachmentName);
        const attachmentString = text;
        console.log(orderSuffix);
        console.log(text);

        const token = await retrieveData('Token');

        const attachmentData = {
            'DocumentNo' : documentNo,
            'OrderType' : orderType,
            'OrderCompany' : orderCompany,
            'OrderSuffix' : orderSuffix,
            "LineNo" : orderLine,
            'AttachmentName' : attachmentName,
            'AttachmentString' : attachmentString,
        }

        await fetch('https://jdeps.nexovate.com:7077/jderest/v3/orchestrator/ORCH_NX_AddItemAttachment_Text', {
            method: 'POST',
            headers: {
                'jde-AIS-Auth': token,
                'Content-Type':'application/json',
                'Access-Control-Allow-Credentials' : 'true',
            },
            body: JSON.stringify(attachmentData),
        })
            .then((response) => {
                if (response != undefined) {
                    if (!response.ok) {
                        throw new Error('Request failed with status ' + response.status);
                    }
                    if (response.ok) {
                        console.log(attachmentData);
                    }
                }
            })
            .catch(error => {

            })
    }

    function approveOrder() {
        const orderNumber = order._OrderNumber;
        //console.log(orderNumber);
        const orderType = order._OrTy;
        //console.log(orderType)
        const approvalData = {
            'OrderNo' : orderNumber,
            'OrderType' : orderType,
        }
        console.log(approvalData);
    }

    function rejectOrder() {
        const orderNumber = order._OrderNumber;
        const orderType = order._OrTy;
        const remark = 'Reject Header'
        const rejectionData = {
            'OrderNo' : orderNumber,
            'OrderType' : orderType,
            'Remark' : remark,
        }
        console.log(rejectionData);
    }


    const NoteConfirmationModal = () => {
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={noteConfirmationVisible}
                onShow={() => {
                    setTimeout(() => {
                        setNoteConfirmationVisible(false);
                    }, 3000);
                }}
                onRequestClose={() => {
                    setNoteConfirmationVisible(!noteConfirmationVisible);
                }}
                onDismiss={() => {
                    setNoteConfirmationVisible(!noteConfirmationVisible);
                }}>
                <View style={styles.centeredView}
                      onTouchStart={() => {
                          setNoteConfirmationVisible(!noteConfirmationVisible);
                      }}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Attachment added</Text>
                    </View>
                </View>
            </Modal>
        )
    }

    const InlineNoteConfirmationModal = () => {
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={inlineNoteConfVisible}
                onShow={() => {
                    setTimeout(() => {
                        setInlineNoteConfVisible(false);
                    }, 3000);

                }}
                onRequestClose={() => {

                    setInlineNoteConfVisible(!inlineNoteConfVisible);
                }}
                onDismiss={() => {

                    setInlineNoteConfVisible(!inlineNoteConfVisible);
                }}>
                <View style={styles.centeredView}
                      onTouchStart={() => {
                          setInlineNoteConfVisible(!inlineNoteConfVisible);
                      }}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Line level attachment added</Text>
                    </View>
                </View>
            </Modal>
        )
    }

    const NoteModal = (index) => {
        const tempIndex = index;
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={noteModalVisible}
                onRequestClose={() => {
                    setNoteModalVisible(!noteModalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={[styles.standardBox, styles.orderBox]}>
                            <TextInput
                                editable={true}
                                multiline={true}
                                numberOfLines={3}
                                maxLength={200}
                                onBlur={(text) => {
                                    setItemNotes(text);
                                }}
                                style={{padding: 10, width: '100%', height: 100}}
                                placeholder='Type your notes here'
                                placeholderTextColor={styles.lightGrayColor.color}
                                value={itemNotes}
                                textAlign='left'
                                textAlignVertical='top'
                                autoFocus={true}
                                clearTextOnFocus={true}
                            />
                        </View>
                        <Pressable style={[styles.attachNotesButton, styles.greenBackground, {}]} onPress={() => {
                            setInlineNoteConfVisible(true);
                            setNoteModalVisible(false);
                            //console.log('setNoteConfirmationVisible');
                            addItemAttachment(tempIndex,headerNotes);
                            setHeaderNotes(''); //**************************************************Fix to submit the typed note
                        }
                        }>
                            <Animated.View>
                                <Text style={{color: 'black', fontWeight: 500,}}>ATTACH NOTES</Text>
                            </Animated.View>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        )
    }


    const OrderItemBox = ({item, index}) => {
        return (
            <View style = {[styles.orderBox, styles.standardBox, {paddingHorizontal: 20, paddingVertical: 15,}]}>
                <View style={{width: '100%',}}>
                    <Text style={[styles.extraLineHeight, styles.bigFont]}>{index + 1
                    }. {item.ItemNumber} - {item.Description}</Text>
                    <View style={styles.orderDetailLine}>
                        <View style={{flexDirection: 'row', }}>
                            <Text style={[styles.lightGrayColor, {flex: 1, paddingBottom: 7,}]}>Quantity Ordered</Text>
                            <Text style={{alignItems: 'flex-end',}}>{item.QuantityOrdered} {item.PU_UM}</Text>
                        </View>
                        <View style={{flexDirection: 'row', }}>
                            <Text style={[styles.lightGrayColor, {flex: 1}]}>Unit Price</Text>
                            {isDomestic ? <Text style={{alignItems: 'flex-end',}}>{item.UnitCost} {order._BaseCurr}</Text> : <Text style={{alignItems: 'flex-end',}}>{item.ForeignUnitCost} {orderInfo.CurrencyCode}</Text>}
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', paddingVertical: 10,}}>
                        <Text style={[styles.lightGrayColor, {flex: 1}]}>Total Amount</Text>
                        {isDomestic ? <Text style={[styles.bigFont, {alignItems: 'flex-end',fontWeight: 600,}]}>{item.ExtendedCost} {order._BaseCurr}</Text> : <Text style={[styles.bigFont, {alignItems: 'flex-end',fontWeight: 600,}]}>{item.ForeignExtPrice} {orderInfo.CurrencyCode}</Text>}
                    </View>
                    <View style={{flexDirection: 'row',}}>
                        <Pressable
                            onPress={() => {setNoteModalVisible(true)}}
                            style={{flexDirection: 'row'}}
                        >
                            <Ionicons name='attach' size={20} color={styles.brightBlueColor.color} style={{paddingLeft: 0,}}/>
                            <Text style={[styles.brightBlueColor]}>Notes</Text>
                        </Pressable>
                    </View>
                </View>
                <NoteModal index={index}/>
            </View>
        )
    }

    const OrderDetails = () => {
        return (
            <View style={{flexGrow: 1, height: 100}}>
                <InlineNoteConfirmationModal/>
                <NoteModal/>
                <FlatList
                    data={orderInfo.OrderDetail}
                    renderItem={OrderItemBox}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }

    const OrderNotes = () => {
        return(
            <View style={{flex: 1}}>
                <NoteConfirmationModal/>
                <View style={[styles.standardBox, styles.orderBox, {flexGrow: 1}]}>
                    <TextInput
                        editable={true}
                        multiline={true}
                        numberOfLines={3}
                        maxLength={200}
                        onChangeText={(text) => setHeaderNotes(text)}
                        style={{padding: 10, width: '100%', height: 200}}
                        placeholder='Type your notes here'
                        placeholderTextColor={styles.lightGrayColor.color}
                        value={headerNotes}
                        textAlign='left'
                        textAlignVertical='top'
                        autoFocus={true}
                        clearTextOnFocus={true}
                    />
                </View>
                <Pressable style={[styles.attachNotesButton, styles.greenBackground, {}]} onPress={() => {
                    setNoteConfirmationVisible(true);
                    //console.log('setNoteConfirmationVisible');
                    addHeaderAttachment(headerNotes);
                    setHeaderNotes(''); //**************************************************Fix to submit the typed note
                }
                }>
                    <Animated.View>
                        <Text style={{color: 'black', fontWeight: 500,}}>ATTACH NOTES</Text>
                    </Animated.View>
                </Pressable>
            </View>
        )
    }
    const TabMenu = () => {
        return(
            <View style={[styles.tabMenu, styles.standardBox]}>
                <Pressable style={
                    [currentTab === 'Order' ? styles.darkBlueBackgroundColor : styles.whiteBackground,
                        styles.tabMenuButton]}
                                  onPress={() => setCurrentTab('Order')}
                >
                    <Text style={currentTab==='Order' ? styles.activeTabText : styles.inactiveTabText}>Order</Text>
                </Pressable>
                <Pressable style={
                    [currentTab === 'Details' ? styles.darkBlueBackgroundColor : styles.whiteBackground,
                        styles.tabMenuButton]}
                                  onPress={() => setCurrentTab('Details')}
                >
                    <Text style={currentTab==='Details' ? styles.activeTabText : styles.inactiveTabText}>Details</Text>
                </Pressable>
                <Pressable style={
                    [currentTab === 'Notes' ? styles.darkBlueBackgroundColor : styles.whiteBackground,
                        styles.tabMenuButton]}
                                  onPress={() => setCurrentTab('Notes')}
                >
                    <Text style={currentTab==='Notes' ? styles.activeTabText : styles.inactiveTabText}>Notes</Text>
                </Pressable>

            </View>
        )
    }

    const ApproveRejectBar = () => {
        return(
            <View style={[styles.approveRejectBar]}>
                <Pressable style={[styles.approveRejectButton, styles.greenBackground, {width: 100, height: '100%',}]}
                                  onPress = {() => {approveOrder()}}>
                    <Animated.View>
                        <Text style={{color: 'black', fontWeight: 500,}}>APPROVE</Text>
                    </Animated.View>
                </Pressable>
                <Pressable style={[styles.approveRejectButton, styles.redBackground, {width: 100, height: '100%',}]}
                                  onPress = {() => {rejectOrder()}}>
                    <Animated.View >
                        <Text style={{color: 'white', fontWeight: 500,}}>REJECT</Text>
                    </Animated.View>
                </Pressable>
            </View>
        )
    }
    const SlideToggle = () => {
        const toggleSwitch = () =>
            setIsDomestic((previousState) => !previousState);

        return (
            <View style={styles.slideToggleContainer}>
                <Text style ={{paddingHorizontal: 10, alignSelf: 'center',}}>Foreign/Domestic</Text>
                <Switch
                    //style={styles.slideToggle}
                    trackColor={{false : 'rgb(125, 125, 125)', true: '#1e4a6d'}}
                    thumbColor={isDomestic ? 'white' : 'white'}
                    ios_backgroundColor={'#3e3e3e'}
                    onValueChange={toggleSwitch}
                    value={isDomestic}
                />
            </View>
        )
    }

    const LoadingMessage = () => {
        return(
            <SafeAreaView style={{flex: 1, flexDirection: 'row', alignItems: 'center', alignSelf: 'center', alignContent: 'center'}}>
                <ActivityIndicator size = 'large'/>
                <Text style = {[styles.bigFont, {padding: 10}]}>Loading</Text>
            </SafeAreaView>
        )
    }


    const OrderInfo = () => {
        const boxStyle = [styles.orderDetailsBox, styles.standardBox];
        const headerStyle = [styles.lightGrayColor, styles.extraLineHeight];
        const dataStyle = [styles.bold, styles.biggerFont];

        //fix formatting of BranchPlant
        let branchPlant = orderInfo.BranchPlant;
        //console.log(branchPlant);
        if (branchPlant) {
            branchPlant = branchPlant.replace(/ /g, '');
            //console.log(branchPlant);
        }

        return(
            <ScrollView contentContainerStyle={{flexGrow: 1, backGroundColor: 'blue'}}>
                <View style={boxStyle}>
                    <View style={styles.orderDetailLine}>
                        <Text style={headerStyle}>Total Amount</Text>
                        {isDomestic ? <Text style={dataStyle}>{order._OrderAmount} {order._BaseCurr}</Text> : <Text style={dataStyle}>{orderInfo.OrderAmount} {orderInfo.CurrencyCode}</Text>}
                    </View>
                    <View style={styles.orderDetailLine}>
                        <Text style={headerStyle}>Branch</Text>
                        <Text style={dataStyle}>{branchPlant} - {orderInfo.Description}</Text>
                    </View>
                    <View style={styles.orderDetailLine}>
                        <Text style={headerStyle}>Request Date</Text>
                        <Text style={dataStyle}>{order._RequestDate}</Text>
                    </View>
                    <View style={styles.orderDetailLine}>
                        <Text style={headerStyle}>Order Date</Text>
                        <Text style={dataStyle}>{order._OrderDate}</Text>
                    </View>
                    <View style={styles.orderDetailLine}>
                        <Text style={headerStyle}>Supplier Address</Text>
                        <Text style={dataStyle}>{orderInfo.SPAlphaName}{'\n'}{orderInfo.SPAddressLine1}{'\n'}{orderInfo.SPCity}, {orderInfo.SPState}, {orderInfo.SPPostalCode}</Text>
                    </View>
                    <View style={styles.orderDetailLine}>
                        <Text style={headerStyle}>Shipping Address</Text>
                        <Text style={dataStyle}>{orderInfo.STAlphaName}{'\n'}{orderInfo.STAddressLine1}{'\n'}{orderInfo.STCity}, {orderInfo.STState}, {orderInfo.STPostalCode}{'\n'}{orderInfo.STCountry}</Text>
                    </View>
                </View>
            </ScrollView>

        )
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={[styles.pageContainer, styles.lightBackgroundColor]}>
                <View style={[styles.standardPage, styles.lightBackgroundColor]}>
                    <TabMenu/>
                    <SlideToggle/>
                    {!isLoaded ? <LoadingMessage/> : currentTab === 'Order' ? <OrderInfo/> : (currentTab === 'Details' ? <OrderDetails/> :
                        <View style={{flex: 1}}>
                            <NoteConfirmationModal/>
                            <NoteEntry onSubmitNote={addHeaderAttachment}/>
                        </View>
                        )}
                    {isLoaded ? <ApproveRejectBar/> : <Text/>}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default OrderPage;