import React, {useState} from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import { EvilIcons } from '@expo/vector-icons';


export default function SearchBar({fetchWeatherData}){
    const [cityName, setCityName] = useState('');
    return(
        <View style= {StyleSheet.searchBar}>
            <TextInput 
                placeholder="Enter city name.."
                value={cityName}
                onChangeText={(text) => setCityName(text)}
            />
            <EvilIcons name="search" size={27} color="black" onPress={()=> fetchWeatherData(cityName)}/>
        </View>
    )
}

const style = StyleSheet.create({
    searchBar: {
        marginTop: 34,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width -20,
        borderWidth: 1.5,
        paddingVertical:10,
        borderRadius: 25, 
        marginHorizontal:10,
        backgroundColor:'lightgrey',
        borderColor: 'lightgrey',
        paddingHorizontal: 10
    }
})