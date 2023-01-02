import {React, useState,useEffect } from 'react';
import { TextInput  } from 'react-native-paper';
function text1(props) {
    const [text, setText] = useState("");
    function validate(text){
        
            setText(text);  
            props.changeValueFn(text,props.index)
        

    }
    return (<TextInput
        label= {props.data.name}
        mode='outlined'
        value={text}
        onChangeText={text =>    { validate(text)}  }
      />)
}
export default text1;
