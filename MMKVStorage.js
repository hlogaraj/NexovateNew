import { MMKV } from 'react-native-mmkv'

const MMKVStorage = new MMKV({
    id: `nexovate-user-storage`,//*****************************************
    path: `/storage`,
    encryptionKey: 'hunter2'
})

export default MMKVStorage;