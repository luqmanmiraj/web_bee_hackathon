import { View, Text, Button ,TextInput,StyleSheet, Dimensions } from 'react-native';
import {React} from 'react';

export default function Divider(props) {

return (
<View style={{flexDirection: 'row', alignItems: 'center',marginTop:30,marginBottom:20}}>
  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
  <View>
    <Text style={{width: 150,  textAlign: 'center'}}>{props.title}</Text>
  </View>
  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
</View>
)
}