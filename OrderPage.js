import React, {useEffect, useState} from 'react';
import {Text, View, TextInput, Pressable, FlatList, Button, Platform, Switch, ScrollView, SafeAreaView, Animated, ActivityIndicator, Alert, Modal } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {useNavigation} from "@react-navigation/native";
import styles from './Styles.js';
import {MMKVwithEncryption} from "./App";
import { Ionicons } from '@expo/vector-icons';
import Order from './Order.js';
import HeaderNoteEntry from './HeaderNoteEntry.js';
import ItemNoteEntry from './ItemNoteEntry.js';

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
    const [emptyNoteModalVisible, setEmptyNoteModalVisible] = useState(false);
    const [inLineEmptyNoteModalVisible, setInLineEmptyNoteModalVisible] = useState(false);
    const [approveModalVisible, setApproveModalVisible] = useState(false);
    const [rejectModalVisible, setRejectModalVisible] = useState(false);
    const [noteConfirmationVisible, setNoteConfirmationVisible] = useState(false);
    const [inlineNoteConfVisible, setInlineNoteConfVisible] = useState(false);
    const [annotatedItemIndex, setAnnotatedItemIndex] = useState(-1);


    const navigation = useNavigation();

    function navigateToPOListPage() {
        MMKVwithEncryption.removeItem('Orders');
        MMKVwithEncryption.setString('PendingOrder', '');
        navigation.navigate('Queued for Approval');
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

    function retrieveData(key) {
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
    function storeData(key, value) {
        try {
            MMKVwithEncryption.setString(key, value);
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

            const token = retrieveData('Token');

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

    /*
    async function getDomesticOrderDetail() {
        try {
            let token = MMKVwithEncryption.getString('Token');
            let body = {
                'OrderNumber' : order._OrderNumber,
                'OrderType' : order._OrTy,
            }
            await fetch('https://jdeps.nexovate.com:7077/jderest/v3/orchestrator/ORCH_NX_PO_DomesticValueForForeignOrders', {
                method: 'POST',
                headers: {
                    'jde-AIS-Auth': token,
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(body),
            })
                .then(response => {
                    if (response != undefined) {
                        if (!response.ok) {
                            console.log("Error fetching domestic order detail: " + response.json());
                        }
                        if (response.ok) {
                            //console.log('got response');
                            //storePOResponse(response);
                            orders.
                        }
                    } else {
                        console.log("Error fetching domestic order detail: " + response.json());
                        setIsLoaded(true);
                    }
                })
        } catch (error) {
            console.error('Error retrieving domestic order details: ', error);
        }
    }

     */


    async function retrieveOrder() {
        try {
            const storedOrder = MMKVwithEncryption.getString('selectedOrder');
            const token = retrieveData('Token');
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
        if(text.length===0) {
            setEmptyNoteModalVisible(true);
        }
        else {
            const documentNo = order._OrderNumber;
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
            const attachmentName = 'Attachment ORCH 3';//************************************************************************PLACEHOLDER
            console.log(attachmentName);
            const attachmentString = text;
            console.log(orderSuffix);
            console.log(text);

            const token = retrieveData('Token');

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
                            setHeaderNotes(text);
                            console.log(attachmentData);
                            setNoteConfirmationVisible(true);
                        }
                    }
                })
                .catch(error => {
                })
        }

    }

    async function addItemAttachment(text) {
        if(text.length===0) {
            setInLineEmptyNoteModalVisible(true);
        }
        else {
            const itemIndex = annotatedItemIndex;
            console.log(itemIndex);
            const documentNo = order._OrderNumber;
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
            const attachmentName = 'Attachment ORCH 3';//*********************************************************************PLACEHOLDER
            console.log(attachmentName);
            const attachmentString = text;
            console.log(orderSuffix);
            console.log(text);

            const token = retrieveData('Token');

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
                            setInlineNoteConfVisible(true);
                            setNoteModalVisible(false);
                            console.log(attachmentData);
                        }
                    }
                })
                .catch(error => {

                })
        }

    }

    async function approveOrder(orderNumber, orderType) {
        //setApproveModalVisible(true);//*******************************************************************would move this to after successful API response
        //setApproveModalVisible(true);//**********************temporarily bypassing API call for UI testing

        //const orderNumber = order._OrderNumber;
        console.log(orderNumber);
        //const orderType = order._OrTy;

        console.log(orderType)
        const approvalData = {
            'OrderNo' : orderNumber,
            'OrderType' : orderType,
            'Remark' : headerNotes,
        }

        let token = retrieveData('Token');

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


    }

    async function rejectOrder(orderNumber, orderType) {
        //setRejectModalVisible(true);
        console.log(orderNumber);
        console.log(orderType);
        const remark = 'Reject Header'
        const rejectionData = {
            'OrderNo' : orderNumber,
            'OrderType' : orderType,
            'Remark' : remark,
        }

        let token = retrieveData('Token');

        await fetch('https://jdeps.nexovate.com:7077/jderest/v3/orchestrator/ORCH_NX_RejectPurchaseOrders', {
            method: 'POST',
            headers: {
                'jde-AIS-Auth': token,
                'Content-Type':'application/json',
                'Access-Control-Allow-Credentials' : 'true',
            },
            body: JSON.stringify(rejectionData),
        })
            .then((response) => {
                if (response != undefined) {
                    if (!response.ok) {
                        throw new Error('Request failed with status ' + response.status);
                        console.log('Request failed with status: ' + response.status);
                    }
                    if (response.ok) {
                        console.log('Order approved');
                        setRejectModalVisible(true);
                    }
                }
            })
            .catch(error => {
            })
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
                <View style={styles.inLineNoteCenteredView}
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

    const EmptyNoteAlertModal = () => {
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={emptyNoteModalVisible}
                onShow={() => {
                    setTimeout(() => {
                        setEmptyNoteModalVisible(false);
                    }, 3000);
                }}
                onRequestClose={() => {
                    setEmptyNoteModalVisible(!emptyNoteModalVisible);
                }}
                onDismiss={() => {
                    setEmptyNoteModalVisible(!emptyNoteModalVisible);
                }}>
                <View style={styles.centeredView}
                      onTouchStart={() => {
                          setEmptyNoteModalVisible(!emptyNoteModalVisible);
                      }}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Please enter notes</Text>
                    </View>
                </View>
            </Modal>
        )
    }

    const InLineEmptyNoteAlertModal = () => {
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={inLineEmptyNoteModalVisible}
                onShow={() => {
                    setTimeout(() => {
                        setInLineEmptyNoteModalVisible(false);
                    }, 3000);
                }}
                onRequestClose={() => {
                    setInLineEmptyNoteModalVisible(!inLineEmptyNoteModalVisible);
                }}
                onDismiss={() => {
                    setInLineEmptyNoteModalVisible(!inLineEmptyNoteModalVisible);
                }}>
                <View style={[styles.centeredView,{elevation: 6}]}
                      onTouchStart={() => {
                          setInLineEmptyNoteModalVisible(!inLineEmptyNoteModalVisible);
                      }}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Please enter notes</Text>
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
                <View style={styles.inLineNoteCenteredView}
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
                <View style={styles.inLineNoteCenteredView}>
                    <View style={styles.inLineModalView}>
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
                            addItemAttachment(tempIndex, headerNotes).then(r => setHeaderNotes(''));
                             //**************************************************Fix to submit the typed note
                        }
                        }>
                            <Animated.View>
                                <Text style={{color: 'white', fontWeight: 500,}}>ATTACH NOTES</Text>
                            </Animated.View>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        )
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
                        navigateToPOListPage();
                    }, 3000);
                }}
                onRequestClose={() => {
                    setApproveModalVisible(false);
                    navigateToPOListPage();
                }}
                onDismiss={() => {
                    setApproveModalVisible(false);
                    navigateToPOListPage();
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

    const createApproveConfirmationModal = () => {
        Alert.alert(null, 'Approve this order?', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => approveOrder(order._OrderNumber, order._OrTy)},

            ], {cancelable: true},
        );
    };

    const createRejectConfirmationModal = () => {
        Alert.alert(null, 'Reject this order?', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => rejectOrder(order._OrderNumber, order._OrTy)},

            ], {cancelable: true},
        );
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
                        navigateToPOListPage();
                    }, 3000);
                }}
                onRequestClose={() => {
                    setRejectModalVisible(false);
                    navigateToPOListPage();
                }}
                onDismiss={() => {
                    setRejectModalVisible(false);
                    navigateToPOListPage();
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
                            onPress={() => {
                                setNoteModalVisible(true);
                                setAnnotatedItemIndex(index);
                            }}
                            style={{flexDirection: 'row'}}
                        >
                            <Ionicons name='attach' size={20} color={styles.darkBlueColor.color} style={{paddingLeft: 0,}}/>
                            <Text style={[styles.darkBlueColor, {fontWeight: 'bold'}]}>Notes</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        )
    }

    const OrderDetails = () => {
        return (
            <View style={{flexGrow: 1, height: 100}}>
                <InlineNoteConfirmationModal/>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={noteModalVisible}
                    onRequestClose={() => setNoteModalVisible(!noteModalVisible)}
                    onDismiss={() => setNoteModalVisible(!noteModalVisible)}
                >
                        <ItemNoteEntry onSubmitNote={addItemAttachment}/>
                </Modal>
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
                    addHeaderAttachment(headerNotes).then(r => setHeaderNotes(''));
                     //**************************************************Fix to submit the typed note
                }
                }>
                    <Animated.View>
                        <Text style={{color: 'white', fontWeight: 500,}}>ATTACH NOTES</Text>
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
                                  onPress = {() => {createApproveConfirmationModal()}}>
                    <Animated.View>
                        <Text style={{color: 'white', fontWeight: 500,}}>APPROVE</Text>
                    </Animated.View>
                </Pressable>
                <Pressable style={[styles.approveRejectButton, styles.redBackground, {width: 100, height: '100%',}]}
                                  onPress = {() => {createRejectConfirmationModal()}}>
                    <Animated.View >
                        <Text style={{color: 'white', fontWeight: 500,}}>REJECT</Text>
                    </Animated.View>
                </Pressable>
            </View>
        )
    }
    const ForeignDomesticToggle = () => {
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
                    <ForeignDomesticToggle/>
                    <ApproveModal/>
                    <RejectModal/>
                    {!isLoaded ? <LoadingMessage/> : currentTab === 'Order' ? <OrderInfo/> : (currentTab === 'Details' ? <OrderDetails/> :
                        <View style={{flex: 1}}>
                            <NoteConfirmationModal/>
                            <EmptyNoteAlertModal/>
                            <HeaderNoteEntry onSubmitNote={addHeaderAttachment}/>
                        </View>
                        )}
                    {isLoaded ? <ApproveRejectBar/> : <Text/>}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default OrderPage;