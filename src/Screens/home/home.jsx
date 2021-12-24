import React, { useContext, useState ,useEffect } from 'react';
import { View , Text , TextInput ,StyleSheet ,ScrollView ,Button  ,Image, TouchableOpacity , Dimensions } from 'react-native';
import DropDown from '../../components/dropdown/dropdown';
import * as ImagePicker from 'expo-image-picker';
import ImagePickerExample from '../../components/image-picker/applicantimagepicker';
import CnicPick1 from '../../components/cnic/frontcnic';
import CnicPick2 from '../../components/cnic/backcnic';
import { GlobalContext } from '../../context/context';
import { db , doc , setDoc, storage ,ref , uploadBytes ,getDownloadURL  } from '../../configs/firebase';
import * as Location from 'expo-location';
import TitleImage from '../../images/LogoKhanaSabkliye.png';
import { Ionicons } from '@expo/vector-icons';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';


const MainHome = ({navigation}) => {
    let {state , dispatch} = useContext(GlobalContext)
    let [familyMembers , setFamilyMembers] = useState('');
    let [monthlyIncome , setMonthlyIncome] = useState('');
    let [MonthlyRation , setMonthlyRation] = useState('');
    let [name , setName] = useState('');
    let [fatherName , setFatherName] = useState('');
    let [cnic , setCnic] = useState('');
    let [dateOfBirth , setDateOfBirth] = useState('');
   

    const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      setLocation({ latitude, longitude });
        dispatch({type : "LATITUDE" , payload : latitude})
        dispatch({type : "LONGITUDE" , payload : longitude})
    } catch (error) {
      console.log(error);
    }
    console.log("hello")
  };

  useEffect(() => {
    getLocation();
    console.log(state)
  }, []);




    const submitFormFunc = async () =>{
       let mathRandom = Math.floor(Math.random() * 1000000000);
        try {
            let storageRef1 = ref(storage,`${state.activeUser.uid}/${mathRandom}`)
            await uploadBytes(storageRef1,state.applicantPic)
            let URL1 =  await getDownloadURL(ref(storage, `${state.activeUser.uid}/${mathRandom}`))

            let storageRef2 = ref(storage,`${state.activeUser.uid}/${mathRandom}`)
            await uploadBytes(storageRef2,state.cnicFrontPic)
            let URL2 =  await getDownloadURL(ref(storage, `${state.activeUser.uid}/${mathRandom}`))

            let storageRef3 = ref(storage,`${state.activeUser.uid}/${mathRandom}`)
            await uploadBytes(storageRef3,state.cnicBackPic)
            let URL3 =  await getDownloadURL(ref(storage, `${state.activeUser.uid}/${mathRandom}`))
            let dataRef = doc(db , "publcApplicaitons" , state.activeUser.uid);
            
            let detailsObj = {
                name , 
                fatherName,
                cnic,
                dateOfBirth,
                familyMembers,
                monthlyIncome, 
                MonthlyRation,
                URL1,
                URL2,
                URL3,
                uid : state.activeUser.uid,
                createdAt : new Date(),
                nearestOne : state.nearestOne
            }
            await setDoc(dataRef , detailsObj)
            navigation.navigate('Approved')
        } catch (error) {
            console.log(error)
        }
    }

    function setLocationFunc(){
        navigation.navigate('location')
    }


    return (
        <ScrollView>
                    <View style={styles.container}>
        <View style={styles.view3}>
            <Image source={TitleImage} style={styles.img} />
        </View>
        <View style={styles.view1}>
            <TextInput onChangeText={(e)=>{setName(e)}} style={styles.input} placeholder="Enter name" value={name} />
        </View>
        <View style={styles.view2}>
            <TextInput value={fatherName} onChangeText={(e)=>{setFatherName(e)}} style={styles.input} placeholder="Enter father name" />
        </View>
        <View style={styles.view4}>
            <TextInput value={cnic} onChangeText={(e)=>{setCnic(e)}} style={styles.input} placeholder="Enter cnic number" />
        </View>
        <View style={styles.view2}>
            <TextInput value={dateOfBirth} onChangeText={(e)=>{setDateOfBirth(e)}} style={styles.input} placeholder="Enter Date of Birth" />
        </View>
            <View style={styles.view2}>
                <TextInput value={familyMembers} onChangeText={(e)=>{setFamilyMembers(e)}} style={styles.input} placeholder="Enter family members" />
            </View> 
            <View style={styles.view2}>
                <TextInput style={styles.input} value={monthlyIncome} onChangeText={(e)=>{setMonthlyIncome(e)}} placeholder="Enter Monthy Income" />
            </View>
            <View style={styles.view2}>
                <TextInput value={MonthlyRation} onChangeText={(e)=>{setMonthlyRation(e)}} style={styles.input} placeholder="Enter Monthy ration" />
            </View>
            <View style={styles.comp1}>
                <ImagePickerExample />
            </View>
            <View style={styles.comp2}>
                <CnicPick1 />
            </View>
            <View style={styles.comp3}>
                <CnicPick2 />
            </View> 
          <View style={styles.parentBtn}>
        
        
                    <View style={styles.btnDiv1} >
    <TouchableOpacity style={styles.touchBtn} onPress={setLocationFunc}><Text style={{color:'white'}}>Set Location</Text></TouchableOpacity>
    </View>
     
                
                        
           
        
    <View style={styles.btnDiv2}>
    <TouchableOpacity style={styles.touchBtn} onPress={submitFormFunc}><Text style={{color:'white'}}>Submit</Text></TouchableOpacity>
    </View>
          </View>
    </View>
        </ScrollView>
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
        // backgroundColor:'#dedfe0',
        // paddingBottom:100
    },
    btnDiv1 : {
        padding: 10,
        position : 'relative',
        bottom : 50,
        left : 90,
        backgroundColor : 'green',
    },
    btnDiv2 : {
        padding: 10,
        position : 'relative',
        bottom : 30,
        left : 90,
        backgroundColor : 'green',
    },
    comp1: {
        position : 'relative',
        right : 80 ,
        top: 115
    },
    comp2: {
        position : 'relative',
        right : 91,
        top:40
        // top:30
    },    
    comp3: {
        position : 'relative',
        right : 95,
        bottom : 35
    },
    touchBtn : {

        color:'white'
    },


})

export default MainHome;
