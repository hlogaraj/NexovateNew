import {Image, Modal, Pressable, ScrollView, Text, View} from "react-native";
import styles from "./Styles";
import SelectDropdown from "react-native-select-dropdown";
import {Ionicons} from "@expo/vector-icons";
import React, {useState, useRef} from "react";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from 'react-redux';

const subHeaderStyle = [styles.h4Text,{fontWeight: 300, paddingBottom: 15}];
const headerStyle = [styles.h3Text, {paddingBottom: 10,fontWeight: 500,}];
const standaloneDescriptionStyle =[styles.h3Text,{fontWeight: 300, padding: 30}];
const whiteHeaderStyle = [{fontWeight: 300, color: 'white', fontSize: styles.h3Text.fontSize - 2}];
const descriptionStyle = [styles.h4Text,{fontWeight: 300, paddingBottom: 25, paddingTop: 10}];

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

    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,


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

const confirmButtonRowStyle = {
    //height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
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

const lightGray300 = {
    color: styles.lightGrayColor.color,
    fontWeight: 300,
};

const brightBlue400 = {
    color: styles.brightBlueColor.color,
    fontWeight: 400,
    fontSize: styles.h3Text.fontSize,
}

const black300 = {
    color: 'black',
    fontWeight: 300,
}

export const FilterModal = (props) => {

    const [orderType, setOrderType] = useState(null);
    const [orderCompany, setOrderCompany] = useState(null);
    const [orderBranch, setOrderBranch] = useState(null);

    const typesRef = useRef({});
    const companiesRef = useRef({});
    const branchesRef = useRef({});


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
                        <Text style={headerStyle}>Order Filter</Text>
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
                            buttonTextStyle={black300}
                            selectedRowTextStyle={brightBlue400}
                            rowTextStyle={lightGray300}
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
                            buttonTextStyle={black300}
                            selectedRowTextStyle={brightBlue400}
                            rowTextStyle={lightGray300}
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
                            buttonTextStyle={black300}
                            selectedRowTextStyle={brightBlue400}
                            rowTextStyle={lightGray300}
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

export const LogoutModal = (props) => {
    function cancelLogout() {
        props.onCancel();
    }

    function confirmLogout() {
        props.onConfirm();
    }

    return(
        <KeyboardAwareScrollView>
            <View style={outerBoxStyle}>
                <View style={innerBoxStyle}>
                    <View style={{width: '100%', alignItems: 'center', paddingLeft: 5,}}>
                        <Text style={headerStyle}>Warning</Text>
                        <Text style={descriptionStyle}>Are you sure you want to logout?</Text>
                    </View>
                    <View style={confirmButtonRowStyle}>
                        <Pressable onPress={cancelLogout}>
                            <Text style={[brightBlue400, {paddingLeft: 10, paddingRight:10,}]}>No</Text>
                        </Pressable>
                        <Pressable onPress={confirmLogout}>
                            <Text style={[brightBlue400, {paddingLeft: 10, paddingRight:10,}]}>Yes</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export const ApproveConfirmationModal = (props) => {
    function cancel() {
        props.onCancel();
    }

    function confirm() {
        props.onConfirm();
    }
    return(
        <KeyboardAwareScrollView>
            <View style={outerBoxStyle}>
                <View style={innerBoxStyle}>
                    <View style={{width: '100%', alignItems: 'center', paddingLeft: 5,}}>
                        <Text style={standaloneDescriptionStyle}>Approve this order?</Text>
                    </View>
                    <View style={confirmButtonRowStyle}>
                        <Pressable onPress={cancel}>
                            <Text style={[brightBlue400, {paddingLeft: 10, paddingRight:10,}]}>Cancel</Text>
                        </Pressable>
                        <Pressable onPress={confirm}>
                            <Text style={[brightBlue400, {paddingLeft: 10, paddingRight:10,}]}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export const RejectConfirmationModal = (props) => {
    function cancel() {
        props.onCancel();
    }

    function confirm() {
        props.onConfirm();
    }
    return(
        <KeyboardAwareScrollView>
            <View style={outerBoxStyle}>
                <View style={innerBoxStyle}>
                    <View style={{width: '100%', alignItems: 'center', paddingLeft: 5,}}>
                        <Text style={standaloneDescriptionStyle}>Reject this order?</Text>
                    </View>
                    <View style={confirmButtonRowStyle}>
                        <Pressable onPress={cancel}>
                            <Text style={[brightBlue400, {paddingLeft: 10, paddingRight:10,}]}>Cancel</Text>
                        </Pressable>
                        <Pressable onPress={confirm}>
                            <Text style={[brightBlue400, {paddingLeft: 10, paddingRight:10,}]}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export const SideMenu = () => {

    const sideMenuStyle = {
        width: styles.screenwidth.width * .8,
        //alignSelf: 'stretch',
        height: styles.screenHeight.height,
        //flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        backgroundColor: 'rgb(100,100,100)',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 50,
    }

    const rowStyle = {borderBottomColor: 'rgb(80,80,80)', borderBottomWidth: 2,height: 60, flexDirection: 'row',alignItems: 'stretch', alignContent: 'flex-end', width: '100%'};
    const textContainerStyle = {  flexDirection: 'column', justifyContent: 'center', flex: 1,}
    const iconStyle = {color: 'white', marginRight: 20, alignSelf: 'center'};
    const iconSize = 30;


    return (
        <View>
            <View style={sideMenuStyle}>
                <View style={rowStyle}>
                    <Ionicons style={iconStyle} name={'home'} size={iconSize}/>
                    <View style={textContainerStyle}>
                        <Text style={[whiteHeaderStyle,{color: 'white',}]}>Dashboard</Text>
                    </View>
                </View>
                <View style={rowStyle}>
                    <Ionicons style={iconStyle} name={'settings'} size={iconSize}/>
                    <View style={textContainerStyle}>
                        <Text style={[whiteHeaderStyle,{color: 'white',}]}>Settings</Text>
                    </View>
                </View>
                <View style={rowStyle}>
                    <Ionicons style={iconStyle} name={'information-circle'} size={iconSize}/>
                    <View style={textContainerStyle}>
                        <Text style={[whiteHeaderStyle,{color: 'white',}]}>About</Text>
                    </View>
                </View>
                <View style={rowStyle}>
                    <Ionicons style={iconStyle} name={'log-out'} size={iconSize}/>
                    <View style={textContainerStyle}>
                        <Text style={[whiteHeaderStyle,{color: 'white',}]}>Log Out</Text>
                    </View>
                </View>

            </View>
        </View>

    )
}

export const LogoBar = () => {
    const dispatch = useDispatch();

    function openSideMenu() {
        dispatch({type: 'OPENSIDEMENU'});
    }

    const logoBarStyle = {
        top: 20,
        //paddingLeft: 10,
        backgroundColor: styles.lightBackgroundColor.backgroundColor,
        height: 80,
        maxHeight: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        //flex: 1,
        //alignSelf: 'stretch',
    }

    const logoTextStyle = {
        color: styles.darkBlueColor.color,
        //textAlign: 'left',
        fontSize: styles.defaultFontSize.fontSize + 4,
        marginRight: 10,
    }

    return(
        <View style={logoBarStyle}>
            <Ionicons style={{position: 'absolute',left: 15, color: styles.darkBlueColor.color}} name={'menu'} size={36} onPress={openSideMenu}/>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center' , alignSelf: 'center'}}>
                <Text style={logoTextStyle}>Nexovate</Text>
                <Image source={require('./assets/splash.png')} style={{width: 30, resizeMode: 'contain', alignSelf: 'center',marginRight: 10}}/>

            </View>
        </View>
        )

}
