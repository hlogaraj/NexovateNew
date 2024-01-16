import { StyleSheet, Dimensions, Platform} from 'react-native';

const defaultFontSize = Platform.OS === 'ios' ? 17 : 14;

//const color_darkBlue = 'rgba(60, 104, 139, 1)';
const color_darkBlue = '#1e4a6d';
//const color_lightBlue = '#f0f1f5';
const color_lightBlue = '#f8f8fa';
const color_lightGray = 'rgb(140, 140, 140)';
const color_lightLightGray = 'rgb(220, 220, 220)';
const color_midBlue = '#a5b7c5';
const color_brightBlue = '#3084e4';
const color_lightBrightBlue = '#c1daf7';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({

    brightBlueColor: {
        color: color_brightBlue,
    },
    brightBlueBackgroundColor: {
        backgroundColor: color_brightBlue,
    },
    lightBrightBlueColor: {
        color: color_lightBrightBlue,
    },
    lightBrightBlueBackgroundColor: {
        backgroundColor: color_lightBrightBlue,
    },
    lightBackgroundColor: {
        backgroundColor: color_lightBlue,
    },
    darkBlueBackgroundColor: {
        backgroundColor: color_darkBlue,
    },
    whiteBackground: {
        backgroundColor: 'white',
    },
    darkBlueColor: {
        color: color_darkBlue,
    },
    midBlueColor: {
        color: color_midBlue,
    },
    midBlueBackgroundColor: {
      backgroundColor: color_midBlue,
    },
    standardBox: {
        borderColor: 'rgb(200,200,200)',
        backgroundColor: 'white',
    },
    lightGrayColor: {
        color: color_lightGray,
    },
    lightLightGrayColor: {
        color: color_lightLightGray,
    },
    appContainer: {
        width: screenWidth,
        backgroundColor: color_midBlue,
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        paddingTop: '25%',
        //width: 300,
    },
    title: {
        //color: '#1c4a62',
        fontWeight: 'bold',
        //fontFamily: 'Roboto-Regular',
        fontSize: 24,
        paddingBottom: 24,
    },
    loginForm: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        width: '100%',
        maxWidth: 300,
        //height: 100,
        paddingBottom: 24,
    },
    loginFormRow: {
        //flex: 0.1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        height: 60,
        //height: '50%',
    },
    loginLabelCollapsed: {
        color: 'rgb(0, 0, 255)',
        fontWeight: 'normal',
        //fontFamily: 'Roboto-Regular',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(0,0,255)',


    },
    loginLabelExpanded: {
        color: 'rgb(0, 0, 255)',
        fontWeight: 'normal',
        //fontFamily: 'Roboto-Regular',
        borderWidth: 0,
        borderBottomWidth: 0,
        zIndex: 0,

    },
    loginInput: {
        /*borderWidth: 1,
        borderColor: 'rgb(100,100,100)',
        borderRadius: 4,
        backgroundColor: 'rgb(255,255,255)',
        */
        //borderBottomWidth: 1,
        //borderBottomColor: 'rgb(190, 0, 0)',
        padding: 4,
        width: '100%',
        marginRight: -36,
    },
    loginInputWrapper: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'rgb(200,200,200)',
        flexDirection: 'row',
        alignItems: 'center',
    },
    loginInputExpanded: {
        width: '100%',
        borderBottomColor: 'rgb(190, 0, 0)',
        borderBottomWidth: 1,
        zIndex: 1,

    },
    loginButtonWrapper: {
        width: '100%',
        paddingTop:20,
    },
    loginButton: {
        padding: 10,
        width: '100%',
        borderRadius: 5,
        backgroundColor: color_darkBlue,
        //backgroundColor: '#1e4a6d',
    },
    dashboardButton: {
        //padding: 10,
        //height: 100,
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderRadius: 5,
        //backgroundColor: '#1e4a6d',
    },
    dashboardButtonSmall: {
        margin: 5,
        height: '100%',
        //flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 5,
        flexGrow: 1,
        width: '33%',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    dashboardBanner: {
        padding: 10,
        marginBottom: 10,
        height: 150,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderRadius: 5,
        //backgroundColor: '#1e4a6d',
    },
    dashboardRow: {
        marginBottom: 10,
        height: 150,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        //backgroundColor: '#1e4a6d',
    },
    approveRejectButton: {
        padding: 10,
        width: '100%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        margin: 5,
    },
    attachNotesButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 5,
    },
    greenBackground: {
        backgroundColor: 'rgba(0, 150, 0, 1)',
    },
    redBackground: {
        backgroundColor: 'rgba(255, 0, 0, .5)',
    },
    redColor: {
        color: 'rgba(255, 100, 100, 1)',
    },
    loginButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    logoText: {
        color: color_darkBlue,
        textAlign: 'left',
        fontSize: defaultFontSize + 4,
    },
    dashboardButtonTextSmall: {
        //color: 'black',
        textAlign: 'center',
        fontSize: defaultFontSize + 4,
        maxWidth: '100%',
    },
    dashboardButtonTextLarge: {
        textAlign: 'center',
        fontSize: defaultFontSize + 8,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    dataBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(0, 0, 255)',
        width: '100%',
    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 16,
        borderRadius: 25,
    },
    header: {
        //color: '#1e4a6d',
    },
    loginPage: {
        flexDirection: 'column',
        //backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        //position: 'relative',
        paddingTop: '20%',
        //paddingBottom: '25%',
        width: '100%',
    },
    standardPage: {
        flex: 1,
        //backgroundColor: '#f0f1f5',
        alignItems: 'stretch',
        justifyContent: 'center',
        flexDirection: 'column',
        //position: 'relative',
        //paddingTop: '25%',
        width: screenWidth,
        maxWidth: 500,
        padding: 15,
    },
    pageContainer: {
        flex: 1,
        //backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        //paddingTop: '25%',
        //width: 300,
    },
    searchBarOuter: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        //marginHorizontal: 20,
        marginVertical: 10,
    },
    searchBarInner: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchIcon: {
        marginRight: -5,
    },
    searchButton: {
        marginLeft: 5,
    },
    searchInput: {
        flex: 1,
        height: 40,
        //paddingLeft: -10,
        transform: [{translateX: -15}],
    },
    orderBox: {
        borderStyle: 'solid',
        flex: 1,
        width: screenWidth - 50,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 1,
        alignContent: 'stretch',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginVertical: 5,
        borderRadius: 8,
        flexDirection: 'row',
    },
    approveRejectBox: {
        flex: 1,
        width: '100%',
        borderWidth: 0,
        alignContent: 'stretch',
        justifyContent: 'center',
        borderRadius: 8,
        flexDirection: 'row',
    },
    orderDetailsBox: {
        borderStyle: 'solid',
        //flex: 1,
        width: '100%',
        borderWidth: 1,
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
        paddingVertical: 20,
        //marginVertical: 5,
        borderRadius: 8,
        flexDirection: 'column',
    },
    bold: {
        fontWeight: 500,
    },
    bolder: {
        fontWeight: 600,
    },
    extraLineHeight: {
        lineHeight: 25,
    },
    extraExtraLineHeight: {
        marginTop: 5,
        marginBottom: 7,
    },
    bigFont: {
        fontSize: defaultFontSize * 1.05,
    },
    biggerFont: {
        fontSize: defaultFontSize * 1.15,
    },
    tabMenu: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 30,
        borderStyle: 'solid',
        borderWidth: 1,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    approveRejectBar: {
        height: 50,
        paddingVertical: 5,
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    tabMenuButton: {
        paddingHorizontal: 10,
        //paddingBottom: 2,
        //width: '100%',
        borderRadius: 21,
    },
    slideToggleContainer: {
        //padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignContent: 'center',
    },

    activeTabText: {
        color: 'white',
        textAlign: 'center',
    },
    inactiveTabText: {
        color: 'black',
        textAlign: 'center',
    },
    scrollView: {
        flexGrow: 2,
        flex: 0,
        flexDirection: 'column',
    },
    topLeftIcon: {
        marginLeft: 15,
    },
    topRightIcon: {
        marginRight: 15,
    },
    underline: {
        textDecorationLine: 'underline',
        textDecorationColor: color_lightGray,
    },
    orderDetailLine: {
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: color_lightLightGray,
    },
    approveRejectRow: {
        flexDirection: 'row',
        flex: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        flexShrink: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    inLineNoteCenteredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 1,
        marginTop: 57,
        backgroundColor: 'rgba(0,0,0,.5)',
        borderRadius: 5,
    },
    failedLoginCenteredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 1,
        backgroundColor: 'rgba(0,0,0,.5)',
        borderRadius: 5,
    },
    inLineModalView: {
        margin: 20,


        padding: 10,
        alignItems: 'center',
        elevation: 5,
        flexShrink: 1,
        alignSelf: 'center',
        maxHeight: 200,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'rgba(0,0,0,.6)',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        flexShrink: 1,
        alignSelf: 'center',
        maxHeight: 200,
    },
    modalText: {
        textAlign: 'center',
        color: 'white',
    },
    approveModalText: {
        textAlign: 'center',
        color: 'white',
        fontSize: defaultFontSize + 4,
        fontWeight: 'bold',
    },
    filterModalOuterContainer: {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        padding: 15,
        backgroundColor: 'rgb(0,0,0,.5)',
    },
    filterModalInnerContainer: {
        backgroundColor: color_lightBlue,
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
    },
    filterModalInnerInnerContainer: {
        backgroundColor: color_lightBlue,
        borderRadius: 5,
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        width: '100%',
        //height: 300,
        padding: 5,
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
    },
    filterModalDropdown: {
        height: 40,
        width: 275,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    dropdownText: {
        color: color_lightGray,
    },
    selectedDropdownText: {
        color: 'black',
    },
    filterModalSubmitRow: {
        height: 60,
        width: 275,
        flexDirection: 'row',
        justifyContent: 'stretch',
        alignItems: 'flex-end',
    },
    filterModalSubmitButton: {
        flexGrow: 1,
        backgroundColor: color_darkBlue,
        color: color_midBlue,
        borderRadius: 8,
        height: 60,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: color_lightLightGray,
        marginLeft: 20,
    },
    filterModalResetButton: {
        flexGrow: 1,
        backgroundColor: 'white',
        color: color_midBlue,
        borderRadius: 8,
        height: 60,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: color_lightGray,
        marginRight: 20,
    },
    logoBar: {
        paddingTop: 30,
        //paddingLeft: 10,
        backgroundColor: color_lightBlue,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    dropShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    h3Text: {
      fontSize: defaultFontSize + 8,
    },
    h4Text: {
      fontSize: defaultFontSize + 4,
    },
    pText: {
        fontSize: defaultFontSize,
    },
    h2Text: {
        fontSize: defaultFontSize + 12,
    },
    h1Text: {
        fontSize: defaultFontSize + 16,
    },
});

export default styles;