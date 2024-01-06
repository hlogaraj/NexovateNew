import React, {useEffect, useState} from 'react';
import {Text, View, TextInput, Pressable, FlatList, Button, Platform, Switch, ScrollView, SafeAreaView, Animated, ActivityIndicator, Alert, Modal } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {useNavigation} from "@react-navigation/native";
import styles from './Styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Order from './Order.js';


const ItemNoteEntry = (props) => {

    const [notes, setNotes] = useState('');

    function submitNote() {
        props.onSubmitNote(notes);
        setNotes('');
    }
    return(

            <View style={styles.inLineNoteCenteredView}>
                <View style={styles.inLineModalView}>
                    <View style={[styles.standardBox, styles.orderBox]}>
                        <TextInput
                            editable={true}
                            multiline={true}
                            numberOfLines={3}
                            maxLength={200}
                            onChangeText={(text) => setNotes(text)}
                            style={{padding: 10, width: '100%', height: 100}}
                            placeholder='Type your notes here'
                            placeholderTextColor={styles.lightGrayColor.color}
                            value={notes}
                            textAlign='left'
                            textAlignVertical='top'
                            autoFocus={true}
                            clearTextOnFocus={true}
                        />
                    </View>
                    <Pressable style={[styles.attachNotesButton, styles.greenBackground]} onPress={submitNote}>
                        <Animated.View>
                            <Text style={{color: 'black', fontWeight: 500,}}>ATTACH NOTES</Text>
                        </Animated.View>
                    </Pressable>
                </View>
            </View>
    )
}

export default ItemNoteEntry;