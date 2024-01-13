import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    TouchableOpacity,
    Button,
    ScrollView,
    Alert,
    Modal
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useFonts} from 'expo-font';
import {useNavigation} from '@react-navigation/native';
import styles from './Styles.js';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import Order from './Order.js';
//import storage from './MMKVStorage.js';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {MMKVwithEncryption} from "./App";
import {Ionicons} from "@expo/vector-icons";
import POListPage from "./POListPage";
import {MMKV} from "react-native-mmkv";

const LogInPage = () => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [failureModalVisible, setFailureModalVisible] = useState(false);

    const navigation = useNavigation();

   function clearData() {
        MMKVwithEncryption.clearStore();
    }
    useEffect(() => {
        clearData();
    }, []);

    const [customFontsLoaded] = useFonts({
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    });

    const storeLoginResponse = async (response) => {
        const parsedResponse = await response.json();
        const parsedToken = await parsedResponse.userInfo.token;
        const stringifiedResponse = JSON.stringify(parsedResponse);
        const stringifiedToken = JSON.stringify(parsedToken);

        MMKVwithEncryption.setString('Response', stringifiedResponse);
        MMKVwithEncryption.setString('Token', parsedToken);
        navigateToDashboard();
        //console.log(MMKVwithEncryption.getString('Token'));
    }

    function navigateToDashboard() {
        navigation.navigate('Dashboard');
    }

    async function handleLogin() {
        const loginData = {
            username: username,
            password: password,
        }

        try {
            fetch('https://jdeps.nexovate.com:7077/jderest/v2/tokenrequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            })
                .then((response) => {
                    if (!response.ok) {
                        setFailureModalVisible(true);
                        setUsername('');
                        setPassword('');
                    }
                    if (response.ok) {

                        setUsername(''); //clear the entered username
                        setPassword(''); //clear the entered password
                        storeLoginResponse(response);
                        //console.log(response);
                        //let responseData = response.json();
                        //let token = responseData.userInfo.token;
                        //console.log(JSON.stringify(responseData));
                        //console.log("Response Data: " + responseData);
                        //console.log("Token: " + token);
                    }
                })
                .catch ((error) => {
                    console.log("Error logging in: ", error);
                })
        } catch (error) {
            console.error('Login error: ', error);
        }
    }

    const FailureModal = () => {
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={failureModalVisible}
                onShow={() => {
                    setTimeout(() => {
                        setFailureModalVisible(false);
                    }, 3000);
                }}
                onRequestClose={() => {
                    setFailureModalVisible(false);
                }}
                onDismiss={() => {
                    setFailureModalVisible(false);
                }}>
                <View style={styles.failedLoginCenteredView}
                      onTouchStart={() => {
                          setFailureModalVisible(!failureModalVisible);
                      }}>
                    <View style={styles.modalView}>
                        <Text style={[styles.approveModalText,styles.redColor]}>Login failed</Text>
                    </View>
                </View>
            </Modal>
        )
    }

    return (
        <ScrollView>
            <FailureModal/>
            <View style={styles.pageContainer}>
                <View style={[styles.loginPage, styles.lightBackgroundColor]}>

                    <Text style={[styles.title, styles.darkBlueColor]}>Nexovate Inc.</Text>
                    <View style={styles.loginForm}>
                        <View style={styles.loginFormRow}>
                            <View style={[styles.loginInputWrapper, styles.whiteBackground]}>
                                <TextInput
                                    style={styles.loginInput}
                                    placeholder="Username"
                                    placeholderTextColor={styles.lightGrayColor.color}
                                    default=''
                                    value={username}
                                    onChangeText={(username) => setUsername(username)}
                                />
                            </View>

                        </View>
                        <View style={styles.loginFormRow}>
                            <View style={[styles.loginInputWrapper, styles.whiteBackground]}>
                                <TextInput
                                    style={styles.loginInput}
                                    placeholder="Password"
                                    placeholderTextColor={styles.lightGrayColor.color}
                                    default=''
                                    value={password}
                                    onChangeText={(password) => setPassword(password)}
                                    secureTextEntry={true}
                                />
                            </View>
                        </View>
                        <View style={styles.loginButtonWrapper}>
                            <Pressable
                                style={[styles.loginButton,(username === '' || password === '')
                                    ? {backgroundColor: 'rgb(185, 185, 185)',}
                                    : styles.darkBlueBackgroundColor,
                                    ]}
                                onPress={handleLogin}>
                                <Text style={styles.loginButtonText}>Log In</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>

    )
}

export default LogInPage;