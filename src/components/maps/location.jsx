import React, { useState, useEffect , useContext } from 'react';
import MapView , {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions  } from 'react-native';
import { GlobalContext } from '../../context/context';


export default function GoogleMap({navigation}) {
  let {state, dispatch} = useContext(GlobalContext);

  const NearestBranch = [
    {
        "branch_name": "Aliabad",
        "latitude": 24.9200172,
        "longitude": 67.0612345
    },
    {
        "branch_name": "Numaish chowrangi",
        "latitude": 24.8732834,
        "longitude": 67.0337457
    },
    {
        "branch_name": "Saylani house phase 2",
        "latitude": 24.8278999,
        "longitude": 67.0688257
    },
    {
        "branch_name": "Touheed commercial",
        "latitude": 24.8073692,
        "longitude": 67.0357446
    },
    {
        "branch_name": "Sehar Commercial",
        "latitude": 24.8138924,
        "longitude": 67.0677652
    },
    {
        "branch_name": "Jinnah avenue",
        "latitude": 24.8949528,
        "longitude": 67.1767206
    },
    {
        "branch_name": "Johar chowrangi",
        "latitude": 24.9132328,
        "longitude": 67.1246195
    },
    {
        "branch_name": "Johar chowrangi 2",
        "latitude": 24.9100704,
        "longitude": 67.1208811
    },
    {
        "branch_name": "Hill park",
        "latitude": 24.8673515,
        "longitude": 67.0724497
    }
]


  const [mapRegion, setmapRegion] = useState({
    latitude: state.latitude,
    longitude: state.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });



  const cities = [
    ["Aliabad" ,24.9200172  ,67.0612345],
    ["Numaish chowrangi" ,24.8732834 ,67.0337457 ],
    ["Saylani house phase 2" , 24.8278999 ,67.0688257],
    ["Touheed commercial" , 24.8073692 ,67.0357446] ,
    ["Sehar Commercial" , 24.8138924 , 67.0677652],
    ["Jinnah avenue" , 24.8949528 , 67.1767206],
    ["Johar chowrangi" ,24.9132328 ,67.1246195 ],
    ["Johar chowrangi 2" ,24.9100704 ,67.1208811],
    ["Hill park" , 24.8673515 ,67.0724497]
   ];
   
   const deg2Rad = (deg) => {
     return deg * Math.PI / 180;
   }
   
   const pythagorasEquirectangular = (lat1, lon1, lat2, lon2 , lat3, lon3, lat4, lon4, lat5, lon5, lat6, lon6 , lat7, lon7, lat8, lon8 , lat9, lon9) => {
     lat1 = deg2Rad(lat1);
     lat2 = deg2Rad(lat2);
     lon1 = deg2Rad(lon1);
     lon2 = deg2Rad(lon2);

     lat3 = deg2Rad(lat3);
     lat4 = deg2Rad(lat4);
     lon3 = deg2Rad(lon3);
     lon4 = deg2Rad(lon4);
     lat5 = deg2Rad(lat5);
     lat6 = deg2Rad(lat6);
     lon5 = deg2Rad(lon5);
     lon6 = deg2Rad(lon6);
     lat7 = deg2Rad(lat7);
     lat8 = deg2Rad(lat8);
     lon7 = deg2Rad(lon7);
     lon8 = deg2Rad(lon8);
     lat9 = deg2Rad(lat9);
     lat9 = deg2Rad(lat9);

     const R = 6371;
     const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
     const y = (lat2 - lat1);
     const d = Math.sqrt(x * x + y * y) * R;
     return d;
   }
   const nearestCity = (latitude, longitude) => {
    let mindif = 28.0000000;
    let closest;
   
    for (index = 0; index < cities.length; ++index) {
     const dif = pythagorasEquirectangular(latitude, longitude, cities[index][1], 
       cities[index][2],cities[index][3], cities[index][4],cities[index][5], cities[index][6],cities[index][7], cities[index][8], cities[index][9]   );
       if (dif < mindif) {
       closest = index;
       mindif = dif;
       console.log(dif  )
    }
    return cities[closest]
   }
  }

   useEffect(()=>{
    let nearestOne = nearestCity(state.latitude,state.longitude);
      
    if(nearestOne){
      navigation.navigate("Home")
      dispatch({type : "NEARESTONE" , payload : {nearestOne}})
      console.log("redirect")
    }else{
      dispatch({type : "NEARESTONE" , payload : ''})
    }
      
  
   },[state.activeUser])
   



  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion} >
        <Marker coordinate={mapRegion} title='Your Location' />
        {
          NearestBranch.map((item , index)=>{
            let obj = {
              latitude: item.latitude,
              longitude:  item.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }
            let names = {
              branchName : item.branch_name
            }
            return (
              <Marker coordinate={obj} title={names.branchName} />
            )
          })
        }
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
