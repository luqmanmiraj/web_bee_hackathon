import { View, StyleSheet, Dimensions, SafeAreaView, ScrollView, StatusBar, Button } from 'react-native';
import { React, useState, useEffect } from 'react';
import DropDown from './dropdown';
import { storeData, getData } from './storage';
import uuid from 'react-native-uuid';
import Divider from './divider';
import { Switch, Text, TextInput } from 'react-native-paper';

export default function AddMachineType({ navigation, route }) {
  const [expanded, setExpanded] = useState(false);
  const [machine, setMachine] = useState('');
  const [mtId, SetMtId] = useState(-1);


  const [newMachine, SetNewMachine] = useState(true);
  useEffect(() => {
    if (route.params.id >= 0) {
      SetMtId(route.params.id);
      setMachine(route.name);
      SetNewMachine(false);
    }
  }, [])
  const handlePress = () => setExpanded(!expanded);
  var width = Dimensions.get('window').width; //full width
  const [attribute, setAttribute] = useState([{ "id": uuid.v4(), "inputType": "text", "value": "", "name": " Name ", 'displayTitle': false }]); // Array Destructuring


  function addAtrr(attribute, inputType) {
    let newobj = [...attribute, { "id": uuid.v4(), "inputType": inputType, "value": "", "name": "", 'displayTitle': false }]
    return setAttribute(newobj)
  }

  function deleteAttr(index, attr) {
    let newAr = [...attr];
    newAr.splice(index, 1);
    return setAttribute(newAr)
  }

  function setValue(i, inputType, attr) {
    let newAr = [...attr];
    newAr[i]['inputType'] = inputType;
    setAttribute(newAr);
    handlePress()
  }

  function InputName(index, attribute, e) {
    let newAr = [...attribute];
    newAr[index]['name'] = e
    return setAttribute([...newAr])
  }

  function makeTitle(i) {
    let newAttr = [...attribute]
    newAttr.forEach((v) => {
      v['displayTitle'] = false;
    })
    newAttr[i]['displayTitle'] = !attribute[i]['displayTitle'];
    setAttribute(newAttr);
  }


  async function save() {
    let data = await getData('MT');
    if (!machine.length) {
      alert('please fill the name');
      return
    }
    if (mtId >= 0) {
      data[mtId] = machine;
      storeData('MT', data);
      let key = "MTF" + mtId;
      storeData(key, attribute);

    }
    if (newMachine) {
      let len = 0;
      if (data !== -1) {
        len = data.length;
        SetMtId(len);
        data.push(machine);
      }
      else {
        data = [machine];
        SetMtId(0)
      }
      storeData('MT', data);
      SetNewMachine(false);

      let key = "MTF" + len;
      storeData(key, attribute);
    }
  }
  function addNewMachineType() {
    setAttribute([{ "id": uuid.v4(), "inputType": "text", "value": "", "name": " Name ", "displayTitle": true }]);
    setMachine('');
    SetMtId(-1)
    SetNewMachine(true);
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View >
          <TextInput
            onChangeText={e => { setMachine(e) }}
            label="Machine Type Name "
            mode="outlined"
            placeholder={machine ? machine : 'Enter Name'}
            value={machine}
            right={<TextInput.Affix text="/100" />}
          />
          <Divider title="Add Attributes below" />
          {attribute.map((x, i) =>
          (<View key= {"addMachineType"+i} >
            <TextInput
              mode="outlined"
              label={'Attribute Name'}
              onChangeText={e => { InputName(i, attribute, e) }}
              value={x['vlaue']}
              right={<TextInput.Affix text="/100" />}
              placeholder={x['value'].length > 0 ? x['value'] : 'Enter name '}
            />
            <View style={{ width: width, flexDirection: 'row' }} >
              <View style={{
                width: 200, marginRight: 10
              }} >
                <DropDown title={x['inputType']} row={i} setValue={setValue} attribute={attribute} />

              </View>
              <View style={{
                marginTop: 20, height: 50, marginRight: 10,
                width: 60,
              }} >
                <Button title="Del" icon="delete" onPress={() => deleteAttr(i, attribute)} >press</Button>
              </View>
              <View style={{
                marginTop: 10,
                width: 80
              }}>
                {/* <Button title="Del" onPress={()=> deleteAttr(i)  } ></Button> */}
                <Text style={{ textAlign: 'right' }} >Make Title</Text>
                <Switch value={x['displayTitle']} onValueChange={() => makeTitle(i)} />
              </View>
            </View>
          </View>

          )

          )}
          <View style={{ width: width, flexDirection: 'row' }}>
            <View style={styles.addbutton}>
              <Button title="Add Attribute" onPress={() => addAtrr(attribute, "text")} />
            </View>
            <View style={styles.addbutton}>
              <Button title="Save" onPress={() => save()} />
            </View>
          </View>
        </View>
        <View >
          <Button title="Add New Machine Type" onPress={() => addNewMachineType()} ></Button>
        </View>
      </ScrollView >
    </SafeAreaView >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    //   backgroundColor: 'pink',
    marginHorizontal: 10,
  },
  addbutton:
  {
    flex: 1,
    position: 'relative',
    width: 100,
    height: 80,
    padding: 1,
    margin: 1,
    flexWrap: 'nowrap',
    flexGrow: 0.5
  },
  deletebutton:
  {
    position: 'relative',
    width: 20,
    height: 80,
    padding: 1,
    margin: 1,
    flexWrap: 'nowrap',
    flexGrow: 0.2
  }
});




