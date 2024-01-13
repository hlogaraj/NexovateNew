import {Text, View, Pressable, BackHandler, ScrollView} from 'react-native';

import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import styles from './Styles.js';
import { Ionicons } from '@expo/vector-icons';

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
                    <View style={[styles.dashboardButton, styles.brightBlueBackgroundColor]}>
                        <Pressable onPress={navigateToPOListPage} style={styles.dashboardButton}>
                            <Ionicons name="receipt-outline" size={24} color='white' style={styles.topRightIcon}/>
                            <Text style={styles.dashboardButtonText}>Awaiting Approval</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScrollView>

    )
}

export default Dashboard;