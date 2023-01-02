import { View,  Button ,TextInput,StyleSheet} from 'react-native';
import { useEffect, useState } from 'react';
import { getData ,removeItem, storeData } from './storage';
import SingleMAchine from './listSingleMachine';
import { Text} from 'react-native-paper';

import Divider from './divider';

export default function MachinesType(props) {
    // console.log('machines of one kind props ');

    const [mtf , SetMtf] = useState([]);
    const [mtfEnt , setMtfEnt] = useState([]);
  
    useEffect( () => {
        try{
          getData('MTF'+props.mtId).then(
            data=>{
              if(data!==-1){
                SetMtf(data);
              }
        })
          getData('MTF'+props.mtId+'E').then(
              data=>{
                  if(data !== -1) setMtfEnt(data)
              }
          )  
        }catch(err){
          console.log(err)
        }        
    },[])
async function mdelete(mId){
  try{
    let MT = await getData('MT');
    MT[mId] = "null";
    await storeData('MT', MT);
    await removeItem("MTF"+mId);
    await  removeItem("MTF"+mId+"E");
  }
  catch(e){
    console.log(e);
  }

}

    return (<View>
      <View  style={{flexDirection:"row"}}>
         

        <Text style = {{width:200,color:"#4267b2"}}variant="headlineSmall" title={props.title} onPress={() => {  props.navigation.navigate('Add Machine Type')}} >{props.title} </Text>
            {/* <IconButton
                icon="delete"
                iconColor={"red"}

                size={20}
                onPress={() => console.log('Pressed')}
            /> */}
            {/* <IconButton
                icon="delete"
                iconColor={"blue"}
                size={20}
                onPress={() => mdelete(props.mtId)}
            />
          */}

         </View>
         <Divider title ={props.title +" Machines "}/>
         {mtfEnt.map((v,i)=>(<SingleMAchine key={"machines"+i} entry={v} model={mtf} index={i} />) )} 
        
      </View>
    );
  }