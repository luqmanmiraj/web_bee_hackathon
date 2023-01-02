import {React, useState } from 'react';
import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';

const checkbox = (props) => {
    const [statusc , setStatuse] = useState(false);

    function changeStatus(){
      setStatuse(!statusc);
      props.changeValueFn(  !statusc?"checked":"unchecked" , props.index)
    }


    return (<View>
    <Checkbox.Item label="Itemjh" onPress={()=>changeStatus()} status={statusc?"checked":"unchecked"} />
  </View>)
}
;

export default checkbox;