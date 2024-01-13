import {Modal, Pressable, Text, View} from "react-native";
import styles from "./Styles";
import SelectDropdown from "react-native-select-dropdown";
import {Ionicons} from "@expo/vector-icons";
import {useState, useRef} from "react";

const FilterModal = (props) => {

    const [orderType, setOrderType] = useState(null);
    const [orderCompany, setOrderCompany] = useState(null);
    const [orderBranch, setOrderBranch] = useState(null);

    const typesRef = useRef({});
    const companiesRef = useRef({});
    const branchesRef = useRef({});

    function submitFilters() {
        //console.log('OrderType: ' + orderType.Codes);
        //console.log('OrderBranch: ' + orderBranch.BranchPlant);
        //console.log('OrderCompany: ' + orderCompany.CompanyCode)
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
        <View style={styles.filterModalOuterContainer}>
            <View style={styles.filterModalInnerContainer}>
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
                    buttonStyle={styles.filterModalDropdown}
                    buttonTextStyle={styles.selectedDropdownText}
                    selectedRowTextStyle={styles.selectedDropdownText}
                    rowTextStyle={styles.dropdownText}
                    ref={typesRef}
                />
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
                    buttonStyle={styles.filterModalDropdown}
                    buttonTextStyle={styles.selectedDropdownText}
                    selectedRowTextStyle={styles.selectedDropdownText}
                    rowTextStyle={styles.dropdownText}
                    ref={companiesRef}
                />
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
                    buttonStyle={styles.filterModalDropdown}
                    buttonTextStyle={styles.selectedDropdownText}
                    selectedRowTextStyle={styles.selectedDropdownText}
                    rowTextStyle={styles.dropdownText}
                    ref={branchesRef}
                />
                <View style={styles.filterModalSubmitRow}>
                    <View style={[styles.filterModalResetButton]}>
                        <Pressable
                            style={{borderWidth: 0,}}
                            onPress={reset}
                        >
                            <Text style={styles.lightGrayColor}>Reset</Text>
                        </Pressable>
                    </View>
                    <View style={[
                        styles.filterModalSubmitButton,
                        (orderCompany === null || orderBranch === null || orderType === null)
                            ? {backgroundColor: 'rgb(140, 140, 140)',}
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

    )
}

export default FilterModal;