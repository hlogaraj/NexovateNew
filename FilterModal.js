import {Modal, Pressable, ScrollView, Text, View} from "react-native";
import styles from "./Styles";
import SelectDropdown from "react-native-select-dropdown";
import {Ionicons} from "@expo/vector-icons";
import {useState, useRef} from "react";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const FilterModal = (props) => {

    const [orderType, setOrderType] = useState(null);
    const [orderCompany, setOrderCompany] = useState(null);
    const [orderBranch, setOrderBranch] = useState(null);

    const typesRef = useRef({});
    const companiesRef = useRef({});
    const branchesRef = useRef({});

    const subHeaderStyle = [styles.h4Text,{fontWeight: 400, paddingBottom: 15}];

    const outerBoxStyle = {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        padding: 10,
        backgroundColor: 'rgb(0,0,0,.5)',
    };

    const innerBoxStyle = {
        backgroundColor: styles.lightBackgroundColor.backgroundColor,
        borderRadius: 8,
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        //height: 300,
        padding: 20,
        /*
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

         */
    }

    const innerInnerBoxStyle = {
            backgroundColor: styles.lightBackgroundColor.backgroundColor,
            borderRadius: 5,
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'stretch',
            width: '100%',
            //height: 300,
            padding: 15,
            margin: 5,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            flexShrink: 1,
        };

    const focusedInnerInnerBoxStyle = {
        backgroundColor: styles.lightBackgroundColor.backgroundColor,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: styles.brightBlueColor.color,
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch',
        width: '100%',
        //height: 300,
        padding: 10,
        paddingBottom: 15,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flexShrink: 1,
    };

    const dropdownCollapsedStyle = {
        height: 40,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: styles.brightBlueBackgroundColor.backgroundColor,
    };

    const dropdownExpandedStyle1 = {
        left: '0%',
        width: '100%',
        //marginTop: 200,
        justifyContent: 'stretch',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        height: '100%',
        backgroundColor: 'white',

    };
    const dropdownExpandedStyle = {
        left: '0%',
        width: '100%',
        //marginTop: 200,
        justifyContent: 'stretch',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        height: '100%',
        backgroundColor: 'white',
    };



    const submitRowStyle = {
        //height: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    };

    const submitButtonStyle = {
        flexGrow: 1,
        backgroundColor: styles.brightBlueBackgroundColor.backgroundColor,
        color: styles.midBlueColor.color,
        borderRadius: 8,
        height: 60,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: styles.lightLightGrayColor.color,
        marginLeft: 20,
    }

    const resetButtonStyle = {
        flexGrow: 1,
        backgroundColor: 'white',
        color: styles.midBlueColor.color,
        borderRadius: 8,
        height: 60,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: styles.lightGrayColor.color,
        marginRight: 20,
    }

    const dropdownTextStyle = {
        color: styles.lightGrayColor.color,
        fontWeight: 300,
    };

    const selectedDropdownTextStyle = {
        color: styles.brightBlueColor.color,
        fontWeight: 400,
        fontSize: styles.h3Text.fontSize,
    }

    const dropdownButtonTextStyle = {
        color: 'black',
        fontWeight: 300,
    }

    function submitFilters() {
        console.log('OrderType: ' + orderType.Codes);
        console.log('OrderBranch: ' + orderBranch.BranchPlant);
        console.log('OrderCompany: ' + orderCompany.CompanyCode)
        props.onSubmit(orderType.Codes, orderBranch.BranchPlant, orderCompany.CompanyCode );
    }

    function reset() {
        setOrderType(null);
        setOrderCompany(null);
        setOrderBranch(null);
        typesRef.current.reset();
        companiesRef.current.reset();
        branchesRef.current.reset();
    }
    return(
        <KeyboardAwareScrollView>
            <View style={outerBoxStyle}>
                <View style={innerBoxStyle}>
                    <View style={{width: '100%', alignItems: 'flex-start', paddingLeft: 5,}}>
                        <Text style={[styles.h3Text, {paddingBottom: 10,}]}>Order Filter</Text>
                    </View>
                    <View  style={innerInnerBoxStyle}>
                        <Text style={subHeaderStyle}>Order Type</Text>
                        <SelectDropdown
                            data={props.allOrderType}
                            onSelect={(selectedItem, index) => {
                                setOrderType(selectedItem);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return (selectedItem.Codes + '-' + selectedItem.Description);
                            }}
                            rowTextForSelection={(item, index) => {
                                return (item.Codes + '-' + item.Description);
                            }}
                            defaultButtonText={'(Select order type)'}
                            search
                            searchPlaceHolder={'Search order types'}
                            renderSearchInputLeftIcon={() => {
                                return <Ionicons name='search-outline' size={24}/>
                            }}
                            buttonStyle={dropdownCollapsedStyle}
                            buttonTextStyle={dropdownButtonTextStyle}
                            selectedRowTextStyle={selectedDropdownTextStyle}
                            rowTextStyle={dropdownTextStyle}
                            ref={typesRef}
                            dropdownStyle={dropdownExpandedStyle1}
                            searchInputStyle={{width: '100%'}}
                            rowStyle={{width: '100%',}}
                            dropdownIconPosition={'right'}
                            renderDropdownIcon={() => {
                                return <Ionicons name={'chevron-down-outline'} size={24}/>
                            }}

                        />
                    </View>
                    <View style={innerInnerBoxStyle}>
                        <Text style={subHeaderStyle}>Originator</Text>
                        <SelectDropdown
                            data={props.allCompanies}
                            onSelect={(selectedItem, index) => {
                                setOrderCompany(selectedItem);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem.Name;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item.CompanyCode + '-' + item.Name;
                            }}
                            defaultButtonText={'(Select order company)'}
                            search
                            searchPlaceHolder={'Search companies'}
                            renderSearchInputLeftIcon={() => {
                                return <Ionicons name='search-outline' size={24}/>
                            }}
                            buttonStyle={dropdownCollapsedStyle}
                            buttonTextStyle={dropdownButtonTextStyle}
                            selectedRowTextStyle={selectedDropdownTextStyle}
                            rowTextStyle={dropdownTextStyle}
                            ref={companiesRef}
                            dropdownStyle={dropdownExpandedStyle}
                            searchInputStyle={{width: '100%'}}
                            rowStyle={{width: '100%',}}
                            dropdownIconPosition={'right'}
                            renderDropdownIcon={() => {
                                return <Ionicons name={'chevron-down-outline'} size={24}/>
                            }}
                        />
                    </View>
                    <View style={innerInnerBoxStyle}>
                        <Text style={subHeaderStyle}>Branch Plant</Text>
                        <SelectDropdown
                            data={props.allBranchPlants}
                            onSelect={(selectedItem, index) => {
                                setOrderBranch(selectedItem);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return (selectedItem.BranchPlant + '-' + selectedItem.Description);
                            }}
                            rowTextForSelection={(item, index) => {
                                return (item.BranchPlant + '-' + item.Description);
                            }}
                            defaultButtonText={'(Select order branch)'}
                            search
                            searchPlaceHolder={'Search branches'}
                            renderSearchInputLeftIcon={() => {
                                return <Ionicons name='search-outline' size={24}/>
                            }}
                            buttonStyle={dropdownCollapsedStyle}
                            buttonTextStyle={dropdownButtonTextStyle}
                            selectedRowTextStyle={selectedDropdownTextStyle}
                            rowTextStyle={dropdownTextStyle}
                            ref={branchesRef}
                            dropdownStyle={dropdownExpandedStyle}
                            searchInputStyle={{width: '100%'}}
                            rowStyle={{width: '100%',}}
                            dropdownIconPosition={'right'}
                            renderDropdownIcon={() => {
                                return <Ionicons name={'chevron-down-outline'} size={24}/>
                            }}
                        />
                    </View>
                    <View style={submitRowStyle}>
                        <View style={resetButtonStyle}>
                            <Pressable
                                style={{borderWidth: 0,}}
                                onPress={reset}
                            >
                                <Text style={styles.lightGrayColor}>Reset</Text>
                            </Pressable>
                        </View>
                        <View style={[
                            submitButtonStyle,
                            (orderCompany === null || orderBranch === null || orderType === null)
                                ? {backgroundColor: 'rgb(185, 185, 185)',}
                                : null,
                        ]}>
                            <Pressable
                                style={{borderWidth: 0}}
                                onPress={() => {
                                    if (orderCompany !== null && orderBranch !== null && orderType !== null) {
                                        submitFilters();
                                    }
                                }}
                            >
                                <Text
                                    style={{color: 'white', fontWeight: 'bold',}}
                                >Submit</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default FilterModal;