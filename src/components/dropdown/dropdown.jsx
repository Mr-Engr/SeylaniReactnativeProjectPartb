import * as React from 'react';
import { View ,Text, StyleSheet} from 'react-native';


const MyComponent = () => {
  const [checked, setChecked] = React.useState('first');
  function radioValue(value){
      console.log(value)
  }

  return (
    <View style={styles.container}>
     <View>
     <RadioButton
        value="first"
        status={ checked === 'first' ? 'checked' : 'unchecked' }
        onPress={() => radioValue('first')}
      />
      <Text>Monthly Ration</Text>
     </View>
    <View>
    <RadioButton
        value="second"
        status={ checked === 'second' ? 'checked' : 'unchecked' }
        onPress={() => radioValue('second')}
      />
      <Text>Daily Ration 1</Text>
    </View>
     <View>
     <RadioButton
        value="second"
        status={ checked === 'second' ? 'checked' : 'unchecked' }
        onPress={() => radioValue('second')}
      />
      <Text>Daily Ration 2</Text>
     </View>
     <View>
     <RadioButton
        value="second"
        status={ checked === 'second' ? 'checked' : 'unchecked' }
        onPress={() => radioValue('second')}
      />
      <Text>Daily Ration 3</Text>
     </View>
      <View>
      <RadioButton
        value="second"
        status={ checked === 'second' ? 'checked' : 'unchecked' }
        onPress={() => radioValue('second')}
      />
      <Text>Daily Ration 4</Text>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container : {
        width : "100%",
        flex : 2,
        height:"100%",
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
    }
})

export default MyComponent;