import React, { useContext, useEffect } from 'react';
import { View ,Text , ScrollView} from 'react-native';
import { State } from 'react-native-gesture-handler';
import { GlobalContext } from '../../context/context';

const Approved = () => {
    let {state,dispatch} = useContext(GlobalContext)
    useEffect(()=>{
        console.log(new Date(state.publicApplications.createdAt.seconds))
    },[])
    return (
        <ScrollView>
            <View>
                <Text>Free Lunch, Dinner and Breakfast for ALL</Text>
            </View>
            <View>
                <Text>Father Name : {state.publicApplications.fatherName}</Text>
            </View>
            <View>
                <Text>Cnic No : {state.publicApplications.cnic}</Text>
            </View>
           
           
        </ScrollView>
    )
}

export default Approved;
