import {React, useState } from 'react';
import { View, Text, Button  } from 'react-native';

import SelectMachineType from './selectMachineType';
import Checkbox from './checkbox';
import Date1 from './date';
import Number from './number';
import Text1 from './text'
import { getData, storeData } from './storage';
const MachineEntries = ({navigation , route}) => {
    const [model , SetModel] = useState([]);
    const [mtfKey , setMtfKey] = useState('');
    const [entryValues , setEntryValue] = useState([]);
    const [newEntry, setNewEntry] = useState(true);
    const [entryId , setEntryId] = useState(0);
 
function changeValue(v,i){
        console.log('change value is called');
        let newEntryValues = [...entryValues];
        newEntryValues[i]['value'] = v;
        setEntryValue(newEntryValues);
}

 async function selectedMachineType(i,name){
   let data = await getData('MTF'+i);
   SetModel(data);
   setMtfKey('MTF'+i);
   setEntryValue([...data]);
 }

 async function save(){
   try{
   let data = await  getData(mtfKey+"E");
   if(Array.isArray(data)){
       let newData = [...data];
       if(newEntry){
         newData.push(entryValues);
         setNewEntry(false);
         await storeData(""+mtfKey+'E', newData );
         setEntryId(data.length);

       }
       else{
        newData[entryId] = entryValues;
        await storeData(""+mtfKey+'E', newData );
       }

       
 
   }else{
     await storeData(""+mtfKey+"E" , [entryValues] ) ;
     setEntryId(0);
   }
   }catch(err){
    console.log(err)
   }
  

 }
 const inputType = (v,i) => {
    switch(v.inputType) {
      case "text":   return (<Text1 data  = {v} changeValueFn={changeValue} index = {i} />);
      case "check":   return (<Checkbox data = {v} changeValueFn = {changeValue} index = {i} />);
      case "date": return ( <Date1 data = {v} changeValueFn = {changeValue} index = {i}  />);
      case "number":  return (<Number data = {v} changeValueFn={changeValue} index = {i}/>);
      default: return <></>
    }
  }

  return (<> 
  <Text> Select Machine Type</Text>
  {<SelectMachineType selectedMachineType={selectedMachineType}/>}
  <View style={{margin:10,marginBottom:20}}>
  { model.length>0 && model.map( (v,i)=>( inputType(v,i)) )}
  </View>
  <View style={{flexDirection:"row"}}>
    <View style={{flexGrow:0.5,margin :10}}>
                <Button title="Save" onPress={()=> save()  } />
                </View>
                <View style={{flexGrow:0.5,margin :10 }}>
                <Button title="Add New" onPress={()=> {setNewEntry(true);}  } /></View>
  </View>
  </>
  
  );
};

export default MachineEntries;