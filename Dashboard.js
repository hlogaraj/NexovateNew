import {Text, View, Pressable, BackHandler, ScrollView} from 'react-native';

import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import styles from './Styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Dashboard = () => {

    const navigation = useNavigation();

    function navigateToPOListPage() {
        /*
        (async () => {
            await AsyncStorage.removeItem('Orders');
        })();

         */
        navigation.navigate('Queued for Approval');
    }

    return (
        <ScrollView>
            <View style={styles.pageContainer}>
                <View style={[styles.standardPage, styles.lightBackgroundColor]}>
                    <View style={[styles.loginButton, styles.darkBlueBackgroundColor]}>
                        <Pressable onPress={navigateToPOListPage}>
                            <Text style={styles.loginButtonText}>Awaiting Approval</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScrollView>

    )
}

export default Dashboard;