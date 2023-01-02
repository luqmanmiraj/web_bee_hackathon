import {React, useState,useEffect } from 'react';
import { TextInput  } from 'react-native-paper';
function number(props) {
    const [text, setText] = useState("");
    function validate(text){
        if(Number(text)) {
            setText(text);  
            props.changeValueFn(text,props.index)
        }

    }
    return (<TextInput
        label= {props.data.name}
        mode='outlined'
        keyboardType="numeric"
        value={text}
        onChangeText={text =>    { validate(text)}  }
      />)
}
export default number;
