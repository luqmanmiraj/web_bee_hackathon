import { View, Text, Button, TextInput, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { useEffect, useState } from 'react';
import { getData } from './storage';
import MachineEntries from './machines';

export default function Machines({ navigation, route }) {
    const [mt, setMT] = useState([]);
    const [applyFilter, setApplyFilter] = useState(false)

    useEffect(() => {
        try {
            if (route.params.id >= 0) {
                setMT([route.name]);
                setApplyFilter(true)

            } else {
                getData('MT').then(
                    data => {
                        if (data !== -1) {
                            setMT(data);
                        }
                        else setMT([])
                    })
            }
        } catch (err) {
            console.log(err)
        }

    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>

                <View >
                    {mt.map((v, i) => (<MachineEntries key ={"allMachines"+i} navigation={navigation} mtId={applyFilter ? route.params.id : i} title={v} />))}
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ margin: 10, flexGrow: 0.5 }}>
                            <Button title="Add Machine" onPress={() => { navigation.navigate('Add Machine') }} />
                        </View>
                        <View style={{ margin: 10, flexGrow: 0.5 }}>

                            <Button style={{ margin: 10, flexGrow: 0.5 }} title="Add Machine Type" onPress={() => { navigation.navigate('Add Machine Type') }} />
                        </View>

                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        marginHorizontal: 10,
    },
    text: {
        fontSize: 42,
    },
});