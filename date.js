// 
import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default function date(props) {
  const [date, setDate] = useState(new Date(Date.now()));
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    let dormatedDate = currentDate.split("T")[0];
    props.changeValueFn( dormatedDate,props.index);

  };
  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };


  return (
    <View style={{ justifyContent: "space-around", margin: 10 }}>
      <Button onPress={showDatepicker} title="Select Date" />
      <Text style={{margin:10}}>{date.toLocaleString().split('')}</Text>
    </View>
  );
}