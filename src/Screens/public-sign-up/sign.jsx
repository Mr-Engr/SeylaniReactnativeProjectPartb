import React, { useState } from 'react';
import { View , Text , StyleSheet ,TextInput , TouchableOpacity , Image} from 'react-native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { auth , createUserWithEmailAndPassword ,db ,setDoc, doc } from '../../configs/firebase';
import LogoKhanaSabkliye from '../../images/LogoKhanaSabkliye.png';
import { Ionicons } from '@expo/vector-icons';

const SignUpPublic = ({navigation}) => {
    let [fontsLoaded] = useFonts({
        Inter_900Black,
      });
    let [email , setEmail] = useState('');
    let [password , setPassword] = useState('');
    let [age , setAge] = useState('');
    let [name , setName] = useState('');
    async function signUpFunc(){
        try {
            let {user} = await createUserWithEmailAndPassword(auth, email , password)
            if(user){
                let userObj = {
                    name,
                    age,
                    email : user.email,
                    uid : user.uid,
                    createdat : user.uid,
                    role : "public"

                }
                let dataRef = doc(db , "users" , user.uid)
                let savedData = await setDoc(dataRef, userObj) 
                navigation.navigate("home")

            }
        } catch (error) {
            console.log("error : " , error)
        }
        
    }
    return (
        <View style={styles.container}>
        <View style={styles.view3}>
            <Image source={LogoKhanaSabkliye} style={styles.img} />
        </View>
        <View style={styles.view1}>
            <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={(e)=>{setEmail(e)}}  />
        </View>
        <View style={styles.view2}>
            <TextInput placeholder="name" style={styles.input} value={name} onChangeText={(e)=>{setName(e)}}  />
        </View>
        <View style={styles.view4}>
            <TextInput placeholder="age" style={styles.input} value={age} onChangeText={(e)=>{setAge(e)}}  />
        </View>
        <View style={styles.view2}>
            <TextInput placeholder="Password" secureTextEntry={true} style={styles.input} value={password} onChangeText={(e)=>{setPassword(e)}}  />
        </View>
        
    <View style={styles.btnDiv}>
    <TouchableOpacity onPress={signUpFunc}><Ionicons name="md-checkmark-circle" size={70} color="green" /></TouchableOpacity>
    </View>
    </View>
      
    )
}



const styles = StyleSheet.create({
    view3 : {
        backgroundColor :'#ffffff',
        paddingTop:10,
        paddingLeft:62.2,
        paddingRight:62.2,
    },
    view2 : {
        backgroundColor :'#ffffff',
    },
    view1 : {
        backgroundColor :'#ffffff'
    },
    view4 : {
        backgroundColor :'#ffffff'
    },
    input : {
        width:250,
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor : 'rgb(195, 195, 195)',
        padding: 10,
        borderRadius : 5,

    },

    img: {
        width:150,
        height:100,
    },

    container : {
        width:"100%",
        height:"100%",
        flex:1,
        justifyContent : 'center',
        alignItems:'center',
        backgroundColor:'#dedfe0',
        paddingBottom:100
    },
    btnDiv : {
        position : 'relative',
        top : 150,
        left : 110,
    },


})


export default SignUpPublic;
