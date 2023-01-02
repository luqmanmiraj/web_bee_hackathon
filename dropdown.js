import { View, Text, Button ,TextInput,StyleSheet, Dimensions } from 'react-native';
import {React, useState } from 'react';
import { List,Surface } from 'react-native-paper';

export default function DropDown(props) {
    console.log(props.row);
    const [expanded, setExpanded] = useState(false);
    const handlePress = () => setExpanded(!expanded);
function setValue(i,type,attr){
    props.setValue(i,type,attr);
    handlePress();
}
return (
<View >
<List.Section>
<List.Accordion 
    expanded={expanded}
    onPress={handlePress}
    title={props.title }
      left={props => <List.Icon {...props} icon="" />}
      >
      <List.Item  title="Text" onPress={()=>setValue(props.row,"text",props.attribute)}/>
      <List.Item   title="Number" onPress={()=>setValue(props.row,"number",props.attribute) }/>
      <List.Item   title="Check" onPress={()=>setValue(props.row,"check",props.attribute) }/>
      <List.Item  title="Date" onPress={()=>setValue(props.row,"date",props.attribute) }/>
    </List.Accordion> 

</List.Section>
</View>

)
}