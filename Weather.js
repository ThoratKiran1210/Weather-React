import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions } from "react-native";
import SearchBar from './SearchBar'
import { haze, snow, sunny, rain } from "../assets/backgroundImages";


export default function Weather(weatherData, fetchWeatherData){

    const [backgroundImage, setBackgroundImage] = useState(null);
    // Destructuring  "weatherData"  object
    const {
        name,
        main:{ temp, humidity},
        wind:{speed},
    } = weatherData;
    const [{main}] = weatherData

    useEffect(() => {
        setBackgroundImage(getBackgroundImage(main))
    }, [weatherData]);

    function getBackgroundImage(weather){
        if(weather === 'Snow') return snow
        if(weather === 'Clear') return sunny
        if(weather === 'Rain') return rain
        if(weather === 'Haze') return haze
        return haze;
    }

    let textColor = backgroundImage !== sunny ? 'white' : 'black'

    return(
        <View style= {styles.container}>
            <ImageBackground 
            source={backgroundImage}
            style= {styles.backgroundImage}
            resizeMode="cover"
            >
                <SearchBar  fetchWeatherData={fetchWeatherData}/>
                <View style= {{alignItems: 'center'}}>
                    <Text style= {{...styles.headerText, color: textColor, fontWeight: 'bold', fontSize: 49}}>{name}</Text>
                    <Text style= {{...styles.headerText, color: textColor, fontWeight: 'bold'}}>{main}</Text>
                    <Text style= {{...styles.headerText, color: textColor}}>{temp} °C</Text>
                </View>

            <View style={ styles.weatherInfo}>
                <View style={styles.info}>
                    <Text style= {{ fontSize: 24, color:'white' }}>Humidity</Text>
                    <Text style= {{ fontSize: 24, color:'white' }}>{humidity} % </Text>
                </View>

                <View style={styles.info}>
                    <Text style= {{ fontSize: 24, color:'white' }}>Wind Speed</Text>
                    <Text style= {{ fontSize: 24, color:'white' }}>{speed} m/s </Text>
                </View>
            </View>

            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    //   justifyContent: 'center',
    },
    backgroundImage: {
        flex: 1,
        width: Dimensions.get('screen').width
    },
    headerText: {
        fontSize: 35,
        marginTop: 10,
    },
    weatherInfo: {
        flexDirection:'row',
        marginTop: 20,
        justifyContent: 'space-between',
        padding: 10,
    },
    info: {
        width: Dimensions.get('screen').width/2.5,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center'

    }
});  