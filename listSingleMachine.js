import {React, useState,useEffect } from 'react';
import { View,  Button ,TextInput,StyleSheet} from 'react-native';
import { List, Text , IconButton, MD3Colors} from 'react-native-paper';

function SingleMAchine(props) {

    let [data, setData] = useState([]);
    let [titleField, setTitleField] = useState({"name":"", "value":""});


    useEffect( ()=>{

        let newData = [];
        props.model.map( (m,i)=>{
            if(m.displayTitle){
                let newField = {
                    "id":i,
                    "inputType":m.inputType,
                    "name":m.name,
                    "value": props.entry[i].value
    
                }
                setTitleField(newField)
            }
            let field = {
                "id":i,
                "inputType":m.inputType,
                "name":m.name,
                "value": props.entry[i].value

            };
            newData.push(field);
            
        });
        setData(newData);

    } ,[])

    return (
    <View>

<View  style={{flexDirection:"row"}}>

         <Text style = {{marginTop:10,width:245,color:"#4267b2"}}variant="titleLarge" title={titleField.value==""?"No titled Machine":titleField.value} onPress={() => {  props.navigation.navigate('Add Machine Type')}} >{titleField.value==""?"No titled Machine":titleField.value}</Text>

             {/* <IconButton
                 icon="delete"
                 iconColor={"red"}
 
                 size={20}
                 onPress={() => console.log('Pressed')}
             /> */}
             <IconButton
                 icon="square-edit-outline"
                 iconColor={"blue"}
                 size={20}
                 onPress={() => console.log('Pressed')}
             />
          
 
          </View>

    <List.Section>
    {data.map((v,i)=>( <List.Item key={"singleListMachine"+i}size = {20}style={{fontSize:10}} title={v.name +" : "+v.value } left={() => <List.Icon size={10} icon="square" />} /> ))
}
  </List.Section>
      </View>)
}
export default SingleMAchine;
