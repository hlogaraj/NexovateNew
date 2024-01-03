import {StyleSheet, Title, Text, View, TextInput, Pressable, TouchableOpacity, Button, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useFonts} from 'expo-font';
import {useNavigation} from '@react-navigation/native';
import styles from './Styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Order from './Order.js';
import storage from './Storage.js';

const LogInPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();


    useEffect(() => {
        clearData();
    });

    const [customFontsLoaded] = useFonts({
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    });

    const storeLoginResponse = async (response) => {
        const parsedResponse = await response.json();
        const parsedToken = await parsedResponse.userInfo.token;
        const stringifiedResponse = JSON.stringify(parsedResponse);
        const stringifiedToken = JSON.stringify(parsedToken);

        storage.set('Response', stringifiedResponse);
        storage.set('Token', parsedToken);
    }

    function navigateToDashboard() {
        navigation.navigate('MainApp');
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
                        throw new Error('Request failed with status ' + response.status);
                    }
                    if (response.ok) {
                        navigateToDashboard();
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
        } catch (error) {
            console.error('Login error: ', error);
        }
    }

    return (
        <View style={styles.pageContainer}>
            <View style={[styles.loginPage, styles.lightBackgroundColor]}>
                <Title style={styles.darkBlueColor}></Title>
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
                            style={[styles.loginButton, styles.darkBlueBackgroundColor]}
                            onPress={handleLogin}>
                            <Text style={styles.loginButtonText}>Log In</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default LogInPage;