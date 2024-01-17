const {View, Image, Text} = require("react-native");
const styles = require("./Styles");
const {Ionicons} = require("@expo/vector-icons");

const LogoBar = () => {
    return (
        <View style={styles.logoBar}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: 15, alignSelf: 'center'}}>
                <Image source={require('./assets/splash.png')} style={{width: 30, resizeMode: 'contain', alignSelf: 'center', marginRight: 15}}/>
                <Text style={styles.logoText}>Nexovate</Text>
            </View>
            <Ionicons style={{right: 15}} name={'menu'} size={36}/>
        </View>
        )
}

export default LogoBar;
