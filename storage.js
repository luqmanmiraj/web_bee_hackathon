import AsyncStorage from '@react-native-async-storage/async-storage';
const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      // saving error
    }
  }
  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)

      if(value !== null) {
        return JSON.parse(value)
      }else{
        return -1;
      }
    } catch(e) {
    }
  }
  const removeItem = async (key)=>{
    try {
    await AsyncStorage.removeItem(key)
    

    } catch(e) {
      console.log(e)
    }
    console.log("removed item @ key " + key)
  }
      // error reading value
  export {storeData , getData ,removeItem }