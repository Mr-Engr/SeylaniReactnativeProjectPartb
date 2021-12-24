import React, { useState, useEffect, useContext } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { GlobalContext } from '../../context/context';

export default function ImagePickerExample() {
    let {state , dispatch} = useContext(GlobalContext);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      dispatch({type : "APP_IMAGE" , payload : result.uri})
    }
  };

  return (
    <View>
      <Button title="upload image" onPress={pickImage} />
      
    </View>
  );
}
