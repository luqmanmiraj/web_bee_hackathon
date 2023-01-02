import { useEffect, useState, react } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import AddMachineTypes from './AddMachineType';
import MachineEntries from './machineTypeEntry';
import AllMachines from './allMachines'

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  enGB,
  registerTranslation,
} from 'react-native-paper-dates'
registerTranslation('en_GB', enGB)

function CustomDrawerContent(props) {

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();
function MyDrawer() {
  const [mt, SetMT] = useState([])
  useEffect(() => {
    try {
      getData('MT').then(
        data => {
          console.log(data)
          if (data !== -1)
            SetMT(data)
          else SetMT([])
        })
    } catch (err) {
      console.log(err)
    }


  })
  return (<>
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="All Machines" initialParams={{ 'id': -1 }} component={AllMachines} />

      <Drawer.Screen name="Add Machine Type" initialParams={{
      }} component={AddMachineTypes} />
      <Drawer.Screen name="Add Machine" initialParams={{
        "id": -1
      }} component={MachineEntries} />
      {mt.map((v, i) => (
        <Drawer.Screen key ={"app"+i} label={v + "Machines"} name={v} onPress={() => { }}

          initialParams={{ 'id': i }} component={AllMachines} />))}
    </Drawer.Navigator>

  </>
  );
}

export default function App() {

  return (
    <PaperProvider>
      <NavigationContainer>
        <MyDrawer />

      </NavigationContainer>
    </PaperProvider>
  );
}
