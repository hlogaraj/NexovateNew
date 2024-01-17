import {MMKVLoader} from "react-native-mmkv-storage";

export const MMKVwithEncryption = new MMKVLoader()
    .withEncryption()
    .initialize();
