import {Modal, Pressable, Text, View} from "react-native";
import styles from "./Styles";
import SelectDropdown from "react-native-select-dropdown";
import {Ionicons} from "@expo/vector-icons";
import {useState} from "react";

const FilterModal = (props) => {

    const [orderType, setOrderType] = useState(null);
    const [orderCompany, setOrderCompany] = useState(null);
    const [orderBranch, setOrderBranch] = useState(null);

    function submitFilters() {
        props.onSubmit(orderType.Codes, orderBranch.BranchPlant, orderCompany.CompanyCode );
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