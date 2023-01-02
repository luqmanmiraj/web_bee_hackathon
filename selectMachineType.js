import { View} from 'react-native';
import {React, useEffect, useState } from 'react';
import { List } from 'react-native-paper';
import { getData } from './storage';

export default function selectMachineType(props) {
    const [expanded, setExpanded] = useState(false);
    const handlePress = () => setExpanded(!expanded);
    const [machines , setMachines] = useState([]);
    const [title,setTitle] = useState('Select Machine Type')
    useEffect(()=>{
        getData('MT').then(data=>setMachines(data))

    })
function setValue(i,name){
    setTitle(name);
    props.selectedMachineType(i,name);
    handlePress();
}
return (<View style={{margin:10}}>
<List.Section>
<List.Accordion
    expanded={expanded}
    onPress={handlePress}
    title={title}
      left={props => <List.Icon {...props} icon="" /> }
      >
        {machines.length>0 && machines.map( (v,i)=>(<List.Item key={"smtp"+i} title={v} onPress={()=>setValue(i,v)}/>))    }

    </List.Accordion> 

</List.Section>
</View>
)
}