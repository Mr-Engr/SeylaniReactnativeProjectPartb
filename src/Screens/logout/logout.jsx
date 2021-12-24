import React, { useContext } from 'react';
import { View , Text, StyleSheet , TouchableOpacity } from 'react-native';
import { auth, signOut } from '../../configs/firebase';
import { GlobalContext } from '../../context/context';

const Logout = ({navigation}) => {
    let {state , dispatch} = useContext(GlobalContext);
    const logoutFunc = async () =>{
        try {
            await signOut(auth)
            dispatch({type : "STATE_CHANGES" , payload : {accept : true}})
            navigation.navigate("Login")
        } catch (error) {
            console.log(error , "error")
        }
    }
    return (
        <View style={styles.logout_div}>
            <View>
                <TouchableOpacity onPress={logoutFunc}><Text>Logout</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    logout_div : {
        flex :1,
        width:"100%",
        justifyContent : 'center',
        alignItems : 'center',
        height:"100%",
    }
})

export default Logout
