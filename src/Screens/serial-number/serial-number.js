import React, { useState } from 'react';
import { View  ,Text , TextInput, StyleSheet ,TouchableOpacity} from 'react-native';
import { db , doc, updateDoc } from '../../configs/firebase';

const SerialNumber = () => {
    let [serialInp , setSerialInp]= useState('')

    async function verifyNow(){
        try {
            let dataRef = doc(db , "" , serialInp)
            await updateDoc(dataRef , {
                branchManager : 'ApprovedBM',
            })
        } catch (error) {
            console.log(error , "error")
        }
    }
    return (
        <View>
            <TextInput placeholder="Enter Serial Number" style={styles.input} value={serialInp} onChangeText={(e)=>{setSerialInp(e)}}  />
            <View>
                <TouchableOpacity onPress={verifyNow}><Text> Qr Code Authentication</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input : {
        width:250,
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor : 'rgb(195, 195, 195)',
        padding: 10,
        borderRadius : 5,

    },

})

export default SerialNumber;
