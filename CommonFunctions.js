import {MMKVwithEncryption} from "./App";

function retrieveData(key) {
    try {
        let value = MMKVwithEncryption.getString(key);
        if (value !== null) {
            return value
        } else {
            console.log('String not found.');
        }
    } catch (error) {
        console.log('Error retrieving string: ', error);
    }
};

function storeData(key, value) {
    try {
        MMKVwithEncryption.setString(key, value);
        //console.log('String stored successfully.');
    } catch (error) {
        console.log('Error storing string: ', error);
    }
};