import { StyleSheet, Platform} from 'react-native';

const defaultFontSize = Platform.OS === 'ios' ? 17 : 14;

const color_darkBlue = '#1e4a6d';
const color_lightBlue = '#f0f1f5';
const color_lightGray = 'rgb(140, 140, 140)';
const color_lightLightGray = 'rgb(220, 220, 220)';
const color_brightBlue = '#4b6e8a';

const styles = StyleSheet.create({
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
    brightBlueColor: {
        color: color_brightBlue,
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
        width: '100%',
        backgroundColor: color_brightBlue,
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
        flex: 0.5,
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
        justifyContent: 'flex-end',
        position: 'relative',
        width: '100%',
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
    },
    loginInputWrapper: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'rgb(200,200,200)',
    },
    loginInputExpanded: {
        width: '100%',
        borderBottomColor: 'rgb(190, 0, 0)',
        borderBottomWidth: 1,
        zIndex: 1,

    },
    loginButtonWrapper: {
        width: '100%',
        paddingTop:8,
    },
    loginButton: {
        padding: 10,
        width: '100%',
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
        backgroundColor: 'rgba(0, 255, 0, 0.6)',
    },
    redBackground: {
        backgroundColor: 'rgba(255, 0, 0, 0.6)',
    },

    loginButtonText: {
        color: 'white',
        textAlign: 'center',
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
        flex: 1,
        //backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        //position: 'relative',
        paddingTop: '60%',
        //paddingBottom: '25%',
        width: '100%',
    },
    standardPage: {
        flex: 1,
        //backgroundColor: '#f0f1f5',
        alignItems: 'center',
        justifyContent: 'center',
        //position: 'relative',
        //paddingTop: '25%',
        width: '100%',
        maxWidth: 500,
        padding: 15,
    },
    pageContainer: {
        flex: 1,
        backgroundColor: '#fff',
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
        width: '100%',
        borderWidth: 1,
        alignContent: 'stretch',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginVertical: 5,
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
    },
    modalView: {
        margin: 20,
        backgroundColor: 'rgba(0,0,0,.7)',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flexShrink: 1,
        alignSelf: 'center',
        maxHeight: 200,
    },
    modalText: {
        textAlign: 'center',
        color: 'white',
    },
});

export default styles;