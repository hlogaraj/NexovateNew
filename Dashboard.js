import {Text, View, Pressable, BackHandler, ScrollView} from 'react-native';

import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import styles from './Styles.js';

const Dashboard = () => {

    const navigation = useNavigation();

    function navigateToPOListPage() {
        navigation.navigate('Queued for Approval')
    }

    return (
        <ScrollView>
            <View style={styles.pageContainer}>
                <View style={[styles.standardPage, styles.lightBackgroundColor]}>
                    <View style={[styles.loginButton, styles.darkBlueBackgroundColor, {margin: 10}]}>
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